import React, { useState, useRef, useImperativeHandle, forwardRef, cloneElement, createElement, Fragment, ReactElement, CSSProperties, ReactNode } from 'react';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import defaultPlacements from './placements';

interface OverlayProps {
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: any;
}

interface DropdownProps {
  arrow?: boolean;
  prefixCls?: string;
  transitionName?: string;
  animation?: string;
  align?: any;
  placement?: string;
  placements?: any;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  showAction?: string[];
  hideAction?: string[];
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  visible?: boolean;
  trigger?: string[];
  overlay: (() => ReactElement) | ReactElement;
  onOverlayClick?: (event: React.MouseEvent) => void;
  onVisibleChange?: (visible: boolean) => void;
  children: ReactElement;
  openClassName?: string;
  minOverlayWidthMatchTrigger?: boolean;
  alignPoint?: boolean;
  [key: string]: any;
}

const EXCLUDED_PROPS = [
  'arrow',
  'prefixCls',
  'transitionName',
  'animation',
  'align',
  'placement',
  'placements',
  'getPopupContainer',
  'showAction',
  'hideAction',
  'overlayClassName',
  'overlayStyle',
  'visible',
  'trigger'
];

function Dropdown(props: DropdownProps, ref: React.Ref<any>) {
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
    overlay,
    onOverlayClick,
    onVisibleChange,
    children,
    openClassName,
    minOverlayWidthMatchTrigger,
    alignPoint,
    ...restProps
  } = props;

  const [internalVisible, setInternalVisible] = useState<boolean | undefined>();
  const isControlled = 'visible' in props;
  const mergedVisible = isControlled ? visible : internalVisible;
  const triggerRef = useRef<any>(null);

  useImperativeHandle(ref, () => triggerRef.current);

  const getOverlayElement = (): ReactElement => {
    return typeof overlay === 'function' ? overlay() : overlay;
  };

  const handleOverlayClick = (event: React.MouseEvent): void => {
    const overlayElement = getOverlayElement();
    const overlayProps = overlayElement.props as OverlayProps;

    setInternalVisible(false);

    if (onOverlayClick) {
      onOverlayClick(event);
    }

    if (overlayProps.onClick) {
      overlayProps.onClick(event);
    }
  };

  const renderOverlay = (): ReactElement => {
    const overlayElement = getOverlayElement();
    const overlayMenuProps: any = {
      prefixCls: `${prefixCls}-menu`,
      onClick: handleOverlayClick
    };

    if (typeof overlayElement.type === 'string') {
      delete overlayMenuProps.prefixCls;
    }

    return createElement(
      Fragment,
      null,
      arrow && createElement('div', { className: `${prefixCls}-arrow` }),
      cloneElement(overlayElement, overlayMenuProps)
    );
  };

  const handleVisibleChange = (newVisible: boolean): void => {
    setInternalVisible(newVisible);

    if (typeof onVisibleChange === 'function') {
      onVisibleChange(newVisible);
    }
  };

  let mergedHideAction = hideAction;
  if (!mergedHideAction && trigger.indexOf('contextMenu') === -1) {
    mergedHideAction = ['click'];
  }

  const getStretch = (): string => {
    const shouldMatchWidth = 'minOverlayWidthMatchTrigger' in props
      ? minOverlayWidthMatchTrigger
      : !alignPoint;
    return shouldMatchWidth ? 'minWidth' : '';
  };

  const renderChildren = (): ReactElement => {
    const childProps = children.props ?? {};
    const mergedOpenClassName = openClassName !== undefined
      ? openClassName
      : `${prefixCls}-open`;
    const childClassName = classNames(childProps.className, mergedOpenClassName);

    return mergedVisible && children
      ? cloneElement(children, { className: childClassName })
      : children;
  };

  const popupContent = typeof overlay === 'function' ? renderOverlay() : renderOverlay();

  return createElement(
    Trigger,
    {
      ...restProps,
      builtinPlacements: placements,
      prefixCls,
      ref: triggerRef,
      popupClassName: classNames(overlayClassName, {
        [`${prefixCls}-show-arrow`]: arrow
      }),
      popupStyle: overlayStyle,
      action: trigger,
      showAction,
      hideAction: mergedHideAction ?? [],
      popupPlacement: placement,
      popupAlign: align,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      popupVisible: mergedVisible,
      stretch: getStretch(),
      popup: popupContent,
      onPopupVisibleChange: handleVisibleChange,
      getPopupContainer
    },
    renderChildren()
  );
}

export default forwardRef(Dropdown);