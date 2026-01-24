/**
 * 专题落地页组件模块
 * @module SpecialTopicLandingPage
 */

import React from 'react';

/**
 * 搜索产品的配置参数
 */
export interface SearchProductConfig {
  /** 搜索文本内容 */
  text: string;
  /** 分类ID列表（逗号分隔） */
  categoriesIds: string;
  /** 其他扩展参数 */
  [key: string]: unknown;
}

/**
 * 事件追踪日志配置
 */
export interface EventTrackLogConfig {
  /** 日志类型 */
  logType: 'search' | string;
  /** 目标类型 */
  targetType: 'model' | string;
  /** 操作类型 */
  action: 'start' | 'end' | string;
  /** 区域标识 */
  area: 'specialTopicPage' | 'specialTopPage' | string;
  /** 搜索类型 */
  searchType: 'text' | 'image' | string;
  /** 搜索文本（可选） */
  text?: string;
}

/**
 * 事件追踪管理器接口
 */
export interface EventTrackManager {
  /**
   * 发送目录追踪日志
   * @param config - 日志配置对象
   */
  signalCatalogToLog(config: EventTrackLogConfig): void;
}

/**
 * 目录管理器 - 单例模式
 */
export interface CatalogManager {
  /**
   * 获取HSCatalog库的引用
   * @returns 目录库对象
   */
  getHSCatalogLib(): HSCatalogLib;
}

/**
 * HSCatalog库接口
 */
export interface HSCatalogLib {
  /** 返回头部组件 */
  BackHeader: React.ComponentType<BackHeaderProps>;
  /** 搜索框组件 */
  SearchBox: React.ComponentType<SearchBoxProps>;
}

/**
 * 返回头部组件属性
 */
export interface BackHeaderProps {
  /** 返回按钮回调 */
  onBack?: () => void;
  /** 标题文本 */
  title?: string;
}

/**
 * 搜索框组件属性
 */
export interface SearchBoxProps {
  /** 占位符文本 */
  placeholder?: string;
  /** 设置搜索配置的回调 */
  setSearchConfig?: (config: SearchProductConfig) => void;
  /** 返回按钮图标类型 */
  backIconType?: 'delete' | 'back' | string;
  /** 返回按钮处理器 */
  handleBack?: () => void;
  /** 是否显示搜索图片功能 */
  showSearchPicture?: boolean;
}

/**
 * 滚动组件属性
 */
export interface ScrollProps {
  /** CSS类名 */
  className?: string;
  /** Y轴滚动事件回调 */
  onScrollY?: (event: unknown) => void;
  /** 是否显示Y轴滚动提示 */
  scrollYTip?: boolean;
  /** 滚动配置选项 */
  options?: {
    /** 是否禁用X轴滚动 */
    suppressScrollX?: boolean;
    [key: string]: unknown;
  };
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 专题模型组件属性
 */
export interface SpecialTopicModelProps {
  /** 专题模型点击回调 */
  specialTopicModelClick?: (data: unknown) => void;
}

/**
 * 专题落地页组件的属性接口
 */
export interface SpecialTopicLandingPageProps {
  /**
   * 搜索产品方法
   * @param config - 搜索配置参数
   */
  searchProducts: (config: SearchProductConfig) => void;

  /**
   * 专题模型点击回调
   * @param data - 点击事件数据
   */
  specialTopicModelClick?: (data: unknown) => void;

  /**
   * 入口文本标题
   */
  entryText?: string;

  /**
   * 头部返回按钮回调
   */
  onHeaderBack?: () => void;
}

/**
 * 组件内部状态接口
 */
export interface SpecialTopicLandingPageState {
  /** 分类列表 */
  categories: unknown[];
  /** 模型数据列表 */
  modelData: unknown[];
  /** 是否显示搜索框 */
  showSearchBox: boolean;
}

/**
 * 环境常量 - TPZZ环境标识
 */
declare const HSFPConstants: {
  Environment: {
    /** TPZZ环境ID */
    TPZZ: string | number;
  };
};

/**
 * 全局HSApp命名空间
 */
declare namespace HSApp {
  /** 应用配置 */
  namespace Config {
    /** 租户标识 */
    const TENANT: string;
  }

  /** 目录相关功能 */
  namespace Catalog {
    /** 目录管理器 */
    const Manager: CatalogManager;

    /** 事件追踪管理器类 */
    class EventTrackManager {
      /** 获取单例实例 */
      static getInstance(): EventTrackManager;
      /** 发送目录追踪日志 */
      signalCatalogToLog(config: EventTrackLogConfig): void;
    }

    /** 基础API管理器类 */
    class BaseApiManager {
      /** 获取单例实例 */
      static getInstance(): BaseApiManager;
      /** 事件管理器 */
      eventsManager: {
        /** 监听鼠标事件 */
        listenMouseEvent(config: { type: string }): void;
      };
    }
  }

  /** 应用实例 */
  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): {
      /** 环境管理器 */
      environmentManager: {
        /** 当前激活的环境ID */
        activeEnvironmentId: string | number;
      };
    };
  }

  /** 工具方法集 */
  namespace Util {
    /** URL工具 */
    namespace Url {
      /**
       * 获取URL查询字符串参数
       * @returns 查询参数对象
       */
      function getQueryStrings(): Record<string, string>;
    }
  }
}

/**
 * 全局资源管理器
 */
declare const ResourceManager: {
  /**
   * 获取国际化字符串
   * @param key - 资源键名
   * @returns 对应的国际化文本
   */
  getString(key: string): string;
};

/**
 * 专题落地页React组件类
 * 
 * @description
 * 该组件用于展示专题落地页，包含：
 * - 可切换的搜索框
 * - 返回头部
 * - 可滚动的模型展示区域
 * - 事件追踪功能
 * 
 * @example
 *