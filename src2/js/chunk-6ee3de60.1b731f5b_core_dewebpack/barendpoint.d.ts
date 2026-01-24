/**
 * 端点分割方式枚举
 */
export enum EndpointSplitWay {
  /** 不分割 */
  None = 0,
  /** 贯通分割 */
  Through = 1,
  /** 左侧或顶部连接 */
  LeftOrTopJoin = 2,
  /** 右侧或底部连接 */
  RightOrBottomJoin = 3
}

/**
 * 停靠位置类型
 */
export interface Dock {
  type: string;
  offset?: number;
}

/**
 * 多边形ID标识
 */
export interface PolyId {
  /** 索引 */
  idx: number;
  /** 位置 */
  pos: number;
}

/**
 * 形状类型枚举
 */
export enum ShapeType {
  Frame = 'frame',
  Sash = 'sash',
  Mullion = 'mullion'
}

/**
 * 多边形形状基类
 */
export interface MulShape {
  /** 起点 */
  start: Point;
  /** 终点 */
  end: Point;
}

/**
 * 线段类型
 */
export interface Segment extends MulShape {
  type: 'segment';
}

/**
 * 圆弧类型
 */
export interface Arc extends MulShape {
  type: 'arc';
  radius: number;
}

/**
 * 多边形对象
 */
export interface Polygon {
  /** 多边形ID */
  polyId: PolyId;
  /** 多边形形状 */
  mulShape: MulShape | Segment | Arc;
  /** 边集合 */
  edges: Edge[];
  
  /**
   * 克隆并使用新边集合
   * @param edges 新的边集合
   */
  cloneWith(edges: Edge[]): Polygon;
  
  /**
   * 更新多边形形状
   * @param newPoint 新点
   * @param controlPoint 控制点
   */
  updateMulShape(newPoint: Point, controlPoint: Point): void;
}

/**
 * 边对象
 */
export interface Edge {
  start: Point;
  end: Point;
}

/**
 * 点坐标
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 端点停靠配置
 */
export interface EndpointDock {
  /**
   * 设置停靠位置
   * @param isStart 是否为起点
   * @param dock 停靠配置
   */
  setDock(isStart: boolean, dock: Dock): void;
}

/**
 * 条形对象（框条、扇条、中梃等）
 */
export interface Bar {
  /** 多边形数据 */
  polygon: Polygon;
  /** 所属位置类型 */
  where: ShapeType;
  /** 端点停靠配置 */
  epDock: EndpointDock;
  /** 父容器 */
  parent: Container;
  
  /**
   * 更新多边形数据
   * @param polygon 新的多边形
   */
  updatePoly(polygon: Polygon): void;
  
  /**
   * 绘制到视图
   * @param view 视图对象
   */
  draw(view: View): void;
}

/**
 * 容器接口（可包含子元素）
 */
export interface Container {
  /** 容器类型 */
  type: ShapeType;
  /** 子元素集合 */
  children: Array<Bar | Container>;
  
  /**
   * 添加子元素
   * @param child 子元素
   */
  add(child: Bar | Container): void;
  
  /**
   * 绘制容器及其子元素
   * @param view 视图对象
   */
  draw(view: View): void;
}

/**
 * 分割线端点配置
 */
export interface SplitterEndpoint {
  /** 分割方式 */
  split: EndpointSplitWay;
  /** 是否固定 */
  fixed: boolean;
  /** 是否为钢塑 */
  steel: boolean;
}

/**
 * 分割线对象
 */
export interface SplitterLine {
  /** 起点配置 */
  start: SplitterEndpoint;
  /** 终点配置 */
  end: SplitterEndpoint;
}

/**
 * 分割器对象
 */
export interface Splitter {
  /** 分割线集合 */
  lines: SplitterLine[];
  /** 分割线轮廓尺寸 */
  lineProfileSizes: number[];
}

/**
 * 中梃管理器
 */
export interface MullionManager {
  /** 中梃条集合 */
  bars: Bar[];
  /** 分割器 */
  splitter: Splitter;
  /** 宿主对象 */
  host: FrameHost;
  
  /**
   * 设置分割操作
   * @param lineIndex 线索引
   * @param isStart 是否为起点
   * @param splitWay 分割方式
   */
  setSplitOperator(lineIndex: number, isStart: boolean, splitWay: EndpointSplitWay): void;
  
  /**
   * 刷新中梃机器人（自动调整）
   * @param view 视图对象
   * @param bar 目标条
   */
  refreshMullionRobot(view: View, bar: Bar): void;
}

/**
 * 框架管理器
 */
export interface FrameManager {
  /**
   * 获取边缘宽度
   * @param polyIdIndex 多边形ID索引
   */
  getEdgeWidth(polyIdIndex: number): number;
}

/**
 * 框架宿主对象
 */
export interface FrameHost {
  /**
   * 更新框架
   * @param refresh 是否刷新
   */
  updateFrame(refresh: boolean): void;
  
  /**
   * 绘制到视图
   * @param view 视图对象
   */
  draw(view: View): void;
}

/**
 * 图层对象
 */
export interface Layer {
  /**
   * 批量绘制
   */
  batchDraw(): void;
}

/**
 * 历史记录管理器
 */
export interface MomentoManager {
  /**
   * 创建检查点（用于撤销/重做）
   */
  checkPoint(): void;
}

/**
 * 视图对象
 */
export interface View {
  /** 活动图层 */
  activeLayer: Layer;
  /** 历史记录管理器 */
  mometoManager: MomentoManager;
  
  /**
   * 刷新视图
   */
  refresh(): void;
}

/**
 * 框架对象
 */
export interface Frame extends Container {
  /** 视图引用 */
  view: View;
  /** 中梃管理器 */
  mulManager: MullionManager;
  /** 框架管理器 */
  frameManager: FrameManager;
}

/**
 * 分割结果
 */
export interface SplitResult {
  /** 新的边集合 */
  nedges: Edge[];
  /** 新的点 */
  npt: Point;
  /** 新的条多边形集合 */
  nbPoly: Polygon[];
}

/**
 * 条分割操作类
 */
declare class SplitBar {
  /**
   * 构造函数
   * @param barPolygon 被分割的条多边形
   * @param mulPolygon 中梃多边形
   * @param controlPoint 控制点
   */
  constructor(barPolygon: Polygon, mulPolygon: Polygon, controlPoint: Point);
  
  /**
   * 执行分割
   * @returns 分割结果
   */
  run(): SplitResult;
}

/**
 * 分割后连接操作类
 */
declare class JoinBarAfterSplit {
  /**
   * 连接分割后的条
   * @param barPolygons 条多边形集合
   * @param mulPolygon 中梃多边形
   * @param isRightOrBottom 是否为右侧或底部连接
   * @param edgeWidth 边缘宽度
   * @param profileSize 轮廓尺寸
   */
  join(
    barPolygons: Polygon[],
    mulPolygon: Polygon,
    isRightOrBottom: boolean,
    edgeWidth: number,
    profileSize: number
  ): void;
}

/**
 * 工具类
 */
declare namespace Utils {
  /**
   * 判断多边形是否重合
   * @param poly1 多边形1
   * @param poly2 多边形2
   * @param checkDirection 是否检查方向
   * @param tolerance 容差值
   * @param strict 是否严格模式
   */
  function polyCoincide(
    poly1: Polygon,
    poly2: Polygon,
    checkDirection: boolean,
    tolerance: number,
    strict: boolean
  ): boolean;
  
  /**
   * 判断形状是否为水平或垂直
   * @param shape 形状对象
   */
  function isHorizOrVer(shape: MulShape): boolean;
}

/**
 * 停靠工厂方法
 */
declare namespace Dock {
  /**
   * 创建无停靠配置
   */
  function None(): Dock;
}

/**
 * 条端点管理类
 * 用于管理框条与中梃交点处的端点行为（分割、固定、连接等）
 */
export declare class BarEndpoint {
  /** 所属框架 */
  private readonly frame: Frame;
  /** 被分割条的多边形ID索引 */
  private readonly idxOfSplitBarPolyId: number;
  /** 中梃条的多边形ID索引 */
  private readonly idxOfMulBarPolyId: number;
  /** 是否为起点端点 */
  private readonly start: boolean;
  
  /**
   * 构造函数
   * @param frame 所属框架
   * @param idxOfSplitBarPolyId 被分割条的多边形ID索引
   * @param idxOfMulBarPolyId 中梃条的多边形ID索引
   * @param start 是否为起点端点
   */
  constructor(
    frame: Frame,
    idxOfSplitBarPolyId: number,
    idxOfMulBarPolyId: number,
    start: boolean
  );
  
  /**
   * 获取视图对象
   */
  get view(): View;
  
  /**
   * 获取与该端点相关的所有条对象
   * @returns 条对象数组
   */
  get bars(): Bar[];
  
  /**
   * 获取控制点坐标
   * @returns 控制点
   */
  get cpt(): Point;
  
  /**
   * 获取中梃管理器
   */
  get mulManager(): MullionManager;
  
  /**
   * 获取分割线对象
   */
  get splitterObj(): SplitterLine;
  
  /**
   * 获取中梃条对象
   */
  get mul(): Bar;
  
  /**
   * 获取或设置端点分割方式
   * 支持布尔值（true=贯通，false=无）或枚举值
   */
  get split(): EndpointSplitWay;
  set split(value: EndpointSplitWay | boolean);
  
  /**
   * 获取或设置端点分割方式（内部使用）
   */
  private get splitAtEndpoint(): EndpointSplitWay;
  private set splitAtEndpoint(value: EndpointSplitWay);
  
  /**
   * 撤销分割操作
   */
  private undoSplit(): void;
  
  /**
   * 执行贯通分割
   */
  private splitThrough(): void;
  
  /**
   * 重新计算多边形ID
   * @param container 容器对象
   * @param polyIdIndex 多边形ID索引
   */
  private calcPolyId(container: Container, polyIdIndex: number): void;
  
  /**
   * 判断是否具有固定属性（仅线段和圆弧支持）
   */
  get hasFixedProperty(): boolean;
  
  /**
   * 获取或设置端点是否固定
   * 固定后端点位置不可移动
   */
  get fixed(): boolean;
  set fixed(value: boolean);
  
  /**
   * 获取或设置是否为钢塑材质
   * 仅在未分割状态下可设置
   */
  get isSteelPlastic(): boolean;
  set isSteelPlastic(value: boolean);
  
  /**
   * 判断是否连接到框架
   * @returns 如果条的位置类型与中梃父容器类型相同则为true
   */
  get isConnectFrame(): boolean;
}