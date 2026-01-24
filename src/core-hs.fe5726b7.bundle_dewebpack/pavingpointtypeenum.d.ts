/**
 * 铺贴点类型枚举
 * 定义图案铺贴时的基准点类型
 */
export enum PavingPointTypeEnum {
  /** 默认类型 */
  Default = "default",
  /** 默认法线类型 */
  DefaultNormal = "default-normal",
  /** 用户自定义类型 */
  UserDefined = "userDefined"
}

/**
 * 二维点坐标接口
 */
export interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 铺贴选项参数接口
 */
export interface PavingOptionArgs {
  /** 铺贴点类型 */
  type?: PavingPointTypeEnum;
  /** 铺贴基准点坐标 */
  point?: Point2D;
  /** 旋转角度（弧度） */
  rotation?: number;
  /** 滑块X轴偏移 */
  sliderOffsetX?: number;
  /** 滑块Y轴偏移 */
  sliderOffsetY?: number;
  /** 默认X轴偏移 */
  defaultOffsetX?: number;
  /** 默认Y轴偏移 */
  defaultOffsetY?: number;
}

/**
 * FGI格式的铺贴选项接口
 */
export interface PavingOptionForFGI {
  /** 铺贴基准点坐标 */
  point: Point2D;
  /** 旋转角度（弧度） */
  rotation: number;
  /** 铺贴点类型 */
  type: PavingPointTypeEnum;
  /** 默认X轴偏移 */
  defaultOffsetX: number;
  /** 默认Y轴偏移 */
  defaultOffsetY: number;
}

/**
 * 序列化的铺贴选项数据接口
 */
export interface SerializedPavingOption {
  /** 铺贴点类型 */
  type?: PavingPointTypeEnum;
  /** 铺贴基准点坐标 */
  point?: Point2D;
  /** 旋转角度（弧度） */
  rotation?: number;
  /** 滑块X轴偏移 */
  sliderOffsetX?: number;
  /** 滑块Y轴偏移 */
  sliderOffsetY?: number;
  /** 默认X轴偏移 */
  defaultOffsetX?: number;
  /** 默认Y轴偏移 */
  defaultOffsetY?: number;
}

/**
 * 铺贴选项类
 * 管理图案铺贴的位置、旋转和偏移参数
 */
export declare class PavingOption {
  /** 默认铺贴选项实例 */
  static readonly DefaultOption: PavingOption;

  /**
   * 构造函数
   * @param args - 初始化参数
   */
  constructor(args?: PavingOptionArgs);

  /**
   * 创建铺贴选项实例
   * @param args - 初始化参数
   * @returns 新的铺贴选项实例
   */
  static create(args?: PavingOptionArgs): PavingOption;

  /**
   * 序列化为普通对象
   * @returns 序列化后的数据对象
   */
  dump(): SerializedPavingOption;

  /** 获取铺贴点类型 */
  get type(): PavingPointTypeEnum;

  /** 获取铺贴基准点坐标 */
  get point(): Point2D;

  /** 获取旋转角度（弧度） */
  get rotation(): number;

  /** 获取滑块X轴偏移量，默认为0 */
  get sliderOffsetX(): number;

  /** 获取滑块Y轴偏移量，默认为0 */
  get sliderOffsetY(): number;

  /** 获取默认X轴偏移量，默认为0 */
  get defaultOffsetX(): number;

  /** 获取默认Y轴偏移量，默认为0 */
  get defaultOffsetY(): number;

  /**
   * 获取完整参数对象
   * @returns 包含所有属性的参数对象
   */
  getArgs(): Required<PavingOptionArgs>;

  /**
   * 获取FGI格式的铺贴选项
   * @returns FGI格式的数据对象
   */
  getPavingOptionForFGI(): PavingOptionForFGI;

  /**
   * 克隆当前实例
   * @param args - 可选的覆盖参数
   * @returns 新的铺贴选项实例
   */
  clone(args?: PavingOptionArgs): PavingOption;

  /**
   * 比较两个铺贴选项是否相等
   * @param other - 要比较的铺贴选项参数
   * @returns 是否相等
   */
  equals(other?: PavingOptionArgs): boolean;
}