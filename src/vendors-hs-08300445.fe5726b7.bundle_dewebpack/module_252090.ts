import React, { forwardRef, CSSProperties, ReactNode, Ref } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';

interface FillerProps {
  height?: number;
  offsetY?: number;
  offsetX?: number;
  children?: ReactNode;
  prefixCls?: string;
  onInnerResize?: () => void;
  innerProps?: React.HTMLAttributes<HTMLDivElement>;
  rtl?: boolean;
  extra?: ReactNode;
}

const Filler = forwardRef<HTMLDivElement, FillerProps>((props, ref) => {
  const {
    height,
    offsetY,
    offsetX,
    children,
    prefixCls,
    onInnerResize,
    innerProps,
    rtl,
    extra
  } = props;

  let outerStyle: CSSProperties = {};
  let innerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
  };

  if (offsetY !== undefined) {
    outerStyle = {
      height,
      position: 'relative',
      overflow: 'hidden'
    };

    innerStyle = {
      ...innerStyle,
      transform: `translateY(${offsetY}px)`,
      [rtl ? 'marginRight' : 'marginLeft']: -offsetX,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0
    };
  }

  const handleResize = (entry: ResizeObserverEntry): void => {
    if (entry.target && (entry.target as HTMLElement).offsetHeight && onInnerResize) {
      onInnerResize();
    }
  };

  return (
    <div style={outerStyle}>
      <ResizeObserver onResize={handleResize}>
        <div
          style={innerStyle}
          className={classNames({
            [`${prefixCls}-holder-inner`]: prefixCls
          }, prefixCls)}
          ref={ref}
          {...innerProps}
        >
          {children}
          {extra}
        </div>
      </ResizeObserver>
    </div>
  );
});

Filler.displayName = 'Filler';

export default Filler;