/**
 * VListGroup 组件类型定义
 * 用于 Vuetify 列表中的可折叠分组项
 */

import Vue, { VNode, VNodeDirective, CreateElement } from 'vue';
import { RippleOptions } from '../../directives/ripple';

/**
 * VListGroup 组件的属性接口
 */
export interface VListGroupProps {
  /**
   * 激活状态时应用的 CSS 类名
   * @default ""
   */
  activeClass?: string;

  /**
   * 追加图标名称（显示在右侧的展开/收起图标）
   * @default "$expand"
   */
  appendIcon?: string;

  /**
   * 激活状态时的主题颜色
   * @default "primary"
   */
  color?: string;

  /**
   * 是否禁用该分组
   * @default false
   */
  disabled?: boolean;

  /**
   * 用于路由匹配的分组标识符
   * 当路由路径匹配此值时，分组将自动展开
   * @default undefined
   */
  group?: string;

  /**
   * 是否移除操作区域（不显示交互效果）
   * @default false
   */
  noAction?: boolean;

  /**
   * 前置图标名称（显示在左侧）
   * @default undefined
   */
  prependIcon?: string;

  /**
   * 波纹效果配置
   * 可以是布尔值或 Ripple 指令的选项对象
   * @default true
   */
  ripple?: boolean | RippleOptions;

  /**
   * 是否为子分组
   * 子分组会有不同的样式和行为
   * @default false
   */
  subGroup?: boolean;

  /**
   * 控制分组的展开/收起状态（v-model）
   * @default undefined
   */
  value?: boolean;
}

/**
 * VListGroup 组件的计算属性接口
 */
export interface VListGroupComputed {
  /**
   * 组件的动态 CSS 类名对象
   */
  classes: {
    'v-list-group--active': boolean;
    'v-list-group--disabled': boolean;
    'v-list-group--no-action': boolean;
    'v-list-group--sub-group': boolean;
  };
}

/**
 * VListGroup 组件的方法接口
 */
export interface VListGroupMethods {
  /**
   * 处理分组点击事件
   * @param event - 原生点击事件对象
   */
  click(event: MouseEvent): void;

  /**
   * 生成图标 VNode
   * @param iconName - 图标名称或配置
   * @returns 图标的 VNode
   */
  genIcon(iconName: string | object): VNode;

  /**
   * 生成追加图标（右侧图标）
   * @returns 追加图标的 VNode 或 null
   */
  genAppendIcon(): VNode | null;

  /**
   * 生成分组头部
   * @returns 头部的 VNode
   */
  genHeader(): VNode;

  /**
   * 生成分组内容项
   * @returns 内容项的 VNode 数组
   */
  genItems(): VNode[];

  /**
   * 生成前置图标（左侧图标）
   * @returns 前置图标的 VNode 或 null
   */
  genPrependIcon(): VNode | null;

  /**
   * 处理路由变化
   * @param route - Vue Router 的路由对象
   */
  onRouteChange(route: { path: string }): void;

  /**
   * 切换分组的展开/收起状态
   * @param uid - 组件的唯一标识符
   */
  toggle(uid: number): void;

  /**
   * 匹配路由路径
   * @param path - 当前路由路径
   * @returns 是否匹配成功
   */
  matchRoute(path: string): boolean;
}

/**
 * VListGroup 组件的事件接口
 */
export interface VListGroupEvents {
  /**
   * 点击分组头部时触发
   * @param event - 原生点击事件对象
   */
  click: MouseEvent;
}

/**
 * VListGroup 组件的插槽接口
 */
export interface VListGroupSlots {
  /**
   * 默认插槽 - 分组的内容项
   */
  default?: VNode[];

  /**
   * 激活器插槽 - 自定义分组头部内容
   */
  activator?: VNode[];

  /**
   * 追加图标插槽 - 自定义右侧图标
   */
  appendIcon?: VNode[];

  /**
   * 前置图标插槽 - 自定义左侧图标
   */
  prependIcon?: VNode[];
}

/**
 * VListGroup 组件定义
 * 
 * 一个可折叠的列表分组组件，支持嵌套、路由匹配和自定义图标
 * 
 * @example
 *