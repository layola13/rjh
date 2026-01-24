/**
 * 填充阴影工具模块
 * 提供用于绘制和管理阴影填充的工具类
 */

import { FillersTool } from './FillersTool';
import { ShapeType } from './ShapeType';

/**
 * 填充阴影工具类
 * 继承自FillersTool，专门用于处理阴影类型的填充操作
 */
export declare class FillerShadeTool extends FillersTool {
  /**
   * 构造函数
   * 创建一个新的FillerShadeTool实例
   */
  constructor();

  /**
   * 改变填充器类型为阴影
   * @param context - 填充上下文对象，包含changeFillerType方法
   * @param filler - 当前填充器对象
   * @returns 返回修改后的填充器对象，如果修改成功则自动绘制到视图
   */
  changeFillerType(
    context: {
      changeFillerType(filler: unknown, shapeType: ShapeType): Filler | null;
    },
    filler: unknown
  ): void;

  /**
   * 视图对象引用
   * 用于渲染填充结果
   */
  protected view: View;
}

/**
 * 填充器接口
 * 表示可被绘制的填充对象
 */
interface Filler {
  /**
   * 绘制填充到指定视图
   * @param view - 目标视图对象
   */
  draw(view: View): void;
}

/**
 * 视图接口
 * 表示可渲染填充对象的视图
 */
interface View {
  // 视图相关属性和方法由FillersTool基类定义
}