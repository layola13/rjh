/**
 * 桌面客户端下载入口管理插件
 * 负责管理客户端下载提示的显示/隐藏，监听登录状态，处理桌面端IPC通信
 */
declare module 'module_370585' {
  import { HSCore } from '635589';
  import CrashMonitor from '128513';
  import DownloadEntryComponent from '349515';

  /**
   * 应用程序实例接口
   */
  interface App {
    /** 插件管理器 */
    pluginManager: PluginManager;
    /** 当前激活的环境ID */
    activeEnvironmentId: string;
    /** 错误日志记录器 */
    errorLogger: ErrorLogger;
    /** 应用参数 */
    appParams: AppParams;
    /** 应用准备就绪信号 */
    signalAppReady: Signal;
  }

  /**
   * 插件管理器接口
   */
  interface PluginManager {
    /**
     * 获取指定类型的插件实例
     * @param pluginType 插件类型
     */
    getPlugin(pluginType: string): Plugin;
  }

  /**
   * 插件基础接口
   */
  interface Plugin {
    /** 插件信号集合 */
    signals: {
      /** 登录成功信号 */
      signalSigninSucceeded: Signal;
    };
  }

  /**
   * 信号对象接口
   */
  interface Signal {
    // Signal implementation details
  }

  /**
   * 错误日志记录器接口
   */
  interface ErrorLogger {
    /**
     * 推送错误日志
     * @param message 错误消息
     * @param details 错误详情
     */
    push(message: string, details: ErrorDetails): void;
  }

  /**
   * 错误详情接口
   */
  interface ErrorDetails {
    /** 错误堆栈 */
    errorStack: Error;
    /** 错误描述 */
    description: string;
    /** 错误附加信息 */
    errorInfo: {
      /** 错误原始信息 */
      info: unknown;
      /** 错误路径信息 */
      path: {
        /** 文件路径 */
        file: string;
        /** 函数名称 */
        functionName: string;
      };
    };
  }

  /**
   * 应用参数接口
   */
  interface AppParams {
    /** 页面ID */
    pageId: string;
  }

  /**
   * 初始化参数接口
   */
  interface InitParams {
    /** 应用实例 */
    app: App;
  }

  /**
   * Electron IPC渲染进程接口
   */
  interface ElectronIpcRenderer {
    /**
     * 发送IPC消息到主进程
     * @param channel 消息通道
     * @param data 消息数据
     */
    send(channel: string, data: Record<string, unknown>): void;
  }

  /**
   * Electron Remote模块接口
   */
  interface ElectronRemote {
    /**
     * 获取当前WebContents实例
     */
    getCurrentWebContents(): {
      /** WebContents ID */
      id: number;
    };
  }

  /**
   * Electron全局对象接口
   */
  interface ElectronAPI {
    /** IPC渲染进程通信 */
    ipcRenderer: ElectronIpcRenderer;
    /** Remote模块 */
    remote: ElectronRemote;
  }

  /**
   * 扩展Window接口，添加桌面客户端相关属性
   */
  declare global {
    interface Window {
      /** Electron API（仅在桌面客户端环境可用） */
      electron?: ElectronAPI;
    }
  }

  /**
   * 客户端下载入口处理类
   * 管理桌面客户端下载提示UI的显示逻辑，监听应用状态变化
   */
  export default class ClientDownloadHandler {
    /** 应用实例引用 */
    app: App | undefined;

    /** 下载入口是否已显示 */
    isDownloadEntryShown: boolean;

    /**
     * 初始化插件
     * @param params 初始化参数，包含应用实例
     */
    init(params: InitParams): void;

    /**
     * 显示客户端下载入口UI
     * 在DOM中创建或显示下载容器，渲染React组件
     */
    showDownloadEntry(): void;

    /**
     * 隐藏客户端下载入口UI
     */
    hideDownloadEntry(): void;

    /**
     * 检查并决定是否显示下载入口
     * 根据环境、租户、用户类型等条件判断
     */
    checkDownloadDisplay(): void;

    /**
     * 判断当前是否运行在桌面客户端环境
     * @returns 如果window.electron存在则返回true
     */
    isDesktopClient(): boolean;

    /**
     * 登录状态变化回调（私有方法）
     * 通过IPC通知主进程登录成功
     */
    private _onSignInStatusChanged(): void;

    /**
     * Web应用准备就绪信号回调（私有方法）
     * 向主进程发送页面ID和WebContents ID
     */
    private _onSignalWebAppReady(): void;

    /**
     * 监控应用崩溃（私有方法）
     * @param app 应用实例
     */
    private _monitorCrash(app: App): void;
  }
}