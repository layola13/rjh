/**
 * Slick Carousel 默认配置类型定义
 * 用于定义轮播组件的配置选项
 */

import React from 'react';

/**
 * 滑块变化前的回调函数类型
 */
type BeforeChangeCallback = (currentSlide: number, nextSlide: number) => void;

/**
 * 滑块变化后的回调函数类型
 */
type AfterChangeCallback = (currentSlide: number) => void;

/**
 * 边缘触发回调函数类型
 */
type OnEdgeCallback = (direction: 'left' | 'right') => void;

/**
 * 初始化回调函数类型
 */
type OnInitCallback = () => void;

/**
 * 重新初始化回调函数类型
 */
type OnReInitCallback = () => void;

/**
 * 懒加载错误回调函数类型
 */
type OnLazyLoadErrorCallback = (error: Error) => void;

/**
 * 滑动事件回调函数类型
 */
type SwipeEventCallback = (direction: 'left' | 'right') => void;

/**
 * 自定义分页按钮渲染函数类型
 */
type CustomPagingFunction = (index: number) => React.ReactElement;

/**
 * 自定义点指示器容器渲染函数类型
 */
type AppendDotsFunction = (dots: React.ReactNode) => React.ReactElement;

/**
 * 自定义箭头组件类型
 */
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * 响应式断点配置
 */
interface ResponsiveBreakpoint {
  /** 断点宽度 */
  breakpoint: number;
  /** 该断点下的配置选项 */
  settings: Partial<SlickCarouselSettings> | 'unslick';
}

/**
 * 懒加载模式类型
 */
type LazyLoadType = 'ondemand' | 'progressive' | null;

/**
 * Slick Carousel 完整配置选项接口
 */
interface SlickCarouselSettings {
  /** 启用可访问性功能（键盘导航等） */
  accessibility: boolean;
  
  /** 启用自适应高度，根据当前滑块调整容器高度 */
  adaptiveHeight: boolean;
  
  /** 滑块切换后的回调函数 */
  afterChange: AfterChangeCallback | null;
  
  /** 自定义点指示器容器的渲染函数 */
  appendDots: AppendDotsFunction;
  
  /** 显示上一个/下一个箭头 */
  arrows: boolean;
  
  /** 启用自动播放 */
  autoplay: boolean;
  
  /** 自动播放速度（毫秒） */
  autoplaySpeed: number;
  
  /** 滑块切换前的回调函数 */
  beforeChange: BeforeChangeCallback | null;
  
  /** 启用居中模式，当前滑块居中显示 */
  centerMode: boolean;
  
  /** 居中模式下的侧边内边距 */
  centerPadding: string;
  
  /** 添加到轮播容器的自定义类名 */
  className: string;
  
  /** CSS 缓动函数名称 */
  cssEase: string;
  
  /** 自定义分页按钮的渲染函数 */
  customPaging: CustomPagingFunction;
  
  /** 显示点指示器 */
  dots: boolean;
  
  /** 点指示器的类名 */
  dotsClass: string;
  
  /** 启用鼠标拖拽 */
  draggable: boolean;
  
  /** 缓动函数类型 */
  easing: string;
  
  /** 边缘摩擦力系数（0-1之间，禁用无限循环时的阻力） */
  edgeFriction: number;
  
  /** 启用淡入淡出效果 */
  fade: boolean;
  
  /** 点击滑块时聚焦到该滑块 */
  focusOnSelect: boolean;
  
  /** 启用无限循环 */
  infinite: boolean;
  
  /** 初始显示的滑块索引 */
  initialSlide: number;
  
  /** 懒加载模式：'ondemand'（按需）或 'progressive'（渐进式） */
  lazyLoad: LazyLoadType;
  
  /** 自定义下一个箭头组件 */
  nextArrow: React.ReactElement<ArrowProps> | null;
  
  /** 到达边缘时的回调函数 */
  onEdge: OnEdgeCallback | null;
  
  /** 初始化完成的回调函数 */
  onInit: OnInitCallback | null;
  
  /** 懒加载错误的回调函数 */
  onLazyLoadError: OnLazyLoadErrorCallback | null;
  
  /** 重新初始化完成的回调函数 */
  onReInit: OnReInitCallback | null;
  
  /** 鼠标悬停在点指示器上时暂停自动播放 */
  pauseOnDotsHover: boolean;
  
  /** 轮播获得焦点时暂停自动播放 */
  pauseOnFocus: boolean;
  
  /** 鼠标悬停时暂停自动播放 */
  pauseOnHover: boolean;
  
  /** 自定义上一个箭头组件 */
  prevArrow: React.ReactElement<ArrowProps> | null;
  
  /** 响应式断点配置数组 */
  responsive: ResponsiveBreakpoint[] | null;
  
  /** 每个滑块的行数 */
  rows: number;
  
  /** 启用从右到左（RTL）布局 */
  rtl: boolean;
  
  /** 滑块元素的标签名或选择器 */
  slide: string;
  
  /** 每行显示的滑块数量 */
  slidesPerRow: number;
  
  /** 每次滚动的滑块数量 */
  slidesToScroll: number;
  
  /** 同时显示的滑块数量 */
  slidesToShow: number;
  
  /** 滑块切换动画的速度（毫秒） */
  speed: number;
  
  /** 启用触摸滑动 */
  swipe: boolean;
  
  /** 滑动时触发的回调函数 */
  swipeEvent: SwipeEventCallback | null;
  
  /** 启用滑动到指定滑块（而非固定滚动数量） */
  swipeToSlide: boolean;
  
  /** 启用触摸移动 */
  touchMove: boolean;
  
  /** 触发滑动的最小触摸移动距离阈值（像素） */
  touchThreshold: number;
  
  /** 使用 CSS 过渡效果 */
  useCSS: boolean;
  
  /** 使用 CSS Transform 进行定位 */
  useTransform: boolean;
  
  /** 启用可变宽度滑块 */
  variableWidth: boolean;
  
  /** 启用垂直滚动模式 */
  vertical: boolean;
  
  /** 等待动画完成后才允许下次操作 */
  waitForAnimate: boolean;
}

/**
 * Slick Carousel 默认配置对象
 */
declare const defaultSettings: SlickCarouselSettings;

export default defaultSettings;
export type { 
  SlickCarouselSettings,
  BeforeChangeCallback,
  AfterChangeCallback,
  OnEdgeCallback,
  OnInitCallback,
  OnReInitCallback,
  OnLazyLoadErrorCallback,
  SwipeEventCallback,
  CustomPagingFunction,
  AppendDotsFunction,
  ArrowProps,
  ResponsiveBreakpoint,
  LazyLoadType
};