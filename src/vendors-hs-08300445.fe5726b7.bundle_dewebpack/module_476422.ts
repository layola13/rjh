import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import contains from 'rc-util/lib/Dom/contains';
import pickAttrs from 'rc-util/lib/pickAttrs';
import Mask from './Mask';
import { getMotionName, getUUID } from './util';
import DialogWrap from './DialogWrap';

interface ScrollLocker {
  lock: () => void;
  unLock: () => void;
}

interface DialogProps {
  prefixCls?: string;
  zIndex?: number;
  visible?: boolean;
  keyboard?: boolean;
  focusTriggerAfterClose?: boolean;
  scrollLocker?: ScrollLocker;
  title?: React.ReactNode;
  wrapStyle?: React.CSSProperties;
  wrapClassName?: string;
  wrapProps?: React.HTMLAttributes<HTMLDivElement>;
  onClose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  afterClose?: () => void;
  transitionName?: string;
  animation?: string;
  closable?: boolean;
  mask?: boolean;
  maskTransitionName?: string;
  maskAnimation?: string;
  maskClosable?: boolean;
  maskStyle?: React.CSSProperties;
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
  [key: string]: unknown;
}

export default function Dialog(props: DialogProps): React.ReactElement {
  const {
    prefixCls = 'rc-dialog',
    zIndex,
    visible = false,
    keyboard = true,
    focusTriggerAfterClose = true,
    scrollLocker,
    title,
    wrapStyle,
    wrapClassName,
    wrapProps,
    onClose,
    afterClose,
    transitionName,
    animation,
    closable = true,
    mask = true,
    maskTransitionName,
    maskAnimation,
    maskClosable = true,
    maskStyle,
    maskProps,
  } = props;

  const lastOutSideFocusNodeRef = useRef<HTMLElement | null>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<any>();
  const [animatedVisible, setAnimatedVisible] = useState<boolean>(visible);
  const ariaIdRef = useRef<string>();

  if (!ariaIdRef.current) {
    ariaIdRef.current = `rcDialogTitle${getUUID()}`;
  }

  function onDialogClose(event: React.MouseEvent | React.KeyboardEvent): void {
    onClose?.(event);
  }

  const mouseDownInDialogRef = useRef<boolean>(false);
  const timeoutIdRef = useRef<number>();

  let onMaskClick: ((event: React.MouseEvent) => void) | null = null;

  if (maskClosable) {
    onMaskClick = (event: React.MouseEvent): void => {
      if (mouseDownInDialogRef.current) {
        mouseDownInDialogRef.current = false;
      } else if (wrapperRef.current === event.target) {
        onDialogClose(event);
      }
    };
  }

  useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
    return () => {};
  }, [visible]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (animatedVisible) {
      scrollLocker?.lock();
      return () => scrollLocker?.unLock();
    }
    return () => {};
  }, [animatedVisible, scrollLocker]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (keyboard && event.keyCode === KeyCode.ESC) {
      event.stopPropagation();
      onDialogClose(event);
      return;
    }

    if (visible && event.keyCode === KeyCode.TAB) {
      dialogRef.current?.changeActive(!event.shiftKey);
    }
  }

  function handleMouseDown(): void {
    clearTimeout(timeoutIdRef.current);
    mouseDownInDialogRef.current = true;
  }

  function handleMouseUp(): void {
    timeoutIdRef.current = window.setTimeout(() => {
      mouseDownInDialogRef.current = false;
    });
  }

  function handleVisibleChanged(nextVisible: boolean): void {
    if (nextVisible) {
      if (!contains(wrapperRef.current, document.activeElement)) {
        lastOutSideFocusNodeRef.current = document.activeElement as HTMLElement;
        dialogRef.current?.focus();
      }
    } else {
      setAnimatedVisible(false);

      if (mask && lastOutSideFocusNodeRef.current && focusTriggerAfterClose) {
        try {
          lastOutSideFocusNodeRef.current.focus({ preventScroll: true });
        } catch (error) {
          // Ignore focus error
        }
        lastOutSideFocusNodeRef.current = null;
      }

      if (animatedVisible) {
        afterClose?.();
      }
    }
  }

  return (
    <div className={`${prefixCls}-root`} {...pickAttrs(props, { data: true })}>
      <Mask
        prefixCls={prefixCls}
        visible={mask && visible}
        motionName={getMotionName(prefixCls, maskTransitionName, maskAnimation)}
        style={{
          zIndex,
          ...maskStyle,
        }}
        maskProps={maskProps}
      />
      <div
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={classNames(`${prefixCls}-wrap`, wrapClassName)}
        ref={wrapperRef}
        onClick={onMaskClick}
        role="dialog"
        aria-labelledby={title ? ariaIdRef.current : undefined}
        style={{
          zIndex,
          ...wrapStyle,
          display: animatedVisible ? undefined : 'none',
        }}
        {...wrapProps}
      >
        <DialogWrap
          {...props}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          ref={dialogRef}
          closable={closable}
          ariaId={ariaIdRef.current}
          prefixCls={prefixCls}
          visible={visible}
          onClose={onDialogClose}
          onVisibleChanged={handleVisibleChanged}
          motionName={getMotionName(prefixCls, transitionName, animation)}
        />
      </div>
    </div>
  );
}