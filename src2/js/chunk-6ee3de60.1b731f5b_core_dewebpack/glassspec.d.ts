/**
 * 玻璃规格类型定义
 * 用于描述玻璃的物理属性、工艺和附加信息
 */

/**
 * 工艺边距接口
 * 描述工艺加工所需的额外边距
 */
export interface TechMargin {
  /** 宽度边距（单位：毫米） */
  width: number;
  /** 高度边距（单位：毫米） */
  height: number;
}

/**
 * 序列化后的玻璃规格数据结构
 * 用于存储和传输的紧凑格式
 */
export interface SerializedGlassSpec {
  /** 规格代码（spec的缩写） */
  sp?: string;
  /** 厚度（thickness的缩写） */
  th?: number;
  /** 工艺列表（technics的缩写） */
  te?: string[];
  /** 工艺边距（techMargin的缩写） */
  tm?: TechMargin;
  /** 每平方米重量（meterWeight的缩写） */
  mw?: number;
  /** 名称（name的缩写） */
  na?: string;
  /** 自定义文本（customText的缩写） */
  ct?: string;
  /** 唯一标识符（id的缩写） */
  id?: string;
  /** 自定义属性（customAttrs的缩写） */
  ca?: Record<string, unknown>;
}

/**
 * 反序列化输入数据接口
 * 支持完整字段名和缩写字段名
 */
export interface DeserializeInput extends SerializedGlassSpec {
  /** 规格代码（完整字段名） */
  spec?: string;
  /** 工艺列表（完整字段名） */
  technics?: string[];
  /** 附加边距（完整字段名，别名） */
  additionMargin?: TechMargin;
  /** 名称（完整字段名） */
  name?: string;
}

/**
 * 玻璃规格类
 * 管理玻璃产品的规格、厚度、工艺等核心属性
 */
export declare class GlassSpec {
  /** 规格代码，用于标识玻璃类型 */
  spec: string;

  /** 玻璃厚度（单位：毫米） */
  thickness: number;

  /** 应用的工艺列表（如钢化、夹胶等） */
  technics: string[];

  /** 工艺加工所需的额外边距 */
  techMargin: TechMargin;

  /** 每平方米重量（单位：千克） */
  meterWeight: number;

  /** 玻璃规格的显示名称 */
  name?: string;

  /** 自定义文本信息 */
  customText?: string;

  /** 唯一标识符 */
  id?: string;

  /** 自定义属性字典，用于扩展字段 */
  customAttrs?: Record<string, unknown>;

  /**
   * 构造函数
   * 初始化默认值
   */
  constructor();

  /**
   * 深拷贝当前实例
   * @returns 新的GlassSpec实例，包含相同的属性值
   */
  clone(): GlassSpec;

  /**
   * 序列化为JSON对象
   * 使用缩写字段名以减少数据大小
   * @returns 序列化后的紧凑格式对象
   */
  toJSON(): SerializedGlassSpec;

  /**
   * 从数据对象反序列化
   * 支持完整字段名和缩写字段名
   * @param data - 字符串类型直接赋值给spec，对象类型按字段映射
   */
  deserialize(data: string | DeserializeInput): void;
}