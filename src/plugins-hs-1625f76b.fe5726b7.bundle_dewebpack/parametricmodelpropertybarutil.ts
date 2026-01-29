import { HSCore } from './635589';
import { IDefaultSizeRange, ISizeType } from './555330';
import { EN_UNITS_TYPE, expr } from './969029';

interface SizeRange {
  minSize: number;
  maxSize: number;
}

interface DropdownOption {
  id: string;
  title: string;
}

interface RangeLimit {
  min: number;
  max: number;
}

interface VariableLimit {
  type: string;
  value?: number[];
  minValue?: number;
  maxValue?: number;
}

interface SizeRangeConfig {
  W: VariableLimit;
  D: VariableLimit;
  H: VariableLimit;
}

interface ParametricModelNode {
  unit: string;
  minMax?: [number, number];
  XSize: number;
  YSize: number;
  ZSize: number;
  isScalable: boolean;
  getSizeRange(): SizeRangeConfig;
}

interface PropertyBarItem {
  id: string;
  type: string;
  uniqueKey: boolean;
  uiMode: string[];
  data: Record<string, unknown>;
}

export class ParametricModelPropertyBarUtil {
  static convertAngle(angle: number): number {
    angle %= 360;
    if (angle > 180) {
      angle -= 360;
    } else if (angle < -180) {
      angle += 360;
    }
    return angle;
  }

  private static _getUnitParam(): number {
    const displayUnit = HSApp.App.getApp().floorplan.displayLengthUnit;
    switch (displayUnit) {
      case HSCore.Util.Unit.LengthUnitTypeEnum.meter:
        return 1;
      case HSCore.Util.Unit.LengthUnitTypeEnum.centimeter:
        return 100;
      case HSCore.Util.Unit.LengthUnitTypeEnum.millimeter:
        return 1000;
      default:
        return 1;
    }
  }

  private static _getSizeOptions(values: number[]): DropdownOption[] {
    return values.map((value) => {
      const convertedValue = this._covertNumByUnit(value);
      return {
        id: convertedValue,
        title: convertedValue,
      };
    });
  }

  private static _covertNumByUnit(value: number): string {
    const displayUnit = HSApp.App.getApp().floorplan.displayLengthUnit;
    switch (displayUnit) {
      case HSCore.Util.Unit.LengthUnitTypeEnum.meter:
        return value.toFixed(3);
      case HSCore.Util.Unit.LengthUnitTypeEnum.centimeter:
        return (100 * value).toFixed(1);
      case HSCore.Util.Unit.LengthUnitTypeEnum.millimeter:
        return (1000 * value).toFixed(0);
      default:
        return String(value);
    }
  }

  static getUnitByUnitType(unitType: string): string | undefined {
    if (unitType === EN_UNITS_TYPE.PIECES) {
      return ResourceManager.getString('unitType_ge');
    }
    return undefined;
  }

  static getOptionsDropdownSuffix(unitType: string): string | undefined {
    if (unitType === EN_UNITS_TYPE.PIECES) {
      return ResourceManager.getString('unitType_ge');
    }
    const displayUnit = HSApp.App.getApp().floorplan.displayLengthUnit;
    if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.meter) {
      return 'm';
    } else if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.centimeter) {
      return 'cm';
    } else if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.millimeter) {
      return 'mm';
    }
    return undefined;
  }

  static getInputValueByUnitType(unitType: string, value: number): number {
    return unitType === EN_UNITS_TYPE.PIECES ? value : value / 1000;
  }

  static getOutputValueByUnitType(unitType: string, value: number): number {
    return unitType === EN_UNITS_TYPE.PIECES ? value : 1000 * value;
  }

  static getSizeRangeByNode(node: ParametricModelNode): SizeRange {
    const sizeLimitUnlock = HSApp.App.getApp().designMetadata.get('sizeLimitUnlock');
    
    if (node.unit === EN_UNITS_TYPE.PIECES) {
      return {
        minSize: !sizeLimitUnlock && node.minMax?.[0] ? node.minMax[0] : 1,
        maxSize: !sizeLimitUnlock && node.minMax?.[1] ? node.minMax[1] : 9999,
      };
    }
    
    return {
      minSize: !sizeLimitUnlock && node.minMax?.[0] ? node.minMax[0] / 1000 : IDefaultSizeRange.minSize,
      maxSize: !sizeLimitUnlock && node.minMax?.[1] ? node.minMax[1] / 1000 : IDefaultSizeRange.maxSize,
    };
  }

  static getOptionsDropdownList(values: number[], unitType: string): DropdownOption[] {
    const options: DropdownOption[] = [];
    
    for (const value of values) {
      const dropdownValue = this.getOptionsDropdownValue(value, unitType);
      const exists = options.find((option) => option.id === dropdownValue);
      if (!exists) {
        options.push({
          id: dropdownValue,
          title: dropdownValue,
        });
      }
    }
    
    return options;
  }

  static getOptionsDropdownValue(value: number | string, unitType: string): string {
    if (unitType === EN_UNITS_TYPE.MILLIMETER) {
      const displayUnit = HSApp.App.getApp().floorplan.displayLengthUnit;
      const numValue = Number(value);
      
      if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.meter) {
        return (0.001 * numValue).toFixed(3).toString();
      } else if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.centimeter) {
        return (0.1 * numValue).toFixed(1).toString();
      } else if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.millimeter) {
        return numValue.toFixed(0).toString();
      }
    }
    return `${value}`;
  }

  static getOptionsDropdownOutputValue(value: number | string, unitType: string): number {
    if (unitType === EN_UNITS_TYPE.MILLIMETER) {
      const displayUnit = HSApp.App.getApp().floorplan.displayLengthUnit;
      const numValue = Number(value);
      
      if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.meter) {
        return 1000 * numValue;
      } else if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.centimeter) {
        return 10 * numValue;
      } else if (displayUnit === HSCore.Util.Unit.LengthUnitTypeEnum.millimeter) {
        return numValue;
      }
    }
    return Number(value);
  }

  static getDisplayDigits(unitType: string): number {
    if (unitType === EN_UNITS_TYPE.MILLIMETER) {
      const displayUnit = HSApp.App.getApp().floorplan.displayLengthUnit;
      switch (displayUnit) {
        case HSCore.Util.Unit.LengthUnitTypeEnum.meter:
          return 3;
        case HSCore.Util.Unit.LengthUnitTypeEnum.centimeter:
          return 1;
        default:
          return 0;
      }
    }
    return 0;
  }

  private static _onSizeChange(node: ParametricModelNode, sizeType: string, value: number): void {
    const cmdManager = HSApp.App.getApp().cmdManager;
    const command = cmdManager.createCommand(HSFPConstants.CommandType.ResizeContents, [
      [node],
      undefined,
      () => HSFPConstants.RequestType.ResizeContent,
    ]);
    cmdManager.execute(command);
    cmdManager.receive('sliderdragmove', {
      resize: true,
      value,
      type: sizeType,
    });
    cmdManager.receive('sliderdragend', {});
    HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
  }

  private static _getRangeBySizeType(node: ParametricModelNode, sizeType: keyof SizeRangeConfig): RangeLimit {
    const range: RangeLimit = {
      min: IDefaultSizeRange.minSize,
      max: IDefaultSizeRange.maxSize,
    };
    
    const sizeRange = node.getSizeRange();
    const sizeLimitUnlock = HSApp.App.getApp().designMetadata.get('sizeLimitUnlock');
    
    if (!sizeLimitUnlock) {
      const limitConfig = sizeRange[sizeType];
      if (limitConfig) {
        if (limitConfig.type === expr.EN_VARIABLE_LIMIT_TYPE.INTERVAL && limitConfig.value) {
          range.min = limitConfig.value[0] / 1000;
          range.max = limitConfig.value[1] / 1000;
        } else if (limitConfig.type === expr.EN_VARIABLE_LIMIT_TYPE.INCREMENT) {
          if (limitConfig.minValue !== undefined) range.min = limitConfig.minValue / 1000;
          if (limitConfig.maxValue !== undefined) range.max = limitConfig.maxValue / 1000;
        }
      }
    }
    
    return range;
  }

  static getSizePropertyItems(node: ParametricModelNode): PropertyBarItem[] {
    const sizeRange = node.getSizeRange();
    const sizeLimitUnlock = HSApp.App.getApp().designMetadata.get('sizeLimitUnlock');
    const unitParam = this._getUnitParam();

    const widthItem = (() => {
      if (sizeRange.W.type !== expr.EN_VARIABLE_LIMIT_TYPE.OPTIONS || sizeLimitUnlock) {
        const range = this._getRangeBySizeType(node, 'W');
        return {
          id: 'parametric-model-basic-setting-length',
          type: PropertyBarControlTypeEnum.sliderInput,
          uniqueKey: true,
          uiMode: [HSFPConstants.UIMode.layoutDesignMode],
          data: {
            label: ResourceManager.getString('plugin_scalecontent_width'),
            name: ResourceManager.getString('plugin_scalecontent_width'),
            options: {
              rules: {
                range,
                positiveOnly: true,
              },
              includeUnit: true,
              readOnly: !node.isScalable || (sizeRange.W.type === expr.EN_VARIABLE_LIMIT_TYPE.FIXED && !sizeLimitUnlock) || sizeRange.W.type === expr.EN_VARIABLE_LIMIT_TYPE.EXPRESSION,
              tips: node.isScalable ? '' : ResourceManager.getString('plugin_propertybar_unlock_model_disabled_tips_parent'),
            },
            value: node.XSize,
            disabled: !node.isScalable,
            onValueChangeStart: () => {
              const command = HSApp.App.getApp().cmdManager.createCommand(HSFPConstants.CommandType.ResizeContents, [
                [node],
                undefined,
                () => HSFPConstants.RequestType.ResizeContent,
              ]);
              HSApp.App.getApp().cmdManager.execute(command);
            },
            onValueChange: (event: { detail: { value: number } }) => {
              HSApp.App.getApp().cmdManager.receive('sliderdragmove', {
                resize: true,
                value: event.detail.value,
                type: ISizeType.x,
              });
            },
            onValueChangeEnd: () => {
              HSApp.App.getApp().cmdManager.receive('sliderdragend', {});
              HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
            },
          },
        };
      }

      const optionValues = sizeRange.W.value ?? [];
      const currentSize = node.XSize;
      const uniqueValues = [...new Set([...optionValues.map((v) => v / 1000), currentSize])];

      return {
        id: 'parametric-model-basic-setting-length',
        type: HSFPConstants.PropertyBarType.DropdownInput,
        uniqueKey: true,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        data: {
          options: this._getSizeOptions(uniqueValues),
          defaultValue: this._covertNumByUnit(currentSize),
          title: ResourceManager.getString('plugin_scalecontent_width'),
          suffix: HSApp.App.getApp().floorplan.displayLengthUnit,
          editable: false,
          disabled: !node.isScalable,
          onChange: (value: number) => {
            this._onSizeChange(node, ISizeType.x, value / unitParam);
          },
        },
      };
    })();

    const depthItem = (() => {
      if (sizeRange.D.type !== expr.EN_VARIABLE_LIMIT_TYPE.OPTIONS || sizeLimitUnlock) {
        const range = this._getRangeBySizeType(node, 'D');
        return {
          id: 'parametric-model-basic-setting-depth',
          type: PropertyBarControlTypeEnum.sliderInput,
          uniqueKey: true,
          uiMode: [HSFPConstants.UIMode.layoutDesignMode],
          data: {
            label: ResourceManager.getString('plugin_scalecontent_depth'),
            name: ResourceManager.getString('plugin_scalecontent_depth'),
            options: {
              rules: {
                range,
                positiveOnly: true,
              },
              includeUnit: true,
              readOnly: !node.isScalable || (sizeRange.D.type === expr.EN_VARIABLE_LIMIT_TYPE.FIXED && !sizeLimitUnlock) || sizeRange.D.type === expr.EN_VARIABLE_LIMIT_TYPE.EXPRESSION,
              tips: node.isScalable ? '' : ResourceManager.getString('plugin_propertybar_unlock_model_disabled_tips_parent'),
            },
            value: node.YSize,
            disabled: !node.isScalable,
            onValueChangeStart: () => {
              const command = HSApp.App.getApp().cmdManager.createCommand(HSFPConstants.CommandType.ResizeContents, [
                [node],
                undefined,
                () => HSFPConstants.RequestType.ResizeContent,
              ]);
              HSApp.App.getApp().cmdManager.execute(command);
            },
            onValueChange: (event: { detail: { value: number } }) => {
              HSApp.App.getApp().cmdManager.receive('sliderdragmove', {
                resize: true,
                value: event.detail.value,
                type: ISizeType.y,
              });
            },
            onValueChangeEnd: () => {
              HSApp.App.getApp().cmdManager.receive('sliderdragend', {});
              HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
            },
          },
        };
      }

      const optionValues = sizeRange.D.value ?? [];
      const currentSize = node.YSize;
      const uniqueValues = [...new Set([...optionValues.map((v) => v / 1000), currentSize])];

      return {
        id: 'parametric-model-basic-setting-depth',
        type: HSFPConstants.PropertyBarType.DropdownInput,
        uniqueKey: true,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        data: {
          options: this._getSizeOptions(uniqueValues),
          defaultValue: this._covertNumByUnit(currentSize),
          title: ResourceManager.getString('plugin_scalecontent_depth'),
          suffix: HSApp.App.getApp().floorplan.displayLengthUnit,
          editable: false,
          disabled: !node.isScalable,
          onChange: (value: number) => {
            this._onSizeChange(node, ISizeType.y, value / unitParam);
          },
        },
      };
    })();

    const heightItem = (() => {
      if (sizeRange.H.type !== expr.EN_VARIABLE_LIMIT_TYPE.OPTIONS || sizeLimitUnlock) {
        const range = this._getRangeBySizeType(node, 'H');
        return {
          id: 'parametric-model-basic-setting-height',
          type: PropertyBarControlTypeEnum.sliderInput,
          uniqueKey: true,
          uiMode: [HSFPConstants.UIMode.layoutDesignMode],
          data: {
            label: ResourceManager.getString('plugin_manuallighting_attr_wall_height'),
            name: ResourceManager.getString('plugin_manuallighting_attr_wall_height'),
            options: {
              rules: {
                range,
                positiveOnly: true,
              },
              includeUnit: true,
              readOnly: !node.isScalable || (sizeRange.H.type === expr.EN_VARIABLE_LIMIT_TYPE.FIXED && !sizeLimitUnlock) || sizeRange.H.type === expr.EN_VARIABLE_LIMIT_TYPE.EXPRESSION,
              tips: node.isScalable ? '' : ResourceManager.getString('plugin_propertybar_unlock_model_disabled_tips_parent'),
            },
            value: node.ZSize,
            disabled: !node.isScalable,
            onValueChangeStart: () => {
              const command = HSApp.App.getApp().cmdManager.createCommand(HSFPConstants.CommandType.ResizeContents, [
                [node],
                undefined,
                () => HSFPConstants.RequestType.ResizeContent,
              ]);
              HSApp.App.getApp().cmdManager.execute(command);
            },
            onValueChange: (event: { detail: { value: number } }) => {
              HSApp.App.getApp().cmdManager.receive('sliderdragmove', {
                resize: true,
                value: event.detail.value,
                type: ISizeType.z,
              });
            },
            onValueChangeEnd: () => {
              HSApp.App.getApp().cmdManager.receive('sliderdragend', {});
              HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
            },
          },
        };
      }

      const optionValues = sizeRange.H.value ?? [];
      const currentSize = node.ZSize;
      const uniqueValues = [...new Set([...optionValues.map((v) => v / 1000), currentSize])];

      return {
        id: 'parametric-model-basic-setting-height',
        type: HSFPConstants.PropertyBarType.DropdownInput,
        uniqueKey: true,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        data: {
          options: this._getSizeOptions(uniqueValues),
          defaultValue: this._covertNumByUnit(currentSize),
          title: ResourceManager.getString('plugin_manuallighting_attr_wall_height'),
          suffix: HSApp.App.getApp().floorplan.displayLengthUnit,
          editable: false,
          disabled: !node.isScalable,
          onChange: (value: number) => {
            this._onSizeChange(node, ISizeType.z, value / unitParam);
          },
        },
      };
    })();

    return [widthItem, depthItem, heightItem];
  }
}