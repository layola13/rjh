/**
 * libtess.js - OpenGL Tessellation Library (GLU) JavaScript Port
 * 提供多边形三角剖分功能
 */

/** 2D坐标点 */
interface Point2D {
  /** x坐标 (通常表示为 a) */
  a: number;
  /** y坐标 (通常表示为 b) */
  b: number;
}

/** 3D坐标点数据 */
type Coordinate3D = [number, number, number];

/** 顶点权重数组 */
type VertexWeights = [number, number, number, number];

/** 缠绕规则枚举 */
export enum WindingRule {
  /** 奇偶规则 */
  GLU_TESS_WINDING_ODD = 100130,
  /** 非零规则 */
  GLU_TESS_WINDING_NONZERO = 100131,
  /** 正数规则 */
  GLU_TESS_WINDING_POSITIVE = 100132,
  /** 负数规则 */
  GLU_TESS_WINDING_NEGATIVE = 100133,
  /** 绝对值大于等于2规则 */
  GLU_TESS_WINDING_ABS_GEQ_TWO = 100134
}

/** 图元类型枚举 */
export enum PrimitiveType {
  /** 线环 */
  GL_LINE_LOOP = 2,
  /** 三角形 */
  GL_TRIANGLES = 4,
  /** 三角形带 */
  GL_TRIANGLE_STRIP = 5,
  /** 三角形扇 */
  GL_TRIANGLE_FAN = 6
}

/** 错误类型枚举 */
export enum ErrorType {
  /** 缺少开始多边形 */
  GLU_TESS_MISSING_BEGIN_POLYGON = 100151,
  /** 缺少结束多边形 */
  GLU_TESS_MISSING_END_POLYGON = 100153,
  /** 缺少开始轮廓 */
  GLU_TESS_MISSING_BEGIN_CONTOUR = 100152,
  /** 缺少结束轮廓 */
  GLU_TESS_MISSING_END_CONTOUR = 100154,
  /** 坐标值过大 */
  GLU_TESS_COORD_TOO_LARGE = 100155,
  /** 需要combine回调 */
  GLU_TESS_NEED_COMBINE_CALLBACK = 100156
}

/** GLU枚举常量 */
export enum GluEnum {
  /** 网格模式 */
  GLU_TESS_MESH = 100112,
  /** 容差 */
  GLU_TESS_TOLERANCE = 100142,
  /** 缠绕规则 */
  GLU_TESS_WINDING_RULE = 100140,
  /** 仅边界 */
  GLU_TESS_BOUNDARY_ONLY = 100141,
  /** 无效枚举 */
  GLU_INVALID_ENUM = 100900,
  /** 无效值 */
  GLU_INVALID_VALUE = 100901,
  /** 开始回调 */
  GLU_TESS_BEGIN = 100100,
  /** 顶点回调 */
  GLU_TESS_VERTEX = 100101,
  /** 结束回调 */
  GLU_TESS_END = 100102,
  /** 错误回调 */
  GLU_TESS_ERROR = 100103,
  /** 边标志回调 */
  GLU_TESS_EDGE_FLAG = 100104,
  /** 合并回调 */
  GLU_TESS_COMBINE = 100105,
  /** 开始回调(带数据) */
  GLU_TESS_BEGIN_DATA = 100106,
  /** 顶点回调(带数据) */
  GLU_TESS_VERTEX_DATA = 100107,
  /** 结束回调(带数据) */
  GLU_TESS_END_DATA = 100108,
  /** 错误回调(带数据) */
  GLU_TESS_ERROR_DATA = 100109,
  /** 边标志回调(带数据) */
  GLU_TESS_EDGE_FLAG_DATA = 100110,
  /** 合并回调(带数据) */
  GLU_TESS_COMBINE_DATA = 100111
}

/** 回调函数类型定义 */
type BeginCallback = (primitiveType: PrimitiveType, userData?: unknown) => void;
type VertexCallback = (vertexData: unknown, userData?: unknown) => void;
type EndCallback = (userData?: unknown) => void;
type ErrorCallback = (errorType: ErrorType, userData?: unknown) => void;
type EdgeFlagCallback = (isEdge: boolean, userData?: unknown) => void;
type CombineCallback = (
  coordinates: Coordinate3D,
  vertexData: unknown[],
  weights: VertexWeights,
  userData?: unknown
) => unknown;

/**
 * GLU镶嵌器(Tessellator)主类
 * 用于将复杂多边形分解为简单三角形
 */
export class GluTesselator {
  /** 当前状态 */
  private d: number;
  
  /** 网格数据结构 */
  private b: Mesh | null;
  
  /** 当前顶点 */
  private q: HalfEdge | null;
  
  /** 法向量 */
  private j: Coordinate3D;
  
  /** 缠绕规则 */
  private s: WindingRule;
  
  /** 是否仅输出边界 */
  private m: boolean;
  
  /** 是否发生错误 */
  private n: boolean;
  
  /** 用户数据 */
  private c: unknown;
  
  /** 各种回调函数 */
  private h: BeginCallback | null;
  private l: EdgeFlagCallback | null;
  private k: VertexCallback | null;
  private i: EndCallback | null;
  private p: ErrorCallback | null;
  private o: CombineCallback | null;
  private r: ((mesh: Mesh) => void) | null;

  constructor();

  /**
   * 删除镶嵌器并清理资源
   */
  gluDeleteTess(): void;

  /**
   * 设置镶嵌器属性
   * @param property - 属性类型
   * @param value - 属性值
   */
  gluTessProperty(property: GluEnum, value: number | boolean): void;

  /**
   * 获取镶嵌器属性值
   * @param property - 属性类型
   * @returns 属性值
   */
  gluGetTessProperty(property: GluEnum): number | boolean;

  /**
   * 设置多边形法向量
   * @param x - X分量
   * @param y - Y分量
   * @param z - Z分量
   */
  gluTessNormal(x: number, y: number, z: number): void;

  /**
   * 设置回调函数
   * @param callbackType - 回调类型
   * @param callback - 回调函数
   */
  gluTessCallback(
    callbackType: GluEnum,
    callback: BeginCallback | VertexCallback | EndCallback | ErrorCallback | EdgeFlagCallback | CombineCallback | null
  ): void;

  /**
   * 添加顶点到当前轮廓
   * @param coordinates - 顶点坐标[x, y, z]
   * @param data - 与顶点关联的用户数据
   */
  gluTessVertex(coordinates: Coordinate3D, data: unknown): void;

  /**
   * 开始新的多边形定义
   * @param userData - 传递给回调的用户数据
   */
  gluTessBeginPolygon(userData?: unknown): void;

  /**
   * 开始新的轮廓定义
   */
  gluTessBeginContour(): void;

  /**
   * 结束当前轮廓定义
   */
  gluTessEndContour(): void;

  /**
   * 结束多边形定义并执行镶嵌
   */
  gluTessEndPolygon(): void;
}

/**
 * 网格数据结构
 * 存储半边、顶点、面的拓扑信息
 */
declare class Mesh {
  /** 顶点链表 */
  c: Vertex;
  /** 面链表 */
  a: Face;
  /** 边链表 */
  b: HalfEdge;
  /** 双向边链表 */
  d: HalfEdge;

  constructor();
}

/**
 * 半边数据结构
 * 表示有向边
 */
declare class HalfEdge {
  /** 对偶半边 */
  b: HalfEdge;
  /** 下一条半边 */
  e: HalfEdge;
  /** 起点顶点 */
  a: Vertex;
  /** 所属面 */
  d: Face;
  /** 前驱半边 */
  c: HalfEdge;
  /** 循环中的下一条边 */
  h: HalfEdge;
  /** 面积贡献值 */
  f: number;

  constructor();
}

/**
 * 顶点数据结构
 */
declare class Vertex {
  /** 下一个顶点 */
  e: Vertex;
  /** 前一个顶点 */
  f: Vertex;
  /** 关联的半边 */
  a: HalfEdge | null;
  /** 3D坐标 */
  g: Coordinate3D;
  /** 用户数据 */
  d: unknown;
  /** 2D投影坐标(用于镶嵌) */
  b: number;
  a: number;
  /** 优先队列索引 */
  h: number;

  constructor(edge?: HalfEdge, next?: Vertex);
}

/**
 * 面数据结构
 */
declare class Face {
  /** 下一个面 */
  b: Face;
  /** 前一个面 */
  d: Face;
  /** 关联的半边 */
  a: HalfEdge | null;
  /** 是否为内部面 */
  c: boolean;

  constructor(edge?: HalfEdge, next?: Face);
}

/**
 * 优先队列
 * 用于扫描线算法的事件排序
 */
declare class PriorityQueue {
  /** 堆数组索引 */
  d: number[];
  /** 元素数组 */
  e: (Vertex | null)[];
  /** 反向索引 */
  c: number[];
  /** 当前元素数量 */
  a: number;
  /** 容量 */
  f: number;
  /** 空闲链表头 */
  b: number;
  /** 是否已初始化堆 */
  h: boolean;

  constructor();
}

/**
 * 活动边表节点
 */
declare class ActiveRegion {
  /** 关联的半边 */
  a: HalfEdge;
  /** 扫描线树节点 */
  e: TreeNode;
  /** 累计面积 */
  f: number;
  /** 是否固定 */
  c: boolean;
  /** 是否为内部 */
  b: boolean;
  /** 是否为边界边 */
  h: boolean;
  /** 是否脏(需要重新计算) */
  d: boolean;

  constructor();
}

/**
 * 二叉搜索树节点
 * 用于维护活动边表
 */
declare class TreeNode {
  /** 节点数据 */
  b: ActiveRegion | null;
  /** 左子节点 */
  a: TreeNode;
  /** 右子节点 */
  c: TreeNode;

  constructor(data?: ActiveRegion | null, left?: TreeNode, right?: TreeNode);
}

/**
 * libtess命名空间导出
 */
export interface LibtessExports {
  GluTesselator: typeof GluTesselator;
  windingRule: typeof WindingRule;
  primitiveType: typeof PrimitiveType;
  errorType: typeof ErrorType;
  gluEnum: typeof GluEnum;
}

declare const libtess: LibtessExports;
export default libtess;