/**
 * VCarousel组件模块
 * 提供轮播图容器和轮播项组件
 */

import type { Component } from 'vue';

/**
 * 轮播图容器组件
 * 用于展示可循环切换的内容列表
 */
export declare const VCarousel: Component;

/**
 * 轮播图项组件
 * 作为VCarousel的子组件，表示单个轮播内容
 */
export declare const VCarouselItem: Component;

/**
 * Vuetify子组件集合接口
 */
interface VuetifySubcomponents {
  /**
   * 轮播图容器组件
   */
  VCarousel: Component;
  
  /**
   * 轮播图项组件
   */
  VCarouselItem: Component;
}

/**
 * 默认导出对象
 * 包含所有VCarousel相关的子组件
 */
declare const _default: {
  /**
   * Vuetify内部使用的子组件映射
   */
  $_vuetify_subcomponents: VuetifySubcomponents;
};

export default _default;