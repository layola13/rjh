/**
 * 目录图像按钮组件
 * 支持拖拽、快捷键、命令验证等功能的交互式按钮
 */

import React from 'react';
import { HSCore } from '../path/to/HSCore';

/**
 * 鼠标事件扩展接口
 */
interface ExtendedMouseEvent extends MouseEvent {
  /** 标识是否发生了鼠标移动 */
  isMouseMove?: boolean;
}

/**
 * 命令事件数据接口
 */
interface CommandEventData {
  data: {
    /** 命令对象 */
    cmd: unknown;
  };
}

/**
 * CatalogImageButton 组件属性接口
 */
interface CatalogImageButtonProps {
  /** 按钮文本标签 */
  label?: string;
  
  /** 默认图标类型 */
  icon: string;
  
  /** 鼠标悬停时的图标类型 */
  iconHover?: string;
  
  /** 快捷键配置 */
  hotkey?: string;
  
  /** 备注文本 */
  remarks?: string;
  
  /** 点击事件回调 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 鼠标按下事件回调 */
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 鼠标进入事件回调 */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 鼠标离开事件回调 */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 按钮类型（用于添加额外的CSS类名） */
  type?: string;
  
  /** 图标字体自定义样式 */
  iconfontStyle?: React.CSSProperties;
  
  /** 悬停时的颜色 */
  hoverColor?: string;
  
  /** 是否禁用 */
  disable?: boolean;
  
  /** 禁用时的提示文本 */
  disableTooltip?: string;
  
  /** 是否显示Beta标签 */
  isBeta?: boolean;
  
  /** 显示"新"标识的回调函数 */
  showNewCallBack?: () => boolean;
  
  /** 是否可拖拽 */
  draggable?: boolean;
  
  /** 拖拽开始事件回调 */
  onDragStart?: (event: MouseEvent) => void;
  
  /** 拖拽中事件回调 */
  onDrag?: (event: MouseEvent) => void;
  
  /** 拖拽结束事件回调 */
  onDragEnd?: (event: ExtendedMouseEvent) => void;
  
  /** 命令验证函数，用于判断是否应响应命令状态变化 */
  commandValidate?: (cmd: unknown) => boolean;
  
  /** 是否注册快捷键（默认为true） */
  registerHotkey?: boolean;
}

/**
 * 组件状态接口
 */
interface CatalogImageButtonState {
  /** 是否处于悬停状态 */
  hover: boolean;
  
  /** 是否处于激活状态 */
  active: boolean;
}

/**
 * 目录图像按钮组件类
 * 提供丰富的交互功能，包括拖拽、快捷键绑定、命令状态同步等
 */
declare class CatalogImageButton extends React.Component<
  CatalogImageButtonProps,
  CatalogImageButtonState
> {
  /** 信号钩子，用于监听应用事件 */
  private signalHook?: HSCore.Util.SignalHook<CatalogImageButton>;
  
  /** 鼠标移动事件处理器 */
  private mouseMove?: (event: MouseEvent) => void;
  
  /** 鼠标松开事件处理器 */
  private mouseUp?: (event: MouseEvent) => void;

  constructor(props: CatalogImageButtonProps);

  /**
   * 组件挂载后注册快捷键和监听命令事件
   */
  componentDidMount(): void;

  /**
   * 组件卸载前清理事件监听器
   */
  componentWillUnmount(): void;

  /**
   * 命令结束时的回调
   * @param event - 命令事件数据
   */
  private onCommandEnd(event: CommandEventData): void;

  /**
   * 命令开始时的回调
   * @param event - 命令事件数据
   */
  private onCommandStart(event: CommandEventData): void;

  /**
   * 鼠标进入事件处理
   * @param event - React鼠标事件
   */
  private onMouseEnter(event: React.MouseEvent<HTMLDivElement>): void;

  /**
   * 鼠标离开事件处理
   * @param event - React鼠标事件
   */
  private onMouseLeave(event: React.MouseEvent<HTMLDivElement>): void;

  /**
   * 鼠标按下事件处理，初始化拖拽逻辑
   * @param event - React鼠标事件
   */
  private onMouseDown(event: React.MouseEvent<HTMLDivElement>): void;

  /**
   * 注册快捷键到全局热键管理器
   */
  private registerHotkey(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

export default CatalogImageButton;