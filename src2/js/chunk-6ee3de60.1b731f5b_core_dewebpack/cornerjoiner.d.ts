/**
 * 角接合器模块类型定义
 * @module CornerJoiner
 */

import type { Point, Vector, Matrix, Line, Segment } from '@flatten-js/core';
import type { Couple, Text, WinPolygon, Frame, SubFrame, TopView, ShapeType } from './shapes';
import type { View } from './view';
import type { ToolType } from './tools';
import type { ColorManager } from './color-manager';
import type { CornerRobot } from './robots';

/**
 * 宿主框架位置枚举
 * @description 指定角接合器相对于宿主框架的位置
 */
export enum HostFramePosition {
  /** 左侧位置 */
  left = 0,
  /** 右侧位置 */
  right = 1
}

/**
 * 倾斜部分枚举
 * @description 指定倾斜应用于哪个视图部分
 */
export enum SkewPartEnum {
  /** 主体视图 */
  Body = 0,
  /** 顶视图 */
  TopView = 1
}

/**
 * 角接合器配置接口
 */
export interface CornerJoinerConfig {
  /** 倾斜角度（顶视图） */
  sa?: number;
  /** 倾斜值（顶视图） */
  sv?: number;
  /** 倾斜角度（主体） */
  sab?: number;
  /** 倾斜值（主体） */
  svb?: number;
  /** 倾斜文本位置 */
  stp?: { x: number; y: number };
  /** 型材尺寸文本位置 */
  pst?: { x: number; y: number };
  /** 型材尺寸文本隐藏状态 */
  psth?: boolean;
  /** 绘制模式 */
  dm?: number;
  /** 方角标志 */
  sqc?: boolean;
  /** 全景角标志 */
  pac?: boolean;
  /** 宿主框架位置 */
  hfp?: HostFramePosition;
  /** 唯一标识符 */
  uid?: number;
  /** 颜色管理器配置 */
  cm?: unknown;
  /** 多边形数据 */
  polygon?: unknown;
  /** 尺寸 */
  size?: number;
  /** 螺钉次数 */
  st?: number;
  /** 属性对象 */
  attrs?: Record<string, unknown>;
  /** 宽度尺寸数据 */
  dimW?: unknown;
}

/**
 * 角接合器类
 * @description 用于连接两个框架的角部件,支持倾斜、缩放等变换
 */
export declare class CornerJoiner extends Couple {
  /** 关联的视图实例 */
  readonly view: View;
  
  /** 宿主框架位置 */
  hostFramePos: HostFramePosition;
  
  /** 顶视图倾斜角度（度） */
  skewAngle: number;
  
  /** 顶视图倾斜值 */
  skewValue: number;
  
  /** 主体倾斜角度（度） */
  skewAngleForBody: number;
  
  /** 主体倾斜值 */
  skewValueForBody: number;
  
  /** 型材尺寸（毫米） */
  profileSize: number;
  
  /** 绘制模式系数（1或2，影响实际绘制尺寸） */
  drawMode: number;
  
  /** 是否为方角 */
  squareCorner: boolean;
  
  /** 是否为全景角 */
  panoramicCorner: boolean;
  
  /** 倾斜角度文本对象 */
  skewText: Text;
  
  /** 型材尺寸文本对象 */
  profileSizeText: Text;
  
  /** 型材尺寸文本是否隐藏 */
  profileSizeTextHidden: boolean;
  
  /** 倾斜变换图形组 */
  skewGShape?: unknown;
  
  /** 顶视图图形组 */
  topViewGShape?: unknown;
  
  /** 机器人辅助对象 */
  robot?: CornerRobot;

  /**
   * 构造函数
   * @param polygon - 多边形对象
   * @param view - 视图实例
   * @param shapeType - 形状类型
   */
  constructor(polygon: WinPolygon, view: View, shapeType?: ShapeType);

  /**
   * 获取实际尺寸（考虑绘制模式）
   * @returns 实际尺寸值
   */
  get size(): number;

  /**
   * 获取工具类型
   * @returns 编辑角接合器工具类型
   */
  get toolType(): ToolType;

  /**
   * 获取角边缘
   * @description 根据宿主框架位置返回对应的外部边缘
   * @returns 角边缘线段
   */
  get cornerEdge(): Segment;

  /**
   * 获取角框架
   * @description 获取与角边缘相交的框架
   * @returns 框架对象或undefined
   */
  get cornerFrame(): Frame | undefined;

  /**
   * 获取外部边缘数组
   * @returns 两条外部边缘
   */
  get outerEdges(): [Segment, Segment];

  /**
   * 获取中心边缘
   * @returns 中心边缘线段
   */
  get centerEdge(): Segment;

  /**
   * 获取宿主边缘
   * @description 根据宿主框架位置返回对应的外部边缘
   * @returns 宿主边缘线段
   */
  get hostEdge(): Segment;

  /**
   * 获取宿主框架
   * @description 获取与宿主边缘相交的框架
   * @returns 框架对象或undefined
   */
  get hostFrame(): Frame | undefined;

  /**
   * 获取文本起始点
   * @description 计算文本标注的默认位置
   * @returns 文本位置点
   */
  get textStartPt(): Point;

  /**
   * 计算边界框
   * @returns 包含所有元素的边界框
   */
  box(): unknown;

  /**
   * 调整型材尺寸
   * @param newSize - 新的尺寸值
   */
  resize(newSize: number): void;

  /**
   * 绘制角接合器
   * @param view - 视图实例
   */
  draw(view: View): void;

  /**
   * 倾斜框架
   * @param view - 视图实例
   */
  skewFrame(view: View): void;

  /**
   * 倾斜角框架
   * @param angle - 倾斜角度
   * @param value - 倾斜值
   * @param view - 视图实例
   * @param part - 倾斜部分（主体或顶视图）
   */
  skewCornerFrame(
    angle: number,
    value: number,
    view: View,
    part: SkewPartEnum
  ): void;

  /**
   * 自动对齐顶视图
   * @description 优化连接框架的顶视图对齐
   */
  autoAlignTopviews(): void;

  /**
   * 应用缩放变换
   * @param skewValue - 倾斜值
   * @param point - 参考点
   */
  applyScale(skewValue: number, point: Point): void;

  /**
   * 应用顶视图变换
   * @param skewValue - 倾斜值
   * @param frames - 受影响的框架数组
   * @param view - 视图实例
   */
  applyTopView(skewValue: number, frames: Frame[], view: View): void;

  /**
   * 平移角接合器
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;

  /**
   * 点击检测
   * @param point - 点击点
   * @param view - 视图实例
   * @returns 是否命中
   */
  hitBar(point: Point, view: View): boolean;

  /**
   * 序列化为JSON
   * @returns JSON对象
   */
  toJSON(): CornerJoinerConfig & Record<string, unknown>;

  /**
   * 从JSON反序列化
   * @param data - JSON数据
   * @param view - 视图实例
   * @returns 当前实例
   */
  deserialize(data: CornerJoinerConfig, view: View): this;

  /**
   * 更新文本内容和位置
   */
  updateText(): void;

  /**
   * 从多边形生成形状
   * @param polygon - 多边形对象
   * @returns 形状数组
   */
  getShapesFromPolygon(polygon: WinPolygon): [WinPolygon, WinPolygon];

  /**
   * 更新多边形
   * @param polygon - 新的多边形
   */
  updatePoly(polygon: WinPolygon): void;

  /**
   * 显示机器人辅助工具
   * @param view - 视图实例
   */
  showRobot(view: View): void;

  /**
   * 检测是否形成循环
   * @param components - 连接组件数组
   * @param view - 视图实例
   * @returns 是否形成循环
   */
  isLoop(components: unknown[], view: View): boolean;

  /**
   * 获取线段上的最小点
   * @param polygon - 多边形
   * @param segment - 线段
   * @returns 最小点或undefined
   */
  getMinPtOnSegment(polygon: WinPolygon, segment: Segment): Point | undefined;

  /**
   * 更新倾斜角度
   * @param angle - 新角度
   * @param view - 视图实例
   * @param part - 倾斜部分
   */
  updateSkewAngle(angle: number, view: View, part: SkewPartEnum): void;

  /**
   * 重建多边形
   * @returns 新的多边形
   */
  rebuildPoly(): WinPolygon;

  /**
   * 删除角接合器
   * @param view - 视图实例
   * @returns 是否删除成功
   */
  delete(view: View): boolean;

  /**
   * 创建角接合器实例
   * @param point - 创建点
   * @param segment - 基准线段
   * @param position - 宿主框架位置
   * @param view - 视图实例
   * @param shapeType - 形状类型
   * @returns 角接合器实例
   */
  static create(
    point: Point,
    segment: Segment,
    position?: HostFramePosition,
    view?: View,
    shapeType?: ShapeType
  ): CornerJoiner;

  /**
   * 从最近的框架创建角接合器
   * @param point - 参考点
   * @param view - 视图实例
   * @param shapeType - 形状类型
   * @returns 角接合器实例或undefined
   */
  static createFromNearest(
    point: Point,
    view: View,
    shapeType?: ShapeType
  ): CornerJoiner | undefined;
}

/**
 * 导出类型别名
 */
export { HostFramePosition as hostFramePos };