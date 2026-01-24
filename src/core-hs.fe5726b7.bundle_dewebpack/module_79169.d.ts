/**
 * 几何图形裁剪和多边形操作工具库
 * 提供多边形裁剪、偏移、形态学运算等功能
 */

/**
 * 二维点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 多边形面对象，包含外轮廓和内孔
 */
interface ClipFace {
  /** 外轮廓顶点数组 */
  outer: Point2D[];
  /** 内孔顶点数组集合 */
  holes?: Point2D[][];
}

/**
 * 多边形边界框信息
 */
interface PolygonBound {
  /** X轴最大值 */
  maxx: number;
  /** Y轴最大值 */
  maxy: number;
  /** X轴最小值 */
  minx: number;
  /** Y轴最小值 */
  miny: number;
  /** 边界框长度（X轴跨度） */
  length: number;
  /** 边界框宽度（Y轴跨度） */
  width: number;
  /** 边界框中心点 */
  center: typeof THREE.Vector2.prototype;
}

/**
 * 矩形边界框接口
 */
interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
  clone(): BoundingBox;
}

/**
 * 多边形偏移选项
 */
interface OffsetOptions {
  /** 连接类型 */
  joinType?: number;
  /** 其他Clipper库支持的选项 */
  [key: string]: unknown;
}

/**
 * 裁剪操作选项
 */
interface ClipOptions {
  /** 裁剪操作类型（并集、差集、交集、异或） */
  operation?: number;
  /** 主体填充类型 */
  subject_fillType?: number;
  /** 裁剪对象填充类型 */
  clip_fillType?: number;
}

/**
 * SAT碰撞检测响应对象
 */
interface SATResponse {
  /** 是否相交 */
  overlap: number;
  /** 重叠向量 */
  overlapV: unknown;
  /** 其他SAT库返回的属性 */
  [key: string]: unknown;
}

/**
 * 几何裁剪工具对象
 */
export interface GeometryClipperUtil {
  /**
   * 裁剪操作类型枚举
   */
  readonly ClipType: {
    /** 并集 */
    readonly union: 0;
    /** 差集 */
    readonly diff: 1;
    /** 交集 */
    readonly inter: 2;
    /** 异或 */
    readonly xor: 3;
  };

  /**
   * 多边形填充类型枚举
   */
  readonly PolyFillType: {
    /** 奇偶填充规则 */
    readonly evenOdd: 0;
    /** 非零填充规则 */
    readonly nonZero: 1;
    /** 正数填充规则 */
    readonly positive: 2;
    /** 负数填充规则 */
    readonly negative: 3;
  };

  /**
   * 偏移连接类型枚举
   */
  readonly JoinType: {
    /** 斜接 */
    readonly miter: 0;
    /** 方形 */
    readonly square: 1;
    /** 圆角 */
    readonly round: 2;
  };

  /**
   * 路径端点类型枚举
   */
  readonly EndType: {
    /** 开放路径方形端点 */
    readonly openSquare: 0;
    /** 开放路径圆形端点 */
    readonly openRound: 1;
    /** 开放路径平头端点 */
    readonly openButt: 2;
    /** 封闭线条 */
    readonly closedLine: 3;
    /** 封闭多边形 */
    readonly closedPolygon: 4;
  };

  /**
   * 检测两个多边形轮廓是否相交（基于SAT算法）
   * @param polygonA - 多边形A的顶点数组
   * @param polygonB - 多边形B的顶点数组
   * @param response - 可选的响应对象，用于接收碰撞详细信息
   * @returns 是否相交
   */
  outlineIntersect(
    polygonA: Point2D[],
    polygonB: Point2D[],
    response?: SATResponse
  ): boolean;

  /**
   * 扩展边界框
   * @param bounds - 原始边界框
   * @param expandDistance - 扩展距离
   * @returns 扩展后的边界框
   */
  boundExpand(bounds: BoundingBox, expandDistance: number): BoundingBox;

  /**
   * AABB（轴对齐包围盒）相交检测
   * @param boundsA - 边界框A
   * @param boundsB - 边界框B
   * @param tolerance - 容差值（默认为0）
   * @returns 是否相交
   */
  AABBIntersect(
    boundsA: BoundingBox,
    boundsB: BoundingBox,
    tolerance?: number
  ): boolean;

  /**
   * 形态学开运算（先腐蚀后膨胀）
   * 用于消除小的突起和噪点
   * @param polygons - 多边形顶点数组的数组
   * @param distance - 腐蚀/膨胀距离
   * @returns 处理后的多边形数组
   */
  MorphologicalOpeningPolygon(
    polygons: Point2D[][],
    distance: number
  ): Point2D[][];

  /**
   * 形态学闭运算（先膨胀后腐蚀）
   * 用于填充小的孔洞和缝隙
   * @param polygons - 多边形顶点数组的数组
   * @param distance - 膨胀/腐蚀距离
   * @returns 处理后的多边形数组
   */
  MorphologicalClosingPolygon(
    polygons: Point2D[][],
    distance: number
  ): Point2D[][];

  /**
   * 修复多边形（腐蚀后膨胀，用于平滑和修复）
   * @param polygons - 多边形顶点数组的数组
   * @param distance - 腐蚀/膨胀距离
   * @param options - 偏移选项
   * @returns 修复后的多边形数组
   */
  FixPolygon(
    polygons: Point2D[][],
    distance: number,
    options?: OffsetOptions
  ): Point2D[][];

  /**
   * 清理多边形，移除过小的顶点和简化形状
   * @param polygons - 多边形顶点数组的数组
   * @param tolerance - 清理容差
   * @returns 清理后的多边形数组
   */
  CleanPolygons(polygons: Point2D[][], tolerance: number): Point2D[][];

  /**
   * 获取多边形的边界框信息
   * @param polygon - 多边形顶点数组
   * @returns 边界框信息对象
   */
  getPolygonBound(polygon: Point2D[]): PolygonBound;

  /**
   * 裁剪面对象数组
   * @param subjectFaces - 主体面数组
   * @param clipFaces - 裁剪面数组
   * @param options - 裁剪选项
   * @returns 裁剪后的面数组
   */
  ClipFaces(
    subjectFaces: ClipFace[],
    clipFaces: ClipFace[],
    options?: ClipOptions
  ): ClipFace[];

  /**
   * 合并多个多边形为一个
   * @param polygons - 多边形顶点数组的数组
   * @returns 合并后的面数组
   */
  CombinePolygons(polygons: Point2D[][]): ClipFace[];

  /**
   * 计算多边形面积
   * @param polygon - 多边形顶点数组
   * @returns 面积值
   */
  getPolygonArea(polygon: Point2D[]): number;

  /**
   * 计算两个面的重叠面积
   * @param faceA - 面对象A
   * @param faceB - 面对象B
   * @returns 重叠面积（绝对值）
   */
  overlapArea(faceA: ClipFace, faceB: ClipFace): number;

  /**
   * 计算裁剪后面数组的总面积
   * @param faces - 面对象数组
   * @returns 总面积
   */
  getClipFacesArea(faces: ClipFace[]): number;

  /**
   * 多边形偏移操作（内部方法，需要外部实现）
   * @param polygons - 多边形顶点数组的数组
   * @param offset - 偏移距离
   * @param options - 偏移选项
   * @returns 偏移后的多边形数组
   */
  offsetPolygons?(
    polygons: Point2D[][],
    offset: number,
    options?: OffsetOptions
  ): Point2D[][];

  /**
   * 多边形裁剪操作（内部方法，需要外部实现）
   * @param subjectPolygons - 主体多边形数组
   * @param clipPolygons - 裁剪多边形数组
   * @param options - 裁剪选项
   * @returns 裁剪后的面数组
   */
  ClipPolygon2?(
    subjectPolygons: Point2D[][],
    clipPolygons: Point2D[][],
    options?: ClipOptions
  ): ClipFace[];
}

/**
 * 导出的几何裁剪工具实例
 */
export declare const GeometryClipper: GeometryClipperUtil;