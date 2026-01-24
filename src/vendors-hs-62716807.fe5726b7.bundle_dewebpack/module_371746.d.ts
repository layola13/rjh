import type { CSSProperties, FC, ReactElement } from 'react';

/**
 * Skeleton图片占位符组件的属性接口
 */
export interface SkeletonImageProps {
  /**
   * 自定义类名前缀
   * @description 用于覆盖默认的组件样式前缀
   */
  prefixCls?: string;

  /**
   * 自定义CSS类名
   * @description 应用于最外层容器的类名
   */
  className?: string;

  /**
   * 自定义内联样式
   * @description 应用于图片占位符容器的样式对象
   */
  style?: CSSProperties;
}

/**
 * ConfigConsumer渲染函数的上下文参数
 */
export interface ConfigConsumerContext {
  /**
   * 获取带前缀的CSS类名
   * @param suffixCls - 后缀类名
   * @param customizePrefixCls - 自定义前缀类名
   * @returns 完整的CSS类名
   */
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

/**
 * Skeleton图片占位符组件
 * 
 * @description 
 * 用于在内容加载时显示占位图片的骨架屏组件。
 * 渲染一个带默认SVG图标的图片占位符,支持自定义样式和类名。
 * 
 * @example
 *