/**
 * 任务处理器模块
 * 负责管理和执行各种任务配置，处理任务生命周期
 */

import { TaskConfig } from './TaskConfig';
import { TaskTemplate } from './TaskTemplate';

/**
 * 任务处理器类
 * 管理任务配置的加载、初始化和执行
 */
export declare class TaskHander {
  /**
   * 任务配置映射表
   * Key: 任务代码(taskcode)
   * Value: 任务配置对象
   * @private
   */
  private _config: Map<string, TaskConfig>;

  /**
   * 配置加载完成信号
   * 当任务配置加载完成时触发
   */
  configReadySignal: HSCore.Util.Signal;

  /**
   * 文档是否已打开标志
   * @private
   */
  private _documentOpened: boolean;

  /**
   * 配置是否已就绪标志
   * @private
   */
  private _configReady: boolean;

  /**
   * 构造函数
   * 初始化任务处理器，加载配置（仅在租户为"fp"时）
   */
  constructor();

  /**
   * 获取任务配置映射表
   * @returns 所有任务配置的Map集合
   */
  get config(): Map<string, TaskConfig>;

  /**
   * 获取默认任务配置
   * 从URL查询参数中读取taskcode并返回对应配置
   * @returns 默认任务配置对象，如果未找到则返回null
   */
  getDefaultTaskConfig(): TaskConfig | null;

  /**
   * 根据任务代码获取任务配置
   * @param taskCode - 任务代码标识符
   * @returns 对应的任务配置对象，如果不存在则返回undefined
   */
  getTaskConfig(taskCode: string): TaskConfig | undefined;

  /**
   * 初始化任务处理器
   * 检查任务合法性，禁用欢迎页面，监听文档打开事件
   */
  init(): void;

  /**
   * 禁用欢迎页面和引导功能
   * 当URL中存在taskcode参数时，隐藏欢迎界面、演练和引导系统
   * @private
   */
  private _disableWelcome(): void;

  /**
   * 处理DOM相关操作
   * 当配置就绪且文档已打开时，根据taskcode显示相应的欢迎页面
   * @private
   */
  private _handleDom(): void;

  /**
   * 获取目标任务模板
   * 从URL查询参数获取taskcode，并在TaskTemplate中查找匹配项
   * @returns 匹配的任务模板对象，如果未找到则返回undefined
   * @private
   */
  private _getTargetTask(): TaskTemplate | undefined;

  /**
   * 加载任务中心
   * 执行目标任务的预加载、加载和提示显示流程
   */
  loadTaskCenter(): void;

  /**
   * 执行下一步操作
   * 调用目标任务的nextStep方法
   * @param stepData - 传递给下一步的数据参数
   */
  nextStep(stepData: unknown): void;
}

/**
 * HSCore命名空间声明
 */
declare namespace HSCore {
  namespace Util {
    /**
     * 信号类，用于事件通知
     */
    class Signal {
      /**
       * 触发信号
       * @param args - 传递给监听器的参数
       */
      dispatch(...args: unknown[]): void;

      /**
       * 监听信号
       * @param callback - 信号触发时的回调函数
       */
      listen(callback: (...args: unknown[]) => void): void;
    }
  }
}

/**
 * HSApp命名空间声明
 */
declare namespace HSApp {
  namespace Config {
    /**
     * 租户标识符
     */
    const TENANT: string;
  }

  namespace Util {
    namespace Url {
      /**
       * 获取URL查询字符串参数
       * @returns 包含查询参数的键值对对象
       */
      function getQueryStrings(): Record<string, string>;
    }
  }

  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): AppInstance;
  }
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /**
   * 插件管理器
   */
  pluginManager: PluginManager;

  /**
   * 文档打开信号
   */
  signalDocumentOpened: HSCore.Util.Signal;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件
   * @param pluginType - 插件类型
   */
  getPlugin(pluginType: string): Plugin;
}

/**
 * 插件接口
 */
interface Plugin {
  /**
   * 设置是否显示欢迎页面
   * @param show - 是否显示
   */
  setShowWelcome(show: boolean): void;

  /**
   * 显示欢迎页面
   */
  showWelcome(): void;

  /**
   * 禁用演练功能
   */
  disableWalkthrough(): void;

  /**
   * 引导处理器
   */
  handler?: {
    /**
     * 设置是否禁用引导
     * @param disable - 是否禁用
     */
    setDisableGuide(disable: boolean): void;
  };
}

/**
 * HSFPConstants命名空间
 */
declare namespace HSFPConstants {
  namespace PluginType {
    const Welcome: string;
    const Guide: string;
  }
}