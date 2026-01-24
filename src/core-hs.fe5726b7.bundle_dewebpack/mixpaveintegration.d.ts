/**
 * MixPave 集成模块
 * 提供材质混合铺设（MixPave）功能的网格数据生成服务
 */

/**
 * 三维向量接口
 */
interface Vector2 {
  x: number;
  y: number;
  copy(v: Vector2): Vector2;
  transform(matrix: Matrix3): Vector2;
}

/**
 * 三维矩阵接口
 */
interface Matrix3 {
  toArray(): number[];
  fromArray(array: number[]): Matrix3;
  inversed(): Matrix3 | undefined;
  isIdentity(): boolean;
  static makeTranslate(point: { x: number; y: number }): Matrix3;
}

/**
 * 二维线段
 */
declare class Line2d {
  constructor(start: Vector2, end: Vector2);
}

/**
 * 容差配置
 */
declare class Tolerance {
  constructor(value: number);
}

/**
 * 颜色模式枚举
 */
declare enum ColorMode {
  /** 纯色模式 */
  Color = 0,
  /** 纹理模式 */
  Texture = 1,
  /** 混合模式 */
  Blend = 2
}

/**
 * 裁剪模式枚举
 */
declare enum ClipMode {
  /** 并集 */
  Union = 0,
  /** 交集 */
  Intersection = 1,
  /** 差集 */
  Difference = 2
}

/**
 * 材质接口
 */
interface Material {
  /** 材质ID（SeekId） */
  seekId: string;
  /** 颜色值（RGB） */
  color?: number;
  /** 混合颜色 */
  blendColor?: number;
  /** 颜色模式 */
  colorMode: ColorMode;
  /** 纹理URL */
  textureUrl?: string;
  /** UV变换矩阵 */
  uvTransform: Matrix3;
  /** 是否透明 */
  isTransparent?: boolean;
  /** 自定义3D属性 */
  customized3D?: {
    textureUrl?: string;
    uvTransform: Matrix3;
  };
}

/**
 * 网格定义
 */
interface MeshDef {
  /** 顶点索引数组 */
  indices: number[];
  /** 索引数量（三角形数量） */
  indexCount: number;
  /** 网格唯一键 */
  meshKey?: string;
  /** 顶点数量 */
  vertexCount: number;
  /** 顶点法线数组 */
  vertexNormals: number[];
  /** 顶点位置数组 */
  vertexPositions: number[];
  /** 顶点UV坐标数组 */
  vertexUVs: number[];
}

/**
 * 图形数据接口
 */
interface GraphicsData {
  /** 唯一标识 */
  id?: string;
  /** 数据类型 */
  dataType?: string;
  /** 包围盒 */
  bound?: unknown;
  /** 自定义属性 */
  customAttrs?: Record<string, unknown>;
  /** 材质信息 */
  material: {
    seekId: string;
    color: number;
    colorMode: ColorMode;
    textureURI?: string;
    normalTexture?: string;
    uvTransform: THREE.Matrix3;
    normalUvTransform: THREE.Matrix3;
    absoluteUseUVTransform: boolean;
    isTransparent?: boolean;
  };
  /** 网格定义 */
  meshDef: MeshDef;
  /** 维度（2D/3D） */
  dimension?: number;
}

/**
 * 原始网格数据（来自FGI服务）
 */
interface RawMeshData {
  /** 材质 */
  material: Material;
  /** 顶点索引 */
  indices: number[];
  /** 顶点坐标 */
  vertices: number[];
  /** 维度 */
  dimension: number;
  /** 法线 */
  normals: number[];
  /** UV坐标 */
  uvs: number[];
  /** 自定义属性 */
  customAttrs?: Record<string, unknown>;
}

/**
 * 背景几何数据
 */
interface BackgroundGeometry {
  /** 外轮廓点集 */
  outer: Vector2[];
  /** 内孔洞点集 */
  holes?: Vector2[][];
}

/**
 * 面组数据接口
 */
interface FaceGroup {
  /** 背景几何 */
  bg: BackgroundGeometry;
  /** 底面几何数组 */
  bottomFaceGeometries?: Vector2[][];
  /** 变换矩阵 */
  transform?: Matrix3;
  /** 左偏移 */
  left?: number;
  /** 底部偏移 */
  bottom?: number;
  /** 分段数据 */
  segments?: Segment[];
}

/**
 * 分段接口
 */
interface Segment {
  /** 平面路径 */
  planePath: Vector2[];
}

/**
 * 混合铺设配置
 */
interface MixPaveConfig {
  /** 材质ID */
  seekId?: string;
  /** 其他配置项 */
  [key: string]: unknown;
}

/**
 * 材质扩展信息
 */
interface MaterialExtension {
  /** 混合绘制配置 */
  mixpaint?: {
    /** 混合铺设配置 */
    mixPave?: MixPaveConfig;
  };
}

/**
 * 路径集合
 */
interface PathSet {
  outer: Line2d[];
  holes?: Line2d[][];
}

/**
 * 网格生成选项
 */
interface MeshGenerationOptions {
  /** 合并路径 */
  mergePaths?: Line2d[][];
}

/**
 * MixPave集成类
 * 负责处理混合铺设材质的网格生成与转换
 */
declare class MixPaveIntegration {
  /**
   * 单例实例
   */
  static readonly ins: MixPaveIntegration;

  /**
   * 获取面组的网格数据（同步）
   * @param materialExt - 材质扩展信息
   * @param faceGroup - 面组数据
   * @param param2 - 未知参数2
   * @param param3 - 未知参数3
   * @returns 图形数据数组
   */
  getMeshs(
    materialExt: MaterialExtension,
    faceGroup: FaceGroup,
    param2: unknown,
    param3: unknown
  ): GraphicsData[];

  /**
   * 获取面组的网格数据（异步）
   * @param materialExt - 材质扩展信息
   * @param faceGroup - 面组数据
   * @param param2 - 未知参数2
   * @param param3 - 未知参数3
   * @returns Promise包装的图形数据数组
   */
  getMeshsAsync(
    materialExt: MaterialExtension,
    faceGroup: FaceGroup,
    param2: unknown,
    param3: unknown
  ): Promise<GraphicsData[]>;

  /**
   * 根据弧线分段获取网格数据（同步）
   * @param materialExt - 材质扩展信息
   * @param faceGroup - 面组数据（必须包含segments）
   * @param param2 - 未知参数2
   * @param param3 - 未知参数3
   * @returns 图形数据数组
   */
  getMeshsByArc(
    materialExt: MaterialExtension,
    faceGroup: FaceGroup,
    param2: unknown,
    param3: unknown
  ): GraphicsData[];

  /**
   * 根据弧线分段获取网格数据（异步）
   * @param materialExt - 材质扩展信息
   * @param faceGroup - 面组数据
   * @param param2 - 未知参数2
   * @param param3 - 未知参数3
   * @returns Promise包装的图形数据数组
   */
  getMeshsByArcAsync(
    materialExt: MaterialExtension,
    faceGroup: FaceGroup,
    param2: unknown,
    param3: unknown
  ): Promise<GraphicsData[]>;

  /**
   * 转换网格数据格式
   * @param rawMeshes - 原始网格数据数组
   * @returns 转换后的图形数据数组
   */
  convertMesh(rawMeshes: RawMeshData[]): GraphicsData[];

  /**
   * 反转网格定义（翻转法线和索引顺序）
   * @param meshDef - 网格定义
   * @private
   */
  private _reverseMeshDef(meshDef: MeshDef): void;

  /**
   * 从混合铺设配置生成网格
   * @param mixPaveConfig - 混合铺设配置
   * @param faceGroup - 面组数据
   * @returns 原始网格数据数组
   * @private
   */
  private _getMeshs(
    mixPaveConfig: MixPaveConfig,
    faceGroup: FaceGroup
  ): RawMeshData[];

  /**
   * 面组偏移预处理
   * @param faceGroup - 面组数据
   * @private
   */
  private _preFaceGroupOffset(faceGroup: FaceGroup): void;

  /**
   * 面组偏移后处理
   * @param faceGroup - 面组数据
   * @param graphicsData - 图形数据数组（可选）
   * @param rawMeshes - 原始网格数据数组（可选）
   * @private
   */
  private _endFaceGroupOffset(
    faceGroup: FaceGroup,
    graphicsData?: GraphicsData[],
    rawMeshes?: RawMeshData[]
  ): void;
}

/**
 * 导出MixPave集成类
 */
export { MixPaveIntegration };