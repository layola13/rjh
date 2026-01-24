/**
 * React组件：图标包装器组件
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 将传入的props与默认图标组合后渲染。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 */
interface IconBaseProps {
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据结构
 */
interface IconData {
  /**
   * 图标的SVG路径或内容
   */
  path?: string | string[];
  
  /**
   * 图标的viewBox属性
   */
  viewBox?: string;
  
  /**
   * 其他图标配置
   */
  [key: string]: unknown;
}

/**
 * 图标组件的完整属性类型
 */
type IconComponentProps = IconBaseProps & {
  /**
   * 图标数据
   */
  icon?: IconData;
  
  /**
   * ref引用
   */
  ref?: React.Ref<SVGSVGElement>;
};

/**
 * 导出的图标组件类型
 * 
 * 这是一个带有forwardRef的图标组件，支持ref转发到底层SVG元素
 */
declare const IconComponent: ForwardRefExoticComponent<
  ComponentPropsWithoutRef<'svg'> & 
  IconBaseProps & 
  RefAttributes<SVGSVGElement>
>;

export default IconComponent;

/**
 * 类型说明：
 * 
 * 1. IconBaseProps - 定义图标组件接受的基础属性
 * 2. IconData - 描述图标数据的结构
 * 3. IconComponentProps - 组件的完整属性类型
 * 4. IconComponent - 最终导出的组件类型，使用ForwardRefExoticComponent包装
 * 
 * 该组件通过forwardRef包装，允许父组件获取内部SVG元素的引用。
 * 组件内部将传入的props与默认图标数据合并后传递给底层渲染组件。
 */