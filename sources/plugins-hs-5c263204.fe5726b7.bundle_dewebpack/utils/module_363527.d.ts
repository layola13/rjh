/**
 * 收藏功能管理模块
 * @module FavoriteManager
 */

import React from 'react';
import { Dispatch } from 'redux';
import { Store } from 'redux';

// ==================== 类型定义 ====================

/**
 * 收藏组类型
 */
export interface FavoriteGroup {
  /** 组ID */
  id: string;
  /** 组名称 */
  name: string;
  /** 收藏项列表 */
  items?: FavoriteItem[];
  /** 创建时间 */
  createTime?: number;
  /** 更新时间 */
  updateTime?: number;
}

/**
 * 收藏项类型
 */
export interface FavoriteItem {
  /** 数据ID */
  dataId: string;
  /** JID标识符 */
  jid: string;
  /** 产品类型 */
  productType?: string;
  /** 实体名称 */
  entityName?: string;
  /** 其他元数据 */
  [key: string]: unknown;
}

/**
 * Redux状态类型
 */
export interface ReduxState {
  /** 收藏组列表 */
  groupItems: FavoriteGroup[];
}

/**
 * 自定义收藏数据参数
 */
export interface CustomFavDataParams {
  /** 收藏组ID */
  favoritesId?: string;
  /** 源收藏组ID */
  sourceFavoritesId?: string;
  /** 目标收藏组ID */
  targetFavoritesId?: string;
  /** 源ID列表 */
  sourceIdList: string[];
  /** 操作类型: 1-普通移动 2-主题批量移动 */
  type?: 1 | 2;
}

/**
 * 事件追踪日志参数
 */
export interface EventTrackLogParams {
  /** 日志类型 */
  logType: 'favorite';
  /** 目标类型 */
  targetType: 'model' | 'topic' | 'assembly';
  /** 目标ID */
  id: string;
  /** 是否已收藏 */
  isFav: boolean;
}

// ==================== 组件属性定义 ====================

/**
 * 收藏列表面板组件属性
 */
export interface FavListPanelProps {
  /** 收藏组列表 */
  favoriteGroups: FavoriteGroup[];
  /** 添加收藏组回调 */
  addGroup: (groupName: string) => Promise<void>;
  /** 更新收藏项回调 */
  updateFavorite: (sourceFavId: string, targetFavId: string) => Promise<unknown>;
  /** 添加收藏回调 */
  handleAddFavorite: (favId: string) => Promise<void>;
  /** 是否已收藏 */
  hasFaved: boolean;
  /** 鼠标进入事件处理 */
  handleMouseEnter?: () => void;
  /** 移除DOM元素回调 */
  removeDom: () => void;
  /** 改变视图位置回调 */
  changeViewPosition?: () => void;
  /** 是否为批量移动模式 */
  isBatchMove?: boolean;
  /** 是否为主题批量移动模式 */
  isTopicBatchMove?: boolean;
  /** 是否显示编辑名称功能 */
  showEditName?: boolean;
  /** 实体名称 */
  entityName?: string;
  /** 是否显示关闭按钮 */
  showCloseBtn?: boolean;
  /** 更新实体名称回调 */
  handleUpdateEntityName?: (newName: string) => Promise<void>;
  /** 提交成功回调 */
  onSubmitCallback?: () => void;
  /** 取消操作回调 */
  onCancelCallback?: () => void;
}

/**
 * 收藏容器组件内部属性 (从Redux连接)
 */
interface FavoriteContainerInternalProps {
  /** 收藏组列表 (从Redux状态映射) */
  favoriteGroups: FavoriteGroup[];
  /** Redux dispatch函数 */
  dispatch: Dispatch;
  /** 子组件渲染函数 */
  children: (onToggleFavorite: () => void, isFaved: boolean) => React.ReactNode;
  /** 是否显示弹出面板 */
  showPopup?: boolean;
  /** 添加收藏回调 */
  addFav?: (item: FavoriteItem) => void;
  /** 取消收藏回调 */
  cancelFav?: (item: FavoriteItem) => void;
  /** 当前操作的收藏项 */
  item?: FavoriteItem;
  /** 是否为批量移动模式 */
  isBatchMove?: boolean;
  /** 是否为主题批量移动模式 */
  isTopicBatchMove?: boolean;
  /** 批量操作的ID列表 */
  idList?: string[];
  /** 移动完成后的回调 */
  handleMove?: () => void;
  /** 更新收藏回调 */
  updateFav?: (item: FavoriteItem) => void;
  /** 实体名称 */
  entityName?: string;
  /** 是否显示编辑名称功能 */
  showEditName?: boolean;
  /** 收藏类型 */
  type?: string;
  /** 提交成功回调 */
  onSubmitCallback?: () => void;
  /** 取消操作回调 */
  onCancelCallback?: () => void;
  /** 查找ID (用于兼容不同ID字段) */
  seekId?: string;
}

/**
 * 收藏容器组件外部属性 (最终导出)
 */
export interface FavoriteContainerProps extends Omit<FavoriteContainerInternalProps, 'favoriteGroups' | 'dispatch'> {}

// ==================== 插件接口 ====================

/**
 * 收藏插件接口
 */
export interface FavoritePlugin {
  /** 获取收藏数据 */
  getFavoritesData(): Map<string, FavoriteItem>;
  
  /** 设置自定义收藏数据 */
  setCustomFavData(data: unknown): void;
  
  /** 添加收藏 */
  addFavorite(
    id: string,
    context?: unknown,
    favId?: string,
    type?: string
  ): Promise<void>;
  
  /** 移除收藏 */
  removeFavorite(id: string): Promise<void>;
  
  /** 更新收藏 */
  updateFavorite(params: CustomFavDataParams): Promise<unknown>;
  
  /** 请求所有收藏组 */
  requestAllGroupItems(id: string): Promise<FavoriteGroup[]>;
  
  /** 主题收藏批量移动 */
  topicFavBatchMove(params: CustomFavDataParams): Promise<unknown>;
}

/**
 * 基础数据管理器接口
 */
export interface BaseDataManager {
  /** 更新自定义收藏数据 */
  updateCustomFavData(
    operation: 'add' | 'update' | 'delete' | 'refresh',
    dataId?: string,
    productType?: string
  ): unknown;
  
  /** 获取主题EA自定义收藏数据 */
  getTopicEACustomFavData(): Record<string, unknown>;
}

/**
 * 事件追踪管理器接口
 */
export interface EventTrackManager {
  /** 发送目录日志信号 */
  signalCatalogToLog(params: EventTrackLogParams): void;
}

// ==================== 全局类型扩展 ====================

declare global {
  /**
   * HSApp全局对象
   */
  interface HSApp {
    /** 应用实例 */
    App: {
      getApp(): Application;
    };
    
    /** 目录模块 */
    Catalog: {
      EventTrackManager: {
        getInstance(): EventTrackManager;
      };
      Manager: {
        baseApiManager: {
          baseDataManager: BaseDataManager;
        };
      };
      BaseApiManager: {
        getInstance(): {
          canShowFloatView(): boolean;
          baseDataManager: BaseDataManager;
        };
      };
    };
    
    /** 工具模块 */
    Util: {
      EventTrack: {
        instance(): {
          track(group: string, action: string): void;
        };
      };
      EventGroupEnum: {
        Catalog: string;
      };
    };
  }

  /**
   * 应用实例接口
   */
  interface Application {
    pluginManager: {
      getPlugin(type: string): FavoritePlugin;
    };
  }

  /**
   * HSFPConstants常量
   */
  const HSFPConstants: {
    PluginType: {
      Favorite: string;
    };
  };

  /**
   * NWTK API接口
   */
  const NWTK: {
    mtop: {
      Catalog: {
        updateAssemblyProduct(params: {
          data: {
            id: string;
            name: string;
          };
        }): Promise<unknown>;
      };
    };
  };

  const HSApp: HSApp;
}

// ==================== Redux Actions ====================

/**
 * 添加收藏组Action
 */
export function addGroup(groupName: string, itemId: string): {
  type: string;
  payload: {
    groupName: string;
    itemId: string;
  };
};

// ==================== 主组件 ====================

/**
 * 收藏容器组件 (已连接Redux)
 * 
 * 该组件提供收藏功能的完整UI交互，包括：
 * - 添加/取消收藏
 * - 收藏组管理
 * - 批量移动收藏项
 * - 悬停显示收藏面板
 * 
 * @example
 *