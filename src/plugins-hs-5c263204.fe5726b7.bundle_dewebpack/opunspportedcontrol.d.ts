/**
 * 操作执行上下文接口
 * 包含操作执行所需的数据和回复处理
 */
interface OperationExecuteContext<TReply = unknown> {
  /** 推荐的操作类型列表 */
  recommendedOperationTypes?: string[];
  /** 回复数据 */
  reply: TReply;
  /** 其他上下文属性 */
  [key: string]: unknown;
}

/**
 * 操作执行状态
 * 表示操作完成时的结果状态
 */
type OperationStatus = 'success' | 'error' | 'cancelled';

/**
 * 操作ID枚举
 * 定义系统支持的各类操作标识符
 */
declare enum OperationId {
  Others = 'others',
  // 其他操作类型可根据实际情况扩展
}

/**
 * 基础操作抽象类
 * 所有操作类的基类，提供操作执行的基础框架
 */
declare abstract class BaseOperation {
  /**
   * 操作完成时调用的钩子方法
   * @param status - 操作执行状态
   * @param reply - 回复数据
   * @param context - 执行上下文
   */
  protected onFinish<TReply = unknown>(
    status: OperationStatus,
    reply: TReply,
    context: OperationExecuteContext<TReply>
  ): void;

  /**
   * 获取推荐的操作类型
   * @param operationId - 操作ID
   * @returns 推荐的操作类型列表
   */
  static getRecommendedOperationTypes(operationId: OperationId | string): string[];
}

/**
 * 不支持操作控制类
 * 用于处理系统不支持或未实现的操作请求
 * 
 * @remarks
 * 当遇到不支持的操作时，该控制器会返回推荐的替代操作类型，
 * 帮助用户找到合适的操作方式
 * 
 * @example
 *