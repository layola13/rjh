import React from 'react';
import { SmartText } from './SmartText';
import { Icons } from './Icons';

/**
 * 完成环境按钮组件的数据属性
 */
export interface CompleteEnvBtnData {
  /**
   * 环境名称
   */
  envName: string;
  
  /**
   * 点击事件处理函数
   */
  handleClick: () => void;
  
  /**
   * 可选的第二名称
   */
  secondName?: string;
  
  /**
   * 第二名称的自定义样式类名
   */
  secondClass?: string;
}

/**
 * 完成环境按钮组件的属性
 */
export interface CompleteEnvBtnProps {
  /**
   * 组件数据配置
   */
  data: CompleteEnvBtnData;
}

/**
 * 完成环境按钮组件
 * 
 * 渲染一个包含返回箭头图标、环境名称和可选第二名称的按钮
 * 
 * @param props - 组件属性
 * @returns 完成环境按钮的React元素
 */
export default function CompleteEnvBtn(props: CompleteEnvBtnProps): React.ReactElement;