/**
 * HomeGPT Plugin Module
 * 
 * AI设计助手插件，提供智能布局、空间规划等AI辅助设计功能
 * 支持多租户环境和A/B测试
 */

import { HSCore } from '635589';
import { Storage } from '974568';
import { HomeGPTEntry } from '282290';
import { CmdHomeGptSmartLayout, ApplyTypeEnum } from '263767';

/**
 * 应用环境标识符
 */
declare enum EnvironmentId {
  /** 渲染环境 */
  Render = 'render',
  /** 默认环境 */
  Default = 'default'
}

/**
 * 渲染类型枚举
 */
declare enum RenderType {
  /** 图片渲染 */
  Image = 'image',
  /** 视频渲染 */
  Video = 'video'
}

/**
 * A/B测试桶标识
 */
declare type ABTestBucket = 'A' | 'B';

/**
 * 租户类型
 */
declare type TenantType = 'ezhome' | 'fp';

/**
 * 命令类型枚举
 */
declare enum CommandType {
  HomeGptSmartLayout = 'HomeGptSmartLayout',
  CmdRestoreTemplate = 'CmdRestoreTemplate'
}

/**
 * 插件管理器接口
 */
interface IPluginManager {
  /**
   * 获取指定名称的插件实例
   * @param pluginName - 插件标识符
   * @returns 插件实例
   */
  getPlugin(pluginName: string): IPlugin;
}

/**
 * 插件基础接口
 */
interface IPlugin {
  /**
   * 获取插件处理器
   * @returns 处理器实例
   */
  getHandler?(): IPluginHandler;
  
  /**
   * 获取图片类型
   * @returns 图片类型标识
   */
  getImageType?(): string;
  
  /** 权限检查完成信号 */
  signalCheckPermissionsCompleted?: HSCore.Util.Signal;
}

/**
 * 插件处理器接口
 */
interface IPluginHandler {
  /** 渲染类型变更信号 */
  onRenderTypeChangeSignal?: HSCore.Util.Signal;
}

/**
 * 环境管理器接口
 */
interface IEnvironmentManager {
  /** 环境激活信号 */
  signalEnvironmentActivated: HSCore.Util.Signal;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 注册命令
   * @param commands - 命令类型和实现类的映射数组
   */
  register(commands: Array<[CommandType, typeof CmdHomeGptSmartLayout]>): void;
  
  /**
   * 创建命令实例
   * @param commandType - 命令类型
   * @param args - 命令参数
   * @returns 命令实例
   */
  createCommand(commandType: CommandType, args: unknown[]): ICommand;
  
  /**
   * 执行命令
   * @param command - 要执行的命令
   */
  execute(command: ICommand): void;
  
  /**
   * 完成命令执行
   * @param command - 已执行的命令
   */
  complete(command: ICommand): void;
}

/**
 * 命令接口
 */
interface ICommand {
  /** 命令类型 */
  type: CommandType;
  /** 命令参数 */
  args: unknown[];
}

/**
 * 应用实例接口
 */
interface IApplication {
  /** 插件管理器 */
  pluginManager: IPluginManager;
  /** 环境管理器 */
  environmentManager: IEnvironmentManager;
  /** 命令管理器 */
  cmdManager: ICommandManager;
}

/**
 * 初始化配置接口
 */
interface IInitConfig {
  /** 应用实例 */
  app: IApplication;
}

/**
 * 环境激活事件数据
 */
interface IEnvironmentActivatedEventData {
  /** 新环境ID */
  newEnvironmentId?: EnvironmentId;
}

/**
 * 环境激活事件
 */
interface IEnvironmentActivatedEvent {
  /** 事件数据 */
  data: IEnvironmentActivatedEventData;
}

/**
 * 渲染类型变更事件数据
 */
interface IRenderTypeChangedEventData {
  /** 渲染类型 */
  renderType: RenderType;
}

/**
 * 渲染类型变更事件
 */
interface IRenderTypeChangedEvent {
  /** 事件数据 */
  data: IRenderTypeChangedEventData;
}

/**
 * A/B测试注册配置
 */
interface IABTestConfig {
  /** 测试场景名称 */
  scene: string;
  /** 可用的测试桶 */
  buckets: ABTestBucket[];
  /** 是否不进行远程获取 */
  notFetch: boolean;
  /** 测试描述 */
  describe: string;
  /** 默认桶 */
  default: ABTestBucket;
  /** 加载完成回调 */
  onLoad: (result?: { bucket: ABTestBucket }) => void;
}

/**
 * A/B测试管理器接口
 */
interface IABTestManager {
  /**
   * 注册A/B测试
   * @param config - 测试配置
   */
  register(config: IABTestConfig): void;
}

/**
 * 用户信息接口
 */
interface IUserInfo {
  /** 代理商ID */
  agentId?: string;
  /** 是否为企业代理 */
  isEnterpriseAgent?: boolean;
}

/**
 * 应用配置接口
 */
interface IAppConfig {
  /** 租户类型 */
  TENANT: TenantType;
}

/**
 * 全局应用对象
 */
declare global {
  const HSApp: {
    /** A/B测试管理器 */
    ABManager: IABTestManager;
    /** 应用配置 */
    Config: IAppConfig;
    /** 工具集合 */
    Util: {
      /** 导入工具 */
      ImportUtil: {
        /**
         * 收集恢复数据
         * @param data - 原始数据
         * @returns 恢复数据
         */
        collectRestoreData(data: unknown[]): unknown;
      };
    };
  };
  
  /** 用户信息 */
  const adskUser: IUserInfo;
  
  /** 首页常量 */
  const HSFPConstants: {
    /** 环境常量 */
    Environment: {
      /** 渲染环境 */
      Render: EnvironmentId;
      /** 默认环境 */
      Default: EnvironmentId;
    };
    /** 命令类型常量 */
    CommandType: {
      /** HomeGPT智能布局命令 */
      HomeGptSmartLayout: CommandType;
      /** 恢复模板命令 */
      CmdRestoreTemplate: CommandType;
    };
  };
  
  /** React库 */
  const React: typeof import('react');
  /** ReactDOM库 */
  const ReactDOM: typeof import('react-dom');
}

/**
 * 房间数据接口
 */
interface IRoomData {
  /** 房间ID */
  id: string;
  /** 房间名称 */
  name?: string;
  /** 其他房间属性 */
  [key: string]: unknown;
}

/**
 * HomeGPT插件主类
 * 
 * 负责管理AI设计助手的核心功能：
 * - 插件初始化和生命周期管理
 * - UI入口创建和可见性控制
 * - 智能布局命令的执行和恢复
 * - 环境切换和A/B测试集成
 */
declare class HomeGPTPlugin {
  /** 信号钩子，用于监听和管理事件 */
  signalHook: HSCore.Util.SignalHook | undefined;
  
  /** 查询终止信号 */
  queryTerminateSignal: HSCore.Util.Signal | undefined;
  
  /** 应用实例引用 */
  app: IApplication | undefined;
  
  /** 内部存储实例 */
  private _storage: Storage | undefined;
  
  /** A/B测试桶标识（默认为B） */
  bucket: ABTestBucket;
  
  /** 登录状态是否已加载 */
  loginLoaded: boolean;

  /**
   * 初始化插件
   * @param config - 初始化配置对象
   */
  init(config: IInitConfig): void;

  /**
   * 获取AI Copilot的A/B测试配置
   * 
   * 注册A/B测试实验，根据测试结果决定是否为用户启用AI功能
   * - 场景：abRAICopilotCountry
   * - 仅在fp租户下进行远程获取
   */
  getAICopilotABTest(): void;

  /**
   * 创建HomeGPT的UI入口
   * 
   * 条件检查：
   * - DOM中不存在homegpt-container
   * - 非fp租户，或满足以下条件：
   *   - A/B测试桶为A
   *   - 登录已加载
   *   - 非代理商用户
   *   - 非企业代理用户
   */
  createEntry(): void;

  /**
   * 环境激活事件处理器
   * @param event - 环境激活事件对象
   * 
   * 根据环境类型（渲染/默认）控制UI可见性
   * 在渲染环境下监听渲染类型变更
   */
  onEnvironmentActivated(event: IEnvironmentActivatedEvent): void;

  /**
   * 渲染类型变更事件处理器
   * @param event - 渲染类型变更事件
   * 
   * 当渲染类型为video时隐藏UI
   */
  onRenderTypeChanged(event: IRenderTypeChangedEvent): void;

  /**
   * 设置UI可见性
   * @param visible - 是否可见
   */
  setVisibility(visible: boolean): void;

  /**
   * 获取信号钩子实例
   * @returns 信号钩子
   */
  getSignalHook(): HSCore.Util.SignalHook;

  /**
   * 反初始化插件
   * 
   * 清理所有事件监听器
   */
  uninit(): void;

  /**
   * 注册命令到命令管理器
   * 
   * 注册HomeGptSmartLayout命令
   */
  registerCmd(): void;

  /**
   * 收集恢复数据
   * @param rooms - 房间数据数组
   * 
   * 保存当前场景状态以支持撤销操作
   */
  collectRestoreData(rooms: IRoomData[]): void;

  /**
   * 执行智能布局
   * @param layoutData - 布局数据
   * 
   * 创建并执行智能布局命令
   */
  onSmartLayout(layoutData: unknown): void;

  /**
   * 恢复之前的布局
   * 
   * 根据保存的恢复数据还原场景状态
   * - 如果有房间数据，逐个恢复房间
   * - 否则恢复整个场景
   */
  restoreLayout(): void;

  /**
   * 查询终止信号
   * @returns 终止信号实例
   */
  queryTerminate(): HSCore.Util.Signal;
}

export default HomeGPTPlugin;