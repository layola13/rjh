/**
 * MixPaintUtil 和 MixPaint 模块类型定义
 * 提供多边形混合绘制、网格生成和几何数据处理功能
 */

/**
 * 点坐标接口
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * ClipperLib 点坐标接口
 */
export interface ClipperPoint {
  X: number;
  Y: number;
}

/**
 * 形状定义，包含外轮廓和孔洞
 */
export interface Shape {
  /** 外轮廓点集 */
  outer: Point[] | ClipperPoint[];
  /** 孔洞点集数组 */
  holes: (Point[] | ClipperPoint[])[];
}

/**
 * 区域数据结构
 */
export interface Region {
  /** 区域唯一标识 */
  id: string | number;
  /** 形状集合 */
  shapes: Shape[];
  /** 材质信息 */
  material?: Material;
  /** 边界包围盒 */
  bound?: HSCore.Util.BrepBound;
  /** 材质边界 */
  matBound?: unknown;
  /** 铺装选项 */
  pavingOption?: PavingOption;
  /** 数据类型 */
  dataType?: string;
  /** 是否为自由块 */
  isFree?: boolean;
  /** 是否为接缝 */
  isSeam?: boolean;
  /** 是否为砖块 */
  isBrick?: boolean;
  /** 是否为区域标记 */
  isDistrict?: number;
  /** UV描述（用于接缝） */
  uvDescription?: unknown;
  /** 自由块原始材质 */
  FreeBlockOriginalMat?: unknown;
  /** 是否为平涂 */
  isFlatPaint?: boolean;
}

/**
 * 材质定义
 */
export interface Material {
  /** 纹理URI */
  textureURI: string;
  /** 法线贴图 */
  normalTexture?: string;
  /** 颜色 */
  color: string | number;
  /** 接缝宽度 */
  seamWidth?: number;
  /** 接缝颜色 */
  seamColor?: string | number;
  /** 瓷砖X方向尺寸 */
  tileSize_x: number;
  /** 瓷砖Y方向尺寸 */
  tileSize_y: number;
  /** X方向偏移 */
  offsetX: number;
  /** Y方向偏移 */
  offsetY: number;
  /** 旋转角度 */
  rotation: number;
  /** UV变换矩阵 */
  uvTransform?: THREE.Matrix3;
}

/**
 * 铺装选项
 */
export interface PavingOption {
  /** 铺装起点 */
  point: Point;
  /** 旋转角度（度） */
  rotation: number;
  /** 铺装方向数组（0/90/180/270度） */
  directions?: number[];
}

/**
 * 背景数据结构
 */
export interface BackgroundData {
  /** 外轮廓 */
  outer: Point[];
  /** 孔洞集合 */
  holes: Point[][];
}

/**
 * 多边形缓冲区参数
 */
export interface PolygonBufferParam {
  /** 所有点数据指针 */
  allPoint: number;
  /** 多边形起始索引指针 */
  polyBegin: number;
  /** 多边形ID指针 */
  polyId: number;
  /** 多边形权重指针 */
  polyPower: number;
  /** 多边形数量 */
  polyCount: number;
  /** 点数量 */
  pointCount: number;
}

/**
 * 三角化输入参数
 */
export interface TriangulateInput {
  allPoint: Float64Array;
  polyBegin: Int32Array;
  polyId: Int32Array;
  isConvex: Int32Array;
  polyCount: number;
  pointCount: number;
}

/**
 * 材质切换参数
 */
export interface MaterialSwitchParam {
  /** 材质数量 */
  materialCount: number;
  /** 偏移数量 */
  offsetCount: number;
  /** 坐标系数量 */
  coordinateCount: number;
  /** 材质索引指针 */
  materialIndex: number;
  /** 坐标索引指针 */
  coordinateIndex: number;
  /** 偏移索引指针 */
  offsetIndex: number;
  /** 坐标系指针 */
  coordinateSystem: number;
  /** 偏移指针 */
  offset: number;
}

/**
 * 网格数据
 */
export interface MeshData {
  /** 材质ID */
  materialId: number;
  /** 材质对象 */
  material: Material;
  /** UV坐标数组 */
  uvs: Float32Array;
  /** 位置坐标数组 */
  pos: Float32Array;
  /** 法线数组 */
  normal: Float32Array;
  /** 索引数组 */
  index: Uint32Array;
  /** 三角形数量 */
  triCount: number;
  /** 位置数量 */
  posCount: number;
  /** UV维度 */
  uvDim: number;
  /** 位置维度 */
  posDim: number;
  /** 上边界 */
  top: number;
  /** 左边界 */
  left: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 数据类型 */
  dataType: string | null;
}

/**
 * 几何数据
 */
export interface GeometryData {
  /** 几何体 */
  g: THREE.BufferGeometry;
  /** 材质 */
  material: Material;
  /** 边界 */
  bound: HSCore.Util.BrepBound;
  /** 包围盒 */
  box: Record<string, unknown>;
}

/**
 * 图形数据
 */
export interface GraphicsData {
  /** 网格定义 */
  meshDef: unknown;
  /** 材质 */
  material: Material;
  /** 边界 */
  bound: HSCore.Util.BrepBound;
  /** ID */
  id: string | number;
  /** 数据类型 */
  dataType?: string;
  /** 轮廓线 */
  outlines?: unknown;
}

/**
 * 表面数据
 */
export interface SurfaceData {
  /** 绘制数据数组 */
  paints: Region[];
}

/**
 * 网格生成结果
 */
export interface MeshResult {
  /** 是否成功 */
  success: boolean;
  /** 网格数据数组 */
  meshs: MeshData[];
}

/**
 * 多边形缓冲区管理类
 * 使用WASM进行高性能多边形运算
 */
export declare class PolygonBuffer {
  /** WASM库实例 */
  static lib: any;

  private _ptrAllPoint: number;
  private _ptrPolyBegin: number;
  private _ptrPolyId: number;
  private _ptrPolyPower: number;
  private _polyLenght: number;
  private _pointLenght: number;

  /** 所有点数据 */
  allPoint: Float64Array;
  /** 多边形起始索引 */
  polyBegin: Int32Array;
  /** 多边形ID */
  polyId: Int32Array;
  /** 多边形权重 */
  polyPower: Int32Array;
  /** 多边形数量 */
  polyCount: number;
  /** 点数量 */
  pointCount: number;

  /**
   * 构造函数
   * @param maxPolygons 最大多边形数量，默认100
   * @param maxPoints 最大点数量，默认100
   */
  constructor(maxPolygons?: number, maxPoints?: number);

  /**
   * 清空缓冲区
   */
  clear(): void;

  /**
   * 重新创建类型化数组视图
   */
  reMake(): void;

  /**
   * 释放内存
   */
  release(): void;

  /**
   * 添加多边形
   * @param points 点集
   * @param id 多边形ID
   * @param power 权重
   */
  push(points: Point[], id: number, power: number): void;

  /**
   * 生成参数对象
   * @returns 多边形缓冲区参数
   */
  makeParam(): PolygonBufferParam;

  /**
   * 图层合并
   * @param otherBuffer 另一个缓冲区
   * @returns 合并结果
   */
  bufferLayerMerge(otherBuffer: PolygonBufferParam): any;

  /**
   * 创建材质切换参数
   * @param config 材质配置
   * @returns 材质切换参数
   */
  creatrMaterialSwitch(config: {
    materialCount: number;
    offsetCount: number;
    coordinateCount: number;
    materialIndex: number[];
    coordinateIndex: number[];
    offsetIndex: number[];
    coordinateSystem: number[];
    offset: number[];
  }): MaterialSwitchParam;

  /**
   * 创建网格
   * @param contourParam 轮廓参数
   * @param materialSwitch 材质切换参数
   * @param materials 材质数组
   * @returns 网格数据数组
   */
  createMesh(
    contourParam: PolygonBufferParam,
    materialSwitch: MaterialSwitchParam,
    materials: Material[]
  ): MeshData[];

  /**
   * 三角化多边形
   * @param input 三角化输入
   * @returns 三角化结果
   */
  bufferTriangulate(input: TriangulateInput): any;
}

/**
 * 混合绘制工具类
 * 提供形状简化、几何数据转换、曲线离散化等功能
 */
export declare class MixPaintUtil {
  /**
   * 简化形状，去除自相交
   * @param accumulator 累加器数组
   * @param shape 待简化的形状
   * @returns 简化后的形状数组
   */
  static simplifyShape(accumulator: Shape[], shape: Shape): Shape[];

  /**
   * 简化区域数据
   * @param regions 区域数组
   * @returns 简化后的区域数组
   */
  static simplify(regions: Region[]): Region[];

  /**
   * 转换为几何数据
   * @param regions 区域数组
   * @param options 选项（如absoluteuv）
   * @returns 几何数据数组
   */
  static toGeometryData(
    regions: Region[],
    options?: { absoluteuv?: boolean }
  ): Array<{
    id: string | number;
    buffer: THREE.BufferGeometry;
    material: Material;
    bound: HSCore.Util.BrepBound;
    dataType?: string;
    outlines?: unknown;
  }>;

  /**
   * 离散化贝塞尔曲线
   * @param curveCommand 曲线命令（SVG路径格式）
   * @param startPoint 起点
   * @param tolerance 容差，默认0.0001
   * @returns 离散点数组
   */
  static discretizeCurve(
    curveCommand: any[],
    startPoint: Point,
    tolerance?: number
  ): Array<Point & { t: number }>;

  /**
   * 计算铺装方向
   * @param region 区域数据
   * @returns 有效铺装方向数组（0/90/180/270度）
   */
  static calculatePavingDirections(region: Region): number[];

  /**
   * 多边形树求交
   * @param target 目标区域
   * @param clipRegions 裁剪区域数组
   * @returns 求交后的区域
   */
  static intersectPolyTree(target: Region, clipRegions: Region[]): Region;
}

/**
 * 混合绘制主类
 * 处理多区域绘制、网格生成和几何转换
 */
export declare class MixPaint {
  /** 轮廓缓冲区（静态共享） */
  static contourBuffer: PolygonBuffer | null;
  /** 多边形缓冲区（静态共享） */
  static polygonBuffer: PolygonBuffer | null;

  private _options: unknown;
  private _inputData: {
    regions: Region[];
    bg?: Region;
    bound?: HSCore.Util.BrepBound;
    holes: Point[][];
  };
  private _background?: BackgroundData;
  private _result?: Array<{ origin: Region; resultShapes: Shape[] }>;

  /**
   * 构造函数
   * @param regions 区域数据数组
   * @param background 背景数据
   * @param options 选项配置
   */
  constructor(
    regions: unknown,
    background?: BackgroundData,
    options?: unknown
  );

  /**
   * 转换为几何数据（用于渲染）
   * @returns 几何数据数组
   */
  toGeometryData(): GeometryData[];

  /**
   * 转换为图形数据
   * @returns 图形数据数组
   */
  toGraphicsData(): GraphicsData[];

  /**
   * 获取表面数据
   * @param options 选项（如pavingDirection）
   * @returns 表面数据
   */
  getSurfaceData(options?: { pavingDirection?: boolean }): SurfaceData | undefined;

  /**
   * 使用WASM进行计算
   * @returns 是否计算成功
   */
  private _calculateInWasm(): boolean;

  /**
   * 生成网格（WASM加速）
   * @returns 网格生成结果
   */
  toMesh(): MeshResult;

  /**
   * 执行计算
   * @returns 是否计算成功
   */
  private _calculate(): boolean;

  /**
   * 裁剪多边形树
   * @param target 目标区域
   * @param allRegions 所有区域
   * @param startIndex 起始索引
   * @param holes 孔洞数组
   * @returns 裁剪后的区域
   */
  private _cropPolyTree(
    target: { origin: Region; shapes: Shape[]; resultShapes: Shape[] },
    allRegions: Array<{ origin: Region; shapes: Shape[] }>,
    startIndex: number,
    holes: ClipperPoint[][]
  ): { origin: Region; shapes: Shape[]; resultShapes: Shape[] };

  /**
   * 获取拼花绘制数据
   * @param data 输入数据
   * @returns 拼花绘制数据
   */
  getPinhuaPaintData(data: unknown): unknown;
}

export { MixPaintUtil, MixPaint };