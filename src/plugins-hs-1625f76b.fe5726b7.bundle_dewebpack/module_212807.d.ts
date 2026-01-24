/**
 * Modal utility module for handling user confirmation dialogs
 * @module ModalUtils
 */

import { Modal } from './modal-component';
import { uuid } from './uuid-utils';

/**
 * State of the modal after user interaction
 */
type ModalState = 'ok' | 'cancel';

/**
 * Result object returned when modal is closed
 */
interface ModalResult {
  /** Unique identifier of the modal instance */
  key: string;
  /** Final state indicating user action */
  state: ModalState;
}

/**
 * Configuration options for modal dialog
 */
interface ModalOptions {
  /** Title text displayed in modal header */
  title?: string;
  /** Main content body of the modal */
  content?: React.ReactNode | string;
  /** Text for the confirmation button. If falsy, button is hidden */
  okButtonContent?: string;
  /** Text for the cancel button. If falsy, button is hidden */
  cancelButtonContent?: string;
  /** Whether the modal can be closed via close icon */
  closable?: boolean;
  /** Callback invoked when OK button is clicked */
  onOk?: () => void | Promise<void>;
  /** Callback invoked when Cancel button is clicked */
  onCancel?: () => void | Promise<void>;
}

/**
 * Opens a basic modal dialog and returns a promise that resolves when user interacts
 * @param options - Configuration for the modal dialog
 * @returns Promise resolving to the modal result containing key and state
 */
export function callModal(options: ModalOptions): Promise<ModalResult> {
  return new Promise<ModalResult>((resolve) => {
    const modalKey = uuid();

    Modal.basic({
      key: modalKey,
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
          key: modalKey,
          state: 'ok'
        });
      },
      onCancel: () => {
        resolve({
          key: modalKey,
          state: 'cancel'
        });
      }
    });
  });
}

/**
 * Opens a modal and automatically handles OK/Cancel callbacks with proper cleanup
 * Executes the appropriate callback based on user action and closes the modal
 * @param options - Configuration including callbacks for OK and Cancel actions
 * @returns Promise resolving to the modal result after callback execution
 */
export function callModelChange(options: ModalOptions): Promise<ModalResult> {
  return callModal(options).then((result) => {
    let callbackResult: void | Promise<void>;

    if (result.state === 'ok') {
      callbackResult = options.onOk?.call(options);
    } else if (result.state === 'cancel') {
      callbackResult = options.onCancel?.call(options);
    }

    if (callbackResult instanceof Promise) {
      return callbackResult.then(() => result);
    } else {
      Modal.close(result.key);
      return result;
    }
  });
}