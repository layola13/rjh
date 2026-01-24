/**
 * 专题列表项组件的类型定义
 * @module SpecialTopicListItem
 */

/**
 * 专题项目数据结构
 */
export interface SpecialTopicItem {
  /** 专题ID */
  id: string | number;
  /** 专题名称 */
  name: string;
  /** 封面图片URL (FP租户使用) */
  coverUrl?: string;
  /** 专题属性 */
  attributes?: {
    /** 封面图片URL (非FP租户使用) */
    COVER?: string;
    [key: string]: unknown;
  };
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * 专题类型枚举
 */
export type TopicType = string;

/**
 * 专题模型点击回调函数参数
 */
export interface SpecialTopicClickPayload extends SpecialTopicItem {
  /** 专题类型 */
  topicType: TopicType;
  /** 池ID (FP租户专用) */
  poolId?: string | number;
}

/**
 * 专题模型点击事件处理函数
 */
export type SpecialTopicModelClickHandler = (payload: SpecialTopicClickPayload) => void;

/**
 * 专题列表项组件属性
 */
export interface SpecialTopicListItemProps {
  /** 专题数据项 */
  item: SpecialTopicItem;
  
  /** 专题类型 */
  topicType: TopicType;
  
  /** 专题模型点击回调函数 */
  specialTopicModelClick: SpecialTopicModelClickHandler;
  
  /** 自定义CSS类名 */
  className?: string;
  
  /** 是否显示"NEW"标签 */
  newTag?: boolean;
}

/**
 * 专题列表项组件
 * 
 * @description
 * 用于展示专题卡片，包含封面图、收藏功能和悬停交互效果。
 * 支持FP和非FP租户的不同展示逻辑。
 * 
 * @param props - 组件属性
 * @returns React组件
 * 
 * @example
 *