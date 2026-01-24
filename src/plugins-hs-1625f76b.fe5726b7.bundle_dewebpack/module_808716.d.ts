import * as React from 'react';

/**
 * 池类型枚举
 * 定义模型库中可用的不同池类型
 */
export enum PoolEnum {
  /** 高质量模型池 */
  HighQualityPool = 'highQualityPool',
  /** 高佣金模型池 */
  HighCommissionPool = 'highCommissionPool'
}

/**
 * 搜索产品参数接口
 * 用于模型库中产品搜索的参数配置
 */
export interface SearchProductsParams {
  /** 搜索关键词 */
  searchKey?: string;
  /** 分类ID列表，多个ID用逗号分隔 */
  categoriesIds?: string;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
  /** 其他扩展参数 */
  [key: string]: unknown;
}

/**
 * 专题页面组件的Props接口
 */
export interface SpecialTopicLandingPageProps {
  /** 
   * 专题模型点击回调
   * @param modelId - 被点击的模型ID
   */
  specialTopicModelClick?: (modelId: string) => void;
  
  /** 
   * 是否来自我的付费页面
   * @default false
   */
  fromMyPaid?: boolean;
  
  /** 
   * 入口文本
   * 显示在页面标题的主标题位置
   */
  entryText?: string;
  
  /** 
   * 页面标题
   * 显示在页面标题的副标题位置
   */
  title?: string;
  
  /** 
   * 缓存的标签页值
   * 用于保存用户上次选择的标签页
   */
  cacheTabsValue?: string | number;
  
  /** 
   * 当前标签页值
   * 控制当前显示的标签页
   */
  tabsValue?: string | number;
  
  /** 
   * 搜索产品方法
   * @param params - 搜索参数对象
   */
  searchProducts: (params: SearchProductsParams) => void;
  
  /** 
   * 池点击回调
   * @param poolType - 被点击的池类型
   */
  onPoolClick: (poolType: PoolEnum) => void;
}

/**
 * 专题页面组件的State接口
 */
export interface SpecialTopicLandingPageState {
  /** 分类列表 */
  categories: Category[];
  
  /** 模型数据列表 */
  modelData: ModelData[];
  
  /** 
   * 是否显示搜索框
   * @default false
   */
  showSearchBox: boolean;
  
  /** 
   * 是否为造型师会员
   * @default false
   */
  stylerMember: boolean;
  
  /** 
   * 搜索文本
   * 用户输入的搜索关键词
   */
  searchText: string;
}

/**
 * 分类数据接口
 */
export interface Category {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 父分类ID */
  parentId?: string;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 模型数据接口
 */
export interface ModelData {
  /** 模型ID */
  id: string;
  /** 模型名称 */
  name: string;
  /** 模型缩略图URL */
  thumbnail?: string;
  /** 模型描述 */
  description?: string;
  /** 所属分类ID */
  categoryId?: string;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 模型库池数据配置接口
 */
export interface PoolDataConfig {
  /** 高质量池配置 */
  highQualityPool?: PoolConfig;
  /** 高佣金池配置 */
  highCommissionPool?: PoolConfig;
}

/**
 * 单个池配置接口
 */
export interface PoolConfig {
  /** 池标题 */
  title: string;
  /** 池描述 */
  description?: string;
  /** 池图标URL */
  icon?: string;
  /** 其他配置 */
  [key: string]: unknown;
}

/**
 * 专题落地页组件
 * 
 * 用于展示模型库专题内容的React组件，支持：
 * - 模型搜索功能
 * - 分类筛选
 * - 专题模型展示
 * - 高质量模型池和高佣金模型池
 * - 适配不同租户环境（ezhome, fp, ICBU等）
 * 
 * @example
 *