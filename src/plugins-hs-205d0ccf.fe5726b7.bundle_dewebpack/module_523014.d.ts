/**
 * 原始设计编辑插件模块
 * @module OriginDesignPlugin
 */

/** 
 * 保存扩展响应数据项 
 */
interface SaveExtendDataItem {
  /** 回调函数 */
  callback?: () => void;
}

/**
 * 保存扩展响应结果
 */
interface SaveExtendResponse {
  /** 响应状态 */
  responseStatus: HSApp.Interface.ServiceExtend.ResponseStatus;
  /** 数据列表 */
  dataList: SaveExtendDataItem[];
}

/**
 * 进入编辑原始设计的环境参数
 */
interface EditOriginEnvironmentOptions {
  /** 原始配件资源ID */
  originalAccessoryAssetId: string;
  /** 之前的资源ID */
  preAssetId: string;
  /** 之前的环境ID */
  preEnvironmentId: string;
  /** 退出环境的回调函数 */
  escEnvironment: () => void;
  /** 执行保存原始设计扩展 */
  executeSaveOriginExtend: (
    assetId: string,
    onSuccess: () => void,
    onCancel?: () => void
  ) => void;
}

/**
 * 加载设计响应数据
 */
interface LoadDesignResponse {
  /** 设计数据 (JSON字符串) */
  data: string;
  /** 其他元数据 */
  [key: string]: unknown;
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  /** 结束事务 */
  end(): void;
}

/**
 * 原始设计编辑插件类
 * 提供原始设计的编辑、保存和管理功能
 */
export default class OriginDesignPlugin {
  /** 应用程序实例 */
  private readonly _app: HSApp.App;

  /** 工具栏实例 */
  readonly toolbar: Toolbar;

  /** 信号钩子 */
  private readonly _signalHook: HSCore.Util.SignalHook;

  /**
   * 构造函数
   * @param config - 插件配置对象,包含工具栏等配置
   */
  constructor(config: Record<string, unknown>);

  /**
   * 初始化插件
   * 注册命令并注入默认工具栏
   */
  init(): void;

  /**
   * 注册命令
   * 注册保存原始设计命令到命令管理器
   */
  registerCommands(): void;

  /**
   * 保存原始设计项点击事件处理
   * 检查是否存在原始配件资源ID,如果存在则执行扩展保存流程,否则直接保存
   */
  onSaveOriginDesignItemClicked(): Promise<void>;

  /**
   * 执行保存原始设计扩展流程
   * @param assetId - 资源ID
   * @param onSuccess - 成功回调函数
   * @param onCancel - 取消回调函数(可选)
   */
  executeSaveOriginExtend(
    assetId: string,
    onSuccess: () => void,
    onCancel?: () => void
  ): void;

  /**
   * 保存原始设计
   * 如果设计ID不存在,则提示用户确保已保存;否则执行保存操作
   */
  saveOriginDesign(): void;

  /**
   * 编辑原始设计项点击事件处理
   * 检查原始配件资源ID,如果不存在则提示需要先保存;否则进入编辑模式
   */
  onEditOriginDesignItemClicked(): void;

  /**
   * 退出编辑原始设计模式
   * @param floorplan - 要切换到的楼层平面图实例
   */
  exitEditOriginDesign(floorplan: HSApp.Floorplan): void;

  /**
   * 进入编辑原始设计模式
   * @param assetId - 原始配件资源ID
   */
  intoEditOriginDesign(assetId: string): Promise<void>;

  /**
   * 打开原始配件
   * @param assetId - 配件资源ID
   * @returns 返回加载完成的Promise
   */
  openOriginalAccessory(assetId: string): Promise<HSApp.Floorplan>;

  /**
   * 从服务器加载设计
   * @param assetId - 资源ID
   * @param sessionId - 会话ID
   * @returns 返回加载完成的Promise,包含楼层平面图实例
   */
  loadDesignFromServer(
    assetId: string,
    sessionId: string
  ): Promise<HSApp.Floorplan>;

  /**
   * 获取原始配件资源ID
   * @returns 返回原始配件资源ID,如果不存在返回undefined
   */
  getOriginalAccessoryAssetId(): string | undefined;

  /**
   * 执行保存操作(内部方法)
   * 创建并执行保存原始设计命令
   * @private
   */
  private _doSave(): void;
}

/**
 * 工具栏类(假设定义,基于导入的s.default)
 */
declare class Toolbar {
  /**
   * 构造工具栏
   * @param plugin - 插件实例
   * @param config - 工具栏配置
   */
  constructor(plugin: OriginDesignPlugin, config: unknown);

  /**
   * 注入默认工具栏
   */
  injectDefaultToolbar(): void;
}

/**
 * 命令名称常量
 */
declare const CmdSaveOriginDesignName: string;

/**
 * 保存原始设计命令类
 */
declare const CmdSaveOriginDesign: new () => HSApp.Command;

/**
 * 执行保存原始设计扩展工具函数
 * @param assetId - 资源ID
 * @returns 返回Promise,包含响应结果
 */
declare function executeSaveOriginExtend(
  assetId: string
): Promise<SaveExtendResponse>;

/**
 * 全局常量定义
 */
declare namespace HSFPConstants {
  /** 插件类型枚举 */
  enum PluginType {
    Toolbar = "Toolbar"
  }

  /** 环境类型枚举 */
  enum Environment {
    EditOriginDesign = "EditOriginDesign"
  }
}

/**
 * HSApp应用命名空间(全局扩展)
 */
declare namespace HSApp {
  /** 应用程序主类 */
  class App {
    /** 命令管理器 */
    cmdManager: CommandManager;
    /** 设计元数据 */
    designMetadata: Metadata;
    /** 插件管理器 */
    pluginManager: PluginManager;
    /** 当前活跃的楼层平面图 */
    floorplan: Floorplan;
    /** 应用参数 */
    appParams: AppParams;
    /** 当前活跃环境ID */
    activeEnvironmentId: string;
    /** 楼层平面图是否有未保存更改 */
    isFloorplanDirty: boolean;
    /** 文档管理器 */
    docManager: DocumentManager;
    /** 事务管理器 */
    transManager: TransactionManager;

    /** 获取应用实例 */
    static getApp(): App;

    /** 注册环境 */
    registerEnvironment(id: string, environment: unknown): void;

    /** 激活环境 */
    activateEnvironment(
      id: string,
      options: EditOriginEnvironmentOptions
    ): void;

    /** 设置活跃楼层平面图 */
    setActiveFloorplan(floorplan: Floorplan, dirty: boolean): Promise<void>;
  }

  /** 命令管理器 */
  interface CommandManager {
    /** 注册命令 */
    register(name: string, commandClass: new () => Command): void;
    /** 创建命令实例 */
    createCommand(name: string): Command;
    /** 执行命令 */
    execute(command: Command): void;
    /** 取消当前命令 */
    cancel(): void;
  }

  /** 命令基类 */
  interface Command {}

  /** 楼层平面图 */
  interface Floorplan {
    /** 设计元数据 */
    designMetadata: Metadata;
  }

  /** 元数据类 */
  interface Metadata {
    /** 获取元数据值 */
    get(key: string): unknown;
    /** 从对象设置元数据 */
    fromObject(obj: unknown): void;
    /** 转换为对象 */
    toObject(): Record<string, unknown>;
  }

  /** 插件管理器 */
  interface PluginManager {
    /** 获取插件实例 */
    getPlugin(name: string): unknown;
  }

  /** 应用参数 */
  interface AppParams {
    /** 资源ID */
    assetId: string;
  }

  /** 文档管理器 */
  interface DocumentManager {
    /** 创建新文档 */
    newDocument(
      data: unknown,
      metadata: Record<string, unknown>,
      assetId: string,
      isDirty: boolean
    ): Promise<{ floorplan: Floorplan }>;
  }

  /** 事务管理器 */
  interface TransactionManager {
    /** 开始事务会话 */
    startSession(): TransactionSession;
  }

  /** IO请求命名空间 */
  namespace Io.Request.Design {
    /**
     * 从服务器加载设计
     * @param assetId - 资源ID
     * @param sessionId - 会话ID
     */
    function loadDesign(
      assetId: string,
      sessionId: string
    ): Promise<LoadDesignResponse>;
  }

  /** 接口命名空间 */
  namespace Interface.ServiceExtend {
    /** 响应状态枚举 */
    enum ResponseStatus {
      Cancel = "Cancel",
      None = "None"
    }
  }
}

/**
 * HSCore核心命名空间
 */
declare namespace HSCore {
  /** 文档命名空间 */
  namespace Doc {
    /** 元数据类 */
    class Metadata {
      /**
       * 获取设计元数据
       * @param assetId - 资源ID
       * @param response - 响应数据
       */
      static getDesignMeta(
        assetId: string,
        response: LoadDesignResponse
      ): Record<string, unknown>;

      /** 从对象设置 */
      fromObject(obj: unknown): void;
      /** 转换为对象 */
      toObject(): Record<string, unknown>;
    }
  }

  /** 工具命名空间 */
  namespace Util {
    /** 信号钩子类 */
    class SignalHook {
      constructor(owner: unknown);
    }
  }
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 字符串键
   */
  function getString(key: string): string;
}

/**
 * 消息框
 */
declare namespace MessageBox {
  /**
   * 创建消息框
   * @param content - 内容
   * @param buttons - 按钮文本数组
   * @param defaultButton - 默认按钮索引
   * @param options - 选项配置
   */
  function create(
    content: string,
    buttons: string[],
    defaultButton: number,
    options: {
      title: string;
      disablemask: boolean;
    }
  ): MessageBoxInstance;
}

/**
 * 消息框实例
 */
interface MessageBoxInstance {
  /**
   * 显示消息框
   * @param callback - 点击按钮回调,参数为按钮索引
   * @param options - 显示选项
   */
  show(
    callback: (buttonIndex: number) => void,
    options: { closeByOkButton: boolean }
  ): void;

  /**
   * 关闭消息框
   */
  close(): Promise<void>;
}

/**
 * 实时提示
 */
declare namespace LiveHint {
  /** 状态枚举 */
  const statusEnum: {
    warning: string;
    loading: string;
  };

  /**
   * 显示提示
   * @param message - 提示消息
   * @param duration - 持续时间(毫秒)
   * @param position - 位置(可选)
   * @param options - 选项配置
   */
  function show(
    message: string,
    duration?: number,
    position?: unknown,
    options?: { status: string }
  ): void;

  /**
   * 隐藏提示
   */
  function hide(): void;
}

/**
 * 用户信息
 */
declare const adskUser: {
  /** 会话ID */
  sid: string;
};