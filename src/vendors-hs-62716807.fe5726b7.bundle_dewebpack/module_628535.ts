import classNames from 'classnames';
import React from 'react';
import Notification from 'rc-notification';
import type { NotificationInstance } from 'rc-notification/lib/Notification';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import useMessage from './useMessage';

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}

interface MessageOptions {
  key?: string | number;
  type?: NoticeType;
  content: React.ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  onClick?: () => void;
}

interface NoticeOptions {
  key: string | number;
  duration: number;
  style: React.CSSProperties;
  className?: string;
  content: React.ReactNode;
  onClose?: () => void;
  onClick?: () => void;
}

interface MessageInstance {
  prefixCls: string;
  instance: NotificationInstance;
}

type MessageApi = (content: React.ReactNode, duration?: number, onClose?: () => void) => MessageReturn;

interface MessageReturn {
  (): void;
  then: (onFulfilled?: (value: boolean) => void, onRejected?: (reason: unknown) => void) => Promise<boolean>;
  promise: Promise<boolean>;
}

interface MessageApiWithType {
  open: (options: MessageOptions) => MessageReturn;
  config: (options: ConfigOptions) => void;
  destroy: (key?: string | number) => void;
  success: MessageApi;
  info: MessageApi;
  warning: MessageApi;
  warn: MessageApi;
  error: MessageApi;
  loading: MessageApi;
  useMessage: typeof useMessage;
}

let messageInstance: NotificationInstance | null = null;
let topOffset: number | undefined;
let getContainer: (() => HTMLElement) | undefined;
let maxCount: number | undefined;

const DEFAULT_DURATION = 3;
let globalKeyCounter = 1;
const DEFAULT_PREFIX_CLS = 'ant-message';
const DEFAULT_TRANSITION_NAME = 'move-up';
let isRtl = false;

function getMessageInstance(
  options: MessageOptions,
  callback: (instance: MessageInstance) => void
): void {
  const prefixCls = options.prefixCls || DEFAULT_PREFIX_CLS;

  if (messageInstance) {
    callback({
      prefixCls,
      instance: messageInstance,
    });
    return;
  }

  Notification.newInstance(
    {
      prefixCls,
      transitionName: DEFAULT_TRANSITION_NAME,
      style: {
        top: topOffset,
      },
      getContainer,
      maxCount,
    },
    (instance: NotificationInstance) => {
      if (messageInstance) {
        callback({
          prefixCls,
          instance: messageInstance,
        });
      } else {
        messageInstance = instance;
        callback({
          prefixCls,
          instance,
        });
      }
    }
  );
}

const iconMap: Record<NoticeType, React.ComponentType> = {
  info: InfoCircleOutlined,
  success: CheckCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
  loading: LoadingOutlined,
};

function createNoticeOptions(
  options: MessageOptions,
  prefixCls: string
): NoticeOptions {
  const duration = options.duration !== undefined ? options.duration : DEFAULT_DURATION;
  const IconComponent = iconMap[options.type!];
  const className = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${options.type}`]: options.type,
    [`${prefixCls}-rtl`]: isRtl === true,
  });

  return {
    key: options.key!,
    duration,
    style: options.style || {},
    className: options.className,
    content: React.createElement(
      'div',
      { className },
      options.icon || (IconComponent && React.createElement(IconComponent)),
      React.createElement('span', null, options.content)
    ),
    onClose: options.onClose,
    onClick: options.onClick,
  };
}

const messageApi: MessageApiWithType = {
  open(options: MessageOptions): MessageReturn {
    const key = options.key ?? globalKeyCounter++;

    const promise = new Promise<boolean>((resolve) => {
      const closeCallback = () => {
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
        return resolve(true);
      };

      getMessageInstance(options, ({ prefixCls, instance }) => {
        instance.notice(
          createNoticeOptions(
            {
              ...options,
              key,
              onClose: closeCallback,
            },
            prefixCls
          )
        );
      });
    });

    const close = () => {
      if (messageInstance) {
        messageInstance.removeNotice(key);
      }
    };

    (close as MessageReturn).then = (onFulfilled, onRejected) => {
      return promise.then(onFulfilled, onRejected);
    };
    (close as MessageReturn).promise = promise;

    return close as MessageReturn;
  },

  config(options: ConfigOptions): void {
    if (options.top !== undefined) {
      topOffset = options.top;
      messageInstance = null;
    }
    if (options.duration !== undefined) {
      DEFAULT_DURATION = options.duration;
    }
    if (options.prefixCls !== undefined) {
      DEFAULT_PREFIX_CLS = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
    if (options.transitionName !== undefined) {
      DEFAULT_TRANSITION_NAME = options.transitionName;
      messageInstance = null;
    }
    if (options.maxCount !== undefined) {
      maxCount = options.maxCount;
      messageInstance = null;
    }
    if (options.rtl !== undefined) {
      isRtl = options.rtl;
    }
  },

  destroy(key?: string | number): void {
    if (messageInstance) {
      if (key) {
        messageInstance.removeNotice(key);
      } else {
        const destroy = messageInstance.destroy;
        destroy();
        messageInstance = null;
      }
    }
  },

  success: null as unknown as MessageApi,
  info: null as unknown as MessageApi,
  warning: null as unknown as MessageApi,
  warn: null as unknown as MessageApi,
  error: null as unknown as MessageApi,
  loading: null as unknown as MessageApi,
  useMessage,
};

function attachTypeApi(api: MessageApiWithType, type: NoticeType): void {
  api[type] = (content: React.ReactNode | MessageOptions, duration?: number, onClose?: () => void): MessageReturn => {
    const isOptionsObject =
      Object.prototype.toString.call(content) === '[object Object]' &&
      !!(content as MessageOptions).content;

    if (isOptionsObject) {
      return api.open({
        ...(content as MessageOptions),
        type,
      });
    }

    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }

    return api.open({
      content,
      duration,
      type,
      onClose,
    });
  };
}

const messageTypes: NoticeType[] = ['success', 'info', 'warning', 'error', 'loading'];
messageTypes.forEach((type) => attachTypeApi(messageApi, type));

messageApi.warn = messageApi.warning;

export function getKeyThenIncreaseKey(): number {
  return globalKeyCounter++;
}

export function getInstance(): NotificationInstance | null {
  return null;
}

export { attachTypeApi };
export default messageApi;