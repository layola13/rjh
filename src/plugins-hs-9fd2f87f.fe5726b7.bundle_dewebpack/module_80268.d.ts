/**
 * EditStatus Plugin Module
 * 提供设计编辑状态管理插件
 */

import { HSApp } from './518193';
import { Handler } from './609051';

/**
 * 编辑状态枚举
 */
export enum EditStatus {
  /** 查看模式 */
  View = 'view',
  /** 编辑模式 */
  Edit = 'edit',
  /** 预览模式 */
  Preview = 'preview'
}

/**
 * 编辑状态管理器接口
 */
export interface IEditStatusManager {
  /** 当前编辑状态 */
  readonly status: EditStatus;
  
  /**
   * 设置编辑状态
   * @param status - 新的编辑状态
   */
  setStatus(status: EditStatus): void;
  
  /**
   * 获取单例实例
   */
  getInstance(): IEditStatusManager;
}

/**
 * 插件激活选项
 */
export interface IPluginActiveOptions {
  /** 应用实例 */
  app: HSApp.IApplication;
  /** 其他配置选项 */
  [key: string]: unknown;
}

/**
 * 模型切换选项
 */
export interface IModelSwitchOptions {
  /** 是否保存当前状态 */
  saveCurrentState?: boolean;
  /** 过渡动画时长(ms) */
  transitionDuration?: number;
  /** 自定义回调 */
  onComplete?: () => void;
  /** 其他配置 */
  [key: string]: unknown;
}

/**
 * 自定义处理器类型
 */
export type CustomizedHandleFunction<T = unknown> = (
  status: EditStatus,
  options?: IModelSwitchOptions
) => T | Promise<T>;

/**
 * 编辑状态插件配置
 */
export interface IEditStatusPluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的插件类型列表 */
  dependencies: string[];
}

/**
 * 编辑状态插件类
 * 负责管理设计器的编辑状态，协调各个相关插件的行为
 */
export declare class EditStatusPlugin extends HSApp.Plugin.IPlugin {
  /** 事件处理器 */
  private _handler: Handler;
  
  /** 编辑状态管理器实例 */
  private _editStatusManager: IEditStatusManager;
  
  /**
   * 构造函数
   * 初始化插件配置和依赖关系
   */
  constructor();
  
  /**
   * 插件激活钩子
   * @param pluginManager - 插件管理器实例
   * @param options - 激活选项
   */
  onActive(
    pluginManager: HSApp.Plugin.IPluginManager,
    options: IPluginActiveOptions
  ): void;
  
  /**
   * 注册自定义处理器
   * @param handlerName - 处理器名称
   * @param handlerFunction - 处理器函数
   */
  registerCustomizedHandle<T = unknown>(
    handlerName: string,
    handlerFunction: CustomizedHandleFunction<T>
  ): void;
  
  /**
   * 设置模型状态
   * @param status - 目标编辑状态
   * @param options - 可选的切换选项
   */
  setModelStatus(
    status: EditStatus,
    options?: IModelSwitchOptions
  ): void;
  
  /**
   * 获取当前模型状态
   * @returns 当前的编辑状态
   */
  getModelStatus(): EditStatus;
}

/**
 * 插件工厂函数类型
 */
export type PluginFactory = () => Promise<void>;

/**
 * 插件注册声明
 * 将EditStatusPlugin注册到HSApp插件系统中
 */
declare module './518193' {
  namespace HSApp.Plugin {
    /**
     * 注册插件
     * @param pluginType - 插件类型标识
     * @param pluginClass - 插件类构造函数
     * @param factory - 插件工厂函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: typeof EditStatusPlugin,
      factory: PluginFactory
    ): void;
  }
  
  namespace HSApp.EditStatus {
    /**
     * 编辑状态管理器
     */
    const EditStatusManager: {
      getInstance(): IEditStatusManager;
    };
  }
}

/**
 * 全局常量：插件类型定义
 */
declare global {
  const HSFPConstants: {
    PluginType: {
      EditStatus: string;
      PageHeader: string;
      Toolbar: string;
      Catalog: string;
      LeftMenu: string;
      PropertyBar: string;
      LayerEdit: string;
      UserInfo: string;
      StatusBar: string;
    };
  };
}