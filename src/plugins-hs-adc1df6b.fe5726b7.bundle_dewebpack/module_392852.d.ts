/**
 * PropertyBar Component Module
 * 
 * 提供可拖拽的属性栏组件,支持模态框、吸附、缩放等功能
 * @module PropertyBar
 */

import type { Component, CSSProperties, ReactNode } from 'react';

/**
 * 布局管理器位置信息
 */
interface LayoutPosition {
  /** 是否为模态框模式 */
  isModal: boolean;
  /** 高度 */
  height: number;
  /** 左边距 */
  left: number;
  /** 显示状态 */
  display?: string;
  /** 可见性 */
  visibility?: 'visible' | 'hidden';
}

/**
 * 布局约束回调参数
 */
interface LayoutConstraintParams {
  /** 是否为模态框 */
  isModal?: boolean;
  /** 高度 */
  height?: number;
  /** 左边距 */
  left?: number;
  /** 可见性 */
  visibility?: 'visible' | 'hidden';
  /** 是否启用更新 */
  enableUpdate?: boolean;
}

/**
 * 拖拽事件回调参数
 */
interface DragEventParams {
  /** 鼠标X坐标 */
  x: number;
  /** 鼠标Y坐标 */
  y: number;
  /** 是否吸附 */
  snapped?: boolean;
}

/**
 * 尺寸设置配置
 */
interface SizeConfig {
  /** 默认配置 */
  default: {
    /** 设置高度函数 */
    setHeight: () => number;
  };
  /** 动态设置高度函数 */
  setHeight: () => number;
}

/**
 * 位置设置配置
 */
interface PositionConfig {
  /** 默认配置 */
  default: {
    /** Y轴位置 */
    y: number;
  };
  /** 设置Y轴位置函数 */
  setPositionY?: () => number;
}

/**
 * 扩展选项配置
 */
interface ExtensionOptions {
  /** 最大化配置 */
  maximize: {
    /** 位置配置 */
    position: PositionConfig;
    /** 尺寸配置 */
    size: SizeConfig;
  };
  /** 最小化配置 */
  minimize: {
    /** 位置配置 */
    position: PositionConfig;
    /** 尺寸配置 */
    size: SizeConfig;
  };
}

/**
 * 标题栏设置配置
 */
interface TitleSettings {
  /** 标题文本 */
  title: string;
  /** 样式类名 */
  className: string;
  /** 扩展选项 */
  extensionOptions: ExtensionOptions;
  /** 标题变更回调 */
  onTitleChange?: (newTitle: string) => void;
  /** 最大长度限制 */
  maxLength?: number;
  /** 是否可编辑 */
  editable?: boolean;
  /** 是否启用关闭按钮 */
  enableCloseBtn: boolean;
  /** 自定义标题内容 */
  customizedTitleContent?: ReactNode;
}

/**
 * 吸附设置配置
 */
interface SnapSettings {
  /** 吸附偏移量 */
  snapoffset: number;
  /** 吸附方向 */
  direction: 'left' | 'right' | 'top' | 'bottom';
  /** 设置位置函数 */
  setPosition: () => { x: number; y: number };
  /** 设置尺寸函数 */
  setSize: () => { height: number };
}

/**
 * 可拖拽配置
 */
interface DraggableConfig {
  /** 拖拽开始回调 */
  onStart: () => void;
  /** 拖拽停止回调 */
  onStop: (event: unknown, isSnapped: boolean) => void;
}

/**
 * 可缩放配置
 */
interface ZoomableConfig {
  /** 边框宽度 */
  borderWidth: number;
  /** 高度限制 */
  height: () => { min: number; max: number };
  /** 可缩放方向 */
  direction: Array<'top' | 'bottom' | 'left' | 'right'>;
}

/**
 * 可拖拽模态框选项
 */
interface DraggableModalOptions {
  /** 样式类名 */
  className: string;
  /** 初始宽度 */
  initialWidth: number;
  /** 初始高度 */
  initialHeight: number;
  /** 默认X轴位置 */
  defaultPositionX: number;
  /** 默认Y轴位置 */
  defaultPositionY: number;
  /** 初始是否为模态框 */
  initialIsModal: boolean;
  /** 可拖拽配置 */
  draggable: DraggableConfig;
  /** 可缩放配置 */
  zoomable: ZoomableConfig;
  /** 标题设置 */
  titleSetting: TitleSettings;
  /** 吸附设置 */
  snapSetting: SnapSettings;
  /** 是否启用X轴滚动 */
  enableXScroll: boolean;
  /** 是否启用Y轴滚动 */
  enableYScroll: boolean;
  /** 是否显示Y轴滚动提示 */
  scrollYTip: boolean;
  /** 是否启用模态框切换 */
  enableToggleModal: boolean;
  /** 点击关闭模态框回调 */
  onEnableClickCloseModal: () => boolean;
  /** 设置点击模态框层级回调 */
  setClickModalZIndex: (active: boolean) => void;
  /** 模态框切换回调 */
  onToggle: (isOpen: boolean) => void;
  /** 滚动类型 */
  scrollType: 'simple' | 'complex';
  /** 样式 */
  style?: CSSProperties;
  /** 引用回调 */
  ref?: (instance: DraggableModalInstance | null) => void;
}

/**
 * 可拖拽模态框实例接口
 */
interface DraggableModalInstance {
  /** 改变位置 */
  changePosition: (x: number | null, y: number) => void;
  /** 设置模态框尺寸 */
  setModalSize: (width: number | null, height: number) => void;
  /** 切换扩展模式 */
  toggleExtendModel: (force?: boolean) => void;
  /** 获取吸附状态 */
  getSnappingStatus: () => boolean;
  /** 获取模态框扩展状态 */
  getToggleModelExtendsion: () => boolean;
  /** 显示扩展按钮 */
  showExtensionBtn: (show: boolean) => void;
  /** 改变模态框位置 */
  changeModalPosition: () => void;
}

/**
 * 布局元素引用接口
 */
interface LayoutElementRef {
  /** 获取模态框切换显示状态 */
  getToggleModalShowStatus: () => boolean;
  /** 切换模态框显示 */
  toggleModalShow: (show: boolean) => void;
  /** 显示模态框切换按钮 */
  showToggleModalBtn: (show: boolean) => void;
}

/**
 * 布局管理器接口
 */
interface LayoutManager {
  /** 注册组件 */
  register: (
    name: string,
    element: HTMLElement,
    isModal: boolean,
    options: { type: string; component: DraggableModalInstance }
  ) => void;
  /** 添加约束 */
  addConstrain: (
    source: string,
    target: string,
    callback: (params: LayoutConstraintParams) => void
  ) => void;
  /** 获取位置信息 */
  getPosition: (name: string) => LayoutPosition;
  /** 获取元素引用 */
  getElementRef: (name: string) => LayoutElementRef;
  /** 更新布局 */
  update: (name: string, params: Record<string, unknown>) => void;
  /** 激活模态框 */
  activeModal: (name: string) => void;
  /** 取消激活模态框 */
  deactiveModal: (name: string, isSnapped: boolean) => void;
  /** 取消注册 */
  unregister: (name: string) => void;
}

/**
 * HSApp应用接口
 */
interface HSApp {
  App: {
    /** 获取应用实例 */
    getApp: () => {
      /** 布局管理器 */
      layoutMgr: LayoutManager;
      /** 激活的环境 */
      activeEnvironment: { id: string };
    };
  };
  Util: {
    /** 事件跟踪 */
    EventTrack: {
      /** 获取实例 */
      instance: () => {
        /** 跟踪事件 */
        track: (group: string, event: string, data: Record<string, unknown>) => void;
      };
    };
    /** 事件分组枚举 */
    EventGroupEnum: {
      Propertybar: string;
    };
    /** URL工具 */
    Url: {
      /** 获取查询字符串 */
      getQueryStrings: () => Record<string, string>;
    };
  };
}

declare global {
  /** HSApp全局对象 */
  const HSApp: HSApp;
}

/**
 * 属性项配置
 */
interface PropertyItem {
  /** 项ID */
  id: string;
  /** 标签 */
  label: string;
  /** 配置 */
  [key: string]: unknown;
}

/**
 * 自定义大视图数据
 */
interface CustomizedLargeViewData {
  /** 自定义数据 */
  [key: string]: unknown;
}

/**
 * 信息数据
 */
interface InfoData {
  /** 信息数据 */
  [key: string]: unknown;
}

/**
 * 属性栏配置项
 */
interface PropertyBarItem {
  /** 项ID */
  id: string;
  /** 标签文本 */
  label: string;
  /** 子项列表 */
  items: PropertyItem[];
  /** 浮动项 */
  floatItems?: PropertyItem[];
  /** 标题变更回调 */
  onTitleChange?: (newTitle: string) => void;
  /** 最大长度 */
  maxLength?: number;
  /** 是否可编辑 */
  editable?: boolean;
  /** 是否启用详细信息 */
  enableDetailsInfo?: boolean;
  /** 获取自定义大视图数据 */
  getCustomizedLargeViewData?: () => CustomizedLargeViewData;
  /** 自定义大视图数据 */
  customizedLargeViewData?: CustomizedLargeViewData;
  /** 信息数据 */
  infoData?: InfoData;
}

/**
 * 属性栏组件Props
 */
interface PropertyBarProps {
  /** 配置项 */
  item: PropertyBarItem;
  /** 是否只读 */
  isReadonly?: boolean;
}

/**
 * 属性栏组件状态
 */
interface PropertyBarState {
  /** 组件状态 */
  [key: string]: unknown;
}

/**
 * 属性栏组件类
 * 
 * 提供可拖拽、可缩放、可吸附的属性面板功能
 * @class
 * @extends {Component<PropertyBarProps, PropertyBarState>}
 */
declare class PropertyBarComponent extends Component<PropertyBarProps, PropertyBarState> {
  /** 右侧视图模态框实例 */
  rightViewModal: DraggableModalInstance | undefined;

  /**
   * 组件挂载生命周期
   * 注册组件到布局管理器并设置约束
   */
  componentDidMount(): void;

  /**
   * 组件卸载生命周期
   * 从布局管理器注销组件
   */
  componentWillUnmount(): void;

  /**
   * 获取计算后的高度
   * @param offset - 偏移量,默认为0
   * @returns 计算后的高度,最小为200px
   */
  getHeight(offset?: number): number;

  /**
   * 获取可拖拽模态框配置选项
   * @returns 模态框配置对象
   */
  getOptions(): DraggableModalOptions;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): ReactNode;
}

/**
 * 属性栏组件默认导出
 */
export default PropertyBarComponent;