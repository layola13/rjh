/**
 * SVG 图像绘制通用工具类
 * 提供将图像绘制到 SVG 画布的功能
 */

import { HSCore } from './HSCore';

/**
 * 2D 包围盒接口
 */
interface Box2D {
  /**
   * 获取包围盒的四个角点坐标
   * @returns 角点坐标数组，按逆时针或顺时针顺序排列
   */
  getCornerPts(): Array<{ x: number; y: number }>;
}

/**
 * SVG 上下文接口
 */
interface SvgContext {
  /**
   * 获取 SVG 上下文对象
   * @returns 上下文对象，包含 pattern 方法
   */
  context(): {
    /**
     * 创建 SVG 图案填充
     * @param width 图案宽度
     * @param height 图案高度
     * @param callback 图案内容构建回调
     * @returns 图案对象
     */
    pattern(
      width: number,
      height: number,
      callback: (element: SvgElement) => void
    ): SvgPattern;
  };
}

/**
 * SVG 元素接口
 */
interface SvgElement {
  /**
   * 添加图像元素
   * @param src 图像源路径
   * @returns 图像元素对象
   */
  image(src: string): {
    /**
     * 设置图像尺寸
     * @param width 宽度
     * @param height 高度
     */
    size(width: number, height: number): void;
  };
}

/**
 * SVG 图案接口
 */
interface SvgPattern {
  /**
   * 设置图案属性
   * @param attributes 属性对象
   */
  attr(attributes: { x: number; y: number }): void;
}

/**
 * SVG 多边形接口
 */
interface SvgPolygon {
  /**
   * 设置多边形描边样式
   * @param options 描边选项
   * @returns 当前多边形对象（支持链式调用）
   */
  stroke(options: { width: number }): this;

  /**
   * 设置多边形填充
   * @param pattern 填充图案
   */
  fill(pattern: SvgPattern): void;
}

/**
 * SVG 分组接口
 */
interface SvgGroup {
  /**
   * 在分组中创建多边形
   * @param points 多边形顶点坐标字符串，格式："x1,y1, x2,y2, ..."
   * @returns 多边形对象
   */
  polygon(points: string): SvgPolygon;
}

/**
 * SVG 节点接口
 */
interface SvgNode {
  /**
   * 创建 SVG 分组元素
   * @returns 分组对象
   */
  group(): SvgGroup;
}

/**
 * 绘制图像参数接口
 */
interface DrawImageParams {
  /** 单位缩放比例 */
  unitScale: number;
  /** 图像源路径 */
  image: string;
  /** 2D 包围盒对象 */
  box2d: Box2D;
  /** SVG 上下文对象 */
  svgContext: SvgContext;
  /** SVG 根节点对象 */
  svgNode: SvgNode;
}

/**
 * 点坐标接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * SVG 通用绘制工具类
 * 负责将图像按指定包围盒绘制到 SVG 画布
 */
export declare class SvgCommon {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 在 SVG 画布上绘制图像
   * 
   * 工作流程：
   * 1. 将包围盒角点转换为 SVG 坐标系（Y 轴翻转，应用缩放）
   * 2. 计算边界框 [x, y, width, height]
   * 3. 创建多边形作为图像容器
   * 4. 使用 pattern 填充实现图像渲染
   * 
   * @param params 绘制参数对象
   * @param params.unitScale 坐标单位到像素的缩放比例
   * @param params.image 图像资源路径或 data URL
   * @param params.box2d 定义图像放置位置的 2D 包围盒
   * @param params.svgContext SVG 上下文对象，用于创建图案
   * @param params.svgNode SVG 根节点，用于添加图形元素
   * 
   * @remarks
   * - 坐标精度：保留 3 位小数（缩放因子 1000）
   * - Y 轴处理：输入坐标 Y 值取反以适配 SVG 坐标系
   * - 如果边界计算失败（getBounds 返回 null），方法静默退出
   */
  drawImage(params: DrawImageParams): void;
}