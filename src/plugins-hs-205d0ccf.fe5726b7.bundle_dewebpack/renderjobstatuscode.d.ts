/**
 * 渲染任务状态码枚举
 * 用于标识图片渲染任务的执行状态
 */
export enum RenderJobStatusCode {
  /** 待处理 */
  PENDING = 0,
  /** 已分发 */
  DISPATCHED = 1,
  /** 成功 */
  SUCCESS = 2,
  /** 失败 */
  FAILED = 3,
  /** 无权限 */
  NOPERMISSION = 4,
  /** 提交中 */
  SUBMITING = -1,
  /** 提交失败 */
  SUBMITFAILURE = 500,
  /** 提交网络失败 */
  SUBMITNETWORKFAIL = 501
}

/**
 * 业务任务状态码枚举
 * 用于标识业务层面的任务状态
 */
export enum TaskBizStatusCode {
  /** 待处理 */
  PENDING = 0,
  /** 已分发 */
  DISPATCHED = 1,
  /** 成功 */
  SUCCESS = 2,
  /** 子任务失败 */
  SUBFAILED = 9,
  /** 失败 */
  FAILED = 10
}

/**
 * 分享平台参数映射接口
 */
interface SharePlatformParams {
  /** URL参数名 */
  url: string;
  /** 标题参数名 */
  title: string;
  /** 摘要参数名 */
  summary: string;
  /** 图片参数名 */
  image: string;
  /** 描述参数名（可选） */
  description?: string;
}

/**
 * 分享平台配置接口
 */
interface SharePlatformConfig {
  /** 分享接口URL */
  url: string;
  /** 参数映射配置 */
  params: SharePlatformParams;
}

/**
 * 分享URL配置对象
 * 包含各主流社交平台的分享接口配置
 */
export const SHARE_URL: {
  /** QQ空间分享配置 */
  qzone: SharePlatformConfig;
  /** QQ分享配置 */
  qq: SharePlatformConfig;
  /** 微博分享配置 */
  weibo: SharePlatformConfig;
};

/**
 * 微博应用密钥
 */
export const WEIBO_APPKEY: 1980978009;

/**
 * 根容器DOM节点ID
 */
export const rootDivId: "spark_pic_image_root";

/**
 * 用户追踪标识
 */
export const userTrackId: "album.SparkPic";