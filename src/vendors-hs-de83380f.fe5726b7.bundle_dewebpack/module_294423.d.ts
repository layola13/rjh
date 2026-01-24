/**
 * 图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件，
 * 通过传入特定的icon配置来渲染图标。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标的尺寸，可以是数字（像素）或字符串（如 '1em', '24px'） */
  size?: number | string;
  
  /** 图标的颜色 */
  color?: string;
  
  /** 图标的类名 */
  className?: string;
  
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  
  /** 图标的旋转角度 */
  rotate?: number;
  
  /** 图标是否旋转动画 */
  spin?: boolean;
  
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 带ref的图标组件类型
 * 
 * 该组件是一个forwardRef包装的React组件，支持ref转发到底层DOM元素。
 * 组件接收IconComponentProps作为属性，并可以转发ref到SVG元素或其他DOM节点。
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;