interface DesignMetadata {
  get(key: string): string;
}

interface App {
  designMetadata: DesignMetadata;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface AdskUser {
  adaId: string;
  guid: string;
  EVENT_CALLBACK_FUN: string;
  getUserSessionId(): string;
  isLogin(): boolean;
  logOut(): void;
  openLoginWindow(): void;
}

declare const adskUser: AdskUser;
declare const HSApp: HSApp;
declare const $: any;

export default class UserService {
  static getLoginUserId(): string {
    return adskUser.adaId || adskUser.guid;
  }

  static getSessionId(): string {
    return adskUser.getUserSessionId();
  }

  static getDesignId(app: App): string {
    return app.designMetadata.get("designId");
  }

  static getDesignVersion(app: App): string {
    return app.designMetadata.get("designVersion");
  }

  static getDesignName(app: App): string {
    return app.designMetadata.get("designName");
  }

  static isLogin(): boolean {
    return adskUser.isLogin();
  }

  static isOwner(): boolean {
    const userId = HSApp.App.getApp().designMetadata.get("userId");
    return this.isLogin() && (userId === adskUser.adaId || userId === adskUser.guid);
  }

  static logOut(): void {
    return adskUser.logOut();
  }

  static openLoginWindow(callback?: () => void): void {
    if (callback) {
      adskUser.openLoginWindow();
      $("body")
        .unbind(adskUser.EVENT_CALLBACK_FUN)
        .bind(adskUser.EVENT_CALLBACK_FUN, () => {
          callback();
        });
    }
  }
}