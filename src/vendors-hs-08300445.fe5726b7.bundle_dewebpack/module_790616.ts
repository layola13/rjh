import React, { forwardRef, useRef, useState, useImperativeHandle, CSSProperties, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { offset } from '../utils/offset';
import CSSMotion from './CSSMotion';
import MemoChildren from './MemoChildren';

interface MousePosition {
  x: number;
  y: number;
}

interface ContentProps {
  closable?: boolean;
  prefixCls: string;
  width?: number | string;
  height?: number | string;
  footer?: ReactNode;
  title?: ReactNode;
  closeIcon?: ReactNode;
  style?: CSSProperties;
  className?: string;
  visible: boolean;
  forceRender?: boolean;
  bodyStyle?: CSSProperties;
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;
  children?: ReactNode;
  destroyOnClose?: boolean;
  modalRender?: (node: ReactNode) => ReactNode;
  motionName?: string;
  ariaId?: string;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void;
  onVisibleChanged?: (visible: boolean) => void;
  onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: MouseEvent<HTMLDivElement>) => void;
  mousePosition?: MousePosition;
}

interface ContentRef {
  focus: () => void;
  changeActive: (active: boolean) => void;
}

const HIDDEN_STYLE: CSSProperties = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  outline: 'none',
};

const Content = forwardRef<ContentRef, ContentProps>((props, ref) => {
  const {
    closable,
    prefixCls,
    width,
    height,
    footer,
    title,
    closeIcon,
    style,
    className,
    visible,
    forceRender,
    bodyStyle,
    bodyProps,
    children,
    destroyOnClose,
    modalRender,
    motionName,
    ariaId,
    onClose,
    onVisibleChanged,
    onMouseDown,
    onMouseUp,
    mousePosition,
  } = props;

  const sentinelStartRef = useRef<HTMLDivElement>(null);
  const sentinelEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [transformOrigin, setTransformOrigin] = useState<string | undefined>();

  useImperativeHandle(ref, () => ({
    focus: () => {
      sentinelStartRef.current?.focus();
    },
    changeActive: (active: boolean) => {
      const activeElement = document.activeElement;
      if (active && activeElement === sentinelEndRef.current) {
        sentinelStartRef.current?.focus();
      } else if (!active && activeElement === sentinelStartRef.current) {
        sentinelEndRef.current?.focus();
      }
    },
  }));

  const updateTransformOrigin = (): void => {
    if (dialogRef.current) {
      const elementOffset = offset(dialogRef.current);
      const origin = mousePosition
        ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`
        : '';
      setTransformOrigin(origin);
    }
  };

  const contentStyle: CSSProperties = {};
  if (width !== undefined) {
    contentStyle.width = width;
  }
  if (height !== undefined) {
    contentStyle.height = height;
  }
  if (transformOrigin) {
    contentStyle.transformOrigin = transformOrigin;
  }

  let footerNode: ReactNode = null;
  if (footer) {
    footerNode = <div className={`${prefixCls}-footer`}>{footer}</div>;
  }

  let headerNode: ReactNode = null;
  if (title) {
    headerNode = (
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`} id={ariaId}>
          {title}
        </div>
      </div>
    );
  }

  let closeNode: ReactNode = null;
  if (closable) {
    closeNode = (
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`${prefixCls}-close`}
      >
        {closeIcon || <span className={`${prefixCls}-close-x`} />}
      </button>
    );
  }

  const contentNode = (
    <div className={`${prefixCls}-content`}>
      {closeNode}
      {headerNode}
      <div className={`${prefixCls}-body`} style={bodyStyle} {...bodyProps}>
        {children}
      </div>
      {footerNode}
    </div>
  );

  return (
    <CSSMotion
      visible={visible}
      onVisibleChanged={onVisibleChanged}
      onAppearPrepare={updateTransformOrigin}
      onEnterPrepare={updateTransformOrigin}
      forceRender={forceRender}
      motionName={motionName}
      removeOnLeave={destroyOnClose}
      ref={dialogRef}
    >
      {({ className: motionClassName, style: motionStyle }, motionRef) => (
        <div
          key="dialog-element"
          role="document"
          ref={motionRef}
          style={{ ...motionStyle, ...style, ...contentStyle }}
          className={classNames(prefixCls, className, motionClassName)}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div
            tabIndex={0}
            ref={sentinelStartRef}
            style={HIDDEN_STYLE}
            aria-hidden="true"
          />
          <MemoChildren shouldUpdate={visible || forceRender}>
            {modalRender ? modalRender(contentNode) : contentNode}
          </MemoChildren>
          <div
            tabIndex={0}
            ref={sentinelEndRef}
            style={HIDDEN_STYLE}
            aria-hidden="true"
          />
        </div>
      )}
    </CSSMotion>
  );
});

Content.displayName = 'Content';

export default Content;