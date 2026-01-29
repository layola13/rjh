import { useState, useRef, createElement } from 'react';
import { ConfigConsumer } from './config-provider';
import { useNotification } from './notification';
import { getKeyThenIncreaseKey, attachTypeApi } from './utils';

interface MessageConfig {
  prefixCls?: string;
  key?: string | number;
  onClose?: () => void;
  [key: string]: any;
}

interface NoticeComponent {
  add: (element: React.ReactNode, config: any) => void;
  removeNotice: (key: string | number) => void;
}

interface NotificationInstance {
  component: NoticeComponent;
}

type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

interface MessageApi {
  open: (config: MessageConfig) => MessagePromiseReturn;
  success: (config: MessageConfig) => MessagePromiseReturn;
  info: (config: MessageConfig) => MessagePromiseReturn;
  warning: (config: MessageConfig) => MessagePromiseReturn;
  error: (config: MessageConfig) => MessagePromiseReturn;
  loading: (config: MessageConfig) => MessagePromiseReturn;
}

interface MessagePromiseReturn {
  (): void;
  then: <T = any>(
    onfulfilled?: ((value: boolean) => T | PromiseLike<T>) | null,
    onrejected?: ((reason: any) => T | PromiseLike<T>) | null
  ) => Promise<T>;
  promise: Promise<boolean>;
}

type GetPrefixClsFn = (suffixCls: string, customizePrefixCls?: string) => string;

type RenderMessageFn = (
  config: MessageConfig,
  prefixCls: string
) => React.ReactNode;

type InitMessageFn = (
  config: MessageConfig,
  callback: (result: { prefixCls: string; instance: NotificationInstance }) => void
) => void;

export default function createUseMessage(
  initMessage: InitMessageFn,
  renderMessage: RenderMessageFn
): () => [MessageApi, React.ReactElement] {
  return function useMessage(): [MessageApi, React.ReactElement] {
    let getPrefixCls: GetPrefixClsFn;
    let notificationInstance: NotificationInstance | null = null;

    const notificationApi = {
      add: (element: React.ReactNode, config: any): void => {
        notificationInstance?.component.add(element, config);
      }
    };

    const [notificationContent, updateNotification] = useNotification(notificationApi);

    const apiRef = useRef<MessageApi>({} as MessageApi);

    apiRef.current.open = function open(config: MessageConfig): MessagePromiseReturn {
      const prefixCls = getPrefixCls('message', config.prefixCls);
      const key = config.key ?? getKeyThenIncreaseKey();

      const closePromise = new Promise<boolean>((resolve) => {
        const handleClose = (): void => {
          if (typeof config.onClose === 'function') {
            config.onClose();
          }
          resolve(true);
        };

        initMessage(
          {
            ...config,
            prefixCls
          },
          (result: { prefixCls: string; instance: NotificationInstance }) => {
            const { prefixCls: resultPrefixCls, instance } = result;
            notificationInstance = instance;

            updateNotification(
              renderMessage(
                {
                  ...config,
                  key,
                  onClose: handleClose
                },
                resultPrefixCls
              )
            );
          }
        );
      });

      const destroy = (): void => {
        if (notificationInstance) {
          notificationInstance.removeNotice(key);
        }
      };

      const destroyWithPromise = destroy as MessagePromiseReturn;
      destroyWithPromise.then = function <T = any>(
        onfulfilled?: ((value: boolean) => T | PromiseLike<T>) | null,
        onrejected?: ((reason: any) => T | PromiseLike<T>) | null
      ): Promise<T> {
        return closePromise.then(onfulfilled, onrejected);
      };
      destroyWithPromise.promise = closePromise;

      return destroyWithPromise;
    };

    const messageTypes: MessageType[] = ['success', 'info', 'warning', 'error', 'loading'];
    messageTypes.forEach((type: MessageType) => {
      attachTypeApi(apiRef.current, type);
    });

    const holderElement = createElement(
      ConfigConsumer,
      { key: 'holder' },
      (context: { getPrefixCls: GetPrefixClsFn }) => {
        getPrefixCls = context.getPrefixCls;
        return notificationContent;
      }
    );

    return [apiRef.current, holderElement];
  };
}