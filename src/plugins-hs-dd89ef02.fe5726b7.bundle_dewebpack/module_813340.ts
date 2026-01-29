import { CmdCreateFreeformNGWall } from './cmd-create-freeform-ng-wall';
import { CreateFreeformWall } from './create-freeform-wall';

interface HotkeyDefinition {
  win?: string;
  mac?: string;
}

interface HotkeyOptions {
  description: string;
  group?: string;
  global?: boolean;
}

interface HotkeyRegistration {
  hotkey: string | HotkeyDefinition;
  action: () => boolean | void;
  options: HotkeyOptions;
}

interface HotkeyManager {
  registerHotkey(
    hotkey: string | HotkeyDefinition,
    callback: (event: Event) => void,
    options: HotkeyOptions
  ): void;
  unregisterHotkey(
    hotkey: string | HotkeyDefinition,
    callback: (event: Event) => void,
    options: HotkeyOptions
  ): void;
}

interface GizmoItem {
  wallFlipping?: () => void;
}

interface GizmoManager {
  _items: GizmoItem[];
}

interface ActiveView {
  gizmoManager: GizmoManager;
}

interface CommandManager {
  current: unknown;
}

interface Signal<T> {
  listen(callback: (data: T) => void, context: unknown): void;
}

interface EntityFlagChangedEvent {
  target: Entity;
}

interface Entity {
  isFlagOn(flag: number): boolean;
}

interface Floorplan {
  signalFlagChanged: Signal<EntityFlagChangedEvent>;
}

interface App {
  hotkey: HotkeyManager;
  cmdManager: CommandManager;
  activeView: ActiveView;
  floorplan: Floorplan;
}

interface Actions {
  enabled(): boolean;
  deleteSelectedItems(): boolean | void;
  duplicate(): boolean | void;
  zoomIn(): boolean | void;
  zoomOut(): boolean | void;
  fitDes(): boolean | void;
  quit(): boolean | void;
  switchActiveView(): boolean | void;
  switch3DViewMode(): boolean | void;
  fitEntity(): boolean | void;
  fitCameraToEntity(): boolean | void;
  rotateCamera(): boolean | void;
  rotatePattern(): boolean | void;
}

interface UserInputPlugin {
  // Add specific properties as needed
}

interface HotkeyPluginConfig {
  app: App;
  userInputPlugin: UserInputPlugin;
  actions: Actions;
}

declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
    ViewOperation: string;
    FaceOperation: string;
  };
};

declare const HSCore: {
  Model: {
    EntityFlagEnum: {
      unselectable: number;
      freezed: number;
    };
  };
};

declare const $: {
  (selector: string | Document): {
    bind(eventType: string, keyOrHandler: string | ((e: KeyboardEvent) => void), handler?: (e: KeyboardEvent) => void): void;
  };
};

export default class HotkeyPlugin {
  private readonly _app: App;
  private readonly _userinputPlugin: UserInputPlugin;
  private _enable: boolean;
  private readonly actions: Actions;

  constructor(config: HotkeyPluginConfig) {
    this._app = config.app;
    this._userinputPlugin = config.userInputPlugin;
    this._enable = true;
    this.actions = config.actions;
    this._registerDefaultHotkey();
    this._bindEvents();
  }

  public registerHotkey(
    hotkey: string | HotkeyDefinition,
    callback: (event: Event) => void,
    options: HotkeyOptions
  ): void {
    this._app.hotkey.registerHotkey(hotkey, callback, options);
  }

  public unregisterHotkey(
    hotkey: string | HotkeyDefinition,
    callback: (event: Event) => void,
    options: HotkeyOptions
  ): void {
    this._app.hotkey.unregisterHotkey(hotkey, callback, options);
  }

  public enabled(): boolean {
    return this._enable;
  }

  private _registerDefaultHotkey(): void {
    const hotkeyManager = this._app.hotkey;
    
    const hotkeyRegistrations: HotkeyRegistration[] = [
      {
        hotkey: 'delete',
        action: this.actions.deleteSelectedItems,
        options: { description: '删除' }
      },
      {
        hotkey: 'backspace',
        action: this.actions.deleteSelectedItems,
        options: { description: '删除' }
      },
      {
        hotkey: { win: 'ctrl+d', mac: 'meta+d' },
        action: this.actions.duplicate,
        options: {
          description: '复制',
          group: HSFPConstants.LogGroupTypes.ContentOperation
        }
      },
      {
        hotkey: { win: 'ctrl+equals', mac: 'meta+equals' },
        action: this.actions.zoomIn,
        options: { description: '放大' }
      },
      {
        hotkey: { win: 'ctrl+num-plus', mac: 'meta+num-plus' },
        action: this.actions.zoomIn,
        options: { description: '放大' }
      },
      {
        hotkey: { win: 'ctrl+dash', mac: 'meta+dash' },
        action: this.actions.zoomOut,
        options: { description: '缩小' }
      },
      {
        hotkey: { win: 'ctrl+num-minus', mac: 'meta+num-minus' },
        action: this.actions.zoomOut,
        options: { description: '缩小' }
      },
      {
        hotkey: { win: 'ctrl+0', mac: 'meta+0' },
        action: this.actions.fitDes,
        options: { description: '适应画布' }
      },
      {
        hotkey: { win: 'ctrl+num-0', mac: 'meta+num-0' },
        action: this.actions.fitDes,
        options: { description: '适应画布' }
      },
      {
        hotkey: 'esc',
        action: this.actions.quit,
        options: { description: '取消' }
      },
      {
        hotkey: 'tab',
        action: this.actions.switchActiveView,
        options: {
          description: '切换视图',
          group: HSFPConstants.LogGroupTypes.ViewOperation
        }
      },
      {
        hotkey: { win: 'ctrl+p', mac: 'meta+p' },
        action: this.actions.switch3DViewMode,
        options: {
          description: '切换到3D视图',
          group: HSFPConstants.LogGroupTypes.ViewOperation
        }
      },
      {
        hotkey: { win: 'ctrl+9', mac: 'meta+9' },
        action: this.actions.fitEntity,
        options: { description: '居中目标物' }
      },
      {
        hotkey: 'z',
        action: this.actions.fitCameraToEntity,
        options: { description: '3D/漫游视图下居中目标物' }
      },
      {
        hotkey: 'space',
        action: this.actions.rotateCamera,
        options: { description: '旋转相机' }
      },
      {
        hotkey: 'space',
        action: this.actions.rotatePattern,
        options: {
          description: '旋转铺法',
          group: HSFPConstants.LogGroupTypes.FaceOperation
        }
      }
    ];

    hotkeyRegistrations.forEach((registration) => {
      hotkeyManager.registerHotkey(
        registration.hotkey,
        (event: Event) => {
          if (this.actions.enabled() && registration.action()) {
            this._pauseEvent(event);
          }
        },
        {
          ...registration.options,
          global: true
        }
      );
    });

    hotkeyManager.registerHotkey(
      { win: 'f8', mac: 'f8' },
      this._toggleOrthoMode.bind(this),
      { global: true, description: '切换正交模式' }
    );

    $(document).bind('keydown', 'ctrl', this._wallFlipping.bind(this));
    $(document).bind('keydown', 'f2', this._autoWallWidth.bind(this));
  }

  private _bindEvents(): void {
    this._app.floorplan.signalFlagChanged.listen(this._onFlagChanged, this);
  }

  private _onFlagChanged(event: EntityFlagChangedEvent): void {
    const target = event.target;
    const isUnselectable = target.isFlagOn(HSCore.Model.EntityFlagEnum.unselectable);
    const isFreezed = target.isFlagOn(HSCore.Model.EntityFlagEnum.freezed);
    
    this._enable = !isUnselectable && !isFreezed;
  }

  private _pauseEvent(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private _wallFlipping(event: KeyboardEvent): void {
    const CTRL_KEY_CODE = 17;
    
    if (event.keyCode === CTRL_KEY_CODE) {
      const currentCommand = this._app.cmdManager.current;
      const gizmoManager = this._app.activeView.gizmoManager;
      
      if (currentCommand instanceof CmdCreateFreeformNGWall) {
        const freeformWall = gizmoManager._items.find(
          (item) => item instanceof CreateFreeformWall
        ) as CreateFreeformWall | undefined;
        
        freeformWall?.wallFlipping?.();
      }
    }
  }

  private _autoWallWidth(event: KeyboardEvent): void {
    const F2_KEY_CODE = 113;
    
    if (event.keyCode === F2_KEY_CODE) {
      const radioButtons = document.getElementsByClassName('autoWallWidthRadioBtn');
      
      if (radioButtons && radioButtons.length > 0) {
        const listItems = radioButtons[0].getElementsByTagName('li');
        
        if (listItems && listItems.length > 0) {
          (listItems[0] as HTMLElement).click();
        }
      }
    }
  }

  private _toggleOrthoMode(event: Event): void {
    if (this.enabled()) {
      const propertyBars = document.getElementsByClassName('orthoModePropertyBar');
      
      if (propertyBars && propertyBars.length > 0) {
        const iconContainers = propertyBars[0].getElementsByClassName('svgIconContainer');
        
        if (iconContainers && iconContainers.length > 0) {
          (iconContainers[0] as HTMLElement).click();
        }
      }
      
      this._pauseEvent(event);
    }
  }
}