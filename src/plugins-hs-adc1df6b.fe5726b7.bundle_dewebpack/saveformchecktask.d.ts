/**
 * 保存表单检查任务
 * 在执行保存操作前检查设计是否需要显示保存对话框
 */
export interface SaveFormCheckTask {
  /**
   * 显示保存对话框的方法
   * 绑定自父上下文的保存对话框处理器
   */
  showSaveDialog: (options: SaveOptions) => Promise<SaveResult>;

  /**
   * 执行保存检查任务
   * @param options - 保存选项配置
   * @param context - 执行上下文（保留参数以兼容接口）
   * @returns 返回保存操作的结果Promise
   */
  execute(options: SaveOptions, context?: unknown): Promise<SaveResult>;
}

/**
 * 保存操作的配置选项
 */
export interface SaveOptions {
  /**
   * 静默模式标志
   * 为true时跳过所有检查直接返回成功
   */
  silent?: boolean;

  /**
   * 另存为标志
   * 为true时强制显示保存对话框
   */
  isSaveas?: boolean;
}

/**
 * 保存操作的结果
 */
export interface SaveResult {
  /**
   * 操作状态
   * - success: 操作成功
   * - cancelled: 用户取消
   * - error: 操作失败
   */
  status: 'success' | 'cancelled' | 'error';

  /**
   * 错误信息（仅在status为error时存在）
   */
  error?: string;
}

/**
 * SaveFormCheckTask构造函数的上下文参数
 */
export interface SaveFormCheckTaskContext {
  /**
   * 保存对话框方法
   * 会被绑定到SaveFormCheckTask实例
   */
  showSaveDialog(options: SaveOptions): Promise<SaveResult>;
}

/**
 * SaveFormCheckTask类声明
 * 用于在保存操作前进行必要的检查
 */
export declare class SaveFormCheckTask {
  /**
   * 创建保存表单检查任务实例
   * @param context - 包含showSaveDialog方法的上下文对象
   */
  constructor(context: SaveFormCheckTaskContext);
}