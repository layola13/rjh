import React from 'react';
import PropTypes from 'prop-types';

/**
 * ScrollTip 组件的属性接口
 */
export interface ScrollTipProps {
  /** 容器元素的 CSS 类名 */
  containerEleClass: string;
  /** 组件的唯一标识符 */
  id: string;
  /** 容器元素的索引（当页面存在多个相同类名的元素时使用） */
  index?: number;
  /** 额外的高度偏移量，用于计算是否显示滚动提示 */
  extraHeight?: number;
  /** 自定义样式对象 */
  style?: React.CSSProperties & { width?: number };
  /** 是否使用蓝色主题 */
  blueTheme?: boolean;
}

/**
 * ScrollTip 组件的状态接口
 */
export interface ScrollTipState {
  /** 是否显示滚动提示 */
  show: boolean;
}

/**
 * 滚动提示组件
 * 用于在可滚动容器底部显示一个提示箭头，提醒用户还有更多内容可以滚动查看
 * 
 * @example
 *