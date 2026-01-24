/**
 * 迁移工具类型定义
 * 用于将旧版场景数据迁移到新版数据结构
 */

/**
 * 迁移上下文接口
 * 存储迁移过程中的中间数据和映射关系
 */
interface MigrationContext {
  /** 版本号 */
  version: string;
  /** 原始数据 */
  data: Record<string, EntityDump>;
  /** 材质数据映射 */
  materialsData: Map<string, MaterialData>;
  /** 状态数据 */
  statesData: Record<string, unknown>;
  /** 约束数据映射 */
  constraintsData: Map<string, unknown>;
  /** 产品映射 */
  productsMap: Map<string, ProductMeta>;
  /** 实体集合 */
  entities: Record<string, Entity>;
  /** 材质映射 */
  materials: Map<string, Material>;
  /** 状态集合 */
  states: Record<string, unknown>;
  /** 约束集合 */
  constraints: Record<string, unknown>;
  /** 相机集合 */
  cameras: Record<string, unknown>;
  /** 无效ID列表 */
  invalidIds: string[];
  /** 清空所有数据 */
  clear(): void;
}

/**
 * 实体数据结构
 */
interface EntityDump {
  /** 实体ID */
  id: string;
  /** 类名（长格式） */
  l?: string;
  /** 类名（短格式） */
  Class?: string;
  /** 标志位 */
  flag?: number;
  /** 子实体ID列表 */
  c?: string[];
  /** 子实体ID列表（别名） */
  children?: string[];
  /** 宿主实体ID */
  host?: string;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 迁移结果接口
 */
interface MigrationResult {
  /** 实体映射：旧ID -> 新实体 */
  migrateEntitiesMap: Map<string, Entity>;
  /** 墙面到面片的映射 */
  wall2FaceMap: Map<string, Face[]>;
  /** 实体ID反向映射：新ID -> 旧ID */
  migrateEntityIdsMap: Map<string, string>;
  /** 墙面面片变化标记 */
  migrateWallFaceChangedMap: Map<string, boolean>;
  /** 面片映射关系 */
  migrateFaceMapping: Map<string, Face[]>;
  /** 必须更新的面片集合 */
  migrateMustUpdateFace: Set<Face>;
  /** 是否跳过混合涂装 */
  migrateSkipMixpaint: boolean;
}

/**
 * 墙体几何数据
 */
interface WallGeometry {
  /** 墙体实体 */
  wall: Wall;
  /** 中心线（直线或圆弧） */
  line: Line2d | Arc2d;
  /** 几何轮廓线集合 */
  geomLines?: Curve2d[];
}

/**
 * 墙体映射信息
 */
interface WallMappingInfo {
  /** 旧墙体实体 */
  oldWall: Wall;
  /** 新墙体实体 */
  newWall: Wall;
}

/**
 * 开口迁移信息
 */
interface OpeningMigrationInfo {
  /** 开口实体映射 */
  openings: Map<Opening, Opening>;
  /** 墙体洞口信息 */
  wallHoleInfo: {
    holes: Hole[];
    walls: Wall[];
  };
  /** 楼板洞口信息 */
  slabHoleInfo: {
    holes: Hole[];
    floors: Floor[];
  };
}

/**
 * 面片线段信息
 */
interface FaceLineInfo {
  /** 面片路径顶点 */
  facePath: Vector3[];
  /** 2D线段 */
  line: Line2d;
  /** 所属墙体 */
  wall: Wall;
  /** 所属面片 */
  face: Face;
}

/**
 * 面片匹配信息
 */
interface FaceMatchInfo {
  /** 面片实体 */
  face: Face;
  /** 面积 */
  area: number;
  /** 面片路径 */
  facePath: Vector3[];
  /** 新面片路径 */
  newFacePath: Vector3[];
  /** 新面积 */
  newArea: number;
}

/**
 * 面片剪裁路径
 */
interface FaceClipPath {
  /** 外轮廓 */
  outer: Point2d[];
  /** 内孔洞 */
  holes: Point2d[][];
}

/**
 * T型接头信息
 */
interface TJointInfo {
  /** 接头实体 */
  tJoint: Joint;
  /** 距离 */
  dist: number;
}

/**
 * 主迁移类
 * 负责将旧版HSCore数据结构迁移到新版
 */
export declare class Migration {
  /** 是否禁用自定义接头 */
  static get disableDiyJoint(): boolean;
  static set disableDiyJoint(value: boolean);

  /**
   * 执行迁移操作
   * @param oldData 旧版数据
   * @param context 迁移上下文
   * @param targetScene 目标场景
   * @returns 迁移结果的Promise
   */
  static migrate(
    oldData: { data: EntityDump[]; associations: unknown },
    context: MigrationContext,
    targetScene: Scene
  ): Promise<MigrationResult>;

  /**
   * 迁移楼板面片
   * @param oldLayer 旧图层
   * @param docManager 文档管理器
   * @param entityMap 实体映射
   */
  static migrateSlabFaces(
    oldLayer: Layer,
    docManager: DocManager,
    entityMap: Map<string, Entity>
  ): void;

  /**
   * 迁移室外图层
   * @param docManager 文档管理器
   * @param entityMap 实体映射
   */
  static migrateOutdoorLayer(
    docManager: DocManager,
    entityMap: Map<string, Entity>
  ): void;

  /**
   * 简化线段，移除共线点
   * @param points 原始点集
   * @param tolerance 容差值，默认为系统默认容差
   * @returns 简化后的点集
   */
  static simplifyLine(
    points: Point3d[],
    tolerance?: number
  ): Point3d[];

  /**
   * 获取墙体边缘类型
   * @param wall 墙体实体
   * @param startPoint 起点
   * @param endPoint 终点
   * @returns 墙面类型（左/右/前/后）
   */
  static getEdgeType(
    wall: Wall,
    startPoint: Point3d,
    endPoint: Point3d
  ): WallFaceType | undefined;

  /**
   * 分配宿主关系
   * @param context 迁移上下文
   */
  static assignHost(context: MigrationContext): void;

  /**
   * 迁移地板
   * @param oldLayer 旧图层
   * @param newLayer 新图层
   * @param docManager 文档管理器
   * @param entityMap 实体映射
   */
  static migrateFloor(
    oldLayer: Layer,
    newLayer: Layer,
    docManager: DocManager,
    entityMap: Map<string, Entity>
  ): void;

  /**
   * 迁移楼板
   * @param oldLayer 旧图层
   * @param newLayer 新图层
   * @param entityMap 实体映射
   */
  static migrateSlab(
    oldLayer: Layer,
    newLayer: Layer,
    entityMap: Map<string, Entity>
  ): void;

  /**
   * 迁移门石材质
   * @param openings 开口列表
   */
  static migrateDOpeningDoorStone(openings: Opening[]): void;

  /**
   * 迁移装配式开口
   * @param oldLayer 旧图层
   * @param newLayer 新图层
   * @param entityMap 实体映射
   * @param context 迁移上下文
   * @returns 开口列表
   */
  static migrateDOpening(
    oldLayer: Layer,
    newLayer: Layer,
    entityMap: Map<string, Entity>,
    context: MigrationContext
  ): Opening[];

  /**
   * 迁移转角窗
   * @param oldLayer 旧图层
   * @param newLayer 新图层
   * @param entityMap 实体映射
   * @param context 迁移上下文
   * @returns Promise<void>
   */
  static migrateCornerWindow(
    oldLayer: Layer,
    newLayer: Layer,
    entityMap: Map<string, Entity>,
    context: MigrationContext
  ): Promise<void>;

  /**
   * 迁移开口（门窗洞）
   * @param oldLayer 旧图层
   * @param newLayer 新图层
   * @param entityMap 实体映射
   * @param context 迁移上下文
   * @returns 开口迁移信息
   */
  static migrateOpening(
    oldLayer: Layer,
    newLayer: Layer,
    entityMap: Map<string, Entity>,
    context: MigrationContext
  ): OpeningMigrationInfo;

  /**
   * 映射水平面片到新面片
   * @param oldFace 旧面片
   * @param newFaces 新面片列表
   * @param entityMap 实体映射
   * @param context 迁移上下文
   * @returns 匹配的新面片或undefined
   */
  static mapHorFaceToNewFace(
    oldFace: Face,
    newFaces: Face[],
    entityMap: Map<string, Entity>,
    context: MigrationContext
  ): Face | undefined;

  /**
   * 记录错误日志
   * @param key 错误键
   * @param message 错误消息
   * @param category 错误类别
   * @param extra 额外信息
   */
  static logError(
    key: string,
    message: string,
    category: string,
    extra: Record<string, unknown>
  ): void;

  /**
   * 记录警告日志
   * @param message 警告消息
   */
  static logWarning(message: string): void;
}

/**
 * 墙面类型枚举
 */
declare enum WallFaceType {
  left = "left",
  right = "right",
  front = "front",
  back = "back"
}

/** 内部使用的静态属性 */
declare namespace Migration {
  /** 曲线重叠判断的位置类型 */
  const _curvePositionOverlapType: CurveCurvePositionType[];
  /** 是否禁用自定义接头的内部标志 */
  let _disableDiyJoint: boolean;
}