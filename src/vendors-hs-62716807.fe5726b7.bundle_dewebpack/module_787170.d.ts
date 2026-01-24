import type { CSSProperties, ReactElement } from 'react';
import type { TooltipPlacement } from 'antd/es/tooltip';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

/**
 * Avatar.Group 组件属性接口
 */
export interface AvatarGroupProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 容器类名
   */
  className?: string;

  /**
   * 容器样式
   */
  style?: CSSProperties;

  /**
   * 最多显示的头像数量，超出部分将折叠显示
   */
  maxCount?: number;

  /**
   * 折叠头像的样式
   */
  maxStyle?: CSSProperties;

  /**
   * 头像尺寸
   */
  size?: SizeType;

  /**
   * 子元素（Avatar 组件）
   */
  children?: ReactElement | ReactElement[];

  /**
   * 折叠头像气泡弹出位置
   * @default 'top'
   */
  maxPopoverPlacement?: TooltipPlacement;
}

/**
 * Avatar.Group 组件
 * 用于展示一组头像，支持折叠显示超出数量的头像
 * 
 * @param props - 组件属性
 * @returns Avatar.Group 组件
 */
declare function AvatarGroup(props: AvatarGroupProps): ReactElement;

export default AvatarGroup;