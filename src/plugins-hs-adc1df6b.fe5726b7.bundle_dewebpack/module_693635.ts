interface MenuItemData {
  order: number;
  visible: boolean;
  enable: boolean;
  badge?: BadgeConfig;
  command?: unknown;
  hotkey?: unknown;
  countNumber: number;
  showNew: boolean;
  isPressed?: boolean;
}

interface BadgeConfig {
  [key: string]: unknown;
}

interface Signal<T> {
  dispatch(data: T): void;
}

interface MenuItemParent {
  getPath(): string;
}

type ChangeCallback = (event?: unknown) => void;

class MenuItem {
  public readonly name: string;
  public readonly signalChanged: Signal<MenuItemData>;
  public parent: MenuItemParent | undefined;
  public data: MenuItemData;

  private readonly _changeCallback: (event?: unknown) => void;

  constructor(name: string, onChange?: ChangeCallback) {
    this.name = name;
    this.signalChanged = new HSCore.Util.Signal(this);
    
    this._changeCallback = (event?: unknown): void => {
      if (onChange) {
        onChange(event);
      }
      this.signalChanged.dispatch(this.data);
    };

    this.parent = undefined;
    this.data = {
      order: 1000,
      visible: true,
      enable: true,
      badge: undefined,
      command: undefined,
      hotkey: undefined,
      countNumber: 0,
      showNew: false
    };
  }

  public setData(partialData: Partial<MenuItemData>, triggerCallback: boolean = false): void {
    if (partialData) {
      Object.assign(this.data, partialData);
      if (triggerCallback) {
        this._changeCallback();
      }
    }
  }

  public disable(): void {
    if (this.data.enable) {
      this.setData({ enable: false });
    }
  }

  public enable(): void {
    if (!this.data.enable) {
      this.setData({ enable: true });
    }
  }

  public show(): void {
    this.setData({ visible: true });
  }

  public hide(): void {
    this.setData({ visible: false });
  }

  public addBadge(badgeConfig: BadgeConfig): void {
    this.data.badge = { ...badgeConfig };
    this._changeCallback();
  }

  public removeBadge(): void {
    this.data.badge = undefined;
    this._changeCallback();
  }

  public getPath(): string {
    if (!this.parent) {
      return "";
    }
    const parentPath = this.parent.getPath();
    return parentPath ? `${parentPath}/${this.name}` : this.name;
  }

  public isPressed(): boolean {
    return !!this.data.isPressed;
  }
}

export default MenuItem;