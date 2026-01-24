/**
 * VSnackbar - Vuetify 通知条组件
 * 用于向用户显示简短的临时消息
 */

import Vue, { VNode, CreateElement } from 'vue';
import VSheet from '../VSheet/VSheet';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import Toggleable from '../../mixins/toggleable';
import { factory as PositionableFactory } from '../../mixins/positionable';
import { convertToUnit, getSlot } from '../../util/helpers';
import { removed, deprecate } from '../../util/console';

/**
 * VSnackbar 组件的 Props 接口
 */
interface VSnackbarProps {
  /** 是否作为应用级组件，影响定位计算 */
  app: boolean;
  /** 是否居中显示 */
  centered: boolean;
  /** 内容区域的自定义 CSS 类名 */
  contentClass: string;
  /** 是否多行显示 */
  multiLine: boolean;
  /** 是否使用文本样式（无背景） */
  text: boolean;
  /** 自动关闭的超时时间（毫秒），-1 表示不自动关闭，0 已废弃 */
  timeout: number | string;
  /** 过渡动画名称，false 表示无动画 */
  transition: boolean | string;
  /** 是否垂直布局 */
  vertical: boolean;
  /** 是否绝对定位 */
  absolute: boolean;
  /** 是否固定在底部 */
  bottom: boolean;
  /** 是否固定在左侧 */
  left: boolean;
  /** 是否固定在右侧 */
  right: boolean;
  /** 是否固定在顶部 */
  top: boolean;
  /** 颜色主题 */
  color?: string;
  /** 是否浅色主题 */
  light: boolean;
  /** 是否深色主题 */
  dark: boolean;
  /** 是否使用轮廓样式 */
  outlined: boolean;
}

/**
 * VSnackbar 组件的 Data 接口
 */
interface VSnackbarData {
  /** 当前活动的超时定时器 ID */
  activeTimeout: number;
}

/**
 * VSnackbar 组件的 Computed 接口
 */
interface VSnackbarComputed {
  /** 组件的 CSS 类名对象 */
  classes: Record<string, boolean>;
  /** 是否有背景色 */
  hasBackground: boolean;
  /** 是否为深色主题 */
  isDark: boolean;
  /** 组件的内联样式 */
  styles: Partial<CSSStyleDeclaration> | Record<string, unknown>;
  /** 是否处于激活状态（从 Toggleable 继承） */
  isActive: boolean;
}

/**
 * Vuetify 应用层级配置接口
 */
interface VuetifyApplication {
  /** 顶部应用栏高度 */
  bar: number;
  /** 底部内容高度 */
  bottom: number;
  /** 页脚高度 */
  footer: number;
  /** 内嵌页脚高度 */
  insetFooter: number;
  /** 左侧导航宽度 */
  left: number;
  /** 右侧导航宽度 */
  right: number;
  /** 顶部内容高度 */
  top: number;
}

/**
 * Slot 作用域参数接口
 */
interface ActionSlotScope {
  attrs: {
    class: string;
  };
}

/**
 * VSnackbar 组件类型声明
 */
declare const VSnackbar: Vue.Component<
  VSnackbarData,
  Record<string, never>,
  VSnackbarComputed,
  VSnackbarProps
> & {
  name: 'v-snackbar';
  
  props: {
    app: { type: typeof Boolean };
    centered: { type: typeof Boolean };
    contentClass: { type: typeof String; default: string };
    multiLine: { type: typeof Boolean };
    text: { type: typeof Boolean };
    timeout: { type: [typeof Number, typeof String]; default: number };
    transition: { 
      type: [typeof Boolean, typeof String]; 
      default: string;
      validator: (value: unknown) => boolean;
    };
    vertical: { type: typeof Boolean };
  };

  data(): VSnackbarData;

  computed: {
    /** 计算组件所有 CSS 类名 */
    classes(): Record<string, boolean>;
    /** 计算是否显示背景色 */
    hasBackground(): boolean;
    /** 计算是否为深色模式 */
    isDark(): boolean;
    /** 计算组件的定位样式 */
    styles(): Partial<CSSStyleDeclaration> | Record<string, unknown>;
  };

  watch: {
    /** 监听激活状态变化，重新设置超时 */
    isActive: string;
    /** 监听超时时间变化，重新设置超时 */
    timeout: string;
  };

  /** 组件挂载后的生命周期钩子 */
  mounted(): void;
  
  /** 组件创建后的生命周期钩子 */
  created(): void;

  methods: {
    /**
     * 生成操作按钮区域的 VNode
     * @returns 操作区域的虚拟 DOM 节点
     */
    genActions(): VNode;

    /**
     * 生成内容区域的 VNode
     * @returns 内容区域的虚拟 DOM 节点
     */
    genContent(): VNode;

    /**
     * 生成包装容器的 VNode
     * @returns 包装容器的虚拟 DOM 节点
     */
    genWrapper(): VNode;

    /**
     * 生成过渡动画容器的 VNode
     * @returns 过渡容器的虚拟 DOM 节点
     */
    genTransition(): VNode;

    /**
     * 设置自动关闭的定时器
     * 根据 timeout 属性配置定时器，0 和 -1 不会自动关闭
     */
    setTimeout(): void;
  };

  /**
   * 渲染函数
   * @param createElement - Vue 的创建元素函数
   * @returns 组件的虚拟 DOM 节点
   */
  render(createElement: CreateElement): VNode;
};

export default VSnackbar;