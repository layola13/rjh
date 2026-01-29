interface LightBandParameters {
  flip: boolean;
  [key: string]: unknown;
}

interface MoldingEntity {
  lightBandId: string;
  parameters: LightBandParameters;
  profileWidth: number;
  children?: Record<string, MoldingEntity>;
}

interface PropertyBarItem {
  id: string;
  parentId: string;
  label?: string;
  type: string;
  resetItem?: {
    onResetClick: () => void;
  };
  items?: PropertyBarItem[];
  order?: number;
  data?: {
    label?: string;
    name?: string;
    options?: {
      rules?: {
        range?: {
          min: number;
          max: number;
        };
        positiveOnly?: boolean;
      };
      includeUnit?: boolean;
    };
    value?: number;
    blocks?: Array<{
      icon: string;
      checked: boolean;
    }>;
    onValueChangeStart?: () => void;
    onValueChange?: (event: { detail: { value: number } }) => void;
    onValueChangeEnd?: () => void;
    onChange?: (index: number, checked: boolean) => void;
  };
}

interface CatalogPlugin {
  [key: string]: unknown;
}

interface CommandManager {
  createCommand(commandType: string, args: unknown[]): unknown;
  execute(command: unknown): void;
  receive(eventName: string, data?: Record<string, unknown>): void;
  complete(): void;
}

interface PluginManager {
  getPlugin(pluginType: string): CatalogPlugin;
}

interface App {
  pluginManager: PluginManager;
  cmdManager: CommandManager;
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
    EditNCustomizedModelLightBand: string;
  };
  PropertyBarType: {
    ThirdLevelNode: string;
    CheckBlock: string;
  };
};

declare const PropertyBarControlTypeEnum: {
  sliderInput: string;
};

declare const ResourceManager: {
  getString(key: string): string;
};

export class NCustomizedLightBandPropertyBarHandler {
  private app: App;
  private catalogPlugin: CatalogPlugin;
  private cmdMgr: CommandManager;

  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  public getCustomizedLightBandItems(entity: MoldingEntity | null, lightBandId: string): PropertyBarItem[] {
    if (!entity) {
      return [];
    }

    const isManualAddLightBand = lightBandId?.includes("manualAddLightBand");
    const moldingEntity = this.getMoldingEntityById(entity, lightBandId);
    const parameters = moldingEntity.parameters;

    if (!parameters) {
      return [];
    }

    const items: PropertyBarItem[] = [];

    if (isManualAddLightBand) {
      items.push(
        {
          id: "customized-light-brand-size",
          parentId: "content-base-property",
          label: ResourceManager.getString("plugin_right_propertybar_custom_tile_size"),
          type: HSFPConstants.PropertyBarType.ThirdLevelNode,
          resetItem: {
            onResetClick: () => {
              const command = this.cmdMgr.createCommand(
                HSFPConstants.CommandType.EditNCustomizedModelLightBand,
                [entity, lightBandId]
              );
              this.cmdMgr.execute(command);
              this.cmdMgr.receive("sizeReset");
              this.cmdMgr.complete();
            }
          },
          items: [
            {
              id: "customized-light-brand-size-width",
              parentId: "customized-light-brand-size",
              type: PropertyBarControlTypeEnum.sliderInput,
              data: {
                label: ResourceManager.getString("plugin_scalecontent_width"),
                name: ResourceManager.getString("plugin_scalecontent_width"),
                options: {
                  rules: {
                    range: {
                      min: 0.001,
                      max: 1
                    },
                    positiveOnly: true
                  },
                  includeUnit: true
                },
                value: moldingEntity.profileWidth,
                onValueChangeStart: () => {
                  const command = this.cmdMgr.createCommand(
                    HSFPConstants.CommandType.EditNCustomizedModelLightBand,
                    [entity, lightBandId]
                  );
                  this.cmdMgr.execute(command);
                },
                onValueChange: (event: { detail: { value: number } }) => {
                  this.cmdMgr.receive("profileWidth", {
                    profileWidth: event.detail.value
                  });
                },
                onValueChangeEnd: () => {
                  this.cmdMgr.complete();
                }
              }
            }
          ],
          order: 1
        },
        {
          id: "customized-light-brand-position",
          parentId: "content-base-property",
          label: ResourceManager.getString("plugin_propertybar_position_setting"),
          type: HSFPConstants.PropertyBarType.ThirdLevelNode,
          items: [
            {
              id: "customized-light-brand-position-flip",
              parentId: "customized-light-brand-position",
              type: HSFPConstants.PropertyBarType.CheckBlock,
              data: {
                label: ResourceManager.getString("plugin_customizedModeling_lightband_flip"),
                blocks: [
                  {
                    icon: "hs_shuxingmianban_zhouneifanzhuan",
                    checked: parameters.flip
                  }
                ],
                onChange: (_index: number, checked: boolean) => {
                  const command = this.cmdMgr.createCommand(
                    HSFPConstants.CommandType.EditNCustomizedModelLightBand,
                    [entity, lightBandId]
                  );
                  this.cmdMgr.execute(command);
                  this.cmdMgr.receive("flip", {
                    flip: checked
                  });
                  this.cmdMgr.complete();
                }
              }
            }
          ],
          order: 2
        }
      );
    }

    return items;
  }

  private getMoldingEntityById(entity: MoldingEntity, lightBandId: string): MoldingEntity {
    return Object.values(entity.children ?? {}).find(
      (child: MoldingEntity) => child.lightBandId === lightBandId
    )!;
  }
}