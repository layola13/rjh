import React, { useRef, useImperativeHandle, forwardRef, ReactNode, CSSProperties, RefObject } from 'react';
import Trigger from 'rc-trigger';
import { placements } from './placements';
import TooltipContent from './TooltipContent';

type TriggerAction = 'hover' | 'click' | 'focus' | 'contextMenu';

interface AlignConfig {
  points?: string[];
  offset?: number[];
  targetOffset?: number[];
  overflow?: { adjustX?: boolean; adjustY?: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

interface DestroyTooltipConfig {
  keepParent?: boolean;
}

interface TooltipProps {
  overlayClassName?: string;
  trigger?: TriggerAction[];
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayStyle?: CSSProperties;
  prefixCls?: string;
  children?: ReactNode;
  onVisibleChange?: (visible: boolean) => void;
  afterVisibleChange?: (visible: boolean) => void;
  transitionName?: string;
  animation?: string;
  placement?: string;
  align?: AlignConfig;
  destroyTooltipOnHide?: boolean | DestroyTooltipConfig;
  defaultVisible?: boolean;
  visible?: boolean;
  getTooltipContainer?: (node: HTMLElement) => HTMLElement;
  overlayInnerStyle?: CSSProperties;
  arrowContent?: ReactNode;
  overlay?: ReactNode;
  id?: string;
  [key: string]: unknown;
}

export interface TooltipRef {
  forcePopupAlign: () => void;
}

const Tooltip = forwardRef<TooltipRef, TooltipProps>((props, ref) => {
  const {
    overlayClassName,
    trigger = ['hover'],
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    prefixCls = 'rc-tooltip',
    children,
    onVisibleChange,
    afterVisibleChange,
    transitionName,
    animation,
    placement = 'right',
    align = {},
    destroyTooltipOnHide = false,
    defaultVisible,
    getTooltipContainer,
    overlayInnerStyle,
    arrowContent = null,
    overlay,
    id,
    visible,
    ...restProps
  } = props;

  const triggerRef = useRef<TooltipRef>(null);

  useImperativeHandle(ref, () => triggerRef.current as TooltipRef);

  const triggerProps: Record<string, unknown> = { ...restProps };

  if (visible !== undefined) {
    triggerProps.popupVisible = visible;
  }

  let destroyPopupOnHide = false;
  let autoDestroy = false;

  if (typeof destroyTooltipOnHide === 'boolean') {
    destroyPopupOnHide = destroyTooltipOnHide;
  } else if (destroyTooltipOnHide && typeof destroyTooltipOnHide === 'object') {
    const { keepParent } = destroyTooltipOnHide;
    destroyPopupOnHide = keepParent === true;
    autoDestroy = keepParent === false;
  }

  const renderPopup = () => [
    <div className={`${prefixCls}-arrow`} key="arrow">
      {arrowContent}
    </div>,
    <TooltipContent
      key="content"
      prefixCls={prefixCls}
      id={id}
      overlay={overlay}
      overlayInnerStyle={overlayInnerStyle}
    />
  ];

  return (
    <Trigger
      popupClassName={overlayClassName}
      prefixCls={prefixCls}
      popup={renderPopup}
      action={trigger}
      builtinPlacements={placements}
      popupPlacement={placement}
      ref={triggerRef as RefObject<unknown>}
      popupAlign={align}
      getPopupContainer={getTooltipContainer}
      onPopupVisibleChange={onVisibleChange}
      afterPopupVisibleChange={afterVisibleChange}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      defaultPopupVisible={defaultVisible}
      destroyPopupOnHide={destroyPopupOnHide}
      autoDestroy={autoDestroy}
      mouseLeaveDelay={mouseLeaveDelay}
      popupStyle={overlayStyle}
      mouseEnterDelay={mouseEnterDelay}
      {...triggerProps}
    >
      {children}
    </Trigger>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;