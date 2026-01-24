/**
 * glTF 验证模块类型定义
 * 提供 glTF 文件的验证功能，支持 Web Worker 异步验证和同步验证两种模式
 */

/**
 * 外部资源加载函数类型
 * @param uri - 资源的 URI 地址
 * @returns Promise，解析为资源的 ArrayBuffer 数据
 */
type ExternalResourceFunction = (uri: string) => Promise<ArrayBuffer>;

/**
 * glTF 验证器配置选项
 */
interface GLTFValidatorOptions {
  /**
   * 外部资源加载函数
   */
  externalResourceFunction: (uri: string) => Promise<Uint8Array>;
  
  /**
   * 可选的基础 URI，用于解析相对路径
   */
  uri?: string;
}

/**
 * glTF 验证结果接口
 */
interface GLTFValidationResult {
  /**
   * 验证是否通过
   */
  valid: boolean;
  
  /**
   * 错误信息列表
   */
  errors?: Array<{
    message: string;
    pointer?: string;
  }>;
  
  /**
   * 警告信息列表
   */
  warnings?: Array<{
    message: string;
    pointer?: string;
  }>;
  
  /**
   * 信息列表
   */
  infos?: Array<{
    message: string;
    pointer?: string;
  }>;
}

/**
 * Worker 消息类型定义
 */
type WorkerMessageData =
  | { id: 'init'; url: string }
  | { id: 'validate'; data: string | ArrayBuffer; rootUrl: string; fileName: string }
  | { id: 'getExternalResource'; index: number; uri: string }
  | { id: 'getExternalResource.resolve'; index: number; value: ArrayBuffer }
  | { id: 'getExternalResource.reject'; index: number; reason: unknown }
  | { id: 'validate.resolve'; value: GLTFValidationResult }
  | { id: 'validate.reject'; reason: unknown };

/**
 * Promise 解析/拒绝回调接口
 */
interface PromiseCallbacks<T> {
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

/**
 * glTF 验证配置
 */
interface GLTFValidationConfiguration {
  /**
   * glTF 验证器脚本的 URL 地址
   * @default "https://preview.babylonjs.com/gltf_validator.js"
   */
  url: string;
}

/**
 * glTF 验证类
 * 提供对 glTF 2.0 文件的验证功能
 */
export declare class GLTFValidation {
  /**
   * 全局配置对象
   */
  static Configuration: GLTFValidationConfiguration;

  /**
   * 脚本加载 Promise 缓存（用于同步模式）
   */
  private _LoadScriptPromise?: Promise<void>;

  /**
   * 异步验证 glTF 数据
   * 
   * @param data - glTF 数据，可以是 JSON 字符串或 ArrayBuffer（GLB 格式）
   * @param rootUrl - 根 URL，用于解析外部资源
   * @param fileName - 文件名，用于生成完整的文件 URI
   * @param externalResourceFunction - 外部资源加载函数
   * @returns Promise，解析为验证结果
   * 
   * @remarks
   * - 优先使用 Web Worker 进行异步验证（如果浏览器支持）
   * - 如果不支持 Worker，则同步加载验证器脚本后执行验证
   * 
   * @example
   *