import { HSApp } from './hs-app';
import { App } from './app';

declare namespace HSApp.Plugin {
  /**
   * T3dCapture插件配置接口
   */
  interface IT3dCapturePluginConfig {
    /** 插件名称 */
    name: string;
    /** 插件描述 */
    description: string;
    /** 插件依赖列表 */
    dependencies: string[];
  }

  /**
   * T3dCapture插件类
   * 用于WebT3D离屏渲染捕获功能
   * @extends {HSApp.Plugin.IPlugin}
   */
  class T3dCapturePlugin extends HSApp.Plugin.IPlugin {
    /**
     * T3D捕获实例
     * @private
     */
    private _capture: HSApp.View.T3d.Render.T3dCapture | null;

    /**
     * 构造函数
     * 初始化T3dCapture插件
     */
    constructor();

    /**
     * 插件激活时的回调
     * @param arg1 - 激活参数1
     * @param arg2 - 激活参数2
     */
    onActive(arg1: unknown, arg2: unknown): void;

    /**
     * 更新捕获状态
     * @param param1 - 更新参数1
     * @param param2 - 更新参数2
     * @param param3 - 更新参数3
     * @param param4 - 更新参数4
     * @param param5 - 更新参数5
     * @param param6 - 更新参数6
     * @param param7 - 更新参数7
     * @param param8 - 更新参数8
     */
    update(
      param1: unknown,
      param2: unknown,
      param3: unknown,
      param4: unknown,
      param5: unknown,
      param6: unknown,
      param7: unknown,
      param8: unknown
    ): void;

    /**
     * 完成捕获并清理资源
     */
    finish(): void;
  }
}

declare namespace HSApp.View.T3d.Render {
  /**
   * T3D渲染捕获类
   * 负责离屏渲染的具体实现
   */
  class T3dCapture {
    /**
     * 构造函数
     * @param appInstance - 应用实例
     */
    constructor(appInstance: typeof App.Instance);

    /**
     * 更新捕获参数
     * @param param1 - 更新参数1
     * @param param2 - 更新参数2
     * @param param3 - 更新参数3
     * @param param4 - 更新参数4
     * @param param5 - 更新参数5
     * @param param6 - 更新参数6
     * @param param7 - 更新参数7
     * @param param8 - 更新参数8
     */
    update(
      param1: unknown,
      param2: unknown,
      param3: unknown,
      param4: unknown,
      param5: unknown,
      param6: unknown,
      param7: unknown,
      param8: unknown
    ): void;

    /**
     * 完成捕获
     */
    finish(): void;
  }
}

declare namespace HSApp.Plugin {
  /**
   * 注册插件到插件系统
   * @param pluginType - 插件类型标识
   * @param pluginClass - 插件类构造函数
   */
  function registerPlugin(
    pluginType: HSFPConstants.PluginType,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** T3D捕获插件类型 */
    T3dCapture = 'T3dCapture'
  }
}

declare namespace App {
  /**
   * 应用单例实例
   */
  const Instance: any;
}