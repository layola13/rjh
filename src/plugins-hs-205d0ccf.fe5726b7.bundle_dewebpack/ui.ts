interface ModalCallbackParams {
  key: string;
}

interface LogoutCallbackParams {
  key: string;
  saveDesign: boolean;
}

interface CheckboxConfig {
  checkboxText: string;
  checkState: boolean;
  callback: (checked: boolean) => void;
}

interface ModalOptions {
  title: string;
  content: string;
  okButtonContent: string;
  cancelButtonContent: string;
  closable: boolean;
  checkbox?: CheckboxConfig;
  disableOk?: boolean;
  disableCancel?: boolean;
  onOk?: (params: ModalCallbackParams) => void;
  onCancel?: (params: ModalCallbackParams) => void;
}

interface LoginOptions {
  disableOk?: boolean;
  disableCancel?: boolean;
  onOk?: (params: ModalCallbackParams) => void;
  onCancel?: (params: ModalCallbackParams) => void;
}

interface LogoutOptions {
  disableOk?: boolean;
  disableCancel?: boolean;
  onOk?: (params: LogoutCallbackParams) => void;
  onCancel?: (params: LogoutCallbackParams) => void;
}

interface AuthPopupConfig {
  title: string;
  description: string;
  checkbox?: CheckboxConfig;
  diablePrev?: boolean;
  diableNext?: boolean;
  prev: {
    text: string;
    icon: string;
    onClick: () => void;
  };
  next: {
    text: string;
    icon: string;
    onClick: () => void;
  };
}

interface AuthPopup {
  new (config: AuthPopupConfig): {
    show: () => void;
    hide: () => void;
  };
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSApp: {
  UI: {
    AuthPopup: AuthPopup;
  };
};

import { Modal } from './Modal';
import { uuid } from './utils';

export class UI {
  showLogin(options: LoginOptions): void {
    const title = ResourceManager.getString("plugin_single_device_login_continue_title");
    const content = ResourceManager.getString("plugin_single_device_login_continue_content");
    const okButtonContent = ResourceManager.getString("plugin_single_device_login_continue_ok_btn");
    const cancelButtonContent = ResourceManager.getString("plugin_single_device_login_continue_cancel_btn");

    return this.callModal({
      title,
      content,
      okButtonContent,
      cancelButtonContent,
      closable: false,
      disableOk: options.disableOk,
      disableCancel: options.disableCancel,
      onOk: options.onOk,
      onCancel: options.onCancel
    });
  }

  showLogout(options: LogoutOptions): void {
    const title = ResourceManager.getString("plugin_single_device_login_logout_title");
    const content = ResourceManager.getString("plugin_single_device_login_logout_content");
    const okButtonContent = ResourceManager.getString("plugin_single_device_login_logout_ok_btn");
    const cancelButtonContent = ResourceManager.getString("plugin_single_device_login_logout_cancel_btn");
    const checkboxText = ResourceManager.getString("plugin_single_device_login_logout_save_design");
    
    let saveDesignState = false;

    return this.callModal({
      title,
      content,
      okButtonContent,
      cancelButtonContent,
      closable: false,
      checkbox: {
        checkboxText,
        checkState: saveDesignState,
        callback: (checked: boolean) => {
          saveDesignState = checked;
        }
      },
      disableOk: options.disableOk,
      disableCancel: options.disableCancel,
      onOk: (params: ModalCallbackParams) => {
        options.onOk?.({
          key: params.key,
          saveDesign: saveDesignState
        });
      },
      onCancel: (params: ModalCallbackParams) => {
        options.onCancel?.({
          key: params.key,
          saveDesign: saveDesignState
        });
      }
    });
  }

  closeModal(key: string): void {
    Modal.close(key);
  }

  private callModal(options: ModalOptions): void {
    const modalKey = uuid();
    
    const authPopup = new HSApp.UI.AuthPopup({
      title: options.title,
      description: options.content,
      checkbox: options.checkbox,
      diablePrev: options.disableCancel,
      diableNext: options.disableOk,
      prev: {
        text: options.cancelButtonContent,
        icon: "hs_xian_tuichudenglu",
        onClick: () => {
          options.onCancel?.({ key: modalKey });
          authPopup.hide();
        }
      },
      next: {
        text: options.okButtonContent,
        icon: "hs_xian_go",
        onClick: () => {
          options.onOk?.({ key: modalKey });
          authPopup.hide();
        }
      }
    });

    authPopup.show();
  }
}