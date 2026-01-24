import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承标准SVG元素属性
 */
export interface IconComponentProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /** 图标尺寸 */
  size?: string | number;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

/**
 * 图标组件类型
 * 支持ref转发到SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 使用forwardRef包装，支持ref转发
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;