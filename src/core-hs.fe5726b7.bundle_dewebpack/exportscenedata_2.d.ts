/**
 * 场景数据导出模块
 * 提供场景数据的导出和序列化功能
 */

/**
 * 边界框定义
 */
interface BoundingBox {
  /** 最小坐标 [x, y, z] */
  min: [number, number, number];
  /** 最大坐标 [x, y, z] */
  max: [number, number, number];
}

/**
 * 房间数据
 */
interface RoomData {
  /** 房间类型 */
  type: string;
  [key: string]: unknown;
}

/**
 * 场景层次结构
 */
interface SceneHierarchy {
  /** 引用ID */
  ref: string;
  /** 位置坐标 [x, y, z] */
  pos: number[];
  /** 旋转四元数 [x, y, z, w] */
  rot: number[];
  /** 缩放比例 [x, y, z] */
  scale: number[];
  /** 房间列表 */
  room: RoomData[];
  /** 场景边界框 */
  boundingBox: BoundingBox;
}

/**
 * 全景门信息
 */
interface PanoDoorInfo {
  /** 门ID */
  ID: string;
}

/**
 * 全景连接信息
 */
interface PanoConnectInfo {
  /** 内部门列表 */
  inDoors: PanoDoorInfo[];
  /** 外部门列表 */
  outDoors: PanoDoorInfo[];
}

/**
 * 相机快照数据
 */
interface CameraSnapshot {
  /** 相机位置 [x, y, z] */
  pos: [number, number, number];
  /** 目标位置 [x, y, z] */
  target: [number, number, number];
  /** 上方向 [x, y, z] */
  up: [number, number, number];
  /** 近裁剪面距离 */
  near: number;
  /** 远裁剪面距离 */
  far: number;
  /** 视场角 */
  fov: number;
  /** 快照名称 */
  name: string;
  /** 缩略图数据 */
  thumbnail?: string;
  /** 太阳光角度 */
  sunLightAngles?: unknown;
}

/**
 * 天空盒数据
 */
interface SkyboxData {
  [key: string]: unknown;
}

/**
 * 澎湃渲染参数
 */
interface PengpaiParams {
  [key: string]: unknown;
}

/**
 * 场景扩展数据
 */
interface SceneExtension {
  /** 门数据 */
  door: unknown[];
  /** 室外场景标识 */
  outdoor: string;
  /** 全景数据 */
  pano: unknown[];
  /** 小地图配置 */
  mini_map: {
    svg?: string;
  };
  /** 透视视图配置 */
  perspective_view: Record<string, unknown>;
  /** 区域列表 */
  area: unknown[];
  /** 全景连接信息 */
  panoconnect?: PanoConnectInfo[];
  /** 快照列表 */
  snapshots: CameraSnapshot[];
  /** 色温 */
  temperature: number;
  /** 天空盒数据 */
  skybox: SkyboxData;
  /** VRay到UE的内容映射 */
  vrayToUeContents: string[];
  /** 澎湃渲染参数（可选） */
  pengpaiParams?: PengpaiParams;
}

/**
 * 材质参数
 */
interface MaterialParameter {
  /** 材质产品ID */
  jid: string;
  /** 贴图URL */
  texture?: string;
  /** 法线贴图URL */
  normaltexture?: string;
  /** HS材质渲染参数 */
  hsMaterialParameter?: unknown;
  /** 内容类型 */
  contentType?: string[];
  /** 颜色模式 */
  colorMode?: HSCore.Material.ColorModeEnum;
  [key: string]: unknown;
}

/**
 * 骨骼动画数据
 */
interface SkeletonData {
  [key: string]: unknown;
}

/**
 * 分组信息
 */
interface GroupInfo {
  /** 类型 */
  type: string;
  /** 产品ID */
  jid: string;
  /** 成员ID列表 */
  members: string[];
}

/**
 * 完整场景数据结构
 */
interface SceneData {
  /** 设计唯一标识 */
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
  furniture: unknown[];
  /** 网格数据 */
  mesh: unknown[];
  /** 材质数据 */
  material: MaterialParameter[];
  /** 灯光列表 */
  lights: unknown[];
  /** 扩展数据 */
  extension: SceneExtension;
  /** 场景层次结构 */
  scene: SceneHierarchy;
  /** 骨骼数据 */
  skeletons: SkeletonData[];
  /** 分组信息 */
  groups: GroupInfo[];
  /** 材质产品ID列表 */
  materialList: string[];
}

/**
 * 设计数据输入参数
 */
interface DesignDataInput {
  /** 设计数据 */
  designData?: unknown;
  /** 设计元数据 */
  designMeta?: unknown;
  /** 全景数据 */
  pano?: unknown;
  /** 解析后的FGI结果 */
  parsedFgiResult?: {
    materialList: string[];
    sceneRoom: RoomData[];
    furniture: unknown[];
    mesh: unknown[];
    material: MaterialParameter[];
    doors: unknown[];
    meshToRoomIdMap: Map<string, string>;
    skeletons: SkeletonData[];
  };
  /** 是否使用澎湃渲染 */
  isUsePengpai?: boolean;
}

/**
 * 场景数据导出类
 * 负责将场景数据导出为渲染所需的标准格式
 */
export declare class ExportSceneData {
  /**
   * 异步获取场景数据
   * @param designInput - 设计数据输入
   * @param fillMaterialData - 是否填充材质详细数据（默认false）
   * @param returnObject - 是否返回对象而非JSON字符串（默认false）
   * @returns 场景数据对象或JSON字符串
   */
  static getSceneDataAsync(
    designInput: DesignDataInput,
    fillMaterialData?: boolean,
    returnObject?: boolean
  ): Promise<SceneData | string>;

  /**
   * 获取渲染场景数据
   * @param designInput - 设计数据输入
   * @returns 场景数据对象
   */
  static getRenderSceneData(designInput: DesignDataInput): Promise<SceneData>;

  /**
   * 收集场景中的分组信息
   * @param document - 文档对象
   * @returns 分组信息数组
   * @private
   */
  private static _collectGroups(document: HSCore.Doc.Document): GroupInfo[];

  /**
   * 处理全景连接信息
   * @param panoConnectList - 全景连接列表
   * @private
   */
  private static _dealPanoConnectInfo(panoConnectList: PanoConnectInfo[]): void;

  /**
   * 打开设计文档
   * @param docManager - 文档管理器
   * @param designInput - 设计数据输入
   * @returns 全景连接信息（如果存在）
   * @private
   */
  private static _designOpen(
    docManager: HSCore.Doc.DocumentManager,
    designInput: DesignDataInput
  ): Promise<PanoConnectInfo[] | undefined>;

  /**
   * 填充材质详细数据
   * @param sceneData - 场景数据
   * @param batchFetch - 是否批量获取（默认false）
   * @returns 填充后的场景数据
   * @private
   */
  private static _fillMaterialDataAsync(
    sceneData: SceneData,
    batchFetch?: boolean
  ): Promise<SceneData>;
}