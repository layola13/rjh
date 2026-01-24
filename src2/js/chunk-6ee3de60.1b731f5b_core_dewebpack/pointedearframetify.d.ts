import Point from './Point';
import { Frametify } from './Frametify';
import { EdgeJointWay, Dock } from './EdgeJointWay';
import { WinPolygon, PolygonCreator } from './WinPolygon';

/**
 * 尖耳框架化处理类
 * 用于处理带有尖耳特征的多边形框架化操作
 */
export class PointedEarFrametify extends Frametify {
  /** 要处理的多边形对象 */
  private readonly poly: WinPolygon;
  
  /** 内部边缘数组 */
  private innerEdges: Point.Segment[];
  
  /** 外部路径数组 */
  private outsidePath: Point.Segment[];

  /**
   * 构造函数
   * @param polygon - 要进行框架化处理的多边形
   */
  constructor(polygon: WinPolygon) {
    super(polygon);
    this.poly = polygon;
    this.innerEdges = [];
    this.outsidePath = [];
  }

  /**
   * 生成内部多边形
   * @param params - 参数数组，第一个元素用于分析
   * @returns 返回生成的内部多边形数组
   */
  innerPolygons(params: number[]): WinPolygon[] {
    this.analyse(params[0]);
    
    let heightOffset = 0;
    if (!this.poly.hasBase) {
      heightOffset = this.poly.pullingHeight[1] - params[0];
    }

    // 创建垂直偏移向量
    const verticalOffset = Point.vector(0, -1);
    
    // 构建主多边形的点集
    const mainPolygonPoints = [
      this.innerEdges[0].start,
      this.innerEdges[1].start.translate(verticalOffset.multiply(heightOffset)),
      this.innerEdges[2].start.translate(verticalOffset.multiply(heightOffset)),
      this.innerEdges[3].start
    ];
    
    const mainPolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment(mainPolygonPoints)
    );

    // 构建辅助多边形
    const auxiliaryPolygonPoints = [
      this.outsidePath[0].start,
      this.innerEdges[4].start,
      this.innerEdges[4].end
    ];
    
    const auxiliaryPolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment(auxiliaryPolygonPoints)
    );
    
    auxiliaryPolygon.polyId.pos = 0;

    return [mainPolygon, auxiliaryPolygon];
  }

  /**
   * 生成条形多边形（框架的条状部分）
   * @param param1 - 第一个参数（未使用）
   * @param jointWays - 边缘连接方式数组
   * @returns 返回生成的条形多边形数组
   */
  barPolygons(param1: unknown, jointWays: EdgeJointWay[]): WinPolygon[] {
    // 如果没有基底，设置特定边的连接方式为垂直
    if (!this.poly.hasBase) {
      jointWays[1] = EdgeJointWay.Vertical;
      jointWays[2] = EdgeJointWay.Vertical;
    }

    // 创建条形结构，排除最后一条外部路径
    const barPolygons = this.createBar(
      this.outsidePath.slice(0, this.outsidePath.length - 1),
      this.innerEdges,
      jointWays
    );

    // 获取并修改第一个多边形的形状
    const firstShape = barPolygons[0].mulShape;
    const shapeLine = Point.line(firstShape.start, firstShape.end);
    const edge3Line = Point.line(this.poly.edge(3).start, this.poly.edge(3).end);
    const intersectionPoint = shapeLine.intersect(edge3Line)[0];
    
    barPolygons[0].mulShape = Point.segment(intersectionPoint, firstShape.end);

    // 设置停靠点关系
    barPolygons[0].epDock.stDock = Dock.Frame(barPolygons[3].polyId);
    barPolygons[4].epDock.etDock = Dock.Frame(barPolygons[0].polyId);

    // 如果没有基底，将第二个多边形标记为虚拟
    if (!this.poly.hasBase) {
      barPolygons[1].virtual = true;
    }

    return barPolygons;
  }

  /**
   * 分析多边形并计算内部边缘和外部路径
   * @param offset - 偏移量
   */
  private analyse(offset: number): void {
    const isClockwise = this.poly.orientation === Point.ORIENTATION.CW;

    // 计算每条边的法向量
    const normals = this.poly.edges.map((edge) => {
      const normalVector = Point.line(edge.start, edge.end).norm;
      return isClockwise ? normalVector.invert() : normalVector;
    });

    // 根据法向量和偏移量平移每条边
    const translatedEdges = this.poly.edges.map((edge, index) => 
      edge.translate(normals[index].multiply(offset))
    );

    // 克隆外部路径
    this.outsidePath = this.poly.edges.map((edge) => edge.clone());

    // 计算第一条边与第四条平移边的交点
    const firstEdge = this.poly.edge(0);
    const firstEdgeLine = Point.line(firstEdge.start, firstEdge.end);
    const intersectionStart = translatedEdges[3].intersect(firstEdgeLine)[0];
    
    this.outsidePath[0] = Point.segment(intersectionStart, this.outsidePath[0].end);
    translatedEdges[0] = this.outsidePath[0].translate(normals[0].multiply(offset));

    // 计算相邻平移边的交点
    const intersectionPoints: Point[] = [];
    for (let i = 1; i < this.outsidePath.length; i++) {
      intersectionPoints.push(translatedEdges[i - 1].intersect(translatedEdges[i])[0]);
    }

    // 构建内部边缘
    let currentStart = translatedEdges[0].start;
    for (let i = 0; i < this.outsidePath.length; i++) {
      let currentEnd: Point;

      if (i === this.outsidePath.length - 2) {
        // 倒数第二条边：与第一条外部路径相交
        currentEnd = translatedEdges[i].intersect(this.outsidePath[0])[0];
      } else if (i === this.outsidePath.length - 1) {
        // 最后一条边：跳出循环
        break;
      } else {
        // 常规边：使用计算的交点
        currentEnd = intersectionPoints[i];
      }

      this.innerEdges.push(Point.segment(currentStart, currentEnd));
      currentStart = intersectionPoints[i];
    }
  }
}