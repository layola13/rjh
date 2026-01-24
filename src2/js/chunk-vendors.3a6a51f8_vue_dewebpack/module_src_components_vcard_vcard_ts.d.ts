import Vue, { VNode, VNodeData } from 'vue';
import { VSheet } from '../VSheet';

/**
 * VCard组件的属性接口
 */
export interface VCardProps {
  /**
   * 移除卡片的阴影效果，使其呈现扁平样式
   * @default false
   */
  flat?: boolean;

  /**
   * 鼠标悬停时显示提升效果
   * @default false
   */
  hover?: boolean;

  /**
   * 背景图片URL，将作为卡片的背景图
   */
  img?: string;

  /**
   * 指示卡片是否为可点击链接
   * @default false
   */
  link?: boolean;

  /**
   * 加载指示器的高度
   * @default 4
   */
  loaderHeight?: number | string;

  /**
   * 应用提升阴影效果（与flat相反）
   * @default false
   */
  raised?: boolean;

  /**
   * 应用特定颜色到组件（继承自VSheet）
   */
  color?: string;

  /**
   * 是否显示加载状态（继承自Loadable mixin）
   */
  loading?: boolean;

  /**
   * 禁用卡片交互
   */
  disabled?: boolean;
}

/**
 * VCard组件的计算属性接口
 */
export interface VCardComputed {
  /**
   * 生成的CSS类对象
   * 合并了routable、loadable和sheet的类
   */
  classes: Record<string, boolean>;

  /**
   * 内联样式对象
   * 包含背景图片和VSheet的样式
   */
  styles: Record<string, string>;

  /**
   * 判断卡片是否可点击（继承自routable mixin）
   */
  isClickable: boolean;
}

/**
 * VCard组件的方法接口
 */
export interface VCardMethods {
  /**
   * 生成进度条元素
   * @returns 包裹进度条的div VNode或null
   */
  genProgress(): VNode | null;

  /**
   * 生成路由链接配置（继承自routable mixin）
   * @returns 包含tag和data的路由链接对象
   */
  generateRouteLink(): {
    tag: string;
    data: VNodeData;
  };

  /**
   * 设置背景颜色（继承自VSheet）
   * @param color - 颜色值
   * @param data - VNode数据对象
   * @returns 更新后的VNode数据对象
   */
  setBackgroundColor(color: string | undefined, data: VNodeData): VNodeData;
}

/**
 * VCard - Vuetify的Material Design卡片组件
 * 
 * 卡片是用于显示信息的纸片容器，支持多种样式和交互模式。
 * 继承了VSheet的样式能力，Loadable的加载状态，和Routable的路由功能。
 * 
 * @example
 *