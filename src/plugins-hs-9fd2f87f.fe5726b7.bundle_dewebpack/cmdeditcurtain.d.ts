/**
 * 幕帘编辑命令模块
 * 提供幕帘组件的编辑、显示/隐藏、材质应用等功能
 */

/**
 * 幕帘编辑命令消息枚举
 * 定义了编辑过程中可接收的所有命令消息类型
 */
export enum EditCurtainCommandMessageEnum {
  /** 取消编辑操作 */
  Cancel = "cancel",
  /** 完成编辑操作 */
  Complete = "complete",
  /** 重置编辑状态 */
  Reset = "reset",
  /** 编辑指定组件 */
  EditComponent = "editcomponent",
  /** 显示指定组件 */
  ShowComponent = "showcomponent",
  /** 隐藏指定组件 */
  HideComponent = "hidecomponent"
}

/**
 * 幕帘对象接口
 * 表示可编辑的幕帘实体
 */
export interface ICurtain {
  /**
   * 获取指定组件的材质
   * @param component - 组件标识
   * @returns 材质对象，若不存在则返回undefined
   */
  getMaterial(component: unknown): IMaterial | undefined;
}

/**
 * 材质对象接口
 */
export interface IMaterial {
  /**
   * 判断材质是否与另一材质相同
   * @param other - 待比较的材质
   * @returns 是否相同
   */
  isSame(other: unknown): boolean;
}

/**
 * 目录插件接口
 * 提供产品目录相关功能
 */
export interface ICatalogPlugin {
  // 具体属性和方法根据实际业务定义
}

/**
 * 事务会话接口
 * 管理可撤销/重做的操作会话
 */
export interface ITransactionSession {
  /** 中止会话，回滚所有更改 */
  abort(): void;
  /** 提交会话，应用所有更改 */
  commit(): void;
}

/**
 * 事务管理器接口
 */
export interface ITransactionManager {
  /**
   * 启动新的事务会话
   * @returns 事务会话对象
   */
  startSession(): ITransactionSession;
  
  /**
   * 创建变更请求
   * @param requestType - 请求类型
   * @param args - 请求参数数组
   * @returns 请求对象
   */
  createRequest(requestType: string, args: unknown[]): unknown;
  
  /**
   * 提交请求到事务管理器
   * @param request - 待提交的请求
   */
  commit(request: unknown): void;
}

/**
 * 命令上下文接口
 * 提供命令执行所需的应用环境
 */
export interface ICommandContext {
  /** 应用实例 */
  app: unknown;
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 命令管理器接口
 */
export interface ICommandManager {
  /**
   * 完成命令执行
   * @param command - 待完成的命令实例
   */
  complete(command: CmdEditCurtain): void;
}

/**
 * 基础命令抽象类声明
 */
export declare abstract class Command {
  /** 命令执行上下文 */
  protected context: ICommandContext;
  /** 命令管理器 */
  protected mgr: ICommandManager;
  
  /**
   * 接收并处理命令消息
   * @param message - 消息类型
   * @param data - 消息数据
   * @returns 是否处理成功
   */
  abstract onReceive(message: string, data: unknown): boolean;
}

/**
 * 组件编辑消息数据接口
 */
export interface IEditComponentMessageData {
  /** 待编辑的组件 */
  component: unknown;
}

/**
 * 材质内容消息数据接口
 */
export interface IContentMessageData {
  /** 产品类型 */
  productType: string;
  /** 其他材质相关数据 */
  [key: string]: unknown;
}

/**
 * 键盘事件消息数据接口
 */
export interface IKeydownMessageData {
  /** 键盘按键代码 */
  keyCode: number;
}

/**
 * 幕帘编辑命令类
 * 继承自基础命令类，实现幕帘的编辑、组件显示/隐藏、材质应用等功能
 */
export declare class CmdEditCurtain extends Command {
  /** 被编辑的幕帘对象 */
  readonly curtain: ICurtain;
  
  /** 目录插件实例 */
  private readonly _catalogPlugin: ICatalogPlugin;
  
  /** 当前正在编辑的组件 */
  private _editingComponent?: unknown;
  
  /** 当前事务会话 */
  private _session?: ITransactionSession;
  
  /**
   * 构造幕帘编辑命令
   * @param curtain - 待编辑的幕帘对象
   * @param catalogPlugin - 目录插件实例
   */
  constructor(curtain: ICurtain, catalogPlugin: ICatalogPlugin);
  
  /**
   * 判断命令是否支持撤销/重做
   * @returns 始终返回false，表示不支持
   */
  canUndoRedo(): boolean;
  
  /**
   * 命令执行时调用
   * 初始化事务会话
   */
  onExecute(): void;
  
  /**
   * 接收并处理命令消息
   * @param message - 消息类型（如keydown、complete、editcomponent等）
   * @param data - 消息携带的数据
   * @returns 是否成功处理消息
   */
  onReceive(message: string, data: unknown): boolean;
  
  /**
   * 取消编辑操作
   * 中止事务并完成命令
   * @private
   */
  private _cancelEdit(): void;
  
  /**
   * 应用编辑结果
   * 提交事务并完成命令
   * @private
   */
  private _applyEdit(): void;
  
  /**
   * 应用组件材质
   * 检查材质是否变更，若变更则创建并提交材质变更请求
   * @param materialData - 新的材质数据
   * @private
   */
  private _applyComponentMaterial(materialData: IContentMessageData): void;
  
  /**
   * 显示或隐藏组件
   * 创建并提交显示/隐藏组件的请求
   * @param component - 目标组件
   * @param isHide - true表示隐藏，false表示显示
   * @private
   */
  private _isHideComponent(component: unknown, isHide: boolean): void;
}