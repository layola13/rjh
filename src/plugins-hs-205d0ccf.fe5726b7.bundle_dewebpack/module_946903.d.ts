/**
 * OneKey装饰插件模块
 * 提供智能布局配件功能，用于根据内容生成智能布局装饰
 */

import { IPlugin } from 'HSApp/Plugin';
import { CommandManager } from 'HSApp/CommandManager';
import { CmdSmartLayoutAccessories } from './CmdSmartLayoutAccessories';
import { SmartLayoutAccessoriesHandler } from './SmartLayoutAccessoriesHandler';

/**
 * 插件激活事件参数接口
 */
interface IPluginActiveEvent {
  /** 应用程序实例 */
  app: {
    /** 命令管理器 */
    cmdManager: CommandManager;
  };
}

/**
 * 插件配置接口
 */
interface IPluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖列表 */
  dependencies: string[];
}

/**
 * OneKey装饰插件类
 * 负责智能布局配件的生命周期管理和命令注册
 */
class OneKeyDecorationPlugin extends IPlugin {
  /** 智能布局配件处理器 */
  private _handler?: SmartLayoutAccessoriesHandler;

  /**
   * 构造函数
   * 初始化插件配置信息
   */
  constructor() {
    const config: IPluginConfig = {
      name: 'OneKey Decoration Plugin',
      description: 'Choose content generate smartLayout accessories',
      dependencies: []
    };
    super(config);
  }

  /**
   * 插件激活时的回调方法
   * 注册智能布局配件相关命令并初始化处理器
   * 
   * @param event - 插件激活事件参数
   */
  public onActive(event: IPluginActiveEvent): void {
    // 注册智能布局配件命令
    event.app.cmdManager.register([
      [HSFPConstants.CommandType.CmdSmartLayoutAccessories, CmdSmartLayoutAccessories]
    ]);

    // 初始化智能布局配件处理器
    this._handler = new SmartLayoutAccessoriesHandler();
  }

  /**
   * 启动智能布局处理流程
   * 
   * @param layoutData - 布局数据
   * @param options - 可选配置参数，默认为空字符串
   */
  public startSmartLayoutProcess(layoutData: unknown, options: string = ''): void {
    this._handler?.startSmartLayoutProcess(layoutData, options);
  }
}

/**
 * 注册OneKey装饰插件到全局插件系统
 */
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.SmartLayoutAccessories,
  OneKeyDecorationPlugin
);

/**
 * 导出插件类供外部使用
 */
export default OneKeyDecorationPlugin;