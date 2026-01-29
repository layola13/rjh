import * as React from 'react';
import ResizeObserver from 'rc-resize-observer';
import omit from 'rc-util/lib/omit';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
import shallowEqual from 'shallowequal';

enum ResizeStatus {
  NONE = 0,
  RESIZING = 1,
  RESIZED = 2
}

interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onResize'> {
  prefixCls?: string;
  autoSize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onResize?: (size: { width: number; height: number }) => void;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
}

interface TextAreaState {
  textareaStyles: React.CSSProperties;
  resizeStatus: ResizeStatus;
}

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  private nextFrameActionId?: number;
  private resizeFrameId?: number;
  private textArea?: HTMLTextAreaElement;

  constructor(props: TextAreaProps) {
    super(props);
    this.state = {
      textareaStyles: {},
      resizeStatus: ResizeStatus.NONE
    };
  }

  componentDidUpdate(prevProps: TextAreaProps): void {
    if (
      prevProps.value !== this.props.value ||
      !shallowEqual(prevProps.autoSize, this.props.autoSize)
    ) {
      this.resizeTextarea();
    }
  }

  componentWillUnmount(): void {
    if (this.nextFrameActionId !== undefined) {
      cancelAnimationFrame(this.nextFrameActionId);
    }
    if (this.resizeFrameId !== undefined) {
      cancelAnimationFrame(this.resizeFrameId);
    }
  }

  private saveTextArea = (element: HTMLTextAreaElement | null): void => {
    if (element) {
      this.textArea = element;
    }
  };

  private handleResize = (size: { width: number; height: number }): void => {
    const { resizeStatus } = this.state;
    const { autoSize, onResize } = this.props;

    if (resizeStatus === ResizeStatus.NONE) {
      if (typeof onResize === 'function') {
        onResize(size);
      }
      if (autoSize) {
        this.resizeOnNextFrame();
      }
    }
  };

  private resizeOnNextFrame = (): void => {
    if (this.nextFrameActionId !== undefined) {
      cancelAnimationFrame(this.nextFrameActionId);
    }
    this.nextFrameActionId = requestAnimationFrame(this.resizeTextarea);
  };

  private resizeTextarea = (): void => {
    const { autoSize } = this.props;

    if (!autoSize || !this.textArea) {
      return;
    }

    const autoSizeConfig = typeof autoSize === 'object' ? autoSize : {};
    const { minRows, maxRows } = autoSizeConfig;
    const textareaStyles = calculateNodeHeight(this.textArea, false, minRows, maxRows);

    this.setState(
      {
        textareaStyles,
        resizeStatus: ResizeStatus.RESIZING
      },
      () => {
        if (this.resizeFrameId !== undefined) {
          cancelAnimationFrame(this.resizeFrameId);
        }
        this.resizeFrameId = requestAnimationFrame(() => {
          this.setState(
            {
              resizeStatus: ResizeStatus.RESIZED
            },
            () => {
              this.resizeFrameId = requestAnimationFrame(() => {
                this.setState({
                  resizeStatus: ResizeStatus.NONE
                });
                this.fixFirefoxAutoScroll();
              });
            }
          );
        });
      }
    );
  };

  private fixFirefoxAutoScroll(): void {
    try {
      if (document.activeElement === this.textArea && this.textArea) {
        const selectionStart = this.textArea.selectionStart;
        const selectionEnd = this.textArea.selectionEnd;
        this.textArea.setSelectionRange(selectionStart, selectionEnd);
      }
    } catch (error) {
      // Ignore error
    }
  }

  private renderTextArea(): React.ReactElement {
    const {
      prefixCls = 'rc-textarea',
      autoSize,
      onResize,
      className,
      disabled,
      style,
      ...restProps
    } = this.props;

    const { textareaStyles, resizeStatus } = this.state;

    const textareaProps = omit(restProps, [
      'prefixCls',
      'onPressEnter',
      'autoSize',
      'defaultValue',
      'onResize'
    ]);

    if ('value' in textareaProps) {
      textareaProps.value = textareaProps.value ?? '';
    }

    const textareaClassName = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled
    });

    const mergedStyle: React.CSSProperties = {
      ...style,
      ...textareaStyles,
      ...(resizeStatus === ResizeStatus.RESIZING
        ? {
            overflowX: 'hidden',
            overflowY: 'hidden'
          }
        : null)
    };

    return (
      <ResizeObserver onResize={this.handleResize} disabled={!(autoSize || onResize)}>
        <textarea
          {...textareaProps}
          className={textareaClassName}
          style={mergedStyle}
          ref={this.saveTextArea}
        />
      </ResizeObserver>
    );
  }

  render(): React.ReactElement {
    return this.renderTextArea();
  }
}

export default TextArea;