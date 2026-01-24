/**
 * 房间信息导出任务模块
 * 负责将设计房间详细信息导出并上传到OSS
 */

/**
 * 上传配置选项接口
 */
interface UploadOptions {
  /** 数据类型 */
  dataType?: string;
  /** 是否处理数据 */
  processData?: boolean;
  /** 内容类型 */
  contentType?: string;
  /** 请求头配置 */
  headers?: Record<string, string>;
}

/**
 * 任务执行结果接口
 */
interface TaskExecutionResult {
  /** 执行状态 */
  status: 'success' | 'error';
}

/**
 * 权限检查结果接口
 */
interface PermissionCheckResult {
  /** 权限名称 */
  permissionName: string;
  /** 是否可访问 */
  accessible: boolean;
}

/**
 * MTOP权限检查响应接口
 */
interface PermissionCheckResponse {
  data?: {
    result?: PermissionCheckResult[];
  };
}

/**
 * 设计上传URL响应接口
 */
interface DesignUploadUrlResponse {
  /** 返回码 */
  ret: string[];
  /** 响应数据 */
  data?: {
    /** 上传URL */
    url: string;
  };
}

/**
 * 用户登录完成事件数据接口
 */
interface LoginCompletedEventData {
  data?: {
    /** 是否已登录 */
    isLogin: boolean;
  };
}

/**
 * 房间信息导出任务类
 * 单例模式，负责检查权限、导出房间数据并上传到OSS
 */
export declare class ExportRoominfoTask {
  /** 单例实例 */
  private static exportRoominfoTask?: ExportRoominfoTask;

  /** 用户是否具有导出权限 */
  private hasPermission: boolean;

  /**
   * 构造函数
   * 初始化权限检查，监听用户登录完成事件
   */
  constructor();

  /**
   * 获取导出房间信息任务的单例实例
   * @returns 房间信息导出任务实例
   */
  static getExportRoominfoTask(): ExportRoominfoTask;

  /**
   * 执行导出任务
   * @param context - 任务执行上下文
   * @param options - 任务选项参数
   * @returns 任务执行结果的Promise
   */
  execute(context: unknown, options: unknown): Promise<TaskExecutionResult>;

  /**
   * 异步上传JSON数据
   * @param jsonData - 要上传的JSON字符串数据
   * @returns 上传完成后的URL Promise
   */
  private uploadAsync(jsonData: string): Promise<string>;

  /**
   * 将JSON文件上传到OSS URL
   * @param ossUrl - OSS上传地址
   * @param jsonData - JSON数据（字符串或Blob）
   * @param options - 上传配置选项
   * @param enableGzip - 是否启用Gzip压缩，默认false
   * @returns 上传完成后的清理URL Promise
   */
  private uploadJsonFileToOssUrl(
    ossUrl: string,
    jsonData: string | Blob,
    options?: UploadOptions,
    enableGzip?: boolean
  ): Promise<string>;
}