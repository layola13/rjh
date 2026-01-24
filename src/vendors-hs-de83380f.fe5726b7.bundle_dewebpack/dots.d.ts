import React from 'react';

/**
 * 点击事件处理器的消息类型
 */
export interface DotsClickMessage {
  /** 消息类型标识 */
  message: 'dots';
  /** 当前点的索引 */
  index: number;
  /** 每次滚动的幻灯片数量 */
  slidesToScroll: number;
  /** 当前激活的幻灯片索引 */
  currentSlide: number;
}

/**
 * Dots 组件的属性接口
 */
export interface DotsProps {
  /** 鼠标进入事件处理器 */
  onMouseEnter?: (event: React.MouseEvent<HTMLUListElement>) => void;
  /** 鼠标悬停事件处理器 */
  onMouseOver?: (event: React.MouseEvent<HTMLUListElement>) => void;
  /** 鼠标离开事件处理器 */
  onMouseLeave?: (event: React.MouseEvent<HTMLUListElement>) => void;
  /** 是否启用无限循环模式 */
  infinite: boolean;
  /** 每次滚动的幻灯片数量 */
  slidesToScroll: number;
  /** 每次显示的幻灯片数量 */
  slidesToShow: number;
  /** 幻灯片总数 */
  slideCount: number;
  /** 当前激活的幻灯片索引 */
  currentSlide: number;
  /** 点击导航点时的处理器 */
  clickHandler: (message: DotsClickMessage) => void;
  /** 自定义分页点的渲染函数 */
  customPaging: (index: number) => React.ReactElement;
  /** 自定义导航点容器的渲染函数 */
  appendDots: (dots: React.ReactNode[]) => React.ReactElement;
  /** 导航点容器的 CSS 类名 */
  dotsClass: string;
}

/**
 * 轮播图导航点组件
 * 用于显示和控制轮播图的当前位置，提供点击导航功能
 * 
 * @example
 *