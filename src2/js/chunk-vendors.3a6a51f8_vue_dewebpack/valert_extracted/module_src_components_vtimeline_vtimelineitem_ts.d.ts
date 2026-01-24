import { VNode, CreateElement } from 'vue';
import { Vue } from 'vue/types/vue';

/**
 * Timeline 注入的配置对象
 */
interface TimelineContext {
  /** 是否反向显示时间线 */
  reverse: boolean;
}

/**
 * VTimelineItem 组件的属性接口
 */
interface VTimelineItemProps {
  /** 点的颜色，默认为 'primary' */
  color?: string;
  /** 是否填充点 */
  fillDot?: boolean;
  /** 是否隐藏点 */
  hideDot?: boolean;
  /** 图标名称 */
  icon?: string;
  /** 图标颜色 */
  iconColor?: string;
  /** 是否为大尺寸 */
  large?: boolean;
  /** 是否在左侧显示 */
  left?: boolean;
  /** 是否在右侧显示 */
  right?: boolean;
  /** 是否为小尺寸 */
  small?: boolean;
}

/**
 * VTimelineItem 组件的插槽接口
 */
interface VTimelineItemSlots {
  /** 默认插槽：主体内容 */
  default?: VNode[];
  /** 图标插槽：自定义图标内容 */
  icon?: VNode[];
  /** 对立面插槽：显示在时间线另一侧的内容 */
  opposite?: VNode[];
}

/**
 * VTimelineItem 组件的计算属性接口
 */
interface VTimelineItemComputed {
  /** 是否有图标（通过 icon 属性或 icon 插槽） */
  hasIcon: boolean;
  /** 主题样式类名 */
  themeClasses: Record<string, boolean>;
}

/**
 * VTimelineItem 组件的方法接口
 */
interface VTimelineItemMethods {
  /**
   * 生成主体内容元素
   * @returns 主体内容的 VNode
   */
  genBody(): VNode;

  /**
   * 生成图标元素
   * @returns 图标的 VNode
   */
  genIcon(): VNode;

  /**
   * 生成内部点元素
   * @returns 内部点的 VNode
   */
  genInnerDot(): VNode;

  /**
   * 生成点元素
   * @returns 点的 VNode
   */
  genDot(): VNode;

  /**
   * 生成分隔线元素
   * @returns 分隔线的 VNode
   */
  genDivider(): VNode;

  /**
   * 生成对立面内容元素
   * @returns 对立面内容的 VNode
   */
  genOpposite(): VNode;

  /**
   * 设置背景颜色（来自 colorable mixin）
   * @param color - 颜色值
   * @returns 包含样式的对象
   */
  setBackgroundColor(color: string): { style?: Record<string, string>; class?: Record<string, boolean> };
}

/**
 * VTimelineItem 组件
 * 时间线项组件，用于在 VTimeline 中显示单个时间点的内容
 * 
 * @example
 *