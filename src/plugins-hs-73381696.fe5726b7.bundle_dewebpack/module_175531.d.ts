/**
 * 材质数据对象接口
 * 用于描述材质的属性和配置信息
 */
interface MaterialData {
  /** 设置材质数据 */
  setMaterialData(data: MaterialData): void;
  /** 克隆材质数据对象 */
  clone(): MaterialData;
}

/**
 * 材质对象接口
 * 表示3D模型中的材质实例
 */
interface Material {
  /** 获取材质数据 */
  getMaterialData(): MaterialData;
  /** 设置材质属性 */
  set(data: MaterialData): void;
  /** 克隆材质对象 */
  clone(): Material;
}

/**
 * 模型参数化配置接口
 */
interface ParametrizationConfig {
  /** 材质数据配置 */
  materialData?: MaterialData;
}

/**
 * 模型实体基类接口
 * 所有可渲染3D实体的基础接口
 */
interface ModelEntity {
  /** 实体的父级实体集合 */
  parents?: Record<string, ModelEntity>;
  /** 实体的材质 */
  material?: Material;
  /** 获取第一个父级实体 */
  getFirstParent?(): ModelEntity | null;
  /** 标记材质为脏状态（需要重新渲染） */
  dirtyMaterial?(): void;
}

/**
 * 口袋（壁龛）模型接口
 * 表示墙体中的凹陷结构
 */
interface PocketModel extends ModelEntity {
  /** 获取口袋的材质 */
  getMaterial(): Material;
  /** 设置口袋的材质 */
  setMaterial(material: Material): void;
}

/**
 * 窗台参数化模型接口
 * 表示窗户下方的水平台面
 */
interface WindowSillModel extends ModelEntity {
  /** 参数配置 */
  parameters?: ParametrizationConfig;
  /** 标记材质为脏状态 */
  dirtyMaterial(): void;
}

/**
 * 窗户模型接口
 * 表示建筑中的窗户结构
 */
interface WindowModel extends ModelEntity {}

/**
 * 门面部件集合接口
 */
interface DoorFaces {
  /** 侧面集合 */
  side: Record<string, ModelEntity>;
  /** 底部面集合 */
  bottom: Record<string, ModelEntity>;
}

/**
 * 门模型接口
 * 表示建筑中的门结构，包含多个面部件
 */
interface DoorModel extends ModelEntity {
  /** 门的各个面部件 */
  faces: DoorFaces;
  /** 获取底部面（门槛石） */
  getBottomFace(): ModelEntity;
  /** 设置门槛石材质启用状态 */
  setDoorStoneMaterialStatus(enabled: boolean): void;
  /** 设置底部面材质 */
  setBottomFaceMaterial(material: Material): void;
}

/**
 * 实体上下文信息接口
 * 用于描述操作的目标实体
 */
interface EntityContext {
  /** 目标实体对象 */
  entity: ModelEntity | PocketModel | WindowSillModel | WindowModel | DoorModel;
}

/**
 * 吸取操作返回的信息接口
 * 包含从源实体提取的材质数据
 */
interface SuckInfo {
  /** 吸取到的材质数据 */
  materialData: MaterialData;
}

/**
 * 撤销/重做数据接口（单个实体）
 */
interface SingleEntityUndoRedoData {
  /** 目标实体 */
  entity: ModelEntity | PocketModel | WindowSillModel;
  /** 材质数据快照 */
  materialData: MaterialData;
}

/**
 * 撤销/重做数据接口（多个实体）
 */
interface MultiEntityUndoRedoData {
  /** 目标实体数组 */
  entity: ModelEntity[];
  /** 材质数据快照数组 */
  materialData: MaterialData[];
}

/**
 * 撤销/重做数据联合类型
 */
type UndoRedoData = SingleEntityUndoRedoData | MultiEntityUndoRedoData | null;

/**
 * 策略依赖项接口
 * 定义策略所需的外部依赖
 */
interface StrategyDependencies {
  [key: string]: unknown;
}

/**
 * 基础策略抽象类接口
 * 所有策略类的基类
 */
interface BaseStrategy {
  /** 策略类型标识 */
  type: string;
}

/**
 * 材质开放策略类
 * 
 * 实现了材质"吸管"功能，允许用户从一个实体吸取材质并应用到另一个实体。
 * 支持以下实体类型的材质操作：
 * - 口袋（Pocket）：壁龛结构
 * - 窗台（WindowSill）：窗户下方的台面
 * - 门面部件：门的侧面和底部（门槛石）
 * 
 * @example
 *