/**
 * glTF 验证模块类型定义
 * 提供 glTF 文件验证功能的 API
 */

/**
 * 外部资源加载函数类型
 * @param uri - 资源的 URI 地址
 * @returns 返回包含资源数据的 ArrayBuffer 的 Promise
 */
export type ExternalResourceLoader = (uri: string) => Promise<ArrayBuffer>;

/**
 * glTF 验证器配置选项
 */
export interface GLTFValidationConfiguration {
  /**
   * glTF 验证器脚本的 URL 地址
   * @default "https://preview.babylonjs.com/gltf_validator.js"
   */
  url: string;
}

/**
 * glTF 验证结果接口
 * 包含验证过程中发现的问题和统计信息
 */
export interface GLTFValidationResult {
  /** 验证问题列表 */
  issues?: {
    /** 问题消息 */
    message: string;
    /** 问题严重程度 */
    severity: number;
    /** 问题指针路径 */
    pointer?: string;
  }[];
  /** 验证统计信息 */
  stats?: Record<string, unknown>;
  /** 其他验证元数据 */
  [key: string]: unknown;
}

/**
 * Worker 消息类型定义
 */
interface WorkerMessage {
  /** 消息标识符 */
  id: 'init' | 'validate' | 'validate.resolve' | 'validate.reject' | 'getExternalResource' | 'getExternalResource.resolve' | 'getExternalResource.reject';
  /** 验证器脚本 URL（init 消息） */
  url?: string;
  /** glTF 数据（validate 消息） */
  data?: string | ArrayBuffer;
  /** 根 URL（validate 消息） */
  rootUrl?: string;
  /** 文件名（validate 消息） */
  fileName?: string;
  /** 外部资源 URI */
  uri?: string;
  /** 资源索引 */
  index?: number;
  /** 解析的值 */
  value?: unknown;
  /** 拒绝原因 */
  reason?: unknown;
}

/**
 * Promise 解析器接口
 */
interface PromiseResolver<T> {
  /** 解析函数 */
  resolve: (value: T) => void;
  /** 拒绝函数 */
  reject: (reason?: unknown) => void;
}

/**
 * glTF 验证类
 * 提供异步验证 glTF 文件的功能
 */
export declare class GLTFValidation {
  /**
   * 验证器配置
   */
  static Configuration: GLTFValidationConfiguration;

  /**
   * 脚本加载 Promise 缓存
   * @internal
   */
  private static _LoadScriptPromise?: Promise<void>;

  /**
   * 异步验证 glTF 数据
   * 
   * @param data - glTF 数据，可以是 JSON 字符串或 ArrayBuffer（GLB 格式）
   * @param rootUrl - glTF 文件的根 URL 路径
   * @param fileName - glTF 文件名
   * @param externalResourceLoader - 外部资源加载函数，用于加载纹理、二进制数据等
   * @returns 返回验证结果的 Promise
   * 
   * @remarks
   * 该方法会尝试使用 Web Worker 进行验证以避免阻塞主线程。
   * 如果不支持 Worker，则会在主线程中同步加载验证器脚本。
   */
  static ValidateAsync(
    data: string | ArrayBuffer,
    rootUrl: string,
    fileName: string,
    externalResourceLoader: ExternalResourceLoader
  ): Promise<GLTFValidationResult>;
}

/**
 * 全局 glTF 验证器接口（由外部脚本提供）
 * @internal
 */
declare global {
  const GLTFValidator: {
    /**
     * 验证 glTF 字节数据
     * @param data - glTF 二进制数据
     * @param options - 验证选项
     */
    validateBytes(
      data: Uint8Array,
      options: {
        externalResourceFunction: (uri: string) => Promise<Uint8Array>;
        uri?: string;
      }
    ): Promise<GLTFValidationResult>;

    /**
     * 验证 glTF JSON 字符串
     * @param data - glTF JSON 字符串
     * @param options - 验证选项
     */
    validateString(
      data: string,
      options: {
        externalResourceFunction: (uri: string) => Promise<Uint8Array>;
        uri?: string;
      }
    ): Promise<GLTFValidationResult>;
  };
}

export { GLTFValidation };