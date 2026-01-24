/**
 * 模型专题列表组件模块
 * @module SpecialTopicListComponent
 */

import React from 'react';

/**
 * 专题类型枚举
 * @enum {string}
 */
export enum TopicType {
  /** 所有类型 */
  all = '',
  /** 设计合集类型 */
  designType = '1',
  /** 城市套餐类型 */
  cityType = '2',
}

/**
 * 价格类型枚举
 * @enum {string}
 */
export enum PriceType {
  /** 所有价格 */
  all = '',
  /** 付费 */
  paid = '1',
  /** 积分兑换 */
  point = '2',
  /** 免费 */
  free = '3',
}

/**
 * 过滤器选项值
 */
export interface FilterValue {
  /** 选项ID */
  id: string;
  /** 选项显示名称 */
  name: string;
}

/**
 * 单个过滤器配置
 */
export interface Filter {
  /** 过滤器选项数量 */
  count: number;
  /** 过滤器唯一标识 */
  id: string;
  /** 过滤器显示名称 */
  name: string;
  /** 过滤器可选值列表 */
  values: FilterValue[];
}

/**
 * 过滤器集合
 */
export interface Filters {
  /** 所有过滤器列表 */
  allFilters: Filter[];
  /** 外部过滤器列表 */
  outerFilters: Filter[];
  /** 剩余过滤器列表 */
  restFilters: Filter[];
}

/**
 * 专题数据项
 */
export interface TopicItem {
  /** 专题ID */
  id: string;
  /** 专题名称 */
  name: string;
  /** 专题封面图URL */
  coverUrl?: string;
  /** 专题描述 */
  description?: string;
  /** 模型数量 */
  modelCount?: number;
  /** 价格类型 */
  priceType?: PriceType;
  /** 专题类型 */
  topicType?: TopicType;
  [key: string]: unknown;
}

/**
 * API搜索专题列表请求参数
 */
export interface SearchTopicListParams {
  /** 池类型 */
  poolType: string;
  /** 销售类型 */
  sellType?: string;
  /** 页码（fp租户使用） */
  pageNum?: number;
  /** 每页大小（fp租户使用） */
  pageSize?: number;
}

/**
 * API搜索专题列表响应数据
 */
export interface SearchTopicListResponse {
  /** 专题数据列表 */
  data?: TopicItem[];
  /** 专题项列表（fp租户使用） */
  items?: TopicItem[];
  /** 是否为设计师会员 */
  stylerMember?: boolean;
}

/**
 * 组件Props
 */
export interface SpecialTopicListProps {
  /**
   * 专题模型点击回调
   * @param item - 被点击的专题项
   */
  specialTopicModelClick?: (item: TopicItem) => void;
}

/**
 * 组件State
 */
export interface SpecialTopicListState {
  /** 数据加载状态 */
  loading: boolean;
  /** 模型数据列表 */
  modelData: TopicItem[];
  /** 当前选中的专题类型 */
  topicType: string;
  /** 当前选中的价格类型 */
  priceType: string;
  /** 过滤器配置 */
  filters: Filters;
  /** 是否为设计师会员 */
  stylerMember: boolean;
}

/**
 * 过滤器变更事件数据
 */
export interface FilterChangeEvent {
  /** JSON字符串格式的追踪过滤器 */
  trackFilters: string;
}

/**
 * 专题列表组件
 * 用于展示模型专题合集和套餐，支持按类型和价格筛选
 * 
 * @example
 *