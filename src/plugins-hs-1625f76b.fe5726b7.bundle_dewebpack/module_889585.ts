const CAROUSEL_PANEL_TOAST_DISABLED_FOREVER = "CAROUSEL_PANEL_TOAST_DISABLED_FOREVER";

const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.Catalog);

let disabledOnceState = false;

interface LiveHintOptions {
  canclose: boolean;
  closeCallback: () => void;
}

interface CarouselPanelToast {
  disabledOnce: boolean;
  disabledForever: boolean;
  show(): void;
  hide(): void;
  close(): void;
}

export const carouselPanelToast: CarouselPanelToast = {
  get disabledOnce(): boolean {
    return disabledOnceState;
  },

  set disabledOnce(value: boolean) {
    disabledOnceState = value;
  },

  get disabledForever(): boolean {
    return !!storage.get(CAROUSEL_PANEL_TOAST_DISABLED_FOREVER);
  },

  set disabledForever(value: boolean) {
    storage.set(CAROUSEL_PANEL_TOAST_DISABLED_FOREVER, value);
  },

  show(): void {
    if (this.disabledOnce || this.disabledForever) {
      return;
    }

    const message = ResourceManager.getString("livehint_press_shift_to_enable_multiple_entity_selection");
    
    const onConfirm = (): void => {
      this.disabledForever = true;
      this.disabledOnce = true;
      LiveHint.hide();
    };

    const options: LiveHintOptions = {
      canclose: true,
      closeCallback: (): void => {
        this.disabledOnce = true;
      }
    };

    LiveHint.show(message, undefined, onConfirm, options);
  },

  hide(): void {
    LiveHint.hide();
  },

  close(): void {
    this.hide();
    this.disabledOnce = false;
  }
};