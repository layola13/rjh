/**
 * Notice component props interface
 */
interface NoticeProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** Additional CSS class name */
  className?: string;
  /** Whether the notice can be closed */
  closable?: boolean;
  /** Custom close icon element */
  closeIcon?: React.ReactNode;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click handler for the notice */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Content to be displayed */
  children?: React.ReactNode;
  /** Portal container element */
  holder?: HTMLElement;
  /** Unique key for the notice */
  noticeKey: string | number;
  /** Callback when notice is closed */
  onClose?: (key: string | number) => void;
  /** Duration in seconds before auto-close (0 means no auto-close) */
  duration?: number;
  /** Mark to trigger update and restart timer */
  updateMark?: string | number;
  /** Visibility state */
  visible?: boolean;
  /** Additional data attributes */
  [key: `data-${string}`]: unknown;
  /** Additional aria attributes */
  [key: `aria-${string}`]: unknown;
  /** ARIA role attribute */
  role?: string;
}

/**
 * Notice component state
 */
interface NoticeState {}

/**
 * Individual notice item component with auto-close timer
 * Displays a notification message that can be manually or automatically closed
 */
export default class Notice extends React.Component<NoticeProps, NoticeState> {
  /**
   * Default props values
   */
  static defaultProps: Partial<NoticeProps> = {
    onClose: () => {},
    duration: 1.5,
  };

  /**
   * Timer handle for auto-close functionality
   */
  private closeTimer: number | null = null;

  /**
   * Close the notice
   * @param event - Optional click event (will stop propagation)
   */
  close = (event?: React.MouseEvent<HTMLAnchorElement>): void => {
    if (event) {
      event.stopPropagation();
    }
    this.clearCloseTimer();

    const { onClose, noticeKey } = this.props;
    if (onClose) {
      onClose(noticeKey);
    }
  };

  /**
   * Start the auto-close timer based on duration prop
   */
  startCloseTimer = (): void => {
    const { duration } = this.props;
    if (duration) {
      this.closeTimer = window.setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  };

  /**
   * Clear the active close timer
   */
  clearCloseTimer = (): void => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  };

  /**
   * Restart the close timer (clear and start again)
   */
  restartCloseTimer(): void {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  componentDidMount(): void {
    this.startCloseTimer();
  }

  componentDidUpdate(prevProps: NoticeProps): void {
    const durationChanged = this.props.duration !== prevProps.duration;
    const updateMarkChanged = this.props.updateMark !== prevProps.updateMark;
    const becameVisible = this.props.visible !== prevProps.visible && this.props.visible;

    if (durationChanged || updateMarkChanged || becameVisible) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount(): void {
    this.clearCloseTimer();
  }

  render(): React.ReactNode {
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

    // Extract data-*, aria-*, and role attributes
    const dataAttributes = Object.keys(this.props).reduce<Record<string, unknown>>(
      (acc, key) => {
        const isDataAttr = key.startsWith('data-');
        const isAriaAttr = key.startsWith('aria-');
        const isRole = key === 'role';

        if (isDataAttr || isAriaAttr || isRole) {
          acc[key] = this.props[key as keyof NoticeProps];
        }
        return acc;
      },
      {}
    );

    const noticeElement = (
      <div
        className={classNames(noticeClass, className, {
          [`${noticeClass}-closable`]: closable,
        })}
        style={style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
        onClick={onClick}
        {...dataAttributes}
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