import { HSCore } from './path/to/HSCore';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface StairParameters {
  [key: string]: number;
}

interface ScaleConfig {
  scaleValue: number;
  scaleKey: 'XScale' | 'YScale' | 'ZScale';
  key: string;
}

interface ParamCalculationResult {
  oldParam: StairParameters;
  newParam: StairParameters;
}

interface ResizeParameter {
  type: 'x' | 'y' | 'z';
  value?: number;
}

interface ParametricStairsContent {
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  ZSize: number;
  getPropertyMap(): Map<string, { value: number }>;
  setParamsToStairs(params: StairParameters): void;
}

/**
 * Request for resizing and customizing parametric stairs
 */
export class ResizeNCustomizedParametricStairsRequest extends HSCore.Transaction.Request {
  private _content: ParametricStairsContent;
  private _oldParam: StairParameters = {};
  private _newParam: StairParameters = {};
  private _oldPos: Position;
  private _newPos: Position;

  constructor(
    content: ParametricStairsContent,
    oldPosition: Position,
    resizeParam: ResizeParameter
  ) {
    super();
    
    this._content = content;
    
    const result = this._calcParam(resizeParam);
    this._oldParam = result.oldParam;
    this._newParam = result.newParam;
    
    this._oldPos = oldPosition;
    this._newPos = {
      x: content.x,
      y: content.y,
      z: content.z
    };
  }

  /**
   * Calculate old and new parameters based on scale and resize parameter
   */
  private _calcParam(resizeParam: ResizeParameter): ParamCalculationResult {
    const { XScale, YScale, ZScale } = this._content;
    const propertyMap = this._content.getPropertyMap();
    
    const oldParam: StairParameters = {};
    const newParam: StairParameters = {};
    
    const scaleConfigs: ScaleConfig[] = [
      {
        scaleValue: XScale,
        scaleKey: 'XScale',
        key: HSCore.Model.ParametricStairPropertyTypeEnum.WIDTH
      },
      {
        scaleValue: YScale,
        scaleKey: 'YScale',
        key: HSCore.Model.ParametricStairPropertyTypeEnum.LENGTH
      },
      {
        scaleValue: ZScale,
        scaleKey: 'ZScale',
        key: HSCore.Model.ParametricStairPropertyTypeEnum.HEIGHT
      }
    ];
    
    scaleConfigs.forEach((config) => {
      const property = propertyMap.get(config.key);
      
      if (config.scaleValue !== 1 && property !== undefined) {
        const originalValue = property.value;
        oldParam[config.key] = originalValue;
        
        if (resizeParam && resizeParam.value !== undefined) {
          newParam[config.key] = 1000 * resizeParam.value;
        } else {
          newParam[config.key] = config.scaleKey === 'ZScale'
            ? 1000 * this._content.ZSize
            : originalValue * config.scaleValue;
        }
      } else if (
        resizeParam &&
        resizeParam.value !== undefined &&
        this._getPropKeyByType(resizeParam.type) === config.key
      ) {
        const currentValue = property.value;
        oldParam[config.key] = currentValue;
        newParam[config.key] = 1000 * resizeParam.value;
      }
    });
    
    return { oldParam, newParam };
  }

  /**
   * Get property key by axis type
   */
  private _getPropKeyByType(type: 'x' | 'y' | 'z'): string {
    if (type === 'x') {
      return HSCore.Model.ParametricStairPropertyTypeEnum.WIDTH;
    } else if (type === 'y') {
      return HSCore.Model.ParametricStairPropertyTypeEnum.LENGTH;
    } else {
      return HSCore.Model.ParametricStairPropertyTypeEnum.HEIGHT;
    }
  }

  onCommit(): ParametricStairsContent {
    this._content.x = this._newPos.x;
    this._content.y = this._newPos.y;
    this._content.setParamsToStairs(this._newParam);
    super.onCommit();
    return this._content;
  }

  onUndo(): void {
    this._content.x = this._oldPos.x;
    this._content.y = this._oldPos.y;
    this._content.setParamsToStairs(this._oldParam);
  }

  onRedo(): void {
    this._content.x = this._newPos.x;
    this._content.y = this._newPos.y;
    this._content.setParamsToStairs(this._newParam);
  }

  canTransactField(): boolean {
    return false;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricModel;
  }

  getDescription(): string {
    return '修改参数化楼梯尺寸';
  }
}