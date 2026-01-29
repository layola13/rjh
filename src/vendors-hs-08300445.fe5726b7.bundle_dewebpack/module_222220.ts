import React from 'react';

interface HandleProps {
  prefixCls: string;
  vertical: boolean;
  reverse: boolean;
  offset: number;
  style?: React.CSSProperties;
  disabled?: boolean;
  min: number;
  max: number;
  value: number;
  tabIndex?: number | null;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaValueTextFormatter?: (value: number) => string;
  className?: string;
}

interface HandleState {
  clickFocused: boolean;
}

interface MouseUpListener {
  remove: () => void;
}

export default class Handle extends React.Component<HandleProps, HandleState> {
  private handle!: HTMLDivElement;
  private onMouseUpListener?: MouseUpListener;

  constructor(props: HandleProps) {
    super(props);
    this.state = {
      clickFocused: false
    };
  }

  componentDidMount(): void {
    this.onMouseUpListener = this.addDocumentMouseUpListener(
      document,
      'mouseup',
      this.handleMouseUp
    );
  }

  componentWillUnmount(): void {
    if (this.onMouseUpListener) {
      this.onMouseUpListener.remove();
    }
  }

  private setHandleRef = (element: HTMLDivElement): void => {
    this.handle = element;
  };

  private handleMouseUp = (): void => {
    if (document.activeElement === this.handle) {
      this.setClickFocus(true);
    }
  };

  private handleMouseDown = (event: React.MouseEvent): void => {
    event.preventDefault();
    this.focus();
  };

  private handleBlur = (): void => {
    this.setClickFocus(false);
  };

  private handleKeyDown = (): void => {
    this.setClickFocus(false);
  };

  private setClickFocus(focused: boolean): void {
    this.setState({
      clickFocused: focused
    });
  }

  clickFocus(): void {
    this.setClickFocus(true);
    this.focus();
  }

  focus(): void {
    this.handle.focus();
  }

  blur(): void {
    this.handle.blur();
  }

  private addDocumentMouseUpListener(
    target: Document,
    eventType: string,
    handler: () => void
  ): MouseUpListener {
    target.addEventListener(eventType, handler);
    return {
      remove: () => target.removeEventListener(eventType, handler)
    };
  }

  render(): React.ReactElement {
    const {
      prefixCls,
      vertical,
      reverse,
      offset,
      style,
      disabled,
      min,
      max,
      value,
      tabIndex,
      ariaLabel,
      ariaLabelledBy,
      ariaValueTextFormatter,
      className,
      ...restProps
    } = this.props;

    const handleClassName = [
      className,
      this.state.clickFocused ? `${prefixCls}-handle-click-focused` : ''
    ]
      .filter(Boolean)
      .join(' ');

    const positionStyle: React.CSSProperties = vertical
      ? {
          [reverse ? 'top' : 'bottom']: `${offset}%`,
          [reverse ? 'bottom' : 'top']: 'auto',
          transform: reverse ? undefined : 'translateY(+50%)'
        }
      : {
          [reverse ? 'right' : 'left']: `${offset}%`,
          [reverse ? 'left' : 'right']: 'auto',
          transform: `translateX(${reverse ? '+' : '-'}50%)`
        };

    const mergedStyle: React.CSSProperties = {
      ...style,
      ...positionStyle
    };

    let computedTabIndex: number | null = tabIndex ?? 0;
    if (disabled || tabIndex === null) {
      computedTabIndex = null;
    }

    let ariaValueText: string | undefined;
    if (ariaValueTextFormatter) {
      ariaValueText = ariaValueTextFormatter(value);
    }

    return (
      <div
        ref={this.setHandleRef}
        tabIndex={computedTabIndex ?? undefined}
        {...restProps}
        className={handleClassName}
        style={mergedStyle}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={!!disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-valuetext={ariaValueText}
      />
    );
  }
}