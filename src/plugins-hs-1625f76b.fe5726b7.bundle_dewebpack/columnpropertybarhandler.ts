interface RadioButtonChangeEvent {
  detail: {
    value: string;
  };
}

interface PropertyBarItem {
  id: string;
  parentId: string;
  label?: string;
  type: string;
  order?: number;
  items?: PropertyBarSubItem[];
}

interface PropertyBarSubItem {
  id: string;
  parentId: string;
  type: string;
  order: number;
  data: RadioButtonData;
}

interface RadioButtonData {
  label: string;
  defaultValue: string;
  values: string[];
  disabled: boolean;
  onChange: (event: RadioButtonChangeEvent) => void;
}

interface Command {
  // Define command interface based on your application
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command, options: Record<string, unknown>): void;
  complete(): void;
}

interface CatalogPlugin {
  // Define catalog plugin interface
}

interface PluginManager {
  getPlugin(pluginType: string): CatalogPlugin;
}

interface App {
  pluginManager: PluginManager;
  cmdManager: CommandManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSFPConstants {
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
}

interface ResourceManager {
  getString(key: string): string;
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;
declare const ResourceManager: ResourceManager;

const STRUCTURE_MODE_WALLPART = 'plugin_structure_mode_wallpart';
const STRUCTURE_MODE_INDEPENDENT = 'plugin_structure_mode_independent';

export class ColumnPropertyBarHandler {
  private app: App;
  private catalogPlugin: CatalogPlugin;
  private cmdMgr: CommandManager;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  /**
   * Get property bar items for a column element
   * @param element - The column element to get properties for
   * @returns Array of property bar items
   */
  public getColumnItems(element: unknown): PropertyBarItem[] {
    if (!element) {
      return [];
    }

    const items: PropertyBarItem[] = [];

    items.push({
      id: 'ncustomized-structure-mode',
      parentId: 'content-base-property',
      label: ResourceManager.getString('common_attribute'),
      type: HSFPConstants.PropertyBarType.ThirdLevelNode,
      items: [
        {
          id: 'ncustomized-structure-mode-choose',
          parentId: 'ncustomized-structure-mode',
          type: HSFPConstants.PropertyBarType.RadioButton,
          order: 240,
          data: {
            label: ResourceManager.getString('plugin_structure_mode'),
            defaultValue: STRUCTURE_MODE_INDEPENDENT,
            values: [STRUCTURE_MODE_WALLPART, STRUCTURE_MODE_INDEPENDENT],
            disabled: false,
            onChange: (event: RadioButtonChangeEvent) => {
              const isWallpartMode = event.detail.value === STRUCTURE_MODE_WALLPART;
              const commandType = HSFPConstants.CommandType.ChangeStructureMode;
              const command = this.cmdMgr.createCommand(commandType, [element, commandType]);
              
              this.cmdMgr.execute(command, {
                wallpartmode: isWallpartMode
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