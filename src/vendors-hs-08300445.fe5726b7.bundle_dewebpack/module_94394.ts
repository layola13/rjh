import React, { useContext, forwardRef, ReactElement, ComponentType, HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';
import { OverflowContext } from './OverflowContext';
import ResizeObserver from './ResizeObserver';

interface RawItemProps extends HTMLAttributes<HTMLElement> {
  component?: ComponentType<any> | keyof JSX.IntrinsicElements;
  className?: string;
}

interface OverflowContextValue {
  className?: string;
  [key: string]: any;
}

const RawItem = forwardRef<HTMLElement, RawItemProps>(
  (props, ref): ReactElement => {
    const overflowContext = useContext<OverflowContextValue | null>(OverflowContext);

    if (!overflowContext) {
      const { component = 'div', ...restProps } = props;
      const Component = component;

      return React.createElement(Component, {
        ...restProps,
        ref,
      });
    }

    const { className: contextClassName, ...contextRest } = overflowContext;
    const { className: propsClassName, ...propsRest } = props;

    return (
      <OverflowContext.Provider value={null}>
        <ResizeObserver
          ref={ref as Ref<any>}
          className={classNames(contextClassName, propsClassName)}
          {...contextRest}
          {...propsRest}
        />
      </OverflowContext.Provider>
    );
  }
);

RawItem.displayName = 'RawItem';

export default RawItem;