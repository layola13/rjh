import { VNode, CreateElement } from 'vue';
import { DirectiveOptions } from 'vue/types/options';

/**
 * VSpeedDial 组件的方向类型
 */
export type SpeedDialDirection = 'top' | 'right' | 'bottom' | 'left';

/**
 * VSpeedDial 组件的属性接口
 */
export interface VSpeedDialProps {
  /**
   * 速拨菜单展开的方向
   * @default 'top'
   */
  direction?: SpeedDialDirection;

  /**
   * 是否在鼠标悬停时打开菜单
   * @default false
   */
  openOnHover?: boolean;

  /**
   * 过渡动画名称
   * @default 'scale-transition'
   */
  transition?: string;

  /**
   * 是否绝对定位
   * @default false
   */
  absolute?: boolean;

  /**
   * 是否固定定位
   * @default false
   */
  fixed?: boolean;

  /**
   * 是否定位在顶部
   * @default false
   */
  top?: boolean;

  /**
   * 是否定位在右侧
   * @default false
   */
  right?: boolean;

  /**
   * 是否定位在底部
   * @default false
   */
  bottom?: boolean;

  /**
   * 是否定位在左侧
   * @default false
   */
  left?: boolean;

  /**
   * 过渡模式
   */
  mode?: string;

  /**
   * 过渡原点
   */
  origin?: string;

  /**
   * 是否处于激活状态
   */
  isActive?: boolean;
}

/**
 * VSpeedDial 组件的计算属性接口
 */
export interface VSpeedDialComputed {
  /**
   * 组件的 CSS 类对象
   */
  classes: Record<string, boolean>;
}

/**
 * VSpeedDial 组件的插槽接口
 */
export interface VSpeedDialSlots {
  /**
   * 激活按钮插槽（通常是 FAB 按钮）
   */
  activator?: VNode[];

  /**
   * 默认插槽，包含速拨菜单项（通常是 v-btn 或 v-tooltip）
   */
  default?: VNode[];
}

/**
 * VSpeedDial 组件的方法接口
 */
export interface VSpeedDialMethods {
  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @returns 渲染的 VNode
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VSpeedDial 组件接口
 * 
 * 速拨拨号组件，用于显示浮动操作按钮（FAB）及其相关操作
 * 支持四个方向展开、悬停触发、点击外部关闭等功能
 */
export interface VSpeedDial extends VSpeedDialProps, VSpeedDialComputed, VSpeedDialMethods {
  /**
   * 组件名称
   */
  readonly name: 'v-speed-dial';

  /**
   * 组件使用的指令
   */
  readonly directives: {
    ClickOutside: DirectiveOptions;
  };

  /**
   * 组件插槽
   */
  $slots: VSpeedDialSlots;
}

/**
 * VSpeedDial 组件构造函数
 */
declare const VSpeedDial: {
  new (): VSpeedDial;
};

export default VSpeedDial;