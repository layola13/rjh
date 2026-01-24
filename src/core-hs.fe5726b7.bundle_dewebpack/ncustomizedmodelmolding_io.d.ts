import { Signal } from './Signal';
import { Molding, Molding_IO, MoldingTypeEnum } from './Molding';
import { Curve3d, Circle3d, Arc3d, Line3d, Line2d, Loop, Coordinate3, EN_GEO_ELEMENT_TYPE, MathAlg } from './Geometry';
import { MaterialData } from './Material';
import { EntityEventType } from './Entity';
import { ContentType, ContentTypeEnum } from './Catalog';
import { BodyBuilder, PreviewType } from './Algorithm';
import { NCustomizedFeatureModel } from './FeatureModel';

/**
 * 自定义模型线条的序列化/反序列化处理器
 */
export declare class NCustomizedModelMolding_IO extends Molding_IO {
  /**
   * 将线条模型导出为可序列化的数据格式
   * @param entity - 要导出的线条实体
   * @param callback - 导出后的回调函数
   * @param includeMetadata - 是否包含元数据
   * @param context - 导出上下文
   * @returns 导出的数据数组
   */
  dump(
    entity: NCustomizedModelMolding,
    callback?: (data: any[], entity: NCustomizedModelMolding) => void,
    includeMetadata?: boolean,
    context?: Record<string, any>
  ): any[];

  /**
   * 从序列化数据加载线条模型
   * @param entity - 目标实体对象
   * @param data - 序列化的数据
   * @param context - 加载上下文（包含产品映射等）
   */
  load(
    entity: NCustomizedModelMolding,
    data: SerializedMoldingData,
    context: LoadContext
  ): void;

  /**
   * 数据迁移处理（确保moldingId格式正确）
   * @param entity - 需要迁移的实体
   */
  private _migrate(entity: NCustomizedModelMolding): void;
}

/**
 * 线条扫掠参数配置
 */
export interface MoldingParameters {
  /** 产品目录ID */
  seekId: string;
  
  /** 轮廓数据 */
  profile: string;
  
  /** 预览轮廓数据 */
  previewProfile?: string;
  
  /** 依赖实体ID */
  relyerId: string;
  
  /** 轮廓宽度 */
  profileWidth: number;
  
  /** 轮廓高度 */
  profileHeight: number;
  
  /** 水平翻转 */
  flipHorizontal: boolean;
  
  /** 垂直翻转 */
  flipVertical: boolean;
  
  /** 翻转标记 */
  flip: boolean;
  
  /** X方向偏移 */
  offsetX: number;
  
  /** Y方向偏移 */
  offsetY: number;
  
  /** 扫掠路径的共边标签集合 */
  pathCoedge3dsTags: Array<string | Curve3d>;
  
  /** 面标签 */
  faceTag?: string;
  
  /** 材质数据 */
  materialData: MaterialData;
  
  /** 法线贴图纹理 */
  normalTexture?: string;
  
  /** 高清法线贴图 */
  normalTextureHigh?: string;
  
  /** 小图标 */
  iconSmall?: string;
  
  /** 内容类型字符串 */
  contentType: string;
  
  /** 偏移量 */
  offset?: number;
  
  /** 局部坐标系 */
  coord?: Coordinate3;
  
  /** 扫掠起点 */
  from?: Vector3;
  
  /** 扫掠终点 */
  to?: Vector3;
}

/**
 * 序列化后的线条数据结构
 */
interface SerializedMoldingData {
  metaId: string;
  moldingId: string;
  parameters: Omit<MoldingParameters, 'materialData' | 'coord'> & {
    materialData: string;
    coord?: any;
  };
  coord?: any;
}

/**
 * 加载上下文
 */
interface LoadContext {
  /** 产品元数据映射表 */
  productsMap?: Map<string, ProductMetadata>;
  [key: string]: any;
}

/**
 * 产品元数据
 */
interface ProductMetadata {
  id: string;
  seekId: string;
  profileSizeX: number;
  profileSizeY: number;
  contentTypeStr: string;
  profile?: string;
  toJSON?(): any;
}

/**
 * 中高精度曲线长度阈值配置
 */
interface PrecisionConfig {
  /** 中高精度曲线长度阈值 */
  midHighPrecisionCurveLengthThreshold: number;
}

/**
 * 轮廓完整数据
 */
interface ProfileFullData {
  data: any;
  flipHorizontal: boolean;
  flipVertical: boolean;
  flip: boolean;
  materialData?: any;
  normalTexture?: string;
}

/**
 * 投影路径信息
 */
interface ProjectionPathInfo {
  /** 路径段集合 */
  paths: Array<{ startPoint: XY; endPoint: XY }>;
  
  /** 真实路径 */
  realPaths: Curve3d[];
  
  /** 周长 */
  perimeter: number;
  
  /** 距离 */
  distance?: number;
}

/**
 * 线条信息
 */
interface MoldingInfo {
  /** 轮廓ID */
  profile: string;
  
  /** 材质ID */
  material: string;
  
  /** 线条长度 */
  moldingLength: number;
  
  /** 线条类型 */
  type: MoldingTypeEnum;
  
  /** 线条宽度 */
  moldingWidth: number;
  
  /** 线条高度 */
  moldingHeight: number;
  
  /** 顶视图投影 */
  topProjection: ProjectionPathInfo;
  
  /** 正视图投影 */
  frontProjection: ProjectionPathInfo;
}

/**
 * 自定义模型线条实体
 * 支持沿3D路径扫掠2D轮廓生成装饰线条（踢脚线、顶角线、装饰线等）
 */
export declare class NCustomizedModelMolding extends Molding {
  /** 线条唯一标识符 */
  moldingId: string;
  
  /** 线条参数（装饰器管理的字段） */
  parameters?: MoldingParameters;
  
  /** 预览模式标记 */
  private _previewMode: boolean;
  
  /** 缓存的图形数据 */
  private _graphicsData?: GraphicsData;
  
  /** 缓存的BREP几何体 */
  private _brepcache?: any;
  
  /** 裁剪脏标记信号 */
  signalClipDirty: Signal<this>;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param floorplan - 所属平面图
   */
  constructor(id?: string, floorplan?: any);

  /**
   * 初始化线条实体
   * @param metadata - 元数据
   * @param parameters - 线条参数
   */
  init(metadata: ProductMetadata, parameters: MoldingParameters): void;

  /**
   * 销毁实体，释放资源
   */
  destroy(): void;

  /** 设置/获取预览模式 */
  set previewMode(value: boolean);
  get previewMode(): boolean;

  /**
   * 获取依赖的父实体
   */
  get relyer(): NCustomizedFeatureModel | any | undefined;

  /**
   * 获取材质数据
   */
  getMaterialData(): MaterialData | undefined;

  /**
   * 标记实体为脏（需要更新）
   * @param event - 事件对象
   * @param options - 可选参数
   */
  dirty(event?: EntityEvent, options?: Record<string, any>): void;

  /**
   * 克隆当前实体
   */
  clone(): NCustomizedModelMolding;

  /**
   * 从另一个实体复制数据
   * @param source - 源实体
   */
  copyFrom(source: NCustomizedModelMolding): void;

  /**
   * 获取图形数据（面、边、内容）
   * @returns 图形数据对象
   */
  getGraphicsData(): GraphicsData;

  /**
   * 获取轮廓完整数据（包含翻转、材质等信息）
   */
  getProfileFullData(): ProfileFullData;

  /**
   * 异步获取图形数据
   */
  getGraphicsDataAsync(): Promise<GraphicsData>;

  /** 轮廓宽度 */
  get profileWidth(): number;

  /** 轮廓高度 */
  get profileHeight(): number;

  /** X方向偏移 */
  get offsetX(): number;

  /** Y方向偏移 */
  get offsetY(): number;

  /** 翻转标记 */
  get flip(): boolean;

  /** 垂直翻转 */
  get flipVertical(): boolean;

  /** 水平翻转 */
  get flipHorizontal(): boolean;

  /** 材质数据 */
  get materialData(): MaterialData | undefined;
  set materialData(value: MaterialData | any);

  /** 扫掠起点 */
  set from(point: Vector3);

  /** 扫掠终点 */
  set to(point: Vector3);

  /**
   * 获取扫掠路径的共边集合
   */
  get path(): any[];

  /**
   * 获取3D扫掠路径
   */
  getSweepPath3D(): Curve3d[];

  /**
   * 获取扫掠轮廓
   * @param usePreview - 是否使用预览轮廓
   */
  getSweepProfile(usePreview?: boolean): Loop | undefined;

  /**
   * 获取局部坐标系
   */
  getLocalCoordinate(): Coordinate3 | undefined;

  /**
   * 获取扫掠起始点
   */
  get sweepStartPoint(): Vector3 | undefined;

  /**
   * 获取BREP几何体
   * @param usePreview - 是否使用预览模式
   */
  getBrep(usePreview?: boolean): any;

  /**
   * 获取序列化处理器实例
   */
  getIO(): NCustomizedModelMolding_IO;

  /**
   * 标记几何体为脏
   * @param options - 可选参数
   */
  dirtyGeometry(options?: any): void;

  /**
   * 标记裁剪几何体为脏
   * @param options - 可选参数
   */
  dirtyClipGeometry(options?: any): void;

  /**
   * 更新实体存在性（检查依赖是否有效）
   * @returns 是否继续存在
   */
  updateExistence(): boolean;

  /**
   * 复制线条到新的依赖实体
   * @param relyerId - 新的依赖实体ID
   * @param pathTags - 路径标签
   * @param faceTag - 面标签
   */
  copy(
    relyerId: string,
    pathTags: Array<string | Curve3d>,
    faceTag?: string
  ): void;

  /**
   * 根据ID获取依赖实体
   * @param id - 实体ID
   */
  getRelyerById(id: string): NCustomizedFeatureModel | any | undefined;

  /**
   * 获取在指定平面上的投影
   * @param plane - 投影平面
   */
  getProjection(plane: Plane): Projection[];

  /**
   * 获取线条投影路径信息
   * @param projections - 投影数据
   * @param realPaths - 真实路径
   */
  getMoldingProjectionPaths(
    projections: Projection[],
    realPaths: Curve3d[]
  ): ProjectionPathInfo;

  /**
   * 获取线条详细信息
   * @param topPlane - 顶视图平面
   * @param frontPlane - 正视图平面
   */
  getMoldingInfo(topPlane: Plane, frontPlane: Plane): MoldingInfo | undefined;

  /**
   * 更新投影类型标记
   * @param projections - 投影数组
   */
  updateProjectionTypesFlag(projections: Projection[]): void;

  /**
   * 检查实体是否有效
   */
  isValid(): boolean;
}

// 辅助类型定义

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface XY {
  x: number;
  y: number;
}

interface Plane {
  origin: Vector3;
  normal: Vector3;
}

interface GraphicsData {
  faces: Map<string, FaceData>;
  edges: Map<string, EdgeData>;
  contents: Map<string, any>;
}

interface FaceData {
  customData: {
    fpMaterialData: any;
    uvs: Array<{ x: number; y: number }>;
    faceMaterialId: string;
    uoffset?: number;
    voffset?: number;
  };
  sketchModelData: {
    profileData: any;
  };
  vertexUVs: number[];
}

interface EdgeData {
  [key: string]: any;
}

interface Projection {
  paths: any[];
  distance?: number;
  isLightBand?: boolean;
  isLightSlot?: boolean;
  isMolding?: boolean;
}

interface EntityEvent {
  type: EntityEventType;
  options?: Record<string, any>;
}