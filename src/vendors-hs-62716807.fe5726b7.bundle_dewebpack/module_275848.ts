import * as React from 'react';
import Notification from 'rc-notification';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';

type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type NotificationType = 'success' | 'info' | 'error' | 'warning';

interface NotificationConfig {
  duration?: number;
  placement?: NotificationPlacement;
  bottom?: number;
  top?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  prefixCls?: string;
  rtl?: boolean;
}

interface NotificationInstance {
  notice: (config: NoticeConfig) => void;
  removeNotice: (key: string) => void;
  destroy: () => void;
}

interface NoticeConfig {
  content: React.ReactNode;
  duration: number;
  closable: boolean;
  onClose?: () => void;
  onClick?: () => void;
  key?: string;
  style?: React.CSSProperties;
  className?: string;
}

interface ArgsProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  onClick?: () => void;
  duration?: number;
  icon?: React.ReactNode;
  placement?: NotificationPlacement;
  style?: React.CSSProperties;
  className?: string;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  prefixCls?: string;
  type?: NotificationType;
}

interface NotificationInstanceProps {
  prefixCls: string;
  instance: NotificationInstance;
}

const notificationInstances: Record<string, Promise<NotificationInstance>> = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPrefixCls = 'ant-notification';
let defaultPlacement: NotificationPlacement = 'topRight';
let defaultRtl = false;
let defaultGetContainer: (() => HTMLElement) | undefined;
let defaultCloseIcon: React.ReactNode | undefined;

function getPlacementStyle(
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom
): React.CSSProperties {
  let style: React.CSSProperties;

  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      };
  }

  return style;
}

function getNotificationInstance(
  args: ArgsProps,
  callback: (props: NotificationInstanceProps) => void
): void {
  const {
    placement = defaultPlacement,
    top,
    bottom,
    getContainer = defaultGetContainer,
    closeIcon = defaultCloseIcon,
    prefixCls = defaultPrefixCls,
  } = args;

  const noticePrefixCls = `${prefixCls}-notice`;
  const cacheKey = `${prefixCls}-${placement}`;
  const existingInstance = notificationInstances[cacheKey];

  if (existingInstance) {
    Promise.resolve(existingInstance).then((instance) => {
      callback({
        prefixCls: noticePrefixCls,
        instance,
      });
    });
  } else {
    const closeIconNode = React.createElement(
      'span',
      {
        className: `${prefixCls}-close-x`,
      },
      closeIcon || React.createElement(CloseOutlined, {
        className: `${prefixCls}-close-icon`,
      })
    );

    const className = classNames(
      `${prefixCls}-${placement}`,
      {
        [`${prefixCls}-rtl`]: defaultRtl === true,
      }
    );

    notificationInstances[cacheKey] = new Promise((resolve) => {
      Notification.newInstance(
        {
          prefixCls,
          className,
          style: getPlacementStyle(placement, top, bottom),
          getContainer,
          closeIcon: closeIconNode,
        },
        (instance) => {
          resolve(instance);
          callback({
            prefixCls: noticePrefixCls,
            instance,
          });
        }
      );
    });
  }
}

const iconMap: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

function createNoticeConfig(args: ArgsProps, prefixCls: string): NoticeConfig {
  const duration = args.duration === undefined ? defaultDuration : args.duration;
  let iconNode: React.ReactNode = null;

  if (args.icon) {
    iconNode = React.createElement(
      'span',
      {
        className: `${prefixCls}-icon`,
      },
      args.icon
    );
  } else if (args.type) {
    const IconComponent = iconMap[args.type] || null;
    iconNode = React.createElement(IconComponent, {
      className: `${prefixCls}-icon ${prefixCls}-icon-${args.type}`,
    });
  }

  const autoMarginTag =
    !args.description && iconNode
      ? React.createElement('span', {
          className: `${prefixCls}-message-single-line-auto-margin`,
        })
      : null;

  return {
    content: React.createElement(
      'div',
      {
        className: iconNode ? `${prefixCls}-with-icon` : '',
        role: 'alert',
      },
      iconNode,
      React.createElement(
        'div',
        {
          className: `${prefixCls}-message`,
        },
        autoMarginTag,
        args.message
      ),
      React.createElement(
        'div',
        {
          className: `${prefixCls}-description`,
        },
        args.description
      ),
      args.btn
        ? React.createElement(
            'span',
            {
              className: `${prefixCls}-btn`,
            },
            args.btn
          )
        : null
    ),
    duration,
    closable: true,
    onClose: args.onClose,
    onClick: args.onClick,
    key: args.key,
    style: args.style || {},
    className: args.className,
  };
}

const notificationApi = {
  open: (args: ArgsProps): void => {
    getNotificationInstance(args, ({ prefixCls, instance }) => {
      instance.notice(createNoticeConfig(args, prefixCls));
    });
  },

  close: (key: string): void => {
    Object.keys(notificationInstances).forEach((cacheKey) => {
      Promise.resolve(notificationInstances[cacheKey]).then((instance) => {
        instance.removeNotice(key);
      });
    });
  },

  config: (options: NotificationConfig): void => {
    const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls, rtl } = options;

    if (prefixCls !== undefined) {
      defaultPrefixCls = prefixCls;
    }
    if (duration !== undefined) {
      defaultDuration = duration;
    }
    if (placement !== undefined) {
      defaultPlacement = placement;
    } else if (rtl) {
      defaultPlacement = 'topLeft';
    }
    if (bottom !== undefined) {
      defaultBottom = bottom;
    }
    if (top !== undefined) {
      defaultTop = top;
    }
    if (getContainer !== undefined) {
      defaultGetContainer = getContainer;
    }
    if (closeIcon !== undefined) {
      defaultCloseIcon = closeIcon;
    }
    if (rtl !== undefined) {
      defaultRtl = rtl;
    }
  },

  destroy: (): void => {
    Object.keys(notificationInstances).forEach((cacheKey) => {
      Promise.resolve(notificationInstances[cacheKey]).then((instance) => {
        instance.destroy();
      });
      delete notificationInstances[cacheKey];
    });
  },
};

(['success', 'info', 'warning', 'error'] as const).forEach((type) => {
  notificationApi[type] = (args: ArgsProps) => {
    return notificationApi.open({
      ...args,
      type,
    });
  };
});

notificationApi.warn = notificationApi.warning;

notificationApi.useNotification = (
  getNotificationInstance: typeof getNotificationInstance,
  createNoticeConfig: typeof createNoticeConfig
) => {
  // Hook implementation placeholder
  return [notificationApi, React.createElement('div')];
};

export async function getInstance(args: ArgsProps): Promise<null> {
  return null;
}

export default notificationApi;