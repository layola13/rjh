import type { Point, Vector, Matrix, Segment } from './geometry';
import type { WinPolygon, PolygonCreator, PolyType } from './polygon';
import type { EventBus, EventType } from './events';

/**
 * 顶点控制点配置
 */
interface ControlPointConfig {
  /** 是否为圆弧控制点 */
  arc: boolean;
  /** 是否为端点 */
  endpoint: boolean;
}

/**
 * 视图对象接口
 */
interface View {
  /** 事件总线 */
  eventBus: EventBus;
}

/**
 * 事件上下文
 */
interface EventContext {
  /** 关联的视图 */
  view: View;
}

/**
 * 五边形框架设置事件载荷
 */
declare class PeakPentagonFrameSettings {
  constructor(context: EventContext, view: View);
}

/**
 * 多边形序列化JSON格式
 */
interface PolygonJSON {
  /** 多边形类型 */
  type: PolyType;
  /** 中心点坐标 */
  cpt: Record<string, unknown>;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 三角形顶部高度 */
  triangleHeight: number;
}

/**
 * 边缘数据结构
 */
interface Edge {
  /** 起始点 */
  start: Point;
  /** 终止点 */
  end: Point;
  /** 边的长度 */
  length: number;
  /** 起始点切线方向 */
  tangentInStart(): Vector;
  /** 中点 */
  middle(): Point;
}

/**
 * 尖顶五边形多边形类
 * 
 * 表示一个顶部为尖角的五边形窗户形状，常用于建筑窗户设计。
 * 形状特点：底部为矩形，顶部中央为三角形尖顶。
 * 
 * @extends WinPolygon
 */
export declare class PeakPentagonPoly extends WinPolygon {
  /** 几何中心点 */
  private cpt: Point;
  
  /** 底边宽度（单位：毫米） */
  private width: number;
  
  /** 总高度（单位：毫米） */
  private height: number;
  
  /** 三角形尖顶部分的高度（单位：毫米） */
  private triangleHeight: number;

  /**
   * 构造函数
   * @param centerPoint - 几何中心点坐标
   * @param width - 底边宽度
   * @param height - 总高度
   * @param triangleHeight - 三角形尖顶高度
   * @param edges - 边缘数组（可选，默认自动创建）
   */
  constructor(
    centerPoint: Point,
    width: number,
    height: number,
    triangleHeight: number,
    edges?: Edge[]
  );

  /**
   * 获取切角数量
   * @returns 固定返回 1（尖顶算作一个切角）
   */
  get cutAnglesCount(): number;

  /**
   * 获取是否启用尺寸控制标志
   * @returns 固定返回 true
   */
  get controlDimFlag(): boolean;

  /**
   * 静态工厂方法：创建五边形边缘数组
   * 
   * @param center - 中心点坐标
   * @param width - 底边宽度
   * @param height - 总高度
   * @param triangleHeight - 三角形顶部高度
   * @returns 包含5条边的边缘数组
   * 
   * @remarks
   * 创建顺序（逆时针）：
   * 1. 左下角 (0, 0)
   * 2. 右下角 (width, 0)
   * 3. 右上角 (width, -rectangleHeight)
   * 4. 顶点 (width/2, -height)
   * 5. 左上角 (0, -rectangleHeight)
   */
  static create(
    center: Point,
    width: number,
    height: number,
    triangleHeight: number
  ): Edge[];

  /**
   * 克隆当前实例
   * @returns 新的PeakPentagonPoly实例
   */
  protected _clone(): PeakPentagonPoly;

  /**
   * 初始化多边形控制点配置
   * 
   * @remarks
   * 为所有6个控制点设置为端点模式（非圆弧）
   */
  initPoly(): void;

  /**
   * 触发框架配置事件
   * @param context - 事件上下文对象
   */
  raiseFrameEvent(context: EventContext): void;

  /**
   * 缩放多边形
   * @param scaleFactor - 缩放比例因子
   * @returns 当前实例（支持链式调用）
   */
  scale(scaleFactor: number): this;

  /**
   * 序列化为JSON对象
   * @returns 包含所有几何参数的JSON对象
   */
  toJSON(): PolygonJSON;

  /**
   * 平移变换
   * @param translation - 平移向量
   * @returns 当前实例（支持链式调用）
   */
  translate(translation: Vector): this;

  /**
   * 旋转变换
   * @param angle - 旋转角度（弧度）
   * @param pivot - 旋转中心点
   * @returns 当前实例（支持链式调用）
   */
  rotate(angle: number, pivot: Point): this;

  /**
   * 拖拽边缘进行编辑
   * 
   * @param edgeIndex - 边缘索引（0-4）
   * @param dragVector - 拖拽位移向量
   * @param anchorPoint - 锚点坐标（默认为原点）
   * @returns 新的PeakPentagonPoly实例
   * 
   * @remarks
   * - 边缘1或4：调整宽度（左右两侧垂直边）
   * - 边缘2或3：调整矩形部分高度（上下水平边）
   * - 其他边缘：使用父类默认拖拽逻辑
   */
  dragEdge(
    edgeIndex: number,
    dragVector: Vector,
    anchorPoint?: Point
  ): PeakPentagonPoly;

  /**
   * 拖拽顶点进行编辑
   * 
   * @param vertexIndex - 顶点索引（0-4）
   * @param dragVector - 拖拽位移向量
   * @returns 新的PeakPentagonPoly实例
   * 
   * @remarks
   * - 顶点0或1：调整底边宽度和总高度
   * - 顶点2或4：调整顶边宽度和高度
   * - 顶点3：调整三角形尖顶高度
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector
  ): PeakPentagonPoly;

  /**
   * 通过尺寸编辑器修改尺寸
   * 
   * @param dimIndex - 尺寸索引（0-4对应不同尺寸维度）
   * @param scaleFactor - 缩放因子
   * @param adjustVector - 调整向量
   * @returns 编辑后的新实例
   * 
   * @remarks
   * - 索引0：调整底边高度
   * - 索引1：调整右侧宽度
   * - 索引2：调整顶部高度
   * - 索引3或4：调整斜边长度（需保证三角形有效性）
   */
  editDim(
    dimIndex: number,
    scaleFactor: number,
    adjustVector: Vector
  ): PeakPentagonPoly;

  /**
   * 根据边缘数组重新计算几何参数
   * 
   * @param edges - 边缘数组
   * 
   * @remarks
   * 自动更新 width、height、triangleHeight 和 cpt 属性
   */
  private compute(edges: Edge[]): void;
}