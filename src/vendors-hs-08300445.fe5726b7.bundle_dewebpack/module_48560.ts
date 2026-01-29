import React, { useEffect, forwardRef, ReactNode, CSSProperties, ComponentType } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer';

interface ItemData {
  index: number;
}

interface ItemProps {
  prefixCls?: string;
  invalidate?: boolean;
  item?: unknown;
  renderItem?: (item: unknown, data: ItemData) => ReactNode;
  responsive?: boolean;
  responsiveDisabled?: boolean;
  registerSize: (key: string, size: number | null) => void;
  itemKey: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  display?: boolean;
  order?: number;
  component?: ComponentType<any> | keyof JSX.IntrinsicElements;
}

const UNDEFINED_VALUE = void 0;

const Item = forwardRef<HTMLElement, ItemProps>((props, ref) => {
  const {
    prefixCls,
    invalidate,
    item,
    renderItem,
    responsive,
    responsiveDisabled,
    registerSize,
    itemKey,
    className,
    style,
    children,
    display,
    order,
    component: Component = 'div',
    ...restProps
  } = props;

  const isHidden = responsive && !display;

  function handleSizeChange(size: number | null): void {
    registerSize(itemKey, size);
  }

  useEffect(() => {
    return () => {
      handleSizeChange(null);
    };
  }, []);

  let mergedStyle: CSSProperties | undefined;
  let content: ReactNode =
    renderItem && item !== UNDEFINED_VALUE
      ? renderItem(item, { index: order ?? 0 })
      : children;

  if (!invalidate) {
    mergedStyle = {
      opacity: isHidden ? 0 : 1,
      height: isHidden ? 0 : UNDEFINED_VALUE,
      overflowY: isHidden ? 'hidden' : UNDEFINED_VALUE,
      order: responsive ? order : UNDEFINED_VALUE,
      pointerEvents: isHidden ? 'none' : UNDEFINED_VALUE,
      position: isHidden ? 'absolute' : UNDEFINED_VALUE,
    };
  }

  const ariaProps: Record<string, boolean> = {};
  if (isHidden) {
    ariaProps['aria-hidden'] = true;
  }

  let element = React.createElement(
    Component,
    {
      className: classNames(!invalidate && prefixCls, className),
      style: { ...mergedStyle, ...style },
      ...ariaProps,
      ...restProps,
      ref,
    },
    content
  );

  if (responsive) {
    element = React.createElement(
      ResizeObserver,
      {
        onResize: (entry: { offsetWidth: number }) => {
          handleSizeChange(entry.offsetWidth);
        },
        disabled: responsiveDisabled,
      },
      element
    );
  }

  return element;
});

Item.displayName = 'Item';

export default Item;