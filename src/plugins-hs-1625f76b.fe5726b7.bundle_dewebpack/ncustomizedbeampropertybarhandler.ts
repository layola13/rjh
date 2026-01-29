interface BeamEntity {
  isPrimary(): boolean;
}

interface PropertyBarItem {
  id: string;
  parentId: string;
  label?: string;
  type: string;
  items?: PropertyBarItem[];
  order?: number;
  data?: {
    label: string;
    defaultValue: string;
    values: string[];
    disabled: boolean;
    onChange: (event: CustomEvent<{ value: string }>) => void;
  };
}

interface Command {
  // Define command interface based on your command structure
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command, options: { isPrimaryBeam: boolean }): void;
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
    ChangeBeamType: string;
  };
}

interface ResourceManager {
  getString(key: string): string;
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;
declare const ResourceManager: ResourceManager;

export class NCustomizedBeamPropertyBarHandler {
  private readonly app: App;
  private readonly catalogPlugin: CatalogPlugin;
  private readonly cmdMgr: CommandManager;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  /**
   * Get property bar items for customized beam
   * @param entity - The beam entity to get properties for
   * @returns Array of property bar items
   */
  getNCustomizedBeamItems(entity: BeamEntity | null | undefined): PropertyBarItem[] {
    if (!entity) {
      return [];
    }

    const items: PropertyBarItem[] = [];

    items.push({
      id: "ncustomized-beam-type",
      parentId: "content-base-property",
      label: ResourceManager.getString("common_attribute"),
      type: HSFPConstants.PropertyBarType.ThirdLevelNode,
      items: [
        {
          id: "ncustomized-beam-type-choose",
          parentId: "ncustomized-beam-type",
          type: HSFPConstants.PropertyBarType.RadioButton,
          order: 240,
          data: {
            label: ResourceManager.getString("plugin_beam_type"),
            defaultValue: entity.isPrimary()
              ? "plugin_beam_type_primary"
              : "plugin_beam_type_secondary",
            values: ["plugin_beam_type_primary", "plugin_beam_type_secondary"],
            disabled: false,
            onChange: (event: CustomEvent<{ value: string }>): void => {
              const isPrimaryBeam = event.detail.value === "plugin_beam_type_primary";
              const commandType = HSFPConstants.CommandType.ChangeBeamType;
              const command = this.cmdMgr.createCommand(commandType, [entity, commandType]);
              
              this.cmdMgr.execute(command, { isPrimaryBeam });
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