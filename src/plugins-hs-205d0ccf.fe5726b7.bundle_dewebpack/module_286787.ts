interface BadgeData {
  [key: string]: unknown;
}

interface MenuItemData {
  order: number;
  visible: boolean;
  enable: boolean;
  badge?: BadgeData;
  count?: number;
  command?: string;
  hotkey?: string;
  label?: string;
  logGroup?: string;
  type?: string;
  isChecked?: boolean;
  isPressed?: boolean;
  hasDot?: boolean;
}

interface ParentItem {
  getPath(): string;
}

interface Signal<T> {
  dispatch(data: T): void;
}

interface UserTrackEvent {
  description: string;
  activeSection: string;
  group: string;
  clicksRatio: {
    id: string;
    name?: string;
  };
  isCumulatingTime: boolean;
  argInfo?: {
    isChecked?: boolean;
  };
}

interface UserTrackLogger {
  push(name: string, event: UserTrackEvent): void;
}

interface App {
  userTrackLogger: UserTrackLogger;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSCore {
  Util: {
    Signal: new <T>(context: unknown) => Signal<T>;
  };
}

declare const HSCore: HSCore;
declare const HSApp: HSApp;

type ChangeCallback = (event?: unknown) => void;

const DEFAULT_ORDER = 1000;

/**
 * MenuItem class representing a toolbar or menu item
 */
class MenuItem {
  public readonly name: string;
  public signalChanged: Signal<MenuItemData>;
  public parent?: ParentItem;
  public data: MenuItemData;
  
  private _changeCallback: ChangeCallback;

  constructor(name: string, onChange?: ChangeCallback) {
    this.name = name;
    this.signalChanged = new HSCore.Util.Signal<MenuItemData>(this);
    
    this._changeCallback = (event?: unknown): void => {
      if (onChange) {
        onChange(event);
      }
      this.signalChanged.dispatch(this.data);
    };
    
    this.parent = undefined;
    this.data = {
      order: DEFAULT_ORDER,
      visible: true,
      enable: true,
      badge: undefined,
      count: undefined,
      command: undefined,
      hotkey: undefined
    };
  }

  /**
   * Update menu item data
   */
  public setData(newData?: Partial<MenuItemData>): void {
    if (newData) {
      Object.assign(this.data, newData);
      this._changeCallback();
    }
  }

  /**
   * Disable the menu item
   */
  public disable(): void {
    if (this.data.enable) {
      this.setData({ enable: false });
    }
  }

  /**
   * Enable the menu item
   */
  public enable(): void {
    if (!this.data.enable) {
      this.setData({ enable: true });
    }
  }

  /**
   * Check if menu item is enabled
   */
  public isEnabled(): boolean {
    return this.data.enable;
  }

  /**
   * Show the menu item
   */
  public show(): void {
    this.setData({ visible: true });
  }

  /**
   * Hide the menu item
   */
  public hide(): void {
    this.setData({ visible: false });
  }

  /**
   * Add a badge to the menu item
   */
  public addBadge(badgeData: BadgeData): void {
    this.data.badge = { ...badgeData };
    this._changeCallback();
  }

  /**
   * Remove the badge from the menu item
   */
  public removeBadge(): void {
    this.data.badge = undefined;
    this._changeCallback();
  }

  /**
   * Add a notification dot
   */
  public addDot(): void {
    this.data.hasDot = true;
    this._changeCallback();
  }

  /**
   * Remove the notification dot
   */
  public removeDot(): void {
    this.data.hasDot = false;
    this._changeCallback();
  }

  /**
   * Get the path of the menu item
   */
  public getPath(): string {
    if (!this.parent) {
      return "";
    }
    
    const parentPath = this.parent.getPath();
    return parentPath ? `${parentPath}/${this.name}` : this.name;
  }

  /**
   * Get the full path of the menu item
   */
  public getFullPath(): string {
    if (!this.parent) {
      return "";
    }
    
    const parentPath = this.parent.getPath();
    return parentPath && this.parent ? `${parentPath}/${this.name}` : this.name;
  }

  /**
   * Check if the menu item is pressed
   */
  public isPressed(): boolean {
    return !!this.data.isPressed;
  }

  /**
   * Handle click event and track user interaction
   */
  public click(): void {
    if (!this.name) {
      return;
    }

    const trackEvent: UserTrackEvent = {
      description: `点击工具栏-${this.data.label ?? ""}`,
      activeSection: "toolbar",
      group: this.data.logGroup ?? "",
      clicksRatio: {
        id: this.name,
        name: this.data.label
      },
      isCumulatingTime: !this.data.logGroup
    };

    if (this.data.type === "checkbox") {
      const isChecked = this.data.isChecked;
      trackEvent.argInfo = { isChecked };
      trackEvent.description += isChecked ? "开启" : "关闭";
    }

    HSApp.App.getApp().userTrackLogger.push(this.name, trackEvent);
  }
}

export default MenuItem;