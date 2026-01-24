/**
 * 属性栏开关组件的类型定义
 * @module PropertyBarSwitch
 */

import type { ReactElement } from 'react';
import type { SwitchProps } from 'antd';

/**
 * 图标配置接口
 */
export interface IconConfig {
  /** 图标类型，默认为 "hs_shuxingmianban_xiangqing" */
  type?: string;
  /** 图标的提示文本 */
  tooltip?: string;
}

/**
 * 属性栏开关组件的数据配置
 */
export interface PropertyBarSwitchData extends Omit<SwitchProps, 'disabled'> {
  /** 开关标签文本 */
  label?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 是否禁用开关 */
  disabled?: boolean;
  /** 图标配置 */
  icon?: IconConfig;
}

/**
 * 属性栏开关组件的属性接口
 */
export interface PropertyBarSwitchProps {
  /** 组件数据配置 */
  data: PropertyBarSwitchData;
  /** 组件唯一标识符 */
  id?: string;
}

/**
 * 属性栏开关组件
 * 
 * 用于在属性面板中渲染一个带标签和可选图标的开关控件
 * 
 * @param props - 组件属性
 * @returns 属性栏开关组件
 * 
 * @example
 *