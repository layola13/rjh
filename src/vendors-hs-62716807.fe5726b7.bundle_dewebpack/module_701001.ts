import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InfoCircleOutlined from './icons/InfoCircleOutlined';
import CheckCircleOutlined from './icons/CheckCircleOutlined';
import CloseCircleOutlined from './icons/CloseCircleOutlined';
import ExclamationCircleOutlined from './icons/ExclamationCircleOutlined';
import { getConfirmLocale } from './locale';
import { destroyFns } from './destroyFns';
import ConfirmDialog from './ConfirmDialog';

interface ModalConfig {
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  icon?: React.ReactNode;
  okCancel?: boolean;
  okText?: string;
  cancelText?: string;
  prefixCls?: string;
  onCancel?: (...args: any[]) => void;
  afterClose?: () => void;
  visible?: boolean;
  close?: () => void;
  [key: string]: any;
}

interface ModalInstance {
  destroy: () => void;
  update: (configUpdate: ModalConfig | ((prevConfig: ModalConfig) => ModalConfig)) => void;
}

interface CloseArgument {
  triggerCancel?: boolean;
  [key: string]: any;
}

let globalPrefixCls = 'ant';

function getRootPrefixCls(): string {
  return globalPrefixCls;
}

export function globalConfig(config: { rootPrefixCls?: string }): void {
  const { rootPrefixCls } = config;
  if (rootPrefixCls) {
    globalPrefixCls = rootPrefixCls;
  }
}

export function withInfo(config: ModalConfig): ModalConfig {
  return {
    type: 'info',
    icon: React.createElement(InfoCircleOutlined, null),
    okCancel: false,
    ...config
  };
}

export function withSuccess(config: ModalConfig): ModalConfig {
  return {
    type: 'success',
    icon: React.createElement(CheckCircleOutlined, null),
    okCancel: false,
    ...config
  };
}

export function withError(config: ModalConfig): ModalConfig {
  return {
    type: 'error',
    icon: React.createElement(CloseCircleOutlined, null),
    okCancel: false,
    ...config
  };
}

export function withWarn(config: ModalConfig): ModalConfig {
  return {
    type: 'warning',
    icon: React.createElement(ExclamationCircleOutlined, null),
    okCancel: false,
    ...config
  };
}

export function withConfirm(config: ModalConfig): ModalConfig {
  return {
    type: 'confirm',
    icon: React.createElement(ExclamationCircleOutlined, null),
    okCancel: true,
    ...config
  };
}

export default function confirm(config: ModalConfig): ModalInstance {
  const container = document.createElement('div');
  document.body.appendChild(container);

  let currentConfig: ModalConfig = {
    ...config,
    close: closeModal,
    visible: true
  };

  function destroy(...args: CloseArgument[]): void {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    const triggerCancel = args.some((arg) => arg && arg.triggerCancel);
    
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }

    for (let i = 0; i < destroyFns.length; i++) {
      if (destroyFns[i] === closeModal) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(props: ModalConfig): void {
    const { okText, cancelText, prefixCls, ...restProps } = props;

    setTimeout(() => {
      const locale = getConfirmLocale();
      ReactDOM.render(
        React.createElement(ConfirmDialog, {
          ...restProps,
          prefixCls: prefixCls ?? `${getRootPrefixCls()}-modal`,
          rootPrefixCls: getRootPrefixCls(),
          okText: okText ?? (restProps.okCancel ? locale.okText : locale.justOkText),
          cancelText: cancelText ?? locale.cancelText
        }),
        container
      );
    });
  }

  function closeModal(this: any, ...args: CloseArgument[]): void {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }
        destroy.apply(this, args);
      }
    };
    render(currentConfig);
  }

  function update(configUpdate: ModalConfig | ((prevConfig: ModalConfig) => ModalConfig)): void {
    currentConfig = typeof configUpdate === 'function' 
      ? configUpdate(currentConfig) 
      : { ...currentConfig, ...configUpdate };
    render(currentConfig);
  }

  render(currentConfig);
  destroyFns.push(closeModal);

  return {
    destroy: closeModal,
    update
  };
}