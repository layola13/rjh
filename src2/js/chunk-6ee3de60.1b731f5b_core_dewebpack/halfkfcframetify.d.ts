import { Segment } from './segment';
import { Frametify } from './frametify';
import { EdgeJointWay, Dock } from './edge-joint';
import { WinPolygon, PolygonCreator } from './polygon';

/**
 * 半肯德基框架化处理类
 * 
 * 用于处理特定类型的多边形框架化操作，生成内部多边形和连接杆
 * 继承自 Frametify 基类，实现了特定的框架分割逻辑
 */
export class HalfKfcFrametify extends Frametify {
  /**
   * 原始多边形对象
   */
  private poly: WinPolygon;

  /**
   * 内部多边形数组缓存
   * 包含两个子多边形：inner0 和 inner1
   */
  private _innerPolygons: WinPolygon[];

  /**
   * 构造函数
   * @param polygon - 待处理的窗户多边形对象
   */
  constructor(polygon: WinPolygon) {
    super(polygon);
    this.poly = polygon;
    this._innerPolygons = [];
  }

  /**
   * 生成内部多边形集合
   * 
   * 将原始多边形分割为两个内部区域，并设置第二个多边形的位置标识
   * 
   * @param insets - 内缩偏移量数组，用于控制每条边的内缩距离
   * @returns 包含两个内部多边形的数组 [inner0Polygon, inner1Polygon]
   */
  innerPolygons(insets: number[]): WinPolygon[] {
    const inner0 = this.inner0Polygon(insets);
    const inner1 = this.inner1Polygon(insets);
    
    // 设置第二个多边形的位置标识为0
    inner1.polyId.pos = 0;
    
    this._innerPolygons = [inner0, inner1];
    return [inner0, inner1];
  }

  /**
   * 生成连接杆多边形
   * 
   * 根据外部多边形和内部多边形的边界创建中间连接区域
   * 
   * @param extensionFactors - 延伸因子数组，控制特定边的延伸程度
   * @param jointWays - 边连接方式数组，定义每条边的连接类型
   * @returns 连接杆多边形对象
   */
  barPolygons(extensionFactors: number[], jointWays: EdgeJointWay[]): WinPolygon {
    const outerEdges = this.poly.edges;
    const inner0Edges = this._innerPolygons[0].edges;
    const inner1Edges = this._innerPolygons[1].edges;

    // 构建外部边界：保留前4条边，第5条边进行平移延伸，保留第6条边
    const adjustedOuterEdges = [
      outerEdges[0],
      outerEdges[1],
      outerEdges[2],
      outerEdges[3],
      Segment.segment(
        outerEdges[4].start,
        outerEdges[4].end.translate(
          outerEdges[4].tangentInEnd().multiply(extensionFactors[1])
        )
      ),
      outerEdges[5]
    ];

    // 构建内部边界：组合两个内部多边形的边
    const adjustedInnerEdges = [
      inner0Edges[0],
      Segment.segment(inner0Edges[1].start, inner1Edges[1].end),
      inner1Edges[2],
      inner1Edges[3],
      inner1Edges[0],
      inner0Edges[3]
    ];

    // 设置首尾边的连接方式为默认
    jointWays[0] = jointWays[5] = EdgeJointWay.Default;

    // 创建连接杆多边形
    const barPolygon = this.createBar(adjustedOuterEdges, adjustedInnerEdges, jointWays);
    
    // 将第6条边标记为虚拟边
    barPolygon[5].virtual = true;

    return barPolygon;
  }

  /**
   * 生成第一个内部多边形（上半部分）
   * 
   * 基于原始多边形的第1、2、5边构建矩形区域，并应用内缩偏移
   * 
   * @param insets - 内缩偏移量数组
   * @returns 第一个内部多边形对象
   */
  private inner0Polygon(insets: number[]): WinPolygon {
    const edges = this.poly.edges;
    
    // 构建矩形外框：使用边0的起点和终点、边4的终点和起点
    const outerRect = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[0].start,
        edges[0].end,
        edges[4].end,
        edges[4].start
      ])
    );

    // 应用内缩：前两条边使用指定偏移，后两条边偏移为0
    const insetsConfig = [insets[0], insets[1], 0, 0];
    const innerPoly = this.findInnerPoly(outerRect, insetsConfig);

    // 第4条边不设置停靠点
    innerPoly.edDock.docks[3] = Dock.None();

    return innerPoly;
  }

  /**
   * 生成第二个内部多边形（下半部分）
   * 
   * 基于原始多边形的第3、5边构建矩形区域，并应用内缩偏移
   * 
   * @param insets - 内缩偏移量数组
   * @returns 第二个内部多边形对象
   */
  private inner1Polygon(insets: number[]): WinPolygon {
    const edges = this.poly.edges;
    
    // 构建矩形外框：使用边4的起点和终点、边2的起点和终点
    const outerRect = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[4].start,
        edges[4].end,
        edges[2].start,
        edges[2].end
      ])
    );

    // 应用内缩：使用索引4、1、2、3的偏移值
    const insetsConfig = [insets[4], insets[1], insets[2], insets[3]];

    return this.findInnerPoly(outerRect, insetsConfig);
  }

  /**
   * 查找内部多边形
   * 
   * 通过平行边算法计算给定外框的内缩多边形
   * 
   * @param outerPolygon - 外部多边形
   * @param insets - 每条边的内缩距离数组
   * @returns 计算后的内部多边形
   */
  private findInnerPoly(outerPolygon: WinPolygon, insets: number[]): WinPolygon {
    return new WinPolygon(
      Frametify.findParallelEdges(
        outerPolygon.edges,
        insets,
        true,
        outerPolygon.orientation,
        true
      )
    );
  }
}