/**
 * VAlert 组件类型定义
 * 警告/提示框组件，支持多种样式和交互功能
 */

import Vue, { VNode, VNodeData } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * 边框位置类型
 */
export type AlertBorderPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * 警告类型
 */
export type AlertType = 'info' | 'error' | 'success' | 'warning';

/**
 * VAlert 组件属性接口
 */
export interface VAlertProps {
  /**
   * 边框位置
   */
  border?: AlertBorderPosition;
  
  /**
   * 关闭按钮的无障碍标签
   * @default '$vuetify.close'
   */
  closeLabel?: string;
  
  /**
   * 边框是否使用彩色
   * @default false
   */
  coloredBorder?: boolean;
  
  /**
   * 是否为紧凑模式
   * @default false
   */
  dense?: boolean;
  
  /**
   * 是否可关闭
   * @default false
   */
  dismissible?: boolean;
  
  /**
   * 关闭按钮的图标
   * @default '$cancel'
   */
  closeIcon?: string;
  
  /**
   * 左侧图标，false 表示不显示图标
   * @default ''
   */
  icon?: string | false;
  
  /**
   * 是否为轮廓样式
   * @default false
   */
  outlined?: boolean;
  
  /**
   * 是否为突出显示模式
   * @default false
   */
  prominent?: boolean;
  
  /**
   * 是否为文本样式
   * @default false
   */
  text?: boolean;
  
  /**
   * 警告类型
   */
  type?: AlertType;
  
  /**
   * 是否显示警告框
   * @default true
   */
  value?: boolean;
}

/**
 * VAlert 组件计算属性接口
 */
export interface VAlertComputed {
  /**
   * 缓存的边框元素
   */
  __cachedBorder: VNode | null;
  
  /**
   * 缓存的关闭按钮元素
   */
  __cachedDismissible: VNode | null;
  
  /**
   * 缓存的图标元素
   */
  __cachedIcon: VNode | null;
  
  /**
   * 组件CSS类名
   */
  classes: Record<string, boolean>;
  
  /**
   * 计算后的颜色值
   */
  computedColor: string | undefined;
  
  /**
   * 计算后的图标名称
   */
  computedIcon: string | false;
  
  /**
   * 图标是否使用彩色
   */
  hasColoredIcon: boolean;
  
  /**
   * 是否为文本样式
   */
  hasText: boolean;
  
  /**
   * 图标颜色
   */
  iconColor: string | undefined;
  
  /**
   * 是否为暗色主题
   */
  isDark: boolean;
}

/**
 * VAlert 组件方法接口
 */
export interface VAlertMethods {
  /**
   * 生成包装容器元素
   * @returns VNode
   */
  genWrapper(): VNode;
  
  /**
   * 生成内容区域元素
   * @returns VNode
   */
  genContent(): VNode;
  
  /**
   * 生成警告框元素
   * @returns VNode
   */
  genAlert(): VNode;
  
  /**
   * 切换显示/隐藏状态
   */
  toggle(): void;
}

/**
 * VAlert 组件插槽接口
 */
export interface VAlertSlots {
  /**
   * 默认插槽：警告框内容
   */
  default?: VNode[];
  
  /**
   * 前置内容插槽
   */
  prepend?: VNode[];
  
  /**
   * 后置内容插槽
   */
  append?: VNode[];
}

/**
 * VAlert 组件作用域插槽接口
 */
export interface VAlertScopedSlots {
  /**
   * 自定义关闭按钮插槽
   * @param props 插槽属性
   * @param props.toggle 切换显示状态的方法
   */
  close?(props: { toggle: () => void }): VNode | VNode[];
}

/**
 * VAlert 组件实例类型
 */
export interface VAlertInstance extends Vue {
  readonly $props: VAlertProps;
  readonly $scopedSlots: VAlertScopedSlots;
  
  // 计算属性
  readonly __cachedBorder: VNode | null;
  readonly __cachedDismissible: VNode | null;
  readonly __cachedIcon: VNode | null;
  readonly classes: Record<string, boolean>;
  readonly computedColor: string | undefined;
  readonly computedIcon: string | false;
  readonly hasColoredIcon: boolean;
  readonly hasText: boolean;
  readonly iconColor: string | undefined;
  readonly isDark: boolean;
  
  // 方法
  genWrapper(): VNode;
  genContent(): VNode;
  genAlert(): VNode;
  toggle(): void;
  
  // 来自 Toggleable mixin
  isActive: boolean;
  
  // 来自 Transitionable mixin
  transition?: string;
  origin?: string;
  mode?: string;
}

/**
 * VAlert 组件声明
 */
declare const VAlert: {
  new (): VAlertInstance;
  
  /**
   * 组件名称
   */
  name: 'v-alert';
  
  /**
   * 组件属性定义
   */
  props: {
    border: {
      type: typeof String;
      validator: PropValidator<AlertBorderPosition>;
    };
    closeLabel: {
      type: typeof String;
      default: string;
    };
    coloredBorder: typeof Boolean;
    dense: typeof Boolean;
    dismissible: typeof Boolean;
    closeIcon: {
      type: typeof String;
      default: string;
    };
    icon: {
      default: string;
      type: [typeof Boolean, typeof String];
      validator: PropValidator<string | false>;
    };
    outlined: typeof Boolean;
    prominent: typeof Boolean;
    text: typeof Boolean;
    type: {
      type: typeof String;
      validator: PropValidator<AlertType>;
    };
    value: {
      type: typeof Boolean;
      default: boolean;
    };
  };
};

export default VAlert;