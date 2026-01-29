/**
 * 场景数据导出模块
 * 提供将3D场景数据导出为标准化JSON格式的功能
 */

/**
 * 场景渲染数据接口
 */
export interface SceneRenderData {
  /** 设计唯一标识符 */
  uid: string;
  /** 任务ID */
  jobid: string;
  /** 设计版本号 */
  design_version: string;
  /** 代码版本号 */
  code_version: string;
  /** 北向量 [x, y, z] */
  north_vector: [number, number, number];
  /** 家具列表 */
  furniture: FurnitureData[];
  /** 网格数据 */
  mesh: MeshData[];
  /** 材质数据 */
  material: MaterialData[];
  /** 灯光列表 */
  lights: LightData[];
  /** 扩展数据 */
  extension: SceneExtension;
  /** 场景信息 */
  scene: SceneInfo;
  /** 骨骼动画数据 */
  skeletons?: SkeletonData[];
  /** 分组信息 */
  groups: GroupData[];
  /** 材质列表（SeekID） */
  materialList: string[];
}

/**
 * 场景信息
 */
export interface SceneInfo {
  /** 参考ID */
  ref: string;
  /** 位置 [x, y, z] */
  pos: [number, number, number];
  /** 旋转四元数 [x, y, z, w] */
  rot: [number, number, number, number];
  /** 缩放 [x, y, z] */
  scale: [number, number, number];
  /** 房间列表 */
  room: RoomData[];
  /** 包围盒 */
  boundingBox: {
    /** 最小点 [x, y, z] */
    min: [number, number, number];
    /** 最大点 [x, y, z] */
    max: [number, number, number];
  };
}

/**
 * 房间数据
 */
export interface RoomData {
  /** 房间类型 */
  type: string;
  /** 其他房间属性 */
  [key: string]: unknown;
}

/**
 * 家具数据
 */
export interface FurnitureData {
  /** 家具ID */
  id: string;
  /** 家具SeekID */
  jid: string;
  /** 位置 */
  pos: [number, number, number];
  /** 旋转 */
  rot: [number, number, number, number];
  /** 缩放 */
  scale: [number, number, number];
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 网格数据
 */
export interface MeshData {
  /** 网格ID */
  id: string;
  /** 顶点数据 */
  vertices: number[];
  /** 索引数据 */
  indices: number[];
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 材质数据
 */
export interface MaterialData {
  /** 材质SeekID */
  jid: string;
  /** 贴图URL */
  texture?: string;
  /** 法线贴图URL */
  normaltexture?: string;
  /** 渲染参数 */
  hsMaterialParameter?: Record<string, unknown>;
  /** 内容类型 */
  contentType?: string[];
  /** 颜色模式 */
  colorMode?: string;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 灯光数据
 */
export interface LightData {
  /** 灯光类型 */
  type: string;
  /** 位置 */
  pos: [number, number, number];
  /** 颜色 */
  color: [number, number, number];
  /** 强度 */
  intensity: number;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 场景扩展数据
 */
export interface SceneExtension {
  /** 门数据 */
  door: DoorData[];
  /** 室外标识 */
  outdoor: string;
  /** 全景数据 */
  pano: PanoData[];
  /** 小地图数据 */
  mini_map: {
    /** SVG数据 */
    svg?: string;
  };
  /** 透视视图 */
  perspective_view: Record<string, unknown>;
  /** 区域数据 */
  area: unknown[];
  /** 全景连接信息 */
  panoconnect?: PanoConnectInfo[];
  /** 快照列表 */
  snapshots: SnapshotData[];
  /** 色温 */
  temperature: number;
  /** 天空盒数据 */
  skybox: SkyboxData;
  /** VRay到UE的内容映射 */
  vrayToUeContents: string[];
  /** 澎湃参数（可选） */
  pengpaiParams?: unknown;
}

/**
 * 门数据
 */
export interface DoorData {
  /** 门ID */
  id: string;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 全景数据
 */
export interface PanoData {
  /** 全景ID */
  id: string;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 全景连接信息
 */
export interface PanoConnectInfo {
  /** 室内门 */
  inDoors: Array<{ ID: string }>;
  /** 室外门 */
  outDoors: Array<{ ID: string }>;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 快照数据
 */
export interface SnapshotData {
  /** 相机位置 [x, y, z] */
  pos: [number, number, number];
  /** 目标点 [x, y, z] */
  target: [number, number, number];
  /** 上向量 [x, y, z] */
  up: [number, number, number];
  /** 近裁剪面 */
  near: number;
  /** 远裁剪面 */
  far: number;
  /** 视野角度 */
  fov: number;
  /** 名称 */
  name: string;
  /** 缩略图 */
  thumbnail: string;
  /** 太阳光角度 */
  sunLightAngles: unknown;
}

/**
 * 天空盒数据
 */
export interface SkyboxData {
  /** 天空盒类型 */
  type: string;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 骨骼数据
 */
export interface SkeletonData {
  /** 骨骼ID */
  id: string;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 分组数据
 */
export interface GroupData {
  /** 类型 */
  type: string;
  /** SeekID */
  jid: string;
  /** 成员ID列表 */
  members: string[];
}

/**
 * 导出选项
 */
export interface ExportOptions {
  /** 设计数据 */
  designData?: unknown;
  /** 设计元数据 */
  designMeta?: unknown;
  /** 全景数据 */
  pano?: unknown;
  /** 解析后的FGI结果 */
  parsedFgiResult?: ParsedFgiResult;
  /** 是否使用澎湃渲染 */
  isUsePengpai?: boolean;
}

/**
 * 解析后的FGI结果
 */
export interface ParsedFgiResult {
  /** 材质列表 */
  materialList: string[];
  /** 场景房间 */
  sceneRoom: RoomData[];
  /** 家具 */
  furniture: FurnitureData[];
  /** 网格 */
  mesh: MeshData[];
  /** 材质 */
  material: MaterialData[];
  /** 门 */
  doors: DoorData[];
  /** 网格到房间ID映射 */
  meshToRoomIdMap: Map<string, string>;
  /** 骨骼 */
  skeletons?: SkeletonData[];
}

/**
 * 场景数据导出类
 * 负责将3D设计场景导出为标准化的渲染数据格式
 */
export declare class ExportSceneData {
  /**
   * 异步获取场景数据
   * @param options - 导出选项
   * @param fillMaterialData - 是否填充材质详细数据，默认false
   * @param returnObject - 是否返回对象而非JSON字符串，默认false
   * @returns 场景渲染数据（JSON字符串或对象）
   */
  static getSceneDataAsync(
    options: ExportOptions,
    fillMaterialData?: boolean,
    returnObject?: boolean
  ): Promise<string | SceneRenderData>;

  /**
   * 获取渲染场景数据
   * @param options - 导出选项
   * @returns 场景渲染数据对象
   */
  static getRenderSceneData(options: ExportOptions): Promise<SceneRenderData>;

  /**
   * 收集场景中的分组信息
   * @param document - 文档对象
   * @returns 分组数据数组
   * @private
   */
  private static _collectGroups(document: unknown): GroupData[];

  /**
   * 处理全景连接信息
   * 将门信息简化为仅包含ID
   * @param panoConnectList - 全景连接信息列表
   * @private
   */
  private static _dealPanoConnectInfo(panoConnectList: PanoConnectInfo[]): void;

  /**
   * 打开设计文档并获取全景连接器
   * @param docManager - 文档管理器
   * @param options - 导出选项
   * @returns 全景连接信息数组或undefined
   * @private
   */
  private static _designOpen(
    docManager: unknown,
    options: ExportOptions
  ): Promise<PanoConnectInfo[] | undefined>;

  /**
   * 异步填充材质数据
   * 从产品目录中获取材质的详细信息并填充到材质数据中
   * @param sceneData - 场景渲染数据
   * @param useBatch - 是否使用批量查询（分批次查询以提高性能），默认false
   * @returns 填充后的场景数据
   * @private
   */
  private static _fillMaterialDataAsync(
    sceneData: SceneRenderData,
    useBatch?: boolean
  ): Promise<SceneRenderData>;
}