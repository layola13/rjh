import type { CSSProperties, ReactNode } from 'react';

/**
 * 分割线类型
 */
export type DividerType = 'horizontal' | 'vertical';

/**
 * 分割线文本方向
 */
export type DividerOrientation = 'left' | 'right' | 'center';

/**
 * Divider 组件属性接口
 */
export interface DividerProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 分割线类型
   * @default 'horizontal'
   */
  type?: DividerType;

  /**
   * 分割线标题的位置
   * @default 'center'
   */
  orientation?: DividerOrientation;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 分割线中的文本内容
   */
  children?: ReactNode;

  /**
   * 是否虚线
   * @default false
   */
  dashed?: boolean;

  /**
   * 文字是否显示为普通正文样式
   * @default false
   */
  plain?: boolean;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 语义化结构，分割线角色
   * @default 'separator'
   */
  role?: string;
}

/**
 * 分割线组件
 * 用于分隔不同内容区域
 * 
 * @param props - Divider 组件属性
 * @returns React 元素
 */
declare function Divider(props: DividerProps): JSX.Element;

export default Divider;