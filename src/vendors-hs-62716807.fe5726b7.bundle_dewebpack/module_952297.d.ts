import React from 'react';
import { TooltipProps } from 'antd/lib/tooltip';

/**
 * Popover 组件的属性接口
 * 继承自 Tooltip 组件的大部分属性
 */
export interface PopoverProps extends Omit<TooltipProps, 'title'> {
  /**
   * 自定义样式类名前缀
   * @default 'ant-popover'
   */
  prefixCls?: string;

  /**
   * 弹出框标题内容
   * 支持字符串或 React 节点
   */
  title?: React.ReactNode | (() => React.ReactNode);

  /**
   * 弹出框主体内容
   * 支持字符串或 React 节点
   */
  content?: React.ReactNode | (() => React.ReactNode);

  /**
   * 气泡框位置
   * @default 'top'
   */
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';

  /**
   * 动画过渡效果名称
   * @default 'zoom-big'
   */
  transitionName?: string;

  /**
   * 触发行为
   * @default 'hover'
   */
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | Array<'hover' | 'focus' | 'click' | 'contextMenu'>;

  /**
   * 鼠标移入后延时多少秒显示（单位：秒）
   * @default 0.1
   */
  mouseEnterDelay?: number;

  /**
   * 鼠标移出后延时多少秒隐藏（单位：秒）
   * @default 0.1
   */
  mouseLeaveDelay?: number;

  /**
   * 卡片样式
   * @default {}
   */
  overlayStyle?: React.CSSProperties;
}

/**
 * Popover 气泡卡片组件
 * 
 * 点击/鼠标移入元素，弹出气泡式的卡片浮层。
 * 
 * @example
 *