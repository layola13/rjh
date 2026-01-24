/**
 * Space 组件的上下文定义
 * 用于在 Space 组件内部传递间距和索引信息
 */

import { Context } from 'react';

/**
 * Space 组件尺寸类型
 * 可以是预设的尺寸关键字或具体的数值
 */
export type SpaceSize = 'small' | 'middle' | 'large' | number;

/**
 * Space 组件的对齐方式
 */
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

/**
 * Space 组件的方向
 */
export type SpaceDirection = 'horizontal' | 'vertical';

/**
 * Space 上下文的值类型
 */
export interface SpaceContextValue {
  /**
   * 最后一个有效子元素的索引
   */
  latestIndex: number;
  
  /**
   * 水平方向的间距大小（像素）
   */
  horizontalSize: number;
  
  /**
   * 垂直方向的间距大小（像素）
   */
  verticalSize: number;
}

/**
 * Space 组件的属性接口
 */
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 间距大小
   * 可以是单个值或 [水平间距, 垂直间距] 数组
   * @default 'small'
   */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  
  /**
   * 对齐方式
   * 默认 horizontal 时为 'center'
   */
  align?: SpaceAlign;
  
  /**
   * 类名
   */
  className?: string;
  
  /**
   * 子元素
   */
  children?: React.ReactNode;
  
  /**
   * 间距方向
   * @default 'horizontal'
   */
  direction?: SpaceDirection;
  
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;
  
  /**
   * 分隔符元素
   */
  split?: React.ReactNode;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 是否自动换行（仅在 horizontal 时有效）
   * @default false
   */
  wrap?: boolean;
}

/**
 * Space 组件的上下文
 * 用于向 SpaceItem 子组件传递间距配置
 */
export declare const SpaceContext: Context<SpaceContextValue>;

/**
 * Space 间距组件
 * 设置组件之间的间距
 * 
 * @example
 *