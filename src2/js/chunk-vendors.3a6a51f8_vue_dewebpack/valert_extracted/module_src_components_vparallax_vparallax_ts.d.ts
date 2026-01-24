import { VNode, CreateElement } from 'vue';
import { Vue } from 'vue/types/vue';

/**
 * VParallax 组件接口
 * 提供视差滚动效果的图片容器组件
 */
export interface VParallaxProps {
  /**
   * 图片的 alt 属性，用于无障碍访问
   * @default ""
   */
  alt?: string;

  /**
   * 视差容器的高度（像素或字符串）
   * @default 500
   */
  height?: string | number;

  /**
   * 图片源地址
   */
  src?: string;

  /**
   * 响应式图片源集
   */
  srcset?: string;
}

/**
 * VParallax 组件数据接口
 */
export interface VParallaxData {
  /**
   * 组件是否已完成初始化
   */
  isBooted: boolean;
}

/**
 * VParallax 组件计算属性接口
 */
export interface VParallaxComputed {
  /**
   * 图片元素的样式对象
   * 包含显示、透明度和视差变换
   */
  styles: {
    display: string;
    opacity: number;
    transform: string;
  };
}

/**
 * VParallax 组件方法接口
 */
export interface VParallaxMethods {
  /**
   * 初始化视差效果
   * 设置图片加载监听器和滚动事件
   */
  init(): void;

  /**
   * 获取图片的原始高度
   * @returns 图片的自然高度（像素）
   */
  objHeight(): number;

  /**
   * 执行视差位移计算（继承自 translatable mixin）
   */
  translate(): void;

  /**
   * 注册滚动监听器（继承自 translatable mixin）
   */
  listeners(): void;

  /**
   * 视差偏移量（继承自 translatable mixin）
   */
  parallax: number;
}

/**
 * VParallax 组件引用接口
 */
export interface VParallaxRefs {
  /**
   * 图片 DOM 元素引用
   */
  img: HTMLImageElement;
}

/**
 * VParallax 视差滚动组件
 * 
 * @description
 * 创建具有视差滚动效果的图片容器。
 * 当页面滚动时，图片以不同的速度移动，产生深度感。
 * 
 * @example
 *