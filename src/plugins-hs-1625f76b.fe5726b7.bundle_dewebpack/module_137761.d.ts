/**
 * CommonUI Plugin for Floorplan Editor
 * 提供通用UI组件和鼠标提示功能的插件模块
 */

import type { Plugin } from 'HSApp.Plugin';

/**
 * 鼠标提示样式配置选项
 */
interface MouseTipsStyleOptions {
  /** 背景颜色，支持rgba格式 */
  background?: string;
  /** 文本颜色，支持rgba格式 */
  txtColor?: string;
}

/**
 * 鼠标坐标位置
 */
interface MousePosition {
  /** X轴坐标（像素） */
  x: number;
  /** Y轴坐标（像素） */
  y: number;
}

/**
 * 下拉菜单配置项
 */
interface DropdownMenuConfig<T = unknown> {
  /** React ref名称 */
  refname?: string;
  /** 下拉菜单数据项 */
  data: T[];
  /** 菜单标题 */
  title?: string;
  /** 菜单名称标识 */
  name: string;
  /** 自定义CSS类名 */
  classname?: string;
  /** 选项变化回调函数 */
  onchanged?: (value: T) => void;
  /** 占位符文本 */
  placeholder?: string;
}

/**
 * 弹窗配置项
 */
interface PopupWindowConfig {
  /** 窗口名称标识 */
  windowname: string;
  /** 标题栏文本 */
  title: string;
  /** 窗口内容（React节点） */
  contents: React.ReactNode;
  /** 确认按钮文本 */
  oklabel?: string;
  /** 取消按钮文本 */
  cancellabel?: string;
  /** 点击遮罩层是否关闭窗口 */
  maskClosable?: boolean;
  /** 窗口宽度（像素或百分比） */
  width?: number | string;
  /** 窗口高度（像素或百分比） */
  height?: number | string;
  /** 确认按钮回调 */
  submitcall?: () => void;
  /** 取消按钮回调 */
  cancelcall?: () => void;
  /** 是否显示帮助按钮 */
  hasHelp?: boolean;
  /** 提示HTML内容 */
  tooltipHtml?: string;
  /** 气泡提示配置 */
  popover?: unknown;
  /** 工具提示配置 */
  tooltip?: unknown;
}

/**
 * 可拖拽弹窗配置项
 */
interface DragPopupWindowConfig {
  /** React ref引用 */
  ref?: React.Ref<unknown>;
  /** 窗口名称标识 */
  windowname: string;
  /** 自定义CSS类名 */
  class?: string;
  /** 标题栏文本 */
  headername: string;
  /** 窗口内容（React节点） */
  contents: React.ReactNode;
  /** 窗口宽度（像素） */
  winwidth?: number;
  /** 窗口顶部位置（像素） */
  wintop?: number;
  /** 窗口右侧位置（像素） */
  winright?: number;
  /** 提交回调函数 */
  submitcall?: () => void;
  /** 取消命令回调 */
  cancelCmd?: () => void;
}

/**
 * UI任务调度选项
 */
interface UIThreadTaskOptions {
  /** 是否允许被覆盖 */
  overridable?: boolean;
  /** 任务唯一标识 */
  taskId?: string;
  /** 延迟限制（毫秒） */
  delayLimits?: number;
}

/**
 * 全局Window接口扩展
 */
declare global {
  interface Window {
    /**
     * 更新鼠标提示信息（全局方法）
     * @param text - 提示文本内容，空字符串或falsy值隐藏提示
     * @param position - 鼠标位置坐标
     * @param style - 样式配置选项
     */
    updateMouseTips: (
      text: string,
      position: MousePosition,
      style?: MouseTipsStyleOptions
    ) => void;

    /**
     * 在UI线程中运行任务（防抖/节流机制）
     * @param callback - 待执行的回调函数
     * @param options - 任务调度选项
     */
    runInUIThread?: (
      callback: () => void,
      options?: UIThreadTaskOptions
    ) => void;
  }
}

/**
 * CommonUI插件类
 * 提供通用UI组件（下拉菜单、弹窗）和鼠标提示功能
 */
export declare class CommonUIPlugin extends Plugin.IPlugin {
  /**
   * 插件激活时调用
   * @param context - 插件上下文参数
   */
  onActive(context: unknown): void;

  /**
   * 插件停用时调用
   */
  onDeactive(): void;

  /**
   * 更新鼠标提示（带防抖优化）
   * @param text - 提示文本，传入空值隐藏提示
   * @param position - 鼠标坐标位置
   * @param style - 可选样式配置
   */
  updateMouseTips(
    text: string,
    position: MousePosition,
    style?: MouseTipsStyleOptions
  ): void;

  /**
   * 立即更新鼠标提示DOM（内部方法）
   * @param text - 提示文本
   * @param position - 鼠标位置
   * @param style - 样式选项
   * @internal
   */
  updateMouseTipsImmediate(
    text: string,
    position: MousePosition,
    style?: MouseTipsStyleOptions
  ): void;

  /**
   * 创建下拉菜单组件
   * @param config - 菜单配置项
   * @returns React元素
   */
  createDropdownMenu<T = unknown>(
    config: DropdownMenuConfig<T>
  ): React.ReactElement;

  /**
   * 创建模态弹窗组件
   * @param config - 弹窗配置项
   * @returns React元素
   */
  createPopupwindow(config: PopupWindowConfig): React.ReactElement;

  /**
   * 创建可拖拽弹窗组件
   * @param config - 可拖拽弹窗配置项
   * @returns React元素
   */
  createDragPopupWindow(config: DragPopupWindowConfig): React.ReactElement;

  /**
   * 获取工具类实例
   * @returns 工具类对象
   */
  getUtil(): unknown;
}

/**
 * 插件注册声明
 * 将CommonUI插件注册到HSApp插件系统
 */
declare module 'HSApp.Plugin' {
  namespace Plugin {
    /**
     * 注册插件到指定类型
     * @param pluginType - 插件类型标识
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: typeof CommonUIPlugin
    ): void;
  }
}

/**
 * 插件常量声明
 */
declare module 'HSFPConstants' {
  export namespace PluginType {
    /** CommonUI插件类型常量 */
    export const CommonUI: string;
  }
}