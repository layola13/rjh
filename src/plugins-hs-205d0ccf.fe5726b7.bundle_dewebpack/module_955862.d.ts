/**
 * 全局墙宽修改命令
 * 用于修改建筑平面中所有墙体的全局宽度
 */

/**
 * 请求类型常量
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 修改全局墙宽请求类型 */
    ChangeGlobalWidth = "ChangeGlobalWidth"
  }

  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 墙体操作日志分组 */
    WallOperation = "WallOperation"
  }
}

/**
 * 应用上下文接口
 */
interface IContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   * @returns 创建的请求对象
   */
  createRequest<T = unknown>(
    requestType: HSFPConstants.RequestType,
    params: T[]
  ): IRequest<T>;

  /**
   * 提交请求
   * @param request - 要提交的请求对象
   */
  commit<T = unknown>(request: IRequest<T>): void;
}

/**
 * 请求对象接口
 */
interface IRequest<T = unknown> {
  /** 请求类型 */
  type: HSFPConstants.RequestType;
  /** 请求参数 */
  params: T[];
}

/**
 * 点击率统计信息接口
 */
interface IClicksRatio {
  /** 操作标识符 */
  id: string;
  /** 操作名称 */
  name: string;
}

/**
 * 命令参数接口
 */
interface ICommandParams {
  /** 当前活动分组 */
  activeSection: HSFPConstants.LogGroupTypes;
  /** 当前活动分组名称 */
  activeSectionName: string;
  /** 点击率统计信息 */
  clicksRatio: IClicksRatio;
}

/**
 * 应用接口
 */
interface IApp {
  /** 命令名称空间 */
  Cmd: {
    /** 命令基类 */
    Command: new () => ICommand;
  };
}

/**
 * 命令基类接口
 */
interface ICommand {
  /** 应用实例 */
  app?: IApp;
  /** 上下文对象 */
  context: IContext;

  /**
   * 执行命令
   * @param params - 执行参数
   */
  onExecute(params: unknown): void;

  /**
   * 获取当前命令参数
   * @returns 命令参数对象
   */
  getCurrentParams(): ICommandParams;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令分类类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 全局应用命名空间
 */
declare namespace HSApp {
  namespace Cmd {
    class Command implements ICommand {
      app?: IApp;
      context: IContext;
      onExecute(params: unknown): void;
      getCurrentParams(): ICommandParams;
      getDescription(): string;
      getCategory(): HSFPConstants.LogGroupTypes;
    }
  }
}

/**
 * 修改全局墙宽命令类
 * 继承自 HSApp.Cmd.Command 基类
 */
declare class ChangeGlobalWidthCommand extends HSApp.Cmd.Command {
  /**
   * 构造函数
   * @param app - 应用实例
   */
  constructor(app: IApp);

  /**
   * 应用实例引用
   */
  app: IApp;

  /**
   * 执行修改全局墙宽操作
   * @param width - 新的墙体宽度值
   */
  onExecute(width: number): void;

  /**
   * 获取当前命令参数
   * @returns 包含活动分组、分组名称和点击率信息的参数对象
   */
  getCurrentParams(): ICommandParams;

  /**
   * 获取命令描述
   * @returns 返回 "修改全局墙宽"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 返回墙体操作分类
   */
  getCategory(): HSFPConstants.LogGroupTypes.WallOperation;
}

/**
 * 默认导出
 */
export default ChangeGlobalWidthCommand;