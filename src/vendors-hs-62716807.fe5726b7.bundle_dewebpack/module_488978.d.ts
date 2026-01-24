import React from 'react';

/**
 * 轮播图指示点位置
 */
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * 轮播图切换效果
 */
export type CarouselEffect = 'scrollx' | 'fade';

/**
 * 指示点配置
 */
export interface DotConfig {
  /** 自定义指示点类名 */
  className?: string;
}

/**
 * 轮播图组件属性
 */
export interface CarouselProps {
  /** 是否显示指示点，可传入配置对象 */
  dots?: boolean | DotConfig;
  
  /** 是否显示左右箭头 */
  arrows?: boolean;
  
  /** 是否可拖拽切换 */
  draggable?: boolean;
  
  /** 指示点位置 */
  dotPosition?: DotPosition;
  
  /** 是否自动播放 */
  autoplay?: boolean;
  
  /** 切换效果 */
  effect?: CarouselEffect;
  
  /** 初始化显示的幻灯片索引 */
  initialSlide?: number;
  
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 是否垂直显示 */
  vertical?: boolean;
  
  /** 子元素 */
  children?: React.ReactNode;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 轮播图组件实例方法
 */
export interface CarouselRef {
  /** 跳转到指定幻灯片 */
  goTo(slideIndex: number, dontAnimate?: boolean): void;
  
  /** 自动播放方法 */
  autoPlay(): void;
  
  /** 内部slider实例 */
  innerSlider: unknown;
  
  /** 切换到上一张 */
  prev(): void;
  
  /** 切换到下一张 */
  next(): void;
}

/**
 * 轮播图组件
 * 
 * @example
 *