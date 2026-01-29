interface LightBandParameters {
  flip: boolean;
  [key: string]: unknown;
}

interface LightBandOptions {
  [key: string]: unknown;
}

interface LightBandData {
  path: string;
  parameters: LightBandParameters;
  options: LightBandOptions;
  error?: number;
}

interface LightBandEntity {
  getParameters(): LightBandData;
}

interface PropertyBarBlock {
  icon: string;
  checked: boolean;
}

interface PropertyBarCheckBlockData {
  label: string;
  blocks: PropertyBarBlock[];
  onChange: (event: unknown, value: boolean) => void;
}

interface PropertyBarItem {
  id: string;
  parentId: string;
  label?: string;
  type: string;
  items?: PropertyBarItem[];
  data?: PropertyBarCheckBlockData;
  order?: number;
}

interface Command {
  [key: string]: unknown;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data: LightBandParameters): void;
  complete(): void;
}

interface CatalogPlugin {
  getLightBandEntityById(id: string): LightBandEntity;
}

interface PluginManager {
  getPlugin(type: string): CatalogPlugin;
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
    CheckBlock: string;
  };
  CommandType: {
    EditCustomizedModelLightBand: string;
  };
}

interface ResourceManager {
  getString(key: string): string;
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;
declare const ResourceManager: ResourceManager;

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export class CustomizedLightBandPropertyBarHandler {
  private app: App;
  private catalogPlugin: CatalogPlugin;
  private cmdMgr: CommandManager;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  getCustomizedLightBandItems(entity: CatalogPlugin | null, lightBandId: string): PropertyBarItem[] {
    if (!entity) {
      return [];
    }

    const isManualAdd = lightBandId?.includes("manualAddLightBand");
    const lightBandData = entity.getLightBandEntityById(lightBandId).getParameters();

    if (!lightBandData || lightBandData.error !== undefined && lightBandData.error !== -1) {
      return [];
    }

    const items: PropertyBarItem[] = [];
    const { path, parameters, options } = lightBandData;

    if (!path || !parameters || !options) {
      return [];
    }

    if (isManualAdd) {
      items.push({
        id: "customized-light-brand-position",
        parentId: "content-base-property",
        label: ResourceManager.getString("plugin_propertybar_position_setting"),
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        items: [{
          id: "customized-light-brand-position-flip",
          parentId: "customized-light-brand-position",
          type: HSFPConstants.PropertyBarType.CheckBlock,
          data: {
            label: ResourceManager.getString("plugin_customizedModeling_lightband_flip"),
            blocks: [{
              icon: "hs_shuxingmianban_zhouneifanzhuan",
              checked: parameters.flip
            }],
            onChange: (_event: unknown, newValue: boolean) => {
              const command = this.cmdMgr.createCommand(
                HSFPConstants.CommandType.EditCustomizedModelLightBand,
                [entity, lightBandId]
              );
              const clonedParameters = cloneDeep(lightBandData.parameters);
              clonedParameters.flip = newValue;
              this.cmdMgr.execute(command);
              this.cmdMgr.receive("flip", clonedParameters);
              this.cmdMgr.complete();
            }
          }
        }],
        order: 1
      });
    }

    return items;
  }
}