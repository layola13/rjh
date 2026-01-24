/**
 * 全局面积类型切换命令
 * 用于在户型图编辑器中切换面积展示类型（外框/套内/使用面积）
 */

/**
 * 面积类型枚举
 */
declare enum FloorplanDisplayAreaEnum {
  /** 外框面积 */
  Outer = 0,
  /** 套内面积 */
  Inside = 1,
  /** 使用面积 */
  Used = 2
}

/**
 * 日志分组类型
 */
declare enum LogGroupTypes {
  /** 墙体操作 */
  WallOperation = "WallOperation"
}

/**
 * 请求类型枚举
 */
declare enum RequestType {
  /** 更改全局面积类型 */
  ChangeGlobalAreaType = "ChangeGlobalAreaType"
}

/**
 * 命令执行上下文接口
 */
interface ICommandContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建请求
   * @param type - 请求类型
   * @param params - 请求参数
   */
  createRequest(type: RequestType, params: unknown[]): ITransactionRequest;
  
  /**
   * 提交事务请求
   * @param request - 事务请求对象
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 事务请求接口
 */
interface ITransactionRequest {
  type: RequestType;
  params: unknown[];
}

/**
 * 户型图对象接口
 */
interface IFloorplan {
  /** 户型图唯一标识 */
  id: string;
  /** 当前面积展示类型 */
  displayAreaType?: FloorplanDisplayAreaEnum;
}

/**
 * 命令参数日志接口
 */
interface ICommandLogParams {
  /** 活跃功能区 */
  activeSection: string;
  /** 活跃功能区名称 */
  activeSectionName: string;
  /** 点击率统计信息 */
  clicksRatio: {
    /** 操作ID */
    id: string;
    /** 操作名称 */
    name: string;
  };
  /** 面积类型字符串表示 */
  areaType: "outer" | "inside" | "used";
}

/**
 * 命令基类
 */
declare abstract class Command {
  /** 命令执行上下文 */
  protected context: ICommandContext;

  /**
   * 执行命令
   */
  abstract onExecute(): void;

  /**
   * 判断命令是否为交互式命令
   * @returns 是否需要用户交互
   */
  abstract isInteractive(): boolean;

  /**
   * 获取命令描述
   * @returns 命令的文字描述
   */
  abstract getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属分类
   */
  abstract getCategory(): string;

  /**
   * 获取当前命令参数（用于日志记录）
   * @returns 命令参数对象
   */
  abstract getCurrentParams(): ICommandLogParams;
}

/**
 * 全局面积类型切换命令类
 * 继承自基础命令类，用于切换户型图的面积展示类型
 */
declare class ChangeGlobalAreaTypeCommand extends Command {
  /** 目标户型图对象 */
  private readonly fp: IFloorplan;
  
  /** 目标面积类型 */
  private readonly areaType: FloorplanDisplayAreaEnum;

  /**
   * 构造函数
   * @param floorplan - 户型图对象
   * @param areaType - 要切换到的面积类型
   */
  constructor(floorplan: IFloorplan, areaType: FloorplanDisplayAreaEnum);

  /**
   * 执行命令：创建并提交面积类型更改请求
   */
  onExecute(): void;

  /**
   * 判断是否为交互式命令
   * @returns 始终返回 false，该命令无需用户交互
   */
  isInteractive(): boolean;

  /**
   * 获取命令描述
   * @returns 根据目标面积类型返回相应的描述文本
   * @example "切换面积展示类型为套内面积"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 返回墙体操作分类
   */
  getCategory(): LogGroupTypes;

  /**
   * 获取当前命令参数（用于日志埋点）
   * @returns 包含操作区域、面积类型等信息的参数对象
   */
  getCurrentParams(): ICommandLogParams;
}

export default ChangeGlobalAreaTypeCommand;