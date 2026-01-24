/**
 * 只读模式检查任务
 * 用于在保存操作前检查编辑器是否处于只读模式
 */
export interface ReadonlyModeCheckTaskOptions {
  /**
   * 是否隐藏实时提示
   * @default false
   */
  hideLivehint?: boolean;
}

/**
 * 任务执行上下文
 */
export interface TaskContext {
  /**
   * 是否为"另存为"操作
   */
  isSaveas: boolean;
  
  /**
   * 是否为静默模式（不显示UI提示）
   */
  silent?: boolean;
}

/**
 * 任务执行成功结果
 */
export interface TaskSuccessResult {
  status: 'success';
  data: {
    /**
     * 是否为只读模式
     */
    readonly: boolean;
  };
}

/**
 * 任务执行取消结果
 */
export interface TaskCancelResult {
  status: 'cancel';
}

/**
 * 任务执行结果
 */
export type TaskResult = TaskSuccessResult | TaskCancelResult;

/**
 * 只读模式检查任务类
 * 在保存操作前检查编辑器是否处于只读模式，如果是则阻止保存并提示用户
 */
export declare class ReadonlyModeCheckTask {
  /**
   * 是否隐藏实时提示
   */
  private hideLivehint: boolean;

  /**
   * 构造函数
   * @param options - 配置选项
   */
  constructor(options?: ReadonlyModeCheckTaskOptions);

  /**
   * 执行只读模式检查
   * @param context - 任务执行上下文
   * @param additionalData - 额外的任务数据（未使用）
   * @returns Promise，如果处于只读模式则reject，否则resolve
   */
  execute(context: TaskContext, additionalData?: unknown): Promise<TaskResult>;
}