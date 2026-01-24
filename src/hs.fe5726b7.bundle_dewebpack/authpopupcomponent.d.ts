/**
 * 认证弹窗组件
 * 用于单设备登录确认等场景的通用弹窗
 */

import React from 'react';
import { CheckBox } from './CheckBox';
import { IconfontView } from './IconfontView';

/**
 * 按钮配置接口
 */
interface ButtonConfig {
  /** 按钮文本 */
  text: string;
  /** 图标类型 */
  icon: string;
  /** 点击回调函数 */
  onClick?: () => void;
}

/**
 * 复选框配置接口
 */
interface CheckboxConfig {
  /** 复选框文本 */
  checkboxText: string;
  /** 初始选中状态 */
  checkState?: boolean;
  /** 状态变化回调 */
  callback: (checked: boolean) => void;
}

/**
 * 认证弹窗组件属性接口
 */
export interface AuthPopupComponentProps {
  /** 弹窗标题，默认从资源管理器获取 */
  title?: string;
  /** 弹窗描述文本，默认从资源管理器获取 */
  description?: string;
  /** 是否禁用上一步按钮 */
  diablePrev?: boolean;
  /** 是否禁用下一步按钮 */
  diableNext?: boolean;
  /** 上一步按钮配置 */
  prev?: ButtonConfig;
  /** 下一步按钮配置 */
  next?: ButtonConfig;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义渲染内容（可选，提供则替换默认内容） */
  renderItem?: React.ReactNode;
  /** 复选框配置（可选） */
  checkbox?: CheckboxConfig;
}

/** 组件根容器类名 */
const AUTH_POPUP_CONTAINER_CLASS = 'auth-popup-container';

/**
 * 认证弹窗组件
 * 
 * @description
 * 提供标准化的认证/确认弹窗UI，支持：
 * - 自定义标题和描述
 * - 可选的复选框
 * - 上一步/下一步按钮
 * - 完全自定义内容渲染
 * 
 * @example
 *