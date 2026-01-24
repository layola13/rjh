/**
 * 保存获取数据阶段处理类
 * 负责在保存流程中获取并处理数据，支持数据转储服务
 */
export declare class SaveGetDataStage {
  /**
   * 应用实例引用
   */
  private readonly app: unknown;

  /**
   * 获取数据的方法
   * 从保存服务中绑定的数据获取函数
   */
  private readonly getData: <T = unknown>(target: T) => Promise<unknown>;

  /**
   * 获取转储服务列表的方法
   * 返回所有可用的数据转储服务
   */
  private readonly getDumpServices: () => unknown[];

  /**
   * 构造函数
   * @param options - 配置选项
   * @param options.saveService - 保存服务实例，包含数据获取和转储服务相关方法
   */
  constructor(options: {
    saveService: {
      app: unknown;
      getData: <T>(target: T) => Promise<unknown>;
      getDumpServices: () => unknown[];
    };
  });

  /**
   * 执行数据获取阶段
   * 通过转储服务获取目标数据，并返回执行结果
   * 
   * @template T - 目标数据的类型
   * @param target - 要获取数据的目标对象
   * @param context - 执行上下文（当前未使用）
   * @returns 返回包含状态和数据的结果对象
   */
  execute<T = unknown>(
    target: T,
    context?: unknown
  ): Promise<{
    status: 'success';
    data: unknown;
  }>;
}