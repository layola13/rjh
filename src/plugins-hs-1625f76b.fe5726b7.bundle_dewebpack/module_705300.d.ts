/**
 * 房屋类型面板组件模块
 * @module HouseTypePanel
 */

import * as React from 'react';

/**
 * 免费试用信息
 */
interface FreeTrialInfo {
  /** 试用说明文本 */
  text: string;
}

/**
 * VIP购买信息
 */
interface VipInfo {
  /** 图标URL */
  icon: string;
}

/**
 * 按钮项基础配置
 */
interface BaseButtonItem {
  /** 按钮标签文本 */
  label?: string;
  /** 图标标识 */
  icon?: string;
  /** 悬停时的图标 */
  iconHover?: string;
  /** 鼠标进入回调 */
  onMouseEnter?: (event: React.MouseEvent) => void;
  /** 鼠标离开回调 */
  onMouseLeave?: (event: React.MouseEvent) => void;
  /** 鼠标按下回调 */
  onMouseDown?: (event: React.MouseEvent) => void;
  /** 点击回调 */
  onClick?: (event: React.MouseEvent) => void;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 拖拽中回调 */
  onDrag?: (event: React.DragEvent) => void;
  /** 拖拽结束回调 */
  onDragEnd?: (event: React.DragEvent) => void;
  /** 拖拽开始回调 */
  onDragStart?: (event: React.DragEvent) => void;
  /** 快捷键 */
  hotkey?: string;
  /** 是否注册快捷键 */
  registerHotkey?: boolean;
  /** 备注信息 */
  remarks?: string;
  /** 命令验证器 */
  commandValidate?: () => boolean;
  /** 悬停颜色 */
  hoverColor?: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 禁用时的提示文本 */
  disableTooltip?: string;
  /** 是否为Beta功能 */
  isBeta?: boolean;
  /** 当前免费试用信息 */
  currentFreeTrial?: FreeTrialInfo;
  /** VIP购买信息 */
  buyVip?: VipInfo;
  /** 免费试用点击回调 */
  freeTrialClick?: (showDialog: boolean) => void;
  /** VIP购买点击回调 */
  buyVipClick?: () => void;
  /** 显示新功能回调 */
  showNewCallBack?: () => void;
  /** 是否为编辑状态 */
  editStatus?: boolean;
}

/**
 * 标准图像按钮配置
 */
interface StandardImageButton extends BaseButtonItem {
  type: 'image-button';
}

/**
 * 天花板图像按钮配置
 */
interface CeilingImageButton extends BaseButtonItem {
  type: 'ceiling-imagebutton';
}

/**
 * 下拉图像按钮配置
 */
interface DropImageButton extends BaseButtonItem {
  type: 'drop-image-button';
  /** 下拉列表项 */
  values?: ButtonItem[];
}

/**
 * 按钮项联合类型
 */
type ButtonItem = StandardImageButton | CeilingImageButton | DropImageButton;

/**
 * 下拉位置类型
 */
type DropLocation = 'left' | 'right';

/**
 * 房屋类型面板组件属性
 */
interface HouseTypePanelProps {
  /** 面板类型/标题 */
  type?: string;
  /** 是否显示设置按钮 */
  isSettingVisible?: boolean;
  /** 设置按钮描述文本 */
  settingDescription?: string;
  /** 按钮项数组 */
  values: ButtonItem[];
  /** 图标字体样式 */
  iconfontStyle?: React.CSSProperties;
  /** 是否为小尺寸模式 */
  isSmallMode?: boolean;
  /** 是否启用面板（默认为true） */
  enable?: boolean;
}

/**
 * 房屋类型面板组件状态
 */
interface HouseTypePanelState {
  /** 是否展开下拉菜单 */
  dropDown: boolean;
}

/**
 * 房屋类型面板组件
 * 用于显示工具栏中的按钮集合，支持多种按钮类型和交互方式
 * 
 * @example
 *