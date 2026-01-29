import React, { useRef } from 'react';
import { ConfigConsumer } from './config-provider';
import { getKeyThenIncreaseKey, attachTypeApi } from './utils';
import useNotification from './useNotification';

type NoticeType = 'success' | 'info' | 'warning' | 'error' | 'loading';

interface MessageConfig {
  prefixCls?: string;
  key?: string | number;
  onClose?: () => void;
  [key: string]: unknown;
}

interface NoticeInstance {
  component: {
    add: (element: React.ReactElement, config: unknown) => void;
  };
  removeNotice: (key: string | number) => void;
}

interface MessagePromise {
  (): void;
  then: <T = boolean>(
    onFulfilled?: (value: boolean) => T | PromiseLike<T>,
    onRejected?: (reason: unknown) => T | PromiseLike<T>
  ) => Promise<T>;
  promise: Promise<boolean>;
}

interface MessageApi {
  open: (config: MessageConfig) => MessagePromise;
  success: (config: MessageConfig) => MessagePromise;
  info: (config: MessageConfig) => MessagePromise;
  warning: (config: MessageConfig) => MessagePromise;
  error: (config: MessageConfig) => MessagePromise;
  loading: (config: MessageConfig) => MessagePromise;
}

type GetPrefixCls = (suffixCls: string, customizePrefixCls?: string) => string;

type RenderMessageFn = (
  config: MessageConfig,
  callback: (result: { prefixCls: string; instance: NoticeInstance }) => void
) => void;

type CreateNoticeFn = (
  config: MessageConfig,
  prefixCls: string
) => React.ReactElement;

export default function useMessage(
  renderMessage: RenderMessageFn,
  createNotice: CreateNoticeFn
): [MessageApi, React.ReactElement] {
  let getPrefixCls: GetPrefixCls;
  let noticeInstance: NoticeInstance | null = null;

  const holderApi = {
    add: (element: React.ReactElement, config: unknown): void => {
      noticeInstance?.component.add(element, config);
    }
  };

  const [noticeElement, updateNoticeElement] = useNotification(holderApi);

  const apiRef = useRef<MessageApi>({} as MessageApi);

  apiRef.current.open = (config: MessageConfig): MessagePromise => {
    const prefixCls = getPrefixCls('message', config.prefixCls);
    const key = config.key ?? getKeyThenIncreaseKey();

    const promise = new Promise<boolean>((resolve) => {
      const handleClose = (): boolean => {
        if (typeof config.onClose === 'function') {
          config.onClose();
        }
        return resolve(true);
      };

      renderMessage(
        {
          ...config,
          prefixCls
        },
        (result) => {
          const { prefixCls: resultPrefixCls, instance } = result;
          noticeInstance = instance;
          updateNoticeElement(
            createNotice(
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

    const closeFunction = (): void => {
      noticeInstance?.removeNotice(key);
    };

    const messagePromise = closeFunction as MessagePromise;
    messagePromise.then = <T = boolean>(
      onFulfilled?: (value: boolean) => T | PromiseLike<T>,
      onRejected?: (reason: unknown) => T | PromiseLike<T>
    ): Promise<T> => {
      return promise.then(onFulfilled, onRejected);
    };
    messagePromise.promise = promise;

    return messagePromise;
  };

  const noticeTypes: NoticeType[] = ['success', 'info', 'warning', 'error', 'loading'];
  noticeTypes.forEach((type) => {
    attachTypeApi(apiRef.current, type);
  });

  const holder = React.createElement(ConfigConsumer, {
    key: 'holder'
  }, (context: { getPrefixCls: GetPrefixCls }) => {
    getPrefixCls = context.getPrefixCls;
    return noticeElement;
  });

  return [apiRef.current, holder];
}