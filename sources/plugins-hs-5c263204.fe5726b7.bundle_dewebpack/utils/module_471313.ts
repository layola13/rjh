import ReactDOM from 'react-dom';
import React from 'react';
import FloorPlanCollectionComponent from './FloorPlanCollectionComponent';
import { isHXRR } from './utils';

interface TrackData {
  id: string;
  description: string;
}

interface ShowOptions {
  entry?: string;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface ToolbarItem {
  add(config: ToolbarItemConfig): void;
}

interface ToolbarItemConfig {
  label: string;
  name: string;
  icon: string;
  order: number;
  enable: boolean;
  onclick: () => void;
}

interface App {
  cmdManager: {
    cancel(): void;
  };
  userTrackLogger: {
    push(event: string, data: TrackLogData): void;
  };
}

interface PluginDependencies {
  [key: string]: any;
}

interface TrackLogData {
  description: string;
  group: string;
  type: string;
  activeSection?: string;
  activeSectionName?: string;
  clicksRatio?: {
    id: string;
    name: string;
  };
  validOperation?: boolean;
}

declare const HSFPConstants: {
  PluginType: {
    Toolbar: string;
    FloorplanCollection: string;
  };
  LogGroupTypes: {
    OpenDesign: string;
  };
};

declare const HSApp: {
  Config: {
    TENANT: string;
  };
  Plugin: {
    IPlugin: new () => any;
    registerPlugin(type: string, plugin: any): void;
  };
  App: {
    getApp(): App;
  };
  Util: {
    EventTrack: {
      instance(): {
        track(group: string, event: string): void;
      };
    };
    EventGroupEnum: {
      Toolbar: string;
    };
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

class FloorPlanCollectionPlugin extends HSApp.Plugin.IPlugin {
  private toolbarPlugin: any;
  private app: App;

  constructor() {
    super({
      name: "ezhome floor plan collection plugin",
      description: "provide floor plan collection for user to use when they start to design",
      dependencies: [HSFPConstants.PluginType.Toolbar]
    } as PluginConfig);
  }

  onActive(context: { app: App }, dependencies: PluginDependencies): void {
    super.onActive?.(context, dependencies);

    this.toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];
    this.app = context.app;
    this.show = this.show.bind(this);
    this.injectToolbar();

    const container = document.getElementById("plugin-container");
    if (container) {
      const collectionDoms = document.createElement("div");
      collectionDoms.id = "fpcollectiondoms";
      collectionDoms.classList.add("hide");
      container.appendChild(collectionDoms);
    }
  }

  private injectToolbar(): void {
    const fileToolbarItem: ToolbarItem = this.toolbarPlugin.getItem("toolBar_file");

    if (HSApp.Config.TENANT !== "ezhome" || isHXRR()) {
      return;
    }

    fileToolbarItem.add({
      label: ResourceManager.getString("toolBar_fpCollection"),
      name: "toolBar_fpCollection",
      icon: "plugin/toolbar/res/ImgToolBar/menu/new_from_library.svg",
      order: 200,
      enable: true,
      onclick: () => {
        this.show({ entry: "toolbar" });
      }
    });
  }

  show(options: ShowOptions): void {
    this.app.cmdManager.cancel();

    const collectionDoms = document.getElementById("fpcollectiondoms");
    if (collectionDoms) {
      collectionDoms.classList.remove("hide");
    }

    const trackData = this.getTrackData(options);
    const targetElement = document.querySelector("#fpcollectiondoms");

    if (targetElement) {
      ReactDOM.render(
        React.createElement(FloorPlanCollectionComponent, {
          onCloseHandler: this.onCloseFormHandler.bind(this),
          trackData
        }),
        targetElement
      );
    }

    this.trackLogger(trackData);
  }

  private getTrackData(options: ShowOptions): TrackData {
    const entry = options.entry ?? "welcomePanel";
    let description = "欢迎面板";

    switch (options.entry) {
      case "catalog":
        description = "目录";
        break;
      case "toolbar":
        description = "工具栏";
        break;
    }

    return {
      id: entry,
      description: `从${description}打开户型库弹窗`
    };
  }

  private trackLogger(data: TrackData): void {
    const { id, description } = data;

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Toolbar,
      "toolBar_fpCollection_event"
    );

    this.app.userTrackLogger.push("floorplan.Design.floorplanCollection", {
      description,
      group: HSFPConstants.LogGroupTypes.OpenDesign,
      type: "floorplan",
      activeSection: "floorplanCollection",
      activeSectionName: "户型库搜索功能",
      clicksRatio: {
        id,
        name: description
      }
    });
  }

  hide(event?: Event): void {
    try {
      this.onCloseFormHandler(event);
    } catch (error) {
      // Silently handle errors
    }
  }

  private onCloseFormHandler(event?: Event): void {
    const collectionFrame = document.getElementById("collectionFrame");
    if (collectionFrame) {
      collectionFrame.classList.add("md-effect-1");
    }

    setTimeout(() => {
      const targetElement = document.querySelector("#fpcollectiondoms");
      if (targetElement) {
        ReactDOM.unmountComponentAtNode(targetElement);
        const collectionDoms = document.getElementById("fpcollectiondoms");
        if (collectionDoms) {
          collectionDoms.classList.add("hide");
        }
      }
    }, 300);

    event?.stopPropagation();

    localStorage.removeItem("open");

    HSApp.App.getApp().userTrackLogger.push("floorplan.Design", {
      description: "从户型库新建--户型库搜索页面关闭，未找到合适的户型",
      group: HSFPConstants.LogGroupTypes.OpenDesign,
      validOperation: false,
      type: "floorplan"
    });
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.FloorplanCollection,
  FloorPlanCollectionPlugin
);