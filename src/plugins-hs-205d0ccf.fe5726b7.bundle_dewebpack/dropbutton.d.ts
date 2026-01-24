/**
 * DropButton Component Type Definitions
 * Module: DropButton
 * Original ID: 868365
 */

import { CSSProperties, MouseEvent } from 'react';

/**
 * 下拉按钮项配置接口
 */
export interface DropButtonItem {
  /** 唯一标识符 */
  key: string;
  
  /** 显示标签文本 */
  label: string;
  
  /** 鼠标按下事件处理器 */
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * DropButton 组件属性接口
 */
export interface DropButtonProps {
  /** 下拉项列表 */
  items: DropButtonItem[];
  
  /** 当前选中项的 key */
  currentItemKey: string;
  
  /** 是否处于选中状态 */
  isSelected?: boolean;
}

/**
 * DropButton 子项组件属性接口
 * @internal
 */
interface SubItemProps {
  /** 子项数据 */
  item: DropButtonItem;
  
  /** 是否为当前项 */
  isCurrent: boolean;
  
  /** 鼠标按下事件处理器 */
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * IconfontView 组件属性接口
 * @internal
 */
interface IconfontViewProps {
  /** 自定义类名 */
  customClass?: string;
  
  /** 图标类型 */
  showType: string;
  
  /** 自定义样式 */
  customStyle?: CSSProperties;
  
  /** hover 状态颜色 */
  hoverColor?: string;
  
  /** 点击状态颜色 */
  clickColor?: string;
}

/**
 * 下拉按钮组件
 * 
 * 支持多项选择的下拉按钮，具有以下特性：
 * - 显示当前选中项
 * - 展开显示其他可选项
 * - hover 状态视觉反馈
 * - 支持自定义 onMouseDown 事件
 * 
 * @example
 *