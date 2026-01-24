import { UI } from './ui';
import { ConfigTypeEnum } from './config-types';
import { SignalHook } from './signal-hook';
import {
  queryRemindFunctionList,
  queryRemindNewUser,
  queryFunctionConfig,
  noRemind
} from './api';
import { contentConfig } from './content-config';
import { debounce } from './utils';
import { logRemind } from './logger';
import { getMagic, getDomain } from './domain-utils';
import { domainList } from './domain-list';

/**
 * 目标元素的位置和尺寸信息
 */
export interface TargetRect {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 环境配置接口
 */
export interface EnvConfig {
  /** 获取目标矩形区域 */
  getTargetRect?: () => TargetRect;
  /** 获取主题名称 */
  getTheme?: () => string;
  /** 获取模块标识 */
  getModule?: () => string;
}

/**
 * 提醒函数配置项
 */
export interface RemindFunction {
  /** 函数键名 */
  functionKey: string;
  [key: string]: unknown;
}

/**
 * 功能配置信息
 */
export interface FunctionConfig {
  /** 规则ID */
  ruleId: string;
  /** 唤醒类型 */
  awakeType: string;
  /** 内容列表 */
  contents: ContentItem[];
  /** 功能键名 */
  functionKey?: string;
  /** 标签代码 */
  labelCode?: string;
  /** 功能名称 */
  function?: string;
  /** 标签名称 */
  label?: string;
}

/**
 * 内容项
 */
export interface ContentItem {
  /** 文章URL */
  articleUrl?: string;
  /** 文章标题 */
  articleTitle?: string;
  /** 市场URL */
  marketUrl?: string;
  [key: string]: unknown;
}

/**
 * 显示页面配置
 */
export interface ShowPageConfig {
  /** 页面名称 */
  name: string;
  /** 页面数据 */
  data?: {
    /** 模块标识 */
    module?: string;
    /** 用户引导 */
    userGuide?: unknown;
    /** URL地址 */
    url?: string;
    /** 标题 */
    title?: string;
  };
}

/**
 * 显示模型参数
 */
export interface ShowModelOptions {
  /** 模块标识或获取模块的函数 */
  module?: string | (() => string);
  /** 主题名称 */
  theme?: string;
  /** 按钮元素或位置信息 */
  button?: HTMLElement | TargetRect;
  /** 显示页面配置 */
  showPage?: ShowPageConfig;
  /** 附加数据 */
  data?: {
    userGuide?: unknown;
  };
}

/**
 * 获取教学能力按钮参数
 */
export interface GetTeachingAbilityButtonOptions {
  /** 按钮主题 */
  buttonTheme?: string;
  /** 主题名称 */
  theme?: string;
  /** 模块标识 */
  module?: string;
  /** CSS类名 */
  className?: string;
}

/**
 * 提醒配置参数
 */
export interface RemindConfigParams {
  /** 配置类型 */
  type: ConfigTypeEnum;
  /** 关键字 */
  key: string;
}

/**
 * 提醒选项
 */
export interface RemindOptions {
  /** 键名 */
  key: string;
  /** 类型 */
  type: ConfigTypeEnum;
  /** 配置信息 */
  config: FunctionConfig;
}

/**
 * 日志记录参数
 */
export interface LogRemindParams {
  /** 操作类型 */
  actionType: string;
  /** 描述信息 */
  description: string;
  /** ID标识 */
  id: string;
  /** 名称 */
  name: string;
  /** 配置信息 */
  config: FunctionConfig;
}

/**
 * 教学引导管理器
 * 负责管理教学提醒、引导弹窗和用户交互
 */
export default class TeachingManager {
  /** UI管理器实例 */
  private ui: UI;

  /** 提醒函数列表 */
  private remindFunctions: RemindFunction[];

  /** 环境配置映射表 */
  private envConfig: Record<string, EnvConfig>;

  /** 默认环境配置 */
  private readonly defaultEnvConfig: EnvConfig;

  /** 关闭的函数映射表 */
  private closeFunctions: Record<string, boolean>;

  /** 当前进入的函数名称 */
  private intoNowFunction: string;

  /** 当前提醒的键名 */
  private remindKey: string;

  /** 信号钩子管理器 */
  private signalHook: SignalHook;

  /** 当前提醒选项 */
  private remindOptions?: RemindOptions;

  /** 是否为新用户 */
  private isNewUser?: boolean;

  constructor();

  /**
   * 获取右侧默认位置
   * @returns 目标矩形区域
   */
  private getRightPosition(): TargetRect;

  /**
   * 初始化教学管理器
   */
  init(): Promise<void>;

  /**
   * 反初始化，清理资源
   */
  uninit(): void;

  /**
   * 停用时的回调
   */
  onDeactive(): void;

  /**
   * 初始化信号监听
   */
  private initSignal(): void;

  /**
   * 窗口大小改变处理
   */
  private windowResize(): void;

  /**
   * 移除信号监听
   */
  private removeSignal(): void;

  /**
   * 自定义函数开始事件处理
   * @param event - 事件对象
   */
  private customFunctionStart(event: { data?: { key?: string } }): void;

  /**
   * 自定义函数结束事件处理
   * @param event - 事件对象
   */
  private customFunctionTerminated(event: { data?: { cmd?: { key?: string } } }): void;

  /**
   * 命令结束事件处理
   * @param event - 事件对象
   */
  private commandTerminated(event: { data?: { cmd?: { type?: string } } }): void;

  /**
   * 命令开始事件处理
   * @param event - 事件对象
   */
  private commandStarted(event: { data?: { cmd?: { type?: string; getMode?: () => string } } }): void;

  /**
   * 环境激活事件处理
   * @param event - 事件对象
   */
  private environmentActivated(event: { data: { newEnvironmentId: string } }): void;

  /**
   * 获取提醒函数列表
   */
  private fetchRemindFunctions(): Promise<void>;

  /**
   * 获取教学能力按钮
   * @param options - 按钮配置选项
   * @returns 按钮元素
   */
  getTeachingAbilityButton(options: GetTeachingAbilityButtonOptions): HTMLElement;

  /**
   * 检查是否显示引导
   * @returns 是否显示引导
   */
  private isShowGuide(): boolean;

  /**
   * 显示模态窗口
   * @param options - 显示选项
   */
  showModel(options: ShowModelOptions): void;

  /**
   * 关闭模态窗口
   */
  closeModel(): void;

  /**
   * 获取提醒配置
   * @param params - 配置参数
   * @returns 功能配置信息
   */
  private getRemindConfig(params: RemindConfigParams): Promise<FunctionConfig | undefined>;

  /**
   * 进入功能时的处理
   * @param params - 功能参数
   */
  private intoFunction(params: RemindConfigParams): Promise<void>;

  /**
   * 退出功能时的处理
   * @param params - 功能参数
   */
  private outFunction(params: RemindConfigParams): void;

  /**
   * 显示提醒
   * @param options - 提醒选项
   */
  private showRemind(options: RemindOptions): Promise<void>;

  /**
   * 记录提醒日志
   * @param params - 日志参数
   */
  private logRemind(params: LogRemindParams): void;

  /**
   * 查看教学内容
   * @param content - 内容项
   */
  private checkTeaching(content: ContentItem): void;

  /**
   * 关闭提醒
   * @param params - 参数对象
   */
  private closeRemind(params: { key: string }): void;

  /**
   * 获取模块标识
   * @param module - 模块名称
   * @returns 处理后的模块标识
   */
  private getModule(module?: string): string;

  /**
   * 获取环境配置
   * @returns 环境配置对象
   */
  private getEnvConfig(): EnvConfig | undefined;

  /**
   * 模块名称处理
   * @param moduleName - 原始模块名称
   * @returns 处理后的模块名称
   */
  private moduleHandle(moduleName: string): string;

  /**
   * 获取Magic标识
   * @returns Magic字符串
   */
  private getMagic(): string;

  /**
   * 获取域名
   * @returns 域名字符串
   */
  private getDomain(): string;

  /**
   * 注册环境配置
   * @param key - 配置键名
   * @param config - 环境配置对象
   */
  registerEnvConfig(key: string, config: EnvConfig): void;
}