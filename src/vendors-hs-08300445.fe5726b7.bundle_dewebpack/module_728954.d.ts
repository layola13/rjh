import * as React from 'react';

/**
 * 折叠面板激活的键值类型
 * 可以是字符串、数字或它们组成的数组
 */
export type ActiveKey = string | number | Array<string | number>;

/**
 * 展开图标的渲染函数类型
 * @param panelProps - 面板的属性对象
 * @returns React 节点
 */
export type ExpandIconRenderer = (panelProps: PanelProps) => React.ReactNode;

/**
 * 可折叠模式
 * - 'header': 仅头部可点击折叠
 * - 'disabled': 禁用折叠功能
 */
export type CollapsibleType = 'header' | 'disabled';

/**
 * 折叠动画配置接口
 */
export interface MotionConfig {
  /** 动画时长（毫秒） */
  duration?: number;
  /** 缓动函数 */
  easing?: string;
  /** 自定义动画类名 */
  motionName?: string;
}

/**
 * 折叠面板子面板的属性接口
 */
export interface PanelProps {
  /** 面板的唯一标识键 */
  key?: string | number;
  /** 内部使用的面板键 */
  panelKey?: string;
  /** 面板头部内容 */
  header?: React.ReactNode;
  /** 头部自定义样式类名 */
  headerClass?: string;
  /** 面板是否处于激活（展开）状态 */
  isActive?: boolean;
  /** 是否在面板未激活时销毁内容 */
  destroyInactivePanel?: boolean;
  /** 面板内容 */
  children?: React.ReactNode;
  /** 自定义展开图标 */
  expandIcon?: ExpandIconRenderer;
  /** 可折叠模式 */
  collapsible?: CollapsibleType;
  /** 样式类名前缀 */
  prefixCls?: string;
  /** 点击面板项的回调 */
  onItemClick?: (panelKey: string) => void;
  /** 是否为手风琴模式 */
  accordion?: boolean;
  /** 展开/收起动画配置 */
  openMotion?: MotionConfig;
}

/**
 * 折叠面板组件的属性接口
 */
export interface CollapseProps {
  /** 当前激活（展开）的面板键，受控模式 */
  activeKey?: ActiveKey;
  /** 默认激活的面板键，非受控模式 */
  defaultActiveKey?: ActiveKey;
  /** 激活面板变化时的回调函数 */
  onChange?: (activeKey: string | string[]) => void;
  /** 是否开启手风琴模式（每次只能展开一个面板） */
  accordion?: boolean;
  /** 面板子元素 */
  children?: React.ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 样式类名前缀 */
  prefixCls?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 是否在面板未激活时销毁其内容 */
  destroyInactivePanel?: boolean;
  /** 自定义展开图标的渲染函数 */
  expandIcon?: ExpandIconRenderer;
  /** 展开/收起动画配置 */
  openMotion?: MotionConfig;
  /** 面板可折叠的触发类型 */
  collapsible?: CollapsibleType;
}

/**
 * 折叠面板组件的状态接口
 */
interface CollapseState {
  /** 当前激活的面板键数组 */
  activeKey: string[];
}

/**
 * 折叠面板子面板组件
 * 必须作为 Collapse 组件的直接子元素使用
 */
export class Panel extends React.Component<PanelProps> {}

/**
 * 折叠面板组件
 * 
 * @description
 * 可折叠的内容面板组件，支持手风琴模式和多面板同时展开。
 * 常用于页面中需要折叠显示的内容区域。
 * 
 * @example
 *