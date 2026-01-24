/**
 * 定制模型结果类型枚举
 * 描述不同类型的定制化建模信息
 */
export enum CustomizedModelResultType {
  /** 结构信息 */
  StructureInfo = "structure info",
  /** 草图造型信息 */
  SketchMolding = "sketch molding info",
  /** 参数化吊顶信息 */
  ParametricCeiling = "parametric ceiling info",
  /** DIY模型信息 */
  DIYModel = "diy model info"
}

/**
 * BOM3基础模型数据结构
 */
interface Bom3BasicModel {
  /** 实体对象 */
  entity: unknown;
  /** 表面积 */
  surfaceArea?: number;
  /** 投影面积 */
  projectionArea?: number;
  /** 投影长度 */
  projectionLength?: number;
  /** 圆角半径 */
  cornerRadius?: number;
  /** 宿主面 */
  hostFace?: unknown;
  /** 底部面集合 */
  bottomFaces?: unknown[];
  /** 默认面积 */
  defaultFaceArea?: number;
  /** 造型ID列表 */
  moldings?: string[];
  /** 面数据列表 */
  faces?: unknown[];
}

/**
 * BOM3参数化吊顶参数结构
 */
interface Bom3CeilingParameters {
  /** 定制类型 */
  customizedType?: string;
  /** 吊顶类型 */
  ceilingType?: string;
  /** 吊顶高度 */
  ceilingHeight?: number;
  /** 吊顶宽度 */
  ceilingWidth?: number;
  /** 吊顶外弧半径 */
  ceilingOutArcRadius?: number;
  /** 转角矩形宽度 */
  cornerRectWidth?: number;
  /** 内部吊顶高度 */
  innerCeilingHeight?: number;
  /** 内部距离 */
  innerDistance?: number;
  /** 转角尺寸 */
  cornerSize?: number;
  /** 弧形半径 */
  arcRadius?: number;
  /** 弧形步长 */
  arcStep?: number;
  /** 级联宽度 */
  cascadeWidth?: number;
  /** 级联高度 */
  cascadeHeight?: number;
  /** 间隔宽度 */
  intervalWidth?: number;
  /** 宽度1 */
  w1?: number;
  /** 高度1 */
  h1?: number;
  /** 宽度2 */
  w2?: number;
  /** 高度2 */
  h2?: number;
  /** 宽度3 */
  w3?: number;
  /** 高度3 */
  h3?: number;
  /** 梁宽度 */
  beamWidth?: number;
  /** 梁高度 */
  beamHeight?: number;
  /** 梁长度 */
  beamLength?: number;
  /** 梁数量 */
  beamCount?: number;
  /** 梁表面积 */
  beamSurfaceArea?: number;
}

/**
 * BOM3数据结构
 */
interface Bom3Data {
  /** 基础模型数据 */
  basicModel: Bom3BasicModel;
  /** 参数数据 */
  parameters: Bom3CeilingParameters;
}

/**
 * 实体对象接口
 */
interface Entity {
  /** 实体唯一标识 */
  getId(): string;
  /** 子实体列表 */
  children?: Entity[];
}

/**
 * 数据库API上下文接口
 */
interface DbApiContext {
  /** 数据库API */
  dbApi: {
    /**
     * 根据断言查找所有匹配的实体
     * @param entities 实体列表
     * @param predicate 查询断言
     */
    findAll(entities: Entity[] | undefined, predicate: unknown): Entity[];
  };
}

/**
 * B3定制模型类
 * 继承自B3Entity，用于处理定制化模型的BOM3数据构建
 */
export declare class B3CustomizedModel {
  /** 上下文对象，包含数据库API */
  protected readonly context: DbApiContext;

  /**
   * 构建BOM3数据
   * @param entity 实体对象
   * @returns BOM3数据结构
   */
  buildBom3Data(entity: Entity): Bom3Data;

  /**
   * 获取造型ID列表
   * @param entity 实体对象
   * @returns 造型ID数组
   */
  getMoldingIds(entity: Entity): string[];

  /**
   * 获取面数据列表
   * @param entity 实体对象
   * @returns 面数据数组
   */
  getFaces(entity: Entity): unknown[];
}