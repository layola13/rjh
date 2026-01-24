/**
 * BlockSwatches - 色块选择器组件
 * 用于展示颜色色块网格,支持点击和悬停交互
 */

import { CSSProperties, ReactElement } from 'react';

/**
 * 色块选择器组件的属性接口
 */
export interface BlockSwatchesProps {
  /**
   * 颜色数组,每个元素为CSS颜色值(如 "#FF0000" 或 "rgb(255,0,0)")
   */
  colors: string[];

  /**
   * 色块点击事件处理函数
   * @param color - 被点击的颜色值
   * @param event - 原生点击事件
   */
  onClick?: (color: string, event: React.MouseEvent<HTMLElement>) => void;

  /**
   * 色块悬停事件处理函数
   * @param color - 被悬停的颜色值
   * @param event - 原生鼠标事件
   */
  onSwatchHover?: (color: string, event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * BlockSwatches 组件内部使用的样式对象结构
 * @internal
 */
interface BlockSwatchesStyles {
  /**
   * 色块容器样式
   * - marginRight: 负边距用于抵消最后一列色块的右边距
   */
  swatches: CSSProperties;

  /**
   * 单个色块样式
   * - width: 22px
   * - height: 22px
   * - float: left (左浮动布局)
   * - marginRight: 10px
   * - marginBottom: 10px
   * - borderRadius: 4px (圆角)
   */
  swatch: CSSProperties;

  /**
   * 清除浮动的样式
   * - clear: both
   */
  clear: CSSProperties;
}

/**
 * BlockSwatches 色块选择器组件
 * 
 * 渲染一个色块网格,每个色块显示一个颜色。
 * 支持点击选择颜色和鼠标悬停预览效果。
 * 
 * @example
 *