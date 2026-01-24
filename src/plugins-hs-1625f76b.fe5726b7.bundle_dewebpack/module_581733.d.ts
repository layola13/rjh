/**
 * 专题模型页面组件模块
 * 提供专题模型列表展示、筛选和交互功能
 */

/**
 * 专题类型枚举
 * @enum {string}
 */
export enum TopicType {
  /** 设计类型专题 */
  designType = "1",
  /** 城市类型专题 */
  cityType = "2"
}

/**
 * 产品项数据结构
 */
export interface ProductItem {
  /** 产品唯一标识 */
  id: string;
  /** 产品UUID */
  uuid: string;
  /** 专题池ID */
  topicPoolId?: string;
  /** 追踪ID集合 */
  traceIds?: Record<string, unknown>;
  /** 签到模型日历配置 */
  signModelCalendarConfig?: unknown;
  /** 页码 */
  page?: number;
  [key: string]: unknown;
}

/**
 * 分类面数据结构
 */
export interface CategoryFacet {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类计数 */
  count?: number;
  [key: string]: unknown;
}

/**
 * 专题数据属性
 */
export interface TopicAttributes {
  /** 封面图URL */
  COVER?: string;
  [key: string]: unknown;
}

/**
 * 专题数据结构
 */
export interface TopicData {
  /** 专题池ID */
  poolId: string;
  /** 专题类型 */
  topicType?: TopicType;
  /** 封面URL */
  coverUrl?: string;
  /** 专题属性 */
  attributes?: TopicAttributes;
  /** 签到模型日历配置 */
  signModelCalendarConfig?: unknown;
  [key: string]: unknown;
}

/**
 * 产品列表状态
 */
export interface ProductListState {
  /** 是否正在加载 */
  isLoading: boolean;
  /** 产品项列表 */
  items: ProductItem[];
  /** 总数 */
  total: number;
  /** 是否为设计师会员 */
  stylerMember: boolean;
}

/**
 * 产品查询参数
 */
export interface ProductQueryParams {
  /** 专题池ID */
  poolId: string;
  /** 分类ID（可选） */
  categoryId?: string;
  /** 偏移量 */
  offset: number;
  /** 限制数量 */
  limit: number;
  /** 是否禁用聚合 */
  disableAgg: boolean;
}

/**
 * 产品查询响应
 */
export interface ProductQueryResponse {
  /** 产品项列表 */
  items?: ProductItem[];
  /** 追踪ID集合 */
  traceIds?: Record<string, unknown>;
  /** 总数 */
  total?: number;
  /** 分类面列表 */
  categoryFacets?: CategoryFacet[];
  /** 是否为设计师会员 */
  stylerMember?: boolean;
}

/**
 * 专题模型页面组件属性
 */
export interface SpecialTopicModelPageProps {
  /** 头部返回按钮点击回调 */
  headerBackClick: () => void;
  /** 专题数据 */
  data: TopicData;
  /** 刷新次数（用于触发重新加载） */
  refreshNum?: number;
}

/**
 * 专题模型页面组件
 * 
 * @description 展示专题模型列表，支持分类筛选、无限滚动加载和用户交互追踪
 * 
 * @param props - 组件属性
 * @param props.headerBackClick - 返回按钮点击处理函数
 * @param props.data - 专题数据对象
 * @param props.refreshNum - 刷新计数器，变化时触发数据重新加载
 * 
 * @returns React组件
 * 
 * @example
 *