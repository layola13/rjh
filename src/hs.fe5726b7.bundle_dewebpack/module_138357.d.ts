/**
 * 应用配置模块
 * 包含服务器地址、CDN配置、CORS白名单等核心配置项
 * Module: module_138357
 * Original ID: 138357
 */

/**
 * CDN域名映射配置
 * 用于将原始主机名映射到CDN域名，支持多节点负载均衡
 */
interface CnamePatternMap {
  /**
   * 原始主机名列表
   * @example ["juran-prod-assets.s3.cn-north-1.amazonaws.com.cn", "s3.shejijia.com/juran-prod-assets"]
   */
  hosts: string[];

  /**
   * CDN域名模板
   * 其中 #index# 占位符会被替换为节点索引（0 到 count-1）
   * @example "s3#index#.shejijia.com/juran-prod-assets"
   */
  cnamePattern: string;

  /**
   * CDN节点数量
   * 用于负载均衡的节点总数
   */
  count: number;
}

/**
 * 应用配置接口
 * 定义了整个应用的核心配置项
 */
interface ApplicationConfig {
  /**
   * 目录搜索服务器地址
   * 用于产品目录搜索功能
   */
  catalogSearchServer: string;

  /**
   * 3D服务主地址
   */
  server: string;

  /**
   * API服务器基础地址
   */
  apiServer: string;

  /**
   * 获取举报图片URL的接口地址
   */
  getReportedImgUrl: string;

  /**
   * 应用标识符
   * @example "fpweb"
   */
  application: string;

  /**
   * 租户标识
   * @example "ezhome"
   */
  tenant: string;

  /**
   * 区域设置
   * 空字符串表示使用默认区域
   */
  region: string;

  /**
   * 语言代码
   * @example "zh_CN" - 简体中文
   */
  language: string;

  /**
   * 产品状态筛选
   * 1 表示只显示可用产品
   */
  productStatus: number;

  /**
   * 产品排序字段
   * @example "rank" - 按排名排序
   */
  productSortBy: string;

  /**
   * 产品排序方向
   * @example "desc" - 降序, "asc" - 升序
   */
  productOrder: 'desc' | 'asc';

  /**
   * CDN域名映射配置列表
   * 定义了多组主机名到CDN的映射规则
   */
  cnamePatternMaps: CnamePatternMap[];

  /**
   * URL重写函数
   * 可用于在请求前修改URL
   * @param url - 原始URL
   * @returns 重写后的URL
   */
  rewriteUrl: (url: string) => string;

  /**
   * CORS凭证白名单
   * 列表中的域名在跨域请求时会携带凭证（cookies等）
   */
  credentialsWhiteListCors: string[];

  /**
   * CORS凭证黑名单
   * 列表中的域名在跨域请求时会被排除，不携带凭证
   */
  excludeCredentialsWhiteListCors: string[];

  /**
   * 支持的数据类型文件扩展名
   * 用于判断资源类型
   */
  dataTypes: string[];
}

/**
 * 应用配置对象
 * 导出的配置实例，包含所有应用级别的设置
 */
declare const config: ApplicationConfig;

export = config;