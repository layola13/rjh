/**
 * MyGroup 插件模块
 * 提供保存和重用自定义分组的功能
 */

import { IPlugin } from 'HSApp.Plugin';
import { PluginType } from 'HSFPConstants';

/**
 * 插件初始化配置接口
 */
interface PluginInitConfig {
  /** 应用实例 */
  app: HSApp.Application;
  /** 插件依赖项 */
  dependencies: Record<string, unknown>;
}

/**
 * 插件元数据接口
 */
interface PluginMetadata {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖项列表 */
  dependencies: PluginType[];
}

/**
 * 事件激活参数接口
 */
interface ActivationEvent {
  /** 应用实例 */
  app: HSApp.Application;
}

/**
 * MyGroup 插件处理器接口
 */
interface IMyGroupHandler {
  /**
   * 初始化处理器
   * @param config - 初始化配置
   */
  init(config: PluginInitConfig): void;

  /**
   * 显示编辑分组面板
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   */
  showEditGroupPanel(param1: unknown, param2: unknown): void;

  /**
   * 显示保存分组面板
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   * @returns 保存操作的结果
   */
  showSaveGroupPanel(param1: unknown, param2: unknown, param3: unknown): unknown;

  /**
   * 显示产品重命名对话框
   * @param param - 重命名参数
   */
  showProductRename(param: unknown): void;

  /**
   * 上传分组数据
   * @param data - 分组数据
   */
  uploadGroup(data: unknown): void;

  /**
   * 反初始化处理器
   */
  uninit(): void;
}

/**
 * 分组服务接口
 */
interface IGroupService {
  /**
   * 添加到我的分组
   * @param data - 要添加的数据
   */
  addToMyGroup(data: unknown): void;
}

/**
 * MyGroup 插件类
 * 提供自定义分组的保存、编辑、上传等功能
 */
export declare class MyGroupPlugin extends IPlugin {
  /** 私有处理器实例 */
  private _handler: IMyGroupHandler;

  /**
   * 构造函数
   * 初始化插件元数据和处理器
   */
  constructor();

  /**
   * 插件激活时调用
   * @param event - 激活事件对象
   * @param dependencies - 依赖项映射
   */
  onActive(event: ActivationEvent, dependencies: Record<string, unknown>): void;

  /**
   * 显示编辑分组面板
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   */
  showEditGroupPanel(param1: unknown, param2: unknown): void;

  /**
   * 显示保存分组面板
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   * @returns 保存操作的结果
   */
  showSaveGroupPanel(param1: unknown, param2: unknown, param3: unknown): unknown;

  /**
   * 显示产品重命名对话框
   * @param param - 重命名参数
   */
  showProductRename(param: unknown): void;

  /**
   * 上传分组数据
   * @param data - 要上传的分组数据
   */
  uploadGroup(data: unknown): void;

  /**
   * 插件停用时调用
   * 清理资源和反初始化处理器
   */
  onDeactive(): void;

  /**
   * 添加项目到我的分组
   * @param data - 要添加的数据
   */
  addToMyGroup(data: unknown): void;
}

/**
 * 全局命名空间扩展
 */
declare global {
  namespace HSApp {
    namespace Plugin {
      /**
       * 注册插件到应用
       * @param pluginId - 插件唯一标识符
       * @param pluginClass - 插件类构造函数
       */
      function registerPlugin(pluginId: string, pluginClass: typeof MyGroupPlugin): void;
    }
  }

  namespace HSFPConstants {
    /**
     * 插件类型枚举
     */
    enum PluginType {
      /** 上下文工具插件 */
      ContextualTools = 'ContextualTools',
      /** 目录插件 */
      Catalog = 'Catalog',
      /** 属性栏插件 */
      PropertyBar = 'PropertyBar'
    }
  }
}