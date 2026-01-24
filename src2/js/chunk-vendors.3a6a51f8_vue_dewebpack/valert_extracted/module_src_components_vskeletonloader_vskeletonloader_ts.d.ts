/**
 * VSkeletonLoader 组件类型定义
 * 用于在内容加载时显示占位符骨架屏
 */

import Vue, { VNode, VNodeData, CreateElement } from 'vue';

/**
 * 骨架屏类型映射接口
 * 定义各种预设骨架屏类型及其对应的结构
 */
export interface SkeletonLoaderTypes {
  /** 操作按钮组：2个按钮 */
  actions?: string;
  /** 文章：标题 + 段落 */
  article?: string;
  /** 头像 */
  avatar?: string;
  /** 按钮 */
  button?: string;
  /** 卡片：图片 + 卡片标题 */
  card?: string;
  /** 带头像的卡片：图片 + 列表项头像 */
  'card-avatar'?: string;
  /** 卡片标题 */
  'card-heading'?: string;
  /** 芯片/标签 */
  chip?: string;
  /** 日期选择器完整结构 */
  'date-picker'?: string;
  /** 日期选择器选项区域 */
  'date-picker-options'?: string;
  /** 日期选择器日期区域 */
  'date-picker-days'?: string;
  /** 标题 */
  heading?: string;
  /** 图片 */
  image?: string;
  /** 单行列表项 */
  'list-item'?: string;
  /** 带头像的单行列表项 */
  'list-item-avatar'?: string;
  /** 双行列表项 */
  'list-item-two-line'?: string;
  /** 带头像的双行列表项 */
  'list-item-avatar-two-line'?: string;
  /** 三行列表项 */
  'list-item-three-line'?: string;
  /** 带头像的三行列表项 */
  'list-item-avatar-three-line'?: string;
  /** 段落：3行文本 */
  paragraph?: string;
  /** 句子：2行文本 */
  sentences?: string;
  /** 表格完整结构 */
  table?: string;
  /** 表格标题区域 */
  'table-heading'?: string;
  /** 表头 */
  'table-thead'?: string;
  /** 表格主体 */
  'table-tbody'?: string;
  /** 表格行（带分割线） */
  'table-row-divider'?: string;
  /** 表格行 */
  'table-row'?: string;
  /** 表格单元格 */
  'table-cell'?: string;
  /** 表格底部 */
  'table-tfoot'?: string;
  /** 文本行 */
  text?: string;
  /** 自定义类型 */
  [key: string]: string | undefined;
}

/**
 * 元素初始样式缓存接口
 * 用于在过渡动画中保存和恢复元素样式
 */
interface ElementInitialStyle {
  /** 原始 display 属性值 */
  display: string;
  /** 原始 transition 属性值 */
  transition: string;
}

/**
 * 扩展 HTMLElement 以支持样式缓存
 */
interface ExtendedHTMLElement extends HTMLElement {
  /** 初始样式缓存 */
  _initialStyle?: ElementInitialStyle;
}

/**
 * VSkeletonLoader 组件属性接口
 */
export interface VSkeletonLoaderProps {
  /** 是否为样板模式（无障碍属性） */
  boilerplate?: boolean;
  /** 是否处于加载状态 */
  loading?: boolean;
  /** 是否移除边框圆角 */
  tile?: boolean;
  /** 过渡动画名称 */
  transition?: string;
  /** 骨架屏类型 */
  type?: string;
  /** 自定义类型映射对象 */
  types?: SkeletonLoaderTypes;
}

/**
 * VSkeletonLoader 组件计算属性接口
 */
export interface VSkeletonLoaderComputed {
  /** 组件根元素的 HTML 属性 */
  attrs: Record<string, unknown>;
  /** 组件 CSS 类名对象 */
  classes: Record<string, boolean>;
  /** 是否处于加载状态 */
  isLoading: boolean;
  /** 根类型映射（内置 + 自定义） */
  rootTypes: SkeletonLoaderTypes;
}

/**
 * VSkeletonLoader 组件方法接口
 */
export interface VSkeletonLoaderMethods {
  /**
   * 生成单个骨架元素（bone）
   * @param type - 骨架类型（如 'text', 'avatar'）
   * @param children - 子节点数组
   * @returns VNode
   */
  genBone(type: string, children?: VNode[]): VNode;

  /**
   * 生成重复的骨架元素
   * @param typeWithCount - 类型@数量格式的字符串（如 'avatar@3'）
   * @returns VNode 数组
   */
  genBones(typeWithCount: string): VNode[];

  /**
   * 根据类型生成骨架结构
   * @param type - 骨架类型
   * @returns VNode 数组
   */
  genStructure(type?: string): VNode[];

  /**
   * 生成完整骨架或默认插槽内容
   * @returns VNode 或 VNode 数组
   */
  genSkeleton(): VNode | VNode[];

  /**
   * 将逗号分隔的类型字符串映射为骨架元素数组
   * @param types - 逗号分隔的类型字符串（如 'heading, paragraph'）
   * @returns VNode 数组
   */
  mapBones(types: string): VNode[];

  /**
   * 过渡进入前钩子：保存原始样式并禁用过渡
   * @param element - DOM 元素
   */
  onBeforeEnter(element: ExtendedHTMLElement): void;

  /**
   * 过渡离开前钩子：隐藏元素
   * @param element - DOM 元素
   */
  onBeforeLeave(element: ExtendedHTMLElement): void;

  /**
   * 重置元素样式为初始状态
   * @param element - DOM 元素
   */
  resetStyles(element: ExtendedHTMLElement): void;
}

/**
 * VSkeletonLoader 组件实例类型
 * 混合了 Elevatable（海拔阴影）、Measurable（尺寸测量）、Themeable（主题）三个 mixin
 */
declare const VSkeletonLoader: {
  new (): Vue & VSkeletonLoaderProps & VSkeletonLoaderComputed & VSkeletonLoaderMethods & {
    /** 海拔阴影 CSS 类 */
    elevationClasses: Record<string, boolean>;
    /** 主题 CSS 类 */
    themeClasses: Record<string, boolean>;
    /** 可测量样式对象 */
    measurableStyles: Record<string, string>;
  };
};

export default VSkeletonLoader;