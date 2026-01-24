/**
 * 绘制矩形交互操作类
 * 
 * 继承自 DrawExRectangleGizmo，提供矩形绘制功能的交互控制
 * 
 * @module DrawRectangleGizmo
 */

import type { HSApp } from './types';

/**
 * 矩形绘制交互控制器
 * 
 * 用于在 2D 草图中绘制矩形的 Gizmo 控制器
 * 提供矩形绘制时的提示信息和交互逻辑
 * 
 * @extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRectangleGizmo
 */
export declare class DrawRectangleGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRectangleGizmo {
  /**
   * 构造函数
   * 
   * 创建一个新的矩形绘制交互控制器实例
   */
  constructor();

  /**
   * 获取常规提示信息的国际化键名
   * 
   * 返回用于显示矩形绘制提示信息的本地化字符串键
   * 
   * @returns 提示信息的国际化键名
   * @protected
   */
  protected _getNormalTipKey(): string;
}