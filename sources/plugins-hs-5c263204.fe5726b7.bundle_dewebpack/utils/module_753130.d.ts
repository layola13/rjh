/**
 * 收藏夹管理模块
 * 提供收藏夹分组、话题收藏等功能
 */

import type { HSCore } from 'hscore';
import type { NWTK } from 'nwtk';
import type { HSApp } from 'hsapp';
import type { ResourceManager } from 'resource-manager';
import type { HSFPConstants } from 'hsfp-constants';

/**
 * 收藏夹分组项
 */
export interface FavFolderItem {
  /** 收藏夹ID */
  favoritesId: string;
  /** 分组名称 */
  name: string;
  /** 类型 */
  type: number;
  /** 是否默认 */
  whetherDefault?: number;
  /** 作用域ID */
  scopeId?: string;
  /** 创建时间 */
  createTime?: number;
  /** 更新时间 */
  updateTime?: number;
}

/**
 * 收藏夹列表响应数据
 */
export interface FavFoldersResponse {
  /** 分组项列表 */
  items: FavFolderItem[];
  /** 总数 */
  total: number;
}

/**
 * MTOP API 响应格式
 */
export interface MtopResponse<T = unknown> {
  /** 返回码 */
  ret: string[];
  /** 响应数据 */
  data: T;
}

/**
 * 获取收藏夹请求参数
 */
export interface GetFavFoldersParams {
  /** 类型 */
  type: number;
  /** 页码 */
  pageNum: number;
  /** 每页大小 */
  pageSize: number;
  /** 源ID */
  sourceId?: string;
  /** 是否默认（3表示查询全部） */
  whetherDefault: number;
  /** 作用域ID */
  scopeId?: string;
}

/**
 * 收藏夹管理工具类
 */
export interface FavoriteManager {
  /**
   * 隐藏分组面板信号
   */
  signalHiddenGroupPanel: HSCore.Util.Signal;

  /**
   * 添加分组信号
   */
  signalAddGroup: HSCore.Util.Signal;

  /**
   * 解析资源URL
   * @param url - 原始URL
   * @returns 解析后的完整URL
   */
  parseURL(url: string): string;

  /**
   * 获取EA自定义作用域ID
   * @returns 作用域ID，如果不存在则返回空字符串
   */
  getEACustomScopeId(): string;

  /**
   * 获取限定数量的收藏夹分组
   * @param type - 分组类型
   * @param pageNum - 页码
   * @param pageSize - 每页大小
   * @param sourceId - 源ID（可选）
   * @returns Promise，返回收藏夹列表数据
   */
  getLimitedFavFolders(
    type: number,
    pageNum: number,
    pageSize: number,
    sourceId?: string
  ): Promise<FavFoldersResponse>;

  /**
   * 请求所有分组项（支持分页自动加载）
   * @param sourceId - 源ID（可选）
   * @returns Promise，返回所有分组项数组
   */
  requestAllGroupItems(sourceId?: string): Promise<FavFolderItem[]>;

  /**
   * 添加分组项
   * @param name - 分组名称
   * @returns Promise，返回创建的分组数据
   */
  addGroupItem(name: string): Promise<unknown>;

  /**
   * 删除分组
   * @param favoritesId - 收藏夹ID
   * @returns Promise，返回删除结果
   */
  deleteGroup(favoritesId: string): Promise<unknown>;

  /**
   * 更新分组
   * @param favoritesId - 收藏夹ID
   * @param name - 新的分组名称
   * @returns Promise，返回更新结果
   */
  updateGroup(favoritesId: string, name: string): Promise<unknown>;

  /**
   * 检查分组名称是否重复
   * @param items - 分组项列表
   * @param name - 要检查的名称
   * @param excludeName - 要排除的名称（编辑时使用）
   * @returns 如果重复返回true，否则返回false
   */
  isDuplicateInName(
    items: FavFolderItem[],
    name: string,
    excludeName?: string
  ): boolean;

  /**
   * 添加话题收藏
   * @param sourceId - 话题源ID
   * @returns Promise，返回收藏结果
   */
  addFavoriteTopic(sourceId: string): Promise<Record<string, unknown>>;

  /**
   * 将Data URL转换为File对象
   * @param dataURL - Data URL字符串
   * @param filename - 文件名（不含扩展名），默认为"file"
   * @returns File对象
   */
  dataURLtoFile(dataURL: string, filename?: string): File;
}

declare const favoriteManager: FavoriteManager;

export default favoriteManager;