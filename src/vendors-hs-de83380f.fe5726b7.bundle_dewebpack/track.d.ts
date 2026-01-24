import * as React from 'react';

/**
 * 滑块配置选项接口
 * 定义了Track组件所需的所有配置参数
 */
export interface TrackProps {
  /** 是否从右到左显示 */
  rtl?: boolean;
  /** 幻灯片总数 */
  slideCount: number;
  /** 当前幻灯片索引 */
  index?: number;
  /** 当前激活的幻灯片索引 */
  currentSlide: number;
  /** 目标幻灯片索引 */
  targetSlide: number;
  /** 是否启用居中模式 */
  centerMode?: boolean;
  /** 每次滚动的幻灯片数量 */
  slidesToScroll: number;
  /** 同时显示的幻灯片数量 */
  slidesToShow: number;
  /** 是否启用无限循环 */
  infinite?: boolean;
  /** 是否启用淡入淡出效果 */
  fade?: boolean;
  /** 是否启用懒加载 */
  lazyLoad?: boolean;
  /** 已懒加载的幻灯片索引列表 */
  lazyLoadedList: number[];
  /** 幻灯片宽度 */
  slideWidth?: number;
  /** 幻灯片高度 */
  slideHeight?: number;
  /** 是否垂直显示 */
  vertical?: boolean;
  /** 动画速度（毫秒） */
  speed?: number;
  /** CSS缓动函数 */
  cssEase?: string;
  /** 是否使用CSS过渡 */
  useCSS?: boolean;
  /** 是否启用可变宽度 */
  variableWidth?: boolean;
  /** 是否在选择时聚焦 */
  focusOnSelect?: boolean | ((data: FocusSelectData) => void);
  /** 轨道自定义样式 */
  trackStyle?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
  /** 鼠标进入事件 */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** 鼠标悬停事件 */
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  /** 鼠标离开事件 */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * 聚焦选择回调数据
 */
export interface FocusSelectData {
  /** 消息类型 */
  message: string;
  /** 幻灯片索引 */
  index: number;
  /** 每次滚动的幻灯片数量 */
  slidesToScroll: number;
  /** 当前幻灯片索引 */
  currentSlide: number;
}

/**
 * 幻灯片类名状态接口
 * 描述各种幻灯片状态的CSS类
 */
export interface SlideClassNames {
  /** 基础幻灯片类名 */
  'slick-slide': boolean;
  /** 激活状态类名 */
  'slick-active': boolean;
  /** 居中状态类名 */
  'slick-center': boolean;
  /** 克隆状态类名 */
  'slick-cloned': boolean;
  /** 当前选中状态类名 */
  'slick-current': boolean;
}

/**
 * Track轨道组件类
 * 负责渲染和管理轮播图的幻灯片轨道
 * @extends React.PureComponent
 */
export class Track extends React.PureComponent<TrackProps> {
  /** DOM节点引用 */
  node: HTMLDivElement | null;

  /**
   * 处理DOM引用的回调函数
   * @param element - DOM元素引用
   */
  handleRef(element: HTMLDivElement | null): void;

  /**
   * 渲染Track组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

/**
 * 计算幻灯片的类名状态
 * @param props - Track组件属性
 * @returns 幻灯片类名状态对象
 */
export function getSlideClasses(props: TrackProps & { index: number }): SlideClassNames;

/**
 * 生成幻灯片的唯一键
 * @param element - React元素
 * @param index - 幻灯片索引
 * @returns 唯一键字符串
 */
export function getKey(element: React.ReactElement, index: number): string;

/**
 * 渲染所有幻灯片元素（包括克隆的幻灯片）
 * @param props - Track组件属性
 * @returns React元素数组
 */
export function renderSlides(props: TrackProps): React.ReactElement[];

/**
 * 计算幻灯片的内联样式
 * @param props - Track组件属性及索引
 * @returns CSS样式对象
 */
export function getSlideStyle(props: TrackProps & { index: number }): React.CSSProperties;