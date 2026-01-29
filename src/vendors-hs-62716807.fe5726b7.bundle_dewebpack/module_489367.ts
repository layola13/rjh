import { ReactElement, useRef, createElement } from 'react';
import { ConfigConsumer } from './config-provider';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationConfig {
  prefixCls?: string;
  type?: NotificationType;
  [key: string]: any;
}

interface NotificationInstance {
  component: {
    add: (element: any, config: any) => void;
  };
}

interface NotificationAPI {
  open: (config: NotificationConfig) => void;
  success: (config: Omit<NotificationConfig, 'type'>) => void;
  info: (config: Omit<NotificationConfig, 'type'>) => void;
  warning: (config: Omit<NotificationConfig, 'type'>) => void;
  error: (config: Omit<NotificationConfig, 'type'>) => void;
  add: (element: any, config: any) => void;
}

interface HookResult {
  prefixCls: string;
  instance: NotificationInstance;
}

type GetPrefixClsFn = (suffixCls: string, customPrefixCls?: string) => string;

type OpenNotificationFn = (
  config: NotificationConfig,
  callback: (result: HookResult) => void
) => void;

type RenderNotificationFn = (config: NotificationConfig, prefixCls: string) => ReactElement;

export default function useNotification(
  openNotification: OpenNotificationFn,
  renderNotification: RenderNotificationFn
): () => [NotificationAPI, ReactElement] {
  return function (): [NotificationAPI, ReactElement] {
    let getPrefixCls: GetPrefixClsFn;
    let notificationInstance: NotificationInstance | null = null;

    const notificationProxy = {
      add: (element: any, config: any): void => {
        notificationInstance?.component.add(element, config);
      }
    };

    const [notificationElement, setNotificationElement] = useNotificationHook(notificationProxy);

    const apiRef = useRef<NotificationAPI>({} as NotificationAPI);

    apiRef.current.open = (config: NotificationConfig): void => {
      const customPrefixCls = config.prefixCls;
      const prefixCls = getPrefixCls('notification', customPrefixCls);

      openNotification(
        {
          ...config,
          prefixCls
        },
        (result: HookResult): void => {
          const { prefixCls: resultPrefixCls, instance } = result;
          notificationInstance = instance;
          setNotificationElement(renderNotification(config, resultPrefixCls));
        }
      );
    };

    const notificationTypes: NotificationType[] = ['success', 'info', 'warning', 'error'];
    
    notificationTypes.forEach((type: NotificationType): void => {
      apiRef.current[type] = (config: Omit<NotificationConfig, 'type'>): void => {
        apiRef.current.open({
          ...config,
          type
        });
      };
    });

    const holderElement = createElement(
      ConfigConsumer,
      { key: 'holder' },
      (context: { getPrefixCls: GetPrefixClsFn }): ReactElement => {
        getPrefixCls = context.getPrefixCls;
        return notificationElement;
      }
    );

    return [apiRef.current, holderElement];
  };
}

function useNotificationHook(proxy: { add: (element: any, config: any) => void }): [ReactElement, (element: ReactElement) => void] {
  // Placeholder for the actual hook implementation
  // This would typically use useState to manage the notification element
  const [element, setElement] = useState<ReactElement>(null as any);
  return [element, setElement];
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  // Simplified useState implementation placeholder
  let state = initialValue;
  const setState = (newValue: T): void => {
    state = newValue;
  };
  return [state, setState];
}