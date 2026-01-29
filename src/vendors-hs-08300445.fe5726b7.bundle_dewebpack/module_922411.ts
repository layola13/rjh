import * as React from 'react';
import ResizeObserver from './ResizeObserver';
import { Collection } from './Collection';
import { _rs } from './utils';

export { _rs };

interface ResizeObserverProps {
  children: React.ReactNode | (() => React.ReactNode);
  onResize?: (size: { width: number; height: number }) => void;
  disabled?: boolean;
}

const RC_OBSERVER_KEY_PREFIX = 'rc-observer-key';

function ResizeObserverWrapper(
  props: ResizeObserverProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement[] {
  const { children } = props;

  const childrenArray = typeof children === 'function' ? [children] : React.Children.toArray(children);

  return childrenArray.map((child, index) => {
    const key = (child as React.ReactElement)?.key ?? `${RC_OBSERVER_KEY_PREFIX}-${index}`;

    return React.createElement(
      ResizeObserver,
      {
        ...props,
        key,
        ref: index === 0 ? ref : undefined,
      },
      child
    );
  });
}

const ResizeObserverComponent = React.forwardRef<HTMLElement, ResizeObserverProps>(ResizeObserverWrapper);

ResizeObserverComponent.Collection = Collection;

export default ResizeObserverComponent;