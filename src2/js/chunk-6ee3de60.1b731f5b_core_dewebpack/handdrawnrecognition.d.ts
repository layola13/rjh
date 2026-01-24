/**
 * 手绘识别模块
 * 用于识别手绘的窗框和分隔线，并将其转换为规范的窗户多边形结构
 */

import type Flatten from '@flatten-js/core';

/**
 * 手绘输入矩形数据
 */
export interface HandDrawnRect {
  /** 矩形左上角 X 坐标 */
  x: string | number;
  /** 矩形左上角 Y 坐标 */
  y: string | number;
  /** 矩形宽度 */
  width: string | number;
  /** 矩形高度 */
  height: string | number;
}

/**
 * 窗户多边形接口
 */
export interface WinPolygon {
  /** 多边形对象 */
  polygon: {
    /** 添加面的形状数组 */
    addFace(shapes: unknown[]): void;
    /** 与另一个多边形求交集 */
    intersect(other: Flatten.Polygon): unknown[];
    /** 获取多边形的边 */
    edges: Flatten.Edge[];
  };
}

/**
 * 形状管理器接口
 */
export interface ShapeManager {
  /** 添加形状多边形 */
  add(polygon: Flatten.Polygon): void;
  /** 添加分隔线（中梃） */
  addMullion(line: Flatten.Line): void;
  /** 将形状移动到中心位置 */
  moveShapeToCenter(): void;
}

/**
 * 寻找有效中梃的结果
 */
interface ValidMullionResult {
  /** 有效中梃对应的 Flatten 多边形索引 */
  validMullionFPolyIndex: number;
  /** 生成的分隔线 */
  splitterLine: Flatten.Line;
}

/**
 * 手绘识别类
 * 负责将手绘矩形转换为窗户框架结构，识别外框和分隔线
 */
export declare class HandDrawnRecognition {
  /** 形状管理器实例 */
  private readonly shapeManager: ShapeManager;

  /**
   * 构造函数
   * @param shapeManager - 形状管理器实例
   */
  constructor(shapeManager: ShapeManager);

  /**
   * 识别手绘矩形并转换为窗户结构
   * @param rects - 手绘矩形数组
   */
  recognize(rects: HandDrawnRect[]): void;

  /**
   * 翻转多边形的 Y 轴坐标（用于坐标系转换）
   * @param polygon - 输入多边形
   * @returns 翻转后的多边形
   */
  private flipYForPoly(polygon: Flatten.Polygon): Flatten.Polygon;

  /**
   * 翻转线的 Y 轴坐标
   * @param line - 输入线
   * @returns 翻转后的线
   */
  private flipYForLine(line: Flatten.Line): Flatten.Line;

  /**
   * 查找外框多边形
   * @param polygons - 多边形数组
   * @returns 优化后的外框多边形
   * @throws 当闭合形状少于 2 个时抛出错误
   */
  private findFramePoly(polygons: Flatten.Polygon[]): WinPolygon;

  /**
   * 查找所有分隔线（中梃）
   * @param polygons - 所有多边形
   * @param framePoly - 外框多边形
   * @returns 分隔线数组
   */
  private findSplitters(
    polygons: Flatten.Polygon[],
    framePoly: WinPolygon
  ): Flatten.Line[];

  /**
   * 从两个线段的中点生成分隔线
   * @param segments - 线段数组
   * @returns 生成的分隔线
   */
  private makeSplitterLine(segments: Flatten.Segment[]): Flatten.Line;

  /**
   * 查找有效的中梃多边形
   * @param validPolygons - 已验证的多边形数组
   * @param candidatePolygons - 候选多边形数组
   * @returns 包含索引和分隔线的结果对象
   */
  private findValidMullion(
    validPolygons: Flatten.Polygon[],
    candidatePolygons: Flatten.Polygon[]
  ): ValidMullionResult;

  /**
   * 从多边形集合中提取所有面并按面积排序
   * @param polygon - 输入多边形
   * @returns 按面积升序排列的面数组
   */
  private fetchFaces(polygon: Flatten.Polygon): Flatten.Face[];

  /**
   * 合并多个多边形为一个统一多边形
   * @param polygons - 多边形数组
   * @returns 合并后的多边形
   */
  private unifyPolys(polygons: Flatten.Polygon[]): Flatten.Polygon;

  /**
   * 将 Flatten 多边形转换为窗户多边形
   * @param fPolygon - Flatten 多边形
   * @returns 窗户多边形对象
   */
  private fPolyToWinPoly(fPolygon: Flatten.Polygon): WinPolygon;

  /**
   * 将面转换为窗户多边形
   * @param face - Flatten 面对象
   * @returns 窗户多边形对象
   */
  private faceToWinPoly(face: Flatten.Face): WinPolygon;

  /**
   * 将手绘矩形转换为标准化的 Flatten 多边形数组
   * 将矩形规范化为 50 单位厚度的板条
   * @param rects - 手绘矩形数组
   * @returns Flatten 多边形数组
   */
  private toGuiGuiPlanks(rects: HandDrawnRect[]): Flatten.Polygon[];
}