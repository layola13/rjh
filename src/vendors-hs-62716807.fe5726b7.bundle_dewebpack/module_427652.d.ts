import type { CSSProperties, ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from 'react';

/**
 * 响应式断点类型
 * 定义了不同屏幕尺寸的断点键名
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * 响应式断点映射
 * 用于追踪各个断点是否激活
 */
export interface BreakpointMap {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

/**
 * 响应式间距配置
 * 可以为每个断点单独设置间距值
 */
export type ResponsiveGutter = Partial<Record<Breakpoint, number>>;

/**
 * 间距配置类型
 * - number: 统一的水平和垂直间距
 * - [horizontal, vertical]: 水平和垂直间距元组
 * - ResponsiveGutter: 响应式间距对象
 * - [ResponsiveGutter, ResponsiveGutter]: 响应式水平和垂直间距元组
 */
export type Gutter = number | [number, number] | ResponsiveGutter | [ResponsiveGutter, ResponsiveGutter];

/**
 * 水平对齐方式
 * - start: 起始对齐
 * - end: 结束对齐
 * - center: 居中对齐
 * - space-around: 两端留白均匀分布
 * - space-between: 两端对齐均匀分布
 */
export type JustifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

/**
 * 垂直对齐方式
 * - top: 顶部对齐
 * - middle: 中间对齐
 * - bottom: 底部对齐
 * - stretch: 拉伸填充
 */
export type AlignType = 'top' | 'middle' | 'bottom' | 'stretch';

/**
 * Row组件的属性接口
 */
export interface RowProps extends PropsWithChildren<{}> {
  /**
   * 自定义类名前缀
   * @default 'ant-row'
   */
  prefixCls?: string;

  /**
   * flex布局下的水平排列方式
   */
  justify?: JustifyType;

  /**
   * flex布局下的垂直对齐方式
   */
  align?: AlignType;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 栅格间隔,可以写成像素值或支持响应式的对象写法
   * - 单个数字: 水平和垂直间距相同
   * - 数组: [水平间距, 垂直间距]
   * - 对象: 响应式配置
   * @default 0
   */
  gutter?: Gutter;

  /**
   * 是否自动换行
   * @default true
   */
  wrap?: boolean;
}

/**
 * Row组件的Context值
 * 用于向子Col组件传递配置
 */
export interface RowContextValue {
  /**
   * 计算后的实际间距值 [水平间距, 垂直间距]
   */
  gutter: [number, number];

  /**
   * 是否自动换行
   */
  wrap?: boolean;
}

/**
 * Row栅格组件
 * 
 * @description
 * 24栅格系统的行组件,使用flex布局实现响应式栅格布局。
 * 配合Col组件使用,可以实现灵活的页面布局。
 * 
 * @example
 *