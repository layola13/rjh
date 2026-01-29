interface LightSlotParameters {
  width: number;
  height: number;
  flip: boolean;
  hasLightBand: boolean;
  [key: string]: unknown;
}

interface LightSlotData {
  path: string;
  parameters: LightSlotParameters;
  options: unknown;
  error?: number;
}

interface LightSlotEntity {
  getParameters(): LightSlotData;
}

interface CustomizedModel {
  getLightSlotEntityById(id: string): LightSlotEntity;
}

interface Command {
  // Command interface placeholder
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data?: unknown): void;
  complete(): void;
}

interface Plugin {
  // Plugin interface placeholder
}

interface PluginManager {
  getPlugin(type: string): Plugin;
}

interface App {
  pluginManager: PluginManager;
  cmdManager: CommandManager;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

interface PropertyBarItem {
  id: string;
  parentId?: string;
  parendId?: string;
  label?: string;
  type: string;
  order?: number;
  items?: PropertyBarItem[];
  data?: unknown;
  getRenderItem?: () => React.ReactElement;
}

const SCALE_FACTOR = 100;

export class CustomizedLightSlotPropertyBarHandler {
  private app: App;
  private catalogPlugin: Plugin;
  private cmdMgr: CommandManager;
  public lightSlotSizeChangeSignal: HSCore.Util.Signal;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
    this.lightSlotSizeChangeSignal = new HSCore.Util.Signal(this);
  }

  /**
   * Get customized light slot property bar items
   * @param model - The customized model instance
   * @param lightSlotId - The light slot entity ID
   * @returns Array of property bar items
   */
  public getCustomizedLightSlotItems(
    model: CustomizedModel | null,
    lightSlotId: string
  ): PropertyBarItem[] {
    if (!model) {
      return [];
    }

    const isManualAddLightSlot = lightSlotId?.includes("manualAddLightSlot");
    const lightSlotData = model.getLightSlotEntityById(lightSlotId).getParameters();

    if (!lightSlotData || lightSlotData.error !== undefined && lightSlotData.error !== -1) {
      return [];
    }

    const items: PropertyBarItem[] = [];
    const { path, parameters, options } = lightSlotData;

    if (!path || !parameters || !options) {
      return [];
    }

    // Size settings
    items.push({
      id: "customized-light-slot-size",
      parentId: "content-base-property",
      label: ResourceManager.getString("plugin_propertybar_size_setting"),
      type: HSFPConstants.PropertyBarType.ThirdLevelNode,
      items: [
        {
          id: "customized-light-slot-size-width",
          parendId: "customized-light-slot-size",
          type: HSFPConstants.PropertyBarType.SliderInput,
          order: 1,
          data: {
            label: ResourceManager.getString("plugin_customizedModeling_lightslot_a_label"),
            options: {
              displayDigits: 0,
              includeUnit: true,
              rules: {
                range: {
                  min: 0.04,
                  max: 0.5
                },
                positiveOnly: true
              }
            },
            value: parameters.width / SCALE_FACTOR,
            onValueChangeStart: (event: ValueChangeEvent) => {
              const command = this.cmdMgr.createCommand(
                HSFPConstants.CommandType.EditCustomizedModelLightSlot,
                [model, lightSlotId]
              );
              this.cmdMgr.execute(command);
              this.cmdMgr.receive("ceilingchangebegin");
            },
            onValueChange: (event: ValueChangeEvent) => {
              const newWidth = event.detail.value * SCALE_FACTOR;
              this.lightSlotSizeChangeSignal.dispatch({ width: newWidth });
              const updatedParameters = { ...parameters, width: newWidth };
              this.cmdMgr.receive("ceilingchanging", updatedParameters);
            },
            onValueChangeEnd: (event: ValueChangeEvent) => {
              const newWidth = event.detail.value * SCALE_FACTOR;
              const updatedParameters = { ...parameters, width: newWidth };
              this.cmdMgr.receive("ceilingchangeend", updatedParameters);
              this.cmdMgr.complete();
            }
          }
        },
        {
          id: "customized-light-slot-size-height",
          parendId: "customized-light-slot-size",
          type: HSFPConstants.PropertyBarType.SliderInput,
          order: 2,
          data: {
            label: ResourceManager.getString("plugin_customizedModeling_lightslot_b_label"),
            options: {
              displayDigits: 0,
              includeUnit: true,
              rules: {
                range: {
                  min: 0.02,
                  max: 0.5
                },
                positiveOnly: true
              }
            },
            value: parameters.height / SCALE_FACTOR,
            onValueChangeStart: (event: ValueChangeEvent) => {
              const command = this.cmdMgr.createCommand(
                HSFPConstants.CommandType.EditCustomizedModelLightSlot,
                [model, lightSlotId]
              );
              this.cmdMgr.execute(command);
              this.cmdMgr.receive("ceilingchangebegin");
            },
            onValueChange: (event: ValueChangeEvent) => {
              const newHeight = event.detail.value * SCALE_FACTOR;
              this.lightSlotSizeChangeSignal.dispatch({ height: newHeight });
              const updatedParameters = { ...parameters, height: newHeight };
              this.cmdMgr.receive("ceilingchanging", updatedParameters);
            },
            onValueChangeEnd: (event: ValueChangeEvent) => {
              const newHeight = event.detail.value * SCALE_FACTOR;
              const updatedParameters = { ...parameters, height: newHeight };
              this.cmdMgr.receive("ceilingchangeend", updatedParameters);
              this.cmdMgr.complete();
            }
          }
        }
      ],
      order: 1
    });

    // Position settings (only for manual add light slot)
    if (isManualAddLightSlot) {
      items.push({
        id: "customized-light-slot-position",
        parentId: "content-base-property",
        label: ResourceManager.getString("plugin_propertybar_position_setting"),
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        items: [
          {
            id: "customized-light-slot-position-flip",
            parentId: "customized-light-slot-position",
            type: HSFPConstants.PropertyBarType.CheckBlock,
            data: {
              label: ResourceManager.getString("plugin_customizedModeling_lightband_flip"),
              blocks: [
                {
                  icon: "hs_shuxingmianban_zhouneifanzhuan",
                  checked: !parameters.flip
                }
              ],
              onChange: (index: number, checked: boolean) => {
                const command = this.cmdMgr.createCommand(
                  HSFPConstants.CommandType.EditCustomizedModelLightSlot,
                  [model, lightSlotId]
                );
                this.cmdMgr.execute(command);
                this.cmdMgr.receive("ceilingchangebegin");
                const newFlipValue = !checked;
                const updatedParameters = { ...parameters, flip: newFlipValue };
                this.cmdMgr.receive("ceilingchanging");
                this.cmdMgr.receive("ceilingchangeend", updatedParameters);
                this.cmdMgr.complete();
              }
            }
          }
        ],
        order: 2
      });
    }

    // Light band switch
    items.push({
      id: "customized-light-slot-brand",
      parentId: "content-base-property",
      type: HSFPConstants.PropertyBarType.Switch,
      order: 3,
      data: {
        label: ResourceManager.getString("plugin_manuallighting_tab_lightband"),
        checkedChildren: ResourceManager.getString("toolbar_toggleCeiling_yes"),
        unCheckedChildren: ResourceManager.getString("toolbar_toggleCeiling_no"),
        checked: parameters.hasLightBand,
        onChange: (checked: boolean) => {
          const command = this.cmdMgr.createCommand(
            HSFPConstants.CommandType.EditCustomizedModelLightSlot,
            [model, lightSlotId]
          );
          this.cmdMgr.execute(command);
          this.cmdMgr.receive("ceilingchangebegin");
          const updatedParameters = { ...parameters, hasLightBand: checked };
          this.cmdMgr.receive("ceilingchanging");
          this.cmdMgr.receive("ceilingchangeend", updatedParameters);
          this.cmdMgr.complete();
        }
      }
    });

    // Light slot position panel
    items.push({
      id: "customized-light-slot-position-panel",
      parentId: "content-base-property",
      type: "",
      order: 4,
      getRenderItem: () => {
        const randomKey = Math.random().toString();
        return React.createElement(
          "div",
          { className: "rightpropertybar-light-slot-panel" },
          React.createElement(LightSlotPanel, {
            key: randomKey,
            parameters,
            isManualAddLightSlot,
            lightSlotSizeChangeSignal: this.lightSlotSizeChangeSignal
          })
        );
      }
    });

    return items;
  }
}