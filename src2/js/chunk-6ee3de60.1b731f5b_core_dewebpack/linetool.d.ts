/**
 * 线条工具模块
 * 提供用于绘制和管理线条（如竖框/横框）的交互工具
 */

import { Line } from './Line';
import { Tool, ToolType } from './Tool';
import type { View } from './View';
import type { Point } from './Point';

/**
 * 线条工具类
 * 用于在视图中添加线条（竖框）元素
 * @extends Tool
 */
export declare class LineTool extends Tool {
  /**
   * 关联的视图实例
   */
  protected view: View;

  /**
   * 线条的法向量或方向向量
   */
  protected norm: Point | number[];

  /**
   * 当前鼠标指针位置
   */
  protected curPt: Point;

  /**
   * 创建线条工具实例
   * @param view - 视图实例，用于管理绘图区域和图形对象
   * @param norm - 线条的法向量，定义线条的方向和朝向
   */
  constructor(view: View, norm: Point | number[]);

  /**
   * 鼠标抬起事件处理器
   * 在鼠标释放时创建并添加线条对象到视图，并记录撤销/重做检查点
   * @param event - 鼠标事件对象
   */
  mouseup(event: MouseEvent): void;
}

/**
 * 视图接口（补充声明）
 */
declare interface View {
  /**
   * 图形管理器，负责添加和管理图形元素
   */
  shapeManager: {
    /**
     * 添加竖框线条
     * @param line - 线条实例
     */
    addMullion(line: Line): void;
  };

  /**
   * 备忘录管理器，负责撤销/重做功能
   */
  mometoManager: {
    /**
     * 记录当前状态检查点
     */
    checkPoint(): void;
  };
}

/**
 * 点坐标接口（补充声明）
 */
declare interface Point {
  x: number;
  y: number;
}