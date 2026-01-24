/**
 * PropertyBarText组件的类型定义
 * 用于显示属性栏文本内容
 */

import React from 'react';

/**
 * 属性栏文本组件的Props接口
 */
interface PropertyBarTextProps {
  /** 要显示的文本标签 */
  label: string;
}

/**
 * 属性栏文本组件
 * 渲染一个带有特定样式类名的文本容器
 * 
 * @param props - 组件属性
 * @returns React元素
 */
declare const PropertyBarText: React.FC<PropertyBarTextProps>;

/**
 * 默认导出函数
 * 接收字符串标签并渲染为PropertyBarText组件
 * 
 * @param label - 要显示的文本标签
 * @returns PropertyBarText组件实例
 */
declare function createPropertyBarText(label: string): React.ReactElement<PropertyBarTextProps>;

export default createPropertyBarText;