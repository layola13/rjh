import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import Notification from 'rc-notification';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import useNotification from './useNotification';

interface NotificationInstance {
  notice(config: NoticeConfig): void;
  removeNotice(key: string): void;
  destroy(): void;
}

type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

type IconType = 'success' | 'info' | 'error' | 'warning';

interface NotificationConfig {
  placement?: NotificationPlacement;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  prefixCls?: string;
  duration?: number;
  rtl?: boolean;
}

interface NotificationArgsProps {
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
  type?: IconType;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  prefixCls?: string;
}

interface NoticeConfig {
  content: React.ReactNode;
  duration: number;
  closable: boolean;
  onClose?: () => void;
  onClick?: () => void;
  key?: string;
  style: React.CSSProperties;
  className?: string;
}

interface NotificationInstanceCallback {
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
  config: NotificationArgsProps,
  callback: (result: NotificationInstanceCallback) => void
): void {
  const placement = config.placement ?? defaultPlacement;
  const top = config.top;
  const bottom = config.bottom;
  const getContainer = config.getContainer ?? defaultGetContainer;
  const closeIcon = config.closeIcon ?? defaultCloseIcon;
  const prefixCls = config.prefixCls || defaultPrefixCls;
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
    const closeIconElement = React.createElement(
      'span',
      {
        className: `${prefixCls}-close-x`,
      },
      closeIcon ||
        React.createElement(CloseOutlined, {
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
          closeIcon: closeIconElement,
        },
        (instance: NotificationInstance) => {
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

const iconMap: Record<IconType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

function createNoticeConfig(
  config: NotificationArgsProps,
  prefixCls: string
): NoticeConfig {
  const duration = config.duration !== undefined ? config.duration : defaultDuration;
  let iconNode: React.ReactNode = null;

  if (config.icon) {
    iconNode = React.createElement(
      'span',
      {
        className: `${prefixCls}-icon`,
      },
      config.icon
    );
  } else if (config.type) {
    const IconComponent = iconMap[config.type] || null;
    if (IconComponent) {
      iconNode = React.createElement(IconComponent, {
        className: `${prefixCls}-icon ${prefixCls}-icon-${config.type}`,
      });
    }
  }

  const autoMarginTag =
    !config.description && iconNode
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
        config.message
      ),
      React.createElement(
        'div',
        {
          className: `${prefixCls}-description`,
        },
        config.description
      ),
      config.btn
        ? React.createElement(
            'span',
            {
              className: `${prefixCls}-btn`,
            },
            config.btn
          )
        : null
    ),
    duration,
    closable: true,
    onClose: config.onClose,
    onClick: config.onClick,
    key: config.key,
    style: config.style || {},
    className: config.className,
  };
}

const notificationApi = {
  open(config: NotificationArgsProps): void {
    getNotificationInstance(config, ({ prefixCls, instance }) => {
      instance.notice(createNoticeConfig(config, prefixCls));
    });
  },

  close(key: string): void {
    Object.keys(notificationInstances).forEach((cacheKey) => {
      Promise.resolve(notificationInstances[cacheKey]).then((instance) => {
        instance.removeNotice(key);
      });
    });
  },

  config(config: NotificationConfig): void {
    const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls, rtl } = config;

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

  destroy(): void {
    Object.keys(notificationInstances).forEach((cacheKey) => {
      Promise.resolve(notificationInstances[cacheKey]).then((instance) => {
        instance.destroy();
      });
      delete notificationInstances[cacheKey];
    });
  },

  success(config: NotificationArgsProps): void {
    return this.open({
      ...config,
      type: 'success',
    });
  },

  info(config: NotificationArgsProps): void {
    return this.open({
      ...config,
      type: 'info',
    });
  },

  warning(config: NotificationArgsProps): void {
    return this.open({
      ...config,
      type: 'warning',
    });
  },

  error(config: NotificationArgsProps): void {
    return this.open({
      ...config,
      type: 'error',
    });
  },

  warn(config: NotificationArgsProps): void {
    return this.warning(config);
  },

  useNotification: useNotification(getNotificationInstance, createNoticeConfig),
};

export async function getInstance(config?: NotificationArgsProps): Promise<null> {
  return null;
}

export default notificationApi;