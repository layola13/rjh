/**
 * SVG门槛石渲染组件
 * 负责在SVG画布上绘制门洞的门槛石装饰
 */

import type { SvgBase } from './SvgBase';
import type { SvgPaints } from './SvgPaints';

/**
 * 应用程序上下文接口
 */
export interface App {
  // 应用程序相关属性和方法
  [key: string]: unknown;
}

/**
 * SVG渲染上下文接口
 */
export interface SvgContext {
  /**
   * 是否启用材质绘制
   */
  _withPaint: boolean;
  [key: string]: unknown;
}

/**
 * 几何外轮廓接口
 */
export interface GeometryOuter {
  // 外轮廓几何数据
  [key: string]: unknown;
}

/**
 * 原始几何数据接口
 */
export interface RawGeometry {
  /**
   * 外轮廓数据
   */
  outer: GeometryOuter;
  [key: string]: unknown;
}

/**
 * 门槛石表面接口
 */
export interface DoorStoneFace {
  /**
   * 原始几何数据
   */
  rawGeometry: RawGeometry;
  [key: string]: unknown;
}

/**
 * 门洞接口
 */
export interface Opening {
  /**
   * 获取门槛石表面数据
   * @returns 门槛石表面对象，如果不存在则返回null或undefined
   */
  getDoorStoneFace(): DoorStoneFace | null | undefined;
  [key: string]: unknown;
}

/**
 * SVG门槛石渲染类
 * 继承自SvgBase，用于在SVG画布上渲染门洞的门槛石装饰效果
 */
export declare class SvgDoorStone extends SvgBase {
  /**
   * 关联的门洞对象
   * @private
   */
  private readonly _opening: Opening;

  /**
   * SVG材质绘制器实例
   * @private
   */
  private _svgPaints?: SvgPaints;

  /**
   * 构造函数
   * @param app - 应用程序实例
   * @param context - SVG渲染上下文
   * @param opening - 门洞对象，包含门槛石几何信息
   */
  constructor(app: App, context: SvgContext, opening: Opening);

  /**
   * 构建SVG门槛石元素
   * 从门洞对象中提取门槛石几何数据并初始化材质绘制器
   * 仅在上下文启用材质绘制(_withPaint为true)时执行
   */
  build(): void;

  /**
   * 绘制SVG门槛石
   * 将门槛石渲染到SVG画布上
   * 仅在上下文启用材质绘制(_withPaint为true)且已构建材质绘制器时执行
   */
  draw(): void;
}