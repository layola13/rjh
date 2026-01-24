/**
 * 自定义模型结果类型枚举
 * 定义了结构实体相关的数据类型
 */
export enum CuztomizedMoadlResultType {
  /** 结构信息 */
  StructureInfo = "structure info",
  /** 草图成型信息 */
  SketchMolding = "sketch molding info"
}

/**
 * 结构实体类
 * 用于处理建筑结构相关的实体数据，包括面积、投影等计算
 */
export declare class NStructureEntity extends AcceptEntity {
  /**
   * 构造函数
   * 创建一个新的结构实体实例
   */
  constructor();

  /**
   * 构建子元素
   * 用于初始化或更新实体的子节点
   */
  buildChildren(): void;

  /**
   * 构建实体数据
   * 从内容对象中提取并设置实体的类型、分类和实例数据
   * @param content - 内容对象，包含实体的原始数据
   */
  buildEntityData(content: Content): void;

  /**
   * 获取实例数据
   * 从内容对象中提取完整的实例数据，包括房间ID、图层ID、宿主面、表面积等
   * @param content - 内容对象
   * @returns 包含所有参数的实例数据对象
   */
  getInstanceData(content: Content): InstanceData;

  /**
   * 获取投影数据
   * 计算实体底面的投影面积和轮廓长度
   * @param content - 内容对象
   * @returns 包含投影面积和投影长度的对象
   */
  getProjectionData(content: Content): ProjectionData;

  /**
   * 获取结构的表面积
   * 计算去重后所有面的总面积
   * @param content - 内容对象
   * @returns 格式化后的表面积数值
   */
  getSurfaceAreaForStructure(content: Content): number;

  /**
   * 获取去重后的面列表
   * 过滤掉底面（非自定义梁时）和顶面（当父元素高度大于自身高度时）
   * @param content - 内容对象
   * @returns 去重后的面数组
   */
  getDeduplicationFaces(content: Content): Face[];
}

/**
 * 内容对象接口
 * 表示3D模型中的内容元素
 */
interface Content {
  /** 父元素引用 */
  parent?: Parent;
  /** 面列表 */
  faceList: Face[];
  /** 轮廓路径 */
  profile?: Path[];
  /** 3D高度 */
  height3d: number;
  
  /**
   * 检查是否为指定类的实例
   * @param modelClass - 模型类标识
   */
  instanceOf(modelClass: string): boolean;
  
  /**
   * 获取唯一父元素
   */
  getUniqueParent(): UniqueParent;
}

/**
 * 父元素接口
 */
interface Parent {
  /** 元素ID */
  id: string;
  /** 元素高度 */
  height: number;
}

/**
 * 唯一父元素接口
 */
interface UniqueParent {
  /** 元素高度 */
  height: number;
}

/**
 * 面对象接口
 * 表示3D模型中的一个面
 */
interface Face {
  /** 面的ID */
  id: string;
  /** 真实2D路径 */
  realPath2d: Path2D;
}

/**
 * 2D路径类型
 */
type Path2D = unknown;

/**
 * 路径接口
 * 表示轮廓路径段
 */
interface Path {
  /**
   * 获取路径长度
   */
  getLength(): number;
}

/**
 * 实例数据接口
 */
interface InstanceData {
  /**
   * 添加参数
   * @param parameters - 可变参数列表
   */
  addParameter(...parameters: Parameter[]): void;
}

/**
 * 参数类
 * 表示实体的一个属性参数
 */
declare class Parameter {
  /**
   * 构造函数
   * @param name - 参数名称
   * @param value - 参数值
   * @param dataType - 数据类型
   */
  constructor(name: string, value: unknown, dataType: DataType);
}

/**
 * 数据类型枚举
 */
declare enum DataType {
  /** 字符串类型 */
  String,
  /** 数字类型 */
  Number
}

/**
 * 投影数据接口
 * 包含投影面积和投影长度信息
 */
interface ProjectionData {
  /** 投影面积 */
  projectionArea: number;
  /** 投影长度 */
  projectionLength: number;
}

/**
 * 接受实体基类
 * NStructureEntity的父类
 */
declare class AcceptEntity {
  /**
   * 设置实例数据
   * @param data - 实例数据对象
   */
  protected setInstanceData(data: InstanceData): void;

  /**
   * 设置实体类型
   * @param type - 类型标识
   */
  protected setType(type: string): void;

  /**
   * 设置实体分类
   * @param category - 分类数据
   */
  protected setCategory(category: unknown): void;
}