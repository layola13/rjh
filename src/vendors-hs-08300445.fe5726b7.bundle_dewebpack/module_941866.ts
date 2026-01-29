import React, { Component, ReactNode, CSSProperties } from 'react';
import { CSSMotionList } from 'rc-motion';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Notice from './Notice';
import useNotification from './useNotification';

interface NoticeContent {
  key?: string;
  content: ReactNode;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  closeIcon?: ReactNode;
  props?: Record<string, unknown>;
  className?: string;
  style?: CSSProperties;
  updateMark?: string;
  userPassKey?: string;
}

interface NoticeItem {
  notice: NoticeContent;
  holderCallback?: (node: HTMLDivElement, props: NoticeProps) => void;
}

interface NoticeProps extends NoticeContent {
  prefixCls: string;
  noticeKey: string;
  visible?: boolean;
}

interface NotificationProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  transitionName?: string;
  animation?: string;
  maxCount?: number;
  closeIcon?: ReactNode;
}

interface NotificationState {
  notices: NoticeItem[];
}

interface NotificationInstance {
  notice: (config: NoticeContent) => void;
  removeNotice: (key: string) => void;
  component: Notification;
  destroy: () => void;
  useNotification: () => ReturnType<typeof useNotification>;
}

let notificationSeed = 0;
const notificationTimestamp = Date.now();

function generateNotificationKey(): string {
  const currentSeed = notificationSeed;
  notificationSeed += 1;
  return `rcNotification_${notificationTimestamp}_${currentSeed}`;
}

class Notification extends Component<NotificationProps, NotificationState> {
  static defaultProps: Partial<NotificationProps> = {
    prefixCls: 'rc-notification',
    animation: 'fade',
    style: {
      top: 65,
      left: '50%',
    },
  };

  static newInstance: (
    config: Omit<NotificationProps, 'ref'> & { getContainer?: () => HTMLElement },
    callback: (instance: NotificationInstance) => void
  ) => void;

  state: NotificationState = {
    notices: [],
  };

  hookRefs = new Map<string, HTMLDivElement>();
  noticePropsMap: Record<string, { props: NoticeProps; holderCallback?: NoticeItem['holderCallback'] }> = {};

  add = (notice: NoticeContent, holderCallback?: NoticeItem['holderCallback']): void => {
    const key = notice.key ?? generateNotificationKey();
    const noticeWithKey: NoticeContent = {
      ...notice,
      key,
    };
    const { maxCount } = this.props;

    this.setState((prevState) => {
      const { notices } = prevState;
      const existingIndex = notices.map((item) => item.notice.key).indexOf(key);
      const newNotices = [...notices];

      if (existingIndex !== -1) {
        newNotices.splice(existingIndex, 1, {
          notice: noticeWithKey,
          holderCallback,
        });
      } else {
        if (maxCount && notices.length >= maxCount) {
          noticeWithKey.key = newNotices[0].notice.key;
          noticeWithKey.updateMark = generateNotificationKey();
          noticeWithKey.userPassKey = key;
          newNotices.shift();
        }
        newNotices.push({
          notice: noticeWithKey,
          holderCallback,
        });
      }

      return { notices: newNotices };
    });
  };

  remove = (key: string): void => {
    this.setState((prevState) => ({
      notices: prevState.notices.filter((item) => {
        const { key: noticeKey, userPassKey } = item.notice;
        return (userPassKey ?? noticeKey) !== key;
      }),
    }));
  };

  getTransitionName(): string | undefined {
    const { prefixCls, animation, transitionName } = this.props;
    if (transitionName) {
      return transitionName;
    }
    if (animation) {
      return `${prefixCls}-${animation}`;
    }
    return undefined;
  }

  render(): ReactNode {
    const { notices } = this.state;
    const { prefixCls, className, closeIcon, style } = this.props;
    const motionKeys: string[] = [];

    notices.forEach((item, index) => {
      const { notice, holderCallback } = item;
      const updateMark = index === notices.length - 1 ? notice.updateMark : undefined;
      const { key, userPassKey, onClose, onClick, content, ...restNotice } = notice;

      const noticeProps: NoticeProps = {
        prefixCls: prefixCls!,
        closeIcon,
        ...restNotice,
        ...notice.props,
        key: key!,
        noticeKey: userPassKey ?? key!,
        updateMark,
        onClose: (noticeKey: string) => {
          this.remove(noticeKey);
          onClose?.();
        },
        onClick,
        children: content,
      };

      motionKeys.push(key!);
      this.noticePropsMap[key!] = {
        props: noticeProps,
        holderCallback,
      };
    });

    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <CSSMotionList
          keys={motionKeys}
          motionName={this.getTransitionName()}
          onVisibleChanged={(visible: boolean, info: { key: string }) => {
            if (!visible) {
              delete this.noticePropsMap[info.key];
            }
          }}
        >
          {({ key, className: motionClassName, style: motionStyle, visible }) => {
            const cachedItem = this.noticePropsMap[key];
            const { props, holderCallback } = cachedItem;

            if (holderCallback) {
              return (
                <div
                  key={key}
                  className={classNames(motionClassName, `${prefixCls}-hook-holder`)}
                  style={motionStyle}
                  ref={(node) => {
                    if (node) {
                      this.hookRefs.set(key, node);
                      holderCallback(node, props);
                    } else {
                      this.hookRefs.delete(key);
                    }
                  }}
                />
              );
            }

            return (
              <Notice
                {...props}
                className={classNames(motionClassName, props.className)}
                style={{ ...motionStyle, ...props.style }}
                visible={visible}
              />
            );
          }}
        </CSSMotionList>
      </div>
    );
  }
}

Notification.newInstance = (config, callback) => {
  const { getContainer, ...restConfig } = config ?? {};
  const containerDiv = document.createElement('div');

  if (getContainer) {
    getContainer().appendChild(containerDiv);
  } else {
    document.body.appendChild(containerDiv);
  }

  let callbackCalled = false;

  ReactDOM.render(
    <Notification
      {...restConfig}
      ref={(instance) => {
        if (!callbackCalled && instance) {
          callbackCalled = true;
          callback({
            notice: (noticeConfig: NoticeContent) => {
              instance.add(noticeConfig);
            },
            removeNotice: (key: string) => {
              instance.remove(key);
            },
            component: instance,
            destroy: () => {
              ReactDOM.unmountComponentAtNode(containerDiv);
              containerDiv.parentNode?.removeChild(containerDiv);
            },
            useNotification: () => useNotification(instance),
          });
        }
      }}
    />,
    containerDiv
  );
};

export default Notification;