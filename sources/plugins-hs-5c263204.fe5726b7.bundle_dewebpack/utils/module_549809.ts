// @ts-nocheck
interface PluginDependency {
  name: string;
  description: string;
  dependencies: string[];
}

interface ToolbarItem {
  type: string;
  tooltip?: string;
  label?: string;
  name: string;
  order: number;
  icon?: string;
  onclick?: () => void;
}

interface IPlugin {
  onActive(context: unknown, dependencies: Record<string, ToolbarPlugin>): void;
  onDeactive(): void;
  onPostDesign(): void;
}

interface ToolbarPlugin {
  addItem(item: ToolbarItem): void;
}

interface FloorPlan {
  saveToString(): string;
}

interface App {
  appParams: {
    _pcvr?: string;
  };
  floorplan: FloorPlan;
}

declare const HSFPConstants: {
  PluginType: {
    Toolbar: string;
  };
};

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Plugin: {
    IPlugin: new () => IPlugin;
    registerPlugin(name: string, plugin: typeof HidPlugin): void;
  };
};

class HidPlugin extends HSApp.Plugin.IPlugin {
  private toolbarPlugin?: ToolbarPlugin;

  constructor() {
    super();
    const config: PluginDependency = {
      name: "Home",
      description: "Hid or PCVR entry",
      dependencies: [HSFPConstants.PluginType.Toolbar]
    };
  }

  onActive(context: unknown, dependencies: Record<string, ToolbarPlugin>): void {
    this.toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];
    
    const app = HSApp.App.getApp();
    if (app.appParams._pcvr === "true") {
      this._injectToolbar();
    }
  }

  onDeactive(): void {
    // No cleanup needed
  }

  onPostDesign(): void {
    const app = HSApp.App.getApp();
    const designData = `design, ${app.floorplan.saveToString()}`;
    const websocket = new WebSocket("ws://127.0.0.1:8090");
    
    websocket.onopen = (): void => {
      websocket.send(designData);
      websocket.close();
    };
  }

  private _injectToolbar(): void {
    const toolbar = this.toolbarPlugin;
    if (!toolbar) {
      return;
    }

    toolbar.addItem({
      type: "button",
      tooltip: "eVR",
      label: "eVR",
      name: "toolBar_hide_entry",
      order: 1270,
      icon: "plugin/hid/res/ImgHid/HID.svg",
      onclick: (): void => {
        this.onPostDesign();
      }
    });

    toolbar.addItem({
      name: "toolBar_root_divider_render",
      type: "divider",
      order: 1280
    });
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.hid.Plugin.", HidPlugin);