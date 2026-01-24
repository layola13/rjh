/**
 * ActionContainer 模块
 * 用于渲染操作列表的容器组件
 */

import React from 'react';
import { IconfontView, Tooltip } from './components';

/**
 * 操作项配置接口
 */
interface ActionItem {
  /** 操作项名称 */
  name: string;
  /** 图标类型 */
  icon: string;
  /** 是否禁用该操作项 */
  disable?: boolean;
  /** 是否不可用（显示为灰色但仍可见） */
  unable?: boolean;
  /** 是否显示VIP标识 */
  showVip?: boolean;
  /** 点击事件处理函数 */
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** 自定义tooltip组件渲染函数 */
  toolTipCom?: (item: ActionItem) => React.ReactNode;
}

/**
 * ActionContainer 组件属性接口
 */
interface ActionContainerProps {
  /** 操作项列表 */
  actionList: ActionItem[];
}

/**
 * 图标字体组件属性接口
 */
interface IconfontViewProps {
  /** 图标类型标识 */
  showType: string;
  /** 自定义样式 */
  customStyle?: React.CSSProperties;
}

/**
 * Tooltip 组件属性接口
 */
interface TooltipProps {
  /** 提示内容 */
  title: React.ReactNode;
  /** 颜色主题 */
  color?: 'dark' | 'light';
  /** 弹出位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 自定义覆盖层类名 */
  overlayClassName?: string;
  /** 子元素 */
  children: React.ReactNode;
}

/**
 * 获取操作项的提示文本
 * @param item - 操作项配置
 * @returns 提示内容
 */
declare function getTooltipContent(item: ActionItem): React.ReactNode;

/**
 * 操作容器组件
 * 渲染一组操作按钮，支持tooltip提示、VIP标识和禁用状态
 * @param props - 组件属性
 * @returns React元素
 */
export declare function ActionContainer(props: ActionContainerProps): React.ReactElement;

/**
 * VIP图标资源路径
 */
declare const VIP_ICON_SRC: string;

/**
 * 默认帮助图标类型
 */
declare const HELP_ICON_TYPE = 'hs_shuxingmianban_jieshihei';

/**
 * 默认图标大小
 */
declare const DEFAULT_ICON_SIZE = '20px';

/**
 * 帮助图标大小
 */
declare const HELP_ICON_SIZE = '16px';