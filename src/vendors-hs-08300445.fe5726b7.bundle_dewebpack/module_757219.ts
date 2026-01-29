import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle, useCallback, ReactNode, CSSProperties, RefObject } from 'react';
import Align from 'rc-align';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import { getMotion } from './motion';
import useVisibleStatus from './hooks/useVisibleStatus';
import useStretchStyle from './hooks/useStretchStyle';

interface AlignType {
  points?: string[];
  offset?: number[];
  targetOffset?: number[];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
}

interface Point {
  pageX: number;
  pageY: number;
}

interface PopupInnerProps {
  visible: boolean;
  prefixCls: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  zIndex?: number;
  stretch?: string;
  destroyPopupOnHide?: boolean;
  forceRender?: boolean;
  align?: AlignType;
  point?: Point;
  getRootDomNode: () => HTMLElement;
  getClassNameFromAlign: (align: AlignType) => string;
  onAlign?: (element: HTMLElement, align: AlignType) => void;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
}

export interface PopupInnerRef {
  forceAlign: () => void;
  getElement: () => HTMLDivElement | null;
}

const PopupInner = forwardRef<PopupInnerRef, PopupInnerProps>((props, ref) => {
  const {
    visible,
    prefixCls,
    className,
    style,
    children,
    zIndex,
    stretch,
    destroyPopupOnHide,
    forceRender,
    align,
    point,
    getRootDomNode,
    getClassNameFromAlign,
    onAlign,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onTouchStart
  } = props;

  const alignRef = useRef<any>();
  const elementRef = useRef<HTMLDivElement>(null);
  const [alignClassName, setAlignClassName] = useState<string | undefined>();
  const [stretchStyle, setStretchStyle] = useStretchStyle(stretch);
  const [visibleStatus, setVisibleStatus] = useVisibleStatus(visible, () => {
    if (stretch) {
      setStretchStyle(getRootDomNode());
    }
  });
  const [alignCount, setAlignCount] = useState(0);
  const resolveRef = useRef<(() => void) | undefined>();

  const forceAlign = useCallback(() => {
    alignRef.current?.forceAlign();
  }, []);

  const handleAlign = useCallback((element: HTMLElement, alignInfo: AlignType) => {
    const newClassName = getClassNameFromAlign(alignInfo);
    if (alignClassName !== newClassName) {
      setAlignClassName(newClassName);
    }
    setAlignCount(count => count + 1);
    
    if (visibleStatus === 'align') {
      onAlign?.(element, alignInfo);
    }
  }, [alignClassName, visibleStatus, getClassNameFromAlign, onAlign]);

  useEffect(() => {
    if (visibleStatus === 'alignPre') {
      setAlignCount(0);
    }
  }, [visibleStatus]);

  useEffect(() => {
    if (visibleStatus === 'align') {
      if (alignCount < 2) {
        forceAlign();
      } else {
        setVisibleStatus(() => {
          resolveRef.current?.();
        });
      }
    }
  }, [alignCount, visibleStatus, forceAlign, setVisibleStatus]);

  const motion = {
    ...getMotion(props)
  };

  const createPromise = useCallback(() => {
    return new Promise<void>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  ['onAppearEnd', 'onEnterEnd', 'onLeaveEnd'].forEach((eventName) => {
    const originalHandler = motion[eventName];
    motion[eventName] = (element: HTMLElement, done: boolean) => {
      setVisibleStatus();
      return originalHandler?.(element, done);
    };
  });

  useEffect(() => {
    if (!motion.motionName && visibleStatus === 'motion') {
      setVisibleStatus();
    }
  }, [motion.motionName, visibleStatus, setVisibleStatus]);

  useImperativeHandle(ref, () => ({
    forceAlign,
    getElement: () => elementRef.current
  }));

  const mergedStyle: CSSProperties = {
    ...stretchStyle,
    zIndex,
    opacity: visibleStatus !== 'motion' && visibleStatus !== 'stable' && visible ? 0 : undefined,
    pointerEvents: visible || visibleStatus === 'stable' ? undefined : 'none',
    ...style
  };

  let alignDisabled = true;
  if (align?.points && (visibleStatus === 'align' || visibleStatus === 'stable')) {
    alignDisabled = false;
  }

  let childNode = children;
  if (React.Children.count(children) > 1) {
    childNode = (
      <div className={`${prefixCls}-content`}>
        {children}
      </div>
    );
  }

  return (
    <CSSMotion
      visible={visible}
      ref={elementRef}
      leavedClassName={`${prefixCls}-hidden`}
      {...motion}
      onAppearPrepare={createPromise}
      onEnterPrepare={createPromise}
      removeOnLeave={destroyPopupOnHide}
      forceRender={forceRender}
    >
      {({ className: motionClassName, style: motionStyle }, motionRef) => {
        const mergedClassName = classNames(prefixCls, className, alignClassName, motionClassName);
        
        return (
          <Align
            target={point || getRootDomNode}
            key="popup"
            ref={alignRef}
            monitorWindowResize={true}
            disabled={alignDisabled}
            align={align}
            onAlign={handleAlign}
          >
            <div
              ref={motionRef}
              className={mergedClassName}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseDownCapture={onMouseDown}
              onTouchStartCapture={onTouchStart}
              style={{ ...motionStyle, ...mergedStyle }}
            >
              {childNode}
            </div>
          </Align>
        );
      }}
    </CSSMotion>
  );
});

PopupInner.displayName = 'PopupInner';

export default PopupInner;