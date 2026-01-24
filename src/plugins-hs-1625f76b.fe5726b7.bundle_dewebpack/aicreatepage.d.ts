/**
 * AI创建页面组件模块
 * 
 * 提供AI生成功能的用户界面,包括AI模型生成、AI纹理生成和AI情绪板等功能。
 * 支持与iframe通信、AI相册管理、市场营销徽章集成等特性。
 * 
 * @module AICreatePage
 */

import type { CSSProperties, ReactNode, RefObject } from 'react';

/**
 * AI创建页面的配置选项
 */
export interface AICreatePageConfig {
  /** Logo图标类型 */
  logoIcon: string;
  
  /** 列表视图的事件追踪标识 */
  listEvent: string;
  
  /** 列表标题的国际化键名 */
  listTitle: string;
  
  /** 教程视频的URL */
  tutorialUrl: string;
  
  /** 教程点击的事件追踪标识 */
  tutorialEvent: string;
  
  /** 嵌入的iframe页面URL路径 */
  iframeUrl: string;
  
  /** 页面唯一标识符 */
  pageId: string;
  
  /** 自定义内容组件(可选) */
  contentComponent?: React.ComponentType<ContentComponentProps>;
}

/**
 * 自定义内容组件的属性
 */
export interface ContentComponentProps {
  /** 打开AI相册的回调函数 */
  handleOpenAIAlbum: () => void;
  
  /** 开始生成时的回调函数,返回场景类型名称 */
  startGenerateCallback: () => string;
}

/**
 * AI创建页面组件的属性
 */
export interface AICreatePageProps {
  /** 关闭面板的回调函数 */
  closePanel: () => void;
  
  /** AI创建页面的配置对象 */
  config: AICreatePageConfig;
}

/**
 * 市场营销数据结构
 */
export interface MarketingData {
  /** 市场类型 */
  marketType: string;
  
  /** 场景类型,默认为 'ai_modeler' */
  sceneType?: string;
}

/**
 * 从iframe接收的消息事件数据
 */
export interface IframeMessageData {
  /** 事件类型 */
  eType: 'showAIMarket' | 'openAIAlbum' | 'aigcIdentifyFail' | 'generateAI' | 'stopPolling' | 'closeMarket';
  
  /** 事件携带的数据 */
  eData?: {
    /** 市场类型 */
    marketType?: string;
    
    /** 场景类型 */
    sceneType?: 'ai_modeler' | 'ai_moodboard' | string;
    
    /** 其他扩展数据 */
    [key: string]: unknown;
  };
}

/**
 * 发送到iframe的消息数据
 */
export interface PostMessageToIframe {
  /** 事件类型 */
  eType: 'stopPolling' | 'closeMarket';
}

/**
 * AI相册拖拽组件的属性
 */
export interface MyAiPageDraggableProps {
  /** 页面唯一标识符 */
  pageId: string;
  
  /** 页面容器的引用 */
  pageRef: RefObject<HTMLDivElement>;
  
  /** 是否正在生成 */
  isGenerating: boolean;
  
  /** 设置生成状态的函数 */
  setIsGenerating: (generating: boolean) => void;
  
  /** 关闭面板的回调函数 */
  closePanel: () => void;
  
  /** 是否需要刷新模型器 */
  isRefreshModeler: boolean;
  
  /** 设置刷新模型器状态的函数 */
  setRefreshModeler: (refresh: boolean) => void;
  
  /** 搜索模型的函数(可选,用于企业用户) */
  searchModel?: (keyword: string) => Promise<SearchResult[]>;
  
  /** 停止轮询的回调函数 */
  stopPolling: () => void;
  
  /** 无搜索结果时的提示文本 */
  noResultHint: string;
}

/**
 * 搜索结果项
 */
export interface SearchResult {
  /** 产品ID */
  id: string;
  
  /** 产品名称 */
  name: string;
  
  /** 产品缩略图URL */
  thumbnail?: string;
  
  /** 其他产品属性 */
  [key: string]: unknown;
}

/**
 * 市场营销徽章插件接口
 */
export interface MarketingBadgePlugin {
  /**
   * 显示市场弹窗
   * @param marketType - 市场类型
   * @param sceneType - 场景类型
   * @param options - 配置选项
   */
  showMarketModal(
    marketType: string,
    sceneType: string,
    options: {
      /** 关闭弹窗的回调 */
      onClose: () => void;
    }
  ): void;
}

/**
 * 用户权益检查结果
 */
export interface BenefitCheckResult {
  /** 权益是否可用 */
  useful: boolean;
  
  /** 其他权益信息 */
  [key: string]: unknown;
}

/**
 * 全局用户对象(adskUser)
 */
export interface AdskUser {
  /** 企业ID(如果是企业用户) */
  enterpriseId?: string;
  
  /**
   * 检查用户权益
   * @param category - 权益类别
   * @param benefit - 权益名称
   * @returns 权益检查结果
   */
  checkBenefit(category: string, benefit: string): BenefitCheckResult | undefined;
}

/**
 * 存储管理器
 */
export interface StorageManager {
  /**
   * 获取存储的值
   * @param key - 存储键名
   * @returns 存储的值
   */
  get(key: string): string | boolean | null;
  
  /**
   * 设置存储的值
   * @param key - 存储键名
   * @param value - 要存储的值
   */
  set(key: string, value: string): void;
}

/**
 * 图标字体视图组件的属性
 */
export interface IconfontViewProps {
  /** 图标类型 */
  showType: string;
  
  /** 自定义样式 */
  customStyle?: CSSProperties;
  
  /** 背景配置 */
  background?: {
    width: string;
    height: string;
    borderRadius: string;
    background: string;
  };
}

/**
 * 工具提示组件的属性
 */
export interface TooltipProps {
  /** 提示文本 */
  title: string;
  
  /** 显示位置 */
  placement: 'top' | 'bottom' | 'left' | 'right';
  
  /** 颜色主题 */
  color: 'dark' | 'light';
  
  /** 子组件 */
  children: ReactNode;
}

/**
 * AI创建页面的主组件
 * 
 * 提供完整的AI内容生成界面,包括:
 * - iframe嵌入的AI生成工具
 * - AI相册管理面板
 * - 与市场营销系统的集成
 * - 生成状态跟踪和用户提示
 * 
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *