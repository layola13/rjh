import { Handler } from './Handler';

interface PluginDependency {
  dependencies: string[];
}

class UserInfoPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    super({
      dependencies: [HSFPConstants.PluginType.MarketingBadge]
    });
    
    this.handler = new Handler();
  }

  init(): void {
    this.handler.init();
  }

  onActive(): void {
    this.init();
  }

  onDeactive(): void {
    // No operation
  }

  openUserDropdownMenu = (): void => {
    this.handler.openUserDropdownMenu();
  };

  closeUserDropdownMenu = (): void => {
    this.handler.closeUserDropdownMenu();
  };

  getUserInfoButton(): unknown {
    return this.handler.userInfoButton();
  }

  getUserInfoDropdown(): unknown {
    return this.handler.getUserInfoDropDown();
  }

  addItem(item: unknown): unknown {
    return this.handler.addItem(item);
  }

  updateItem(item: unknown): unknown {
    return this.handler.updateItem(item);
  }

  hideItem(item: unknown): unknown {
    return this.handler.hideItem(item);
  }

  showItem(item: unknown): unknown {
    return this.handler.showItem(item);
  }

  getUserInfoRedDot(): unknown {
    return this.handler.getUserInfoRedDot();
  }

  getTheme(): unknown {
    return this.handler.getTheme();
  }

  setTheme(theme: unknown): void {
    this.handler.setTheme(theme);
  }

  getUpdateUserInfoSignal(): unknown {
    return this.handler.getUpdateUserInfoSignal();
  }

  showQRCode(): unknown {
    return this.handler.showQRCode();
  }

  jumpVersionToolUrl(): unknown {
    return this.handler.jumpVersionToolUrl();
  }

  setUserInfoEditMode(): void {
    this.handler.setUserInfoEditMode();
  }

  setUserInfoReadonlyMode(param1: unknown, param2: unknown): void {
    this.handler.setUserInfoReadonlyMode(param1, param2);
  }

  logOut(): void {
    this.handler.logOut();
  }

  getLoginMenuClassNames(): unknown {
    return this.handler.getLoginMenuClassNames();
  }

  addLoginMenuClassName(className: string): void {
    this.handler.addLoginMenuClassName(className);
  }

  updateLoginMenuClassName(className: string): void {
    this.handler.updateLoginMenuClassName(className);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.UserInfo, UserInfoPlugin);