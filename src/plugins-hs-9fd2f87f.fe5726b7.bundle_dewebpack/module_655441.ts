import { StatusBarItem, PropertyBarControlTypeEnum } from './types';

interface SizeProperties {
  sideA: number;
  sideB: number;
  sideC: number;
  sideD?: number;
  height: number;
  elevation: number;
}

interface RangeData {
  sideARange: { min: number; max: number };
  sideBRange: { min: number; max: number };
  sideCRange: { min: number; max: number };
  sideDRange: { min: number; max: number };
}

interface CornerWindowEntity {
  sideA: number;
  sideB: number;
  sideC: number;
  sideD: number;
  height: number;
  elevation: number;
  getSideRangeData(): RangeData;
  instanceOf(modelClass: string): boolean;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

interface FieldChangeEvent {
  target: {
    fieldName: string;
  };
}

interface CommandContext {
  update(items: StatusBarItem[]): void;
  createCommand(commandType: string, args: unknown[]): unknown;
  execute(command: unknown): void;
}

const FIELD_NAMES = ['sideA', 'sideB', 'sideC', 'sideD', 'height', 'elevation'] as const;

type FieldName = typeof FIELD_NAMES[number];

export default class CornerWindowPropertyHandler {
  /**
   * Gets status bar items for corner window entities
   */
  getStatusBarItems_(entities: CornerWindowEntity[], context: CommandContext): StatusBarItem[] {
    let items: StatusBarItem[] = [];
    
    if (HSApp.Util.Entity.isTypeOf(HSConstants.ModelClass.NgCornerWindow, entities)) {
      items = this._getStatusBarItems(entities, context);
    }
    
    return items.filter((item) => item);
  }

  /**
   * Handles field change events for corner windows
   */
  onCornerWindowFieldChanged_(
    event: FieldChangeEvent,
    entities: CornerWindowEntity[],
    context: CommandContext,
    commandContext: CommandContext
  ): void {
    const target = event.target;
    
    if (Object.values(FIELD_NAMES).includes(target.fieldName as FieldName)) {
      commandContext.update(this.getStatusBarItems_(entities, context));
    }
  }

  /**
   * Handles flag change events for corner windows
   */
  onCornerWindowFlagChanged_(
    event: unknown,
    entities: CornerWindowEntity[],
    context: CommandContext,
    commandContext: CommandContext
  ): void {
    // No implementation
  }

  /**
   * Builds the property bar items for corner window
   */
  private _getStatusBarItems(entities: CornerWindowEntity[], context: CommandContext): StatusBarItem[] {
    const sizeProps = this._getSizeProps(entities);
    const entity = entities[0];
    const rangeData = entity.getSideRangeData();
    const app = HSApp.App.getApp();
    const items: StatusBarItem[] = [];
    const firstEntity = entities[0];

    // Height input
    const heightInput: StatusBarItem = {
      id: 'heightInput',
      type: PropertyBarControlTypeEnum.lengthInput,
      order: 110,
      data: {
        label: ResourceManager.getString('plugin_cornerwindow_height'),
        name: 'height',
        options: {
          rules: {
            range: {
              min: 0.001,
              max: app.floorplan.global_wall_height3d
            },
            positiveOnly: true
          },
          includeUnit: true,
          readOnly: false
        },
        value: sizeProps.height,
        onValueChange: (event: ValueChangeEvent) => {
          this._resizeCornerWindow(event.detail.value, FIELD_NAMES[4], entity, context);
        }
      }
    };
    items.push(heightInput);

    // Elevation input
    const elevationInput: StatusBarItem = {
      id: 'elevationInput',
      type: PropertyBarControlTypeEnum.lengthInput,
      order: 120,
      data: {
        label: ResourceManager.getString('plugin_elevation'),
        name: 'elevation',
        options: {
          rules: {
            range: {
              min: 0,
              max: app.floorplan.global_wall_height3d
            },
            positiveOnly: true
          },
          includeUnit: true,
          readOnly: false
        },
        value: sizeProps.elevation,
        onValueChange: (event: ValueChangeEvent) => {
          this._resizeCornerWindow(event.detail.value, FIELD_NAMES[5], entity, context);
        }
      }
    };
    items.push(elevationInput);

    // Side A input
    const sideALabel = firstEntity.instanceOf(HSConstants.ModelClass.NgBayWindow)
      ? ResourceManager.getString('plugin_baywindow_sidea')
      : ResourceManager.getString('plugin_cornerwindow_sidea');
    
    const sideAInput: StatusBarItem = {
      id: 'sideAInput',
      type: PropertyBarControlTypeEnum.lengthInput,
      order: 130,
      data: {
        label: sideALabel,
        name: 'sidea',
        options: {
          rules: {
            range: {
              min: rangeData.sideARange.min,
              max: rangeData.sideARange.max
            },
            positiveOnly: true
          },
          includeUnit: true,
          readOnly: false
        },
        value: sizeProps.sideA,
        onValueChange: (event: ValueChangeEvent) => {
          this._resizeCornerWindow(event.detail.value, FIELD_NAMES[0], entity, context);
        }
      }
    };
    items.push(sideAInput);

    // Side B input
    const sideBLabel = firstEntity.instanceOf(HSConstants.ModelClass.NgBayWindow)
      ? ResourceManager.getString('plugin_baywindow_sideb')
      : ResourceManager.getString('plugin_cornerwindow_sideb');
    
    const sideBInput: StatusBarItem = {
      id: 'sideBInput',
      type: PropertyBarControlTypeEnum.lengthInput,
      order: 140,
      data: {
        label: sideBLabel,
        name: 'sideb',
        options: {
          rules: {
            range: {
              min: rangeData.sideBRange.min,
              max: rangeData.sideBRange.max
            },
            positiveOnly: true
          },
          includeUnit: true,
          readOnly: false
        },
        value: sizeProps.sideB,
        onValueChange: (event: ValueChangeEvent) => {
          this._resizeCornerWindow(event.detail.value, FIELD_NAMES[1], entity, context);
        }
      }
    };
    items.push(sideBInput);

    // Side C and D inputs (only for non-bay windows)
    if (!firstEntity.instanceOf(HSConstants.ModelClass.NgBayWindow)) {
      const sideCInput: StatusBarItem = {
        id: 'sideCInput',
        type: PropertyBarControlTypeEnum.lengthInput,
        order: 150,
        data: {
          label: ResourceManager.getString('plugin_cornerwindow_sidec'),
          name: 'sidec',
          options: {
            rules: {
              range: {
                min: rangeData.sideCRange.min,
                max: rangeData.sideCRange.max
              },
              positiveOnly: true
            },
            includeUnit: true,
            readOnly: false
          },
          value: sizeProps.sideC,
          onValueChange: (event: ValueChangeEvent) => {
            this._resizeCornerWindow(event.detail.value, FIELD_NAMES[2], entity, context);
          }
        }
      };
      items.push(sideCInput);

      const sideDInput: StatusBarItem = {
        id: 'sideDInput',
        type: PropertyBarControlTypeEnum.lengthInput,
        order: 160,
        data: {
          label: ResourceManager.getString('plugin_cornerwindow_sided'),
          name: 'sided',
          options: {
            rules: {
              range: {
                min: rangeData.sideDRange.min,
                max: rangeData.sideDRange.max
              },
              positiveOnly: true
            },
            includeUnit: true,
            readOnly: false
          },
          value: sizeProps.sideD,
          onValueChange: (event: ValueChangeEvent) => {
            this._resizeCornerWindow(event.detail.value, FIELD_NAMES[3], entity, context);
          }
        }
      };
      items.push(sideDInput);

      const divider: StatusBarItem = {
        type: PropertyBarControlTypeEnum.divider,
        order: 180
      };
      items.push(divider);
    }

    return items;
  }

  /**
   * Extracts size properties from corner window entity
   */
  private _getSizeProps(entities: CornerWindowEntity[]): SizeProperties {
    const entity = entities[0];
    
    if (entity.instanceOf(HSConstants.ModelClass.NgBayWindow)) {
      return {
        sideA: entity.sideA,
        sideB: entity.sideB,
        sideC: entity.sideC,
        height: entity.height,
        elevation: entity.elevation
      };
    }
    
    return {
      sideA: entity.sideA,
      sideB: entity.sideB,
      sideC: entity.sideC,
      sideD: entity.sideD,
      height: entity.height,
      elevation: entity.elevation
    };
  }

  /**
   * Resizes the corner window by updating the specified field
   */
  private _resizeCornerWindow(
    value: number,
    fieldName: FieldName,
    entity: CornerWindowEntity,
    context: CommandContext
  ): void {
    const props: Partial<SizeProperties> = {};

    if (fieldName === FIELD_NAMES[0]) {
      props.sideA = value;
      if (entity.instanceOf(HSConstants.ModelClass.NgBayWindow)) {
        props.sideC = value;
      }
    } else if (fieldName === FIELD_NAMES[1]) {
      props.sideB = value;
    } else if (fieldName === FIELD_NAMES[2]) {
      props.sideC = value;
    } else if (fieldName === FIELD_NAMES[3]) {
      props.sideD = value;
    } else if (fieldName === FIELD_NAMES[4]) {
      props.height = value;
    } else if (fieldName === FIELD_NAMES[5]) {
      props.elevation = value;
    }

    const command = context.createCommand(
      HSFPConstants.CommandType.EditCornerWindow,
      [entity, props, true]
    );
    context.execute(command);
  }
}