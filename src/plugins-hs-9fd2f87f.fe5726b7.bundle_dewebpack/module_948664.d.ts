/**
 * 窗户尺寸处理器
 * 根据不同类型的窗户内容，计算并更新其三维尺寸（X/Y/Z长度）
 */

/**
 * 单位值接口
 * 描述带有单位和数值的参数
 */
interface UnitValue {
  /** 单位类型（如米、厘米等） */
  unit: string;
  /** 数值 */
  value: number;
}

/**
 * 窗户参数接口
 * 定义窗户的基础尺寸参数
 */
interface WindowParameters {
  /** A边长度 */
  a?: UnitValue;
  /** B边长度 */
  b?: UnitValue;
  /** C边长度 */
  c?: UnitValue;
  /** D边长度 */
  d?: UnitValue;
  /** 窗户高度 */
  height: UnitValue;
}

/**
 * 用户自由数据接口
 * 包含窗户的参数配置
 */
interface UserFreeData {
  /** 窗户参数 */
  parameters?: WindowParameters;
}

/**
 * 内容类型接口
 * 用于判断窗户的具体类型
 */
interface ContentType {
  /**
   * 判断是否为指定的内容类型
   * @param type - 内容类型枚举值
   */
  isTypeOf(type: unknown): boolean;
}

/**
 * 窗户内容对象接口
 * 描述窗户实体的完整结构
 */
interface WindowContent {
  /** 内容类型 */
  contentType: ContentType;
  /** 用户自由数据 */
  userFreeData: UserFreeData;
  /** X方向长度（米） */
  XLength?: number;
  /** Y方向长度（米） */
  YLength?: number;
  /** Z方向长度（米） */
  ZLength?: number;
}

/**
 * 尺寸对象接口
 * 描述三维空间的长度信息
 */
interface Dimensions {
  /** X轴长度（米） */
  XLength: number;
  /** Y轴长度（米） */
  YLength: number;
  /** Z轴长度（米） */
  ZLength: number;
}

/**
 * 窗户尺寸处理器类
 * 负责处理不同类型窗户的尺寸计算和转换
 */
export default class WindowDimensionProcessor {
  /**
   * 处理窗户内容的尺寸信息
   * 根据窗户类型（转角窗、凸窗、转角平窗、普通窗）计算其三维尺寸
   * 
   * @param content - 窗户内容对象
   * @param context - 上下文参数（当前未使用）
   * @returns 更新后的窗户内容对象
   */
  static process(content: WindowContent, context?: unknown): WindowContent;
}