/**
 * 属性栏按钮组件的类型定义
 * Module: module_614562
 * Original ID: 614562
 */

import React from 'react';

/**
 * 按钮类型
 */
export type ButtonType = 'normal' | 'icon';

/**
 * 按钮级别
 */
export type ButtonLevel = number | string;

/**
 * 图标标签位置
 */
export type LabelPosition = 'left' | 'right' | undefined;

/**
 * 属性栏按钮组件的属性接口
 */
export interface PropertyBarButtonProps {
  /** 组件数据配置 */
  data: {
    /** 按钮级别 */
    level: ButtonLevel;
    
    /** 按钮类型，默认为 'normal' */
    type?: ButtonType;
    
    /** 按钮标签文本 */
    label?: React.ReactNode;
    
    /** 图标类型 */
    icon?: string;
    
    /** 自定义样式类名 */
    className?: string;
    
    /** 按钮文本内容 */
    text?: React.ReactNode;
    
    /** 鼠标悬停时的颜色 */
    hoverColor?: string;
    
    /** 是否禁用按钮，默认为 false */
    disabled?: boolean;
    
    /** 图标标签位置 */
    labelPosition?: LabelPosition;
    
    /** 点击事件处理函数 */
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    
    /** 获取权益数量的函数 */
    getBenefitAmount?: () => number | undefined;
    
    /** 显示市场弹窗的函数 */
    showMarketModal?: () => void;
  };
}

/**
 * 属性栏按钮组件
 * 
 * 支持普通按钮和图标按钮两种模式，可配置会员权益提示
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 */
declare function PropertyBarButton(props: PropertyBarButtonProps): React.ReactElement;

export default PropertyBarButton;