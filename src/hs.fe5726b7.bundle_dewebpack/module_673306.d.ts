/**
 * 设计数据 API 模块类型定义
 * 提供设计文件的上传、下载、保存等操作接口
 */

/**
 * 搜索条件枚举
 */
export declare enum SearchCriteriaEnum {
  timeCreated = 'timeCreated',
  // 其他枚举值根据实际情况补充
}

/**
 * 设计元数据中的图片信息
 */
export interface DesignImageMeta {
  /** 图片URL */
  url: string;
}

/**
 * 设计元数据
 */
export interface DesignMeta {
  /** 图片信息 */
  image: DesignImageMeta;
  [key: string]: unknown;
}

/**
 * 地址信息
 */
export interface AddressInfo {
  [key: string]: unknown;
}

/**
 * 基础属性
 */
export interface BasicAttributes {
  [key: string]: unknown;
}

/**
 * 设计数据结构
 */
export interface DesignData {
  /** 设计ID */
  designId?: string;
  /** 设计数据内容（JSON字符串） */
  data: string;
  /** 元数据 */
  meta: DesignMeta;
  /** 设计名称 */
  name?: string;
  /** 地址信息 */
  address?: AddressInfo;
  /** 基础属性 */
  basicAttributes?: BasicAttributes;
  /** 主资源ID */
  mainAssetId?: string;
  [key: string]: unknown;
}

/**
 * 上传URL响应数据
 */
export interface UploadUrlResponse {
  /** 上传地址 */
  url: string;
  [key: string]: unknown;
}

/**
 * MTOP响应基础结构
 */
export interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data?: T;
  [key: string]: unknown;
}

/**
 * 设计信息响应
 */
export interface DesignInfoResponse {
  /** 设计ID */
  id: string;
  /** 版本ID */
  versionId?: string;
  /** 设计数据URL或内容 */
  data: string;
  [key: string]: unknown;
}

/**
 * 版本信息
 */
export interface VersionInfo {
  /** 版本ID */
  versionId: string;
  /** 创建时间 */
  timeCreated?: number;
  [key: string]: unknown;
}

/**
 * 分页版本列表响应
 */
export interface VersionPageResponse {
  /** 版本列表 */
  items: VersionInfo[];
  /** 总数 */
  total: number;
  [key: string]: unknown;
}

/**
 * 搜索结果项
 */
export interface SearchResultItem {
  /** 资源ID */
  id: string;
  /** 名称 */
  name?: string;
  [key: string]: unknown;
}

/**
 * 搜索结果响应
 */
export interface SearchResponse {
  /** 结果列表 */
  items: SearchResultItem[];
  /** 总数 */
  total?: number;
  [key: string]: unknown;
}

/**
 * 建议列表响应
 */
export interface SuggestionResponse {
  /** 详细项列表 */
  detailItems?: string[];
  /** 简单项列表 */
  items?: string[];
  [key: string]: unknown;
}

/**
 * 提取设计额外信息响应
 */
export interface ExtractInfoResponse {
  /** 提取的值 */
  value: unknown;
  [key: string]: unknown;
}

/**
 * 文件上传选项
 */
export interface UploadOptions {
  /** 内容类型 */
  contentType?: string;
  /** 文件键名 */
  key?: string;
  /** 资源类型 */
  resType?: string;
  /** 文件类型 */
  fileType?: string;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 数据类型 */
  dataType?: string;
  /** 是否处理数据 */
  processData?: boolean;
  [key: string]: unknown;
}

/**
 * 范围参数
 */
export interface RangeParam {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
}

/**
 * HTTP客户端接口
 */
export interface HttpClient {
  /** GET请求 */
  get(url: string, options?: unknown): Promise<unknown>;
  /** PUT请求 */
  put(url: string, data: unknown, options?: unknown): Promise<unknown>;
  /** POST请求 */
  post(url: string, data: unknown, options?: unknown): Promise<unknown>;
}

/**
 * 设计API模块
 */
export interface DesignApiModule {
  /** 搜索条件枚举 */
  SearchCriteriaEnum: typeof SearchCriteriaEnum;

  /**
   * 将Data URI转换为Blob对象
   * @param dataURI - Data URI字符串 (格式: data:image/jpeg;base64,...)
   * @returns Blob对象
   */
  dataURItoBlob(dataURI: string): Blob;

  /**
   * 异步上传设计数据
   * @param data - 设计JSON数据字符串
   * @returns 上传后的URL
   */
  uploadDesignDataAsync(data: string): Promise<string>;

  /**
   * 异步上传设计图片
   * @param image - 图片数据（Data URI字符串或已有URL）
   * @returns 上传后的图片URL
   */
  uploadDesignImageAsync(image: string | Blob): Promise<string>;

  /**
   * 保存设计
   * @param designData - 设计数据对象
   * @param saveAs - 是否另存为新设计
   * @returns 保存后的设计信息
   */
  saveDesign(designData: DesignData, saveAs?: boolean): Promise<DesignInfoResponse>;

  /**
   * 上传JSON文件到OSS URL
   * @param url - OSS上传地址
   * @param data - JSON数据
   * @param options - 上传选项
   * @param compress - 是否使用gzip压缩
   * @returns 最终的文件URL（清除参数后）
   */
  uploadJsonFileToOssUrl(
    url: string,
    data: string | Blob,
    options?: UploadOptions,
    compress?: boolean
  ): Promise<string>;

  /**
   * 上传图片文件到OSS URL
   * @param url - OSS上传地址
   * @param file - 图片文件Blob
   * @param options - 上传选项
   * @returns 最终的文件URL（清除参数后）
   */
  uploadImageFileToOssUrl(url: string, file: Blob, options?: UploadOptions): Promise<string>;

  /**
   * 加载设计数据
   * @param assetId - 资源ID
   * @param versionId - 版本ID（可选）
   * @param versionType - 版本类型（可选）
   * @param subOrderId - 子订单ID（可选）
   * @returns 设计信息（包含解析后的data字段）
   */
  loadDesign(
    assetId: string,
    versionId?: string,
    versionType?: string,
    subOrderId?: string
  ): Promise<DesignInfoResponse>;

  /**
   * 加载户型集合设计
   * @param apartmentId - 户型ID
   * @param versionId - 版本ID（可选）
   * @returns 设计信息
   */
  loadFpcollectionDesign(apartmentId: string, versionId?: string): Promise<DesignInfoResponse>;

  /**
   * 加载EA户型集合设计
   * @param apartmentId - 户型ID
   * @param versionId - 版本ID（可选）
   * @returns 设计信息
   */
  loadEAFpcollectionDesign(apartmentId: string, versionId?: string): Promise<DesignInfoResponse>;

  /**
   * 加载设计版本列表
   * @param designId - 设计ID
   * @returns 版本信息数组
   */
  loadDesignVersions(designId: string): Promise<VersionInfo[]>;

  /**
   * 分页加载设计版本列表
   * @param params - 分页参数
   * @returns 分页版本列表
   */
  loadDesignVersionsByPage(params: Record<string, unknown>): Promise<VersionPageResponse>;

  /**
   * 更新设计元数据（部分更新）
   * @param designId - 设计ID
   * @param metaUpdates - 要更新的元数据字段
   * @returns 更新后的数据
   */
  patchDesignMeta(designId: string, metaUpdates: Record<string, unknown>): Promise<unknown>;

  /**
   * 更新设计JSON数据
   * @param designId - 设计ID
   * @param jsonData - 新的JSON数据
   * @param ext - 扩展信息（可选）
   * @param image - 图片数据（可选）
   * @returns 更新后的数据
   */
  patchDesignJson(
    designId: string,
    jsonData: string,
    ext?: Record<string, unknown>,
    image?: string | Blob
  ): Promise<unknown>;

  /**
   * 获取设计详情
   * @param designId - 设计ID
   * @param versionType - 版本类型（可选）
   * @param subOrderId - 子订单ID（可选）
   * @returns 设计详情
   */
  getDesignDetail(
    designId: string,
    versionType?: string,
    subOrderId?: string
  ): Promise<DesignInfoResponse>;

  /**
   * 获取设计信息（REST API）
   * @param designId - 设计ID
   * @returns 设计信息（包含解析后的attributes）
   */
  getDesignInfo(designId: string): Promise<Record<string, unknown>>;

  /**
   * 上传文件
   * @param file - 文件数据（Blob或Data URI字符串）
   * @param options - 上传选项
   * @returns 上传后的文件URL
   */
  uploadFile(file: Blob | string, options?: UploadOptions): Promise<string>;

  /**
   * 上传报告文件
   * @param file - 文件数据（Blob或Data URI字符串）
   * @param options - 上传选项
   * @returns 上传后的文件URL
   */
  uploadReportFile(file: Blob | string, options?: UploadOptions): Promise<string>;

  /**
   * 获取报告上传URL
   * @param fileName - 文件名
   * @param contentType - 内容类型
   * @returns 上传URL
   */
  getUploadReportUrl(fileName: string, contentType: string): Promise<string>;

  /**
   * 获取文件上传URL
   * @param contentType - 内容类型
   * @param key - 文件键名（可选）
   * @param resType - 资源类型（可选）
   * @returns 上传URL
   */
  getFileUploadUrl(contentType: string, key?: string, resType?: string): Promise<string>;

  /**
   * 上传文件到指定URL
   * @param file - 文件数据（Blob或Data URI字符串）
   * @param url - 目标URL
   * @param options - 上传选项
   * @returns 最终的文件URL
   */
  uploadFileToUrl(file: Blob | string, url: string, options?: UploadOptions): Promise<string>;

  /**
   * 搜索公共模板
   * @param searchText - 搜索文本
   * @param bedRoomRange - 卧室数量范围
   * @param grossAreaRange - 建筑面积范围
   * @param attributes - 属性过滤
   * @param fieldsToStat - 统计字段
   * @param offset - 偏移量
   * @param limit - 限制数量
   * @param sortField - 排序字段
   * @returns 搜索结果
   */
  searchPublicTemplates(
    searchText?: string,
    bedRoomRange?: RangeParam,
    grossAreaRange?: RangeParam,
    attributes?: Record<string, unknown>,
    fieldsToStat?: string[],
    offset?: number,
    limit?: number,
    sortField?: string
  ): Promise<SearchResponse>;

  /**
   * 搜索迷你公共模板V2
   * @param searchText - 搜索文本
   * @param bedroomRange - 卧室数量范围
   * @param grossAreaRange - 建筑面积范围
   * @param cityId - 城市ID
   * @param fieldsToStat - 统计字段
   * @param offset - 偏移量
   * @param limit - 限制数量
   * @returns 搜索结果
   */
  searchMiniPublicTemplatesV2(
    searchText?: string,
    bedroomRange?: RangeParam,
    grossAreaRange?: RangeParam,
    cityId?: string,
    fieldsToStat?: string[],
    offset?: number,
    limit?: number
  ): Promise<SearchResponse>;

  /**
   * 搜索模板建议列表
   * @param searchText - 搜索文本
   * @param cityId - 城市ID
   * @param offset - 偏移量
   * @param limit - 限制数量
   * @returns 建议列表
   */
  searchTemplatesSuggestionsList(
    searchText: string,
    cityId?: string,
    offset?: number,
    limit?: number
  ): Promise<string[]>;

  /**
   * 提交公共模板
   * @param designId - 设计ID
   * @param sessionId - 会话ID
   * @returns 提交结果
   */
  submitPublicTemplates(designId: string, sessionId: string): Promise<unknown>;

  /**
   * 提取设计额外信息
   * @param design - 设计对象（包含id、versionId、data）
   * @returns 提取的信息
   */
  extractDesignExtraInfo(design: DesignInfoResponse): Promise<ExtractInfoResponse>;

  /**
   * 获取样板间URL
   * @param data - 样板间数据
   * @returns 上传后的URL
   */
  getSampleRoomUrl(data: string): Promise<string>;

  /**
   * 获取导入设计图片URL
   * @param image - 图片数据（Blob或Data URI字符串）
   * @param options - 上传选项
   * @returns 上传后的图片URL
   */
  getImportDesignImageUrl(image: Blob | string, options?: UploadOptions): Promise<string>;

  /**
   * 获取导入设计数据URL
   * @param file - 文件数据（Blob或Data URI字符串）
   * @param options - 上传选项
   * @returns 上传后的文件URL
   */
  getImportDesignDataUrl(file: Blob | string, options?: UploadOptions): Promise<string>;

  /**
   * 获取导入BOM数据URL
   * @param file - 文件数据（Blob或Data URI字符串）
   * @param options - 上传选项
   * @returns 上传后的文件URL
   */
  getImportBomDataUrl(file: Blob | string, options?: UploadOptions): Promise<string>;
}

/**
 * 创建设计API模块
 * @param httpClient - HTTP客户端实例
 * @returns 设计API模块实例
 */
export default function createDesignApiModule(httpClient: HttpClient): DesignApiModule;