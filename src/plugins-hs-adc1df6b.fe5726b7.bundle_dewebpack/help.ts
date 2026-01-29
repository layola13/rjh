interface App {
  hotkey: {
    registerHotkey(hotkey: string, handler: (event: Event) => void): void;
  };
}

interface UserInputPlugin {
  // Define based on actual usage
}

interface PluginMap {
  [key: string]: UserInputPlugin;
}

interface HelpbarItemData {
  command?: string;
  hotkey?: string;
  registerHotkey?: boolean;
  [key: string]: unknown;
}

interface HelpbarItem {
  name: string;
  type: string;
  data: HelpbarItemData;
  childItems: HelpbarItem[];
  click(): void;
  setData(data: Partial<HelpbarItemData>): void;
}

interface Helpbar {
  name: string;
  signalItemAdded: Signal<{ addedItem: HelpbarItem }>;
  signalItemRemoved: Signal<{ removedItem: HelpbarItem }>;
  getItem(itemName: string): HelpbarItem | undefined;
  addItem(itemName: string, itemData: HelpbarItemData): HelpbarItem | undefined;
  removeItem(itemName: string): void;
  getRoot(): HelpbarItem;
}

interface Signal<T = unknown> {
  dispatch(data?: T): void;
}

interface SignalHook {
  listen<T>(signal: Signal<{ data: T; target: Helpbar }>, callback: (event: { data: T; target: Helpbar }) => void): SignalHook;
}

interface HotkeyDefinition {
  item: HelpbarItem;
  hotkey: string;
  handler: (event: Event) => void;
}

declare const HSCore: {
  Util: {
    SignalHook: new (context: unknown) => SignalHook;
    Signal: new (context: unknown) => Signal;
  };
};

declare const HSFPConstants: {
  PluginType: {
    UserInput: string;
  };
};

declare const React: {
  createElement(component: unknown, props: unknown): unknown;
};

import HelpbarItemType from './HelpbarItemType';
import HelpbarClass from './Helpbar';
import DefaultHelpbarItems from './DefaultHelpbarItems';
import HelpbarComponent from './HelpbarComponent';

export class Help {
  public readonly order: number = 900;

  private readonly _app: App;
  private _isShowing: boolean = true;
  private _helpbar: Helpbar | null = null;
  private _dirty: boolean = false;
  private readonly _hotkeysByHelpbarId: Map<string, HotkeyDefinition[]> = new Map();
  private readonly _helpbarItemByCommandType: Map<string, HelpbarItem[]> = new Map();
  private readonly _signalHook: SignalHook;
  private readonly _signalRefreshHelpUi: Signal;
  private readonly _userInputPlugin: UserInputPlugin;

  constructor(app: App, plugins: PluginMap) {
    this._app = app;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalRefreshHelpUi = new HSCore.Util.Signal(this);
    this._userInputPlugin = plugins[HSFPConstants.PluginType.UserInput];
    this.init();
  }

  private init(): void {
    const defaultHelpbarItems = new DefaultHelpbarItems({
      userInputPlugin: this._userInputPlugin
    });
    this.addHelpbar_("default", defaultHelpbarItems.getDefaultHelpbarItems());
  }

  private getItem_(itemName: string): HelpbarItem | undefined {
    const helpbar = this._helpbar;
    if (helpbar) {
      return helpbar.getItem(itemName);
    }
  }

  private addItem_(itemName: string, itemData: HelpbarItemData): HelpbarItem | undefined {
    const helpbar = this._helpbar;
    if (helpbar) {
      return helpbar.addItem(itemName, itemData);
    }
  }

  private removeItem_(itemName: string): void {
    const helpbar = this._helpbar;
    if (helpbar) {
      helpbar.removeItem(itemName);
    }
  }

  private updateItems_(itemNames: string[], itemData: Partial<HelpbarItemData>): void {
    itemNames.forEach((itemName) => {
      const item = this.getItem_(itemName);
      if (item) {
        item.setData(itemData);
      }
    });
  }

  private addHelpbar_(name: string, items: HelpbarItemData[]): void {
    const helpbar = new HelpbarClass(
      name,
      this._onHelpbarItemChanged.bind(this),
      this.getItem_.bind(this),
      items
    );
    this._handleHelpbarAdded(helpbar);
  }

  private _handleHelpbarAdded(helpbar: Helpbar): void {
    this._hotkeysByHelpbarId.set(helpbar.name, []);
    this._forEachItem(helpbar.getRoot(), (item) => {
      this._handleItemAdded(item, helpbar);
    });
    this._signalHook
      .listen(helpbar.signalItemAdded, this._onHelpbarItemAdded.bind(this))
      .listen(helpbar.signalItemRemoved, this._onHelpbarItemRemoved.bind(this));
    this._helpbar = helpbar;
  }

  private _forEachItem(
    item: HelpbarItem,
    callback: (item: HelpbarItem) => void,
    context?: unknown
  ): void {
    item.childItems.forEach((childItem) => {
      callback.call(context, childItem);
      if (childItem.type === HelpbarItemType.folder) {
        this._forEachItem(childItem, callback, context);
      }
    });
  }

  private _onHelpbarItemAdded(event: { data: { addedItem: HelpbarItem }; target: Helpbar }): void {
    this._handleItemAdded(event.data.addedItem, event.target);
  }

  private _onHelpbarItemRemoved(event: { data: { removedItem: HelpbarItem }; target: Helpbar }): void {
    this._handleItemRemoved(event.data.removedItem, event.target);
  }

  private _handleItemAdded(item: HelpbarItem, helpbar: Helpbar): void {
    const itemData = item.data;
    const command = itemData.command;
    const hotkey = itemData.hotkey;
    const registerHotkey = itemData.registerHotkey;

    if (command) {
      command.split(", ").forEach((cmd) => {
        const trimmedCommand = cmd.trim();
        let items = this._helpbarItemByCommandType.get(trimmedCommand);
        if (!items) {
          items = [];
        }
        items.push(item);
        this._helpbarItemByCommandType.set(trimmedCommand, items);
      });
    }

    if (hotkey && registerHotkey !== false) {
      this._handleItemHotKeyAdd(item, helpbar);
    }
  }

  private _handleItemRemoved(item: HelpbarItem, helpbar: Helpbar): void {
    const itemData = item.data;
    const command = itemData.command;
    const hotkey = itemData.hotkey;

    if (command) {
      command.split(", ").forEach((cmd) => {
        const trimmedCommand = cmd.trim();
        const items = this._helpbarItemByCommandType.get(trimmedCommand);
        if (items && items.length) {
          const index = items.findIndex((i) => i.name === item.name);
          if (index !== -1) {
            items.splice(index, 1);
          }
        }
        if (items && !items.length) {
          this._helpbarItemByCommandType.delete(trimmedCommand);
        }
      });
    }

    if (hotkey) {
      this._handleItemHotKeyRemove(item, helpbar);
    }
  }

  private _handleItemHotKeyAdd(item: HelpbarItem, helpbar: Helpbar): void {
    const hotkeyDef = this._getHotkeyDef(item);
    const hotkeys = this._hotkeysByHelpbarId.get(helpbar.name);
    if (hotkeys && !this._itemHotKeyHasAdded(hotkeys, hotkeyDef)) {
      hotkeys.push(hotkeyDef);
    }
    this._registerHotkey(hotkeyDef);
  }

  private _handleItemHotKeyRemove(item: HelpbarItem, helpbar: Helpbar): void {
    const hotkeys = this._hotkeysByHelpbarId.get(helpbar.name);
    if (hotkeys) {
      const index = hotkeys.findIndex((def) => def.item === item);
      if (index !== -1) {
        hotkeys.splice(index, 1);
      }
    }
  }

  private _itemHotKeyHasAdded(hotkeys: HotkeyDefinition[], hotkeyDef: HotkeyDefinition): boolean {
    return !!hotkeys.find((def) => {
      if (
        hotkeyDef.item &&
        def.item &&
        typeof hotkeyDef.item.name === "string" &&
        typeof def.item.name === "string" &&
        def.item.name === hotkeyDef.item.name
      ) {
        return true;
      }
    });
  }

  private _registerHotkey(hotkeyDef: HotkeyDefinition): void {
    this._app.hotkey.registerHotkey(hotkeyDef.hotkey, hotkeyDef.handler);
  }

  private _getHotkeyDef(item: HelpbarItem): HotkeyDefinition {
    return {
      item: item,
      hotkey: item.data.hotkey!,
      handler: (event: Event) => {
        item.click();
        event.stopPropagation();
        event.preventDefault();
      }
    };
  }

  private _onHelpbarItemChanged(): void {
    if (this._isShowing && this._helpbar) {
      this._render();
    }
  }

  private _render(): void {
    if (this._signalRefreshHelpUi && this._signalRefreshHelpUi.dispatch) {
      this._signalRefreshHelpUi.dispatch();
    }
  }

  public getRenderItem(): unknown {
    return React.createElement(HelpbarComponent, {
      helpbar: this._helpbar,
      visible: this._isShowing,
      signalRefreshHelpUi: this._signalRefreshHelpUi
    });
  }
}