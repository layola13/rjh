/**
 * SnappingPlaneHelp 模块
 * 用于在自定义建模插件中显示吸附平面的帮助提示
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Cookie 键名常量
 * 用于存储用户是否已查看过吸附平面帮助提示
 */
declare const PLUGIN_CUSTOMIZEDMODELING_SNAPPING_PLANE_HELP_COOKIE = "plugin_customizedModeling_snapping_plane_help_cookie";

/**
 * SnappingPlaneHelp 组件的 Props 接口
 */
export interface SnappingPlaneHelpProps {
  /** 组件数据配置 */
  data: SnappingPlaneHelpData;
}

/**
 * SnappingPlaneHelp 组件的数据接口
 */
export interface SnappingPlaneHelpData {
  /** 第一行提示标题 */
  tipTitleFirst?: string;
  /** 第二行提示标题 */
  tipTitleSecond?: string;
  /** 视频文件路径 */
  video?: string;
  /** "不再显示"按钮文本 */
  nomoreShow?: string;
  /** 容器 DOM 元素 */
  containerElement?: HTMLElement;
}

/**
 * SnappingPlaneHelp 组件的 State 接口
 */
export interface SnappingPlaneHelpState {
  /** 第一行提示标题 */
  tipTitleFirst?: string;
  /** 第二行提示标题 */
  tipTitleSecond?: string;
  /** 视频文件路径 */
  video?: string;
  /** "不再显示"按钮文本 */
  nomoreShow?: string;
  /** 容器 DOM 元素 */
  containerElement?: HTMLElement;
}

/**
 * 吸附平面帮助提示组件
 * 显示引导用户如何使用吸附平面功能的帮助信息，包括文字说明和视频演示
 */
declare class SnappingPlaneHelp extends React.Component<SnappingPlaneHelpProps, SnappingPlaneHelpState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: SnappingPlaneHelpProps);

  /**
   * 销毁组件的回调函数
   * 调用控制器的 destroy 方法来卸载组件并设置 Cookie
   */
  private _destroyComponent(): void;

  /**
   * 渲染第一行提示标题
   * @returns 包含第一行标题的 React 元素，如果标题不存在则返回 null
   */
  private _renderTipTitleFirst(): React.ReactElement | null;

  /**
   * 渲染第二行提示标题
   * @returns 包含第二行标题的 React 元素，如果标题不存在则返回 null
   */
  private _renderTipTitleSecond(): React.ReactElement | null;

  /**
   * 渲染帮助视频
   * @returns 包含视频播放器的 React 元素，如果视频路径不存在则返回 null
   */
  private _renderVideo(): React.ReactElement | null;

  /**
   * 渲染"不再显示"按钮
   * @returns 包含"不再显示"按钮的 React 元素
   */
  private _renderNomoreShow(): React.ReactElement | null;

  /**
   * 组件挂载后的生命周期方法
   */
  componentDidMount(): void;

  /**
   * 渲染组件
   * @returns 组件的 React 元素结构
   */
  render(): React.ReactElement;
}

/**
 * 吸附平面帮助提示控制器
 * 负责管理帮助提示的创建、销毁以及 Cookie 状态管理
 */
export default class SnappingPlaneHelpCtrl {
  /**
   * 创建并显示吸附平面帮助提示
   * @param callback - 创建完成后的回调函数（可选）
   * @remarks
   * - 首先检查 Cookie，如果用户已查看过则直接执行回调
   * - 查找指定的容器元素并在其中渲染帮助组件
   * - 如果组件已存在则不重复创建
   */
  static create(callback?: () => void): void;

  /**
   * 获取帮助提示的 Cookie 值
   * @returns Cookie 值字符串，如果不存在则返回 undefined
   */
  static getCookie(): string | undefined;

  /**
   * 设置帮助提示的 Cookie 值
   * @param value - 要设置的 Cookie 值（通常为布尔值表示是否已查看）
   */
  static setCookie(value: boolean): void;

  /**
   * 悬停创建帮助提示
   * 重置 Cookie 状态并创建新的帮助提示
   */
  static hoverCreate(): void;

  /**
   * 销毁帮助提示组件
   * 卸载 React 组件，移除 DOM 元素，并设置 Cookie 标记用户已查看
   */
  static destroy(): void;
}

/**
 * 全局声明扩展
 */
declare global {
  /**
   * HSApp 全局配置对象
   */
  const HSApp: {
    /** 合作伙伴配置 */
    PartnerConfig?: {
      /** 资源基础路径 */
      RES_BASEPATH?: string;
    };
    /** 应用配置 */
    Config?: {
      /** 资源基础路径 */
      RES_BASEPATH?: string;
    };
  };

  /**
   * 资源管理器
   * 用于获取国际化字符串资源
   */
  const ResourceManager: {
    /**
     * 获取指定键的字符串资源
     * @param key - 资源键名
     * @returns 对应的字符串资源
     */
    getString(key: string): string;
  };

  /**
   * jQuery Cookie 插件扩展
   */
  interface JQueryStatic {
    /**
     * Cookie 操作方法
     * @param name - Cookie 名称
     * @param value - Cookie 值（可选，不传则为读取操作）
     * @returns 读取时返回 Cookie 值，设置时返回 undefined
     */
    cookie(name: string, value?: unknown): string | undefined;
  }
}