import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconComponentProps } from './types'; // 假设存在的类型定义
import IconBase from './IconBase'; // 假设的基础图标组件
import iconData from './icon-data'; // 假设的图标数据

/**
 * 图标组件的属性接口
 */
interface IconProps extends IconComponentProps {
  /** 图标的引用 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 图标组件
 * 
 * @param props - 图标组件属性
 * @param ref - 转发的 ref 引用
 * @returns 渲染的图标元素
 */
const IconComponent = (
  props: Omit<IconProps, 'ref'>,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconData,
  });
};

/**
 * 带 ref 转发的图标组件
 */
const ForwardedIconComponent: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef(IconComponent);

export default ForwardedIconComponent;