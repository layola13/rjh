import Flatten from '@flatten-js/core';
import { Utils } from './utils';
import { CompoundLine, CutLineType } from './compound-line';
import { RegularPoly, WinPolygon, PolygonCreator, PolyParser } from './polygon';

/**
 * 复合双八边形切割线类
 * 用于创建和操作由两个八边形组合而成的复合切割线图形
 * @extends CompoundLine
 */
export class CompoundDoubleOctagon extends CompoundLine {
  /**
   * 内部边缘索引
   */
  innerEdgeIdx?: number;

  /**
   * 构造函数
   * @param structureLines - 结构线数组，定义复合图形的关键线条
   * @param innerPolygon - 内部多边形，定义复合图形的内部区域
   */
  constructor(
    structureLines: Flatten.Line[],
    innerPolygon: WinPolygon
  ) {
    super(structureLines, innerPolygon, CutLineType.compoundDoubleOctagon);
  }

  /**
   * 创建复合双八边形实例
   * @param radius - 八边形的半径
   * @returns 新创建的复合双八边形实例
   */
  static createCompound(radius: number): CompoundDoubleOctagon {
    // 创建正八边形并获取其边
    const regularOctagonEdges = new RegularPoly(
      Flatten.point(0, 0),
      radius,
      8
    ).edges;

    const edgeLength = regularOctagonEdges[0].length;

    // 定义上下偏移向量
    const topOffset = Flatten.vector(0, -1.5 * radius);
    const bottomOffset = Flatten.vector(0, 1.5 * radius);

    // 定义额外的偏移量用于延伸
    const EXTENSION_RATIO = 2.5;
    const topExtension = Flatten.vector(0, -edgeLength / EXTENSION_RATIO);
    const bottomExtension = Flatten.vector(0, edgeLength / EXTENSION_RATIO);

    // 构建复合多边形的顶点
    const compoundVertices = [
      // 顶部延伸部分
      regularOctagonEdges[0].start.translate(topOffset.add(topExtension)),
      regularOctagonEdges[1].start.translate(topOffset.add(topExtension)),
      // 顶部八边形顶点
      regularOctagonEdges[1].start.translate(topOffset),
      regularOctagonEdges[2].start.translate(topOffset),
      regularOctagonEdges[3].start.translate(topOffset),
      regularOctagonEdges[4].start.translate(topOffset),
      // 底部八边形顶点
      regularOctagonEdges[1].start.translate(bottomOffset),
      regularOctagonEdges[2].start.translate(bottomOffset),
      regularOctagonEdges[3].start.translate(bottomOffset),
      regularOctagonEdges[4].start.translate(bottomOffset),
      // 底部延伸部分
      regularOctagonEdges[4].start.translate(bottomOffset.add(bottomExtension)),
      regularOctagonEdges[5].start.translate(bottomOffset.add(bottomExtension)),
      // 底部八边形其余顶点
      regularOctagonEdges[5].start.translate(bottomOffset),
      regularOctagonEdges[6].start.translate(bottomOffset),
      regularOctagonEdges[7].start.translate(bottomOffset),
      regularOctagonEdges[0].start.translate(bottomOffset),
      // 顶部八边形其余顶点
      regularOctagonEdges[5].start.translate(topOffset),
      regularOctagonEdges[6].start.translate(topOffset),
      regularOctagonEdges[7].start.translate(topOffset),
      regularOctagonEdges[0].start.translate(topOffset),
    ];

    // 创建多边形并连接顶点
    const compoundPolygon = new WinPolygon(
      PolygonCreator.Ins.joinPointsWithSegment(compoundVertices)
    );

    // 应用水平缩放变换
    const HORIZONTAL_SCALE = 1.2;
    const scaleMatrix = Flatten.matrix(HORIZONTAL_SCALE, 0, 0, 1, 0, 0);
    const transformedEdges: Flatten.Segment[] = [];

    compoundPolygon.edges.forEach((edge: Flatten.Segment) => {
      transformedEdges.push(edge.transform(scaleMatrix));
    });

    // 创建结构线数组（定义关键的切割线位置和方向）
    const structureLines = [
      Flatten.line(transformedEdges[0].middle().clone(), Flatten.vector(1, 0)),   // 右侧水平线
      Flatten.line(transformedEdges[3].middle().clone(), Flatten.vector(0, 1)),   // 上侧垂直线
      Flatten.line(transformedEdges[5].middle().clone(), Flatten.vector(0, 1)),   // 上侧垂直线
      Flatten.line(transformedEdges[7].middle().clone(), Flatten.vector(0, 1)),   // 上侧垂直线
      Flatten.line(transformedEdges[10].middle().clone(), Flatten.vector(-1, 0)), // 左侧水平线
      Flatten.line(transformedEdges[13].middle().clone(), Flatten.vector(0, -1)), // 下侧垂直线
      Flatten.line(transformedEdges[15].middle().clone(), Flatten.vector(0, -1)), // 下侧垂直线
      Flatten.line(transformedEdges[17].middle().clone(), Flatten.vector(0, -1)), // 下侧垂直线
    ];

    return new CompoundDoubleOctagon(structureLines, new WinPolygon(transformedEdges));
  }

  /**
   * 克隆当前实例
   * @returns 新的复合双八边形实例
   */
  clone(): CompoundDoubleOctagon {
    const clonedStructureLines: Flatten.Line[] = [];
    this.slines.forEach((line: Flatten.Line) => {
      clonedStructureLines.push(line.clone());
    });

    const clonedInstance = new CompoundDoubleOctagon(
      clonedStructureLines,
      this.innerPoly.clone()
    );
    clonedInstance.innerEdgeIdx = this.innerEdgeIdx;

    return clonedInstance;
  }

  /**
   * 拖拽内部边缘
   * @param edgeIndex - 边缘索引
   * @param dragVector - 拖拽向量
   * @param targetPoint - 目标点
   * @param bounds - 边界限制
   * @returns 更新后的复合双八边形实例
   */
  dragInnerEdge(
    edgeIndex: number,
    dragVector: Flatten.Vector,
    targetPoint: Flatten.Point,
    bounds: unknown
  ): CompoundDoubleOctagon {
    let newStructureLines: Flatten.Line[];
    let newInnerPolygon: WinPolygon;

    // 根据边缘索引选择不同的缩放策略
    const VERTICAL_SCALE_EDGES = [5, 15];
    const HORIZONTAL_SCALE_EDGES = [0, 10];

    if (VERTICAL_SCALE_EDGES.includes(edgeIndex)) {
      // 垂直缩放（isVertical = true）
      [newStructureLines, newInnerPolygon] = this.scale(dragVector, targetPoint, true);
    } else if (HORIZONTAL_SCALE_EDGES.includes(edgeIndex)) {
      // 水平缩放（isVertical = false）
      [newStructureLines, newInnerPolygon] = this.scale(dragVector, targetPoint, false);
    } else {
      // 使用辅助方法处理其他边缘
      [newStructureLines, newInnerPolygon] = this.dragInnerEdgeHelper(
        edgeIndex,
        dragVector,
        targetPoint
      );
    }

    // 检查是否超出边界
    if (this.isCompoundLineOut(newInnerPolygon, bounds)) {
      return this;
    }

    return new CompoundDoubleOctagon(newStructureLines, newInnerPolygon);
  }

  /**
   * 缩放复合图形
   * @param dragVector - 拖拽向量
   * @param targetPoint - 目标点
   * @param isVertical - 是否为垂直缩放，默认为false（水平缩放）
   * @returns 包含新结构线、新多边形和缩放比例的元组
   */
  private scale(
    dragVector: Flatten.Vector,
    targetPoint: Flatten.Point,
    isVertical: boolean = false
  ): [Flatten.Line[], WinPolygon, number] {
    const center = this.innerPoly.box.center;

    // 计算原始向量和拖拽后的向量
    const originalVector = Flatten.vector(center, targetPoint);
    const draggedVector = Flatten.vector(center, targetPoint.translate(dragVector));

    // 验证拖拽方向（不支持反向拖拽）
    const projectedVector = draggedVector.projectionOn(originalVector);
    if (!projectedVector.normalize().equalTo(originalVector.normalize())) {
      throw new Error('Drag reverse not supported');
    }

    // 计算缩放比例
    const originalLength = Math.sqrt(
      originalVector.x * originalVector.x + originalVector.y * originalVector.y
    );
    const draggedLength = Math.sqrt(
      draggedVector.x * draggedVector.x + draggedVector.y * draggedVector.y
    );
    const scaleFactor = draggedLength / originalLength;

    // 创建缩放矩阵
    const scaleMatrix = isVertical
      ? Flatten.matrix(scaleFactor, 0, 0, 1, 0, 0) // 垂直缩放
      : Flatten.matrix(1, 0, 0, scaleFactor, 0, 0); // 水平缩放

    // 变换多边形边缘
    const transformedEdges = this.innerPoly.edges.map((edge: Flatten.Segment) => {
      return edge
        .translate(-center.x, -center.y)
        .transform(scaleMatrix)
        .translate(center.x, center.y);
    });

    const newInnerPolygon = this.innerPoly.cloneWith(transformedEdges);

    // 变换结构线
    const newStructureLines = this.slines.map((line: Flatten.Line) => {
      const transformedPoint = line.pt
        .translate(-center.x, -center.y)
        .transform(scaleMatrix)
        .translate(center.x, center.y);
      return Flatten.line(transformedPoint, line.norm);
    });

    return [newStructureLines, newInnerPolygon, scaleFactor];
  }

  /**
   * 序列化为JSON对象
   * @returns JSON表示的对象
   */
  toJSON(): Record<string, unknown> {
    const json = super.toJSON();
    json.name = CutLineType.compoundDoubleOctagon;
    return json;
  }

  /**
   * 从JSON对象反序列化
   * @param jsonData - JSON数据对象
   * @returns 复合双八边形实例
   */
  static deserialize(jsonData: {
    slines: unknown[];
    polygon: unknown;
    innerEdgeIdx?: number;
  }): CompoundDoubleOctagon {
    const structureLines: Flatten.Line[] = [];
    jsonData.slines.forEach((lineData: unknown) => {
      structureLines.push(Utils.parseLine(lineData));
    });

    const innerPolygon = PolyParser.parse(jsonData.polygon);
    const instance = new CompoundDoubleOctagon(structureLines, innerPolygon);
    instance.innerEdgeIdx = jsonData.innerEdgeIdx;

    return instance;
  }
}