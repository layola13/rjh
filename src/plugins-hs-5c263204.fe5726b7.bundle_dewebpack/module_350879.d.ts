/**
 * 首次打开户型图Web插件的TypeScript类型定义
 * 
 * 该插件负责处理用户登录、权限校验、会员信息等核心功能
 * 依赖于SignIn和Welcome插件
 */

declare namespace HSApp.Plugin {
  /**
   * 插件依赖配置
   */
  interface PluginDependency {
    /** 插件名称 */
    name: string;
    /** 插件描述 */
    description: string;
    /** 依赖的其他插件类型 */
    dependencies: string[];
  }

  /**
   * 应用参数配置
   */
  interface AppParams {
    /** 业务类型标识 */
    biz: string;
  }

  /**
   * 应用实例接口
   */
  interface App {
    /** 应用参数 */
    appParams: AppParams;
    /** 插件管理器 */
    pluginManager: PluginManager;
    /** 快捷键管理器 */
    hotkey: {
      /** 启用指定快捷键 */
      enable(key: string): void;
    };
  }

  /**
   * 插件管理器接口
   */
  interface PluginManager {
    /**
     * 根据类型获取插件实例
     * @param pluginType 插件类型
     */
    getPlugin(pluginType: string): IPlugin | undefined;
  }

  /**
   * 登录信号接口
   */
  interface LoginSignal {
    /**
     * 监听信号
     * @param handler 处理函数
     */
    listen(handler: () => void): void;
    
    /**
     * 取消监听
     * @param handler 处理函数
     */
    unlisten(handler: () => void): void;
  }

  /**
   * 登录插件接口
   */
  interface SignInPlugin extends IPlugin {
    /** 登录相关信号 */
    signals: {
      /** 登录成功信号 */
      signalSigninSucceeded: LoginSignal;
    };
  }

  /**
   * 欢迎页插件接口
   */
  interface WelcomePlugin extends IPlugin {
    /** 恢复插件运行 */
    resume(): void;
    /** 暂停插件运行 */
    pause(): void;
  }

  /**
   * 引导插件接口
   */
  interface GuidePlugin extends IPlugin {
    /**
     * 判断是否为新用户
     * @returns 是否为新用户
     */
    isNewbie(): boolean;
  }

  /**
   * 登录完成事件数据
   */
  interface LoginCompletedEventData {
    /** 是否已登录 */
    isLogin: boolean;
  }

  /**
   * 登录完成事件
   */
  interface LoginCompletedEvent {
    data: LoginCompletedEventData;
  }

  /**
   * 用户权限检查结果
   */
  interface UserRightsResult {
    /** 是否有权限 */
    hasPermission: boolean;
    /** 权限详情 */
    details?: unknown;
  }

  /**
   * 用户会员信息
   */
  interface MembershipInfo {
    /** 会员等级 */
    level?: string;
    /** 到期时间 */
    expireTime?: number;
    /** 其他会员信息 */
    [key: string]: unknown;
  }

  /**
   * 首次登录插件类
   * 
   * 主要功能：
   * - 处理用户首次登录流程
   * - 管理登录状态和权限
   * - 协调SignIn和Welcome插件
   */
  class FirstLoginPlugin extends IPlugin {
    /**
     * 登录插件实例引用
     * @private
     */
    private _signinPlugin?: SignInPlugin;

    /**
     * 欢迎页插件实例引用
     * @private
     */
    private _welcomePlugin?: WelcomePlugin;

    /**
     * 登录成功信号
     * @private
     */
    private _loginsignal?: LoginSignal;

    /**
     * 查看器关闭信号
     */
    signalViewerClosed?: HSCore.Util.Signal<FirstLoginPlugin>;

    /**
     * 插件激活时的回调
     * @param app 应用实例
     * @param dependencies 依赖的插件映射表
     */
    onActive(app: { app: App }, dependencies: Record<string, IPlugin>): void;

    /**
     * 插件停用时的回调
     */
    onDeactive(): void;

    /**
     * 初始化插件
     * 注册登录成功事件监听
     */
    init(): void;

    /**
     * 权限检查完成信号
     */
    get signalCheckPermissionsCompleted(): HSCore.Util.Signal<unknown>;

    /**
     * 白标设置信号
     */
    get signalWhiteLabelSetting(): HSCore.Util.Signal<unknown>;

    /**
     * Sparkpic权限完成信号
     */
    get signalSparkpicPermissionCompleted(): HSCore.Util.Signal<unknown>;

    /**
     * 渲染等级设置信号
     */
    get signalRenderGradeSetting(): HSCore.Util.Signal<unknown>;

    /**
     * 用户权限检查完成信号
     */
    get signalUserRightsCompleted(): HSCore.Util.Signal<unknown>;

    /**
     * 用户会员信息完成信号
     */
    get signalUserMemberShipCompleted(): HSCore.Util.Signal<unknown>;

    /**
     * 检查进入权限
     * @param rightType 权限类型
     * @param showPrompt 是否显示提示，默认true
     * @returns 是否有权限
     */
    checkEnterRights(rightType: string, showPrompt?: boolean): boolean;

    /**
     * 支付试用费用
     * @param trialInfo 试用信息
     * @returns 支付结果
     */
    payTrialCost(trialInfo: unknown): Promise<unknown>;

    /**
     * 获取会员信息
     */
    getMemberInfo(): void;

    /**
     * 获取用户权益
     */
    getUserEquity(): void;

    /**
     * 获取用户福利V2版本
     */
    getUserBenefitsV2(): void;

    /**
     * 获取用户身份信息
     * @returns 用户身份数据
     */
    getUserIdentity(): Promise<unknown>;
  }

  /**
   * 注册插件到全局命名空间
   * @param pluginName 插件完整名称
   * @param pluginClass 插件类构造函数
   */
  function registerPlugin(
    pluginName: string,
    pluginClass: new () => IPlugin
  ): void;
}

/**
 * 全局用户对象扩展
 */
declare const adskUser: {
  /** 登录成功事件名 */
  EVENT_LOGIN_SUCCESS: string;
  
  /** EZHome用户实例 */
  ezhomeUser: unknown;
  
  /**
   * 打开登录窗口
   */
  openLoginWindow(): void;
};

/**
 * HSFPConstants常量定义
 */
declare namespace HSFPConstants {
  /** 插件类型枚举 */
  enum PluginType {
    /** 登录插件 */
    SignIn = "SignIn",
    /** 欢迎页插件 */
    Welcome = "Welcome",
    /** 引导插件 */
    Guide = "Guide"
  }
}

/**
 * HSCore核心库
 */
declare namespace HSCore.Util {
  /**
   * 信号类，用于事件通知
   */
  class Signal<T = void> {
    /**
     * 构造函数
     * @param context 信号上下文
     */
    constructor(context: unknown);

    /**
     * 监听信号
     * @param handler 处理函数
     * @param context 执行上下文
     */
    listen(handler: (data: T) => void, context?: unknown): void;

    /**
     * 取消监听
     * @param handler 处理函数
     * @param context 执行上下文
     */
    unlisten(handler: (data: T) => void, context?: unknown): void;
  }
}

/**
 * HSApp核心应用命名空间
 */
declare namespace HSApp {
  /** 应用类 */
  class App {
    /**
     * 获取应用单例
     */
    static getApp(): HSApp.Plugin.App;
  }

  /** 工具类命名空间 */
  namespace Util {
    /** URL工具 */
    class Url {
      /**
       * 获取URL查询参数
       */
      static getQueryStrings(): Record<string, string>;
    }
  }

  /** 配置命名空间 */
  namespace Config {
    /** 当前环境（dev/prod等） */
    const ENV: string;
  }
}

/**
 * NWTK网络请求库
 */
declare namespace NWTK {
  /** Ajax请求 */
  namespace ajax {
    /**
     * 注册错误处理器
     * @param handler 错误处理函数
     */
    function registerErrorHandler(
      handler: (error: { status: number }) => void
    ): void;
  }

  /** Mtop请求 */
  namespace mtop {
    /**
     * 注册错误处理器
     * @param handler 错误处理函数
     */
    function registerErrorHandler(handler: () => void): void;
  }
}