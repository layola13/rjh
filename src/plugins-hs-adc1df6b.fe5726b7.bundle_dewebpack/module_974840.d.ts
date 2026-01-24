/**
 * 模块：自动调整模压距顶高度命令
 * 
 * 该模块定义了一个用于处理面上实体自动调整距顶高度的命令类。
 * 继承自 HSApp.Cmd.Command 基类。
 */

declare namespace HSApp.Cmd {
  /**
   * 基础命令类接口
   */
  interface Command {
    /**
     * 执行命令时触发
     */
    onExecute(): void;

    /**
     * 接收到消息时触发
     * @param eventType - 事件类型
     * @param data - 事件数据
     * @returns 是否处理成功
     */
    onReceive(eventType: string, data: unknown): boolean;

    /**
     * 命令完成时触发
     * @param result - 执行结果
     */
    onComplete(result: unknown): void;

    /**
     * 获取命令描述
     * @returns 命令的描述文本
     */
    getDescription(): string;

    /**
     * 获取命令分类
     * @returns 命令所属的日志分组类型
     */
    getCategory(): string;
  }
}

declare namespace HSApp.App {
  /**
   * 事务管理器接口
   */
  interface TransactionManager {
    /**
     * 开始一个新的事务会话
     * @returns 会话标识
     */
    startSession(): unknown;

    /**
     * 创建请求
     * @param requestType - 请求类型
     * @param params - 请求参数
     * @returns 请求对象
     */
    createRequest(requestType: string, params: unknown[]): TransactionRequest;

    /**
     * 提交请求
     * @param request - 待提交的请求对象
     */
    commit(request: TransactionRequest): void;
  }

  /**
   * 事务请求接口
   */
  interface TransactionRequest {
    /**
     * 接收消息
     * @param eventType - 事件类型
     * @param data - 事件数据
     */
    receive(eventType: string, data: unknown): void;
  }

  /**
   * 应用实例接口
   */
  interface AppInstance {
    /**
     * 事务管理器
     */
    transManager: TransactionManager;
  }

  /**
   * 应用管理器
   */
  interface AppManager {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    getApp(): AppInstance;
  }

  const App: AppManager;
}

declare namespace HSFPConstants {
  /**
   * 请求类型常量
   */
  const RequestType: {
    /**
     * 更改模压自动调整类型
     */
    readonly ChangeMoldingAutofit: string;
  };

  /**
   * 日志分组类型常量
   */
  const LogGroupTypes: {
    /**
     * 面操作分组
     */
    readonly FaceOperation: string;
  };
}

/**
 * 实体对象接口（面上的元素）
 */
interface Entity {
  [key: string]: unknown;
}

/**
 * 面对象接口
 */
interface Face {
  [key: string]: unknown;
}

/**
 * 自动调整距顶高度命令类
 * 
 * 用于批量处理面上多个实体的自动调整距顶高度操作。
 * 支持事务管理，可撤销/重做。
 * 
 * @example
 *