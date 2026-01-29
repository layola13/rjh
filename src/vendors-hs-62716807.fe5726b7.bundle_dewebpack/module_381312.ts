import React, { useRef, createElement, ReactElement } from 'react';
import { ConfigConsumer } from './config-provider';

interface NotificationConfig {
  prefixCls?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  [key: string]: any;
}

interface NotificationInstance {
  add: (element: ReactElement, config: NotificationConfig) => void;
  component?: {
    add: (element: ReactElement, config: NotificationConfig) => void;
  };
}

interface NotificationAPI {
  open: (config: NotificationConfig) => void;
  success: (config: NotificationConfig) => void;
  info: (config: NotificationConfig) => void;
  warning: (config: NotificationConfig) => void;
  error: (config: NotificationConfig) => void;
}

interface OpenCallback {
  (config: { prefixCls: string; instance: NotificationInstance }): void;
}

type NotificationCreator = (
  config: NotificationConfig,
  callback: OpenCallback
) => void;

type NotificationRenderer = (
  config: NotificationConfig,
  prefixCls: string
) => ReactElement;

export default function useNotification(
  createNotification: NotificationCreator,
  renderNotification: NotificationRenderer
): () => [NotificationAPI, ReactElement] {
  return function (): [NotificationAPI, ReactElement] {
    let getPrefixCls: ((suffixCls: string, customPrefix?: string) => string) | undefined;
    let notificationInstance: NotificationInstance | null = null;

    const holderAPI: Pick<NotificationInstance, 'add'> = {
      add: (element: ReactElement, config: NotificationConfig): void => {
        notificationInstance?.component?.add(element, config);
      }
    };

    const [holderElement, forceUpdate] = useForceUpdate(holderAPI);

    const apiRef = useRef<NotificationAPI>({} as NotificationAPI);

    apiRef.current.open = function (config: NotificationConfig): void {
      const customPrefixCls = config.prefixCls;
      const prefixCls = getPrefixCls?.('notification', customPrefixCls) ?? 'ant-notification';

      createNotification(
        {
          ...config,
          prefixCls
        },
        ({ prefixCls: resolvedPrefixCls, instance }: { prefixCls: string; instance: NotificationInstance }): void => {
          notificationInstance = instance;
          forceUpdate(renderNotification(config, resolvedPrefixCls));
        }
      );
    };

    const notificationTypes: Array<'success' | 'info' | 'warning' | 'error'> = ['success', 'info', 'warning', 'error'];
    
    notificationTypes.forEach((type) => {
      apiRef.current[type] = function (config: NotificationConfig): void {
        return apiRef.current.open({
          ...config,
          type
        });
      };
    });

    const configConsumerElement = createElement(
      ConfigConsumer,
      { key: 'holder' },
      (context: { getPrefixCls: (suffixCls: string, customPrefix?: string) => string }): ReactElement => {
        getPrefixCls = context.getPrefixCls;
        return holderElement;
      }
    );

    return [apiRef.current, configConsumerElement];
  };
}

function useForceUpdate(holderAPI: Pick<NotificationInstance, 'add'>): [ReactElement, (element: ReactElement) => void] {
  const [element, setElement] = React.useState<ReactElement>(<></>);
  
  return [
    element,
    (newElement: ReactElement): void => {
      setElement(newElement);
    }
  ];
}