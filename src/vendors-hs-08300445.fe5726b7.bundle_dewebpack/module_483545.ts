import { useRef, useState, createElement, Fragment } from 'react';
import type { ReactElement, ReactNode } from 'react';

interface NotificationInstance {
  add: (
    config: NotificationConfig,
    callback: (holder: HTMLElement | null, config: NotificationConfig) => void
  ) => void;
}

interface NotificationConfig {
  key: string;
  holder?: HTMLElement | null;
  [key: string]: unknown;
}

type NotificationElement = ReactElement;

interface UseNotificationReturn {
  0: (config: NotificationConfig) => void;
  1: ReactElement;
}

export default function useNotification(
  instance: NotificationInstance
): UseNotificationReturn {
  const notificationMapRef = useRef<Record<string, NotificationElement>>({});
  const [notifications, setNotifications] = useState<NotificationElement[]>([]);

  const addNotification = (config: NotificationConfig): void => {
    let isFirstRender = true;

    instance.add(config, (holder: HTMLElement | null, callbackConfig: NotificationConfig) => {
      const { key } = callbackConfig;

      if (holder && (!notificationMapRef.current[key] || isFirstRender)) {
        const notificationElement = createElement(NotificationComponent, {
          ...callbackConfig,
          holder,
        });

        notificationMapRef.current[key] = notificationElement;

        setNotifications((prevNotifications) => {
          const existingIndex = prevNotifications.findIndex(
            (notification) => (notification as any).key === callbackConfig.key
          );

          if (existingIndex === -1) {
            return [...prevNotifications, notificationElement];
          }

          const updatedNotifications = [...prevNotifications];
          updatedNotifications[existingIndex] = notificationElement;
          return updatedNotifications;
        });
      }

      isFirstRender = false;
    });
  };

  const notificationContainer = createElement(Fragment, null, notifications);

  return [addNotification, notificationContainer] as UseNotificationReturn;
}

// Placeholder for the actual NotificationComponent import
// In the original code this would be: import NotificationComponent from './NotificationComponent';
declare const NotificationComponent: React.ComponentType<NotificationConfig & { holder: HTMLElement | null }>;