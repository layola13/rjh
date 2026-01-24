import * as React from 'react';

/**
 * 响应式断点配置
 */
export interface ResponsiveBreakpointSettings {
  /** 断点宽度（像素） */
  breakpoint: number;
  /** 该断点下的轮播图设置，可设置为 "unslick" 以禁用轮播 */
  settings: SliderSettings | 'unslick';
}

/**
 * 轮播图核心配置选项
 */
export interface SliderSettings {
  /** 是否启用中心模式（使当前幻灯片居中） */
  centerMode?: boolean;
  /** 每次滚动的幻灯片数量 */
  slidesToScroll?: number;
  /** 是否启用淡入淡出效果 */
  fade?: boolean;
  /** 同时显示的幻灯片数量 */
  slidesToShow?: number;
  /** 是否允许可变宽度的幻灯片 */
  variableWidth?: boolean;
  /** 行数（用于网格布局） */
  rows?: number;
  /** 每行幻灯片数量 */
  slidesPerRow?: number;
  /** 是否禁用轮播功能 */
  unslick?: boolean;
  /** 其他任意轮播配置 */
  [key: string]: unknown;
}

/**
 * Slider 组件的属性接口
 */
export interface SliderProps extends SliderSettings {
  /** 子元素（幻灯片内容） */
  children?: React.ReactNode;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 响应式配置数组 */
  responsive?: ResponsiveBreakpointSettings[];
}

/**
 * 媒体查询监听器配置
 */
interface ResponsiveMediaHandler {
  /** MediaQueryList 对象 */
  mql: MediaQueryList;
  /** 媒体查询字符串 */
  query: string;
  /** 监听器回调函数 */
  listener: (event: MediaQueryListEvent | MediaQueryList) => void;
}

/**
 * Slider 组件内部状态
 */
interface SliderState {
  /** 当前激活的断点宽度，null 表示最大断点 */
  breakpoint: number | null;
}

/**
 * InnerSlider 实例接口（内部轮播核心）
 */
interface InnerSliderInstance {
  /** 切换到上一张幻灯片 */
  slickPrev(): void;
  /** 切换到下一张幻灯片 */
  slickNext(): void;
  /** 跳转到指定索引的幻灯片 */
  slickGoTo(index: number, dontAnimate?: boolean): void;
  /** 暂停自动播放 */
  pause(pauseType: 'paused'): void;
  /** 开始自动播放 */
  autoPlay(playType: 'play'): void;
}

/**
 * React Slick 轮播图组件
 * 
 * @description
 * 提供响应式轮播图功能，支持多种布局模式（单行、多行、网格）、
 * 淡入淡出效果、中心模式以及响应式断点配置。
 * 
 * @example
 *