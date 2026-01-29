import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

interface ScaleParameter {
  x?: number;
  y?: number;
  z?: number;
}

interface PropertyValue {
  value: number;
  minMax?: [number, number];
}

interface ScaleConfig {
  paramKey: keyof ScaleParameter;
  scaleKey: 'XScale' | 'YScale' | 'ZScale';
  key: HSCore.Model.ParametricStairPropertyTypeEnum;
}

export class ScaleNCustomizedParametricStairsRequest extends HSCore.Transaction.Common.StateRequest {
  private _content: any;
  private _param: ScaleParameter;

  constructor(content: any, param: ScaleParameter) {
    super();
    this._content = content;
    this._param = param;
  }

  onCommit(): any[] {
    const propertyMap = this._content.getPropertyMap();
    
    const scaleConfigs: ScaleConfig[] = [
      {
        paramKey: 'x',
        scaleKey: 'XScale',
        key: HSCore.Model.ParametricStairPropertyTypeEnum.WIDTH
      },
      {
        paramKey: 'y',
        scaleKey: 'YScale',
        key: HSCore.Model.ParametricStairPropertyTypeEnum.LENGTH
      },
      {
        paramKey: 'z',
        scaleKey: 'ZScale',
        key: HSCore.Model.ParametricStairPropertyTypeEnum.HEIGHT
      }
    ];

    scaleConfigs.forEach((config) => {
      const property = propertyMap.get(config.key) as PropertyValue | undefined;
      const paramValue = this._param[config.paramKey];

      if (property !== undefined && paramValue !== undefined) {
        const currentValue = property.value;
        let targetValue = 1000 * paramValue;
        const minMax = property.minMax ?? [];
        const [minValue, maxValue] = minMax;

        if (minValue !== undefined && maxValue !== undefined) {
          if (targetValue < minValue) {
            targetValue = minValue;
          } else if (targetValue > maxValue) {
            targetValue = maxValue;
          }
        }

        this._content[config.scaleKey] = targetValue / currentValue;
      }
    });

    super.onCommit([]);
    return this._content;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '修改楼梯模型大小';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}