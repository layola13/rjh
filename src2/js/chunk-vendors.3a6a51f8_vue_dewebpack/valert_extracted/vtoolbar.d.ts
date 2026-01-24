/**
 * VToolbar 组件模块
 * 提供工具栏及其子组件的类型定义
 */

import { VueConstructor } from 'vue';
import { FunctionalComponentOptions } from 'vue/types/options';

/**
 * 工具栏主组件
 * 用于创建应用程序的顶部工具栏或导航栏
 */
export declare const VToolbar: VueConstructor;

/**
 * 工具栏项目容器组件
 * 用于包裹工具栏中的操作按钮或其他交互元素
 * 应用 CSS 类: v-toolbar__items
 */
export declare const VToolbarItems: FunctionalComponentOptions;

/**
 * 工具栏标题组件
 * 用于显示工具栏的标题文本
 * 应用 CSS 类: v-toolbar__title
 */
export declare const VToolbarTitle: FunctionalComponentOptions;

/**
 * 默认导出对象
 * 包含所有 VToolbar 相关子组件的集合
 */
export interface VToolbarSubcomponents {
  /**
   * Vuetify 内部使用的子组件映射
   */
  $_vuetify_subcomponents: {
    /** 工具栏主组件 */
    VToolbar: VueConstructor;
    /** 工具栏项目容器组件 */
    VToolbarItems: FunctionalComponentOptions;
    /** 工具栏标题组件 */
    VToolbarTitle: FunctionalComponentOptions;
  };
}

declare const _default: VToolbarSubcomponents;
export default _default;