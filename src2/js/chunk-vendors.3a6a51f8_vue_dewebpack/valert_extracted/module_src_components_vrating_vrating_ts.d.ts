/**
 * VRating 组件类型定义
 * 评分组件，支持整星和半星评分、悬停效果、自定义图标等功能
 */

import Vue, { VNode, VNodeDirective, CreateElement } from 'vue';

/**
 * 单个评分项的状态属性
 */
export interface RatingItemProps {
  /** 当前项的索引 */
  index: number;
  /** 当前评分值 */
  value: number;
  /** 点击事件处理函数 */
  click: (event: MouseEvent) => void;
  /** 是否已填充（满星） */
  isFilled: boolean;
  /** 是否悬停状态 */
  isHovered: boolean;
  /** 是否半星悬停状态（仅在 halfIncrements 为 true 时存在） */
  isHalfHovered?: boolean;
  /** 是否半星填充状态（仅在 halfIncrements 为 true 时存在） */
  isHalfFilled?: boolean;
}

/**
 * 图标组件的属性
 */
export interface IconProps {
  dark: boolean;
  large: boolean;
  light: boolean;
  medium: boolean;
  size: number | string;
  small: boolean;
  xLarge: boolean;
  xSmall: boolean;
}

/**
 * VRating 组件属性
 */
export interface VRatingProps {
  /** 背景色（未选中星星的颜色） */
  backgroundColor?: string;
  /** 前景色（已选中星星的颜色） */
  color?: string;
  /** 是否可清除（点击当前值可清零） */
  clearable?: boolean;
  /** 是否紧凑模式 */
  dense?: boolean;
  /** 空星图标 */
  emptyIcon?: string;
  /** 满星图标 */
  fullIcon?: string;
  /** 半星图标 */
  halfIcon?: string;
  /** 是否启用半星增量 */
  halfIncrements?: boolean;
  /** 是否启用悬停效果 */
  hover?: boolean;
  /** 星星总数 */
  length?: number | string;
  /** 是否只读 */
  readonly?: boolean;
  /** 图标尺寸 */
  size?: number | string;
  /** 当前评分值 */
  value?: number;
  /** 图标的无障碍标签（国际化键） */
  iconLabel?: string;
  /** 深色主题 */
  dark?: boolean;
  /** 大尺寸 */
  large?: boolean;
  /** 浅色主题 */
  light?: boolean;
  /** 中等尺寸 */
  medium?: boolean;
  /** 小尺寸 */
  small?: boolean;
  /** 超大尺寸 */
  xLarge?: boolean;
  /** 超小尺寸 */
  xSmall?: boolean;
  /** 是否启用涟漪效果 */
  ripple?: boolean;
}

/**
 * VRating 组件内部数据
 */
export interface VRatingData {
  /** 悬停的星星索引 */
  hoverIndex: number;
  /** 内部评分值（用于双向绑定） */
  internalValue: number;
}

/**
 * VRating 组件计算属性
 */
export interface VRatingComputed {
  /** 指令配置（涟漪效果） */
  directives: VNodeDirective[];
  /** 图标组件的属性对象 */
  iconProps: IconProps;
  /** 是否处于悬停状态 */
  isHovering: boolean;
}

/**
 * VRating 组件方法
 */
export interface VRatingMethods {
  /**
   * 创建点击事件处理函数
   * @param index - 星星索引
   * @returns 点击事件处理函数
   */
  createClickFn(index: number): (event: MouseEvent) => void;

  /**
   * 创建评分项属性对象
   * @param index - 星星索引
   * @returns 评分项属性
   */
  createProps(index: number): RatingItemProps;

  /**
   * 生成悬停索引
   * @param event - 鼠标事件
   * @param index - 星星索引
   * @returns 悬停索引值
   */
  genHoverIndex(event: MouseEvent, index: number): number;

  /**
   * 获取图标名称
   * @param props - 评分项属性
   * @returns 图标名称
   */
  getIconName(props: RatingItemProps): string;

  /**
   * 获取图标颜色
   * @param props - 评分项属性
   * @returns 颜色值
   */
  getColor(props: RatingItemProps): string;

  /**
   * 判断是否为半星事件（鼠标点击/悬停在星星左半部分）
   * @param event - 鼠标事件
   * @returns 是否为半星事件
   */
  isHalfEvent(event: MouseEvent): boolean;

  /**
   * 鼠标进入事件处理
   * @param event - 鼠标事件
   * @param index - 星星索引
   */
  onMouseEnter(event: MouseEvent, index: number): void;

  /**
   * 鼠标离开事件处理
   */
  onMouseLeave(): void;

  /**
   * 生成单个评分项 VNode
   * @param index - 星星索引
   * @returns VNode
   */
  genItem(index: number): VNode;
}

/**
 * VRating 组件定义
 * 
 * @example
 *