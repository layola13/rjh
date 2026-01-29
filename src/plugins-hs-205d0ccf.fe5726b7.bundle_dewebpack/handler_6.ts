interface LoginLockResponse {
  success: boolean;
}

interface UserSignalData {
  isLogin: boolean;
}

interface UserSignal {
  data?: UserSignalData;
}

interface SocketConnectData {
  data?: {
    messageCenter?: {
      send?: (message: { type: string; unitId: string }) => void;
    };
  };
}

interface MessageData {
  online?: boolean;
}

interface ModalInstance {
  key: string;
}

interface UserSelectOptions {
  saveDesign?: boolean;
}

interface ShowLoginOptions {
  onOk: (modal: ModalInstance) => Promise<void>;
  onCancel: (modal: ModalInstance) => Promise<void>;
}

interface ShowLogoutOptions {
  onOk: (modal: ModalInstance) => Promise<void>;
  onCancel: (options: UserSelectOptions) => Promise<void>;
}

interface UI {
  showLogin(options: ShowLoginOptions): void;
  showLogout(options: ShowLogoutOptions): void;
  closeModal(key: string): void;
}

interface Storage {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

interface Message {
  listen(type: string, handler: (data: MessageData) => void): void;
  unlisten(type: string, handler: (data: MessageData) => void): void;
  getConnectSignal(): {
    listen(handler: (data: SocketConnectData) => void): void;
  };
}

interface UserTrackLogger {
  push(event: string, data: Record<string, unknown>, options: Record<string, unknown>): void;
}

interface PersistencePlugin {
  save(): Promise<void>;
  autoCreate(): Promise<void>;
}

interface UserInfoPlugin {
  logOut(): void;
}

interface PluginManager {
  getPlugin(type: string): PersistencePlugin | UserInfoPlugin | undefined;
}

interface DesignMetadata {
  get(key: string): string | undefined;
}

interface App {
  userTrackLogger: UserTrackLogger;
  pluginManager: PluginManager;
  designMetadata: DesignMetadata;
  isFloorplanDirty: boolean;
}

declare const HSApp: {
  Util: {
    Storage: new (pluginType: string) => Storage;
  };
  Config: {
    TENANT: string;
  };
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    SingleDeviceLogin: string;
    Persistence: string;
    UserInfo: string;
  };
};

declare const ShortUUID: {
  uuid(): string;
};

declare const adskUser: {
  signalLoginCompleted: {
    listen(handler: (signal: UserSignal) => void): void;
    unlisten(handler: (signal: UserSignal) => void): void;
  };
};

async function getLoginLock(unitId: string): Promise<LoginLockResponse> {
  // Implementation would be imported
  return { success: false };
}

async function tryLoginLock(unitId: string): Promise<LoginLockResponse> {
  // Implementation would be imported
  return { success: false };
}

async function checkLoginLock(unitId: string): Promise<LoginLockResponse | undefined> {
  // Implementation would be imported
  return { success: false };
}

class UIImplementation implements UI {
  showLogin(options: ShowLoginOptions): void {
    // UI implementation
  }

  showLogout(options: ShowLogoutOptions): void {
    // UI implementation
  }

  closeModal(key: string): void {
    // UI implementation
  }
}

const UNIT_ID_KEY = "unitId";
const MESSAGE_TYPE = "UNIT_LOCK";
const CHECK_LOCK_TIMEOUT = 60000;

export class Handler {
  private unitId?: string;
  private storage: Storage;
  private checkLockTimer?: number;
  private ui: UI;
  private showUserSelecting: boolean = false;
  private message?: Message;

  constructor() {
    this.ui = new UIImplementation();
    this.storage = new HSApp.Util.Storage(HSFPConstants.PluginType.SingleDeviceLogin);
    this.listenMessage = this.listenMessage.bind(this);
    this.logged = this.logged.bind(this);
    this.onSocketConnect = this.onSocketConnect.bind(this);
  }

  init(message: Message): void {
    this.message = message;
    
    let unitId = this.storage.get(UNIT_ID_KEY);
    if (!unitId) {
      unitId = ShortUUID.uuid();
      this.storage.set(UNIT_ID_KEY, unitId);
    }
    
    this.unitId = unitId;
    adskUser.signalLoginCompleted.listen(this.logged);
    this.initSocket(message);
  }

  private initSocket(message: Message): void {
    message.listen(MESSAGE_TYPE, this.listenMessage);
    message.getConnectSignal().listen(this.onSocketConnect);
  }

  private onSocketConnect(event: SocketConnectData): void {
    event?.data?.messageCenter?.send?.call(event.data.messageCenter, {
      type: MESSAGE_TYPE,
      unitId: this.unitId!
    });
  }

  uninit(): void {
    if (this.checkLockTimer) {
      clearInterval(this.checkLockTimer);
    }
    
    adskUser.signalLoginCompleted.unlisten(this.logged);
    this.message?.unlisten(MESSAGE_TYPE, this.listenMessage);
  }

  private listenMessage(event: MessageData): void {
    if (event?.online === false) {
      this.showLogoutUseSelect();
    }
  }

  private logged(event: UserSignal): void {
    if (HSApp.Config.TENANT !== "fp" && event?.data?.isLogin) {
      this.startLoginLock();
    }
  }

  private async startLoginLock(): Promise<void> {
    const result = await getLoginLock(this.unitId!);
    
    if (!result.success) {
      await this.showLoginUseSelect();
    }
  }

  private async showLoginUseSelect(): Promise<void> {
    if (this.showUserSelecting) {
      return;
    }

    HSApp.App.getApp().userTrackLogger.push("single-device-login-other-logged", {
      description: "检测到其他设备已经登陆",
      unitId: this.unitId
    }, {});

    this.showUserSelecting = true;
    await this.showLoginUserTitle();
    this.showUserSelecting = false;
  }

  private async showLoginUserTitle(): Promise<boolean> {
    const app = HSApp.App.getApp();

    return new Promise<boolean>((resolve) => {
      this.ui.showLogin({
        onOk: async (modal: ModalInstance) => {
          app.userTrackLogger.push("single-device-login-other-logged-login", {
            description: "选择踢掉其他设备",
            unitId: this.unitId
          }, {});

          const success = await this.tryLock();
          if (success) {
            this.ui.closeModal(modal.key);
            resolve(true);
          }
        },
        onCancel: async (_modal: ModalInstance) => {
          app.userTrackLogger.push("single-device-login-other-logged-logout", {
            description: "选择退出设备登陆",
            unitId: this.unitId
          }, {});

          await this.logout();
          resolve(true);
        }
      });
    });
  }

  private async showLogoutUseSelect(): Promise<void> {
    if (this.showUserSelecting) {
      return;
    }

    HSApp.App.getApp().userTrackLogger.push("single-device-login-other-logging", {
      description: "检测到其他设备正在登陆",
      unitId: this.unitId
    }, {});

    this.showUserSelecting = true;
    await this.showLogoutUserTitle();
    this.showUserSelecting = false;
  }

  private async showLogoutUserTitle(): Promise<boolean> {
    const app = HSApp.App.getApp();

    return new Promise<boolean>((resolve) => {
      this.ui.showLogout({
        onOk: async (modal: ModalInstance) => {
          app.userTrackLogger.push("single-device-login-other-logging-login", {
            description: "选择继续设计，踢掉其他登陆设备",
            unitId: this.unitId
          }, {});

          const success = await this.tryLock();
          if (success) {
            this.ui.closeModal(modal.key);
            resolve(true);
          }
        },
        onCancel: async (options: UserSelectOptions) => {
          app.userTrackLogger.push("single-device-login-other-logging-logout", {
            description: "选择退出设备",
            unitId: this.unitId
          }, {});

          if (options.saveDesign) {
            await this.save();
          }

          await this.logout();
          resolve(true);
        }
      });
    });
  }

  private async tryLock(): Promise<boolean> {
    const result = await tryLoginLock(this.unitId!);
    return result.success;
  }

  private async save(): Promise<void> {
    const persistencePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Persistence
    ) as PersistencePlugin | undefined;

    if (!HSApp.App.getApp().designMetadata.get("designId")) {
      return persistencePlugin?.autoCreate();
    }

    return persistencePlugin?.save();
  }

  private async logout(): Promise<void> {
    HSApp.App.getApp().isFloorplanDirty = false;
    
    const userInfoPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.UserInfo
    ) as UserInfoPlugin | undefined;
    
    userInfoPlugin?.logOut();
  }

  startCheckLock(): void {
    let isChecking = false;

    this.checkLockTimer = window.setInterval(async () => {
      if (isChecking) {
        return;
      }

      isChecking = true;

      const result = await checkLoginLock(this.unitId!).catch(() => undefined);

      if (!result) {
        isChecking = false;
        return;
      }

      if (result.success === false) {
        await this.showLogoutUseSelect();
      }

      isChecking = false;
    }, CHECK_LOCK_TIMEOUT);
  }
}