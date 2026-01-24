/**
 * 轮播面板导航组件类型定义
 * @module CarouselPanelNav
 */

/**
 * 导航项数据结构
 */
export interface CarouselNavItem {
  /** 导航项显示的图片URL */
  imageUrl: string;
  /** 导航项显示的文本标签 */
  label: string;
  /** 是否为全景图 */
  isPano?: boolean;
}

/**
 * 轮播面板导航组件的属性
 */
export interface CarouselPanelNavProps {
  /** 导航项列表 */
  items?: CarouselNavItem[];
  /** 当前激活的索引 */
  activeIndex?: number;
  /** 索引变化时的回调函数 */
  onChange?: (index: number) => void;
  /** 是否显示切换动画 */
  showAnimation?: boolean;
}

/**
 * 轮播面板导航组件
 * 用于展示一组可点击的缩略图导航，支持自动居中和动画效果
 * 
 * @param props - 组件属性
 * @returns React组件
 * 
 * @example
 *