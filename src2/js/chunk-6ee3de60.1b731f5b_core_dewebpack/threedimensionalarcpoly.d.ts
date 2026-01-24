import Flatten from './flatten';
import { ArcUtils } from './utils/arc-utils';
import { EventType, ThreedArcFrameSettings } from './events';
import { WinPolygon, PolygonCreator, PolyType } from './polygon';
import type { Point, Vector, Segment, Arc, Edge } from './flatten';
import type { Box } from './geometry';
import type { EventContext } from './events';

/**
 * 三维弧形多边形类
 * 表示一个具有弧形特征的三维多边形对象，继承自WinPolygon
 */
export class ThreeDimensionalArcPoly extends WinPolygon {
  /**
   * 中心点坐标
   */
  public cpt: Point;

  /**
   * 多边形高度
   */
  public height: number;

  /**
   * 构造函数
   * @param centerPoint - 中心点坐标
   * @param height - 多边形高度
   * @param edges - 边集合，如果未提供则通过create方法生成
   */
  constructor(centerPoint: Point, height: number, edges?: Edge[]) {
    super(edges ?? ThreeDimensionalArcPoly.create(centerPoint, height));
    this.cpt = centerPoint;
    this.height = height;
  }

  /**
   * 获取正视图多边形
   * 从三维弧形多边形的边生成正视图的二维多边形表示
   */
  get frontViewPolygon(): WinPolygon {
    const edges = this.edges;
    return new WinPolygon([
      edges[0],
      Flatten.segment(edges[0].end, edges[2].start),
      edges[2],
      Flatten.segment(edges[2].end, edges[0].start)
    ]);
  }

  /**
   * 获取多边形的包围盒
   * 返回正视图多边形的边界框
   */
  get box(): Box {
    return this.frontViewPolygon.polygon.box;
  }

  /**
   * 静态工厂方法：根据中心点和高度创建边集合
   * @param center - 中心点坐标
   * @param height - 高度
   * @returns 生成的边数组
   */
  static create(center: Point, height: number): Edge[] {
    const width = 1.5 * height;
    return PolygonCreator.Ins
      .joinRelative(Flatten.point(), [
        Flatten.vector(-width / 2, -height / 2),
        Flatten.vector(0, height),
        Flatten.vector(width, 0),
        Flatten.vector(0, -height)
      ])
      .translate(Flatten.vector(center.x, center.y))
      .edges;
  }

  /**
   * 克隆当前对象
   * @returns 新的ThreeDimensionalArcPoly实例
   * @internal
   */
  protected _clone(): ThreeDimensionalArcPoly {
    return new ThreeDimensionalArcPoly(this.cpt.clone(), this.height, []);
  }

  /**
   * 缩放多边形
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的对象
   */
  scale(scaleFactor: number): this {
    this.height *= scaleFactor;
    return super.scale(scaleFactor);
  }

  /**
   * 序列化为JSON对象
   * @returns JSON表示
   */
  toJSON(): Record<string, unknown> {
    const json = super.toJSON();
    json.type = PolyType.threeDimensionalArc;
    json.cpt = this.cpt.toJSON();
    json.height = this.height;
    return json;
  }

  /**
   * 平移多边形
   * @param offset - 偏移向量
   * @returns 平移后的对象
   */
  translate(offset: Vector): this {
    super.translate(offset);
    this.cpt = this.cpt.translate(offset);
    return this;
  }

  /**
   * 旋转多边形
   * @param angle - 旋转角度（弧度）
   * @param rotationCenter - 旋转中心点
   * @returns 旋转后的对象
   */
  rotate(angle: number, rotationCenter?: Point): this {
    super.rotate(angle, rotationCenter);
    this.cpt = this.cpt.rotate(angle, rotationCenter);
    return this;
  }

  /**
   * 拖动弧形边
   * @param edgeIndex - 边索引（0-3）
   * @param dragOffset - 拖动偏移量
   * @returns 新的ThreeDimensionalArcPoly实例
   */
  dragArc(edgeIndex: number, dragOffset: Vector): ThreeDimensionalArcPoly {
    // 处理垂直边（索引1或3）
    if (edgeIndex === 1 || edgeIndex === 3) {
      const oppositeIndex = edgeIndex === 1 ? 3 : 1;
      const draggedPoly = super.dragArc(edgeIndex, dragOffset);
      const newEdges = draggedPoly.edges;
      const targetEdge = newEdges[edgeIndex];

      if (targetEdge instanceof Flatten.Segment) {
        newEdges[oppositeIndex] = Flatten.segment(
          newEdges[oppositeIndex].start,
          newEdges[oppositeIndex].end
        );
      } else if (targetEdge instanceof Flatten.Arc) {
        const oppositeEdge = newEdges[oppositeIndex];
        const arcCenter = targetEdge.center;
        const radius = arcCenter.distanceTo(oppositeEdge.start)[0];
        const startSlope = Flatten.segment(arcCenter, oppositeEdge.start).slope;
        const endSlope = Flatten.segment(arcCenter, oppositeEdge.end).slope;
        
        newEdges[oppositeIndex] = Flatten.arc(
          arcCenter,
          radius,
          startSlope,
          endSlope,
          !targetEdge.counterClockwise
        );
      } else {
        throw new Error('Unsupported edge type');
      }

      return new ThreeDimensionalArcPoly(this.cpt, 0, newEdges);
    }

    // 处理其他边
    const draggedPoly = super.dragArc(edgeIndex, dragOffset);
    return new ThreeDimensionalArcPoly(this.cpt, 0, draggedPoly.edges);
  }

  /**
   * 拖动顶点（当前实现为无操作）
   * @param vertexIndex - 顶点索引
   * @param dragOffset - 拖动偏移量
   * @param snapPoint - 捕捉点
   * @param referencePoint - 参考点（默认为原点）
   * @returns 当前对象
   */
  dragVertex(
    vertexIndex: number,
    dragOffset: Vector,
    snapPoint: Point,
    referencePoint: Point = Flatten.point()
  ): this {
    return this;
  }

  /**
   * 拖动边
   * @param edgeIndex - 边索引（0-3）
   * @param dragOffset - 拖动偏移量
   * @param snapPoint - 捕捉点（默认为原点）
   * @returns 新的ThreeDimensionalArcPoly实例
   */
  dragEdge(
    edgeIndex: number,
    dragOffset: Vector,
    snapPoint: Point = Flatten.point()
  ): ThreeDimensionalArcPoly {
    /**
     * 同步弧形边的辅助函数
     * @param newEdges - 新的边数组
     * @param originalEdges - 原始边数组
     */
    const syncArcEdges = (newEdges: Edge[], originalEdges: Edge[]): void => {
      if (originalEdges[1] instanceof Flatten.Arc) {
        // 处理上弧（索引1）
        const originalSegment = Flatten.segment(originalEdges[1].start, originalEdges[1].end);
        const verticalOffset = Flatten.vector(
          0,
          originalEdges[1].middle().y - originalSegment.middle().y
        );
        const topMidpoint = Flatten.segment(newEdges[0].end, newEdges[2].start)
          .middle()
          .translate(verticalOffset);
        newEdges[1] = ArcUtils.CreateArcFrom3Points(
          newEdges[0].end,
          newEdges[2].start,
          topMidpoint
        );

        // 处理下弧（索引3）
        const bottomOriginalSegment = Flatten.segment(originalEdges[3].start, originalEdges[3].end);
        const bottomVerticalOffset = Flatten.vector(
          0,
          originalEdges[3].middle().y - bottomOriginalSegment.middle().y
        );
        const bottomMidpoint = Flatten.segment(newEdges[2].end, newEdges[0].start)
          .middle()
          .translate(bottomVerticalOffset);
        newEdges[3] = ArcUtils.CreateArcFrom3Points(
          newEdges[2].end,
          newEdges[0].start,
          bottomMidpoint
        );
      } else {
        // 非弧形则创建直线段
        newEdges[1] = Flatten.segment(newEdges[0].end, newEdges[2].start);
        newEdges[3] = Flatten.segment(newEdges[2].end, newEdges[0].start);
      }
    };

    // 处理左边（索引0）
    if (edgeIndex === 0) {
      const originalEdges = this.edges;
      const newEdges = [...this.edges];
      newEdges[0] = newEdges[0].translate(Flatten.vector(dragOffset.x, 0));
      syncArcEdges(newEdges, originalEdges);
      return new ThreeDimensionalArcPoly(this.cpt, 0, newEdges);
    }

    // 处理右边（索引2）
    if (edgeIndex === 2) {
      const originalEdges = this.edges;
      const newEdges = [...this.edges];
      newEdges[2] = newEdges[2].translate(Flatten.vector(dragOffset.x, 0));
      syncArcEdges(newEdges, originalEdges);
      return new ThreeDimensionalArcPoly(this.cpt, 0, newEdges);
    }

    // 处理下弧（索引3）- 如果不是弧形则使用默认拖动
    if (!(this.edges[3] instanceof Flatten.Arc)) {
      const draggedPoly = super.dragEdge(edgeIndex, dragOffset, snapPoint);
      return new ThreeDimensionalArcPoly(this.cpt, 0, draggedPoly.edges);
    }

    // 处理弧形边的拖动
    const arcCenter = (this.edges[3] as Arc).center.clone();
    try {
      const draggedPoly = super.dragEdge(edgeIndex, dragOffset, snapPoint);
      const newEdges = draggedPoly.edges;
      const targetEdge = newEdges[edgeIndex] as Arc;
      const radius = arcCenter.distanceTo(targetEdge.start)[0];
      const startSlope = Flatten.segment(arcCenter, targetEdge.start).slope;
      const endSlope = Flatten.segment(arcCenter, targetEdge.end).slope;

      newEdges[edgeIndex] = Flatten.arc(
        arcCenter,
        radius,
        startSlope,
        endSlope,
        targetEdge.counterClockwise
      );

      return new ThreeDimensionalArcPoly(this.cpt, 0, newEdges);
    } catch (error) {
      return this;
    }
  }

  /**
   * 触发框架设置事件
   * @param context - 事件上下文
   */
  raiseFrameEvent(context: EventContext): void {
    context.view.eventBus.emit({
      type: EventType.threed_arc_frame_settings,
      payload: new ThreedArcFrameSettings(context, context.view)
    });
  }
}