interface LightSlotParameters {
  bLength: number;
  aLength: number;
}

interface LightSlotEntity {
  parameters: LightSlotParameters;
  path: string;
  lightSlotId: string;
  getSelfHostLightBand(): any[];
}

interface PropertyBarItem {
  id: string;
  parentId?: string;
  parendId?: string;
  label?: string;
  type: string;
  order?: number;
  items?: PropertyBarItem[];
  data?: any;
  getRenderItem?: () => any;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

interface CeilingEntity {
  children: Record<string, LightSlotEntity>;
}

export class NCustomizedLightSlotPropertyBarHandler {
  private app: any;
  private catalogPlugin: any;
  private cmdMgr: any;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  /**
   * Get customized light slot property bar items
   */
  getNCustomizedLightSlotItems(ceilingEntity: CeilingEntity | null, lightSlotId: string): PropertyBarItem[] {
    if (!ceilingEntity) {
      return [];
    }

    const lightSlotEntity = this.getLightSlotEntityById(ceilingEntity, lightSlotId);
    const parameters = lightSlotEntity?.parameters;
    const path = lightSlotEntity?.path;

    if (!parameters) {
      return [];
    }

    const items: PropertyBarItem[] = [];

    const MIN_WIDTH = 0.04;
    const MAX_WIDTH = 0.5;
    const MIN_HEIGHT = 0.02;
    const MAX_HEIGHT = 0.5;
    const DISPLAY_DIGITS = 0;
    const FLIP_POSITION_FLAG = 2;

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
              displayDigits: DISPLAY_DIGITS,
              includeUnit: true,
              rules: {
                range: {
                  min: MIN_WIDTH,
                  max: MAX_WIDTH
                },
                positiveOnly: true
              }
            },
            value: parameters.bLength,
            onValueChangeStart: () => {
              const command = this.cmdMgr.createCommand(
                HSFPConstants.CommandType.EditNCustomizedModelLightSlot,
                [ceilingEntity, lightSlotId]
              );
              this.cmdMgr.execute(command);
              this.cmdMgr.receive("ceilingchangebegin");
            },
            onValueChange: (event: ValueChangeEvent) => {
              const value = event.detail.value;
              this.cmdMgr.receive("ceilingchanging", { bLength: value });
            },
            onValueChangeEnd: (event: ValueChangeEvent) => {
              const value = event.detail.value;
              this.cmdMgr.receive("ceilingchangeend", { bLength: value });
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
              displayDigits: DISPLAY_DIGITS,
              includeUnit: true,
              rules: {
                range: {
                  min: MIN_HEIGHT,
                  max: MAX_HEIGHT
                },
                positiveOnly: true
              }
            },
            value: parameters.aLength,
            onValueChangeStart: () => {
              const command = this.cmdMgr.createCommand(
                HSFPConstants.CommandType.EditNCustomizedModelLightSlot,
                [ceilingEntity, lightSlotId]
              );
              this.cmdMgr.execute(command);
              this.cmdMgr.receive("ceilingchangebegin");
            },
            onValueChange: (event: ValueChangeEvent) => {
              const value = event.detail.value;
              this.cmdMgr.receive("ceilingchanging", { aLength: value });
            },
            onValueChangeEnd: (event: ValueChangeEvent) => {
              const value = event.detail.value;
              this.cmdMgr.receive("ceilingchangeend", { aLength: value });
              this.cmdMgr.complete();
            }
          }
        }
      ],
      order: 1
    });

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
                checked: false
              }
            ],
            onChange: () => {
              const command = this.cmdMgr.createCommand(
                HSFPConstants.CommandType.FlipNCustomizedLightSlot,
                [lightSlotEntity]
              );
              this.cmdMgr.execute(command);
            }
          }
        }
      ],
      order: 2
    });

    const selfHostLightBands = lightSlotEntity!.getSelfHostLightBand();
    const coedgesPosition = HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(path, ceilingEntity);

    items.push({
      id: "customized-light-slot-brand",
      parentId: "content-base-property",
      type: HSFPConstants.PropertyBarType.Switch,
      order: 3,
      data: {
        label: ResourceManager.getString("plugin_manuallighting_tab_lightband"),
        checkedChildren: ResourceManager.getString("toolbar_toggleCeiling_yes"),
        unCheckedChildren: ResourceManager.getString("toolbar_toggleCeiling_no"),
        checked: !!selfHostLightBands.length,
        onChange: (checked: boolean) => {
          const command = this.cmdMgr.createCommand(
            HSFPConstants.CommandType.ToggleSelfHostLightBand,
            [lightSlotEntity, checked]
          );
          this.cmdMgr.execute(command);
          this.cmdMgr.complete();
        }
      }
    });

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
            lightSlot: lightSlotEntity,
            parameters: parameters,
            hasSelsHostLightBands: !!selfHostLightBands.length,
            isFlip: FLIP_POSITION_FLAG !== coedgesPosition
          })
        );
      }
    });

    return items;
  }

  private getLightSlotEntityById(ceilingEntity: CeilingEntity, lightSlotId: string): LightSlotEntity | undefined {
    return Object.values(ceilingEntity.children).find(
      (entity) => entity.lightSlotId === lightSlotId
    );
  }
}