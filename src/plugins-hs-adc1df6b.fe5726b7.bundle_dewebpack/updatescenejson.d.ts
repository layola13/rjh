/**
 * 更新场景JSON数据到OSS的命令类
 * @module UpdateSceneJson
 */

/**
 * 执行结果状态
 */
type ExecuteStatus = 'success' | 'error';

/**
 * 执行方法的返回结果
 */
interface ExecuteResult {
  /** 执行状态 */
  status: ExecuteStatus;
  /** 错误时的响应数据（可选） */
  res?: unknown;
}

/**
 * 场景JSON URL响应数据
 */
interface SceneJsonUrlResponse {
  data?: {
    /** ACL授权的上传URL */
    aclUrl?: string;
  };
}

/**
 * 上传场景数据的配置选项
 */
interface UploadSceneDataOptions {
  oss: {
    headers: {
      /** OSS对象访问控制 */
      'x-oss-object-acl': string;
      /** 内容类型 */
      'Content-Type': string;
    };
  };
}

/**
 * 渲染插件处理器接口
 */
interface RenderPluginHandler {
  /**
   * 上传场景数据到OSS
   * @param url - 上传目标URL
   * @param options - 上传配置选项
   */
  uploadSceneData(url: string, options: UploadSceneDataOptions): Promise<void>;
}

/**
 * 渲染插件接口
 */
interface RenderPlugin {
  /**
   * 获取插件处理器
   */
  getHandler(): RenderPluginHandler;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定插件实例
   * @param pluginId - 插件ID
   */
  getPlugin(pluginId: 'hsw.plugin.render.Plugin'): RenderPlugin;
}

/**
 * 设计元数据管理器接口
 */
interface DesignMetadata {
  /**
   * 获取设计元数据
   * @param key - 元数据键名
   */
  get(key: 'designId'): string;
}

/**
 * 应用程序实例接口
 */
interface AppInstance {
  /** 插件管理器 */
  pluginManager: PluginManager;
  /** 设计元数据 */
  designMetadata: DesignMetadata;
}

/**
 * 全局应用程序对象
 */
declare global {
  const HSApp: {
    App: {
      /**
       * 获取应用程序实例
       */
      getApp(): AppInstance;
    };
  };

  const NWTK: {
    mtop: {
      Design: {
        /**
         * 获取场景JSON上传URL
         * @param params - 请求参数
         */
        sceneJsonUrl(params: {
          data: { designId: string };
        }): Promise<SceneJsonUrlResponse>;
      };
    };
  };
}

/**
 * 更新场景JSON数据命令类
 * 负责将场景数据上传到OSS存储
 */
export declare class UpdateSceneJson {
  /**
   * 执行更新场景JSON的命令
   * @param _arg1 - 未使用的参数1
   * @param _arg2 - 未使用的参数2
   * @returns 执行结果
   */
  execute(_arg1: unknown, _arg2: unknown): Promise<ExecuteResult>;

  /**
   * 更新JSON数据的内部实现
   * @returns 执行结果
   * @throws 当获取上传URL失败或上传失败时
   * @internal
   */
  updateJson(): Promise<ExecuteResult>;
}