interface LightSlotParameters {
  flip?: boolean;
  hasLightBand?: boolean;
  width: number;
  height: number;
  error?: number;
  [key: string]: unknown;
}

interface LightSlotEntityData {
  path?: string;
  parameters?: LightSlotParameters;
  options?: unknown;
  error?: number;
}

interface LightSlotEntity {
  getParameters(): LightSlotEntityData;
}

interface LightSlotModel {
  getLightSlotEntityById(id: string): LightSlotEntity;
}

interface Command {
  execute(): void;
  complete(): void;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data?: unknown): void;
  complete(): void;
}

interface CatalogPlugin {
  [key: string]: unknown;
}

interface PluginManager {
  getPlugin(type: string): CatalogPlugin;
}

interface HSApp {
  pluginManager: PluginManager;
  cmdManager: CommandManager;
}

interface PropertyBarControlBase {
  id?: string;
  type: string;
  order: number;
  uniqueKey?: boolean;
  getRenderItem?: () => React.ReactElement;
}

interface RadioButtonControl extends PropertyBarControlBase {
  type: 'radioButton';
  data: {
    className: string;
    label: string;
    btns: Array<{ src: [string, string] }>;
    onchange: (index: number) => void;
    selectedIndex: number;
  };
}

interface DividerControl extends PropertyBarControlBase {
  type: 'divider';
  data: {
    className: string;
  };
}

interface ToggleButtonControl extends PropertyBarControlBase {
  type: 'toggleButton';
  data: {
    label: string;
    checkedChildren: string;
    unCheckedChildren: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  };
}

interface SliderInputControl extends PropertyBarControlBase {
  type: 'sliderInput';
  data: {
    label: string;
    options: {
      displayDigits: number;
      includeUnit: boolean;
      readOnly: boolean;
      startFromMin: boolean;
      tips: string;
      rules: {
        range: {
          min: number;
          max: number;
        };
        positiveOnly: boolean;
      };
    };
    value: number;
    onValueChangeStart: (event: CustomEvent) => void;
    onValueChange: (event: CustomEvent<{ value: number }>) => void;
    onValueChangeEnd: (event: CustomEvent<{ value: number }>) => void;
  };
}

interface RenderItemControl extends PropertyBarControlBase {
  getRenderItem: () => React.ReactElement;
}

type PropertyBarControl =
  | RadioButtonControl
  | DividerControl
  | ToggleButtonControl
  | SliderInputControl
  | RenderItemControl;

interface Signal<T> {
  dispatch(data: T): void;
}

const CENTIMETER_CONVERSION_FACTOR = 100;

class CustomizedLightSlotManager {
  private app: HSApp;
  private catalogPlugin: CatalogPlugin;
  private cmdMgr: CommandManager;
  public lightSlotSizeChangeSignal: Signal<{ width?: number; height?: number }>;

  constructor() {
    this.app = (window as any).HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(
      (window as any).HSFPConstants.PluginType.Catalog
    );
    this.cmdMgr = this.app.cmdManager;
    this.lightSlotSizeChangeSignal = new (window as any).HSCore.Util.Signal(this);
  }

  /**
   * Get customized light slot property bar items
   * @param model - The light slot model
   * @param lightSlotId - The light slot entity ID
   * @returns Array of property bar controls
   */
  public getCustomizedLightSlotItems(
    model: LightSlotModel | null,
    lightSlotId: string
  ): PropertyBarControl[] {
    if (!model) {
      return [];
    }

    const isManualAddLightSlot = lightSlotId?.includes('manualAddLightSlot');
    const entityData = model.getLightSlotEntityById(lightSlotId).getParameters();

    if (!entityData || entityData.error !== undefined && entityData.error !== -1) {
      return [];
    }

    const items: PropertyBarControl[] = [];
    const { path, parameters, options } = entityData;

    if (!path || !parameters || !options) {
      return [];
    }

    if (isManualAddLightSlot) {
      items.push({
        id: 'lightSlotRadioButton',
        type: 'radioButton',
        order: 200,
        data: {
          className: 'customized-light-slot-flip',
          label: (window as any).ResourceManager.getString(
            'plugin_customizedModeling_lightband_flip'
          ),
          btns: [
            { src: [(window as any).FlipIcon1, (window as any).FlipIcon1Active] },
            { src: [(window as any).FlipIcon2, (window as any).FlipIcon2Active] },
          ],
          onchange: (selectedIndex: number) => {
            const command = this.cmdMgr.createCommand(
              (window as any).HSFPConstants.CommandType.EditCustomizedModelLightSlot,
              [model, lightSlotId]
            );
            this.cmdMgr.execute(command);
            this.cmdMgr.receive('ceilingchangebegin');

            const isFlipped = selectedIndex !== 1;
            const updatedParameters = (window as any)._.cloneDeep(entityData.parameters);
            updatedParameters.flip = isFlipped;

            this.cmdMgr.receive('ceilingchanging');
            this.cmdMgr.receive('ceilingchangeend', updatedParameters);
            this.cmdMgr.complete();
          },
          selectedIndex: parameters.flip ? 0 : 1,
        },
      });
    }

    items.push(
      {
        type: 'divider',
        order: 210,
        data: {
          className: 'moldingBase_firstRowHdivider',
        },
      },
      {
        id: 'lightSlotHasLightBrandButton',
        type: 'toggleButton',
        order: 220,
        data: {
          label: (window as any).ResourceManager.getString('plugin_manuallighting_tab_lightband'),
          checkedChildren: (window as any).ResourceManager.getString('toolbar_toggleCeiling_yes'),
          unCheckedChildren: (window as any).ResourceManager.getString('toolbar_toggleCeiling_no'),
          value: parameters.hasLightBand ?? false,
          onValueChange: (newValue: boolean) => {
            const command = this.cmdMgr.createCommand(
              (window as any).HSFPConstants.CommandType.EditCustomizedModelLightSlot,
              [model, lightSlotId]
            );
            this.cmdMgr.execute(command);
            this.cmdMgr.receive('ceilingchangebegin');

            const updatedParameters = (window as any)._.cloneDeep(entityData.parameters);
            updatedParameters.hasLightBand = newValue;

            this.cmdMgr.receive('ceilingchanging');
            this.cmdMgr.receive('ceilingchangeend', updatedParameters);
            this.cmdMgr.complete();
          },
        },
      },
      {
        type: 'divider',
        order: 240,
        data: {
          className: 'moldingBase_secondRowHdivider',
        },
      },
      {
        id: 'widthSliderInput',
        type: 'sliderInput',
        uniqueKey: true,
        order: 250,
        data: {
          label: (window as any).ResourceManager.getString('plugin_customizedModeling_lightslot_a_label'),
          options: {
            displayDigits: 0,
            includeUnit: true,
            readOnly: false,
            startFromMin: true,
            tips: '',
            rules: {
              range: {
                min: 0.04,
                max: 0.5,
              },
              positiveOnly: true,
            },
          },
          value: parameters.width / CENTIMETER_CONVERSION_FACTOR,
          onValueChangeStart: (_event: CustomEvent) => {
            const command = this.cmdMgr.createCommand(
              (window as any).HSFPConstants.CommandType.EditCustomizedModelLightSlot,
              [model, lightSlotId]
            );
            this.cmdMgr.execute(command);
            this.cmdMgr.receive('ceilingchangebegin');
          },
          onValueChange: (event: CustomEvent<{ value: number }>) => {
            const newWidth = event.detail.value * CENTIMETER_CONVERSION_FACTOR;
            this.lightSlotSizeChangeSignal.dispatch({ width: newWidth });

            const updatedParameters = (window as any)._.cloneDeep(entityData.parameters);
            updatedParameters.width = newWidth;
            this.cmdMgr.receive('ceilingchanging', updatedParameters);
          },
          onValueChangeEnd: (event: CustomEvent<{ value: number }>) => {
            const newWidth = event.detail.value * CENTIMETER_CONVERSION_FACTOR;
            const updatedParameters = (window as any)._.cloneDeep(entityData.parameters);
            updatedParameters.width = newWidth;

            this.cmdMgr.receive('ceilingchangeend', updatedParameters);
            this.cmdMgr.complete();
          },
        },
      },
      {
        id: 'HeightSliderInput',
        type: 'sliderInput',
        uniqueKey: true,
        order: 260,
        data: {
          label: (window as any).ResourceManager.getString('plugin_customizedModeling_lightslot_b_label'),
          options: {
            displayDigits: 0,
            includeUnit: true,
            readOnly: false,
            startFromMin: true,
            tips: '',
            rules: {
              range: {
                min: 0.02,
                max: 0.5,
              },
              positiveOnly: true,
            },
          },
          value: parameters.height / CENTIMETER_CONVERSION_FACTOR,
          onValueChangeStart: (_event: CustomEvent) => {
            const command = this.cmdMgr.createCommand(
              (window as any).HSFPConstants.CommandType.EditCustomizedModelLightSlot,
              [model, lightSlotId]
            );
            this.cmdMgr.execute(command);
            this.cmdMgr.receive('ceilingchangebegin');
          },
          onValueChange: (event: CustomEvent<{ value: number }>) => {
            const newHeight = event.detail.value * CENTIMETER_CONVERSION_FACTOR;
            this.lightSlotSizeChangeSignal.dispatch({ height: newHeight });

            const updatedParameters = (window as any)._.cloneDeep(entityData.parameters);
            updatedParameters.height = newHeight;
            this.cmdMgr.receive('ceilingchanging', updatedParameters);
          },
          onValueChangeEnd: (event: CustomEvent<{ value: number }>) => {
            const newHeight = event.detail.value * CENTIMETER_CONVERSION_FACTOR;
            const updatedParameters = (window as any)._.cloneDeep(entityData.parameters);
            updatedParameters.height = newHeight;

            this.cmdMgr.receive('ceilingchangeend', updatedParameters);
            this.cmdMgr.complete();
          },
        },
      },
      {
        id: 'lightSlotPosition',
        order: 300,
        getRenderItem: () => {
          const randomKey = Math.random().toString();
          const LightSlotPositionComponent = (window as any).LightSlotPositionComponent;
          return (window as any).React.createElement(LightSlotPositionComponent, {
            key: randomKey,
            parameters,
            isManualAddLightSlot,
            lightSlotSizeChangeSignal: this.lightSlotSizeChangeSignal,
          });
        },
      } as RenderItemControl
    );

    return items;
  }
}

export default CustomizedLightSlotManager;