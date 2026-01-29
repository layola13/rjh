interface LightBandParameters {
  path?: string;
  parameters?: {
    flip?: boolean;
    [key: string]: unknown;
  };
  options?: unknown;
  error?: number;
}

interface LightBandEntity {
  getParameters(): LightBandParameters;
}

interface CustomizedModelEntity {
  getLightBandEntityById(id: string): LightBandEntity;
}

interface PropertyBarButton {
  src: string[];
}

interface PropertyBarRadioButtonData {
  className: string;
  label: string;
  btns: PropertyBarButton[];
  onchange: (index: number) => void;
  selectedIndex: number;
}

interface PropertyBarItem {
  id: string;
  type: string;
  order: number;
  data: PropertyBarRadioButtonData;
}

interface Command {
  // Command interface placeholder
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data: unknown): void;
  complete(): void;
}

interface CatalogPlugin {
  // Catalog plugin interface placeholder
}

interface PluginManager {
  getPlugin(pluginType: string): CatalogPlugin;
}

interface App {
  cmdManager: CommandManager;
  pluginManager: PluginManager;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
  };
  CommandType: {
    EditCustomizedModelLightBand: string;
  };
};

declare const PropertyBarControlTypeEnum: {
  radioButton: string;
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const _: {
  cloneDeep<T>(value: T): T;
};

const LIGHT_BAND_FLIP_ICON_NORMAL: string = require('./assets/light-band-flip-normal.svg');
const LIGHT_BAND_FLIP_ICON_SELECTED: string = require('./assets/light-band-flip-selected.svg');
const LIGHT_BAND_DEFAULT_ICON_NORMAL: string = require('./assets/light-band-default-normal.svg');
const LIGHT_BAND_DEFAULT_ICON_SELECTED: string = require('./assets/light-band-default-selected.svg');

class CustomizedLightBandService {
  private readonly app: App;
  private readonly catalogPlugin: CatalogPlugin;
  private readonly cmdMgr: CommandManager;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  /**
   * Get customized light band property bar items
   * @param entity - The customized model entity
   * @param lightBandId - The light band entity ID
   * @returns Array of property bar items for the light band
   */
  public getCustomizedLightBandItems(
    entity: CustomizedModelEntity | null,
    lightBandId: string
  ): PropertyBarItem[] {
    if (!entity) {
      return [];
    }

    const isManuallyAdded = lightBandId?.includes('manualAddLightBand');
    const lightBandParameters = entity.getLightBandEntityById(lightBandId).getParameters();

    if (!lightBandParameters || lightBandParameters.error !== undefined && lightBandParameters.error !== -1) {
      return [];
    }

    const items: PropertyBarItem[] = [];
    const { path, parameters, options } = lightBandParameters;

    if (!path || !parameters || !options) {
      return [];
    }

    if (isManuallyAdded) {
      items.push({
        id: 'lightBandFlipRadioButton',
        type: PropertyBarControlTypeEnum.radioButton,
        order: 200,
        data: {
          className: 'customized-light-slot-flip',
          label: ResourceManager.getString('plugin_customizedModeling_lightband_flip'),
          btns: [
            {
              src: [LIGHT_BAND_DEFAULT_ICON_NORMAL, LIGHT_BAND_DEFAULT_ICON_SELECTED]
            },
            {
              src: [LIGHT_BAND_FLIP_ICON_NORMAL, LIGHT_BAND_FLIP_ICON_SELECTED]
            }
          ],
          onchange: (selectedIndex: number) => {
            const command = this.cmdMgr.createCommand(
              HSFPConstants.CommandType.EditCustomizedModelLightBand,
              [entity, lightBandId]
            );
            const clonedParameters = _.cloneDeep(lightBandParameters.parameters);
            const isFlipped = selectedIndex !== 0;
            
            if (clonedParameters) {
              clonedParameters.flip = isFlipped;
            }

            this.cmdMgr.execute(command);
            this.cmdMgr.receive('flip', clonedParameters);
            this.cmdMgr.complete();
          },
          selectedIndex: parameters.flip ? 1 : 0
        }
      });
    }

    return items;
  }
}

export default CustomizedLightBandService;