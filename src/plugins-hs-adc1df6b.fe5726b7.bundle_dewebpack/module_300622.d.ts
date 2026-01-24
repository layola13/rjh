/**
 * 自定义模型塑型策略模块
 * @module NCustomizedModelMoldingStrategy
 */

/**
 * 实体包装器接口
 * @description 包含实体对象的包装器
 */
interface EntityWrapper {
  /** 实体对象 */
  entity: HSCore.Model.NCustomizedModelMolding;
}

/**
 * 线条参数接口
 * @description 描述线条造型的所有参数
 */
interface MoldingParameters {
  /** 内容类型（如 "baseboard" 踢脚线、"build element/positive angle line" 建筑元素/阳角线） */
  contentType: string;
  /** 查找ID */
  seekId: string;
  /** 轮廓数据 */
  profile: unknown;
  /** 轮廓高度 */
  profileHeight: number;
  /** 轮廓宽度 */
  profileWidth: number;
  /** 水平翻转标志 */
  flipHorizontal: boolean;
  /** 垂直翻转标志 */
  flipVertical: boolean;
  /** 翻转标志 */
  flip: boolean;
  /** X轴偏移量 */
  offsetX: number;
  /** Y轴偏移量 */
  offsetY: number;
  /** 材质数据 */
  materialData: unknown;
  /** 纹理贴图 */
  texture: unknown;
  /** 法线贴图 */
  normalTexture: unknown;
  /** 高清法线贴图 */
  normalTextureHigh: unknown;
  /** 小图标 */
  iconSmall: unknown;
  /** 元数据 */
  metadata?: MoldingMetadata;
}

/**
 * 线条元数据接口
 */
interface MoldingMetadata {
  /** 是否来自企业库 */
  isFromEnterprise?: boolean;
  /** 内容类型字符串 */
  contentTypeStr?: string;
  /** 查找ID */
  seekId?: string;
  /** 内容类型 */
  contentType?: string;
  /** 其他任意属性 */
  [key: string]: unknown;
}

/**
 * 撤销/重做数据接口
 */
interface UndoRedoData {
  /** 线条参数 */
  moldingParameters: MoldingParameters;
}

/**
 * 自定义模型塑型策略类
 * @description 实现对自定义模型线条（如踢脚线、角线等）的吸附、应用、撤销/重做等操作
 * @extends BaseStrategy
 */
declare class NCustomizedModelMoldingStrategy extends BaseStrategy {
  /**
   * 类名获取器
   * @returns 策略类名称
   */
  get ClassName(): string;

  /**
   * 判断实体是否可被吸附
   * @description 检查实体是否为可吸附的自定义模型线条
   * @param wrapper - 实体包装器
   * @returns 如果实体可被吸附则返回 true
   * 
   * @remarks
   * 不可吸附的情况：
   * - 来自企业库的背景墙单元或参数化背景墙
   * - 背景墙单元或参数化背景墙的子级
   */
  isSuckable(wrapper: EntityWrapper): boolean;

  /**
   * 吸附操作
   * @description 从实体中提取参数，用于后续应用到其他实体
   * @param wrapper - 实体包装器
   * @returns 吸附的线条参数（含自动调整后的翻转状态和偏移量）
   * 
   * @remarks
   * 对于踢脚线类型：翻转所有翻转标志
   * 对于位置为2的边缘：翻转标志并调整X偏移量
   */
  suck(wrapper: EntityWrapper): MoldingParameters | undefined;

  /**
   * 判断参数是否可应用到实体
   * @description 检查给定参数是否可以应用到目标实体
   * @param wrapper - 目标实体包装器
   * @param parameters - 要应用的线条参数
   * @returns 如果参数可应用则返回 true
   * 
   * @remarks
   * 不可应用的情况：
   * - 阳角线类型与非斜接类型混用
   * - 应用到来自企业库的背景墙单元或参数化背景墙
   */
  isAppliable(wrapper: EntityWrapper, parameters: MoldingParameters | null): boolean;

  /**
   * 应用参数到实体
   * @description 将给定参数应用到目标实体，并根据位置自动调整翻转状态和偏移量
   * @param wrapper - 目标实体包装器
   * @param parameters - 要应用的线条参数
   * 
   * @remarks
   * 应用逻辑：
   * - 踢脚线类型：反转所有翻转标志
   * - 位置为2的边缘：反转翻转标志并调整X偏移量
   * - 合并元数据并初始化实体
   */
  apply(wrapper: EntityWrapper, parameters: MoldingParameters): void;

  /**
   * 获取撤销数据
   * @description 获取撤销操作所需的数据（即当前实体的参数快照）
   * @param wrapper - 实体包装器
   * @returns 包含线条参数的撤销数据
   */
  getUndoData(wrapper: EntityWrapper): UndoRedoData;

  /**
   * 获取重做数据
   * @description 获取重做操作所需的数据（即当前实体的参数快照）
   * @param wrapper - 实体包装器
   * @returns 包含线条参数的重做数据
   */
  getRedoData(wrapper: EntityWrapper): UndoRedoData;

  /**
   * 撤销操作
   * @description 将实体恢复到之前的参数状态
   * @param wrapper - 实体包装器
   * @param data - 撤销数据
   */
  undo(wrapper: EntityWrapper, data: UndoRedoData): void;

  /**
   * 重做操作
   * @description 将实体重新应用到之后的参数状态
   * @param wrapper - 实体包装器
   * @param data - 重做数据
   */
  redo(wrapper: EntityWrapper, data: UndoRedoData): void;

  /**
   * 获取撤销/重做数据的内部方法
   * @description 提取实体参数并根据类型和位置调整翻转状态和偏移量
   * @param wrapper - 实体包装器
   * @returns 包含线条参数的撤销/重做数据
   * @private
   * 
   * @remarks
   * 调整逻辑：
   * - 踢脚线类型：反转所有翻转标志
   * - 位置为2的边缘：反转翻转标志并调整X偏移量（减去轮廓高度）
   */
  private _getUndoRedoData(wrapper: EntityWrapper): UndoRedoData;
}

/**
 * 基础策略抽象类
 * @description 所有策略类的基类
 */
declare abstract class BaseStrategy {
  /** 策略类名 */
  abstract get ClassName(): string;
}

/**
 * 模块默认导出
 * @description 导出自定义模型塑型策略类
 */
export default NCustomizedModelMoldingStrategy;