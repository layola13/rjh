/**
 * 文档和应用设置监听器模块
 * 负责监听文档关闭和应用设置变更事件，并注册房间选择命令
 */

/**
 * 信号钩子接口 - 用于事件监听
 */
interface ISignalHook {
  /**
   * 监听指定信号
   * @param signal - 要监听的信号源
   * @param handler - 信号触发时的回调函数
   * @returns 返回自身以支持链式调用
   */
  listen<T = unknown>(signal: ISignal<T>, handler: (data: T) => void): this;
}

/**
 * 信号接口 - 事件发射器
 */
interface ISignal<T = unknown> {
  emit(data: T): void;
  disconnect(handler: (data: T) => void): void;
}

/**
 * 应用设置接口
 */
interface IAppSettings {
  /** 设置值变更信号 */
  signalValueChanged: ISignal<IAppSettingChangeData>;
}

/**
 * 应用设置变更数据
 */
interface IAppSettingChangeData {
  key: string;
  value: unknown;
  oldValue: unknown;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 注册命令
   * @param commandType - 命令类型标识
   * @param commandClass - 命令类构造函数
   */
  register(commandType: string, commandClass: new (...args: unknown[]) => ICommand): void;
}

/**
 * 命令接口
 */
interface ICommand {
  execute(): void;
  undo?(): void;
  redo?(): void;
}

/**
 * 应用实例接口
 */
interface IApplication {
  /** 文档关闭信号 */
  signalDocumentClosing: ISignal<IDocumentClosingData>;
  /** 应用设置 */
  appSettings: IAppSettings;
  /** 命令管理器 */
  cmdManager: ICommandManager;
}

/**
 * 文档关闭数据
 */
interface IDocumentClosingData {
  documentId: string;
  canCancel: boolean;
}

/**
 * HSFP常量定义
 */
declare namespace HSFPConstants {
  namespace CommandType {
    const SelectSingleRoom: string;
  }
}

/**
 * 选择单个房间命令类
 */
declare class CmdSelectSingleRoom implements ICommand {
  execute(): void;
}

/**
 * 模块类 - 管理文档和应用设置的监听
 */
declare class ModuleValue {
  /** 应用实例引用 */
  protected _app: IApplication;
  
  /** 信号钩子实例 */
  protected signalHook: ISignalHook;

  /**
   * 初始化模块
   * 设置事件监听器和注册命令
   */
  initialize(): void;

  /**
   * 文档关闭事件处理器
   * @param data - 文档关闭事件数据
   */
  protected onDocumentClosing(data: IDocumentClosingData): void;

  /**
   * 应用设置值变更事件处理器
   * @param data - 设置变更事件数据
   */
  protected onAppSettingsValueChanged(data: IAppSettingChangeData): void;
}

export {
  ISignalHook,
  ISignal,
  IAppSettings,
  IAppSettingChangeData,
  ICommandManager,
  ICommand,
  IApplication,
  IDocumentClosingData,
  ModuleValue
};