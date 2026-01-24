/**
 * VExpansionPanels 组件类型定义
 * 基于 Vuetify 的可折叠面板容器组件
 * @module VExpansionPanels
 */

import Vue, { VueConstructor } from 'vue';
import { BaseItemGroup } from '../VItemGroup/VItemGroup';

/**
 * VExpansionPanels 组件的 Props 接口
 */
export interface VExpansionPanelsProps {
  /** 手风琴模式：同时只能展开一个面板 */
  accordion?: boolean;
  /** 禁用所有面板 */
  disabled?: boolean;
  /** 扁平样式：移除边框和阴影 */
  flat?: boolean;
  /** 鼠标悬停时显示高亮效果 */
  hover?: boolean;
  /** 是否可通过键盘聚焦 */
  focusable?: boolean;
  /** 内嵌样式：添加内边距效果 */
  inset?: boolean;
  /** 弹出样式：展开时面板向外突出 */
  popout?: boolean;
  /** 只读模式：不可交互 */
  readonly?: boolean;
  /** 移除圆角，使用直角边框 */
  tile?: boolean;
}

/**
 * VExpansionPanels 组件的计算属性接口
 */
export interface VExpansionPanelsComputed {
  /** 组件的 CSS 类名对象 */
  classes: Record<string, boolean>;
}

/**
 * VExpansionPanels 组件的方法接口
 */
export interface VExpansionPanelsMethods {
  /**
   * 更新面板项的激活状态
   * @param item - 要更新的面板项实例
   * @param index - 面板项在列表中的索引
   */
  updateItem(item: Vue & { isActive: boolean; nextIsActive: boolean }, index: number): void;
}

/**
 * VExpansionPanels 组件的依赖注入接口
 */
export interface VExpansionPanelsProvide {
  /** 提供给子组件的面板容器实例引用 */
  expansionPanels: VExpansionPanelsInstance;
}

/**
 * VExpansionPanels 组件实例接口
 */
export interface VExpansionPanelsInstance extends Vue {
  accordion: boolean;
  disabled: boolean;
  flat: boolean;
  hover: boolean;
  focusable: boolean;
  inset: boolean;
  popout: boolean;
  readonly: boolean;
  tile: boolean;
  classes: Record<string, boolean>;
  updateItem(item: Vue & { isActive: boolean; nextIsActive: boolean }, index: number): void;
}

/**
 * VExpansionPanels 组件构造函数
 * 扩展自 BaseItemGroup，提供可折叠面板容器功能
 */
declare const VExpansionPanels: VueConstructor<
  VExpansionPanelsInstance &
  VExpansionPanelsProps &
  VExpansionPanelsComputed &
  VExpansionPanelsMethods
>;

export default VExpansionPanels;