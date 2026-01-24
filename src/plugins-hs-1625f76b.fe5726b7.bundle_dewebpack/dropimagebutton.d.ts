/**
 * DropImageButton 组件模块
 * 提供带下拉菜单的图标按钮功能，支持悬停效果、免费试用标识和VIP购买入口
 */

import React from 'react';

/**
 * 图标显示类型（iconfont 标识符）
 */
type IconType = string;

/**
 * 热键配置
 */
interface HotkeyConfig {
  /** 热键组合字符串，如 'Ctrl+C' */
  key: string;
  /** 其他热键配置属性 */
  [key: string]: unknown;
}

/**
 * 免费试用配置
 */
interface FreeTrialConfig {
  /** 免费试用显示文本 */
  text: string;
}

/**
 * VIP 购买配置
 */
interface BuyVipConfig {
  /** VIP 图标 URL */
  icon: string;
}

/**
 * 下拉菜单项配置
 */
interface DropdownItem {
  /** 菜单项显示标签 */
  label: string;
  
  /** 默认图标类型 */
  icon: IconType;
  
  /** 悬停时的图标类型（可选） */
  iconHover?: IconType;
  
  /** 鼠标按下事件回调 */
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 热键配置（可选） */
  hotkey?: HotkeyConfig;
  
  /** 是否注册热键 */
  registerHotkey?: boolean;
  
  /** 免费试用配置（可选） */
  freeTrial?: FreeTrialConfig;
  
  /** 免费试用点击回调 */
  freeTrialClick?: (isCurrentItem: boolean) => void;
  
  /** VIP 购买配置（可选） */
  buyVip?: BuyVipConfig;
  
  /** VIP 购买点击回调 */
  buyVipClick?: () => void;
  
  /** 显示"新"标识的回调函数 */
  showNewCallBack?: () => boolean;
}

/**
 * DropImageButton 组件属性
 */
interface DropImageButtonProps {
  /** 主按钮显示标签 */
  label?: string;
  
  /** 下拉菜单项列表 */
  items: DropdownItem[];
  
  /** 下拉菜单展开位置，默认 'left' */
  dropLocation?: 'left' | 'right';
  
  /** 主按钮显示"新"标识的回调函数 */
  showNewCallBack?: () => boolean;
  
  /** 当前项的免费试用配置 */
  currentFreeTrial?: FreeTrialConfig;
}

/**
 * 下拉菜单子项组件属性
 */
interface SubItemProps {
  /** 菜单项数据 */
  item: DropdownItem;
  
  /** 是否为当前选中项 */
  isCurrent: boolean;
  
  /** 鼠标按下事件回调 */
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 显示"新"标识的回调函数 */
  showNewCallBack?: () => boolean;
}

/**
 * VIP 购买按钮组件属性
 */
interface BuyVipButtonProps {
  /** VIP 图标 URL */
  icon: string;
  
  /** 点击事件回调 */
  onClick?: () => void;
}

/**
 * 带下拉菜单的图标按钮组件
 * 
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *