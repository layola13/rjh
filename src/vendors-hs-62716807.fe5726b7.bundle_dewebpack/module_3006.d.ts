import React from 'react';
import { TabsProps } from 'antd/lib/tabs';
import { ConfigConsumerProps } from 'antd/lib/config-provider/context';

/**
 * Card 组件的 Tab 项配置
 */
export interface CardTabListType {
  /** Tab 的唯一标识 */
  key: string;
  /** Tab 显示的文本 */
  tab: React.ReactNode;
  /** 是否禁用该 Tab */
  disabled?: boolean;
}

/**
 * Card 组件的属性接口
 */
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 自定义类名前缀 */
  prefixCls?: string;
  /** 额外的类名 */
  className?: string;
  /** 卡片右上角的额外内容 */
  extra?: React.ReactNode;
  /** 卡片头部样式 */
  headStyle?: React.CSSProperties;
  /** 卡片内容区域样式 */
  bodyStyle?: React.CSSProperties;
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 加载状态 */
  loading?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 卡片尺寸，可选值：default | small */
  size?: 'default' | 'small';
  /** 卡片类型，可用于配置不同的卡片样式 */
  type?: 'inner';
  /** 卡片封面 */
  cover?: React.ReactNode;
  /** 卡片操作组，显示在卡片底部 */
  actions?: React.ReactNode[];
  /** 页签标题列表 */
  tabList?: CardTabListType[];
  /** 卡片内容 */
  children?: React.ReactNode;
  /** 当前激活页签的 key */
  activeTabKey?: string;
  /** 默认激活页签的 key */
  defaultActiveTabKey?: string;
  /** 页签栏右侧额外内容 */
  tabBarExtraContent?: React.ReactNode;
  /** 鼠标悬停时是否显示浮起效果 */
  hoverable?: boolean;
  /** Tabs 组件的属性 */
  tabProps?: TabsProps;
  /** Tab 切换时的回调 */
  onTabChange?: (key: string) => void;
}

/**
 * Card.Grid 组件的属性接口
 */
export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 自定义类名前缀 */
  prefixCls?: string;
  /** 额外的类名 */
  className?: string;
  /** 是否可悬浮 */
  hoverable?: boolean;
  /** 网格样式 */
  style?: React.CSSProperties;
}

/**
 * Card.Meta 组件的属性接口
 */
export interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 自定义类名前缀 */
  prefixCls?: string;
  /** 额外的类名 */
  className?: string;
  /** 头像/图标 */
  avatar?: React.ReactNode;
  /** 标题内容 */
  title?: React.ReactNode;
  /** 描述内容 */
  description?: React.ReactNode;
  /** 样式 */
  style?: React.CSSProperties;
}

/**
 * Card 网格组件
 */
export declare const CardGrid: React.FC<CardGridProps>;

/**
 * Card Meta 组件，用于卡片的元信息展示
 */
export declare const CardMeta: React.FC<CardMetaProps>;

/**
 * Card 卡片组件
 * 
 * 通用卡片容器，可包含标题、内容、操作等元素
 */
export interface CardComponent extends React.FC<CardProps> {
  /** 卡片网格 */
  Grid: typeof CardGrid;
  /** 卡片元信息 */
  Meta: typeof CardMeta;
}

declare const Card: CardComponent;

export default Card;