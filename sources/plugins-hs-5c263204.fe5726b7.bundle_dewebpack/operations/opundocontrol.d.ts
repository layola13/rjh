/**
 * 撤销操作控制器
 * 提供撤销功能的命令处理
 */

/**
 * 操作执行上下文
 */
interface OperationContext {
  /** 是否为问题语气（0: 否, 1: 是） */
  isQuestionTone: number;
  /** 回复消息 */
  reply: string;
  /** 推荐的操作类型列表 */
  recommendedOperationTypes?: string[];
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /** 检查是否可以撤销 */
  canUndo(): boolean;
  /** 执行撤销操作 */
  undo(): void;
}

/**
 * 应用实例接口
 */
interface Application {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 基础操作抽象类
 */
declare abstract class BaseOperation {
  /** 应用实例 */
  protected app: Application;

  /**
   * 检查命令支持性
   * @returns 是否支持当前命令
   */
  protected checkCommandSupport(): boolean;

  /**
   * 完成操作回调
   * @param status - 操作状态
   * @param message - 返回消息
   * @param context - 操作上下文
   */
  protected onFinish(status: string, message: string, context: OperationContext): void;
}

/**
 * 操作ID枚举
 */
declare enum OperationId {
  Undo = "undo"
}

/**
 * 资源管理器
 */
declare const ResourceManager: {
  /**
   * 获取国际化字符串
   * @param key - 资源键
   * @returns 本地化文本
   */
  getString(key: string): string;
};

/**
 * 撤销操作控制器
 * 处理用户的撤销命令请求
 */
export class OpUndoControl extends BaseOperation {
  /**
   * 获取操作唯一标识符
   * @returns 操作ID
   */
  static getId(): OperationId {
    return OperationId.Undo;
  }

  /**
   * 获取推荐的操作类型
   * @param operationId - 操作ID
   * @returns 推荐操作类型数组
   */
  static getRecommendedOperationTypes(operationId: OperationId): string[] {
    // 实现由原始代码上下文提供
    return [];
  }

  /**
   * 执行撤销操作
   * @param context - 操作执行上下文
   */
  onExecute(context: OperationContext): void {
    // 检查命令支持且不是问题语气
    if (this.checkCommandSupport() || context.isQuestionTone !== 0) {
      let reply: string = context.reply;

      // 仅当非问题语气时执行撤销
      if (context.isQuestionTone === 0) {
        if (this.app.transManager.canUndo()) {
          // 执行撤销
          this.app.transManager.undo();
          
          // 获取推荐操作类型
          const recommendedTypes = OpUndoControl.getRecommendedOperationTypes(
            OpUndoControl.getId()
          );
          context.recommendedOperationTypes = recommendedTypes;
        } else {
          // 无法撤销时提示
          reply = ResourceManager.getString("homegpt_undo_tip");
        }
      }

      this.onFinish("success", reply, context);
    } else {
      // 渲染模式下的提示
      this.onFinish(
        "success",
        ResourceManager.getString("homegpt_undo_render_tip"),
        context
      );
    }
  }
}