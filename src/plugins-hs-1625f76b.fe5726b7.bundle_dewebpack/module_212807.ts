import { Modal } from './modal';
import { uuid } from './uuid';

interface CallModalOptions {
  title?: string;
  content?: string;
  okButtonContent?: string;
  cancelButtonContent?: string;
  closable?: boolean;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

interface ModalResult {
  key: string;
  state: 'ok' | 'cancel';
}

function callModal(options: CallModalOptions): Promise<ModalResult> {
  return new Promise((resolve) => {
    const key = uuid();
    
    Modal.basic({
      key,
      title: options.title,
      content: options.content,
      hideOkButton: !options.okButtonContent,
      hideCancelButton: !options.cancelButtonContent,
      okButtonContent: options.okButtonContent,
      cancelButtonContent: options.cancelButtonContent,
      closable: options.closable ?? false,
      closeByOkButton: false,
      closeByCancelButton: false,
      enableCheckbox: false,
      onOk: () => {
        resolve({
          key,
          state: 'ok'
        });
      },
      onCancel: () => {
        resolve({
          key,
          state: 'cancel'
        });
      }
    });
  });
}

function callModelChange(options: CallModalOptions): Promise<ModalResult> {
  return callModal(options).then((result) => {
    let callback: void | Promise<void>;
    
    if (result.state === 'ok') {
      callback = options.onOk?.call(options);
    } else if (result.state === 'cancel') {
      callback = options.onCancel?.call(options);
    }
    
    if (callback instanceof Promise) {
      return callback.then(() => result);
    }
    
    Modal.close(result.key);
    return result;
  });
}

export { callModal, callModelChange };