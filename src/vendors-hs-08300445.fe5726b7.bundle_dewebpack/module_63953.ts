import React, { forwardRef, useRef, useImperativeHandle, Children, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';

interface MobileConfig {
  popupClassName?: string;
  popupStyle?: CSSProperties;
  popupMotion?: Record<string, any>;
  popupRender?: (node: ReactNode) => ReactNode;
}

interface MobilePopupInnerProps {
  prefixCls: string;
  visible: boolean;
  zIndex?: number;
  children: ReactNode;
  mobile?: MobileConfig;
}

interface MobilePopupInnerRef {
  forceAlign: () => void;
  getElement: () => HTMLDivElement | null;
}

interface MotionRenderProps {
  className?: string;
  style?: CSSProperties;
}

const MobilePopupInner = forwardRef<MobilePopupInnerRef, MobilePopupInnerProps>(
  (props, ref) => {
    const { prefixCls, visible, zIndex, children, mobile = {} } = props;
    const { popupClassName, popupStyle, popupMotion = {}, popupRender } = mobile;

    const elementRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      forceAlign: () => {
        // No-op for mobile
      },
      getElement: () => elementRef.current,
    }));

    const mergedStyle: CSSProperties = {
      zIndex,
      ...popupStyle,
    };

    let content: ReactNode = children;

    if (Children.count(children) > 1) {
      content = (
        <div className={`${prefixCls}-content`}>
          {children}
        </div>
      );
    }

    if (popupRender) {
      content = popupRender(content);
    }

    return (
      <CSSMotion
        visible={visible}
        ref={elementRef}
        removeOnLeave={true}
        {...popupMotion}
      >
        {(motionProps: MotionRenderProps, motionRef: React.Ref<HTMLDivElement>) => {
          const { className: motionClassName, style: motionStyle } = motionProps;
          const mergedClassName = classNames(prefixCls, popupClassName, motionClassName);

          return (
            <div
              ref={motionRef}
              className={mergedClassName}
              style={{ ...motionStyle, ...mergedStyle }}
            >
              {content}
            </div>
          );
        }}
      </CSSMotion>
    );
  }
);

MobilePopupInner.displayName = 'MobilePopupInner';

export default MobilePopupInner;