import { Vector3, MathUtil } from './math';
import { HSApp } from './app';
import { OptionTypeEnum } from './enums';
import { WallFaceAssemblyUtil } from './utils';

interface Entity {
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface SavedEntityData {
  content: Entity;
  position: Vector3;
  scale: Vector3;
  rotation: Vector3;
}

interface SizeRange {
  minSize: number;
  maxSize: number;
}

interface RangeLimit {
  min: number;
  max: number;
}

interface PropertyItemOptions {
  rules: {
    range: RangeLimit;
    positiveOnly: boolean;
  };
  includeUnit: boolean;
  readOnly?: boolean;
}

interface PropertyItemData {
  label: string;
  value: number;
  options: PropertyItemOptions;
  disabled?: boolean;
  onValueChangeStart?: () => void;
  onValueChange?: (event: { detail: { value: number } }) => void;
  onValueChangeEnd?: () => void;
}

interface PropertyItem {
  id: string;
  type: string;
  uiMode?: string[];
  data: PropertyItemData;
  label?: string;
  parentId?: string;
  order?: number;
  items?: PropertyItem[];
  resetItem?: {
    onResetClick: () => void;
  };
  enableDetailsInfo?: boolean;
  disabled?: boolean;
}

interface TransformRequest {
  onReceive(optionType: OptionTypeEnum, data: unknown): void;
}

interface Command {
  receive(action: string, data?: unknown): void;
}

interface CommandManager {
  createCommand(commandType: string, args: unknown[]): Command;
  execute(command: Command): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): TransformRequest;
}

interface Assembly {
  xSize: number;
  ySize: number;
  zSize: number;
  z: number;
}

interface App {
  cmdManager: CommandManager;
  transManager: TransactionManager;
  floorplan: {
    scene: {
      activeLayer: {
        height: number;
      };
    };
  };
  designMetadata: Map<string, unknown>;
  signalPropertyBarRefresh: {
    dispatch(): void;
  };
}

export class PropertyBarHandler {
  private readonly _entities: Entity[];
  private readonly _app: App;
  private readonly _cmdMgr: CommandManager;
  private readonly _transManager: TransactionManager;
  private readonly _assembly: Assembly;
  private _moveRequest?: TransformRequest;
  private readonly _saved: SavedEntityData[];
  private readonly _defaultSizeRange: SizeRange;

  constructor(entities: Entity[], assembly: Assembly) {
    this._entities = entities;
    this._app = HSApp.App.getApp();
    this._cmdMgr = this._app.cmdManager;
    this._transManager = this._app.transManager;
    this._assembly = assembly;
    this._saved = [];
    this._defaultSizeRange = {
      minSize: 0.001,
      maxSize: 9.999
    };
    this._saveOriginalData();
  }

  private _saveOriginalData(): void {
    this._entities?.forEach((entity) => {
      this._saved.push({
        content: entity,
        position: new Vector3(entity.x, entity.y, entity.z),
        scale: new Vector3(entity.XScale, entity.YScale, entity.ZScale),
        rotation: new Vector3(entity.XRotation, entity.YRotation, entity.ZRotation)
      });
    });
  }

  private _onBasicPropertyResetClick(): void {
    this._moveRequest = this._transManager.createRequest(
      HSFPConstants.RequestType.TransformInHardDecoration,
      [this._saved]
    );
    const offset = new Vector3(0, 0, 0);
    this._moveRequest.onReceive(OptionTypeEnum.Translate, { offset });
    HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
  }

  private _getPositionPropertyItems(): PropertyItem[] {
    const entity = this._entities[0];
    return [
      {
        id: 'wfa-basic-setting-plugin_elevation',
        type: PropertyBarControlTypeEnum.sliderInput,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        data: {
          label: ResourceManager.getString('plugin_elevation'),
          options: {
            rules: {
              range: {
                min: 0,
                max: HSApp.App.getApp().floorplan.scene.activeLayer.height
              },
              positiveOnly: true
            },
            includeUnit: true
          },
          value: entity.z,
          onValueChangeStart: () => {
            this._moveRequest = this._transManager.createRequest(
              HSFPConstants.RequestType.TransformInHardDecoration,
              [this._saved]
            );
          },
          onValueChange: (event) => {
            const newValue = event.detail.value;
            const originalZ = this._saved.find((saved) => saved.content === entity)!.position.z;
            this._moveRequest?.onReceive(OptionTypeEnum.Translate, {
              offset: new Vector3(0, 0, newValue - originalZ)
            });
          },
          onValueChangeEnd: () => {
            this._moveRequest = undefined;
          }
        }
      }
    ];
  }

  private _getSizePropertyItems(): PropertyItem[] {
    let resizeCommand: Command | undefined;
    const entityTransform = HSApp.Util.Entity.getEntityTransform(this._entities);
    const originalSize = new Vector3(entityTransform.XSize, entityTransform.YSize, entityTransform.ZSize);
    const originalPosition = new Vector3(entityTransform.x, entityTransform.y, entityTransform.z);
    const limitRange = WallFaceAssemblyUtil.getLimitRange(this._entities, originalSize);
    const sizeLimitUnlock = HSApp.App.getApp().designMetadata.get('sizeLimitUnlock') as boolean;

    return [
      {
        id: 'wfa-bgs-length-input',
        type: PropertyBarControlTypeEnum.sliderInput,
        data: {
          label: ResourceManager.getString('plugin_scalecontent_length'),
          value: entityTransform.XSize,
          options: {
            rules: {
              range: {
                min: limitRange.W ? limitRange.W[0] : this._defaultSizeRange.minSize,
                max: limitRange.W ? limitRange.W[1] : this._defaultSizeRange.maxSize
              },
              positiveOnly: true
            },
            includeUnit: true,
            readOnly: limitRange.W && MathUtil.isNearlyEqual(limitRange.W[0], limitRange.W[1]) && !sizeLimitUnlock
          },
          onValueChangeStart: () => {
            resizeCommand = this._cmdMgr.createCommand(
              HSFPConstants.CommandType.ResizeInHardDecoration,
              [this._entities, Vector3.readonlyX(), originalSize, originalPosition]
            );
            this._cmdMgr.execute(resizeCommand);
            resizeCommand.receive('sliderdragstart');
          },
          onValueChange: (event) => {
            const newValue = event.detail.value;
            resizeCommand?.receive('sliderdragmove', {
              offset: [newValue - entityTransform.XSize, 0, 0]
            });
          },
          onValueChangeEnd: () => {
            resizeCommand?.receive('sliderdragend');
          }
        }
      },
      {
        id: 'wfa-bgs-width-input',
        type: PropertyBarControlTypeEnum.sliderInput,
        data: {
          label: ResourceManager.getString('plugin_scalecontent_depth'),
          value: entityTransform.YSize,
          options: {
            rules: {
              range: {
                min: !sizeLimitUnlock && limitRange.D ? limitRange.D[0] : this._defaultSizeRange.minSize,
                max: !sizeLimitUnlock && limitRange.D ? limitRange.D[1] : this._defaultSizeRange.maxSize
              },
              positiveOnly: true
            },
            includeUnit: true,
            readOnly: limitRange.D && MathUtil.isNearlyEqual(limitRange.D[0], limitRange.D[1]) && !sizeLimitUnlock
          },
          onValueChangeStart: () => {
            resizeCommand = this._cmdMgr.createCommand(
              HSFPConstants.CommandType.ResizeInHardDecoration,
              [this._entities, Vector3.readonlyY(), originalSize, originalPosition]
            );
            this._cmdMgr.execute(resizeCommand);
            resizeCommand.receive('sliderdragstart');
          },
          onValueChange: (event) => {
            const newValue = event.detail.value;
            resizeCommand?.receive('sliderdragmove', {
              offset: [0, newValue - entityTransform.YSize, 0]
            });
          },
          onValueChangeEnd: () => {
            resizeCommand?.receive('sliderdragend');
          }
        }
      },
      {
        id: 'wfa-bgs-height-input',
        type: PropertyBarControlTypeEnum.sliderInput,
        data: {
          label: ResourceManager.getString('plugin_scalecontent_height'),
          value: entityTransform.ZSize,
          options: {
            rules: {
              range: {
                min: !sizeLimitUnlock && limitRange.H ? limitRange.H[0] : this._defaultSizeRange.minSize,
                max: !sizeLimitUnlock && limitRange.H ? limitRange.H[1] : this._defaultSizeRange.maxSize
              },
              positiveOnly: true
            },
            includeUnit: true,
            readOnly: limitRange.H && MathUtil.isNearlyEqual(limitRange.H[0], limitRange.H[1]) && !sizeLimitUnlock
          },
          onValueChangeStart: () => {
            resizeCommand = this._cmdMgr.createCommand(
              HSFPConstants.CommandType.ResizeInHardDecoration,
              [this._entities, Vector3.readonlyZ(), originalSize, originalPosition]
            );
            this._cmdMgr.execute(resizeCommand);
            resizeCommand.receive('sliderdragstart');
          },
          onValueChange: (event) => {
            const newValue = event.detail.value;
            resizeCommand?.receive('sliderdragmove', {
              offset: [0, 0, newValue - entityTransform.ZSize]
            });
          },
          onValueChangeEnd: () => {
            resizeCommand?.receive('sliderdragend');
          }
        }
      }
    ];
  }

  public getNcpBgwPropertyBarItems(): PropertyItem[] {
    if (!this._entities.length) {
      return [];
    }

    const items: PropertyItem[] = [];
    items.push(
      {
        type: HSFPConstants.PropertyBarType.PropertyBar,
        label: this._entities.length > 1
          ? ResourceManager.getString('plugin_wallface_assembly_wallboard_group')
          : ResourceManager.getString('plugin_wallface_assembly_wallboard'),
        enableDetailsInfo: false,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem,
      {
        id: 'wfa-bgs-first-level',
        label: ResourceManager.getString('plugin_propertybar_parameter_setting'),
        type: HSFPConstants.PropertyBarType.FirstLevelNode,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem,
      {
        id: 'wfa-bgs-property',
        parentId: 'wfa-bgs-first-level',
        label: ResourceManager.getString('plugin_wallproperty_base_property'),
        type: HSFPConstants.PropertyBarType.SecondLevelNode,
        order: 1,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        resetItem: {
          onResetClick: () => this._onBasicPropertyResetClick()
        }
      } as PropertyItem,
      {
        id: 'wfa-bgs-setting-size',
        label: ResourceManager.getString('plugin_propertybar_size_setting'),
        parentId: 'wfa-bgs-property',
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        order: 3,
        items: this._getSizePropertyItems(),
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem,
      {
        id: 'wfa-setting-position',
        label: ResourceManager.getString('plugin_propertybar_position_setting'),
        parentId: 'wfa-bgs-property',
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        order: 3,
        items: this._getPositionPropertyItems(),
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem
    );

    return items;
  }

  public getWfaPropertyBarItems(assembly: Assembly): PropertyItem[] {
    const items: PropertyItem[] = [];
    items.push(
      {
        id: 'wfa-first-level',
        label: ResourceManager.getString('plugin_propertybar_parameter_setting'),
        type: HSFPConstants.PropertyBarType.FirstLevelNode,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem,
      {
        id: 'wfa-base-property',
        parentId: 'wfa-first-level',
        label: ResourceManager.getString('plugin_wallproperty_base_property'),
        type: HSFPConstants.PropertyBarType.SecondLevelNode,
        order: 1,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem,
      {
        id: 'wfa-setting-size',
        label: ResourceManager.getString('plugin_propertybar_size_setting'),
        parentId: 'wfa-base-property',
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        order: 3,
        items: [
          {
            id: 'wfa-length-input',
            type: PropertyBarControlTypeEnum.sliderInput,
            data: {
              label: ResourceManager.getString('plugin_scalecontent_length'),
              value: assembly.xSize,
              disabled: true,
              options: {
                readOnly: true,
                rules: {
                  range: {
                    min: 0,
                    max: assembly.xSize
                  },
                  positiveOnly: true
                },
                includeUnit: true
              }
            }
          },
          {
            id: 'wfa-width-input',
            type: PropertyBarControlTypeEnum.sliderInput,
            data: {
              label: ResourceManager.getString('plugin_scalecontent_depth'),
              value: assembly.ySize,
              disabled: true,
              options: {
                readOnly: true,
                rules: {
                  range: {
                    min: 0,
                    max: assembly.ySize
                  },
                  positiveOnly: true
                },
                includeUnit: true
              }
            }
          },
          {
            id: 'wfa-height-input',
            type: PropertyBarControlTypeEnum.sliderInput,
            data: {
              label: ResourceManager.getString('plugin_scalecontent_height'),
              value: assembly.zSize,
              disabled: true,
              options: {
                readOnly: true,
                rules: {
                  range: {
                    min: 0,
                    max: assembly.zSize
                  },
                  positiveOnly: true
                },
                includeUnit: true
              }
            }
          }
        ],
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem,
      {
        id: 'wfa-setting-position',
        label: ResourceManager.getString('plugin_propertybar_position_setting'),
        parentId: 'wfa-base-property',
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        order: 3,
        items: [
          {
            id: 'wfa-basic-setting-plugin_elevation',
            type: PropertyBarControlTypeEnum.sliderInput,
            uiMode: [HSFPConstants.UIMode.layoutDesignMode],
            data: {
              label: ResourceManager.getString('plugin_elevation'),
              value: assembly.z,
              disabled: true,
              options: {
                readOnly: true,
                rules: {
                  range: {
                    min: 0,
                    max: assembly.z
                  },
                  positiveOnly: true
                },
                includeUnit: true
              }
            }
          }
        ],
        uiMode: [HSFPConstants.UIMode.layoutDesignMode]
      } as PropertyItem
    );

    return items;
  }
}