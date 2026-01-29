import React, { forwardRef, useContext, Children, isValidElement, ReactNode, MouseEvent, CSSProperties } from 'react';
import classNames from 'classnames';
import { warning, useInsertStyles, svgBaseProps } from './utils';
import { IconContext } from './IconContext';

interface IconProps {
  className?: string;
  component?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  viewBox?: string;
  spin?: boolean;
  rotate?: number;
  tabIndex?: number;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  children?: ReactNode;
  role?: string;
  style?: CSSProperties;
}

interface IconContextType {
  prefixCls?: string;
  rootClassName?: string;
}

const AntdIcon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    className,
    component: Component,
    viewBox,
    spin,
    rotate,
    tabIndex,
    onClick,
    children,
    ...restProps
  } = props;

  warning(
    Boolean(Component || children),
    'Should have `component` prop or `children`.'
  );

  useInsertStyles();

  const context = useContext<IconContextType>(IconContext);
  const prefixCls = context.prefixCls ?? 'anticon';
  const rootClassName = context.rootClassName;

  const wrapperClassName = classNames(rootClassName, prefixCls, className);

  const spinClassName = classNames({
    [`${prefixCls}-spin`]: !!spin
  });

  const rotateStyle: CSSProperties | undefined = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`
      }
    : undefined;

  const svgProps: React.SVGProps<SVGSVGElement> = {
    ...svgBaseProps,
    className: spinClassName,
    style: rotateStyle,
    viewBox
  };

  if (!viewBox) {
    delete svgProps.viewBox;
  }

  let computedTabIndex = tabIndex;
  if (computedTabIndex === undefined && onClick) {
    computedTabIndex = -1;
  }

  return (
    <span
      role="img"
      {...restProps}
      ref={ref}
      tabIndex={computedTabIndex}
      onClick={onClick}
      className={wrapperClassName}
    >
      {Component ? (
        <Component {...svgProps}>{children}</Component>
      ) : children ? (
        <>
          {warning(
            Boolean(viewBox) ||
              (Children.count(children) === 1 &&
                isValidElement(children) &&
                (children as React.ReactElement).type === 'use'),
            'Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon.'
          )}
          <svg {...svgProps} viewBox={viewBox}>
            {children}
          </svg>
        </>
      ) : null}
    </span>
  );
});

AntdIcon.displayName = 'AntdIcon';

export default AntdIcon;