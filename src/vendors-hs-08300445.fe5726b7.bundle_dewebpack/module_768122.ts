import React, { forwardRef, useState, useEffect, ForwardedRef } from 'react';
import classNames from 'classnames';

interface PanelContentProps {
  prefixCls: string;
  forceRender?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  isActive: boolean;
  role?: string;
}

const PanelContent = forwardRef<HTMLDivElement, PanelContentProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      prefixCls,
      forceRender,
      className,
      style,
      children,
      isActive,
      role
    } = props;

    const [shouldRender, setShouldRender] = useState<boolean>(isActive || forceRender || false);

    useEffect(() => {
      if (forceRender || isActive) {
        setShouldRender(true);
      }
    }, [forceRender, isActive]);

    if (!shouldRender) {
      return null;
    }

    const contentClassName = classNames(
      `${prefixCls}-content`,
      {
        [`${prefixCls}-content-active`]: isActive,
        [`${prefixCls}-content-inactive`]: !isActive
      },
      className
    );

    return (
      <div ref={ref} className={contentClassName} style={style} role={role}>
        <div className={`${prefixCls}-content-box`}>
          {children}
        </div>
      </div>
    );
  }
);

PanelContent.displayName = 'PanelContent';

export default PanelContent;