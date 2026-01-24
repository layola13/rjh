import React from 'react';

/**
 * 菜单项数据结构
 */
export interface MenuItemShape {
  /** 菜单项显示的标签文本 */
  label: string;
  /** 菜单项的唯一标识符 */
  id?: string;
  /** 点击菜单项时的回调函数 */
  onClick?: (event: React.MouseEvent) => void;
  /** 子菜单项数组（用于创建多级菜单） */
  children?: MenuItemShape[];
}

/**
 * 右键菜单组件的属性接口
 */
export interface RightMenuContainerProps {
  /** 菜单数据数组 */
  data: MenuItemShape[];
  /** 菜单项点击事件追踪回调 */
  onItemClickEventTrack?: () => void;
}

/**
 * 右键菜单组件的状态接口
 */
export interface RightMenuContainerState {
  /** 控制菜单的显示/隐藏状态 */
  display: boolean;
}

/**
 * 右键菜单容器组件
 * 
 * @description 
 * 一个可定制的右键菜单组件，支持：
 * - 多级菜单嵌套
 * - 点击外部区域自动关闭
 * - 事件追踪
 * - 与Guide插件集成
 * 
 * @example
 *