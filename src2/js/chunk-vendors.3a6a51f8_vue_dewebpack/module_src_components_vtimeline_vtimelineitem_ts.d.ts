/**
 * VTimelineItem 组件类型定义
 * 
 * 时间线项目组件，用于在 VTimeline 组件中显示单个时间点的内容
 */

import { VNode } from 'vue';
import { Vue } from 'vue/types/vue';

/**
 * Timeline 注入对象接口
 */
interface TimelineInjection {
  /** 是否反向显示时间线 */
  reverse: boolean;
}

/**
 * VTimelineItem 组件属性接口
 */
interface VTimelineItemProps {
  /** 
   * 圆点颜色
   * @default 'primary'
   */
  color?: string;
  
  /** 
   * 是否填充圆点
   * @default false
   */
  fillDot?: boolean;
  
  /** 
   * 是否隐藏圆点
   * @default false
   */
  hideDot?: boolean;
  
  /** 
   * 圆点内显示的图标名称
   */
  icon?: string;
  
  /** 
   * 图标颜色
   */
  iconColor?: string;
  
  /** 
   * 是否为大尺寸圆点
   * @default false
   */
  large?: boolean;
  
  /** 
   * 是否显示在左侧
   * @default false
   */
  left?: boolean;
  
  /** 
   * 是否显示在右侧
   * @default false
   */
  right?: boolean;
  
  /** 
   * 是否为小尺寸圆点
   * @default false
   */
  small?: boolean;
}

/**
 * VTimelineItem 插槽接口
 */
interface VTimelineItemSlots {
  /** 默认插槽 - 时间线项目的主要内容 */
  default?: VNode[];
  
  /** 图标插槽 - 自定义圆点内的图标 */
  icon?: VNode[];
  
  /** 对侧插槽 - 显示在时间线另一侧的内容 */
  opposite?: VNode[];
}

/**
 * VTimelineItem 计算属性接口
 */
interface VTimelineItemComputed {
  /** 是否有图标（通过 prop 或 slot） */
  hasIcon: boolean;
}

/**
 * VTimelineItem 方法接口
 */
interface VTimelineItemMethods {
  /**
   * 生成主体内容区域
   * @returns 主体内容的 VNode
   */
  genBody(): VNode;
  
  /**
   * 生成图标元素
   * @returns 图标的 VNode
   */
  genIcon(): VNode;
  
  /**
   * 生成内部圆点（包含图标）
   * @returns 内部圆点的 VNode
   */
  genInnerDot(): VNode;
  
  /**
   * 生成圆点容器
   * @returns 圆点容器的 VNode
   */
  genDot(): VNode;
  
  /**
   * 生成分隔线区域（包含圆点）
   * @returns 分隔线的 VNode
   */
  genDivider(): VNode;
  
  /**
   * 生成对侧内容区域
   * @returns 对侧内容的 VNode
   */
  genOpposite(): VNode;
}

/**
 * VTimelineItem 组件实例类型
 */
interface VTimelineItem extends Vue, VTimelineItemProps, VTimelineItemComputed, VTimelineItemMethods {
  /** 注入的 timeline 实例 */
  timeline: TimelineInjection;
  
  /** 组件插槽 */
  $slots: VTimelineItemSlots;
  
  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @returns 渲染的 VNode
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
}

/**
 * VTimelineItem 组件构造函数
 */
declare const VTimelineItem: {
  new (): VTimelineItem;
};

export default VTimelineItem;