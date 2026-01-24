/**
 * KFC3框架化处理模块
 * 
 * 该模块用于处理特定类型的窗框多边形，生成内部多边形和边框多边形。
 * 主要用于三段式框架结构的几何计算和边缘连接处理。
 */

import Segment from './Segment'; // 假设模块0导出Segment工具类
import { Frametify } from './Frametify'; // 假设模块10导出Frametify基类
import { EdgeJointWay, Dock } from './EdgeTypes'; // 假设模块2导出边缘连接方式和停靠枚举
import { WinPolygon, PolygonCreator } from './WinPolygon'; // 假设模块1导出窗口多边形类

/**
 * 多边形标识符接口
 */
interface PolyId {
  /** 多边形在集合中的位置索引 */
  pos: number;
}

/**
 * 带标识符的多边形接口
 */
interface PolygonWithId extends WinPolygon {
  polyId: PolyId;
}

/**
 * 边缘停靠配置接口
 */
interface EdgeDock {
  /** 停靠点配置数组 */
  docks: Dock[];
}

/**
 * 扩展的窗口多边形接口
 */
interface ExtendedWinPolygon extends WinPolygon {
  /** 边缘停靠配置 */
  edDock: EdgeDock;
}

/**
 * 边缘段接口
 */
interface Edge {
  /** 起始点 */
  start: Point;
  /** 结束点 */
  end: Point;
  /** 是否为虚拟边缘 */
  virtual?: boolean;
}

/**
 * 点接口
 */
interface Point {
  /** 平移变换 */
  translate(x: number, y: number): Point;
}

/**
 * 多边形配置接口
 */
interface PolygonConfig {
  /** 边缘数组 */
  edges: Edge[];
  /** 是否有底部内部尺寸 */
  bottomInnerDim?: boolean;
  /** 左侧是否隐藏 */
  leftSideHidden?: boolean;
  /** 右侧是否隐藏 */
  rightSideHidden?: boolean;
  /** 多边形方向 */
  orientation?: number;
}

/**
 * KFC3框架化处理类
 * 
 * 继承自Frametify基类，专门处理KFC3类型的窗框结构。
 * 负责生成5个内部多边形区域和对应的边框多边形。
 */
export class Kfc3Frametify extends Frametify {
  /** 窗口多边形配置 */
  private readonly poly: PolygonConfig;
  
  /** 内部多边形数组缓存 */
  private _innerPolygons: PolygonWithId[];

  /**
   * 构造函数
   * @param polygon - 窗口多边形配置对象
   */
  constructor(polygon: PolygonConfig) {
    super(polygon);
    this.poly = polygon;
    this._innerPolygons = [];
  }

  /**
   * 生成所有内部多边形
   * 
   * 根据给定的偏移量数组，创建5个内部多边形区域。
   * 每个多边形代表框架结构中的一个分段。
   * 
   * @param offsets - 偏移量数组，offsets[0]用于所有内部多边形的计算
   * @returns 包含5个内部多边形的数组
   */
  innerPolygons(offsets: number[]): PolygonWithId[] {
    const offset = offsets[0];

    // 生成第一个内部多边形（左侧区域）
    const poly0 = this.inner0Polygon(offset);

    // 生成第二个内部多边形（左中区域）
    const poly1 = this.inner1Polygon(offset);
    poly1.polyId.pos = 0;

    // 生成第三个内部多边形（中央区域）
    const poly2 = this.inner2Polygon(offset);
    poly2.polyId.pos = 1;

    // 生成第四个内部多边形（右中区域）
    const poly3 = this.inner3Polygon(offset);
    poly3.polyId.pos = 2;

    // 生成第五个内部多边形（右侧区域）
    const poly4 = this.inner4Polygon(offset);
    poly4.polyId.pos = 3;

    // 缓存所有内部多边形
    this._innerPolygons = [poly0, poly1, poly2, poly3, poly4];

    return [poly0, poly1, poly2, poly3, poly4];
  }

  /**
   * 生成边框多边形
   * 
   * 根据偏移量和边缘连接方式，构建外部边框多边形。
   * 处理边缘的平移、虚拟边缘标记以及侧面隐藏逻辑。
   * 
   * @param offsets - 偏移量数组，offsets[0]用于边缘调整
   * @param jointWays - 边缘连接方式数组（长度为12）
   * @returns 边框多边形的边缘数组
   */
  barPolygons(offsets: number[], jointWays: EdgeJointWay[]): Edge[] {
    const offset = offsets[0];
    const edges = this.poly.edges;

    // 获取原始边缘
    let edge0 = edges[0];
    let edge1 = edges[1];
    let edge2 = edges[2];

    // 根据底部内部尺寸配置调整边缘2
    if (!this.poly.bottomInnerDim) {
      edge2 = Segment.segment(
        edge2.start.translate(offset, 0),
        edge2.end
      );
    }

    // 调整边缘3（垂直方向平移）
    let edge3 = Segment.segment(
      edges[3].start,
      edges[3].end.translate(0, offset)
    );
    if (!this.poly.bottomInnerDim) {
      edge3 = edge3.translate(offset, 0);
    }

    let edge4 = edges[4];

    // 调整边缘5（垂直方向平移）
    let edge5 = Segment.segment(
      edges[5].start.translate(0, offset),
      edges[5].end
    );
    if (!this.poly.bottomInnerDim) {
      edge5 = edge5.translate(-offset, 0);
    }

    // 调整边缘6（双向平移）
    let edge6 = edges[6];
    if (!this.poly.bottomInnerDim) {
      edge6 = Segment.segment(
        edge6.start.translate(-offset, 0),
        edge6.end.translate(offset, 0)
      );
    }

    // 调整边缘7（垂直方向平移）
    let edge7 = Segment.segment(
      edges[7].start,
      edges[7].end.translate(0, offset)
    );
    if (!this.poly.bottomInnerDim) {
      edge7 = edge7.translate(offset, 0);
    }

    let edge8 = edges[8];

    // 调整边缘9（垂直方向平移）
    let edge9 = Segment.segment(
      edges[9].start.translate(0, offset),
      edges[9].end
    );
    if (!this.poly.bottomInnerDim) {
      edge9 = edge9.translate(-offset, 0);
    }

    // 调整边缘10（水平方向平移）
    let edge10 = edges[10];
    if (!this.poly.bottomInnerDim) {
      edge10 = Segment.segment(
        edge10.start.translate(-offset, 0),
        edge10.end
      );
    }

    let edge11 = edges[11];

    // 组装外部边缘数组
    const outerEdges: Edge[] = [
      edge0, edge1, edge2, edge3, edge4, edge5,
      edge6, edge7, edge8, edge9, edge10, edge11
    ];

    // 提取内部多边形的边缘用于构建内部边框
    const inner0Edges = this._innerPolygons[0].edges;
    const inner1Edges = this._innerPolygons[1].edges;
    const inner2Edges = this._innerPolygons[2].edges;
    const inner3Edges = this._innerPolygons[3].edges;
    const inner4Edges = this._innerPolygons[4].edges;

    // 构建内部边缘数组（顺时针或逆时针连接）
    const innerEdges: Edge[] = [
      Segment.segment(inner4Edges[3].start, inner0Edges[3].end),
      inner0Edges[0],
      inner0Edges[1],
      inner0Edges[2],
      inner1Edges[1],
      inner2Edges[0],
      inner2Edges[1],
      inner2Edges[2],
      inner3Edges[1],
      inner4Edges[0],
      inner4Edges[1],
      inner4Edges[2]
    ];

    // 设置边缘连接方式
    jointWays[4] = jointWays[5] = jointWays[8] = jointWays[9] = EdgeJointWay.Default;
    jointWays[0] = jointWays[1] = jointWays[2] = jointWays[3] = 
    jointWays[6] = jointWays[7] = jointWays[10] = jointWays[11] = EdgeJointWay.Vertical;

    // 创建边框多边形
    const barEdges = this.createBar(outerEdges, innerEdges, jointWays);

    // 标记虚拟边缘（不可见或仅用于计算）
    barEdges[4].virtual = true;
    barEdges[8].virtual = true;

    // 根据侧面隐藏配置标记虚拟边缘
    if (this.poly.leftSideHidden) {
      barEdges[1].virtual = true;
    }

    if (this.poly.rightSideHidden) {
      barEdges[11].virtual = true;
    }

    return barEdges;
  }

  /**
   * 生成第一个内部多边形（左侧区域）
   * 
   * 使用边缘1和边缘3的端点构建矩形区域。
   * 根据配置调整各边的偏移量。
   * 
   * @param offset - 偏移量
   * @returns 第一个内部多边形
   */
  private inner0Polygon(offset: number): ExtendedWinPolygon {
    const edges = this.poly.edges;

    // 使用4个端点创建多边形
    const polygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[1].start,
        edges[1].end,
        edges[3].start,
        edges[3].end
      ])
    );

    // 初始化偏移量数组（4条边）
    const offsets = Array(4).fill(offset);

    // 根据底部内部尺寸配置调整
    if (!this.poly.bottomInnerDim) {
      offsets[2] = 0;
    }

    // 根据左侧隐藏配置调整
    if (this.poly.leftSideHidden) {
      offsets[0] = 0;
    }

    return this.findInnerPoly(polygon, offsets);
  }

  /**
   * 生成第二个内部多边形（左中区域）
   * 
   * 使用边缘3和边缘5的端点构建矩形区域。
   * 特殊处理：右边缘偏移为0，底部配置影响上下边缘。
   * 
   * @param offset - 偏移量
   * @returns 第二个内部多边形
   */
  private inner1Polygon(offset: number): ExtendedWinPolygon {
    const edges = this.poly.edges;

    const polygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[3].end,
        edges[3].start,
        edges[5].end,
        edges[5].start
      ])
    );

    const offsets = Array(4).fill(offset);
    offsets[1] = 0; // 右边缘无偏移

    // 底部内部尺寸配置时，上下边缘无偏移
    if (this.poly.bottomInnerDim) {
      offsets[0] = offsets[2] = 0;
    }

    const result = this.findInnerPoly(polygon, offsets);
    
    // 设置右边缘的停靠方式为无
    result.edDock.docks[1] = Dock.None();

    return result;
  }

  /**
   * 生成第三个内部多边形（中央区域）
   * 
   * 使用边缘5和边缘7的端点构建矩形区域。
   * 根据底部内部尺寸配置调整左右边缘。
   * 
   * @param offset - 偏移量
   * @returns 第三个内部多边形
   */
  private inner2Polygon(offset: number): ExtendedWinPolygon {
    const edges = this.poly.edges;

    const polygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[5].start,
        edges[5].end,
        edges[7].start,
        edges[7].end
      ])
    );

    const offsets = Array(4).fill(offset);

    // 无底部内部尺寸时，左右边缘无偏移
    if (!this.poly.bottomInnerDim) {
      offsets[0] = offsets[2] = 0;
    }

    return this.findInnerPoly(polygon, offsets);
  }

  /**
   * 生成第四个内部多边形（右中区域）
   * 
   * 使用边缘7和边缘9的端点构建矩形区域。
   * 特殊处理：右边缘偏移为0，底部配置影响上下边缘。
   * 
   * @param offset - 偏移量
   * @returns 第四个内部多边形
   */
  private inner3Polygon(offset: number): ExtendedWinPolygon {
    const edges = this.poly.edges;

    const polygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[7].end,
        edges[7].start,
        edges[9].end,
        edges[9].start
      ])
    );

    const offsets = Array(4).fill(offset);
    offsets[1] = 0; // 右边缘无偏移

    // 底部内部尺寸配置时，上下边缘无偏移
    if (this.poly.bottomInnerDim) {
      offsets[0] = offsets[2] = 0;
    }

    const result = this.findInnerPoly(polygon, offsets);
    
    // 设置右边缘的停靠方式为无
    result.edDock.docks[1] = Dock.None();

    return result;
  }

  /**
   * 生成第五个内部多边形（右侧区域）
   * 
   * 使用边缘9和边缘11的端点构建矩形区域。
   * 根据配置调整各边的偏移量。
   * 
   * @param offset - 偏移量
   * @returns 第五个内部多边形
   */
  private inner4Polygon(offset: number): ExtendedWinPolygon {
    const edges = this.poly.edges;

    const polygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment([
        edges[9].start,
        edges[9].end,
        edges[11].start,
        edges[11].end
      ])
    );

    const offsets = Array(4).fill(offset);

    // 无底部内部尺寸时，左边缘无偏移
    if (!this.poly.bottomInnerDim) {
      offsets[0] = 0;
    }

    // 右侧隐藏时，右边缘无偏移
    if (this.poly.rightSideHidden) {
      offsets[2] = 0;
    }

    return this.findInnerPoly(polygon, offsets);
  }

  /**
   * 查找内部多边形
   * 
   * 根据给定的多边形和偏移量数组，计算平行内缩的边缘。
   * 
   * @param polygon - 外部多边形
   * @param offsets - 每条边的偏移量数组
   * @returns 内缩后的多边形
   */
  private findInnerPoly(polygon: WinPolygon, offsets: number[]): ExtendedWinPolygon {
    return new WinPolygon(
      Frametify.findParallelEdges(
        polygon.edges,
        offsets,
        true, // 内缩方向
        polygon.orientation,
        true // 保持平行
      )
    ) as ExtendedWinPolygon;
  }
}