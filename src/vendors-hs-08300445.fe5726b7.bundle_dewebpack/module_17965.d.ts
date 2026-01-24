/**
 * 自定义图标组件的类型定义
 * Module: module_17965
 * Original ID: 17965
 */

import type { ReactNode, ReactElement, MouseEvent } from 'react';

/**
 * 自定义图标属性接口
 */
interface CustomizeIconProps {
  /** 图标的附加属性，具体结构由使用方定义 */
  [key: string]: unknown;
}

/**
 * 图标包装组件的属性接口
 */
interface IconWrapperProps {
  /** 图标容器的CSS类名 */
  className: string;
  
  /** 自定义图标，可以是React元素或渲染函数 */
  customizeIcon?: ReactElement | ((props: CustomizeIconProps) => ReactElement);
  
  /** 传递给自定义图标渲染函数的属性 */
  customizeIconProps?: CustomizeIconProps;
  
  /** 鼠标按下事件处理器 */
  onMouseDown?: (event: MouseEvent<HTMLSpanElement>) => void;
  
  /** 点击事件处理器 */
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  
  /** 子元素内容（当未提供自定义图标时显示） */
  children?: ReactNode;
}

/**
 * 图标包装组件
 * 
 * 提供一个可自定义的图标容器，支持：
 * - 自定义图标渲染
 * - 禁用文本选择
 * - 鼠标事件处理
 * - 自动生成图标类名
 * 
 * @param props - 组件属性
 * @returns 渲染的图标元素
 */
declare function IconWrapper(props: IconWrapperProps): ReactElement;

export default IconWrapper;