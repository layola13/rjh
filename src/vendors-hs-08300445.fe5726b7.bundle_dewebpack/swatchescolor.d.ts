import React from 'react';

/**
 * 色板颜色组件的属性接口
 */
export interface SwatchesColorProps {
  /**
   * 颜色值（支持任何有效的 CSS 颜色格式）
   */
  color: string;

  /**
   * 点击色板时的回调函数
   * @default () => {}
   */
  onClick?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * 鼠标悬停在色板上时的回调函数
   */
  onSwatchHover?: (color: string, event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * 是否为第一个色板（用于圆角样式）
   */
  first?: boolean;

  /**
   * 是否为最后一个色板（用于圆角样式）
   */
  last?: boolean;

  /**
   * 是否为当前激活/选中的色板
   */
  active?: boolean;
}

/**
 * 色板颜色组件
 * 
 * 用于显示单个颜色色板，支持点击选择和悬停交互。
 * 当色板被激活时会显示勾选标记。
 * 
 * @example
 *