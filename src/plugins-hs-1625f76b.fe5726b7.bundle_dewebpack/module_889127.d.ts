/**
 * 批量显示/隐藏内容命令
 * 用于控制场景中多个模型对象的可见性
 */

/**
 * 请求类型常量
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 显示内容请求 */
    DisplayContent = 'DisplayContent',
    /** 复合请求 */
    Composite = 'Composite'
  }

  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** 工具栏插件 */
    Toolbar = 'Toolbar'
  }

  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 视图操作 */
    ViewOperation = 'ViewOperation'
  }
}

declare namespace HSConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 复合请求 */
    Composite = 'Composite'
  }
}

/**
 * 事务管理器接口
 * 负责创建和提交各类操作请求
 */
interface TransactionManager {
  /**
   * 创建请求对象
   * @param requestType - 请求类型
   * @param args - 请求参数数组
   * @returns 请求对象实例
   */
  createRequest(requestType: HSFPConstants.RequestType | HSConstants.RequestType, args: unknown[]): Request;

  /**
   * 提交请求到执行队列
   * @param request - 要提交的请求对象
   */
  commit(request: Request): void;
}

/**
 * 请求对象接口
 * 表示一个待执行的操作请求
 */
interface Request {
  // 请求的具体实现由系统内部管理
}

/**
 * 插件管理器接口
 * 负责管理和获取各类插件实例
 */
interface PluginManager {
  /**
   * 根据类型获取插件实例
   * @param pluginType - 插件类型
   * @returns 对应的插件实例
   */
  getPlugin(pluginType: HSFPConstants.PluginType): Plugin;
}

/**
 * 插件基础接口
 */
interface Plugin {
  /**
   * 更新隐藏模型列表
   * @param show - true表示显示，false表示隐藏
   */
  updateHiddenModels?(show: boolean): void;
}

/**
 * 应用上下文接口
 * 提供全局应用级别的服务访问
 */
interface AppContext {
  /** 事务管理器实例 */
  transManager: TransactionManager;

  /** 应用主实例 */
  app: {
    /** 插件管理器实例 */
    pluginManager: PluginManager;
  };
}

/**
 * 命令基类
 * 所有可执行命令的抽象基类
 */
declare namespace HSApp.Cmd {
  abstract class Command {
    /** 命令执行上下文 */
    protected context: AppContext;

    /**
     * 执行命令的核心逻辑
     */
    abstract onExecute(): void;

    /**
     * 判断命令是否可撤销/重做
     * @returns true表示支持撤销重做，false表示不支持
     */
    abstract canUndoRedo(): boolean;

    /**
     * 获取命令描述信息
     * @returns 命令的中文描述
     */
    abstract getDescription(): string;

    /**
     * 获取命令所属分类
     * @returns 命令分类标识
     */
    abstract getCategory(): string;
  }
}

/**
 * 批量显示/隐藏内容命令类
 * 
 * @description
 * 用于批量控制场景中多个内容对象的可见性。
 * 该命令会创建多个DisplayContent请求并通过复合请求统一提交，
 * 同时更新工具栏中的隐藏模型状态。
 * 
 * @remarks
 * - 该命令不支持撤销/重做操作
 * - 执行后会自动同步工具栏的显示状态
 * 
 * @example
 *