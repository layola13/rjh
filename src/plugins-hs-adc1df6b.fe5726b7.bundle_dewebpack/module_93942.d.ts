/**
 * 全屏功能模块
 * 提供全屏切换、状态检测和UI渲染功能
 */

import React from 'react';
import { Tooltip } from 'antd'; // 假设使用antd的Tooltip
import { IconfontView } from './IconfontView'; // 图标组件

/**
 * 全屏组件的Props类型定义
 */
interface FullScreenProps {
  /** 自定义样式对象 */
  customStyle?: React.CSSProperties;
}

/**
 * 全屏组件的State类型定义
 */
interface FullScreenState {
  /** 当前是否处于全屏状态 */
  fullscreen: boolean;
}

/**
 * 扩展Document类型以支持各浏览器全屏API
 */
interface DocumentWithFullscreen extends Document {
  fullScreenElement?: Element | null;
  mozFullScreen?: boolean;
  webkitIsFullScreen?: boolean;
  msExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}

/**
 * 扩展HTMLElement类型以支持各浏览器全屏请求API
 */
interface HTMLElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

/**
 * 全屏功能React组件
 * 提供跨浏览器的全屏切换能力，支持Chrome、Firefox、Safari、IE等
 */
declare class FullScreenComponent extends React.Component<FullScreenProps, FullScreenState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: FullScreenProps);

  /**
   * 组件挂载后的生命周期钩子
   * 监听窗口resize事件以同步全屏状态
   */
  componentDidMount(): void;

  /**
   * 检测当前是否处于全屏模式
   * 兼容多种浏览器的全屏API
   * @returns 是否处于全屏状态
   */
  isFullScreen(): boolean;

  /**
   * 请求进入全屏模式
   * 按优先级尝试不同浏览器的全屏API
   * @param element - 需要全屏显示的DOM元素
   */
  requestFullScreen(element: HTMLElementWithFullscreen): void;

  /**
   * 退出全屏模式
   * 按优先级尝试不同浏览器的退出全屏API
   */
  exitFullScreen(): void;

  /**
   * 切换全屏状态
   * 如果当前是全屏则退出，否则进入全屏
   */
  toggleFullScreen(): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

/**
 * 工具栏全屏插件配置类
 * 用于将全屏功能集成到工具栏系统中
 */
declare class FullScreenPlugin {
  /**
   * 插件在工具栏中的排序权重
   * 数值越大越靠后
   */
  readonly order: number;

  /**
   * 构造函数
   * @param config - 插件配置参数（预留）
   * @param options - 插件选项（预留）
   */
  constructor(config?: unknown, options?: unknown);

  /**
   * 获取要渲染的React组件
   * @param customStyle - 自定义样式对象
   * @returns 全屏组件实例
   */
  getRenderItem(customStyle?: React.CSSProperties): React.ReactElement<FullScreenProps>;
}

/**
 * 默认导出：创建全屏插件实例的工厂函数
 * @returns 全屏插件实例
 * @example
 *