/**
 * UserGuideFinisPopup 模块
 * 用户引导完成后的弹窗组件，展示祝贺信息和后续操作选项
 */

import React from 'react';
import { IconfontView } from './IconfontView';

/**
 * 用户引导完成弹窗的属性接口
 */
interface UserGuideFinisPopupProps {
  /**
   * 退出引导模式的回调函数
   */
  exitGuide: () => void;
}

/**
 * URL 查询参数接口
 */
interface QueryStrings {
  hasAssetId?: string;
  guide?: string;
  guidetype?: string;
  [key: string]: string | undefined;
}

/**
 * 环境管理器接口
 */
interface EnvironmentManager {
  activeEnvironment: {
    id: string;
  };
}

/**
 * 渲染插件接口
 */
interface RenderPlugin {
  exitRenderEnvironment: () => void;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  getPlugin: (pluginId: string) => RenderPlugin | null;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  pluginManager: PluginManager;
  environmentManager: EnvironmentManager;
  newDocument: () => void;
}

/**
 * URL 工具接口
 */
interface UrlUtil {
  getQueryStrings: () => QueryStrings;
  replaceParamsInUrl: (params: QueryStrings) => string;
  addWindowHistoryState: (key: string, value: string, url: string) => void;
}

/**
 * 全局应用接口
 */
interface HSAppGlobal {
  Config: {
    EZHOME_HOST: string;
  };
  App: {
    getApp: () => AppInstance;
  };
  Util: {
    Url: UrlUtil;
  };
}

/**
 * 资源管理器接口
 */
interface ResourceManagerGlobal {
  getString: (key: string) => string;
}

/**
 * 图标自定义样式接口
 */
interface IconCustomStyle {
  fontSize?: string;
  color?: string;
}

/**
 * 图标自定义背景样式接口
 */
interface IconCustomBgStyle {
  color?: string;
  fontSize?: string;
}

declare global {
  const HSApp: HSAppGlobal;
  const ResourceManager: ResourceManagerGlobal;
}

/**
 * 用户引导完成弹窗组件
 * 
 * 显示祝贺信息并提供两个操作选项：
 * 1. 前往 Homestyler 主页
 * 2. 创建新设计
 * 
 * @param props - 组件属性
 * @returns React 组件
 */
export declare function UserGuideFinisPopup(props: UserGuideFinisPopupProps): React.ReactElement;

export {};