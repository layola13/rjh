/**
 * 多边形分割器模块
 * 提供多边形分割、切割和桥接功能
 */

import Flatten from '@flatten-js/core';
import { PointCut } from './PointCut';
import { WinPolygon } from './WinPolygon';
import { LineSide, Utils } from './Utils';

/**
 * 形状元素节点
 * 用于双向链表结构存储多边形边
 */
export class ShapeElement {
  /** 几何形状值（线段、弧线等） */
  value: Flatten.Segment | Flatten.Arc | Flatten.Line;
  
  /** 是否已访问（用于图遍历） */
  visited: boolean = false;
  
  /** 下一个节点 */
  next?: ShapeElement;
  
  /** 前一个节点 */
  prev?: ShapeElement;

  constructor(value: Flatten.Segment | Flatten.Arc | Flatten.Line) {
    this.value = value;
  }

  /**
   * 克隆当前元素
   */
  clone(): ShapeElement {
    return new ShapeElement(this.value.clone());
  }
}

/**
 * 多边形分割器
 * 支持按线分割、按点分割、创建中梃等操作
 */
export class Splitter {
  /** 待分割的多边形 */
  private poly: WinPolygon;
  
  /** 分割线 */
  private splitLine: Flatten.Line;
  
  /** 分割后的多边形边集合 */
  private splitPoly: ShapeElement[] = [];
  
  /** 位于分割线上的边 */
  private edgesOnLine: ShapeElement[] = [];

  constructor(polygon: WinPolygon, splitLine: Flatten.Line) {
    this.poly = polygon;
    this.splitLine = splitLine;
  }

  /**
   * 分割多边形为两部分
   * @returns 分割后的多边形数组
   */
  partition(): WinPolygon[] {
    return this._split(this.poly, this.splitLine);
  }

  /**
   * 按给定厚度分割（生成中梃）
   * @param thickness 中梃厚度
   * @returns 分割后的多边形数组
   */
  split(thickness: number): WinPolygon[] {
    const result: WinPolygon[] = [];
    const [firstLine, secondLine] = this.genMullionLine(this.splitLine, 0.5 * thickness);
    
    const firstLinePos = this.findLinePos(firstLine);
    const secondLinePos = this.findLinePos(secondLine);

    this._split(this.poly, firstLine).forEach((polygon) => {
      const isIntersecting = 
        (secondLine instanceof Flatten.Line || secondLine instanceof Flatten.Segment)
          ? polygon.isIntersect(secondLine)
          : polygon.contains(secondLine.middle());

      if (isIntersecting) {
        this._split(polygon, secondLine).forEach((subPolygon) => {
          subPolygon.checkMullion(this.splitLine);
          subPolygon.spLine.line = this.splitLine.clone();
          subPolygon.polyId.posBySide(secondLinePos);
          this.checkPoly(result, subPolygon);
          result.push(subPolygon);
        });
      } else {
        polygon.spLine.line = this.splitLine.clone();
        polygon.polyId.posBySide(firstLinePos);
        this.checkPoly(result, polygon);
        result.push(polygon);
      }
    });

    return result;
  }

  /**
   * 最终分割（单线分割）
   * @param line 分割线
   * @returns 分割后的多边形数组
   */
  splitFinal(line: Flatten.Line | Flatten.Segment | Flatten.Arc): WinPolygon[] {
    const result: WinPolygon[] = [];
    const linePos = this.findLinePos(line);

    this._split(this.poly, line).forEach((polygon) => {
      polygon.checkMullion(this.splitLine);
      polygon.spLine.line = this.splitLine.clone();
      polygon.polyId.posBySide(linePos);
      result.push(polygon);
    });

    return result;
  }

  /**
   * 按点集分割
   * @param points 分割点数组（至少5个点）
   * @param firstLine 第一条分割线
   * @param secondLine 第二条分割线
   * @returns 分割后的多边形数组
   */
  splitByPts(
    points: Flatten.Point[],
    firstLine: Flatten.Line | Flatten.Segment,
    secondLine: Flatten.Line | Flatten.Segment
  ): WinPolygon[] {
    const result: WinPolygon[] = [];
    const firstLinePos = this.findLinePos(firstLine);
    const secondLinePos = this.findLinePos(secondLine);

    this._splitByPts([points[0], points[1]], this.poly, firstLine).forEach((polygon) => {
      if (polygon.inBoundary(points[2])) {
        this._splitByPts([points[2], points[3]], polygon, secondLine).forEach((subPolygon) => {
          if (!subPolygon.inBoundary(points[4])) {
            subPolygon.spLine.line = this.splitLine.clone();
            subPolygon.polyId.posBySide(secondLinePos);
            this.checkPoly(result, subPolygon);
            result.push(subPolygon);
          }
        });
      } else {
        polygon.spLine.line = this.splitLine.clone();
        polygon.polyId.posBySide(firstLinePos);
        this.checkPoly(result, polygon);
        result.push(polygon);
      }
    });

    return result;
  }

  /**
   * 检查并修正多边形ID位置
   * @param existingPolygons 已有多边形数组
   * @param newPolygon 新多边形
   */
  private checkPoly(existingPolygons: WinPolygon[], newPolygon: WinPolygon): void {
    const nonMullionPolygons = existingPolygons.filter((p) => !p.IsMullion);
    
    if (nonMullionPolygons.length === 0) return;

    const hasDuplicate = nonMullionPolygons.find((p) => p.polyId.equalTo(newPolygon.polyId));
    
    if (hasDuplicate) {
      const maxPos = Math.max(...nonMullionPolygons.map((p) => p.polyId.pos));
      newPolygon.polyId.pos = maxPos + 1;
    }
  }

  /**
   * 查找线相对于分割线的位置
   * @param line 待检测的线
   * @returns 线的位置（左侧/右侧）
   */
  private findLinePos(line: Flatten.Line | Flatten.Segment | Flatten.Arc): LineSide {
    if (line instanceof Flatten.Line) {
      return line.pt.leftTo(this.splitLine) ? LineSide.Left : LineSide.Right;
    }
    
    if (line instanceof Flatten.Segment) {
      const referenceLine = Flatten.line(this.splitLine.start, this.splitLine.end);
      return line.middle().leftTo(referenceLine) ? LineSide.Left : LineSide.Right;
    }
    
    if (line instanceof Flatten.Arc) {
      const referenceLine = Flatten.line(this.splitLine.start, this.splitLine.end);
      return line.start.leftTo(referenceLine) ? LineSide.Left : LineSide.Right;
    }
    
    return LineSide.None;
  }

  /**
   * 内部分割方法
   * @param polygon 多边形
   * @param line 分割线
   * @returns 分割后的多边形数组
   */
  private _split(
    polygon: WinPolygon,
    line: Flatten.Line | Flatten.Segment | Flatten.Arc
  ): WinPolygon[] {
    this.splitEdges(polygon, line);
    this.sortEdges(line);
    Splitter.doubleLinked(this.splitPoly);
    this.splitPolygon(line);
    return this.collectPoly();
  }

  /**
   * 按点集内部分割
   * @param points 分割点对
   * @param polygon 多边形
   * @param line 分割线
   * @returns 分割后的多边形数组
   */
  private _splitByPts(
    points: [Flatten.Point, Flatten.Point],
    polygon: WinPolygon,
    line: Flatten.Line | Flatten.Segment
  ): WinPolygon[] {
    const pointCutter = new PointCut(polygon);
    pointCutter.splitEdges(points);
    pointCutter.feedData(this.splitPoly, this.edgesOnLine);
    this.sortEdges(line);
    Splitter.doubleLinked(this.splitPoly);
    this.splitPolygon(line);
    return this.collectPoly();
  }

  /**
   * 构建双向链表
   * @param elements 元素数组
   * @param isOpen 是否为开放链表（默认false，闭合）
   */
  static doubleLinked(elements: ShapeElement[], isOpen: boolean = false): void {
    for (let i = 0; i < elements.length; i++) {
      if (i !== elements.length - 1) {
        elements[i].next = elements[i + 1];
      }
      if (i !== 0) {
        elements[i].prev = elements[i - 1];
      }
    }

    if (!isOpen) {
      elements[elements.length - 1].next = elements[0];
      elements[0].prev = elements[elements.length - 1];
    }
  }

  /**
   * 执行多边形分割
   * @param line 分割线
   */
  private splitPolygon(line: Flatten.Line | Flatten.Segment | Flatten.Arc): void {
    // 确保边数为偶数
    if (this.edgesOnLine.length % 2 === 1) {
      this.edgesOnLine.splice(-1, 1);
    }

    for (let i = 0; i < this.edgesOnLine.length; i += 2) {
      this.createBridge(this.edgesOnLine[i], this.edgesOnLine[i + 1], line);
    }
  }

  /**
   * 收集分割后的多边形
   * @returns 多边形数组
   */
  private collectPoly(): WinPolygon[] {
    const result: WinPolygon[] = [];

    for (const element of this.splitPoly) {
      if (!element.visited) {
        result.push(Splitter.findPoly(element));
      }
    }

    return result;
  }

  /**
   * 从起始元素查找完整多边形
   * @param startElement 起始元素
   * @returns 优化后的多边形
   */
  static findPoly(startElement: ShapeElement): WinPolygon {
    const edges: (Flatten.Segment | Flatten.Arc | Flatten.Line)[] = [];
    let currentElement: ShapeElement | undefined = startElement;

    do {
      currentElement.visited = true;
      edges.push(currentElement.value);
      currentElement = currentElement.next;
    } while (currentElement !== undefined && currentElement !== startElement);

    return Utils.optimizePolygon(new WinPolygon(edges));
  }

  /**
   * 创建桥接边
   * @param firstEdge 第一条边
   * @param secondEdge 第二条边
   * @param line 分割线
   */
  private createBridge(
    firstEdge: ShapeElement,
    secondEdge: ShapeElement,
    line: Flatten.Line | Flatten.Segment | Flatten.Arc
  ): void {
    const bridgeValue = this.createObj(firstEdge, secondEdge, line);
    
    if (bridgeValue === undefined) return;

    const forwardBridge = bridgeValue;
    const reverseBridge = new ShapeElement(bridgeValue.value.reverse());

    this.splitPoly.push(forwardBridge);
    this.splitPoly.push(reverseBridge);

    const prevOfSecond = secondEdge.prev!;

    // 连接第一条边
    firstEdge.prev!.next = forwardBridge;
    forwardBridge.prev = firstEdge.prev;
    forwardBridge.next = secondEdge;
    secondEdge.prev = forwardBridge;

    // 连接反向边
    firstEdge.prev = reverseBridge;
    reverseBridge.next = firstEdge;
    reverseBridge.prev = prevOfSecond;
    prevOfSecond.next = reverseBridge;
  }

  /**
   * 分割多边形边（需实现）
   */
  private splitEdges(polygon: WinPolygon, line: Flatten.Line | Flatten.Segment | Flatten.Arc): void {
    // 实现待补充
    throw new Error('Method not implemented: splitEdges');
  }

  /**
   * 排序分割线上的边（需实现）
   */
  private sortEdges(line: Flatten.Line | Flatten.Segment | Flatten.Arc): void {
    // 实现待补充
    throw new Error('Method not implemented: sortEdges');
  }

  /**
   * 生成中梃线对（需实现）
   */
  private genMullionLine(
    line: Flatten.Line,
    offset: number
  ): [Flatten.Line | Flatten.Segment, Flatten.Line | Flatten.Segment] {
    // 实现待补充
    throw new Error('Method not implemented: genMullionLine');
  }

  /**
   * 创建桥接对象（需实现）
   */
  private createObj(
    firstEdge: ShapeElement,
    secondEdge: ShapeElement,
    line: Flatten.Line | Flatten.Segment | Flatten.Arc
  ): ShapeElement | undefined {
    // 实现待补充
    throw new Error('Method not implemented: createObj');
  }
}