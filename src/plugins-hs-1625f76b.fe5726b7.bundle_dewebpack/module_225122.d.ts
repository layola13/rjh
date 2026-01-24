/**
 * 模型专题页面组件类型定义
 * @module SpecialTopicModelPage
 */

/**
 * 产品查询参数
 */
export interface ProductQueryParams {
  /** 池子ID */
  poolId: string;
  /** 分类ID（可选） */
  categoryId?: string;
  /** 偏移量 */
  offset: number;
  /** 限制数量 */
  limit: number;
  /** 是否禁用聚合 */
  disableAgg: boolean;
  /** 属性ID列表（可选） */
  attributeIds?: string;
}

/**
 * 属性值项
 */
export interface AttributeValue {
  /** 属性值ID */
  id: string;
  /** 属性值名称 */
  name: string;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 属性项
 */
export interface Attribute {
  /** 属性ID */
  id: string;
  /** 属性名称 */
  name: string;
  /** 属性值列表 */
  values: AttributeValue[];
}

/**
 * 产品项
 */
export interface ProductItem {
  /** 唯一标识符 */
  uuid: string;
  /** 产品ID */
  id: string;
  /** 其他产品属性 */
  [key: string]: unknown;
}

/**
 * 产品查询结果
 */
export interface ProductQueryResult {
  /** 产品列表 */
  items?: ProductItem[];
  /** 总数 */
  total?: number;
  /** 属性列表 */
  attributes?: Attribute[];
  /** 分类facets */
  categoryFacets?: AttributeValue[];
  /** 是否为样式会员 */
  stylerMember?: boolean;
}

/**
 * 专题数据
 */
export interface SpecialTopicData {
  /** 池子ID */
  poolId: string;
  /** 封面URL（可选） */
  coverUrl?: string;
  /** 属性对象（可选） */
  attributes?: {
    /** 封面属性 */
    COVER?: string;
    [key: string]: unknown;
  };
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 组件状态
 */
export interface ComponentState {
  /** 是否加载中 */
  isLoading: boolean;
  /** 产品列表 */
  items: ProductItem[];
  /** 总数 */
  total: number;
  /** 是否为样式会员 */
  stylerMember: boolean;
}

/**
 * 用户追踪日志数据
 */
export interface UserTrackLog {
  /** 活动区域 */
  activeSection: string;
  /** 活动区域名称 */
  activeSectionName: string;
  /** 描述 */
  description: string;
  /** 点击率数据（可选） */
  clicksRatio?: {
    id: string;
    name: string;
  };
  /** 专题ID（可选） */
  specialTopicId?: string;
  /** 模型ID（可选） */
  modelId?: string;
}

/**
 * 组件Props
 */
export interface SpecialTopicModelPageProps {
  /** 头部返回按钮点击回调 */
  headerBackClick: () => void;
  /** 专题数据 */
  data: SpecialTopicData;
  /** 刷新次数 */
  refreshNum: number;
}

/**
 * 专题模型页面组件
 * @param props - 组件属性
 * @returns React组件
 */
declare const SpecialTopicModelPage: React.FC<SpecialTopicModelPageProps>;

export default SpecialTopicModelPage;