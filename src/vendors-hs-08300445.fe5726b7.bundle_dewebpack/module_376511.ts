import React, { useRef, useImperativeHandle, forwardRef, ReactNode, CSSProperties, RefObject } from 'react';
import Trigger from 'rc-trigger';
import Popup from './Popup';
import { placements } from './placements';

interface AlignType {
  points?: string[];
  offset?: number[];
  targetOffset?: number[];
  overflow?: { adjustX?: boolean; adjustY?: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

interface MotionType {
  motionName?: string;
  motionAppear?: boolean;
  motionEnter?: boolean;
  motionLeave?: boolean;
  motionLeaveImmediately?: boolean;
  onEnterStart?: () => void;
  onEnterActive?: () => void;
  onEnterEnd?: () => void;
  onLeaveStart?: () => void;
  onLeaveActive?: () => void;
  onLeaveEnd?: () => void;
}

type TriggerAction = 'hover' | 'click' | 'focus' | 'contextMenu';
type PlacementType = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

interface DestroyTooltipOptions {
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
  motion?: MotionType;
  placement?: PlacementType;
  align?: AlignType;
  destroyTooltipOnHide?: boolean | DestroyTooltipOptions;
  defaultVisible?: boolean;
  visible?: boolean;
  getTooltipContainer?: () => HTMLElement;
  overlayInnerStyle?: CSSProperties;
  arrowContent?: ReactNode;
  overlay?: ReactNode;
  id?: string;
  showArrow?: boolean;
}

interface TooltipRef {
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
    motion,
    placement = 'right',
    align = {},
    destroyTooltipOnHide = false,
    defaultVisible,
    visible,
    getTooltipContainer,
    overlayInnerStyle,
    arrowContent,
    overlay,
    id,
    showArrow = true,
    ...restProps
  } = props;

  const triggerRef = useRef<TooltipRef>(null);

  useImperativeHandle(ref, () => triggerRef.current!);

  const triggerProps: Record<string, unknown> = { ...restProps };

  if (visible !== undefined) {
    triggerProps.popupVisible = visible;
  }

  let destroyPopup = false;
  let autoDestroy = false;

  if (typeof destroyTooltipOnHide === 'boolean') {
    destroyPopup = destroyTooltipOnHide;
  } else if (destroyTooltipOnHide && typeof destroyTooltipOnHide === 'object') {
    const { keepParent } = destroyTooltipOnHide;
    destroyPopup = keepParent === true;
    autoDestroy = keepParent === false;
  }

  const renderPopup = (): ReactNode => {
    return (
      <Popup
        showArrow={showArrow}
        arrowContent={arrowContent}
        key="content"
        prefixCls={prefixCls}
        id={id}
        overlayInnerStyle={overlayInnerStyle}
      >
        {overlay}
      </Popup>
    );
  };

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
      popupMotion={motion}
      defaultPopupVisible={defaultVisible}
      destroyPopupOnHide={destroyPopup}
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

export default Tooltip;