/**
 * VCarouselItem 组件类型定义
 * 轮播图项组件，继承自 VWindowItem 和 Routable 混合
 */

import { VNode, VNodeData } from 'vue';
import { VWindowItem } from '../VWindow/VWindowItem';
import { Routable } from '../../mixins/routable';

/**
 * VCarousel 内部窗口组（注入的父级组件）
 */
interface WindowGroup {
  /** 内部高度 */
  internalHeight: string | number;
}

/**
 * VCarouselItem 组件实例类型
 * 用于轮播图中的单个项目展示
 */
export default interface VCarouselItem extends VWindowItem, Routable {
  /** 组件名称 */
  readonly name: 'v-carousel-item';
  
  /** 是否继承父组件属性 */
  readonly inheritAttrs: false;
  
  /** 注入的窗口组实例 */
  windowGroup: WindowGroup;
  
  /** 当前项是否激活 */
  isActive: boolean;

  /**
   * 生成默认插槽内容
   * @returns 包含 VImg 组件的 VNode 数组
   */
  genDefaultSlot(): VNode[];

  /**
   * 生成窗口项元素
   * @returns 渲染后的窗口项 VNode
   */
  genWindowItem(): VNode;

  /**
   * 生成路由链接（继承自 Routable）
   * @returns 路由链接信息
   */
  generateRouteLink(): {
    /** HTML 标签名或组件 */
    tag: string;
    /** VNode 数据对象 */
    data: VNodeData;
  };
}

/**
 * VCarouselItem 组件构造函数
 */
declare const VCarouselItem: {
  new (): VCarouselItem;
};

export { VCarouselItem };