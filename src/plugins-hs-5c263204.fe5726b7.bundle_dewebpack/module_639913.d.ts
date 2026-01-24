/**
 * 收藏夹分组添加组件的类型定义
 * Module: module_639913
 * Original ID: 639913
 */

import React from 'react';

/**
 * 分组项接口
 */
export interface GroupItem {
  /** 分组ID */
  id: string | number;
  /** 分组名称 */
  name: string;
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * AddGroup 组件的 Props 接口
 */
export interface AddGroupProps {
  /** 当前已存在的分组列表 */
  groupItems: GroupItem[];
  /** 点击添加按钮时的回调函数 */
  onAddClick: (groupName: string) => void;
}

/**
 * AddGroup 组件的 State 接口
 */
export interface AddGroupState {
  /** 输入框是否获得焦点 */
  isFocus: boolean;
}

/**
 * 收藏夹添加分组组件
 * 
 * @description 提供输入框和添加按钮，用于创建新的收藏夹分组
 * - 支持输入验证（重复名称检测、空值检测）
 * - 支持键盘快捷键（Enter键提交）
 * - 提供视觉反馈（焦点状态、错误提示）
 * 
 * @example
 *