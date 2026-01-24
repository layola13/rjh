import { Point, Circle, Segment, Arc } from './geometry';
import { WinPolygon } from './WinPolygon';
import { Dock, PolyId, EdgeJointWay } from './types';
import { Frametify } from './Frametify';

/**
 * 半圆形框架化处理类
 * 用于处理带有半圆弧边的多边形框架生成
 */
export class HalfCircleFrametify extends Frametify {
  /** 要处理的多边形对象 */
  private poly: WinPolygon;
  
  /** 内部边集合 */
  private innerEdges: Array<Segment | Arc>;
  
  /** 外部路径集合 */
  private outsidePath: Array<Segment | Arc>;

  /**
   * 构造函数
   * @param polygon - 待处理的窗口多边形
   */
  constructor(polygon: WinPolygon) {
    super(polygon);
    this.poly = polygon;
    this.innerEdges = [];
    this.outsidePath = [];
  }

  /**
   * 生成内部多边形
   * 根据指定偏移量生成平行的内部多边形
   * @param offset - 偏移距离数组，第一个元素为偏移值
   * @returns 内部多边形数组
   */
  innerPolygons(offset: number[]): WinPolygon[] {
    // 如果底部未隐藏，直接返回平行多边形
    if (!this.poly.bottomHidden) {
      return [this.poly.parallelPoly(offset, true)];
    }

    // 处理底部隐藏的情况，需要处理圆弧边
    const arcEdge = this.poly.arcEdge;
    
    // 计算新的圆弧半径并与底边求交点
    const newCircle = Circle.circle(arcEdge.center, arcEdge.r.valueOf() - offset[0]);
    const intersectionPoints = newCircle.intersect(this.poly.bottomEdge);
    
    // 创建新的圆弧段（从第一个交点到第二个交点，逆时针）
    const innerArc = Arc.arcSE(arcEdge.center, intersectionPoints[0], intersectionPoints[1], true);
    
    // 创建连接圆弧端点的线段
    const closingSegment = Segment.segment(innerArc.end, innerArc.start);
    
    // 构建内部多边形
    const innerPolygon = new WinPolygon([closingSegment, innerArc]);
    
    // 设置边缘停靠信息
    innerPolygon.edDock.docks = [
      Dock.None(),
      Dock.Frame(new PolyId(1))
    ];
    
    return [innerPolygon];
  }

  /**
   * 生成框架条多边形
   * 在外部边和内部边之间创建框架条
   * @param offsets - 偏移距离数组
   * @param jointWays - 边缘连接方式数组
   * @returns 框架条多边形数组
   */
  barPolygons(offsets: number[], jointWays: EdgeJointWay[]): WinPolygon[] {
    // 如果底部隐藏，设置底部两条边为垂直连接方式
    if (this.poly.bottomHidden) {
      jointWays[0] = EdgeJointWay.Vertical;
      jointWays[1] = EdgeJointWay.Vertical;
    }
    
    // 获取内部平行多边形的边
    const innerEdges = this.poly.parallelPoly(offsets[0], true).edges;
    
    // 创建框架条
    const bars = this.createBar(this.poly.edges, innerEdges, jointWays);
    
    // 如果底部隐藏，将第一个框架条标记为虚拟
    if (this.poly.bottomHidden) {
      bars[0].virtual = true;
    }
    
    return bars;
  }
}