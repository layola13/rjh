import { WinPolygon, PolygonCreator } from './polygon-types';
import { Frametify } from './frametify-base';
import { EdgeJointWay } from './edge-joint-types';
import Segment from './segment';

/**
 * 内部多边形数据结构
 * 包含多边形ID及其位置信息
 */
interface InnerPolygonWithPosition extends WinPolygon {
  polyId: {
    /** 多边形在数组中的位置索引 */
    pos: number;
  };
}

/**
 * KFC4框架化处理类
 * 
 * 用于处理特定几何形状的框架生成，继承自Frametify基类。
 * 主要功能包括：
 * - 生成4个内部多边形区域
 * - 创建连接这些区域的条形结构
 * - 处理边缘的平行偏移和连接方式
 * 
 * @extends Frametify
 */
export class Kfc4Frametify extends Frametify {
  /** 输入的原始多边形 */
  private poly: WinPolygon;
  
  /** 缓存的内部多边形数组 */
  private _innerPolygons: InnerPolygonWithPosition[];

  /**
   * 构造函数
   * @param polygon - 需要进行框架化处理的多边形
   */
  constructor(polygon: WinPolygon) {
    super(polygon);
    this.poly = polygon;
    this._innerPolygons = [];
  }

  /**
   * 生成所有内部多边形
   * 
   * 创建4个内部多边形区域，每个区域对应原多边形的不同部分。
   * 返回的多边形已设置好位置索引。
   * 
   * @param offsets - 各边的偏移量数组
   * @returns 包含4个内部多边形的数组
   */
  innerPolygons(offsets: number[]): InnerPolygonWithPosition[] {
    const innerPoly0 = this.inner0Polygon(offsets);
    const innerPoly1 = this.inner1Polygon(offsets);
    innerPoly1.polyId.pos = 0;
    
    const innerPoly2 = this.inner2Polygon(offsets);
    innerPoly2.polyId.pos = 1;
    
    const innerPoly3 = this.inner3Polygon(offsets);
    innerPoly3.polyId.pos = 2;

    this._innerPolygons = [innerPoly0, innerPoly1, innerPoly2, innerPoly3];
    return [innerPoly0, innerPoly1, innerPoly2, innerPoly3];
  }

  /**
   * 生成连接内部多边形的条形结构
   * 
   * 根据外部边缘和内部多边形的边缘创建条形多边形，
   * 用于连接不同的内部区域。
   * 
   * @param outerOffsets - 外部边缘的偏移量
   * @param jointWays - 边缘连接方式数组（会被修改）
   * @returns 生成的条形多边形
   */
  barPolygons(outerOffsets: number[], jointWays: EdgeJointWay[]): WinPolygon {
    const outerEdges = this.poly.edges;
    const inner0Edges = this._innerPolygons[0].edges;
    const inner1Edges = this._innerPolygons[1].edges;
    const inner2Edges = this._innerPolygons[2].edges;

    // 构建外部轮廓边缘，第8条边需要根据偏移量进行调整
    const adjustedOuterEdges = [
      outerEdges[0],
      outerEdges[1],
      outerEdges[2],
      outerEdges[3],
      outerEdges[4],
      outerEdges[5],
      outerEdges[6],
      Segment.segment(
        outerEdges[7].start.translate(outerEdges[7].tangentInStart().multiply(outerOffsets[4])),
        outerEdges[7].end.translate(outerEdges[7].tangentInEnd().multiply(outerOffsets[2]))
      )
    ];

    // 组合内部边缘形成内部轮廓
    const combinedInnerEdges = [
      inner0Edges[0],
      inner0Edges[1],
      Segment.segment(inner0Edges[2].start, inner1Edges[2].end),
      inner1Edges[3],
      Segment.segment(inner1Edges[0].start, inner2Edges[0].end),
      inner2Edges[1],
      inner2Edges[2],
      inner1Edges[1]
    ];

    // 设置特定边缘使用默认连接方式
    jointWays[0] = EdgeJointWay.Default;
    jointWays[7] = EdgeJointWay.Default;
    jointWays[8] = EdgeJointWay.Default;

    return this.createBar(adjustedOuterEdges, combinedInnerEdges, jointWays);
  }

  /**
   * 生成第一个内部多边形（左上区域）
   * 
   * 使用原多边形的边缘0、2、7构建矩形区域
   * 
   * @param offsets - 偏移量数组
   * @returns 第一个内部多边形
   */
  private inner0Polygon(offsets: number[]): InnerPolygonWithPosition {
    const edges = this.poly.edges;
    const cornerPolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[0].start,
        edges[0].end,
        edges[2].start,
        edges[7].end
      ])
    );
    
    const polygonOffsets = [offsets[0], offsets[1], offsets[2], 0];
    return this.findInnerPoly(cornerPolygon, polygonOffsets);
  }

  /**
   * 生成第二个内部多边形（右上区域）
   * 
   * 使用原多边形的边缘2、4、7构建区域
   * 
   * @param offsets - 偏移量数组
   * @returns 第二个内部多边形
   */
  private inner1Polygon(offsets: number[]): InnerPolygonWithPosition {
    const edges = this.poly.edges;
    const cornerPolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[4].start,
        edges[7].start,
        edges[7].end,
        edges[2].end
      ])
    );
    
    const polygonOffsets = [offsets[4], offsets[7], offsets[2], offsets[3]];
    return this.findInnerPoly(cornerPolygon, polygonOffsets);
  }

  /**
   * 生成第三个内部多边形（右下区域）
   * 
   * 使用原多边形的边缘4、6、7构建区域
   * 
   * @param offsets - 偏移量数组
   * @returns 第三个内部多边形
   */
  private inner2Polygon(offsets: number[]): InnerPolygonWithPosition {
    const edges = this.poly.edges;
    const cornerPolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[7].start,
        edges[4].end,
        edges[6].start,
        edges[6].end
      ])
    );
    
    const polygonOffsets = [offsets[4], offsets[5], offsets[6], 0];
    return this.findInnerPoly(cornerPolygon, polygonOffsets);
  }

  /**
   * 生成第四个内部多边形（左下区域）
   * 
   * 使用原多边形的边缘0、6构建区域，所有偏移量为0
   * 
   * @param offsets - 偏移量数组（本方法中未使用）
   * @returns 第四个内部多边形
   */
  private inner3Polygon(offsets: number[]): InnerPolygonWithPosition {
    const edges = this.poly.edges;
    const cornerPolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[6].end,
        edges[6].start,
        edges[0].end,
        edges[0].start
      ])
    );
    
    const polygonOffsets = Array(4).fill(0);
    return this.findInnerPoly(cornerPolygon, polygonOffsets);
  }

  /**
   * 查找并生成偏移后的内部多边形
   * 
   * 通过对输入多边形的边缘进行平行偏移来创建内部多边形
   * 
   * @param polygon - 基础多边形
   * @param offsets - 各边的偏移量
   * @returns 偏移后的内部多边形
   */
  private findInnerPoly(
    polygon: WinPolygon,
    offsets: number[]
  ): InnerPolygonWithPosition {
    return new WinPolygon(
      Frametify.findParallelEdges(
        polygon.edges,
        offsets,
        true, // 是否向内偏移
        polygon.orientation,
        true // 是否闭合
      )
    ) as InnerPolygonWithPosition;
  }
}