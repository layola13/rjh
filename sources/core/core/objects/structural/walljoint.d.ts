/**
 * 墙体接头模块
 * 提供墙体连接点、接头管理和关联信息的类型定义
 */

/**
 * 接头点类型枚举
 * 定义墙体接头在墙体上的位置关系
 */
export enum JointPointType {
  /** 墙体起点 */
  from = "from",
  /** 墙体终点 */
  to = "to",
  /** 墙体中间位置 */
  between = "between"
}

/**
 * 墙体信息接口
 * 描述墙体与接头的关联关系
 */
export interface WallInfo {
  /** 关联的墙体对象 */
  wall: Wall;
  /** 接头在该墙体上的类型 */
  type: JointPointType;
}

/**
 * 墙体接头缓存结构
 * 用于快速查询墙体的各类接头
 */
export interface WallJointsCache {
  /** 起点接头 */
  from?: WallJoint;
  /** 终点接头 */
  to?: WallJoint;
  /** 中间接头列表 */
  between: WallJoint[];
}

/**
 * 接头查询选项
 * 用于过滤和筛选特定类型的接头
 */
export interface JointQueryOptions {
  /** 排除的接头类型掩码 */
  exclude?: number;
  /** 包含的接头类型掩码 */
  include?: number;
}

/**
 * 墙体链接信息类
 * 封装墙体的路径、偏移量和接头关系
 */
export declare class WallLinkInfo {
  /** 关联的墙体对象 */
  readonly wall: Wall;
  
  /** 右上角点坐标 */
  tr: Point;
  /** 左上角点坐标 */
  tl: Point;
  /** 左下角点坐标 */
  fl: Point;
  /** 右下角点坐标 */
  fr: Point;
  
  /** 终点路径集合 */
  toPath: Path[];
  /** 起点路径集合 */
  fromPath: Path[];
  
  private _floorplan: FloorplanDocument;

  /**
   * 构造函数
   * @param wall - 关联的墙体对象
   */
  constructor(wall: Wall);

  /**
   * 重置墙体路径信息
   * 根据墙体当前状态更新各个角点和路径
   */
  resetPath(): void;

  /**
   * 镜像操作后的路径更新
   */
  mirror(): void;

  /**
   * 获取墙体起点接头
   */
  get from(): WallJoint | undefined;

  /**
   * 获取墙体终点接头
   */
  get to(): WallJoint | undefined;

  /**
   * 获取墙体中心曲线
   */
  get curve(): Curve;

  /**
   * 获取左侧偏移量（墙体宽度的一半）
   */
  get loffset(): number;

  /**
   * 获取右侧偏移量（墙体宽度的一半）
   */
  get roffset(): number;
}

/**
 * 墙体接头管理器
 * 负责管理文档中所有墙体接头的创建、查询和维护
 */
export declare class WallJointManager extends Entity {
  /** 墙体到接头集合的映射表 */
  private _wallJointMap: Map<Wall, Set<WallJoint>>;
  
  /** 墙体到链接信息的映射表 */
  private _wallLink: Map<Wall, WallLinkInfo>;
  
  /** 墙体接头缓存 */
  private _wallJointsCache?: Map<Wall, WallJointsCache>;

  /**
   * 为墙体添加接头关联
   * @param wall - 墙体对象
   * @param joint - 接头对象
   */
  addJoint2Wall(wall: Wall, joint: WallJoint): void;

  /**
   * 从墙体移除接头关联
   * @param wall - 墙体对象
   * @param joint - 接头对象
   */
  removeJointFromWall(wall: Wall, joint: WallJoint): void;

  /**
   * 移除墙体及其所有关联接头
   * @param wall - 要移除的墙体对象
   */
  removeWall(wall: Wall): void;

  /**
   * 移除墙体的所有接头
   * @param wall - 墙体对象
   */
  removeWallJoints(wall: Wall): void;

  /**
   * 获取墙体的所有接头
   * @param wall - 墙体对象
   * @returns 接头数组
   */
  getWallJoints(wall: Wall): WallJoint[];

  /**
   * 获取墙体的起点接头
   * @param wall - 墙体对象
   * @returns 起点接头
   */
  getWallFromJoint(wall: Wall): WallJoint | undefined;

  /**
   * 获取墙体的所有起点接头
   * @param wall - 墙体对象
   * @returns 起点接头数组
   */
  getWallFromJoints(wall: Wall): WallJoint[];

  /**
   * 获取墙体的终点接头
   * @param wall - 墙体对象
   * @returns 终点接头
   */
  getWallToJoint(wall: Wall): WallJoint | undefined;

  /**
   * 获取墙体的所有终点接头
   * @param wall - 墙体对象
   * @returns 终点接头数组
   */
  getWallToJoints(wall: Wall): WallJoint[];

  /**
   * 获取墙体端点的接头
   * @param wall - 墙体对象
   * @param pointType - 端点类型
   * @param options - 查询选项
   * @returns 匹配的接头
   */
  getWallEndJoint(
    wall: Wall,
    pointType: JointPointType,
    options?: JointQueryOptions
  ): WallJoint | undefined;

  /**
   * 获取墙体端点的所有接头
   * @param wall - 墙体对象
   * @param pointType - 端点类型
   * @param options - 查询选项
   * @returns 匹配的接头数组（按类型、顺序、宽度排序）
   */
  getWallEndJoints(
    wall: Wall,
    pointType: JointPointType,
    options?: JointQueryOptions
  ): WallJoint[];

  /**
   * 获取墙体中间位置的接头
   * @param wall - 墙体对象
   * @returns 中间接头数组
   */
  getWallBetweenJoints(wall: Wall): WallJoint[];

  /**
   * 获取墙体的链接信息
   * @param wall - 墙体对象
   * @returns 墙体链接信息对象
   */
  getWallLink(wall: Wall): WallLinkInfo;

  /**
   * 清空所有接头数据
   */
  clear(): void;

  /**
   * 获取所有墙体的接头缓存映射
   */
  get wallJoints(): Map<Wall, WallJointsCache>;

  /**
   * 获取所有接头的扁平列表
   */
  get wallJointList(): WallJoint[];

  /**
   * 从序列化数据加载接头
   * @param data - 序列化的接头数据数组
   * @param context - 加载上下文
   */
  doLoad(data: unknown[], context: LoadContext): void;

  /**
   * 将接头序列化为数据
   * @param manager - 管理器实例
   * @param includeMetadata - 是否包含元数据
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  doDump(
    manager: WallJointManager,
    includeMetadata?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * 记录错误日志
   * @param message - 错误消息
   * @param data - 相关数据
   */
  private _log(message: string, data: unknown): void;

  /**
   * 是否为根实体
   */
  isRoot(): boolean;
}

/**
 * 墙体接头序列化/反序列化类
 * 处理接头对象的持久化存储
 */
export declare class WallJoint_IO extends Entity_IO {
  /**
   * 序列化接头对象
   * @param joint - 接头对象
   * @param postProcess - 后处理回调
   * @param includeMetadata - 是否包含元数据
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    joint: WallJoint,
    postProcess?: (data: unknown[], entity: WallJoint) => void,
    includeMetadata?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * 反序列化接头对象
   * @param joint - 目标接头对象
   * @param data - 序列化数据
   * @param context - 加载上下文
   */
  load(joint: WallJoint, data: SerializedJointData, context: LoadContext): void;
}

/**
 * 序列化的接头数据结构
 */
export interface SerializedJointData {
  /** 接头类型 */
  type: number;
  /** 主墙体ID */
  sWall?: string;
  /** 墙体信息映射表（墙体ID -> 接头类型） */
  wallInfos: Record<string, JointPointType>;
  /** 接头顺序 */
  od?: number;
}

/**
 * 墙体接头类
 * 表示两个或多个墙体的连接点
 */
export declare class WallJoint extends Entity {
  /** 接头类型（可包含多个标志位） */
  type: number;
  
  /** 墙体信息列表 */
  private __wallInfos: WallInfo[];
  
  /** 接头的排序顺序 */
  order: number;

  /**
   * 创建新的接头实例
   * @param type - 接头类型
   * @returns 新的接头对象
   */
  static create(type: number): WallJoint;

  /**
   * 构造函数
   * @param id - 接头ID（可选）
   */
  constructor(id?: string);

  /**
   * 获取所有关联墙体的链接信息
   */
  get links(): WallLinkInfo[];

  /**
   * 获取所有关联的墙体对象
   */
  get walls(): Wall[];

  /**
   * 获取墙体信息列表
   */
  get wallInfos(): WallInfo[];
  set wallInfos(value: WallInfo[]);

  /**
   * 是否为根实体
   */
  isRoot(): boolean;

  /**
   * 获取序列化处理器
   */
  getIO(): WallJoint_IO;

  /**
   * 添加墙体到接头
   * @param wall - 墙体对象
   * @param type - 接头在该墙体上的类型
   */
  addWall(wall: Wall, type: JointPointType): void;

  /**
   * 从接头移除墙体
   * @param wall - 要移除的墙体对象
   */
  removeWall(wall: Wall): void;

  /**
   * 获取墙体在接头中的位置类型
   * @param wall - 墙体对象
   * @returns 接头点类型
   */
  getWallPointType(wall: Wall): JointPointType | undefined;

  /**
   * 获取与指定墙体连接的其他墙体信息
   * @param wall - 参照墙体对象
   * @returns 连接的墙体信息
   */
  getLinkWallInfo(wall: Wall): WallInfo | undefined;

  /**
   * 更新墙体信息列表（内部方法）
   * @param wallInfos - 新的墙体信息列表
   */
  private _updateWallInfos(wallInfos: WallInfo[]): void;

  /**
   * 更新墙体信息列表（公共方法）
   * @param wallInfos - 新的墙体信息列表
   */
  updateWallInfos(wallInfos: WallInfo[]): void;

  /**
   * 销毁接头对象
   * 移除所有墙体关联并触发删除事务
   */
  destroy(): void;

  /**
   * 获取接头的交点坐标
   * 通过计算关联墙体中心线的交点得出
   * @returns 交点坐标（如果无法计算则返回undefined）
   */
  get point(): Point | undefined;
}

/**
 * 依赖的外部类型（需要从相应模块导入）
 */
declare class Entity {
  protected _doc: FloorplanDocument;
  static loadFromDumpById(id: string, context: LoadContext): Entity | undefined;
}

declare class Entity_IO {
  static instance(): Entity_IO;
  static setEntityFields(entity: Entity, fields: Record<string, unknown>): void;
  dump(
    entity: Entity,
    postProcess?: unknown,
    includeMetadata?: boolean,
    options?: DumpOptions
  ): unknown[];
  load(entity: Entity, data: unknown, context: LoadContext): void;
}

declare class Wall {
  id: string;
  width: number;
  curve: Curve;
  toPoints: Point[];
  fromPoints: Point[];
  toPaths: Path[];
  fromPaths: Path[];
  jointCurve: Curve;
}

declare class Point {
  distanceTo(other: Point): number;
}

declare class Curve {
  getStartPt(): Point;
  getEndPt(): Point;
}

declare class Path {}

interface FloorplanDocument {
  wallJointManager: WallJointManager;
  getEntityById(id: string): Entity | undefined;
}

interface LoadContext {}
interface DumpOptions {}