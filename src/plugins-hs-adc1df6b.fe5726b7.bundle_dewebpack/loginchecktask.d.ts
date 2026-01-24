/**
 * 登录检查任务模块
 * 用于验证用户登录状态并在需要时触发登录流程
 */

/**
 * 任务执行结果状态
 */
type TaskStatus = 'success' | 'failure';

/**
 * 登录检查任务执行结果数据
 */
interface LoginCheckData {
  /**
   * 是否需要重新登录
   */
  reLogin: boolean;
}

/**
 * 任务执行结果
 */
interface TaskResult<T = unknown> {
  /**
   * 执行状态
   */
  status: TaskStatus;
  
  /**
   * 结果数据
   */
  data: T;
}

/**
 * 登录检查任务类
 * 负责检查用户登录状态，未登录时打开登录窗口
 */
export declare class LoginCheckTask {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 执行登录检查任务
   * 
   * @param e - 第一个参数（具体用途需根据业务上下文确定）
   * @param t - 第二个参数（具体用途需根据业务上下文确定）
   * @returns Promise，resolve时返回登录检查结果
   * 
   * @remarks
   * - 如果用户已登录，直接返回成功结果，reLogin为false
   * - 如果用户未登录，打开登录窗口，登录成功后返回结果，reLogin为true
   */
  execute(e: unknown, t: unknown): Promise<TaskResult<LoginCheckData>>;
}