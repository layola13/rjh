import { default as defaultModal } from './975820';
import { 
  default as modalImplementation, 
  withWarn, 
  withInfo, 
  withSuccess, 
  withError, 
  withConfirm, 
  globalConfig 
} from './701001';

interface ModalConfig {
  // Define modal configuration properties based on your application needs
  [key: string]: unknown;
}

interface ModalInstance {
  destroy: () => void;
}

interface Modal {
  (config: ModalConfig): ModalInstance;
  info: (config: ModalConfig) => ModalInstance;
  success: (config: ModalConfig) => ModalInstance;
  error: (config: ModalConfig) => ModalInstance;
  warning: (config: ModalConfig) => ModalInstance;
  warn: (config: ModalConfig) => ModalInstance;
  confirm: (config: ModalConfig) => ModalInstance;
  destroyAll: () => void;
  config: typeof globalConfig;
  destroyFns: Array<(() => void) | undefined>;
}

function createWarningModal(config: ModalConfig): ModalInstance {
  return modalImplementation(withWarn(config));
}

const modal = defaultModal as Modal;

modal.info = function (config: ModalConfig): ModalInstance {
  return modalImplementation(withInfo(config));
};

modal.success = function (config: ModalConfig): ModalInstance {
  return modalImplementation(withSuccess(config));
};

modal.error = function (config: ModalConfig): ModalInstance {
  return modalImplementation(withError(config));
};

modal.warning = createWarningModal;
modal.warn = createWarningModal;

modal.confirm = function (config: ModalConfig): ModalInstance {
  return modalImplementation(withConfirm(config));
};

modal.destroyAll = function (): void {
  while (defaultModal.destroyFns.length > 0) {
    const destroyFn = defaultModal.destroyFns.pop();
    if (destroyFn) {
      destroyFn();
    }
  }
};

modal.config = globalConfig;

export default modal;