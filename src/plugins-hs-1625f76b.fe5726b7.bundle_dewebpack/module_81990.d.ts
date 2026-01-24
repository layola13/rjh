/**
 * 专题列表收藏组件类型定义
 * @module SpecialTopicListFavorite
 */

/**
 * 专题类型枚举
 */
export enum TopicType {
  /** 设计类型 */
  designType = "1",
  /** 城市类型 */
  cityType = "2"
}

/**
 * 销售信息接口
 */
export interface SaleInfo {
  /** 是否已付费：1-已付费 */
  paid?: number;
  /** 销售状态：1-销售中, 2-预售, 4-会员专享 */
  sale?: number;
}

/**
 * 专题项属性接口
 */
export interface TopicAttributes {
  /** 封面图URL */
  COVER?: string;
  [key: string]: unknown;
}

/**
 * 专题项数据接口
 */
export interface TopicItem {
  /** 专题ID */
  id: string;
  /** 专题名称 */
  name: string;
  /** 封面图URL（FP租户使用） */
  coverUrl?: string;
  /** 专题属性 */
  attributes: TopicAttributes;
  /** 销售信息 */
  saleInfo?: SaleInfo;
  /** 资源池趋势标签 */
  poolTrendTag?: string;
  /** 资源池ID（FP租户使用） */
  poolId?: string;
  /** 专题类型 */
  topicType?: TopicType;
}

/**
 * 专题点击事件参数接口
 */
export interface TopicClickEventData extends TopicItem {
  /** 专题类型 */
  topicType: TopicType;
  /** 资源池ID（FP租户专用） */
  poolId?: string;
}

/**
 * 组件属性接口
 */
export interface SpecialTopicListFavoriteProps {
  /** 专题项数据 */
  item: TopicItem;
  /** 专题类型 */
  topicType: TopicType;
  /** 专题点击回调函数 */
  specialTopicModelClick: (data: TopicClickEventData) => void;
  /** 是否为会员样式 */
  stylerMember?: boolean;
}

/**
 * 专题列表收藏组件
 * 
 * @description 展示专题列表项，支持封面图、收藏功能、会员标识等
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *