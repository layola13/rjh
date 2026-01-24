/**
 * Skeleton Input Component
 * 骨架屏输入框组件的类型声明
 */

/**
 * Skeleton Input组件的属性接口
 */
export interface SkeletonInputProps {
  /**
   * 自定义类名前缀
   * @default 'skeleton'
   */
  prefixCls?: string;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 是否显示动画效果
   * @default false
   */
  active?: boolean;

  /**
   * 输入框的尺寸
   * @default 'default'
   */
  size?: 'large' | 'default' | 'small';

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * ConfigConsumer上下文提供的配置
 */
export interface ConfigConsumerProps {
  /**
   * 获取带有配置前缀的类名
   * @param suffixCls - 后缀类名
   * @param customizePrefixCls - 自定义前缀
   */
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

/**
 * Skeleton Input 函数组件
 * 用于在内容加载时显示占位输入框
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *