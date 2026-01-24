/**
 * Avatar 组件的属性接口
 */
export interface AvatarProps {
  /**
   * 组件的类名前缀
   * @default 'ant-avatar'
   */
  prefixCls: string;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 头像尺寸
   * - 'large': 大尺寸
   * - 'small': 小尺寸
   * - 'default': 默认尺寸
   * - number: 自定义像素值
   */
  size?: 'large' | 'small' | 'default' | number;

  /**
   * 头像形状
   * - 'circle': 圆形
   * - 'square': 方形
   * - 'round': 圆角方形
   */
  shape?: 'circle' | 'square' | 'round';
}

/**
 * Avatar 组件
 * 用于展示用户头像或图标
 * 
 * @param props - Avatar 组件属性
 * @returns React 元素
 * 
 * @example
 *