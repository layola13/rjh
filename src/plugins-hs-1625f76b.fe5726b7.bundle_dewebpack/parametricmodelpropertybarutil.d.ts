/**
 * 参数化模型属性栏工具类
 * 用于处理参数化模型的尺寸转换、单位换算和属性项生成
 */
export declare class ParametricModelPropertyBarUtil {
  /**
   * 将角度转换到 [-180, 180] 范围内
   * @param angle - 输入角度值
   * @returns 转换后的角度值
   */
  static convertAngle(angle: number): number;

  /**
   * 获取当前单位参数（基于应用的长度单位设置）
   * @returns 单位转换系数（米:1, 厘米:100, 毫米:1000）
   * @private
   */
  private static _getUnitParam(): number;

  /**
   * 获取尺寸选项列表（用于下拉选择器）
   * @param sizes - 尺寸数组
   * @returns 格式化的选项对象数组
   * @private
   */
  private static _getSizeOptions(sizes: number[]): Array<{ id: string; title: string }>;

  /**
   * 根据当前单位转换数值为显示格式
   * @param value - 原始数值（米）
   * @returns 格式化后的字符串
   * @private
   */
  private static _covertNumByUnit(value: number): string;

  /**
   * 根据单位类型获取单位字符串
   * @param unitType - 单位类型枚举
   * @returns 单位字符串（如"个"）或 undefined
   */
  static getUnitByUnitType(unitType: EN_UNITS_TYPE): string | undefined;

  /**
   * 获取下拉选择器的后缀单位
   * @param unitType - 单位类型枚举
   * @returns 后缀字符串（如"m", "cm", "mm", "个"）或 undefined
   */
  static getOptionsDropdownSuffix(unitType: EN_UNITS_TYPE): string | undefined;

  /**
   * 根据单位类型获取输入值（转换为米）
   * @param unitType - 单位类型枚举
   * @param value - 输入值
   * @returns 转换后的值
   */
  static getInputValueByUnitType(unitType: EN_UNITS_TYPE, value: number): number;

  /**
   * 根据单位类型获取输出值（转换为毫米）
   * @param unitType - 单位类型枚举
   * @param value - 输入值（米）
   * @returns 转换后的值
   */
  static getOutputValueByUnitType(unitType: EN_UNITS_TYPE, value: number): number;

  /**
   * 根据节点配置获取尺寸范围
   * @param node - 包含单位和最小最大值的节点对象
   * @returns 尺寸范围对象 { minSize, maxSize }
   */
  static getSizeRangeByNode(node: {
    unit: EN_UNITS_TYPE;
    minMax?: [number, number];
  }): {
    minSize: number;
    maxSize: number;
  };

  /**
   * 获取选项下拉列表
   * @param values - 值数组
   * @param unitType - 单位类型
   * @returns 选项对象数组（去重）
   */
  static getOptionsDropdownList(
    values: Array<string | number>,
    unitType: EN_UNITS_TYPE
  ): Array<{ id: string; title: string }>;

  /**
   * 获取选项下拉框的显示值
   * @param value - 原始值
   * @param unitType - 单位类型
   * @returns 格式化后的显示字符串
   */
  static getOptionsDropdownValue(value: string | number, unitType: EN_UNITS_TYPE): string;

  /**
   * 获取选项下拉框的输出值（转换回毫米）
   * @param value - 显示值
   * @param unitType - 单位类型
   * @returns 转换后的数值
   */
  static getOptionsDropdownOutputValue(value: string | number, unitType: EN_UNITS_TYPE): number;

  /**
   * 获取显示小数位数
   * @param unitType - 单位类型
   * @returns 小数位数（米:3, 厘米:1, 毫米:0）
   */
  static getDisplayDigits(unitType: EN_UNITS_TYPE): number;

  /**
   * 处理尺寸变化事件
   * @param entity - 实体对象
   * @param sizeType - 尺寸类型（x/y/z）
   * @param newValue - 新值
   * @private
   */
  private static _onSizeChange(entity: any, sizeType: ISizeType, newValue: number): void;

  /**
   * 根据尺寸类型获取取值范围
   * @param entity - 实体对象（需有 getSizeRange 方法）
   * @param sizeKey - 尺寸键名（"W"/"D"/"H"）
   * @returns 范围对象 { min, max }
   * @private
   */
  private static _getRangeBySizeType(
    entity: { getSizeRange(): SizeRangeMap },
    sizeKey: 'W' | 'D' | 'H'
  ): { min: number; max: number };

  /**
   * 获取尺寸属性项配置数组（宽度、深度、高度）
   * @param entity - 实体对象
   * @returns 属性项配置数组（3个元素：宽/深/高）
   */
  static getSizePropertyItems(entity: ParametricModelEntity): PropertyItem[];
}

/**
 * 单位类型枚举
 */
export enum EN_UNITS_TYPE {
  /** 件数 */
  PIECES = 'PIECES',
  /** 毫米 */
  MILLIMETER = 'MILLIMETER',
}

/**
 * 尺寸类型枚举
 */
export enum ISizeType {
  x = 'x',
  y = 'y',
  z = 'z',
}

/**
 * 默认尺寸范围常量
 */
export interface IDefaultSizeRange {
  minSize: number;
  maxSize: number;
}

/**
 * 变量限制类型枚举
 */
export namespace expr {
  export enum EN_VARIABLE_LIMIT_TYPE {
    /** 固定值 */
    FIXED = 'FIXED',
    /** 区间范围 */
    INTERVAL = 'INTERVAL',
    /** 增量范围 */
    INCREMENT = 'INCREMENT',
    /** 选项列表 */
    OPTIONS = 'OPTIONS',
    /** 表达式 */
    EXPRESSION = 'EXPRESSION',
  }
}

/**
 * 尺寸限制配置
 */
interface SizeLimitConfig {
  type: expr.EN_VARIABLE_LIMIT_TYPE;
  /** 选项列表（当 type 为 OPTIONS 时） */
  value?: number[];
  /** 最小值（当 type 为 INCREMENT 时，单位：毫米） */
  minValue?: number;
  /** 最大值（当 type 为 INCREMENT 时，单位：毫米） */
  maxValue?: number;
}

/**
 * 尺寸范围映射（宽度/深度/高度）
 */
interface SizeRangeMap {
  W: SizeLimitConfig;
  D: SizeLimitConfig;
  H: SizeLimitConfig;
}

/**
 * 参数化模型实体接口
 */
interface ParametricModelEntity {
  /** X 方向尺寸（米） */
  XSize: number;
  /** Y 方向尺寸（米） */
  YSize: number;
  /** Z 方向尺寸（米） */
  ZSize: number;
  /** 是否可缩放 */
  isScalable: boolean;
  /** 获取尺寸范围配置 */
  getSizeRange(): SizeRangeMap;
}

/**
 * 属性项配置接口
 */
interface PropertyItem {
  id: string;
  type: PropertyBarControlTypeEnum | HSFPConstants.PropertyBarType;
  uniqueKey?: boolean;
  uiMode?: HSFPConstants.UIMode[];
  data: SliderInputData | DropdownInputData;
}

/**
 * 滑块输入框配置
 */
interface SliderInputData {
  label: string;
  name: string;
  value: number;
  disabled: boolean;
  options: {
    rules: {
      range: { min: number; max: number };
      positiveOnly: boolean;
    };
    includeUnit: boolean;
    readOnly: boolean;
    tips: string;
  };
  onValueChangeStart: () => void;
  onValueChange: (event: { detail: { value: number } }) => void;
  onValueChangeEnd: () => void;
}

/**
 * 下拉输入框配置
 */
interface DropdownInputData {
  options: Array<{ id: string; title: string }>;
  defaultValue: string;
  title: string;
  suffix: any;
  editable: boolean;
  disabled: boolean;
  onChange: (value: number) => void;
}

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  sliderInput = 'sliderInput',
}

/**
 * 全局常量声明（需外部定义）
 */
declare const HSApp: any;
declare const HSFPConstants: any;
declare const ResourceManager: any;