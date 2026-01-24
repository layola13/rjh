/**
 * 单设备登录处理器类型定义
 * 用于管理单设备登录逻辑，防止多设备同时登录
 */

/** 消息中心发送方法 */
interface MessageCenterSendMethod {
  (message: { type: string; unitId: string }): void;
}

/** 消息中心接口 */
interface MessageCenter {
  send?: MessageCenterSendMethod;
}

/** Socket连接数据 */
interface SocketConnectData {
  data?: {
    messageCenter?: MessageCenter;
  };
}

/** 消息监听器回调参数 */
interface MessageListenerPayload {
  /** 是否在线 */
  online?: boolean;
}

/** 登录完成信号数据 */
interface LoginCompletedData {
  data?: {
    /** 是否已登录 */
    isLogin?: boolean;
  };
}

/** 登录锁API响应 */
interface LoginLockResponse {
  /** 操作是否成功 */
  success: boolean;
}

/** 模态框关闭参数 */
interface ModalInstance {
  /** 模态框唯一标识 */
  key: string;
}

/** 退出登录选项 */
interface LogoutOptions {
  /** 是否保存设计 */
  saveDesign?: boolean;
}

/** UI操作回调 - 登录场景 */
interface LoginUICallbacks {
  /** 确认回调（选择踢掉其他设备） */
  onOk: (instance: ModalInstance) => Promise<void>;
  /** 取消回调（选择退出当前登录） */
  onCancel: (instance: ModalInstance) => Promise<void>;
}

/** UI操作回调 - 退出场景 */
interface LogoutUICallbacks {
  /** 确认回调（继续设计） */
  onOk: (instance: ModalInstance) => Promise<void>;
  /** 取消回调（退出设备） */
  onCancel: (options: LogoutOptions & ModalInstance) => Promise<void>;
}

/** 用户追踪日志记录器 */
interface UserTrackLogger {
  push(event: string, data: Record<string, unknown>, options?: Record<string, unknown>): void;
}

/** 设计元数据管理器 */
interface DesignMetadata {
  get(key: string): unknown;
}

/** 持久化插件接口 */
interface PersistencePlugin {
  /** 自动创建设计 */
  autoCreate(): Promise<unknown>;
  /** 保存设计 */
  save(): Promise<unknown>;
}

/** 用户信息插件接口 */
interface UserInfoPlugin {
  /** 登出用户 */
  logOut(): void;
}

/** 插件管理器 */
interface PluginManager {
  getPlugin(type: string): PersistencePlugin | UserInfoPlugin | undefined;
}

/** 应用实例接口 */
interface AppInstance {
  userTrackLogger: UserTrackLogger;
  designMetadata: DesignMetadata;
  pluginManager: PluginManager;
  isFloorplanDirty: boolean;
}

/** UI管理器 */
declare class UI {
  /** 显示登录冲突对话框 */
  showLogin(callbacks: LoginUICallbacks): void;
  /** 显示退出登录对话框 */
  showLogout(callbacks: LogoutUICallbacks): void;
  /** 关闭模态框 */
  closeModal(key: string): void;
}

/** 消息中心接口 */
declare class Message {
  /** 监听特定类型的消息 */
  listen(messageType: string, callback: (payload: MessageListenerPayload) => void): void;
  /** 取消监听消息 */
  unlisten(messageType: string, callback: (payload: MessageListenerPayload) => void): void;
  /** 获取连接信号 */
  getConnectSignal(): {
    listen(callback: (data: SocketConnectData) => void): void;
  };
}

/** 存储工具类 */
declare class Storage {
  constructor(pluginType: string);
  get(key: string): string | null;
  set(key: string, value: string): void;
}

/**
 * 单设备登录处理器
 * 负责处理单设备登录限制、设备冲突检测和用户选择逻辑
 */
export declare class Handler {
  /** 当前设备唯一标识符 */
  private unitId: string | undefined;

  /** 本地存储实例 */
  private storage: Storage | undefined;

  /** 存储单元ID的键名 */
  private readonly unitIdKey: string;

  /** 检查登录锁的定时器 */
  private checkLockTimer: number | undefined;

  /** 检查登录锁的超时时间（毫秒），默认60秒 */
  private readonly checkLockTimeout: number;

  /** UI管理器实例 */
  private ui: UI | undefined;

  /** 是否正在显示用户选择对话框（防止重复弹窗） */
  private showUserSelecting: boolean;

  /** 消息类型标识 */
  private readonly messageType: string;

  /** 消息中心实例 */
  private message: Message | undefined;

  /**
   * 初始化处理器
   * @param message 消息中心实例
   */
  init(message: Message): void;

  /**
   * 初始化Socket连接
   * @param message 消息中心实例
   */
  private initSocket(message: Message): void;

  /**
   * Socket连接成功回调
   * @param data 连接数据
   */
  private onSocketConnect(data: SocketConnectData): void;

  /**
   * 反初始化，清理资源
   */
  uninit(): void;

  /**
   * 监听消息回调
   * @param payload 消息负载
   */
  private listenMessage(payload: MessageListenerPayload): void;

  /**
   * 用户登录完成回调
   * @param data 登录数据
   */
  private logged(data: LoginCompletedData): void;

  /**
   * 启动登录锁定流程
   */
  private startLoginLock(): Promise<void>;

  /**
   * 显示登录设备选择对话框
   */
  private showLoginUseSelect(): Promise<void>;

  /**
   * 显示登录冲突标题对话框
   */
  private showLoginUserTitle(): Promise<boolean>;

  /**
   * 显示退出登录选择对话框
   */
  private showLogoutUseSelect(): Promise<void>;

  /**
   * 显示退出登录标题对话框
   */
  private showLogoutUserTitle(): Promise<boolean>;

  /**
   * 尝试获取登录锁
   * @returns 是否成功获取锁
   */
  private tryLock(): Promise<boolean>;

  /**
   * 保存当前设计
   */
  private save(): Promise<unknown>;

  /**
   * 登出当前用户
   */
  private logout(): Promise<void>;

  /**
   * 启动定期检查登录锁状态
   */
  private startCheckLock(): void;
}

/**
 * 获取登录锁
 * @param unitId 设备唯一标识
 * @returns 登录锁响应
 */
declare function getLoginLock(unitId: string): Promise<LoginLockResponse>;

/**
 * 尝试获取登录锁
 * @param unitId 设备唯一标识
 * @returns 登录锁响应
 */
declare function tryLoginLock(unitId: string): Promise<LoginLockResponse>;

/**
 * 检查登录锁状态
 * @param unitId 设备唯一标识
 * @returns 登录锁响应或undefined
 */
declare function checkLoginLock(unitId: string): Promise<LoginLockResponse | undefined>;