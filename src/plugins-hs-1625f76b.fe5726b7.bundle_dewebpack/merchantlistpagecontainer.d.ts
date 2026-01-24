/**
 * 商家列表页面容器模块
 * @module MerchantListPageContainer
 */

import { ReactElement } from 'react';

/**
 * 商家店铺信息接口
 */
export interface MerchantShop {
  /** 店铺所有者ID */
  ownerId: string;
  /** 品牌ID */
  brandId: string;
  /** 店铺名称 */
  shopName: string;
  /** 品牌名称 */
  brandName: string;
  /** 是否已收藏 */
  active?: boolean;
  /** 其他店铺相关属性 */
  [key: string]: unknown;
}

/**
 * 分页查询参数接口
 */
export interface MerchantQueryParams {
  /** 分页偏移量 */
  offset: number;
  /** 每页数量限制 */
  limit: number;
  /** 一级分类ID */
  levelOne: string;
  /** 二级分类ID，为空字符串表示全部 */
  levelTwo: string;
  /** 店铺名称搜索关键词 */
  shopName?: string;
}

/**
 * 分类子项接口
 */
export interface CategoryChild {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 其他分类属性 */
  [key: string]: unknown;
}

/**
 * 商家店铺列表响应接口
 */
export interface MerchantShopListResponse {
  /** 店铺列表数据 */
  data: MerchantShop[];
  /** 总记录数 */
  total: number;
}

/**
 * 页面类型枚举
 */
export type PageType = 
  | 'shop_list_page'          // 店铺列表页
  | 'shop_list_page_search';  // 店铺搜索页

/**
 * 商家列表页面容器组件属性接口
 */
export interface MerchantListPageContainerProps {
  /** 店铺组ID */
  shopGroupId: string;
  
  /** 店铺组名称 */
  shopGroupName: string;
  
  /** 店铺名称 */
  shopName?: string;
  
  /** 分类层级子项列表 */
  levelChildren?: CategoryChild[];
  
  /** 所有已收藏的店铺ID列表 */
  allFavIds: string[];
  
  /** 返回按钮回调函数 */
  onBack: () => void;
  
  /** 店铺卡片点击回调函数 */
  onShopCardClick: (shopId: string, shopName: string, isFromSearch: boolean) => void;
  
  /** 搜索页返回回调函数 */
  handleSearchBack: () => void;
  
  /** 搜索店铺回调函数 */
  handleSearchShop: (groupName: string, searchKey: string) => void;
  
  /** 页面类型 */
  type: PageType;
  
  /** 默认搜索关键词 */
  defaultSearchKey?: string;
}

/**
 * 商家列表页面容器组件
 * 
 * @description
 * 用于展示商家店铺列表的容器组件，支持以下功能：
 * - 店铺列表展示与分页加载
 * - 店铺搜索功能
 * - 分类筛选
 * - 收藏状态管理
 * - 响应式布局计算
 * 
 * @example
 *