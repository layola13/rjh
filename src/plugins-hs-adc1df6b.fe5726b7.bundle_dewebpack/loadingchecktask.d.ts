/**
 * 加载检查任务
 * 用于在执行操作前检查设计是否正在加载中
 */
export declare class LoadingCheckTask {
  /**
   * 是否隐藏提示信息
   */
  private hideLivehint: boolean;

  /**
   * 构造函数
   * @param options - 配置选项
   * @param options.hideLivehint - 是否隐藏加载中的提示信息，默认为 false
   */
  constructor(options?: { hideLivehint?: boolean });

  /**
   * 执行加载检查任务
   * 检查设计是否正在加载中，如果正在加载则显示提示信息并取消操作
   * 
   * @param t - 任务上下文参数
   * @param n - 额外参数
   * @returns 返回任务执行状态
   *          - status: "cancel" 表示设计正在加载，操作被取消
   *          - status: "success" 表示设计未在加载，可以继续执行
   */
  execute(
    t: unknown,
    n: unknown
  ): Promise<{ status: "cancel" | "success" }>;
}