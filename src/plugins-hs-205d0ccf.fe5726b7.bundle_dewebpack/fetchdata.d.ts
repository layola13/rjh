/**
 * Module: FetchData
 * 提供数据获取、OSS上传、AI图像渲染等功能
 */

/**
 * TMtop响应状态码枚举
 */
export enum TMtopCode {
  /** 成功 */
  SUCCESS = "SUCCESS",
  /** 业务参数无效 */
  FAIL_BIZ_PARAM_INVALID = "FAIL_BIZ_PARAM_INVALID",
  /** 无可用权益 */
  FAIL_BIZ_NO_BENEFIT = "FAIL_BIZ_NO_BENEFIT",
  /** 队列已满 */
  FAIL_BIZ_QUEUE_IS_FULL = "FAIL_BIZ_QUEUE_IS_FULL",
  /** 超出可排队数量 */
  FAIL_BIZ_GREATER_QUEUEABLE_QUANTITY = "FAIL_BIZ_GREATER_QUEUEABLE_QUANTITY",
  /** HSF调用错误 */
  FAIL_SYS_HSF_INVOKE_ERROR = "FAIL_SYS_HSF_INVOKE_ERROR",
  /** AIGC任务保存失败 */
  FAIL_BIZ_SAVE_AIGC_TASK_FAIL = "FAIL_BIZ_SAVE_AIGC_TASK_FAIL"
}

/**
 * Mtop API响应结构
 */
interface MtopResponse<T = unknown> {
  /** 响应数据 */
  data?: T;
  /** 返回状态码数组，格式: ["CODE::MESSAGE"] */
  ret?: string[];
}

/**
 * 设计元数据接口
 */
interface DesignMetadata {
  /** 获取元数据值 */
  get(key: "designId" | "designVersion"): string;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 设计元数据 */
  designMetadata: DesignMetadata;
}

/**
 * HSApp全局对象接口
 */
interface HSAppGlobal {
  App: {
    getApp(): AppInstance;
  };
  Config: {
    TENANT: string;
  };
}

/**
 * 房屋数据链接响应
 */
interface HouseDataLinkResponse {
  data: {
    /** 文件是否已存在 */
    exist: boolean;
    /** 房屋数据URL */
    houseDataUrl: string;
  };
}

/**
 * 上传URL响应
 */
interface UploadUrlResponse {
  /** 授权上传URL */
  url: string;
  /** 对象访问URL */
  objUrl: string;
}

/**
 * Mtop错误对象
 */
interface MtopError {
  /** 错误码 */
  code: string;
  /** 错误消息 */
  msg: string;
}

/**
 * NWTK全局API接口
 */
interface NWTKGlobal {
  mtop: {
    SparkPic: {
      submit(params: { data: unknown }): Promise<MtopResponse>;
      getPageInfo(params: { data: unknown }): Promise<MtopResponse>;
      getUploadUrl(params: { data?: unknown }): Promise<MtopResponse<UploadUrlResponse>>;
    };
    Render: {
      getHouseDataLink(params: {
        data: { designId: string; designVersion: string };
      }): Promise<MtopResponse<HouseDataLinkResponse>>;
    };
  };
  ajax: {
    put(
      url: string,
      data: Blob | string,
      options?: {
        dataType?: string | undefined;
        processData?: boolean;
        contentType?: string;
        headers?: Record<string, string>;
      }
    ): Promise<unknown>;
  };
  api: {
    design: {
      uploadImageFileToOssUrl(url: string, blob: Blob): Promise<unknown>;
      dataURItoBlob(dataURI: string): Blob;
    };
  };
}

declare global {
  const HSApp: HSAppGlobal;
  const NWTK: NWTKGlobal;
}

/**
 * 数据获取工具类
 * 提供AI图像渲染、OSS上传、房间类型映射等功能
 */
export declare class FetchData {
  /**
   * 渲染AI图像
   * @param params - 提交参数
   * @returns AI图像渲染结果
   */
  static renderAIImage<T = unknown>(params: unknown): Promise<T>;

  /**
   * 将房屋数据上传到OSS
   * @param houseData - 房屋数据对象
   * @returns OSS存储URL
   */
  static putHouseDataToOss(houseData: unknown): Promise<string>;

  /**
   * 使用授权URL将数据上传到OSS
   * @param authorizedUrl - OSS授权URL
   * @param data - 要上传的数据（JSON字符串）
   * @returns 上传Promise
   */
  static putDataToOssWithAuthorizedUrl(
    authorizedUrl: string,
    data: string
  ): Promise<unknown>;

  /**
   * 从OSS获取JSON数据
   * @param url - OSS资源URL
   * @returns 解析后的JSON对象
   */
  static getJSONFromOss<T = Record<string, unknown>>(url: string): Promise<T>;

  /**
   * 获取房间类型映射配置URL
   * @returns 根据租户返回对应的映射URL
   */
  static getRoomTypeMappingUrl(): string;

  /**
   * 获取页面信息
   * @param params - 查询参数
   * @returns 页面信息数据
   */
  static getPageInfo<T = unknown>(params: unknown): Promise<T>;

  /**
   * 上传图片到URL
   * @param dataURI - 图片Data URI
   * @returns 上传后的对象URL
   */
  static uploadImgToUrl(dataURI: string): Promise<string>;

  /**
   * 处理Mtop Promise响应
   * @param mtopFunction - Mtop API函数
   * @param params - 请求参数
   * @returns 处理后的数据或错误
   */
  static handlePromise<T = unknown>(
    mtopFunction: (params: { data: unknown }) => Promise<MtopResponse<T>>,
    params?: unknown
  ): Promise<T | MtopError>;
}