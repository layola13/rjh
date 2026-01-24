/**
 * 自定义建模视图切换组件类型定义
 * @module CustomizedModelingViewSwitch
 */

import React from 'react';

/**
 * 图标数据接口
 */
interface IconData {
  /** 普通状态图标URL */
  normalIcon: string;
  /** 悬停状态图标URL */
  hoverIcon: string;
  /** 工具提示文本 */
  tooltip: string;
}

/**
 * 视图数据配置接口
 */
interface ViewData {
  /** 默认视图配置 */
  defaultView: IconData;
  /** 透视视图配置 */
  perspective: IconData;
  /** 正交视图配置 */
  ortho: IconData;
}

/**
 * 视图选项类型
 */
type ViewOption = 'perspective' | 'ortho';

/**
 * 可渲染视图类型（包含默认视图）
 */
type RenderableView = 'defaultView' | ViewOption;

/**
 * 切换按钮组件的Props接口
 */
interface SwitchButtonProps {
  /** 工具提示文本 */
  tooltip: string;
  /** 普通状态图标URL */
  normalIcon: string;
  /** 悬停状态图标URL */
  hoverIcon: string;
  /** 点击事件处理函数 */
  handleClick: () => void;
}

/**
 * 切换按钮组件的State接口
 */
interface SwitchButtonState {
  /** 是否处于悬停状态 */
  hover: boolean;
}

/**
 * 视图切换容器组件的Props接口
 */
interface ViewSwitchContainerProps {
  // 可根据实际需求扩展props
}

/**
 * 视图切换容器组件的State接口
 */
interface ViewSwitchContainerState {
  /** 当前选中的视图选项 */
  currentOption: ViewOption;
}

/**
 * HSApp全局对象类型定义
 */
declare global {
  const HSApp: {
    Util: {
      Core: {
        define: (namespace: string) => PluginInstance;
      };
    };
    UI: {
      Popover: {
        Tooltip: React.ComponentType<TooltipProps>;
      };
    };
  };

  const ResourceManager: {
    getString: (key: string) => string;
  };
}

/**
 * Tooltip组件Props接口
 */
interface TooltipProps {
  /** 自定义类名 */
  className?: string;
  /** 弹出位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus';
  /** 标题内容 */
  title?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 插件实例接口
 */
interface PluginInstance {
  UI: {
    /** 启动3D相机 */
    start3DCamera: () => void;
    /** 启动正交相机 */
    startOrthoCamera: () => void;
    /** 回到默认视图 */
    homeCamera: () => void;
    /** 聚焦编辑框 */
    focusEditFrame: () => void;
  };
}

/**
 * 视图切换按钮组件
 * 支持普通和悬停状态的图标切换
 */
declare class SwitchButton extends React.Component<SwitchButtonProps, SwitchButtonState> {
  /**
   * 组件状态
   */
  state: SwitchButtonState;

  /**
   * 处理点击事件
   */
  private _handleClick(): void;

  /**
   * 鼠标进入事件处理
   */
  private _onMouseEnter(): void;

  /**
   * 鼠标离开事件处理
   */
  private _onMouseLeave(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

/**
 * 自定义建模视图切换容器组件
 * 提供透视图/正交图切换和默认视图重置功能
 */
declare class CustomizedModelingViewSwitch extends React.Component<
  ViewSwitchContainerProps,
  ViewSwitchContainerState
> {
  /**
   * 视图配置数据
   */
  private data: ViewData;

  /**
   * 组件状态
   */
  state: ViewSwitchContainerState;

  /**
   * 视图选项变更处理
   * 在透视图和正交图之间切换
   */
  private _onViewOptionChanged(): void;

  /**
   * 设置为默认视图
   * 重置相机到初始位置
   */
  private _setDefaultView(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

export default CustomizedModelingViewSwitch;