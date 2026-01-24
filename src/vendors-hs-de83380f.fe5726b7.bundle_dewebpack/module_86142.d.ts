import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 扩展自标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 图标组件类型
 * 支持 ref 转发的 React 组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个使用 forwardRef 包装的图标组件，支持传递 ref 到底层 SVG 元素
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;