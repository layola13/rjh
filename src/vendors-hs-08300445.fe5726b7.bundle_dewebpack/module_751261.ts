import React, { Component, ReactNode, MouseEvent, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

interface NoticeProps {
  prefixCls: string;
  className?: string;
  closable?: boolean;
  closeIcon?: ReactNode;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onClose?: (key: string) => void;
  children?: ReactNode;
  holder?: HTMLElement;
  noticeKey: string;
  duration?: number;
  updateMark?: string | number;
  visible?: boolean;
  [key: `data-${string}`]: unknown;
  [key: `aria-${string}`]: unknown;
  role?: string;
}

class Notice extends Component<NoticeProps> {
  static defaultProps = {
    onClose: () => {},
    duration: 1.5,
  };

  private closeTimer: number | null = null;

  componentDidMount(): void {
    this.startCloseTimer();
  }

  componentDidUpdate(prevProps: NoticeProps): void {
    if (
      this.props.duration !== prevProps.duration ||
      this.props.updateMark !== prevProps.updateMark ||
      (this.props.visible !== prevProps.visible && this.props.visible)
    ) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount(): void {
    this.clearCloseTimer();
  }

  close = (event?: MouseEvent<HTMLAnchorElement>): void => {
    event?.stopPropagation();
    this.clearCloseTimer();

    const { onClose, noticeKey } = this.props;
    onClose?.(noticeKey);
  };

  startCloseTimer = (): void => {
    if (this.props.duration) {
      this.closeTimer = window.setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  };

  clearCloseTimer = (): void => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  };

  restartCloseTimer(): void {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  render(): ReactNode {
    const {
      prefixCls,
      className,
      closable,
      closeIcon,
      style,
      onClick,
      children,
      holder,
    } = this.props;

    const noticeClass = `${prefixCls}-notice`;

    const dataAndAriaProps = Object.keys(this.props).reduce<Record<string, unknown>>((acc, key) => {
      if (
        key.startsWith('data-') ||
        key.startsWith('aria-') ||
        key === 'role'
      ) {
        acc[key] = this.props[key as keyof NoticeProps];
      }
      return acc;
    }, {});

    const noticeElement = (
      <div
        className={classNames(noticeClass, className, {
          [`${noticeClass}-closable`]: closable,
        })}
        style={style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
        onClick={onClick}
        {...dataAndAriaProps}
      >
        <div className={`${noticeClass}-content`}>{children}</div>
        {closable ? (
          <a
            tabIndex={0}
            onClick={this.close}
            className={`${noticeClass}-close`}
          >
            {closeIcon || <span className={`${noticeClass}-close-x`} />}
          </a>
        ) : null}
      </div>
    );

    return holder ? ReactDOM.createPortal(noticeElement, holder) : noticeElement;
  }
}

export default Notice;