/**
 * 文章项接口
 */
export interface Article {
  /** 文章所属周期 */
  period: string;
  /** 文章ID */
  id?: string;
  /** 文章标题 */
  title?: string;
  /** 文章内容 */
  content?: string;
  /** 其他文章相关属性 */
  [key: string]: unknown;
}

/**
 * 分组后的文章周期数据
 */
export interface ArticlePeriodGroup {
  /** 周期标识 */
  period: string;
  /** 该周期下的文章列表 */
  articles: Article[];
  /** 是否为最新周期 */
  isNew?: boolean;
}

/**
 * 分页查询参数
 */
export interface QueryArticleParams {
  /** 数据偏移量 */
  offset: number;
  /** 每页数据条数 */
  limit: number;
}

/**
 * 分页查询响应结果
 */
export interface QueryArticleResponse {
  /** 文章列表 */
  items: Article[];
  /** 数据总数 */
  total: number;
}

/**
 * 分页器配置属性
 */
export interface PaginationProps {
  /** 当前页码 */
  current: number;
  /** 数据总条数 */
  total: number;
  /** 每页显示条数 */
  pageSize: number;
  /** 页码变化时的回调函数 */
  onChange: (page: number) => void;
}

/**
 * 周期页面组件属性
 */
export interface PeriodPageProps {
  /** 返回按钮图标 */
  backIcon?: React.ReactNode;
  /** 关闭回调函数 */
  close?: () => void;
}

/**
 * 页面元信息
 */
export interface PageInfo {
  /** 页面名称（用于内部标识） */
  name: string;
  /** 页面显示文本 */
  text: string;
}

/**
 * 按周期查询文章
 * @param params - 查询参数
 * @returns Promise，resolve返回查询结果
 */
export function queryArticleByPeriod(params: QueryArticleParams): Promise<QueryArticleResponse>;

/**
 * 周期页面组件
 * 
 * 用于显示按时间周期分组的文章列表，支持分页查询和导航。
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *