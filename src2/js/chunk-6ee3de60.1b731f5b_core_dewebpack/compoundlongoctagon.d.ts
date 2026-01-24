import { Point, Vector, Line } from './geometry';
import { Utils } from './utils';
import { CompoundLine, CutLineType } from './compound-line';
import { RegularPoly, WinPolygon, PolygonCreator, PolyParser } from './polygon';

/**
 * 复合长八边形类
 * 表示一个由多条线段组成的长八边形复合图形，继承自CompoundLine
 */
export class CompoundLongOctagon extends CompoundLine {
  /**
   * 内部边缘索引数组
   */
  innerEdgeIdx?: number[];

  /**
   * 外部边缘索引
   */
  outerEdgeIdx?: number;

  /**
   * 构造函数
   * @param slines - 构成复合图形的线段数组
   * @param innerPoly - 内部多边形
   */
  constructor(slines: Line[], innerPoly: WinPolygon) {
    super(slines, innerPoly, CutLineType.compoundLongOctagon);
  }

  /**
   * 创建复合长八边形
   * @param radius - 半径参数，用于计算八边形尺寸
   * @returns 新创建的CompoundLongOctagon实例
   */
  static createCompound(radius: number): CompoundLongOctagon {
    // 计算长度参数：5/3倍的半径
    const length = 5 * radius / 3;

    // 创建正八边形并获取其边
    const regularOctagon = new RegularPoly(
      Point.create(0, 0),
      radius,
      8
    );
    const octagonEdges = regularOctagon.edges;

    // 获取边长
    const edgeLength = octagonEdges[0].length;

    // 计算平移向量
    const upwardVector = Vector.create(0, length - edgeLength);
    const downwardVector = Vector.create(0, edgeLength - length);

    // 构建长八边形的顶点
    const longOctagonPoints = [
      octagonEdges[0].start.translate(downwardVector),
      octagonEdges[1].start.translate(downwardVector),
      octagonEdges[2].start.translate(downwardVector),
      octagonEdges[3].start.translate(upwardVector),
      octagonEdges[4].start.translate(upwardVector),
      octagonEdges[5].start.translate(upwardVector),
      octagonEdges[6].start.translate(upwardVector),
      octagonEdges[7].start.translate(downwardVector)
    ];

    // 创建长八边形多边形
    const longOctagonEdges = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment(longOctagonPoints)
    ).edges;

    // 获取关键坐标
    const rightX = longOctagonEdges[2].start.x;
    const topY = longOctagonEdges[0].start.y;
    const thirdLength = length / 3;

    // 创建对称线数组
    const symmetryLines: Line[] = [
      Line.create(Point.create(0, topY), Vector.create(1, 0)),           // 顶部水平线
      Line.create(Point.create(rightX, -thirdLength), Vector.create(0, 1)),  // 右上垂直线
      Line.create(Point.create(rightX, thirdLength), Vector.create(0, 1)),   // 右下垂直线
      Line.create(Point.create(0, -topY), Vector.create(-1, 0)),         // 底部水平线
      Line.create(Point.create(-rightX, thirdLength), Vector.create(0, -1)), // 左下垂直线
      Line.create(Point.create(-rightX, -thirdLength), Vector.create(0, -1)) // 左上垂直线
    ];

    return new CompoundLongOctagon(symmetryLines, new WinPolygon(longOctagonEdges));
  }

  /**
   * 克隆当前复合长八边形
   * @returns 新的CompoundLongOctagon实例
   */
  clone(): CompoundLongOctagon {
    const clonedLines: Line[] = [];
    this.slines.forEach((line) => {
      clonedLines.push(line.clone());
    });

    const clonedCompound = new CompoundLongOctagon(
      clonedLines,
      this.innerPoly.clone()
    );

    clonedCompound.innerEdgeIdx = this.innerEdgeIdx;
    clonedCompound.outerEdgeIdx = this.outerEdgeIdx;

    return clonedCompound;
  }

  /**
   * 序列化为JSON对象
   * @returns JSON表示的对象
   */
  toJSON(): Record<string, unknown> {
    const json = super.toJSON();
    json.name = CutLineType.compoundLongOctagon;
    return json;
  }

  /**
   * 从JSON对象反序列化
   * @param data - 序列化的JSON数据
   * @returns 反序列化后的CompoundLongOctagon实例
   */
  static deserialize(data: {
    slines: unknown[];
    polygon: unknown;
    innerEdgeIdx?: number[];
  }): CompoundLongOctagon {
    const deserializedLines: Line[] = [];
    data.slines.forEach((lineData) => {
      deserializedLines.push(Utils.parseLine(lineData));
    });

    const deserializedPoly = PolyParser.parse(data.polygon);
    const compound = new CompoundLongOctagon(deserializedLines, deserializedPoly);

    compound.innerEdgeIdx = data.innerEdgeIdx;

    return compound;
  }

  /**
   * 拖拽外部边缘
   * @param edgeIndex - 边缘索引
   * @param offset - 偏移向量
   * @param context - 上下文对象，包含多边形信息
   */
  drag(
    edgeIndex: number,
    offset: Vector,
    context: { polygon: { spLine: { line: { outerEdgeIdx: number } } } }
  ): void {
    const outerIdx = context.polygon.spLine.line.outerEdgeIdx;
    this.slines[outerIdx].pt = this.slines[outerIdx].pt.translate(offset);
  }

  /**
   * 拖拽内部边缘
   * @param edgeIndex - 边缘索引
   * @param offset - 偏移向量
   * @param context - 上下文对象
   * @param options - 附加选项
   * @returns 新的CompoundLongOctagon实例
   */
  dragInnerEdge(
    edgeIndex: number,
    offset: Vector,
    context: unknown,
    options: unknown
  ): CompoundLongOctagon {
    const result = super.dragInnerEdge(edgeIndex, offset, context, options);
    return new CompoundLongOctagon(result.slines, result.innerPoly);
  }
}