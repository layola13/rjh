/**
 * KFC框架化多边形处理模块
 * 用于生成肯德基风格的窗框内部多边形和横梁多边形
 */

import { Segment } from './geometry';
import { Frametify } from './frametify';
import { EdgeJointWay, Dock } from './edge-joint';
import { WinPolygon, PolygonCreator } from './polygon';

/**
 * 边缘尺寸配置数组
 * 索引对应不同边的尺寸偏移值
 */
type EdgeDimensions = number[];

/**
 * 接合方式配置数组
 * 定义边缘连接的方式
 */
type JointWays = EdgeJointWay[];

/**
 * 多边形标识信息
 */
interface PolyId {
  /** 多边形在集合中的位置索引 */
  pos: number;
}

/**
 * 带标识的多边形
 */
interface PolygonWithId extends WinPolygon {
  polyId: PolyId;
}

/**
 * 边缘停靠配置
 */
interface EdgeDock {
  /** 停靠点配置数组 */
  docks: Dock[];
}

/**
 * 扩展的窗多边形
 * 包含底部内部尺寸和拉伸高度属性
 */
interface ExtendedWinPolygon extends WinPolygon {
  /** 底部内部尺寸 */
  bottomInnerDim?: number;
  /** 拉伸高度 */
  pullingHeight: number;
  /** 边缘停靠配置 */
  edDock: EdgeDock;
}

/**
 * 带虚拟标记的线段
 */
interface VirtualSegment extends Segment {
  /** 是否为虚拟线段 */
  virtual?: boolean;
}

/**
 * KFC框架化处理类
 * 继承自基础框架化类，实现肯德基风格的特殊窗框处理逻辑
 */
export class KfcFrametify extends Frametify {
  /** 当前处理的多边形 */
  private readonly poly: ExtendedWinPolygon;
  
  /** 缓存的内部多边形数组 */
  private _innerPolygons: PolygonWithId[];

  /**
   * 构造函数
   * @param polygon - 待处理的窗多边形
   */
  constructor(polygon: ExtendedWinPolygon) {
    super(polygon);
    this.poly = polygon;
    this._innerPolygons = [];
  }

  /**
   * 生成三个内部多边形
   * @param dimensions - 边缘尺寸配置数组
   * @returns 包含三个内部多边形的数组 [底部, 中部, 顶部]
   */
  innerPolygons(dimensions: EdgeDimensions): PolygonWithId[] {
    const bottomPolygon = this.inner0Polygon(dimensions);
    const middlePolygon = this.inner1Polygon(dimensions);
    const topPolygon = this.inner2Polygon(dimensions);

    // 设置多边形位置标识
    middlePolygon.polyId.pos = 0;
    topPolygon.polyId.pos = 1;

    this._innerPolygons = [bottomPolygon, middlePolygon, topPolygon];
    return [bottomPolygon, middlePolygon, topPolygon];
  }

  /**
   * 生成横梁多边形
   * @param edgeDimensions - 边缘尺寸配置
   * @param jointWays - 边缘接合方式配置
   * @returns 包含虚拟标记的横梁线段数组
   */
  barPolygons(edgeDimensions: EdgeDimensions, jointWays: JointWays): VirtualSegment[] {
    const outerEdges = this.poly.edges;
    const inner0Edges = this._innerPolygons[0].edges;
    const inner1Edges = this._innerPolygons[1].edges;
    const inner2Edges = this._innerPolygons[2].edges;

    // 如果没有底部内部尺寸，调整外部边缘
    let adjustedOuterEdges = outerEdges;
    if (!this.poly.bottomInnerDim) {
      adjustedOuterEdges[2] = Segment.create(
        outerEdges[2].start,
        outerEdges[2].end.translate(outerEdges[2].tangentInStart().multiply(edgeDimensions[3]))
      );
      adjustedOuterEdges[3] = outerEdges[3].translate(
        outerEdges[2].tangentInStart().multiply(edgeDimensions[3])
      );
      adjustedOuterEdges[4] = Segment.create(
        outerEdges[4].start.translate(outerEdges[4].tangentInStart().multiply(edgeDimensions[3])),
        outerEdges[4].end.translate(outerEdges[4].tangentInEnd().multiply(edgeDimensions[5]))
      );
      adjustedOuterEdges[5] = outerEdges[5].translate(
        outerEdges[6].tangentInEnd().multiply(edgeDimensions[5])
      );
      adjustedOuterEdges[6] = Segment.create(
        outerEdges[6].start.translate(outerEdges[6].tangentInEnd().multiply(edgeDimensions[5])),
        outerEdges[6].end
      );
    }

    // 构建最终的外部边缘数组
    const finalOuterEdges = [
      adjustedOuterEdges[0],
      adjustedOuterEdges[1],
      adjustedOuterEdges[2],
      Segment.create(
        adjustedOuterEdges[3].start,
        adjustedOuterEdges[3].end.translate(adjustedOuterEdges[3].tangentInEnd().multiply(edgeDimensions[0]))
      ),
      adjustedOuterEdges[4],
      Segment.create(
        adjustedOuterEdges[5].start.translate(adjustedOuterEdges[5].tangentInStart().multiply(edgeDimensions[0])),
        adjustedOuterEdges[5].end
      ),
      adjustedOuterEdges[6],
      adjustedOuterEdges[7]
    ];

    // 构建内部边缘数组
    const innerEdges = [
      Segment.create(inner2Edges[3].start, inner0Edges[3].end),
      inner0Edges[0],
      inner0Edges[1],
      inner0Edges[2],
      inner1Edges[1],
      inner2Edges[0],
      inner2Edges[1],
      inner2Edges[2]
    ];

    // 设置接合方式为默认
    jointWays[4] = EdgeJointWay.Default;
    jointWays[5] = EdgeJointWay.Default;

    // 创建横梁并标记虚拟边
    const barSegments = this.createBar(finalOuterEdges, innerEdges, jointWays);
    barSegments[4].virtual = true;

    return barSegments;
  }

  /**
   * 生成底部内部多边形 (inner0)
   * @param dimensions - 边缘尺寸配置
   * @returns 底部内部多边形
   */
  private inner0Polygon(dimensions: EdgeDimensions): PolygonWithId {
    const edges = this.poly.edges;
    const basePolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[1].start,
        edges[1].end,
        edges[3].start,
        edges[3].end
      ])
    );

    const innerDimensions = [
      dimensions[1],
      dimensions[2],
      this.poly.bottomInnerDim ? dimensions[3] : 0,
      dimensions[0]
    ];

    return this.findInnerPoly(basePolygon, innerDimensions);
  }

  /**
   * 生成中部内部多边形 (inner1)
   * @param dimensions - 边缘尺寸配置
   * @returns 中部内部多边形
   */
  private inner1Polygon(dimensions: EdgeDimensions): PolygonWithId {
    const edges = this.poly.edges;
    const basePolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[3].end,
        edges[3].start,
        edges[5].end,
        edges[5].start
      ])
    );

    const innerDimensions = [
      this.poly.bottomInnerDim ? 0 : dimensions[3],
      this.poly.pullingHeight,
      this.poly.bottomInnerDim ? 0 : dimensions[5],
      dimensions[0]
    ];

    const innerPoly = this.findInnerPoly(basePolygon, innerDimensions);
    // 禁用第二个停靠点
    innerPoly.edDock.docks[1] = Dock.None();
    return innerPoly;
  }

  /**
   * 生成顶部内部多边形 (inner2)
   * @param dimensions - 边缘尺寸配置
   * @returns 顶部内部多边形
   */
  private inner2Polygon(dimensions: EdgeDimensions): PolygonWithId {
    const edges = this.poly.edges;
    const basePolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[5].start,
        edges[5].end,
        edges[7].start,
        edges[7].end
      ])
    );

    const innerDimensions = [
      this.poly.bottomInnerDim ? dimensions[5] : 0,
      dimensions[6],
      dimensions[7],
      dimensions[0]
    ];

    return this.findInnerPoly(basePolygon, innerDimensions);
  }

  /**
   * 查找内部平行多边形
   * @param basePolygon - 基础多边形
   * @param dimensions - 各边的偏移尺寸
   * @returns 计算后的内部多边形
   */
  private findInnerPoly(basePolygon: WinPolygon, dimensions: EdgeDimensions): PolygonWithId {
    return new WinPolygon(
      Frametify.findParallelEdges(
        basePolygon.edges,
        dimensions,
        true,
        basePolygon.orientation,
        true
      )
    ) as PolygonWithId;
  }

  /**
   * 创建横梁
   * @param outerEdges - 外部边缘数组
   * @param innerEdges - 内部边缘数组
   * @param jointWays - 接合方式配置
   * @returns 横梁线段数组
   * @protected
   */
  protected createBar(
    outerEdges: Segment[],
    innerEdges: Segment[],
    jointWays: JointWays
  ): VirtualSegment[] {
    // 此方法由基类实现，这里声明类型
    return super.createBar(outerEdges, innerEdges, jointWays) as VirtualSegment[];
  }
}