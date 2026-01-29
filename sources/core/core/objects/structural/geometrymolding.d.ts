/**
 * 几何造型模块
 * 提供踢脚线、檐口等装饰线条的几何建模与图形数据生成功能
 */

import { BaseObject } from './BaseObject';
import { WebCadMoldingDocument } from './WebCadMoldingDocument';

/**
 * 路径数据类型
 */
export interface PathData {
  /** 路径点集合 */
  points: Array<{ x: number; y: number; z: number }>;
  /** 是否闭合 */
  closed: boolean;
}

/**
 * 方向信息
 */
export interface DirectionInfo {
  /** 垂直线方向 */
  verticalLine: THREE.Vector3;
  /** 主方向 */
  dir: THREE.Vector3;
}

/**
 * 轮廓数据
 */
export interface ProfileData {
  /** 资源查找ID */
  seekId: string;
  /** 内容类型 */
  contentType: string;
  /** 轮廓路径 */
  profile: string;
  /** 高分辨率轮廓路径 */
  profileHigh?: string;
  /** 轮廓X方向长度 */
  profileSizeX: number;
  /** 轮廓Y方向长度 */
  profileSizeY: number;
  /** 轮廓宽度 */
  profileWidth: number;
  /** 轮廓高度 */
  profileHeight: number;
}

/**
 * 造型添加参数
 */
export interface MoldingAddParams {
  /** 造型名称 */
  name: string;
  /** 路径集合 */
  paths: PathData[];
  /** 完整路径集合 */
  wholePaths: PathData[];
  /** 轮廓数据 */
  profileData: {
    data: ProfileData;
  };
  /** 方向信息 */
  dirInfo: DirectionInfo;
  /** 是否保持轮廓坐标系 */
  bKeepProfileCordinate: boolean;
}

/**
 * 材质对象
 */
export interface MaterialObject {
  /** 漫反射贴图UV变换矩阵 */
  diffuseMapUvTransform?: THREE.Matrix3;
  /** 法线贴图UV变换矩阵 */
  normalMapUvTransform?: THREE.Matrix3;
  /** 造型材质旋转角度 */
  moldingMaterialRotation?: number;
  [key: string]: unknown;
}

/**
 * 网格定义
 */
export interface MeshDefinition {
  /** 网格键值 */
  meshKey: string;
  /** 顶点数据 */
  vertices: Float32Array;
  /** 索引数据 */
  indices: Uint32Array;
  /** UV坐标 */
  uvs?: Float32Array;
  /** 法线数据 */
  normals?: Float32Array;
  /** 自定义数据 */
  customData?: {
    /** 面材质ID */
    faceMaterialId?: string;
  };
}

/**
 * 自定义属性
 */
export interface CustomAttributes {
  /** 房间类型（格式：roomType-floorId） */
  roomType: string;
  /** 造型类型（Baseboard/Cornice） */
  type?: string;
  /** 材质资源ID列表 */
  seekIds?: string[];
}

/**
 * 图形对象数据
 */
export interface GraphicsObject {
  /** 图形路径 */
  graphicsPath: string;
  /** 网格键值 */
  mesh: string;
  /** 材质对象 */
  material: MaterialObject;
  /** 自定义属性 */
  customAttrs: CustomAttributes;
  /** 实体ID */
  entityId: string;
  /** 对象类型 */
  type: string;
  /** 是否可见 */
  visible: boolean;
  /** 引用的口袋材质 */
  refPocketMaterial?: string;
}

/**
 * 图形数据输出
 */
export interface GraphicsDataOutput {
  /** 网格定义列表 */
  meshDefs: MeshDefinition[];
  /** 图形对象列表 */
  objects: GraphicsObject[];
}

/**
 * 图形数据参数
 */
export interface GraphicsDataParams {
  /** 实体ID */
  entityId: string;
  /** 图形对象类型 */
  type: string;
  /** 是否可见 */
  visible: boolean;
}

/**
 * 造型实体接口
 */
export interface MoldingEntity {
  /** 实体ID */
  ID: string;
  /** 实体唯一ID */
  id: string;
  /** 资源查找ID */
  seekId: string;
  /** 内容类型 */
  contentType: string;
  /** 轮廓路径 */
  profile: string;
  /** 高分辨率轮廓 */
  profileHigh?: string;
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** 垂直线方向 */
  verticalLine: THREE.Vector3;
  /** 主方向 */
  dir: THREE.Vector3;
  /** 材质 */
  material: unknown;
  /** 父级对象集合 */
  parents: Record<string, unknown>;
  /** 是否保持轮廓坐标系 */
  bKeepProfileCordinate?: boolean;
  /** 材质变更信号 */
  signalMaterialChanged: unknown;
  
  /** 获取路径数据 */
  getPaths(): PathData[];
  /** 获取完整路径数据 */
  getWholePaths(): PathData[];
  /** 获取唯一父级 */
  getUniqueParent(): unknown;
  /** 获取宿主对象 */
  getHost(): unknown;
  /** 检查实例类型 */
  instanceOf(classType: string): boolean;
  /** 检查标志位是否关闭 */
  isFlagOff(flag: number): boolean;
}

/**
 * 几何造型核心类
 * 负责生成和管理装饰线条的几何数据
 */
export declare class GeometryMolding {
  /** 所属实体 */
  readonly owner: MoldingEntity;
  
  /** 内部WebCAD文档对象 */
  private _webCadDocument?: WebCadMoldingDocument;

  /**
   * 构造函数
   * @param owner 所属造型实体
   * @param webCadDocument WebCAD文档对象（可选）
   */
  constructor(owner: MoldingEntity, webCadDocument?: WebCadMoldingDocument);

  /**
   * 清理资源
   */
  clear(): void;

  /**
   * 更新造型数据
   * @param paths 路径数据（可选，默认从owner获取）
   * @param wholePaths 完整路径数据（可选，默认从owner获取）
   * @param directionInfo 方向信息（可选，默认从owner获取）
   */
  update(
    paths?: PathData[],
    wholePaths?: PathData[],
    directionInfo?: DirectionInfo
  ): void;

  /**
   * 更新房间自定义属性
   * @returns 包含房间类型的自定义属性对象
   */
  updateRoomCustomAttrs(): { roomType: string };

  /**
   * 处理图形数据（内部方法）
   * @param meshDefs 网格定义列表
   * @param params 图形数据参数
   * @returns 处理后的图形数据输出
   */
  private _dealGraphicsData(
    meshDefs: MeshDefinition[],
    params: GraphicsDataParams
  ): GraphicsDataOutput;

  /**
   * 转换为图形数据（同步）
   * @param params 图形数据参数
   * @returns 图形数据输出，若文档未初始化则返回undefined
   */
  toGraphicsData(params: GraphicsDataParams): GraphicsDataOutput | undefined;

  /**
   * 转换为图形数据（异步）
   * @param params 图形数据参数
   * @param progressCallback 进度回调函数（可选）
   * @returns Promise，返回图形数据输出或undefined
   */
  toGraphicsDataAsync(
    params: GraphicsDataParams,
    progressCallback?: (progress: number) => void
  ): Promise<GraphicsDataOutput | undefined>;

  /**
   * 获取口袋材质引用（内部方法）
   * @param doorEntity 门实体对象
   * @returns 材质引用名称，若不存在则返回undefined
   */
  private _getPocketMaterial(doorEntity?: unknown): string | undefined;
}

/**
 * 造型对象类
 * 继承自BaseObject，提供造型的完整生命周期管理
 */
export declare class Molding extends BaseObject {
  /** 几何造型处理器 */
  private _goemtryModeling: GeometryMolding;

  /**
   * 构造函数
   * @param entity 造型实体
   * @param webCadDocument WebCAD文档对象（可选）
   * @param param2 额外参数2
   * @param param3 额外参数3
   */
  constructor(
    entity: MoldingEntity,
    webCadDocument?: WebCadMoldingDocument,
    param2?: unknown,
    param3?: unknown
  );

  /**
   * 实体更新回调
   * 当实体数据变化时触发，重新计算几何数据
   */
  protected onUpdate(): void;

  /**
   * 判断是否需要生成高分辨率数据
   * @returns 如果存在高分辨率轮廓且与普通轮廓不同则返回true
   */
  needGenerateHighResolutionData(): boolean;

  /**
   * 转换为图形数据（同步）
   * @returns 图形数据输出
   */
  toGraphicsData(): GraphicsDataOutput | undefined;

  /**
   * 转换为图形数据（异步）
   * @param progressCallback 进度回调函数（可选）
   * @returns Promise，返回图形数据输出
   */
  toGraphicsDataAsync(
    progressCallback?: (progress: number) => void
  ): Promise<GraphicsDataOutput | undefined>;
}