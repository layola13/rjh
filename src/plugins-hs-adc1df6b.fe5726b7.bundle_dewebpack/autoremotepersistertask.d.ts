/**
 * 自动远程持久化任务
 * 负责自动保存设计数据到远程服务器
 */
export declare class AutoRemotePersisterTask {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 执行自动保存任务
   * @param params - 保存参数，包含设计ID等信息
   * @param context - 执行上下文，包含设计数据和扩展信息
   * @returns 返回执行结果的Promise
   */
  execute(
    params: AutoRemotePersisterParams,
    context: AutoRemotePersisterContext
  ): Promise<AutoRemotePersisterResult>;

  /**
   * 执行实际的保存操作
   * @param params - 保存参数
   * @param context - 执行上下文
   * @returns 返回保存结果的Promise
   * @private
   */
  private _doSave(
    params: AutoRemotePersisterParams,
    context: AutoRemotePersisterContext
  ): Promise<DesignSaveResponse>;
}

/**
 * 自动持久化任务参数
 */
export interface AutoRemotePersisterParams {
  /** 设计ID */
  designId: string;
}

/**
 * 自动持久化任务执行上下文
 */
export interface AutoRemotePersisterContext {
  /** 设计数据 */
  data: unknown;
  /** 扩展信息 */
  ext: DesignExtInfo;
}

/**
 * 设计扩展信息
 */
export interface DesignExtInfo {
  [key: string]: unknown;
}

/**
 * 自动持久化任务执行结果
 */
export interface AutoRemotePersisterResult {
  /** 执行状态 */
  status: 'success' | 'error';
  /** 错误信息（如果有） */
  error?: unknown;
}

/**
 * 设计保存响应
 */
export interface DesignSaveResponse {
  /** 版本ID */
  versionId?: string;
  /** 设计数据 */
  data?: RoomInfo;
  /** 其他响应字段 */
  [key: string]: unknown;
}

/**
 * 房间信息
 */
export interface RoomInfo {
  [key: string]: unknown;
}

/**
 * 缩略图导出选项
 */
export interface ThumbnailExportOptions {
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
  /** 是否前景 */
  forground: boolean;
}