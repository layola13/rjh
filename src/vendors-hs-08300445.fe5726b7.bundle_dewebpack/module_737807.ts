import React, { useState, useRef, useImperativeHandle, forwardRef, cloneElement, Fragment, ReactElement, CSSProperties, Ref } from 'react';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import { placements as defaultPlacements } from './placements';
import { composeRef, supportRef } from './utils';
import useAccessibility from './hooks/useAccessibility';

type ActionType = 'hover' | 'click' | 'contextMenu';
type PlacementType = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'bottom';
type AlignType = {
  points?: string[];
  offset?: number[];
  targetOffset?: number[];
  overflow?: { adjustX?: boolean; adjustY?: boolean };
};

interface OverlayProps {
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}

interface DropdownProps {
  arrow?: boolean;
  prefixCls?: string;
  transitionName?: string;
  animation?: string;
  align?: AlignType;
  placement?: PlacementType;
  placements?: Record<string, AlignType>;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  showAction?: ActionType[];
  hideAction?: ActionType[];
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  visible?: boolean;
  trigger?: ActionType[];
  autoFocus?: boolean;
  overlay: ReactElement | (() => ReactElement);
  onVisibleChange?: (visible: boolean) => void;
  onOverlayClick?: (event: React.MouseEvent) => void;
  children: ReactElement;
  openClassName?: string;
  minOverlayWidthMatchTrigger?: boolean;
  alignPoint?: boolean;
}

interface TriggerRef {
  forceAlign?: () => void;
  [key: string]: unknown;
}

const Dropdown = forwardRef<TriggerRef, DropdownProps>((props, ref) => {
  const {
    arrow = false,
    prefixCls = 'rc-dropdown',
    transitionName,
    animation,
    align,
    placement = 'bottomLeft',
    placements = defaultPlacements,
    getPopupContainer,
    showAction,
    hideAction,
    overlayClassName,
    overlayStyle,
    visible,
    trigger = ['hover'],
    autoFocus,
    overlay,
    onVisibleChange,
    onOverlayClick,
    children,
    openClassName,
    minOverlayWidthMatchTrigger,
    alignPoint,
    ...restProps
  } = props;

  const [internalVisible, setInternalVisible] = useState<boolean | undefined>(undefined);
  const isControlled = 'visible' in props;
  const mergedVisible = isControlled ? visible : internalVisible;

  const triggerRef = useRef<TriggerRef>(null);

  useImperativeHandle(ref, () => triggerRef.current!);

  const menuRef = useRef<HTMLElement>(null);
  const menuPrefixCls = `${prefixCls}-menu`;

  useAccessibility({
    visible: mergedVisible,
    setTriggerVisible: setInternalVisible,
    triggerRef,
    menuRef,
    onVisibleChange,
    autoFocus,
  });

  const getOverlayElement = (): ReactElement => {
    return typeof overlay === 'function' ? overlay() : overlay;
  };

  const handleOverlayClick = (event: React.MouseEvent): void => {
    setInternalVisible(false);
    onOverlayClick?.(event);
    
    const overlayElement = getOverlayElement();
    const overlayProps = overlayElement.props as OverlayProps;
    overlayProps.onClick?.(event);
  };

  const getMenuElement = (): ReactElement => {
    const overlayElement = getOverlayElement();
    const composedRef = composeRef(menuRef, (overlayElement as any).ref);
    
    const menuProps: Record<string, unknown> = {
      prefixCls: menuPrefixCls,
      'data-dropdown-inject': true,
      onClick: handleOverlayClick,
      ref: supportRef(overlayElement) ? composedRef : undefined,
    };

    if (typeof overlayElement.type === 'string') {
      delete menuProps.prefixCls;
      delete menuProps['data-dropdown-inject'];
    }

    return (
      <Fragment>
        {arrow && <div className={`${prefixCls}-arrow`} />}
        {cloneElement(overlayElement, menuProps)}
      </Fragment>
    );
  };

  let mergedHideAction = hideAction;
  if (!mergedHideAction && trigger.indexOf('contextMenu') === -1) {
    mergedHideAction = ['click'];
  }

  const shouldStretchWidth = minOverlayWidthMatchTrigger !== undefined
    ? minOverlayWidthMatchTrigger
    : !alignPoint;
  const stretchValue = shouldStretchWidth ? 'minWidth' : '';

  const handleVisibleChange = (newVisible: boolean): void => {
    setInternalVisible(newVisible);
    onVisibleChange?.(newVisible);
  };

  const childrenClassName = children.props?.className;
  const mergedOpenClassName = openClassName !== undefined ? openClassName : `${prefixCls}-open`;
  const finalClassName = classNames(childrenClassName, mergedOpenClassName);

  const childrenWithClassName = mergedVisible && children
    ? cloneElement(children, { className: finalClassName })
    : children;

  const menuElement = typeof overlay === 'function' ? getMenuElement() : getMenuElement();

  return (
    <Trigger
      {...restProps}
      builtinPlacements={placements}
      prefixCls={prefixCls}
      ref={triggerRef}
      popupClassName={classNames(overlayClassName, {
        [`${prefixCls}-show-arrow`]: arrow,
      })}
      popupStyle={overlayStyle}
      action={trigger}
      showAction={showAction}
      hideAction={mergedHideAction || []}
      popupPlacement={placement}
      popupAlign={align}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      popupVisible={mergedVisible}
      stretch={stretchValue}
      popup={menuElement}
      onPopupVisibleChange={handleVisibleChange}
      getPopupContainer={getPopupContainer}
    >
      {childrenWithClassName}
    </Trigger>
  );
});

export default Dropdown;