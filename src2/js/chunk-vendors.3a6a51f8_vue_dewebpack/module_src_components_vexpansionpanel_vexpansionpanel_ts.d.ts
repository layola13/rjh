/**
 * VExpansionPanel 组件类型定义
 * 可展开/折叠的面板组件，通常与 VExpansionPanels 配合使用
 */

import Vue from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * VExpansionPanel 组件的数据接口
 */
interface VExpansionPanelData {
  /** 面板内容组件实例 */
  content: Vue | null;
  /** 面板头部组件实例 */
  header: Vue | null;
  /** 下一个面板是否处于激活状态 */
  nextIsActive: boolean;
}

/**
 * VExpansionPanel 组件的属性接口
 */
interface VExpansionPanelProps {
  /** 是否禁用面板 */
  disabled?: boolean;
  /** 是否为只读模式 */
  readonly?: boolean;
}

/**
 * VExpansionPanel 组件的计算属性接口
 */
interface VExpansionPanelComputed {
  /** 组件的 CSS 类名对象 */
  classes: Record<string, boolean>;
  /** 面板是否被禁用（继承自父组件或自身属性） */
  isDisabled: boolean;
  /** 面板是否为只读（继承自父组件或自身属性） */
  isReadonly: boolean;
}

/**
 * VExpansionPanel 组件的方法接口
 */
interface VExpansionPanelMethods {
  /**
   * 注册面板内容组件
   * @param content - 内容组件实例
   */
  registerContent(content: Vue): void;

  /**
   * 注销面板内容组件
   */
  unregisterContent(): void;

  /**
   * 注册面板头部组件
   * @param header - 头部组件实例
   */
  registerHeader(header: Vue): void;

  /**
   * 注销面板头部组件
   */
  unregisterHeader(): void;

  /**
   * 处理点击事件
   * @param event - 鼠标点击事件
   */
  onClick(event: MouseEvent): void;

  /**
   * 切换面板的展开/折叠状态
   */
  toggle(): void;
}

/**
 * 从 groupable mixin 继承的属性
 */
interface GroupableProps {
  /** 组的 CSS 类名 */
  groupClasses: Record<string, boolean>;
  /** 面板是否处于激活状态 */
  isActive: boolean;
}

/**
 * 从父组件 VExpansionPanels 注入的属性
 */
interface ExpansionPanelsInjection {
  /** 父组件是否禁用所有面板 */
  disabled: boolean;
  /** 父组件是否设置所有面板为只读 */
  readonly: boolean;
}

/**
 * VExpansionPanel 组件实例类型
 */
type VExpansionPanelInstance = Vue & 
  VExpansionPanelProps & 
  VExpansionPanelData & 
  VExpansionPanelComputed & 
  VExpansionPanelMethods & 
  GroupableProps & {
    /** 注入的父组件 expansionPanels 实例 */
    expansionPanels: ExpansionPanelsInjection;
  };

/**
 * VExpansionPanel 组件定义
 * 可展开/折叠的面板组件
 * 
 * @example
 *