/**
 * 分组内容数据结构
 */
interface GroupContentData {
  /** 组ID */
  id: string;
  /** 组名称 */
  name: string;
  /** 品牌或版本 */
  v: string;
  /** 内容类型 */
  contentType: string;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** 是否可解组 */
  ungroupable?: boolean;
}

/**
 * 应用上下文接口
 */
interface AppContext {
  /** 应用实例 */
  app: {
    /** 选择管理器 */
    selectionManager: {
      /** 获取当前选中项 */
      selected(): unknown[];
      /** 取消所有选择 */
      unselectAll(): void;
    };
  };
  /** 事务管理器 */
  transManager: {
    /**
     * 创建请求
     * @param requestType - 请求类型
     * @param params - 参数数组
     */
    createRequest(requestType: string, params: unknown[]): {
      /** 请求结果 */
      result: unknown;
    };
    /**
     * 提交请求
     * @param request - 请求对象
     */
    commit(request: unknown): void;
  };
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 完成命令执行
   * @param command - 命令实例
   */
  complete(command: GroupContentsCommand): void;
}

/**
 * 分组内容命令类
 * 用于将多个内容元素组合成一个自由组
 */
declare class GroupContentsCommand extends HSApp.Cmd.Command {
  /** 要分组的成员列表 */
  private _members: unknown[];
  
  /** 命令执行结果 */
  output: unknown;
  
  /** 应用上下文 */
  context: AppContext;
  
  /** 命令管理器 */
  mgr: CommandManager;

  /**
   * 构造函数
   * @param members - 要分组的成员数组
   */
  constructor(members: unknown[]);

  /**
   * 执行命令
   * 创建自由组并将选中的内容元素添加到组中
   */
  onExecute(): void;

  /**
   * 是否可以撤销/重做
   * @returns 始终返回false，表示此命令不支持撤销/重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述
   * @returns 返回"模型组合"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 返回内容操作日志分组类型
   */
  getCategory(): string;
}

/**
 * 全局命名空间声明
 */
declare namespace HSApp {
  namespace Cmd {
    /** 基础命令类 */
    class Command {
      /** 应用上下文 */
      context: AppContext;
      /** 命令管理器 */
      mgr: CommandManager;
    }
  }
}

/**
 * 核心工具类
 */
declare namespace HSCore {
  namespace Util {
    namespace Content {
      /**
       * 获取内容组的类型
       * @param items - 内容项数组
       * @returns 内容类型字符串
       */
      function getGroupContentType(items: unknown[]): string;
    }
  }
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 资源键
   * @returns 本地化字符串
   */
  function getString(key: string): string;
}

/**
 * 应用常量
 */
declare namespace HSFPConstants {
  /** 请求类型枚举 */
  enum RequestType {
    /** 分组内容请求 */
    GroupContents = "GroupContents"
  }
  
  /** 日志分组类型枚举 */
  enum LogGroupTypes {
    /** 内容操作类型 */
    ContentOperation = "ContentOperation"
  }
}

export default GroupContentsCommand;