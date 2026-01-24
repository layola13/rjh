/**
 * 自定义多边形绘制工具
 * 用于在画布上创建多边形，支持网格对齐和顶点捕捉功能
 */

import Konva from 'konva';
import { Point, Segment } from './geometry';
import { ToolType } from './tool-type';
import { WinPolygon } from './shapes/polygon';
import { ShapeColor } from './constants/colors';
import { Tool, ToolStep } from './base/tool';
import { DrawParams } from './draw-params';
import { Artisan } from './artisan';
import { View } from './view';

/**
 * 自定义多边形工具类
 * 继承自基础Tool类，实现交互式多边形绘制
 */
export declare class CustomPolygonTool extends Tool {
  /**
   * 网格间隔（像素）
   * @default 20
   */
  gridInterval: number;

  /**
   * 辅助多边形对象，用于实时预览绘制中的形状
   */
  aux: WinPolygon;

  /**
   * 第一个点的坐标
   */
  firstPt: Point;

  /**
   * 辅助图形的可视化对象
   */
  vshapeOfAux?: Konva.Shape;

  /**
   * 构造函数
   * @param view - 视图对象，包含画布和图层管理
   */
  constructor(view: View);

  /**
   * 鼠标按下事件处理
   * 记录第一个点并开始绘制流程
   * @param event - 鼠标事件对象
   */
  mousedown(event: MouseEvent): void;

  /**
   * 鼠标移动事件处理
   * 实时更新预览线段，显示捕捉提示
   * @param event - 鼠标事件对象
   */
  mousemove(event: MouseEvent): void;

  /**
   * 鼠标释放事件处理
   * 添加新的顶点，检测是否闭合多边形
   * @param event - 鼠标事件对象
   */
  mouseup(event: MouseEvent): void;

  /**
   * 获取网格对齐后的点坐标
   * 将当前光标位置对齐到最近的网格点
   * @returns 对齐后的点坐标
   */
  getSnapGridPoint(): Point;

  /**
   * 将当前点捕捉到网格
   * 更新 curPt 为网格对齐后的坐标
   */
  snapGridPoint(): void;

  /**
   * 调整当前点坐标
   * 按住Shift键时启用正交模式（水平或垂直约束）
   * @param shiftKey - 是否按下Shift键
   */
  adjustCurPt(shiftKey: boolean): void;

  /**
   * 检测当前点是否接近起始点
   * 用于判断是否可以闭合多边形
   * @param point - 要检测的点
   * @returns 是否接近起始点
   */
  closedToStart(point: Point): boolean;

  /**
   * 追加辅助边到预览多边形
   * @param endPoint - 新边的终点
   * @returns 更新后的多边形对象
   */
  appendAuxEdge(endPoint: Point): WinPolygon;

  /**
   * 回收辅助图形资源
   * 清理预览对象并重置状态
   */
  recyleAux(): void;

  /**
   * 绘制辅助预览图形
   * @param polygon - 要绘制的多边形对象
   */
  drawAux(polygon: WinPolygon): void;

  /**
   * 显示辅助网格
   * 创建并显示网格背景和坐标轴
   */
  showGrid(): void;

  /**
   * 隐藏辅助网格
   */
  hideGrid(): void;

  /**
   * 初始化工具
   * 显示网格并设置初始状态
   */
  initialTool(): void;

  /**
   * 清理工具资源
   * 隐藏网格并重置工具状态
   */
  cleanup(): void;

  /**
   * 重启工具
   * 清理当前绘制状态，准备开始新的多边形
   */
  restart(): void;
}