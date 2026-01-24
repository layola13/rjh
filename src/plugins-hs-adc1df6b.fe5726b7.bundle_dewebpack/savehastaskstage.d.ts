/**
 * 保存阶段管理模块
 * 提供保存流程的基础阶段类和带任务的阶段类
 */

/**
 * 保存服务接口
 */
interface SaveService {
  app: unknown;
}

/**
 * 阶段执行上下文
 */
interface StageContext {
  saveService: SaveService;
}

/**
 * 阶段执行结果
 */
interface StageResult<T = unknown> {
  /** 执行状态 */
  status: 'success' | 'error';
  /** 返回数据 */
  data?: T;
  /** 任务名称（错误时） */
  task?: string;
}

/**
 * 任务服务接口
 */
interface TaskService<TInput = unknown, TOutput = unknown> {
  /**
   * 执行任务
   * @param input - 输入数据
   * @param options - 执行选项
   * @param previousData - 前一个任务的数据
   * @returns 任务执行结果
   */
  execute(
    input: TInput,
    options: unknown,
    previousData?: unknown
  ): Promise<StageResult<TOutput>>;
}

/**
 * 任务注册配置（简单形式）
 */
interface SimpleTaskConfig {
  /** 任务名称 */
  name: string;
}

/**
 * 任务注册配置（完整形式）
 */
interface TaskConfig extends SimpleTaskConfig {
  /** 在指定任务之前插入（单个任务名） */
  before?: string | string[];
}

/**
 * 内部任务映射项
 */
interface TaskMapItem<T = unknown> {
  /** 任务名称 */
  name: string;
  /** 任务服务实例 */
  task: TaskService<unknown, T>;
  /** 在指定任务之前插入 */
  before?: string | string[];
}

/**
 * 保存阶段基类
 * 负责基础的保存流程管理
 */
export declare class SaveStage {
  /** 保存服务实例 */
  protected saveService: SaveService;

  /**
   * 构造函数
   * @param context - 阶段执行上下文
   */
  constructor(context: StageContext);

  /**
   * 执行保存阶段
   * @param input - 输入数据
   * @param options - 执行选项
   * @returns 执行结果
   */
  execute<T = unknown>(input: T, options: unknown): Promise<StageResult>;
}

/**
 * 带任务管理的保存阶段类
 * 继承自SaveStage，增加了任务注册和顺序执行能力
 */
export declare class SaveHasTaskStage extends SaveStage {
  /** 应用实例 */
  protected app: unknown;
  
  /** 任务映射表 */
  protected taskMap: TaskMapItem[];
  
  /** 中止信号 */
  protected signal: unknown;

  /**
   * 构造函数
   * @param context - 阶段执行上下文
   */
  constructor(context: StageContext);

  /**
   * 根据名称获取任务
   * @param taskName - 任务名称
   * @returns 任务服务实例，未找到返回undefined
   */
  getTask<T = TaskService>(taskName: string): T | undefined;

  /**
   * 执行所有已注册的任务
   * @param input - 输入数据
   * @param options - 执行选项
   * @returns 包含所有任务结果的映射对象
   */
  execute<TInput = unknown>(
    input: TInput,
    options: unknown
  ): Promise<StageResult<Record<string, unknown>>>;

  /**
   * 注册任务服务（重载：简单形式）
   * @param taskName - 任务名称
   * @param taskService - 任务服务实例
   */
  registerTaskService(
    taskName: string,
    taskService: TaskService
  ): void;

  /**
   * 注册任务服务（重载：配置形式）
   * @param config - 任务配置对象
   * @param taskService - 任务服务实例
   */
  registerTaskService(
    config: TaskConfig,
    taskService: TaskService
  ): void;

  /**
   * 注销任务服务
   * @param taskName - 要注销的任务名称
   */
  unregisterTaskService(taskName: string): void;

  /**
   * 按顺序执行任务列表
   * @param taskList - 任务映射列表
   * @param input - 输入数据
   * @param options - 执行选项
   * @returns 聚合的执行结果
   * @private
   */
  private forEachStage<TInput = unknown>(
    taskList: TaskMapItem[],
    input: TInput,
    options: unknown
  ): Promise<StageResult<Record<string, unknown>>>;

  /**
   * 内部注册任务服务实现
   * @param config - 完整的任务配置
   * @private
   */
  private _registerTaskService(config: TaskMapItem): void;
}