import classNames from 'classnames';
import React from 'react';
import Notification from 'rc-notification';
import type { NotificationInstance } from 'rc-notification';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

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
  content: React.ReactNode;
  duration?: number;
  type?: NoticeType;
  onClose?: () => void;
  onClick?: () => void;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
  icon?: React.ReactNode;
}

interface NoticeOptions {
  key: string | number;
  duration: number | null;
  style: React.CSSProperties;
  className?: string;
  content: React.ReactNode;
  onClose?: () => void;
  onClick?: () => void;
}

interface MessageInstance {
  notice: (options: NoticeOptions) => void;
  removeNotice: (key: string | number) => void;
  destroy: () => void;
}

interface MessageApi {
  open: (options: MessageOptions) => MessageCloseFunction;
  config: (options: ConfigOptions) => void;
  destroy: (key?: string | number) => void;
  info: (content: React.ReactNode | MessageOptions, duration?: number, onClose?: () => void) => MessageCloseFunction;
  success: (content: React.ReactNode | MessageOptions, duration?: number, onClose?: () => void) => MessageCloseFunction;
  error: (content: React.ReactNode | MessageOptions, duration?: number, onClose?: () => void) => MessageCloseFunction;
  warning: (content: React.ReactNode | MessageOptions, duration?: number, onClose?: () => void) => MessageCloseFunction;
  warn: (content: React.ReactNode | MessageOptions, duration?: number, onClose?: () => void) => MessageCloseFunction;
  loading: (content: React.ReactNode | MessageOptions, duration?: number, onClose?: () => void) => MessageCloseFunction;
  useMessage: () => [MessageApi, React.ReactElement];
}

interface MessageCloseFunction {
  (): void;
  then: (fulfilled: () => void, rejected?: () => void) => Promise<boolean>;
  promise: Promise<boolean>;
}

let messageInstance: MessageInstance | null = null;
let defaultTop: number | undefined;
let defaultGetContainer: (() => HTMLElement) | undefined;
let defaultMaxCount: number | undefined;
let currentKeyCounter = 1;
let defaultPrefixCls = 'ant-message';
let defaultTransitionName = 'move-up';
let defaultDuration = 3;
let isRtl = false;

const iconMap: Record<NoticeType, React.ComponentType> = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  loading: LoadingOutlined,
};

export function getKeyThenIncreaseKey(): number {
  return currentKeyCounter++;
}

function getMessageInstance(
  options: MessageOptions,
  callback: (result: { prefixCls: string; instance: MessageInstance }) => void
): void {
  const prefixCls = options.prefixCls || defaultPrefixCls;

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
      transitionName: defaultTransitionName,
      style: {
        top: defaultTop,
      },
      getContainer: defaultGetContainer,
      maxCount: defaultMaxCount,
    },
    (instance: MessageInstance) => {
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

function createNoticeOptions(options: MessageOptions, prefixCls: string): NoticeOptions {
  const duration = options.duration !== undefined ? options.duration : defaultDuration;
  const IconComponent = options.type ? iconMap[options.type] : undefined;
  
  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${options.type}`]: options.type,
    [`${prefixCls}-rtl`]: isRtl === true,
  });

  return {
    key: options.key!,
    duration,
    style: options.style || {},
    className: options.className,
    content: (
      <div className={messageClass}>
        {options.icon || (IconComponent && <IconComponent />)}
        <span>{options.content}</span>
      </div>
    ),
    onClose: options.onClose,
    onClick: options.onClick,
  };
}

function isMessageOptions(content: unknown): content is MessageOptions {
  return (
    Object.prototype.toString.call(content) === '[object Object]' &&
    !!(content as MessageOptions).content
  );
}

const messageApi: MessageApi = {
  open(options: MessageOptions): MessageCloseFunction {
    const key = options.key || currentKeyCounter++;
    
    const closePromise = new Promise<boolean>((resolve) => {
      const handleClose = () => {
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
        resolve(true);
      };

      getMessageInstance(options, ({ prefixCls, instance }) => {
        instance.notice(
          createNoticeOptions(
            {
              ...options,
              key,
              onClose: handleClose,
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

    (close as MessageCloseFunction).then = (fulfilled, rejected) => {
      return closePromise.then(fulfilled, rejected);
    };
    (close as MessageCloseFunction).promise = closePromise;

    return close as MessageCloseFunction;
  },

  config(options: ConfigOptions): void {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null;
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      defaultPrefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      defaultGetContainer = options.getContainer;
    }
    if (options.transitionName !== undefined) {
      defaultTransitionName = options.transitionName;
      messageInstance = null;
    }
    if (options.maxCount !== undefined) {
      defaultMaxCount = options.maxCount;
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
        messageInstance.destroy();
        messageInstance = null;
      }
    }
  },

  info: () => {
    throw new Error('Not implemented');
  },
  success: () => {
    throw new Error('Not implemented');
  },
  error: () => {
    throw new Error('Not implemented');
  },
  warning: () => {
    throw new Error('Not implemented');
  },
  warn: () => {
    throw new Error('Not implemented');
  },
  loading: () => {
    throw new Error('Not implemented');
  },
  useMessage: () => {
    throw new Error('Not implemented');
  },
};

export function attachTypeApi(api: MessageApi, type: NoticeType): void {
  api[type] = (
    content: React.ReactNode | MessageOptions,
    duration?: number,
    onClose?: () => void
  ): MessageCloseFunction => {
    if (isMessageOptions(content)) {
      return api.open({
        ...content,
        type,
      });
    }

    let actualOnClose = onClose;
    if (typeof duration === 'function') {
      actualOnClose = duration;
      duration = undefined;
    }

    return api.open({
      content,
      duration,
      type,
      onClose: actualOnClose,
    });
  };
}

const messageTypes: NoticeType[] = ['success', 'info', 'warning', 'error', 'loading'];
messageTypes.forEach((type) => {
  attachTypeApi(messageApi, type);
});

messageApi.warn = messageApi.warning;

export function getInstance(): null {
  return null;
}

export default messageApi;