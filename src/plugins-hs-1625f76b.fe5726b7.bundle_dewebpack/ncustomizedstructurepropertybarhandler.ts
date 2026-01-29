interface NCustomizedStructureItem {
  id: string;
  parentId: string;
  label?: string;
  type: string;
  items?: NCustomizedStructureItem[];
  order?: number;
  data?: {
    label: string;
    defaultValue: string;
    values: string[];
    disabled: boolean;
    onChange: (event: CustomEvent<{ value: string }>) => void;
  };
}

interface IApp {
  pluginManager: {
    getPlugin(type: string): ICatalogPlugin;
  };
  cmdManager: ICommandManager;
}

interface ICatalogPlugin {
  // Define catalog plugin interface as needed
}

interface ICommandManager {
  createCommand(type: string, args: unknown[]): ICommand;
  execute(command: ICommand, options: { wallpartmode: boolean }): void;
  complete(): void;
}

interface ICommand {
  // Define command interface as needed
}

interface IStructureElement {
  isWallPart(): boolean;
}

declare const HSApp: {
  App: {
    getApp(): IApp;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
  };
  PropertyBarType: {
    ThirdLevelNode: string;
    RadioButton: string;
  };
  CommandType: {
    ChangeStructureMode: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

export class NCustomizedStructurePropertyBarHandler {
  private app: IApp;
  private catalogPlugin: ICatalogPlugin;
  private cmdMgr: ICommandManager;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  public getNCustomizedStructureItems(element: IStructureElement | null): NCustomizedStructureItem[] {
    if (!element) {
      return [];
    }

    const items: NCustomizedStructureItem[] = [];

    items.push({
      id: "ncustomized-structure-mode",
      parentId: "content-base-property",
      label: ResourceManager.getString("common_attribute"),
      type: HSFPConstants.PropertyBarType.ThirdLevelNode,
      items: [
        {
          id: "ncustomized-structure-mode-choose",
          parentId: "ncustomized-structure-mode",
          type: HSFPConstants.PropertyBarType.RadioButton,
          order: 240,
          data: {
            label: ResourceManager.getString("plugin_structure_mode"),
            defaultValue: element.isWallPart()
              ? "plugin_structure_mode_wallpart"
              : "plugin_structure_mode_independent",
            values: ["plugin_structure_mode_wallpart", "plugin_structure_mode_independent"],
            disabled: false,
            onChange: (event: CustomEvent<{ value: string }>): void => {
              const isWallPartMode = event.detail.value === "plugin_structure_mode_wallpart";
              const commandType = HSFPConstants.CommandType.ChangeStructureMode;
              const command = this.cmdMgr.createCommand(commandType, [element, commandType]);
              
              this.cmdMgr.execute(command, {
                wallpartmode: isWallPartMode
              });
              this.cmdMgr.complete();
            }
          }
        }
      ],
      order: 1
    });

    return items;
  }
}