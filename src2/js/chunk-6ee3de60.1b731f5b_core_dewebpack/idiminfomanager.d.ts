/**
 * 尺寸信息管理器模块
 * 负责管理和控制视图中的尺寸标注信息
 */

/**
 * 尺寸模式枚举
 */
export enum DimModeEnum {
  /** 普通模式 */
  normal = "normal",
  /** 计算模式 */
  calculate = "calculate",
  /** 排序模式 */
  order = "order"
}

/**
 * 尺寸信息接口
 */
export interface IDimInfo {
  /** 尺寸名称 */
  name: string;
  /** 尺寸值 */
  value: number;
  /** 是否显示尺寸 */
  dimShow: boolean;
  /** 尺寸类型 */
  type?: DimType;
  /** 应用差值 */
  applyDiff(diff: number): void;
}

/**
 * 尺寸类型枚举
 */
export enum DimType {
  /** 线段 */
  Line = "Line",
  /** 弦长 */
  Chord = "Chord",
  /** 竖框 */
  Mullion = "Mullion",
  /** 竖框投影 */
  MullionProjection = "MullionProjection",
  /** 内部竖框 */
  InnerMullion = "InnerMullion",
  /** 内部间距 */
  InnerSpace = "InnerSpace"
}

/**
 * 形状接口
 */
export interface IShape {
  /**
   * 获取尺寸信息
   * @param includeAll 是否包含所有尺寸信息
   */
  getIDimInfo(includeAll: boolean): IDimInfo[];
  /** 更新多边形 */
  updatePoly?(): void;
  /** 绘制形状 */
  draw?(view: IView): void;
}

/**
 * 三维弧形框架接口
 */
export interface IThreedArcFrame extends IShape {
  updatePoly(): void;
  draw(view: IView): void;
}

/**
 * 墙体接口
 */
export interface IWall {
  /** 墙体的尺寸标注集合 */
  dims: IDimInfo[];
}

/**
 * 组合体接口
 */
export interface ICouple {
  /** 宽度尺寸标注 */
  dimForWidth: IDimInfo;
}

/**
 * 形状管理器接口
 */
export interface IShapeManager {
  /** 所有形状集合 */
  shapem: IShape[];
  /** 墙体集合 */
  walls: IWall[];
  /** 组合体集合 */
  couples: ICouple[];
}

/**
 * 备忘录管理器接口
 */
export interface IMomentoManager {
  /** 创建检查点 */
  checkPoint(): void;
}

/**
 * 视图接口
 */
export interface IView {
  /** 形状管理器 */
  shapeManager: IShapeManager;
  /** 备忘录管理器 */
  mometoManager: IMomentoManager;
  /** 居中显示所有形状 */
  centerShapes(): void;
}

/**
 * 额外尺寸类
 */
export class ExtraDim implements IDimInfo {
  name: string;
  value: number;
  dimShow: boolean;
  applyDiff(diff: number): void;
}

/**
 * 尺寸信息类
 */
export class DimInfo implements IDimInfo {
  name: string;
  value: number;
  dimShow: boolean;
  type: DimType;
  applyDiff(diff: number): void;
}

/**
 * 文本尺寸类
 */
export class TextDim implements IDimInfo {
  name: string;
  value: number;
  dimShow: boolean;
  applyDiff(diff: number): void;
}

/**
 * 尺寸信息管理器
 * 负责管理视图中所有尺寸标注的显示、计算和命名
 */
export class IDimInfoManager {
  /** 关联的视图对象 */
  private view: IView;
  
  /** 当前尺寸模式 */
  private _mode: DimModeEnum;

  /**
   * 构造函数
   * @param view 关联的视图对象
   */
  constructor(view: IView);

  /**
   * 获取当前尺寸模式
   */
  get mode(): DimModeEnum;

  /**
   * 设置尺寸模式
   * @param value 新的尺寸模式
   */
  set mode(value: DimModeEnum);

  /**
   * 初始化所有尺寸的名称
   */
  initDimName(): void;

  /**
   * 根据名称获取尺寸信息的值
   * @param name 尺寸名称
   * @returns 尺寸值，未找到时返回0
   */
  getIDimInfoValue(name: string): number;

  /**
   * 根据名称更新尺寸值
   * @param name 尺寸名称
   * @param value 新的尺寸值
   */
  updateDimByName(name: string, value: number): void;

  /**
   * 初始化单个尺寸信息的名称
   * @param dimInfo 尺寸信息对象
   * @param allDimInfos 所有尺寸信息集合
   */
  initName(dimInfo: IDimInfo, allDimInfos: IDimInfo[]): void;

  /**
   * 获取所有尺寸信息
   * @returns 所有尺寸信息的数组
   */
  get IDimInfos(): IDimInfo[];

  /**
   * 获取所有可见且有效的尺寸信息
   * @returns 过滤后的尺寸信息数组
   */
  get visualIDimInfos(): IDimInfo[];

  /**
   * 生成尺寸名称
   * @param prefix 名称前缀（e/f/m/p/i/s/t/h）
   * @param dimInfo 尺寸信息对象
   * @param allDimInfos 所有尺寸信息集合
   * @returns 生成的唯一名称
   */
  private getName(prefix: string, dimInfo: IDimInfo, allDimInfos: IDimInfo[]): string;
}