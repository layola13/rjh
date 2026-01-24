/**
 * VItem 组件的类型定义
 * 用于 VItemGroup 中的可切换项目
 */

import Vue, { VNode, VueConstructor } from 'vue';

/**
 * 作用域插槽的参数接口
 */
interface ItemScopedSlotProps {
  /** 当前项目的激活状态 */
  active: boolean;
  /** 切换激活状态的方法 */
  toggle: () => void;
}

/**
 * BaseItem 组件的 Props 接口
 */
interface BaseItemProps {
  /** 激活状态时应用的 CSS 类名 */
  activeClass?: string;
  /** 项目的值，用于标识 */
  value?: any;
}

/**
 * BaseItem 组件的 Data 接口
 */
interface BaseItemData {
  /** 当前项目是否处于激活状态 */
  isActive: boolean;
}

/**
 * BaseItem 组件的方法接口
 */
interface BaseItemMethods {
  /** 切换项目的激活状态 */
  toggle(): void;
}

/**
 * BaseItem 组件的计算属性接口
 */
interface BaseItemComputed {}

/**
 * BaseItem 组件实例类型
 */
export type BaseItemInstance = Vue & BaseItemData & BaseItemMethods & BaseItemComputed;

/**
 * BaseItem 组件构造器
 * 提供基础的项目切换功能，通常作为 VItemGroup 的子组件使用
 */
export declare const BaseItem: VueConstructor<BaseItemInstance>;

/**
 * VItem 组件的 Props 接口
 * 继承自 BaseItem，并添加了 Groupable 混入的属性
 */
interface VItemProps extends BaseItemProps {}

/**
 * VItem 组件实例类型
 */
export type VItemInstance = BaseItemInstance;

/**
 * VItem 组件构造器
 * 完整的 VItem 组件，集成了 Groupable 功能
 * 
 * @example
 *