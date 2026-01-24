/**
 * Couple 模块 - 处理连接器和角接器的核心类
 * @module Couple
 */

import { Box, Segment, Vector } from './svg-library';
import { Polygon as WinPolygon, Bar, ShapeType, Connector, WallCornerJoiner, PanoramicCornerJoiner, CornerJoiner, SizeDim } from './shapes';
import { ColorManager } from './color-manager';
import { Artisan, DrawParams } from './artisan';
import { FillPatternType, Utils } from './utils';
import { Frametify } from './frametify';

/**
 * Couple 序列化数据接口
 */
export interface CoupleJSON {
  /** 唯一标识符 */
  uid: number;
  /** 形状类型 */
  type: ShapeType;
  /** 多边形数据 */
  polygon: unknown;
  /** 颜色管理器数据 */
  cm: unknown;
  /** 尺寸信息 */
  size: unknown;
  /** 宽度标注数据 */
  dimW: unknown;
  /** 螺丝固定次数 */
  st: number;
  /** 自定义属性 */
  attrs: Record<string, unknown>;
}

/**
 * 视图参数接口
 */
export interface ViewParams {
  [key: string]: unknown;
}

/**
 * 视图接口
 */
export interface IView {
  /** 视图参数 */
  params: ViewParams;
  /** 形状管理器 */
  shapeManager: {
    /** 生成唯一ID */
    generateUID(): number;
  };
}

/**
 * 图形形状接口
 */
export interface IShape {
  /** 包围盒 */
  box: Box;
  /** 平移变换 */
  translate(offset: Vector): void;
  /** 克隆 */
  clone(): IShape;
  /** 应用矩阵变换 */
  transform(matrix: unknown): IShape;
}

/**
 * 渲染上下文接口
 */
export interface IRenderContext {
  /** 活动图层 */
  activeLayer: unknown;
}

/**
 * Couple 类 - 表示连接器或角接器组件
 * 继承自 Bar 基类，用于处理窗框连接部分的几何形状、渲染和交互
 */
export declare class Couple extends Bar {
  /** 关联的视图对象 */
  readonly view: IView;
  
  /** 唯一标识符 */
  uid: number;
  
  /** 组成该组件的形状数组 */
  shapes: IShape[];
  
  /** 是否可拖拽 */
  draggable: boolean;
  
  /** 螺丝固定次数 */
  screwTimes: number;
  
  /** 自定义属性对象 */
  attrs: Record<string, unknown>;
  
  /** 颜色管理器 */
  colorManager: ColorManager;
  
  /** 宽度尺寸标注 */
  dimForWidth: SizeDim;
  
  /** 可视化形状数组（渲染用） */
  private vshapes: unknown[];
  
  /** 组形状容器（SVG group） */
  private gshape?: unknown;
  
  /** 辅助机器人对象 */
  private robot?: {
    hide(): void;
    hitTest(point: unknown): boolean;
    translate(offset: Vector): void;
  };

  /**
   * 构造函数
   * @param polygon - 多边形对象
   * @param toolType - 工具类型
   * @param view - 视图对象
   */
  constructor(polygon: WinPolygon, toolType: unknown, view: IView);

  /**
   * 获取视图参数
   */
  get params(): ViewParams;

  /**
   * 获取多边形面积
   */
  get area(): number;

  /**
   * 计算包围盒
   * 合并所有子形状的包围盒
   */
  box(): Box;

  /**
   * 计算窗口包围盒
   * 与 box() 功能相同
   */
  windowBox(): Box;

  /**
   * 宽度编辑事件处理
   * @param newWidth - 新宽度值
   */
  onEditWidth(newWidth: number): void;

  /**
   * 高度编辑事件处理
   * @param newHeight - 新高度值
   */
  onEditHeight(newHeight: number): void;

  /**
   * 绘制组件到画布
   * @param context - 渲染上下文
   */
  draw(context: IRenderContext): void;

  /**
   * 获取中心边的长度
   */
  get length(): number;

  /**
   * 隐藏辅助机器人
   */
  hideAssist(): void;

  /**
   * 碰撞检测
   * @param point - 检测点
   * @param showRobotFlag - 是否显示机器人
   * @returns 是否命中
   */
  hitBar(point: unknown, showRobotFlag: boolean): boolean;

  /**
   * 更新多边形
   * @param newPolygon - 新多边形对象
   */
  updatePoly(newPolygon: WinPolygon): void;

  /**
   * 平移变换
   * @param offset - 偏移向量
   */
  translate(offset: Vector): void;

  /**
   * 边缘吸附检测
   * @param edge - 待吸附的边
   * @param tolerance - 吸附容差
   * @param targetShape - 目标形状（排除自身）
   * @returns 吸附目标边，如果没有则返回 undefined
   */
  snapEdge(edge: Segment, tolerance: number, targetShape: unknown): Segment | undefined;

  /**
   * 序列化为 JSON
   * @returns JSON 对象
   */
  toJSON(): CoupleJSON;

  /**
   * 从 JSON 数据反序列化
   * @param data - JSON 数据
   * @param view - 视图对象
   * @returns Couple 实例（具体类型根据 type 字段确定）
   */
  static deCouple(data: CoupleJSON, view: IView): Connector | WallCornerJoiner | PanoramicCornerJoiner | CornerJoiner;

  /**
   * 拖拽调整长度
   * @param edgeIndex - 边的索引
   * @param dragVector - 拖拽向量
   */
  dragLength(edgeIndex: number, dragVector: Vector): void;

  /**
   * 显示/隐藏可视化形状
   * @param hide - true 为隐藏，false 为显示
   */
  vshapesHide(hide: boolean): void;

  /**
   * 获取外部边缘数组
   */
  private get outerEdges(): Segment[];

  /**
   * 获取中心边缘
   */
  private get centerEdge(): Segment;

  /**
   * 高亮显示
   * @param highlight - 是否高亮
   */
  private highlight(highlight: boolean): void;

  /**
   * 显示机器人辅助工具
   * @param show - 是否显示
   */
  private showRobot(show: boolean): void;

  /**
   * 调整尺寸
   * @param newSize - 新尺寸值
   */
  private resize(newSize: number): void;

  /**
   * 从 JSON 反序列化（实例方法）
   * @param data - JSON 数据
   * @param view - 视图对象
   * @returns 当前实例
   */
  private deserialize(data: CoupleJSON, view: IView): this;

  /**
   * 获取父级变换矩阵数组
   */
  private getParentMatrices(): unknown[];
}