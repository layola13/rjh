/**
 * 清理天花板图层
 * 移除不属于楼板的侧面和顶面，以及自定义天花板模型
 * @param layer - 要清理的图层对象
 */
export function cleanLayerCeiling(layer: Layer): void;

/**
 * 清理地板图层
 * 移除非顶面的楼板面以及不属于地板的自定义平台
 * @param layer - 要清理的图层对象
 */
export function cleanLayerFloor(layer: Layer): void;

/**
 * 复制墙体及其开口
 * 克隆墙体并重建开口与墙体的关联关系，同时处理墙体连接点
 * @param walls - 要复制的墙体数组
 * @returns 包含新墙体和开口映射关系的对象
 */
export function copyWallsWithOpenings(walls: Wall[]): CopyWallsResult;

/**
 * 复制开口元素
 * 支持门、窗、孔洞、飘窗等参数化开口的克隆
 * @param opening - 要复制的开口对象
 * @returns 克隆后的开口实例，如果不支持则返回 undefined
 */
export function copyOpening(opening: Opening): Opening | undefined;

/**
 * 检查开口类型是否支持复制
 * @param modelClass - 模型类名（如 NgDoor, NgWindow 等）
 * @returns 是否支持该类型的开口
 */
export function isSupported(modelClass: string): boolean;

/**
 * 生成内容的 JSON 数据
 * 序列化实体、状态、约束、材质、产品等数据
 * @param entity - 要序列化的实体对象
 * @returns 包含完整序列化数据的 JSON 对象
 */
export function generateContentsJSON(entity: Entity): ContentsJSON;

/**
 * 生成加载上下文
 * 根据 JSON 数据和产品映射表创建反序列化所需的上下文对象
 * @param contentsJSON - 内容 JSON 数据
 * @param productsMap - 产品元数据映射表
 * @returns 加载上下文对象，包含 ID 生成器、数据映射等
 */
export function generateContext(
  contentsJSON: ContentsJSON | null,
  productsMap: Map<string, ProductMetadata>
): LoadContext | null;

// ==================== 类型定义 ====================

/**
 * 图层接口
 */
interface Layer {
  /** 楼板映射表 */
  floorSlabs: Record<string, FloorSlab>;
  /** 楼板面数组 */
  slabFaces: SlabFace[];
  /** 遍历内容 */
  forEachContent(callback: (content: ModelContent) => void): void;
}

/**
 * 墙体接口
 */
interface Wall {
  /** 唯一标识符 */
  id: string;
  /** 克隆墙体 */
  clone(): Wall;
  /** 开口映射表 */
  openings: Record<string, Opening>;
  /** 参数化开口集合 */
  parametricOpenings: Map<string, ParametricOpening>;
}

/**
 * 复制墙体结果
 */
interface CopyWallsResult {
  /** 新创建的墙体数组 */
  newWalls: Wall[];
  /** 新开口与墙体的映射关系 */
  newOpeningWallMp: Map<Opening, Wall>;
}

/**
 * 开口基类
 */
interface Opening {
  /** 唯一标识符 */
  id: string;
  /** 查找标识符（产品目录） */
  seekId: string;
  /** 父级参数（用于关联检测） */
  p?: string[];
}

/**
 * 参数化开口
 */
interface ParametricOpening extends Opening {
  /** 关联的墙体列表 */
  relatedWalls: Wall[];
}

/**
 * 楼板面接口
 */
interface SlabFace {
  /** 父级容器 */
  parent: ParentContainer;
  /** 获取主控对象 */
  getMaster(): FloorSlab;
}

/**
 * 模型内容（天花板、平台等）
 */
interface ModelContent {
  /** 父级容器 */
  parent: ParentContainer;
  /** 宿主对象（可选） */
  host?: unknown;
  /** 子内容映射表 */
  contents?: Record<string, ModelContent>;
}

/**
 * 父级容器
 */
interface ParentContainer {
  /** 移除子对象 */
  removeChild(child: unknown): void;
}

/**
 * 内容序列化 JSON
 */
interface ContentsJSON {
  /** 实体序列化数据 */
  data: EntityDump[];
  /** 状态数据 */
  states: StateDump[];
  /** 约束数据 */
  constraints: ConstraintDump[];
  /** 产品元数据 */
  products: ProductJSON[];
  /** 材质数据 */
  materials: MaterialDump[];
  /** 环境 ID */
  environmentId: string;
  /** 视图模式 */
  viewMode: string;
}

/**
 * 加载上下文
 */
interface LoadContext {
  /** 原始数据映射表 */
  data: Record<string, EntityDump>;
  /** 状态数据映射表 */
  statesData: Record<string, StateDump>;
  /** 约束数据映射表 */
  constraintsData: Map<string, ConstraintDump>;
  /** 材质数据映射表 */
  materialsData: Map<string, MaterialDump>;
  /** 产品映射表 */
  productsMap: Map<string, ProductMetadata>;
  /** 实体实例映射表 */
  entities: Record<string, Entity>;
  /** 材质实例映射表 */
  materials: Map<string, Material>;
  /** 状态实例映射表 */
  states: Record<string, State>;
  /** 约束实例映射表 */
  constraints: Record<string, Constraint>;
  /** 实体 ID 生成器 */
  idGenerator: IDGenerator;
  /** 材质 ID 生成器 */
  materialIdGenerator: IDGenerator;
  /** 状态 ID 生成器 */
  stateIdGenerator: IDGenerator;
  /** 约束 ID 生成器 */
  constraintIdGenerator: IDGenerator;
}

/**
 * 实体序列化数据
 */
interface EntityDump {
  /** 唯一标识符 */
  id: string;
  /** 查找标识符 */
  seekId?: string;
  /** 父级参数 */
  p?: string[];
  /** 其他序列化字段 */
  [key: string]: unknown;
}

/**
 * 状态序列化数据
 */
interface StateDump {
  /** 状态 ID */
  id: string;
  /** 其他字段 */
  [key: string]: unknown;
}

/**
 * 约束序列化数据
 */
interface ConstraintDump {
  /** 约束 ID */
  id: string;
  /** 其他字段 */
  [key: string]: unknown;
}

/**
 * 材质序列化数据
 */
interface MaterialDump {
  /** 材质 ID */
  id: string;
  /** 其他字段 */
  [key: string]: unknown;
}

/**
 * 产品 JSON 数据
 */
interface ProductJSON {
  /** 产品 ID */
  id: string;
  /** 产品类型 */
  productType?: string;
  /** 其他字段 */
  [key: string]: unknown;
}

/**
 * 实体基类
 */
interface Entity {
  /** 唯一标识符 */
  id: string;
  /** 元数据 */
  metadata?: ProductMetadata;
  /** 序列化方法 */
  dump(
    options?: unknown,
    deepCopy?: boolean,
    context?: DumpContext
  ): EntityDump[];
  /** 获取相关元数据 */
  getRelatedMetaDatas?(): ProductMetadata[];
}

/**
 * 序列化上下文
 */
interface DumpContext {
  /** 材质数据映射表 */
  materialsData: Map<string, MaterialDump>;
  /** 产品映射表 */
  productsMap: Map<string, ProductMetadata>;
}

/**
 * 材质对象
 */
interface Material {
  /** 材质 ID */
  id: string;
  /** 元数据 */
  metadata?: ProductMetadata;
  /** 图案映射表 */
  patterns: Record<string, Pattern>;
}

/**
 * 图案对象
 */
interface Pattern {
  /** 元数据 */
  metadata?: ProductMetadata;
  /** 子对象 */
  children: Record<string, PatternChild>;
}

/**
 * 图案子对象
 */
interface PatternChild {
  /** 材质引用 */
  material?: Material;
}

/**
 * 产品元数据
 */
interface ProductMetadata {
  /** 产品 ID */
  id: string;
  /** 转 JSON */
  toJSON?(): ProductJSON;
}

/**
 * 状态对象
 */
interface State {
  /** 状态 ID */
  ID: string;
}

/**
 * 约束对象
 */
interface Constraint {
  /** 约束 ID */
  id: string;
}

/**
 * ID 生成器
 */
type IDGenerator = (oldId: string) => string;

/**
 * 楼板对象
 */
type FloorSlab = unknown;