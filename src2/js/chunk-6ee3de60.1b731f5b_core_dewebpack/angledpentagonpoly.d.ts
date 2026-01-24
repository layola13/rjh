import { Point, Vector, Matrix, Segment, Line, Utils } from '@flatten-js/core';
import { Frametify } from './Frametify';
import { WinPolygon, PolygonCreator, PolyType } from './Polygon';
import { Direction } from './Direction';

/**
 * 角五边形多边形类
 * 表示一个具有特定角度的五边形几何形状
 */
export class AngledPentagonPoly extends WinPolygon {
  /**
   * 创建角五边形实例的工厂方法
   * @param center - 五边形的中心点，默认为原点
   * @param baseWidth - 底边宽度，默认1200
   * @param height - 高度，默认1920
   * @param topRightWidth - 右上角宽度，默认600
   * @param cutHeight - 切角高度，默认600
   * @param direction - 五边形朝向，默认向上
   * @returns 新的角五边形实例
   */
  static create(
    center: Point = new Point(),
    baseWidth: number = 1200,
    height: number = 1920,
    topRightWidth: number = 600,
    cutHeight: number = 600,
    direction: Direction = Direction.Up
  ): AngledPentagonPoly {
    // 构建相对坐标的五边形顶点
    let polygon = PolygonCreator.Ins.joinRelativePro([
      new Vector(baseWidth, 0),
      new Vector(0, -height),
      new Vector(-topRightWidth, 0),
      new Vector(-(baseWidth - topRightWidth), height - cutHeight)
    ]);

    // 根据方向进行变换
    if (direction === Direction.Right) {
      polygon.transform(new Matrix().scale(-1, 1));
    } else if (direction === Direction.Down) {
      polygon.transform(new Matrix().scale(-1, -1));
    } else if (direction === Direction.Left) {
      polygon.transform(new Matrix().scale(1, -1));
    }

    // 平移到目标中心点
    polygon.translate(new Vector(polygon.box.center, center));

    return new AngledPentagonPoly(polygon.edges);
  }

  /**
   * 获取切角数量
   */
  get cutAnglesCount(): number {
    return 1;
  }

  /**
   * 获取控制尺寸标志
   */
  get controlDimFlag(): boolean {
    return false;
  }

  /**
   * 构造函数
   * @param edges - 多边形的边集合，如果未提供则使用默认创建的边
   */
  constructor(edges?: Segment[]) {
    super(edges ?? AngledPentagonPoly.create().edges);
  }

  /**
   * 序列化为JSON对象
   * @returns 包含多边形类型和数据的JSON对象
   */
  toJSON(): object {
    const json = super.toJSON();
    json.type = PolyType.angledPentagon;
    return json;
  }

  /**
   * 平移多边形
   * @param offset - 平移向量
   * @returns 当前实例（支持链式调用）
   */
  translate(offset: Vector): this {
    super.translate(offset);
    return this;
  }

  /**
   * 拖拽边进行编辑
   * @param edgeIndex - 边的索引（0-4）
   * @param offset - 拖拽偏移向量
   * @returns 编辑后的新实例，如果无效则返回原实例
   */
  dragEdge(edgeIndex: number, offset: Vector): AngledPentagonPoly {
    const edges = this.edges;
    const currentEdge = edges[edgeIndex];
    const edgeLine = new Line(currentEdge.start, currentEdge.end);
    const movedLine = new Line(edgeLine.pt.translate(offset), edgeLine.norm);
    const projectedOffset = offset.projectionOn(edgeLine.norm);

    if (edgeIndex === 2) {
      // 处理边2的拖拽
      const intersection = movedLine.intersect(new Line(edges[1].start, edges[1].end))[0];
      edges[1] = new Segment(edges[1].start, intersection);
      edges[2] = edges[2].translate(projectedOffset);
      edges[3] = new Segment(edges[2].end, edges[3].end);
    } else if (edgeIndex === 3 || edgeIndex === 4) {
      // 处理边3或边4的拖拽
      const intersection = movedLine.intersect(new Line(edges[0].start, edges[0].end))[0];
      edges[4] = edges[4].translate(projectedOffset);
      edges[3] = new Segment(edges[3].start, edges[4].start);
      edges[0] = new Segment(intersection, edges[0].end);
    } else {
      // 处理其他边的拖拽
      edges[edgeIndex] = edges[edgeIndex].translate(projectedOffset);
      Frametify.edgeIntersection(edges, edgeIndex);
      Frametify.edgeIntersection(edges, (edgeIndex + edges.length - 1) % edges.length);
    }

    // 验证编辑后的形状是否有效
    return this.invalid(edges) ? this : new AngledPentagonPoly(edges);
  }

  /**
   * 编辑尺寸
   * @param edgeIndex - 边的索引
   * @param dimension - 尺寸值
   * @param offset - 偏移向量
   * @returns 编辑后的新实例
   */
  editDim(edgeIndex: number, dimension: number, offset: Vector): AngledPentagonPoly {
    return this.dragEdge(edgeIndex, offset);
  }

  /**
   * 拖拽顶点（此形状不支持顶点拖拽）
   * @returns 当前实例（不变）
   */
  dragVertex(): this {
    return this;
  }

  /**
   * 克隆实例的内部方法
   * @returns 新的空实例
   */
  protected _clone(): AngledPentagonPoly {
    return new AngledPentagonPoly();
  }

  /**
   * 初始化多边形的控制点配置
   * 为每个顶点设置控制属性（非圆弧，但是端点）
   */
  protected initPoly(): void {
    for (let i = 0; i < 5; i++) {
      this.ctlRobs.set(i, {
        arc: false,
        endpoint: true
      });
    }
  }

  /**
   * 验证边集合是否构成有效的角五边形
   * @param edges - 待验证的边集合
   * @returns 如果无效返回true，有效返回false
   */
  protected invalid(edges: Segment[]): boolean {
    // 检查边2和边0的长度是否相等
    if (Utils.EQ_0(edges[2].length - edges[0].length)) {
      return true;
    }
    // 检查边4和边1的长度是否相等
    if (Utils.EQ_0(edges[4].length - edges[1].length)) {
      return true;
    }
    return false;
  }
}