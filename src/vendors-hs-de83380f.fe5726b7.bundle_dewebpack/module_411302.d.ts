/**
 * React图标组件模块
 * @module IconComponent
 * @description 导出一个转发ref的React图标组件
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @description 定义图标组件可接受的所有属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的宽度
   * @type {string | number}
   * @optional
   */
  width?: string | number;

  /**
   * 图标的高度
   * @type {string | number}
   * @optional
   */
  height?: string | number;

  /**
   * 图标的填充颜色
   * @type {string}
   * @optional
   */
  fill?: string;

  /**
   * 图标的类名
   * @type {string}
   * @optional
   */
  className?: string;

  /**
   * 图标的样式对象
   * @type {React.CSSProperties}
   * @optional
   */
  style?: React.CSSProperties;

  /**
   * 自定义图标数据(从模块488297导入)
   * @type {unknown}
   * @internal
   */
  icon?: unknown;
}

/**
 * 图标组件的渲染函数类型
 * @type {React.ForwardRefRenderFunction}
 * @description 接收属性和ref,返回包装后的图标元素
 */
type IconComponentRenderFunction = React.ForwardRefRenderFunction<
  SVGSVGElement,
  IconComponentProps
>;

/**
 * 图标组件类型
 * @type {React.ForwardRefExoticComponent}
 * @description 支持ref转发的React组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * @constant
 * @type {IconComponent}
 * @description 使用forwardRef包装的图标组件,允许父组件访问内部SVG元素的ref
 * 
 * @example
 *