/**
 * 点切割模块
 * 用于处理多边形按点集进行切割的操作
 */

import Flatten from "flatten-js"; // 假设模块0是flatten-js几何库
import { Utils } from "./utils"; // 假设模块2
import { WinPolygon } from "./win-polygon"; // 假设模块1
import { ShapeElement, Splitter } from "./splitter"; // 假设模块10

/**
 * 多边形的点切割类
 * 根据给定的点集对多边形进行切割，生成新的边和形状元素
 */
export class PointCut {
  /** 原始多边形对象 */
  private polygon: Flatten.Polygon;
  
  /** 切割后的多边形片段集合 */
  private splitPoly: ShapeElement[];
  
  /** 位于切割线上的边集合 */
  private edgesOnLine: ShapeElement[];

  /**
   * 构造函数
   * @param polygon - 待切割的多边形
   */
  constructor(polygon: Flatten.Polygon) {
    this.polygon = polygon;
    this.splitPoly = [];
    this.edgesOnLine = [];
  }

  /**
   * 获取切割线上的交叉点数量
   * @returns 交叉边的数量
   */
  get crossCount(): number {
    return this.edgesOnLine.length;
  }

  /**
   * 克隆切割后的元素
   * @returns 位于切割线上的克隆边数组
   */
  cloneElement(): ShapeElement[] {
    const clonedEdges: ShapeElement[] = [];
    const edgesOnLineClones: ShapeElement[] = [];

    this.splitPoly.forEach((element) => {
      const cloned = element.clone();
      clonedEdges.push(cloned);
      
      const isOnLine = this.edgesOnLine.findIndex((edge) => edge === element) >= 0;
      if (isOnLine) {
        edgesOnLineClones.push(cloned);
      }
    });

    Splitter.doubleLinked(clonedEdges);
    return edgesOnLineClones;
  }

  /**
   * 填充数据到目标数组
   * @param allEdges - 接收所有边的数组（会被清空并重新填充）
   * @param edgesOnLine - 接收切割线上边的数组（会被清空并重新填充）
   */
  feedData(allEdges: ShapeElement[], edgesOnLine: ShapeElement[]): void {
    allEdges.splice(0, allEdges.length);
    edgesOnLine.splice(0, edgesOnLine.length);

    this.splitPoly.forEach((element) => {
      allEdges.push(element);
      
      const isOnLine = this.edgesOnLine.findIndex((edge) => edge === element) >= 0;
      if (isOnLine) {
        edgesOnLine.push(element);
      }
    });

    Splitter.doubleLinked(allEdges);
  }

  /**
   * 根据点集切割边
   * 根据多边形类型（普通多边形、圆形、环形）采用不同的切割策略
   * @param points - 切割点集合
   */
  splitEdges(points: Flatten.Point[]): void {
    const polygon = this.polygon;
    this.splitPoly = [];
    this.edgesOnLine = [];

    const circlePolygon = polygon.circlePolygon();
    const ringPolygon = polygon.ringPolygon();

    if (circlePolygon !== undefined) {
      this.splitCircle(points);
    } else if (ringPolygon !== undefined) {
      this.splitRing(points);
    } else {
      // 普通多边形切割
      polygon.edges.forEach((edge) => {
        const clonedEdge = edge.clone();
        let currentElement = new ShapeElement(clonedEdge);

        // 过滤出位于当前边上的点（排除终点）
        const pointsOnEdge = points.filter((point) => 
          edge.contains(point) && !edge.end.equalTo(point)
        );

        if (pointsOnEdge.length === 0) {
          this.splitPoly.push(currentElement);
          return;
        }

        // 特殊情况：只有一个点且为起点
        if (pointsOnEdge.length === 1 && edge.start.equalTo(pointsOnEdge[0])) {
          this.splitPoly.push(currentElement);
          this.edgesOnLine.push(currentElement);
          return;
        }

        // 按距离排序切割点
        pointsOnEdge.sort((pointA, pointB) => 
          Utils.edgeDistance(edge, pointA) - Utils.edgeDistance(edge, pointB)
        );

        // 依次在每个点处切割
        let remainingEdge = clonedEdge;
        pointsOnEdge.forEach((point, index) => {
          const splitResult = remainingEdge.split(point);
          
          if (splitResult.length === 2) {
            currentElement = new ShapeElement(splitResult[0]);
            this.splitPoly.push(currentElement);
            
            // 第一个点之后的所有片段都在切割线上
            if (point !== pointsOnEdge[0]) {
              this.edgesOnLine.push(currentElement);
            }
            
            // 最后一个点：添加剩余片段
            if (point === pointsOnEdge[pointsOnEdge.length - 1]) {
              currentElement = new ShapeElement(splitResult[1]);
              this.splitPoly.push(currentElement);
              this.edgesOnLine.push(currentElement);
            }
            
            remainingEdge = splitResult[splitResult.length - 1];
          }
        });
      });
    }
  }

  /**
   * 切割圆形多边形
   * 在给定点之间创建圆弧片段
   * @param points - 切割点集合
   */
  private splitCircle(points: Flatten.Point[]): void {
    // 创建临时多边形检查点的方向
    const tempPolygon = new WinPolygon();
    for (let i = 0; i < points.length; i++) {
      const startPoint = points[i];
      const endPoint = points[(i + 1) % points.length];
      tempPolygon.add(Flatten.segment(startPoint, endPoint));
    }
    tempPolygon.done();

    // 确保逆时针方向
    let orderedPoints = points;
    if (tempPolygon.orientation !== Flatten.ORIENTATION.CCW) {
      orderedPoints = points.reverse();
    }

    const circle = this.polygon.circlePolygon()!;
    let currentSlope = new Flatten.Vector(circle.center, orderedPoints[0]).slope;

    // 在每对相邻点之间创建圆弧
    for (let i = 0; i < orderedPoints.length; i++) {
      const nextPoint = orderedPoints[(i + 1) % orderedPoints.length];
      const nextSlope = new Flatten.Vector(circle.center, nextPoint).slope;
      
      const arcElement = new ShapeElement(
        Flatten.arc(circle.center, circle.r.valueOf(), currentSlope, nextSlope, true)
      );
      
      this.splitPoly.push(arcElement);
      this.edgesOnLine.push(arcElement);
      
      currentSlope = nextSlope;
    }
  }

  /**
   * 切割环形多边形
   * 仅支持两个点的切割
   * @param points - 切割点集合（必须为2个点）
   */
  private splitRing(points: Flatten.Point[]): void {
    if (points.length !== 2) {
      console.warn("ring supports only two point splitting!");
      return;
    }

    const ring = this.polygon.ringPolygon()!;
    
    points.forEach((point) => {
      const slope = new Flatten.Vector(ring.pc, point).slope;
      const fullCircleAngle = slope + 2 * Math.PI;
      
      // 尝试内圆弧
      let arc = Flatten.arc(ring.pc, ring.ir, slope, fullCircleAngle, true);
      
      // 如果点不在内圆弧上，使用外圆弧
      if (!arc.contains(point)) {
        arc = Flatten.arc(ring.pc, ring.or, slope, fullCircleAngle, true);
      }
      
      const arcElement = new ShapeElement(arc);
      this.splitPoly.push(arcElement);
      this.edgesOnLine.push(arcElement);
    });
  }
}