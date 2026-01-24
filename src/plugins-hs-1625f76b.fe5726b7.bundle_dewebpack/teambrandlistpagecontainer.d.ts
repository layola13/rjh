/**
 * TeamBrandListPageContainer 模块
 * 团队品牌列表页面容器组件
 */

import { ReactElement } from 'react';

/**
 * 店铺/品牌数据项接口
 */
export interface ShopBrandItem {
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
  /** 其他扩展属性 */
  [key: string]: any;
}

/**
 * 团队品牌列表查询参数
 */
export interface TeamBrandListParams {
  /** 偏移量，用于分页 */
  offset: number;
  /** 每页数量限制 */
  limit: number;
  /** 一级分类ID */
  levelOne: string;
  /** 二级分类ID，空字符串表示全部 */
  levelTwo: string;
  /** 品牌名称，用于搜索过滤 */
  brandName?: string;
}

/**
 * 团队品牌列表响应数据
 */
export interface TeamBrandListResponse {
  /** 店铺/品牌列表 */
  firstPageShopList: ShopBrandItem[];
  /** 总数 */
  total: number;
}

/**
 * 分类筛选项
 */
export interface CatalogFilterItem {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 其他属性 */
  [key: string]: any;
}

/**
 * 团队品牌列表页面容器组件属性
 */
export interface TeamBrandListPageContainerProps {
  /** 店铺组ID（一级分类） */
  shopGroupId: string;
  
  /** 店铺组名称 */
  shopGroupName: string;
  
  /** 店铺名称 */
  shopName: string;
  
  /** 二级分类子项列表 */
  levelChildren: CatalogFilterItem[];
  
  /** 所有已收藏的ID列表 */
  allFavIds: string[];
  
  /** 返回按钮点击回调 */
  onBack: () => void;
  
  /** 店铺卡片点击回调 */
  onShopCardClick: (id: string, name: string, isFavorite: boolean) => void;
  
  /** 搜索返回回调 */
  handleSearchBack: () => void;
  
  /** 搜索店铺回调 */
  handleSearchShop: (groupName: string, searchKey: string) => void;
  
  /** 页面类型（如：shop_list_page, BRAND_LIST_PAGE_SEARCH等） */
  type: string;
  
  /** 默认搜索关键词 */
  defaultSearchKey?: string;
}

/**
 * 团队品牌列表页面容器组件
 * 
 * @description 展示团队品牌列表，支持搜索、筛选、分页和收藏功能
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *