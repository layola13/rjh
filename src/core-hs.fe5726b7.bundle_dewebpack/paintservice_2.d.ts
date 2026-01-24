/**
 * 涂料服务模块
 * 提供涂料、材质、几何数据处理的核心服务
 */

/**
 * 自定义图形数据异步处理器类型
 */
export type CustomGraphicsDataAsyncHandler = (data: unknown) => Promise<unknown>;

/**
 * 自定义表面图形数据异步处理器类型
 */
export type CustomSurfaceGraphicsDataAsyncHandler = (data: unknown) => Promise<unknown>;

/**
 * 材质数据接口
 */
export interface MaterialData {
  /** 材质数据用于FGI */
  getMaterialDataForFGI(): unknown;
}

/**
 * 材质接口
 */
export interface Material {
  getMaterialDataForFGI(): unknown;
}

/**
 * 面类型：墙面、地面、天花板等
 */
export type FaceType = 'wall' | 'floor' | 'ceiling' | string;

/**
 * 表面元数据接口
 */
export interface SurfaceMeta {
  /** 底面几何数据（可选） */
  bottomFaceGeometries?: unknown[];
}

/**
 * 几何数据接口
 */
export interface GeometryData {
  // 几何数据结构
  [key: string]: unknown;
}

/**
 * 面图形数据接口
 */
export interface FaceGraphicsData {
  // 面图形数据结构
  [key: string]: unknown;
}

/**
 * 表面图形数据接口
 */
export interface SurfaceGraphicsData {
  // 表面图形数据结构
  [key: string]: unknown;
}

/**
 * 2D网格数据接口
 */
export interface Mesh2D {
  // 2D网格数据结构
  [key: string]: unknown;
}

/**
 * 涂料形状接口
 */
export interface PaintShape {
  /** 外轮廓 */
  outer?: unknown;
  [key: string]: unknown;
}

/**
 * 铺装选项接口
 */
export interface PavingOption {
  /** 参考点坐标 */
  point: {
    x: number;
    y: number;
    z?: number;
  };
  /** 铺装方向角度数组 */
  directions: number[];
  /** 旋转角度 */
  rotation: number;
}

/**
 * 涂料数据接口
 */
export interface PaintData {
  /** 涂料形状数组 */
  shapes?: PaintShape[];
  /** 铺装选项 */
  pavingOption: PavingOption;
  [key: string]: unknown;
}

/**
 * 表面数据接口
 */
export interface SurfaceData {
  /** 涂料数据数组 */
  paints: PaintData[];
  [key: string]: unknown;
}

/**
 * 涂料边界尺寸接口
 */
export interface PaintBoundingSize {
  width: number;
  height: number;
  depth?: number;
}

/**
 * 实体接口（Face或Wall）
 */
export interface Entity {
  /** 实体标签 */
  tag: string;
  /** 获取材质 */
  getMaterial(faceType?: FaceType): Material;
  /** 材质属性（Face专用） */
  material?: Material;
}

/**
 * 表面数据获取选项
 */
export interface SurfaceDataOptions {
  /** 是否包含铺装方向 */
  pavingDirection?: boolean;
  /** 面类型 */
  faceType?: FaceType;
}

/**
 * 涂料处理器接口
 */
export interface PaintHandler {
  /**
   * 设置自定义图形数据异步处理器
   */
  setCustomGraphicsDataAsyncHandler(handler: CustomGraphicsDataAsyncHandler): void;

  /**
   * 设置自定义表面图形数据异步处理器
   */
  setCustomSurfaceGraphicsDataAsyncHandler(handler: CustomSurfaceGraphicsDataAsyncHandler): void;

  /**
   * 从材质获取几何数据
   */
  getGeometryDataFromMaterial(material: Material, params: unknown): GeometryData;

  /**
   * 从材质获取面图形数据
   */
  getFaceGraphicsDataFromMaterial(material: Material, param1: unknown, param2: unknown): FaceGraphicsData;

  /**
   * 从材质异步获取面图形数据
   */
  getFaceGraphicsDataFromMaterialAsync(material: Material, param1: unknown, param2: unknown): Promise<FaceGraphicsData>;

  /**
   * 从材质获取表面图形数据
   */
  getSurfaceGraphicsDataFromMaterial(material: Material, param1: unknown, param2: unknown): SurfaceGraphicsData;

  /**
   * 从材质异步获取表面图形数据
   */
  getSurfaceGraphicsDataFromMaterialAsync(material: Material, param1: unknown, param2: unknown): Promise<SurfaceGraphicsData>;

  /**
   * 获取2D网格
   */
  get2DMesh(param1: unknown, param2: unknown, param3: unknown, param4: unknown): Mesh2D;

  /**
   * 获取表面数据
   */
  getSurfaceData(materialData: unknown, surfaceMeta: SurfaceMeta, options?: SurfaceDataOptions): SurfaceData | undefined;

  /**
   * 合并地板与底面（静态方法）
   */
  static mergeFloorWithBottomFaces(bottomFaces: unknown[], paintData: PaintData[]): void;

  /**
   * 获取品画涂料数据（静态方法）
   */
  static getPinhuaPaintData(entity: Entity): unknown;

  /**
   * 从材质获取涂料列表（静态方法）
   */
  static getPaints(material: Material): unknown[];
}

/**
 * 涂料服务类（单例模式）
 * 提供涂料相关的所有业务逻辑处理
 */
export declare class PaintService {
  /**
   * 单例实例
   */
  private static _instance?: PaintService;

  /**
   * 涂料处理器实例
   */
  private _handler?: PaintHandler;

  /**
   * 私有构造函数，防止外部实例化
   */
  private constructor();

  /**
   * 获取PaintService单例实例
   * @returns PaintService实例
   */
  static instance(): PaintService;

  /**
   * 获取涂料处理器
   * @returns PaintHandler实例
   */
  get handler(): PaintHandler;

  /**
   * 设置自定义图形数据异步处理器
   * @param handler 自定义处理器函数
   */
  setCustomGraphicsDataAsyncHandler(handler: CustomGraphicsDataAsyncHandler): void;

  /**
   * 设置自定义表面图形数据异步处理器
   * @param handler 自定义处理器函数
   */
  setCustomSurfaceGraphicsDataAsyncHandler(handler: CustomSurfaceGraphicsDataAsyncHandler): void;

  /**
   * 从材质获取几何数据
   * @param material 材质对象
   * @param params 参数
   * @returns 几何数据
   */
  getGeometryDataFromMaterial(material: Material, params: unknown): GeometryData;

  /**
   * 从材质获取面图形数据
   * @param material 材质对象
   * @param param1 参数1
   * @param param2 参数2
   * @returns 面图形数据
   */
  getFaceGraphicsDataFromMaterial(material: Material, param1: unknown, param2: unknown): FaceGraphicsData;

  /**
   * 从材质异步获取面图形数据
   * @param material 材质对象
   * @param param1 参数1
   * @param param2 参数2
   * @returns 面图形数据Promise
   */
  getFaceGraphicsDataFromMaterialAsync(material: Material, param1: unknown, param2: unknown): Promise<FaceGraphicsData>;

  /**
   * 从材质获取表面图形数据
   * @param material 材质对象
   * @param param1 参数1
   * @param param2 参数2
   * @returns 表面图形数据
   */
  getSurfaceGraphicsDataFromMaterial(material: Material, param1: unknown, param2: unknown): SurfaceGraphicsData;

  /**
   * 从材质异步获取表面图形数据
   * @param material 材质对象
   * @param param1 参数1
   * @param param2 参数2
   * @returns 表面图形数据Promise
   */
  getSurfaceGraphicsDataFromMaterialAsync(material: Material, param1: unknown, param2: unknown): Promise<SurfaceGraphicsData>;

  /**
   * 获取2D网格
   * @param param1 参数1
   * @param param2 参数2
   * @param param3 参数3
   * @param param4 参数4
   * @returns 2D网格数据
   */
  get2DMesh(param1: unknown, param2: unknown, param3: unknown, param4: unknown): Mesh2D;

  /**
   * 获取表面数据
   * @param entity 实体对象（Face或Wall）
   * @param bottomFaceGeometries 底面几何数据（可选）
   * @returns 表面数据
   */
  getSurfaceData(entity: Entity, bottomFaceGeometries?: unknown[]): SurfaceData | undefined;

  /**
   * 获取混合涂料数据
   * @param entity 实体对象
   * @param bottomFaces 底面数据（可选）
   * @returns 混合涂料数据
   */
  getMixPaintData(entity: Entity, bottomFaces?: unknown[]): PaintData[] | undefined;

  /**
   * 获取品画涂料数据
   * @param entity 实体对象
   * @returns 品画涂料数据
   */
  getPinhuaPaintData(entity: Entity): unknown;

  /**
   * 获取混合涂料列表
   * @param entity 实体对象
   * @param faceType 面类型
   * @returns 涂料列表
   */
  getMixPaints(entity: Entity, faceType: FaceType): unknown[];

  /**
   * 获取用于DWG的混合涂料数据
   * @param entity 实体对象（Face或Wall）
   * @param faceType 面类型
   * @returns 涂料数据数组
   * @throws 当无法从实体获取材质时抛出错误
   */
  getMixpaintDataForDWG(entity: Entity, faceType: FaceType): PaintData[] | undefined;
}