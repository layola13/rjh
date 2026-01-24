import { Point, Segment, Arc, Vector, Polygon as FlattenPolygon } from '@flatten-js/core';

/**
 * 工具类型枚举
 */
export enum ToolType {
  wall = 'wall'
}

/**
 * 多边形方向枚举
 * -1: 顺时针
 * 1: 逆时针
 */
export type PolygonOrientation = -1 | 1;

/**
 * 边缘信息接口
 * 描述多边形的单条边
 */
export interface EdgeInfo {
  /** 边所属多边形的中心点 */
  based: Point;
  /** 边的几何形状(线段或弧) */
  edge: Segment | Arc;
  /** 从给定点到边的距离 */
  distance: number;
  /** 边所属多边形的方向 */
  orientation: PolygonOrientation;
}

/**
 * 形状对象接口
 * 包含多边形及其方向信息
 */
export interface ShapeObject {
  /** 多边形几何对象 */
  polygon: FlattenPolygon;
  /** 多边形方向 */
  orientation: PolygonOrientation;
}

/**
 * 形状耦合对接口
 */
export interface ShapeCouple {
  polygon: FlattenPolygon;
}

/**
 * 窗口多边形类
 * 用于表示墙体几何形状
 */
export class WinPolygon {
  /**
   * 构造函数
   * @param edges - 构成多边形的边数组
   */
  constructor(edges: Array<Segment | Arc>);
}

/**
 * 形状管理器接口
 * 负责管理所有形状对象
 */
export interface ShapeManager {
  /** 所有形状对象数组 */
  shapem: ShapeObject[];
  /** 形状耦合对数组 */
  couples: ShapeCouple[];
  /** 墙体多边形数组 */
  walls: WinPolygon[];
  
  /**
   * 添加墙体
   * @param wall - 要添加的墙体多边形
   */
  addWall(wall: WinPolygon): void;
}

/**
 * 工具管理器接口
 * 负责管理绘图工具的生命周期
 */
export interface ToolManager {
  /**
   * 释放当前工具
   */
  releaseTool(): void;
}

/**
 * 视图接口
 * 表示绘图视图及其管理器
 */
export interface View {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 工具管理器 */
  toolManager: ToolManager;
}

/**
 * 多边形创建器单例
 * 提供创建各种形状的工厂方法
 */
export class PolygonCreator {
  /** 单例实例 */
  static readonly Ins: PolygonCreator;
  
  /**
   * 创建矩形形状
   * @param center - 矩形中心点
   * @param width - 矩形宽度
   * @param height - 矩形高度
   * @returns 矩形多边形
   */
  rectangleShape(center: Point, width: number, height: number): WinPolygon;
}

/**
 * 拖拽绘制工具基类
 * 提供基础的拖拽绘制功能
 */
export abstract class DragDrawTool {
  /** 当前鼠标位置 */
  protected curPt: Point;
  /** 首次点击位置 */
  protected firstPt: Point;
  /** 关联的视图 */
  protected view: View;
  
  /**
   * 构造函数
   * @param toolType - 工具类型
   * @param view - 关联的视图
   */
  constructor(toolType: ToolType, view: View);
  
  /**
   * 重启工具
   */
  restart(): void;
  
  /**
   * 完成拖拽操作的抽象方法
   * @param shape - 生成的形状
   */
  abstract finishDrag(shape: WinPolygon): void;
}

/**
 * 墙体绘制工具类
 * 继承自拖拽绘制工具,专门用于绘制墙体
 */
export class WallTool extends DragDrawTool {
  /** 默认墙体厚度(毫米) */
  private static readonly DEFAULT_WALL_THICKNESS = 500;
  
  /** 默认点击形状宽度 */
  private static readonly DEFAULT_CLICK_WIDTH = 2000;
  
  /** 默认点击形状高度 */
  private static readonly DEFAULT_CLICK_HEIGHT = 1200;
  
  /**
   * 构造函数
   * @param view - 关联的视图
   */
  constructor(view: View);
  
  /**
   * 获取点击时生成的默认形状
   * 返回以当前点为中心的矩形
   */
  get clickShape(): WinPolygon;
  
  /**
   * 判断是否为点击操作(而非拖拽)
   * 当当前点与首次点击点相同时返回true
   */
  get isCLick(): boolean;
  
  /**
   * 重启工具并释放
   * @override
   */
  restart(): void;
  
  /**
   * 完成拖拽操作
   * @param shape - 拖拽生成的形状
   * @override
   */
  finishDrag(shape: WinPolygon): void;
  
  /**
   * 生成要附加的墙体形状(静态方法)
   * 在点击模式下,自动将墙体附加到最近的边上
   * 
   * @param existingShapes - 现有形状数组
   * @param existingWalls - 现有墙体数组
   * @param clickPoint - 点击位置
   * @param wallThickness - 墙体厚度,默认500
   * @returns 生成的墙体形状,如果无法附加则返回undefined
   */
  static wallShapeToAppend(
    existingShapes: ShapeObject[],
    existingWalls: WinPolygon[],
    clickPoint: Point,
    wallThickness?: number
  ): WinPolygon | undefined;
  
  /**
   * 获取要对接的边缘
   * 找到距离点击点最近的边
   * 
   * @param shapes - 形状数组
   * @param point - 点击点
   * @returns 最近的边缘信息,如果没有边则返回undefined
   */
  static getDockEdge(
    shapes: ShapeObject[],
    point: Point
  ): EdgeInfo | undefined;
  
  /**
   * 生成墙体
   * 检查墙体是否与现有边重复,如果不重复则生成新墙体
   * 
   * @param existingWalls - 现有墙体数组
   * @param edgeInfo - 要对接的边缘信息
   * @param wallThickness - 墙体厚度,默认500
   * @returns 生成的墙体形状,如果与现有边重复则返回undefined
   */
  static generateWall(
    existingWalls: WinPolygon[],
    edgeInfo: EdgeInfo,
    wallThickness?: number
  ): WinPolygon | undefined;
  
  /**
   * 创建墙体多边形
   * 根据给定边缘和方向,沿垂直方向偏移指定厚度生成墙体
   * 
   * @param edge - 基准边(线段或弧)
   * @param orientation - 多边形方向(-1为顺时针,1为逆时针)
   * @param wallThickness - 墙体厚度,默认500
   * @returns 墙体多边形
   */
  static makeWall(
    edge: Segment | Arc,
    orientation: PolygonOrientation,
    wallThickness?: number
  ): WinPolygon;
}