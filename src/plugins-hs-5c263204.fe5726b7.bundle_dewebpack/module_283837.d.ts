/**
 * 新手引导结束弹窗组件类型定义
 * @module GuideEndPopup
 */

import React from 'react';

/**
 * 引导结束弹窗组件的属性接口
 */
export interface GuideEndPopupProps {
  /**
   * 退出引导的回调函数
   */
  exitGuide: () => void;
}

/**
 * 图标组件的属性接口
 */
export interface IconfontViewProps {
  /**
   * 图标类型/名称
   */
  showType: string;
  
  /**
   * 自定义样式
   */
  customStyle?: {
    color?: string;
    fontSize?: string;
    [key: string]: any;
  };
}

/**
 * URL查询参数接口
 */
export interface QueryParams {
  hasAssetId?: string;
  guide?: string;
  guidetype?: string;
  assetId?: string;
  [key: string]: string | undefined;
}

/**
 * 渲染插件接口
 */
export interface RenderPlugin {
  /**
   * 退出渲染环境
   */
  exitRenderEnvironment(): void;
}

/**
 * 环境管理器接口
 */
export interface EnvironmentManager {
  activeEnvironment: {
    id: string;
  };
}

/**
 * 插件管理器接口
 */
export interface PluginManager {
  /**
   * 获取指定插件实例
   * @param pluginName - 插件名称
   */
  getPlugin(pluginName: string): RenderPlugin | null;
}

/**
 * 应用实例接口
 */
export interface AppInstance {
  pluginManager: PluginManager;
  environmentManager: EnvironmentManager;
  
  /**
   * 创建新文档
   */
  newDocument(): void;
}

/**
 * 全局HSApp命名空间
 */
declare global {
  namespace HSApp {
    namespace App {
      function getApp(): AppInstance;
    }
    
    namespace Util {
      namespace EventTrack {
        function instance(): EventTrackInstance;
      }
      
      interface EventTrackInstance {
        track(group: EventGroupEnum, event: string): void;
      }
      
      enum EventGroupEnum {
        NewUserGuide = 'NewUserGuide'
      }
      
      namespace Url {
        function getQueryStrings(): QueryParams;
        function replaceParamsInUrl(params: QueryParams): string;
        function addWindowHistoryState(key: string, value: string, url: string): void;
      }
    }
  }
  
  namespace ResourceManager {
    function getString(key: string): string;
  }
}

/**
 * 新手引导结束弹窗组件
 * 显示二维码联系方式和完成引导的操作按钮
 * 
 * @param props - 组件属性
 * @returns React元素
 */
declare const GuideEndPopup: React.FC<GuideEndPopupProps>;

export default GuideEndPopup;