interface PropertyBarControl {
  id: string;
  type: PropertyBarControlTypeEnum;
  data: Record<string, unknown>;
}

interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PropertyBarPopup {
  destroy(): void;
  setLoseFocusHandler(handler: (force?: boolean) => void): void;
  updatePosition(bound: Bound | undefined): void;
  addBound(config: { id: string; bound: Bound }): void;
}

interface Underlay {
  show?: boolean;
  showBackground(show: boolean): void;
}

interface Layer {
  underlay?: Underlay;
}

interface Scene {
  activeLayer: Layer;
}

interface Floorplan {
  scene: Scene;
}

interface Command {
  // Command interface placeholder
}

interface CommandManager {
  createCommand(commandType: string): Command;
  execute(command: Command): void;
  receive(action: string, params: Record<string, unknown>): void;
  complete(): void;
}

interface App {
  floorplan: Floorplan;
  cmdManager: CommandManager;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  CommandType: {
    UpdateUnderlay: string;
  };
};

declare const PropertyBarPopup: {
  create(controls: PropertyBarControl[]): PropertyBarPopup;
};

declare const PropertyBarControlTypeEnum: {
  statusBtn: string;
  label: string;
  colorCheckbox: string;
  imageButton: string;
  button: string;
};

declare const ColorCheckbox: {
  StatusEnum: {
    checked: string;
    unchecked: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const adskUser: {
  isLogin(): boolean;
  openLoginWindow(): void;
  EVENT_CALLBACK_FUN: string;
};

declare const $: (selector: string) => {
  unbind(event: string): {
    bind(event: string, handler: () => void): void;
  };
  offset(): { left: number; top: number };
  outerWidth(): number;
  outerHeight(): number;
  find(selector: string): {
    addClass(className: string): void;
    removeClass(className: string): void;
  };
};

/**
 * Background setting status bar popup controller
 */
export default class BackgroundSettingPopupController {
  propertyBarPopup?: PropertyBarPopup;
  isShow: boolean = false;
  bgPngChecked: boolean = true;
  bgPngDelete: boolean = false;
  triggerTargetBound?: Bound;
  isPin: boolean = false;

  constructor() {
    this.propertyBarPopup = undefined;
    this.isShow = false;
    this.bgPngChecked = true;
    this.bgPngDelete = false;
    this.triggerTargetBound = undefined;
    this.isShow = false;
    this.isPin = false;
    this.propertyBarPopup = undefined;
  }

  /**
   * Toggle the popup visibility
   * @param targetBound - The bound of the trigger target element
   * @returns Current show state
   */
  toggle(targetBound: Bound): boolean {
    this.triggerTargetBound = targetBound;
    
    if (!this.isPin) {
      this.isShow = !this.isShow;
    }
    
    if (this.isShow || this.isPin) {
      if (!this.isPin) {
        this.updatePopup();
      }
    } else {
      this.hide(true);
    }
    
    return this.isShow;
  }

  /**
   * Hide the popup
   * @param force - Force hide regardless of pin state
   */
  hide(force?: boolean): void {
    if (force || (this.isShow && !this.isPin)) {
      this.isShow = false;
      this.propertyBarPopup?.destroy();
      this.isPin = false;
    }
  }

  /**
   * Toggle background PNG visibility
   */
  private _onShowBackgroundToggle(): void {
    const floorplan = HSApp.App.getApp().floorplan;
    this.bgPngChecked = !this.bgPngChecked;
    floorplan.scene.activeLayer.underlay?.showBackground(this.bgPngChecked);
  }

  /**
   * Update checked state based on current underlay status
   */
  onShowBackgroundToggleSetChecked(): void {
    const underlay = HSApp.App.getApp().floorplan.scene.activeLayer.underlay;
    
    if (underlay) {
      this.bgPngDelete = false;
      this.bgPngChecked = underlay.show ? true : false;
    } else {
      this.bgPngChecked = false;
      this.bgPngDelete = true;
    }
  }

  /**
   * Handle delete background PNG click event
   */
  private _onDeleteBackgroundPngClk(): void {
    if (adskUser.isLogin()) {
      this._statusBarExcuteDelete();
      
      if (HSApp.App.getApp().floorplan.scene.activeLayer.underlay) {
        if (!this.isPin) {
          this.isShow = !this.isShow;
        }
        
        if (this.isShow || this.isPin) {
          if (!this.isPin) {
            this.updatePopup();
          }
        } else {
          this.hide(true);
        }
      }
    } else {
      adskUser.openLoginWindow();
      $("body").unbind(adskUser.EVENT_CALLBACK_FUN).bind(adskUser.EVENT_CALLBACK_FUN, () => {
        this._statusBarExcuteDelete();
      });
    }
  }

  /**
   * Execute delete command for background underlay
   */
  private _statusBarExcuteDelete(): void {
    const commandManager = HSApp.App.getApp().cmdManager;
    const command = commandManager.createCommand(HSFPConstants.CommandType.UpdateUnderlay);
    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
    
    commandManager.execute(command);
    commandManager.receive("removeunderlay", { layer: activeLayer });
    commandManager.complete();
  }

  /**
   * Update popup UI with current state
   */
  updatePopup(): void {
    const PIN_BUTTON_ID = "box_pin_btn";
    
    this.propertyBarPopup?.destroy();
    this.onShowBackgroundToggleSetChecked();
    
    const controls: PropertyBarControl[] = [
      {
        id: PIN_BUTTON_ID,
        type: PropertyBarControlTypeEnum.statusBtn,
        data: {
          icon: "./plugin/backgroundsetting/res/icons/pin.svg",
          left: false,
          changed: (isPinned: boolean) => {
            this.isPin = isPinned;
          }
        }
      },
      {
        id: "labelBackgroundPng",
        type: PropertyBarControlTypeEnum.label,
        data: {
          text: ResourceManager.getString("plugin_statusBarPopup_bgsetting_background_png")
        }
      },
      {
        id: "checkboxShowPng",
        type: PropertyBarControlTypeEnum.colorCheckbox,
        data: {
          text: ResourceManager.getString("plugin_statusBarPopup_bgsetting_show"),
          status: this.bgPngChecked ? ColorCheckbox.StatusEnum.checked : ColorCheckbox.StatusEnum.unchecked,
          disabled: this.bgPngDelete,
          onclick: () => {
            if (!this.bgPngDelete) {
              this._onShowBackgroundToggle();
              this.updatePopup();
            }
          }
        }
      },
      {
        id: "buttonDeletePng",
        type: PropertyBarControlTypeEnum.imageButton,
        data: {
          src: "./plugin/backgroundsetting/res/icons/delete_bg_png.svg",
          onclick: () => {
            this._onDeleteBackgroundPngClk();
            this.hide(true);
          }
        }
      },
      {
        id: "txtDeletePng",
        type: PropertyBarControlTypeEnum.button,
        data: {
          disabled: this.bgPngDelete,
          text: ResourceManager.getString("plugin_statusBarPopup_bgsetting_delete"),
          onclick: () => {
            this._onDeleteBackgroundPngClk();
            this.hide(true);
          }
        }
      }
    ];
    
    this.propertyBarPopup = PropertyBarPopup.create(controls);
    this.propertyBarPopup.setLoseFocusHandler(this.hide.bind(this));
    this.propertyBarPopup.updatePosition(this.triggerTargetBound);
    
    const pinButtonSelector = `#${PIN_BUTTON_ID}`;
    const pinButtonElement = $(pinButtonSelector);
    const pinButtonBound: Bound = {
      left: pinButtonElement.offset().left,
      top: pinButtonElement.offset().top,
      width: pinButtonElement.outerWidth(),
      height: pinButtonElement.outerHeight()
    };
    
    this.propertyBarPopup.addBound({
      id: "pinBound",
      bound: pinButtonBound
    });
    
    if (this.bgPngDelete === false) {
      $(".backgroundPngShow").find(".inputlabel").addClass("txtColorShowNormal");
    } else {
      $(".backgroundPngShow").find(".inputlabel").removeClass("txtColorShowNormal");
    }
  }
}