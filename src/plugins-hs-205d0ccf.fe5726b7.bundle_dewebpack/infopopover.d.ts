/**
 * Module: InfoPopover
 * Original ID: 909751
 * Exports: PopoverInfo, InfoPopover
 */

import { Component, ReactNode, CSSProperties } from 'react';

/**
 * 信息项配置接口
 * 用于描述弹出框中显示的图片项
 */
export interface InfoItem {
  /** 图标URL地址 */
  icon: string;
  /** 标签文本的资源键（用于国际化） */
  label?: string;
}

/**
 * 弹出框信息配置类
 * 包含弹出框的文本、锚点位置和项目列表
 */
export declare class PopoverInfo {
  /** 弹出框显示的文本内容（资源键） */
  text?: string;
  
  /** 弹出框相对于目标元素的锚点位置 */
  anchor: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  
  /** 要在弹出框中显示的信息项列表 */
  items: InfoItem[];

  constructor();
}

/**
 * InfoPopover 组件的属性接口
 */
export interface InfoPopoverProps {
  /** 弹出框数据配置 */
  data: PopoverInfo;
  
  /** 自定义子元素作为触发器，如果未提供则使用默认图标 */
  children?: ReactNode;
  
  /** 弹出框遮罩层的自定义类名 */
  overlayClassName?: string;
}

/**
 * 信息弹出框组件
 * 用于在hover时显示带有文本和图片列表的弹出提示框
 * 
 * @example
 *