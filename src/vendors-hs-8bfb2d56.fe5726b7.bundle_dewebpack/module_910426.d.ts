/**
 * OSS 文件上传模块
 * 提供文件上传到阿里云 OSS 的相关功能
 */

/**
 * OSS 签名数据接口
 */
interface OSSSignData {
  /** OSS 访问密钥 ID */
  OSSAccessKeyId: string;
  /** Base64 编码的上传策略 */
  policy: string;
  /** 签名字符串 */
  signature: string;
  /** 上传目录路径 */
  dir: string;
  /** OSS 端点地址 */
  endpoint: string;
  /** 可选的回调配置 */
  callback?: string;
}

/**
 * 文件上传元数据
 */
interface FileMetadata {
  /** 文件唯一标识（OSS key） */
  uid: string;
  /** 原始文件名 */
  name?: string;
  /** 文件访问 URL */
  url: string;
}

/**
 * 上传结果接口
 */
interface UploadResult extends FileMetadata {
  /** 上传状态：done-成功, error-失败, cancelled-已取消 */
  status: 'done' | 'error' | 'cancelled';
}

/**
 * 可取消的上传控制器
 */
interface CancellableUpload {
  /**
   * 执行文件上传
   * @param file - 要上传的文件对象
   * @param isPrivate - 是否设置为私有文件，默认 false
   * @returns 上传结果的 Promise
   */
  upload(file: File | Blob, isPrivate?: boolean): Promise<UploadResult | undefined>;
  
  /**
   * 取消当前上传操作
   */
  cancel(): void;
}

/**
 * 文件处理结果（内部使用）
 */
interface ProcessedFile {
  /** OSS 存储键名 */
  key: string;
  /** 完整的图片访问 URL（带处理参数） */
  imageUrl: string;
  /** 文件后缀名 */
  fileSuffix: string;
  /** 原始文件对象 */
  uploadFile: File | Blob;
}

/**
 * 获取 OSS 上传签名
 * 自动缓存签名数据，有效期内复用
 * @returns OSS 签名数据，失败返回 undefined
 */
export declare function makeSign(): Promise<OSSSignData | undefined>;

/**
 * 直接上传文件到 OSS
 * @param file - 要上传的文件
 * @param signData - OSS 签名数据
 * @param isPrivate - 是否私有文件（影响访问权限），默认 false
 * @param abortController - 用于取消上传的控制器（可选）
 * @returns 上传结果
 */
export declare function uploadToOSS(
  file: File | Blob,
  signData: OSSSignData,
  isPrivate?: boolean,
  abortController?: AbortController
): Promise<UploadResult>;

/**
 * 完整的文件上传流程（包含签名获取）
 * @param file - 要上传的文件
 * @param isPrivate - 是否私有文件，默认 false
 * @param abortController - 用于取消上传的控制器（可选）
 * @returns 上传结果，签名获取失败时返回 undefined
 */
export declare function uploadFile(
  file: File | Blob,
  isPrivate?: boolean,
  abortController?: AbortController
): Promise<UploadResult | undefined>;

/**
 * 创建可取消的上传实例
 * 返回包含 upload 和 cancel 方法的对象
 * @returns 可取消的上传控制器
 * @example
 *