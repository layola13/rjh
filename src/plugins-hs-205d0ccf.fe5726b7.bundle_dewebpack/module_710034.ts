interface ToolbarItem {
  type: string;
  label: string;
  name: string;
  order: number;
  visible: boolean;
  onclick: () => void;
}

interface ToolbarPlugin {
  getItem(category: string, type: string): ToolbarContainer | null;
}

interface ToolbarContainer {
  add(item: ToolbarItem): void;
}

interface Handler {
  onSaveOriginDesignItemClicked(): void;
  onEditOriginDesignItemClicked(): void;
}

interface ResourceManager {
  getString(key: string): string;
}

interface AppConfig {
  TENANT: string;
}

interface HSApp {
  Config: AppConfig;
}

declare const ResourceManager: ResourceManager;
declare const HSApp: HSApp;

const SAVE_ORIGIN_DESIGN_ORDER = 300;
const EDIT_ORIGIN_DESIGN_ORDER = 400;
const FP_TENANT = "fp";

class ToolbarInjector {
  private _handler: Handler;
  private _toolbarPlugin: ToolbarPlugin;
  private toolbarInjected: boolean = false;

  constructor(handler: Handler, toolbarPlugin: ToolbarPlugin) {
    this._handler = handler;
    this._toolbarPlugin = toolbarPlugin;
  }

  injectDefaultToolbar(): void {
    if (this.toolbarInjected) {
      return;
    }

    const toolbarContainer = this._toolbarPlugin.getItem("toolBar_construction", "default");
    
    const saveOriginDesignItem: ToolbarItem = {
      type: "button",
      label: ResourceManager.getString("plugin_spacerebuild_menuitem_save_origin_design"),
      name: "plugin_spacerebuild_menuitem_save_origin_design",
      order: SAVE_ORIGIN_DESIGN_ORDER,
      visible: FP_TENANT !== HSApp.Config.TENANT,
      onclick: () => {
        this._handler.onSaveOriginDesignItemClicked();
      }
    };

    const editOriginDesignItem: ToolbarItem = {
      type: "button",
      label: ResourceManager.getString("plugin_spacerebuild_menuitem_edit_origin_design"),
      name: "plugin_spacerebuild_menuitem_edit_origin_design",
      order: EDIT_ORIGIN_DESIGN_ORDER,
      visible: FP_TENANT !== HSApp.Config.TENANT,
      onclick: () => {
        this._handler.onEditOriginDesignItemClicked();
      }
    };

    if (toolbarContainer) {
      toolbarContainer.add(saveOriginDesignItem);
      toolbarContainer.add(editOriginDesignItem);
    }

    this.toolbarInjected = true;
  }
}

export default ToolbarInjector;