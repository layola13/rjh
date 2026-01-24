/**
 * 房间天花板切换命令模块
 * @module ToggleCeilingCommand
 */

/**
 * 房间标志枚举
 */
declare enum RoomFlagEnum {
  /** 天花板关闭标志 */
  ceilingOff = 'ceilingOff'
}

/**
 * 请求类型枚举
 */
declare enum RequestType {
  /** 切换天花板状态请求 */
  ToggleCeilingStatus = 'ToggleCeilingStatus'
}

/**
 * 房间模型接口
 */
declare interface IRoom {
  /**
   * 检查房间标志是否关闭
   * @param flag - 房间标志
   * @returns 标志是否关闭
   */
  isFlagOff(flag: RoomFlagEnum): boolean;
}

/**
 * 事务请求接口
 */
declare interface ITransactionRequest {
  /** 请求类型 */
  readonly type: RequestType;
  /** 请求参数 */
  readonly params: readonly [IRoom, boolean];
}

/**
 * 事务管理器接口
 */
declare interface ITransactionManager {
  /**
   * 创建事务请求
   * @param type - 请求类型
   * @param params - 请求参数 [房间对象, 是否开启天花板]
   * @returns 事务请求对象
   */
  createRequest(
    type: RequestType,
    params: readonly [IRoom, boolean]
  ): ITransactionRequest;

  /**
   * 提交事务请求
   * @param request - 事务请求对象
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 命令管理器接口
 */
declare interface ICommandManager {
  /**
   * 标记命令执行完成
   * @param command - 已完成的命令实例
   */
  complete(command: ICommand): void;
}

/**
 * 命令上下文接口
 */
declare interface ICommandContext {
  /** 事务管理器 */
  readonly transManager: ITransactionManager;
}

/**
 * 命令基础接口
 */
declare interface ICommand {
  /** 命令上下文 */
  readonly context: ICommandContext;
  
  /** 命令管理器 */
  readonly mgr: ICommandManager;

  /**
   * 执行命令
   */
  onExecute(): void;

  /**
   * 检查命令是否可以撤销/重做
   * @returns 是否可以撤销/重做
   */
  canUndoRedo(): boolean;
}

/**
 * 命令基类
 * 所有命令的抽象基类
 */
declare abstract class Command implements ICommand {
  /** 命令上下文 */
  readonly context: ICommandContext;
  
  /** 命令管理器 */
  readonly mgr: ICommandManager;

  /**
   * 执行命令的抽象方法
   */
  abstract onExecute(): void;

  /**
   * 检查命令是否可以撤销/重做
   * @returns 是否可以撤销/重做
   */
  abstract canUndoRedo(): boolean;
}

/**
 * 切换天花板状态命令
 * 用于控制房间天花板的开启/关闭状态
 * @extends Command
 */
declare class ToggleCeilingCommand extends Command {
  /** 目标房间 */
  private readonly _room: IRoom;
  
  /** 目标状态：true表示开启天花板，false表示关闭天花板 */
  private readonly _isCeilingOn: boolean;

  /**
   * 构造函数
   * @param room - 要操作的房间对象
   * @param isCeilingOn - 目标天花板状态（true=开启, false=关闭）
   */
  constructor(room: IRoom, isCeilingOn: boolean);

  /**
   * 执行天花板状态切换命令
   * 仅当当前天花板状态与目标状态不一致时才执行操作
   */
  onExecute(): void;

  /**
   * 检查命令是否可以撤销/重做
   * @returns 始终返回 false，此命令不支持撤销/重做
   */
  canUndoRedo(): false;
}

/**
 * 命名空间声明
 */
declare namespace HSApp {
  namespace Cmd {
    export { Command };
  }
}

declare namespace HSCore {
  namespace Model {
    export { RoomFlagEnum };
  }
}

declare namespace HSFPConstants {
  export { RequestType };
}

/**
 * 模块默认导出
 */
export default ToggleCeilingCommand;