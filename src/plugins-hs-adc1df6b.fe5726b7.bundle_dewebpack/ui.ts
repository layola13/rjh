interface Environment {
  // Add specific environment properties based on your application context
  [key: string]: unknown;
}

interface ModalConfirmOptions {
  title: string;
  okButtonContent: string;
  cancelButtonContent: string;
  content: string;
  enableCheckbox: boolean;
  onOk: () => void;
  onCancel: () => void;
  onClose: () => void;
}

interface Modal {
  confirm(options: ModalConfirmOptions): void;
}

interface ResourceManager {
  getString(key: string): string;
}

interface EventTrack {
  track(group: unknown, eventName: string): void;
}

interface Util {
  EventTrack: {
    instance(): EventTrack;
  };
  EventGroupEnum: {
    Roof: unknown;
  };
}

interface HSAppGlobal {
  Util: Util;
}

declare const ResourceManager: ResourceManager;
declare const HSApp: HSAppGlobal;

export const Modal: Modal = {
  confirm(options: ModalConfirmOptions): void {
    // Modal implementation
  }
};

export class UI {
  private _environment: Environment;
  private _aux2DContainer?: HTMLDivElement;

  constructor(environment: Environment) {
    this._environment = environment;
    this._aux2DContainer = undefined;
  }

  get aux2DContainer(): HTMLDivElement | undefined {
    return this._aux2DContainer;
  }

  renderAux2D(): void {
    if (!this._aux2DContainer) {
      const containerElement = document.createElement("div");
      containerElement.className = "roofsdrawing-aux2d";
      
      const editorContainer = document.querySelector<HTMLElement>(".editor2dContainer");
      editorContainer?.appendChild(containerElement);
      
      this._aux2DContainer = containerElement;
    }
  }

  destroy(): void {
    if (this._aux2DContainer) {
      this._aux2DContainer.remove();
      this._aux2DContainer = undefined;
    }
  }

  showSwitchLayerConfirm(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Modal.confirm({
        title: ResourceManager.getString("switch_layer"),
        okButtonContent: ResourceManager.getString("switch_layer"),
        cancelButtonContent: ResourceManager.getString("cancel"),
        content: ResourceManager.getString("plugin_roofsdrawing_switch_layer_tip"),
        enableCheckbox: false,
        onOk: () => {
          HSApp.Util.EventTrack.instance().track(
            HSApp.Util.EventGroupEnum.Roof,
            "draw_env_switch_floor_confirm_event"
          );
          resolve(true);
        },
        onCancel: () => {
          HSApp.Util.EventTrack.instance().track(
            HSApp.Util.EventGroupEnum.Roof,
            "draw_env_switch_floor_cancle_event"
          );
          reject(false);
        },
        onClose: () => {
          HSApp.Util.EventTrack.instance().track(
            HSApp.Util.EventGroupEnum.Roof,
            "draw_env_switch_floor_close_event"
          );
          reject(false);
        }
      });
    });
  }

  showAutoGeneratePlaneRoofsConfirm(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Modal.confirm({
        title: ResourceManager.getString("plugin_roofsdrawing_setting_roofs"),
        okButtonContent: ResourceManager.getString("plugin_roofsdrawing_auto_generate_ok"),
        cancelButtonContent: ResourceManager.getString("plugin_roofsdrawing_auto_generate_cancel"),
        content: ResourceManager.getString("plugin_roofsdrawing_auto_generate_tip"),
        enableCheckbox: false,
        onOk: () => {
          resolve(true);
        },
        onCancel: () => {
          reject(false);
        },
        onClose: () => {
          reject(false);
        }
      });
    });
  }
}