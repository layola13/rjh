/**
 * 教学能力相关API模块
 * 提供文章查询、标签管理、功能配置、提醒等功能
 */

/**
 * MTOP接口响应基础结构
 */
interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data?: {
    /** 业务结果数据 */
    result?: T;
  };
}

/**
 * 通用请求参数，包含魔法值、域名、版本信息
 */
interface CommonRequestParams {
  /** 魔法值，用于请求验证 */
  magic: string;
  /** 请求域名 */
  domain: string;
  /** API版本号 */
  version: string;
}

/**
 * 文章标签结构
 */
interface ArticleTag {
  /** 标签名称 */
  name?: string;
  [key: string]: unknown;
}

/**
 * 文章项结构
 */
interface ArticleItem {
  /** 文章标签，可能是JSON字符串或对象 */
  tag?: string | ArticleTag | null;
  [key: string]: unknown;
}

/**
 * 文章查询响应结构
 */
interface ArticleQueryResponse {
  /** 文章列表 */
  items?: ArticleItem[];
  [key: string]: unknown;
}

/**
 * 不再提醒请求参数
 */
interface NoRemindParams {
  [key: string]: unknown;
}

/**
 * 关键词查询参数
 */
interface QueryByKeywordParams {
  /** 搜索关键词 */
  keyword?: string;
  [key: string]: unknown;
}

/**
 * 标签查询参数
 */
interface QueryByLabelParams {
  /** 标签ID或名称 */
  label?: string;
  [key: string]: unknown;
}

/**
 * 时期查询参数
 */
interface QueryByPeriodParams {
  /** 时期标识 */
  period?: string;
  [key: string]: unknown;
}

/**
 * 功能配置查询参数
 */
interface QueryFunctionConfigParams {
  /** 功能ID */
  functionId?: string;
  [key: string]: unknown;
}

/**
 * 提醒功能列表查询参数
 */
interface QueryRemindFunctionListParams {
  [key: string]: unknown;
}

/**
 * 设置不再提醒
 * @param params - 不再提醒的参数
 * @returns 处理后的响应数据
 */
export function noRemind(params: NoRemindParams): Promise<unknown>;

/**
 * 根据关键词查询文章
 * @param params - 查询参数，包含关键词
 * @returns 查询到的文章数据
 */
export function queryArticleByKeyword(params: QueryByKeywordParams): Promise<unknown>;

/**
 * 根据标签查询文章
 * @param params - 查询参数，包含标签信息
 * @returns 查询到的文章数据
 */
export function queryArticleByLabel(params: QueryByLabelParams): Promise<unknown>;

/**
 * 根据时期查询文章
 * 会自动解析文章标签JSON，过滤"NEW"标签
 * @param params - 查询参数，包含时期信息
 * @returns 处理后的文章列表数据
 */
export function queryArticleByPeriod(params: QueryByPeriodParams): Promise<ArticleQueryResponse>;

/**
 * 查询功能配置
 * @param params - 查询参数，包含功能标识
 * @returns 功能配置数据
 */
export function queryFunctionConfig(params: QueryFunctionConfigParams): Promise<unknown>;

/**
 * 查询标签列表
 * @returns 所有可用的标签列表
 */
export function queryLabelList(): Promise<unknown>;

/**
 * 查询提醒功能列表
 * @param params - 查询参数
 * @returns 提醒功能列表数据
 */
export function queryRemindFunctionList(params: QueryRemindFunctionListParams): Promise<unknown>;

/**
 * 查询新用户提醒
 * @returns 新用户提醒相关数据
 */
export function queryRemindNewUser(): Promise<unknown>;