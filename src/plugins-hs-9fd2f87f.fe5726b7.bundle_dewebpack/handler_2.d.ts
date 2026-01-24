/**
 * 应急通知处理器
 * 负责监听、控制和显示系统级应急通知
 */
export class Handler {
  /**
   * React 渲染根节点
   */
  root?: HTMLElement;

  /**
   * 监听的消息类型标识
   */
  readonly messageType: 'UNIT_NOTICE';

  /**
   * 当前接收到的应急通知消息
   */
  currentMessage?: EmergencyNoticeMessage;

  /**
   * 应用实例引用
   */
  app?: HSApp;

  /**
   * 本地存储实例，用于记录已读通知
   */
  readonly storage: HSApp.Util.Storage;

  /**
   * 存储 WebSocket ID 的键名
   */
  readonly storageKey: 'WEBSOCKET_ID';

  /**
   * 初始化处理器
   * @param app - 应用实例
   * @param plugins - 插件映射对象
   */
  init(app: HSApp, plugins: PluginMap): void;

  /**
   * 从服务端获取应急通知数据
   * @returns 返回通知数据的 Promise
   */
  getEmergencyNotice(): Promise<EmergencyNoticeMessage>;

  /**
   * 用户登录完成回调
   * @param event - 登录事件对象
   */
  logged(event: LoginEvent): void;

  /**
   * 环境切换事件回调
   * @param event - 环境变更事件
   */
  onActiveEnvironmentChanged(event: EnvironmentChangeEvent): void;

  /**
   * 控制通知显示/隐藏逻辑
   * @param environmentId - 当前环境 ID，默认使用 app.activeEnvironmentId
   */
  controlNotice(environmentId?: string): void;

  /**
   * 检查当前环境是否匹配通知的目标环境列表
   * @param currentEnv - 当前环境 ID
   * @param targetEnvs - 目标环境列表
   * @returns 是否匹配
   */
  checkEnv(currentEnv: string, targetEnvs: string[]): boolean;

  /**
   * 检查当前域名是否匹配通知的目标域名列表
   * @param domains - 目标域名列表
   * @returns 是否匹配
   */
  checkDomain(domains: string[]): boolean;

  /**
   * 显示应急通知 UI
   * @param data - 通知展示数据
   */
  showNotice(data: EmergencyNoticeData): void;

  /**
   * 隐藏应急通知 UI
   */
  hideNotice(): void;

  /**
   * 关闭通知按钮点击回调
   * 将通知 ID 存入本地存储并隐藏通知
   */
  handleClose(): void;

  /**
   * 消息监听回调
   * @param message - 接收到的应急通知消息
   */
  listenMessage(message: EmergencyNoticeMessage): void;
}

/**
 * 应急通知消息完整结构
 */
interface EmergencyNoticeMessage {
  /** 通知唯一标识 */
  id: number;
  /** 通知状态（online/offline 等） */
  status: string;
  /** 目标环境列表 */
  envList: string[];
  /** 目标域名列表 */
  domains: string[];
  /** 目标版本列表（可选） */
  versions?: string[];
  /** 通知标题 */
  title: string;
  /** 通知内容 */
  message: string;
  /** 详情链接 */
  detailsUrl: string;
}

/**
 * 通知展示数据（精简版）
 */
interface EmergencyNoticeData {
  /** 通知标题 */
  title: string;
  /** 通知内容 */
  message: string;
  /** 详情链接 */
  detailsUrl: string;
}

/**
 * 插件映射表
 */
interface PluginMap {
  [HSFPConstants.PluginType.MessageCenter]: MessageCenterPlugin;
  [key: string]: unknown;
}

/**
 * 消息中心插件接口
 */
interface MessageCenterPlugin {
  /**
   * 监听指定类型的消息
   * @param messageType - 消息类型
   * @param callback - 消息回调函数
   */
  listen(messageType: string, callback: (message: EmergencyNoticeMessage) => void): void;
}

/**
 * 应用实例接口
 */
interface HSApp {
  /** 当前激活的环境 ID */
  activeEnvironmentId: string;
  /** 环境激活信号 */
  signalEnvironmentActivated: Signal;
}

/**
 * 登录事件对象
 */
interface LoginEvent {
  data?: {
    /** 是否已登录 */
    isLogin: boolean;
  };
}

/**
 * 环境变更事件对象
 */
interface EnvironmentChangeEvent {
  data: {
    /** 新环境 ID */
    newEnvironmentId: string;
  };
}

/**
 * 信号对象接口
 */
interface Signal {
  // 信号相关方法（根据实际 SignalHook 实现定义）
}

/**
 * 全局命名空间声明
 */
declare global {
  interface Window {
    /** 发布版本号 */
    publishVersion?: string;
  }

  namespace HSApp {
    namespace Util {
      class Storage {
        constructor(pluginType: string);
        get(key: string): string | null;
        set(key: string, value: string): void;
      }
      namespace Url {
        function getQueryStrings(): Record<string, string>;
      }
    }
    namespace Config {
      const TENANT: string;
    }
  }

  namespace HSCore {
    namespace Util {
      class SignalHook {
        constructor(context: unknown);
        listen(signal: Signal, callback: Function): this;
      }
    }
  }

  namespace HSFPConstants {
    enum PluginType {
      EmergencyNoticePlugin = 'EmergencyNoticePlugin',
      MessageCenter = 'MessageCenter'
    }
  }

  const adskUser: {
    signalLoginCompleted: Signal;
  };

  const NWTK: {
    mtop: {
      User: {
        getEmergencyNotice(): Promise<{
          ret: string[];
          data: EmergencyNoticeMessage;
        }>;
      };
    };
  };
}