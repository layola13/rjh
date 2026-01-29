/**
 * 2D草图数据处理工具类
 * 提供草图数据的克隆、查询、转换等核心功能
 */
declare class ExtraordinarySketch2d {
  /**
   * 深度克隆草图数据
   * 复制背景区域、参考线、面及其拓扑关系，确保所有引用独立
   * 
   * @param sketchData - 原始草图数据对象
   * @returns 克隆后的草图数据，包含独立的背景、参考线和面集合
   */
  static cloneSketchData(sketchData: SketchData): ClonedSketchData;

  /**
   * 获取指定边所属的所有面及其所在环
   * 
   * @param edge - 目标边对象
   * @param sketchData - 草图数据
   * @returns 包含面、所在环及是否为外环标识的数组
   */
  static getSketchFacesByEdge(
    edge: HSCore.Model.ExtraordinaryEdge,
    sketchData: SketchData
  ): Array<{
    face: HSCore.Model.ExtraordinaryFace2d;
    wire: HSCore.Model.ExtraordinaryWire;
    isOuter: boolean;
  }>;

  /**
   * 提取草图中所有特征参考点
   * 包括端点、中点、圆心、象限点等，用于捕捉和标注
   * 
   * @param sketchData - 草图数据
   * @returns 带类型标注的点集合（端点、中点、圆心等）
   */
  static getReferencePoints(sketchData: SketchData): Array<ReferencePoint>;

  /**
   * 计算点在多边形内部时，四个方向上的最近边界点
   * 用于智能标注和尺寸放置
   * 
   * @param point - 目标点坐标
   * @param outerBoundary - 外边界曲线数组
   * @param innerBoundaries - 内边界曲线数组集合
   * @returns 左、右、上、下四个方向的最近边界点
   */
  static getPointsDimenionsInSidePolygon(
    point: Point2D,
    outerBoundary: Array<HSCore.Math.Curve2d>,
    innerBoundaries: Array<Array<HSCore.Math.Curve2d>>
  ): {
    left?: Point2D;
    right?: Point2D;
    top?: Point2D;
    bottom?: Point2D;
  };

  /**
   * 提取草图数据中所有曲线的数学表示
   * 
   * @param sketchData - 草图数据
   * @returns 数学曲线对象数组
   */
  static getAllCurvesFromSketchData(
    sketchData: SketchData
  ): Array<HSCore.Math.Curve2d>;

  /**
   * 从面集合中提取所有唯一的边
   * 
   * @param faces - 面对象数组
   * @param outerLoopOnly - 是否仅提取外环的边（默认false，包含内环）
   * @returns 去重后的边数组
   */
  static getAllEdgesFromFaces(
    faces: Array<HSCore.Model.ExtraordinaryFace2d>,
    outerLoopOnly?: boolean
  ): Array<HSCore.Model.ExtraordinaryEdge>;

  /**
   * 从草图数据中提取所有边
   * 
   * @param sketchData - 草图数据
   * @returns 所有边的数组
   */
  static getAllEdgesFromSketchData(
    sketchData: SketchData
  ): Array<HSCore.Model.ExtraordinaryEdge>;

  /**
   * 查找包含指定点集的所有边
   * 使用长度容差判定点是否在曲线上
   * 
   * @param sketchData - 草图数据
   * @param points - 目标点集合
   * @returns 包含任一指定点的边数组
   */
  static getAllEdgesByPoints(
    sketchData: SketchData,
    points: Array<Point2D>
  ): Array<HSCore.Model.ExtraordinaryEdge>;

  /**
   * 获取与指定点连接的所有边
   * 仅适用于线段和圆弧（有明确端点的曲线）
   * 
   * @param sketchData - 草图数据
   * @param point - 目标点对象
   * @returns 以该点为端点的边数组
   */
  static getConnectedEdgesByExPoint(
    sketchData: SketchData,
    point: HSCore.Model.ExtraordinaryPoint2d
  ): Array<HSCore.Model.ExtraordinaryEdge>;

  /**
   * 从面集合中提取所有唯一的端点
   * 
   * @param faces - 面对象数组
   * @param outerLoopOnly - 是否仅提取外环的点（默认false）
   * @returns 去重后的点数组
   */
  static getAllPointsFromFaces(
    faces: Array<HSCore.Model.ExtraordinaryFace2d>,
    outerLoopOnly?: boolean
  ): Array<HSCore.Model.ExtraordinaryPoint2d>;

  /**
   * 从边集合中提取所有端点
   * 
   * @param edges - 边对象数组
   * @returns 去重后的点数组
   */
  static getAllPointsFromEdges(
    edges: Array<HSCore.Model.ExtraordinaryEdge>
  ): Array<HSCore.Model.ExtraordinaryPoint2d>;

  /**
   * 从草图数据中提取所有点
   * 
   * @param sketchData - 草图数据
   * @returns 所有点的数组
   */
  static getAllPointsFromSketchData(
    sketchData: SketchData
  ): Array<HSCore.Model.ExtraordinaryPoint2d>;

  /**
   * 根据矢高计算圆弧的圆心位置
   * 使用弦长、矢高和方向向量计算
   * 
   * @param startPoint - 圆弧起点
   * @param endPoint - 圆弧终点
   * @param sagitta - 矢高（弦中点到圆弧的距离）
   * @param direction - 方向向量（确定凸侧）
   * @returns 计算得到的圆心坐标
   */
  static getCircleArcCenterBySagitta(
    startPoint: Point2D,
    endPoint: Point2D,
    sagitta: number,
    direction: Vector2D
  ): Point2D;

  /**
   * 克隆线段类型的边
   * 创建新的点对象和线段对象
   * 
   * @param edge - 原始边对象（必须为线段类型）
   * @returns 克隆的边对象，若输入非线段则返回undefined
   */
  static cloneExLine2dEdge(
    edge: HSCore.Model.ExtraordinaryEdge
  ): HSCore.Model.ExtraordinaryEdge | undefined;

  /**
   * 根据新边集合更新背景区域定义
   * 处理边的替换、拆分和方向调整，维护区域拓扑一致性
   * 
   * @param originalEdges - 原始边集合
   * @param replacementEdges - 替换后的边集合（可能包含映射关系）
   * @param background - 原始背景对象
   * @returns 更新后的背景对象
   */
  static changeBackgroundByEdges(
    originalEdges: Array<HSCore.Model.ExtraordinaryEdge>,
    replacementEdges: Array<{ id: string; curve: HSCore.Math.Curve2d }>,
    background: HSCore.Model.ExtraordinaryBackground
  ): HSCore.Model.ExtraordinaryBackground;
}

/**
 * 2D点坐标
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 2D向量
 */
interface Vector2D {
  x: number;
  y: number;
}

/**
 * 带类型标识的参考点
 */
interface ReferencePoint extends Point2D {
  /** 点类型：端点、中点、圆心、象限点等 */
  type: string;
}

/**
 * 草图数据结构
 */
interface SketchData {
  /** 背景区域定义 */
  background: HSCore.Model.ExtraordinaryBackground;
  /** 参考线集合 */
  guidelines: Array<HSCore.Model.ExtraordinaryGuideline>;
  /** 面集合 */
  faces: Array<HSCore.Model.ExtraordinaryFace2d>;
}

/**
 * 克隆后的草图数据
 */
interface ClonedSketchData {
  background: HSCore.Model.ExtraordinaryBackground;
  guidelines: Array<HSCore.Model.ExtraordinaryGuideline>;
  faces: Array<HSCore.Model.ExtraordinaryFace2d>;
}

export { ExtraordinarySketch2d };