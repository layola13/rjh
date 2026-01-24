/**
 * 版本检查任务
 * 用于在保存前检查设计文件的版本状态，并在必要时提示用户确认
 */
export declare class VersionCheckTask {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 执行版本检查任务
   * 
   * @param options - 执行选项
   * @param options.isSaveas - 是否为另存为操作
   * @param context - 执行上下文（未使用）
   * 
   * @returns Promise，resolve时返回成功状态和版本数据，reject时返回取消状态
   * 
   * @remarks
   * - 如果没有版本ID或是另存为操作，直接返回成功
   * - 否则弹出确认对话框，询问用户是否继续
   * - 用户确认后返回成功状态（continuer: true）
   * - 用户取消时返回取消状态
   */
  execute(
    options: {
      /** 是否为另存为操作 */
      isSaveas?: boolean;
    },
    context?: unknown
  ): Promise<VersionCheckSuccessResult | VersionCheckCancelResult>;
}

/**
 * 版本检查成功结果
 */
export interface VersionCheckSuccessResult {
  /** 执行状态 */
  status: "success";
  /** 版本数据 */
  data: {
    /** 当前版本ID */
    versionId: string | null | undefined;
    /** 是否为另存为操作 */
    isSaveas?: boolean;
    /** 用户是否确认继续（仅在弹出对话框时存在） */
    continuer?: boolean;
  };
}

/**
 * 版本检查取消结果
 */
export interface VersionCheckCancelResult {
  /** 执行状态 */
  status: "cancel";
}