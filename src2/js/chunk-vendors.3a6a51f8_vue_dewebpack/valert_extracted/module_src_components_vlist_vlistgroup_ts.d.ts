/**
 * VListGroup 组件类型定义
 * 可折叠的列表分组组件，支持嵌套子分组、图标、涟漪效果和路由匹配
 */

import Vue from 'vue';
import { VNode, VNodeData } from 'vue';
import { Route } from 'vue-router';

/**
 * 涟漪效果配置
 */
export interface RippleOptions {
  /** 涟漪颜色类名 */
  class?: string;
  /** 是否从中心扩散 */
  center?: boolean;
  /** 涟漪圆形区域 */
  circle?: boolean;
}

/**
 * 列表注册接口（由父级 VList 提供）
 */
export interface ListProvider {
  /** 注册列表项 */
  register(uid: Vue): void;
  /** 注销列表项 */
  unregister(uid: Vue): void;
  /** 处理列表项点击事件 */
  listClick(uid: number): void;
}

/**
 * VListGroup 组件属性
 */
export interface VListGroupProps {
  /** 激活状态的自定义类名 */
  activeClass?: string;
  /** 追加图标（右侧），默认为展开箭头 */
  appendIcon?: string;
  /** 激活时的主题颜色 */
  color?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 路由匹配分组的正则表达式字符串 */
  group?: string;
  /** 是否移除左侧操作区域 */
  noAction?: boolean;
  /** 前置图标（左侧） */
  prependIcon?: string;
  /** 涟漪效果配置，true 启用默认效果 */
  ripple?: boolean | RippleOptions;
  /** 是否为子分组 */
  subGroup?: boolean;
  /** 双向绑定的展开状态 */
  value?: boolean;
}

/**
 * VListGroup 组件计算属性
 */
export interface VListGroupComputed {
  /** 组件类名对象 */
  classes: {
    'v-list-group--active': boolean;
    'v-list-group--disabled': boolean;
    'v-list-group--no-action': boolean;
    'v-list-group--sub-group': boolean;
  };
}

/**
 * VListGroup 组件方法
 */
export interface VListGroupMethods {
  /**
   * 处理标题点击事件
   * @param event - 原生点击事件
   */
  click(event: MouseEvent): void;

  /**
   * 生成图标 VNode
   * @param icon - 图标名称或配置
   */
  genIcon(icon: string): VNode;

  /**
   * 生成追加图标（右侧）
   */
  genAppendIcon(): VNode | null;

  /**
   * 生成组件标题
   */
  genHeader(): VNode;

  /**
   * 生成子项容器
   */
  genItems(): VNode[];

  /**
   * 生成前置图标（左侧）
   */
  genPrependIcon(): VNode | null;

  /**
   * 路由变化时的回调
   * @param route - 新路由对象
   */
  onRouteChange(route: Route): void;

  /**
   * 切换展开/折叠状态
   * @param uid - 组件唯一标识
   */
  toggle(uid: number): void;

  /**
   * 判断路由路径是否匹配当前分组
   * @param path - 路由路径
   * @returns 是否匹配
   */
  matchRoute(path: string): boolean;
}

/**
 * VListGroup 组件数据
 */
export interface VListGroupData {
  /** 是否已激活（展开状态） */
  isActive: boolean;
  /** 是否已完成首次渲染 */
  isBooted: boolean;
  /** 父级列表实例 */
  list?: ListProvider;
}

/**
 * VListGroup 组件实例类型
 */
export interface VListGroup extends Vue, VListGroupData, VListGroupMethods {
  readonly $props: VListGroupProps;
}

/**
 * VListGroup 组件构造函数
 */
declare const VListGroup: {
  new (): VListGroup;
};

export default VListGroup;