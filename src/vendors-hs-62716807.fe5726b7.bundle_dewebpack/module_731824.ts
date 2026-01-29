import React, { useContext, ReactElement, ReactNode } from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import RightOutlined from '@ant-design/icons/RightOutlined';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
import { cloneElement } from '../_util/reactNode';
import DropdownButton from './DropdownButton';

type Placement = 
  | 'topLeft' 
  | 'topCenter' 
  | 'topRight' 
  | 'bottomLeft' 
  | 'bottomCenter' 
  | 'bottomRight';

type TriggerType = 'click' | 'hover' | 'contextMenu';

interface OverlayProps {
  mode?: 'vertical' | 'horizontal';
  selectable?: boolean;
  focusable?: boolean;
  expandIcon?: ReactNode;
}

interface DropdownProps {
  arrow?: boolean;
  prefixCls?: string;
  children: ReactElement;
  trigger?: TriggerType[];
  disabled?: boolean;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  overlayClassName?: string;
  placement?: Placement;
  transitionName?: string;
  overlay: ReactElement | (() => ReactElement);
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

/**
 * Determines the transition animation name based on placement
 */
const getTransitionName = (placement: string = '', transitionName?: string): string => {
  if (transitionName !== undefined) {
    return transitionName;
  }
  return placement.indexOf('top') >= 0 ? 'slide-down' : 'slide-up';
};

/**
 * Generates the overlay menu with proper configuration
 */
const generateOverlay = (prefixCls: string, overlay: ReactElement | (() => ReactElement)): ReactElement => {
  let overlayElement: ReactElement;
  
  if (typeof overlay === 'function') {
    overlayElement = overlay();
  } else {
    overlayElement = overlay;
  }

  overlayElement = React.Children.only(
    typeof overlayElement === 'string' 
      ? React.createElement('span', null, overlayElement) 
      : overlayElement
  );

  const overlayProps = overlayElement.props as OverlayProps;

  warning(
    !overlayProps.mode || overlayProps.mode === 'vertical',
    'Dropdown',
    `mode="${overlayProps.mode}" is not supported for Dropdown's Menu.`
  );

  const selectable = overlayProps.selectable !== undefined ? overlayProps.selectable : false;
  const focusable = overlayProps.focusable === undefined || overlayProps.focusable;

  const expandIcon = React.createElement(
    'span',
    { className: `${prefixCls}-menu-submenu-arrow` },
    React.createElement(RightOutlined, {
      className: `${prefixCls}-menu-submenu-arrow-icon`
    })
  );

  if (typeof overlayElement.type === 'string') {
    return overlayElement;
  }

  return cloneElement(overlayElement, {
    mode: 'vertical',
    selectable,
    focusable,
    expandIcon
  });
};

/**
 * Determines the dropdown placement based on direction
 */
const getPlacement = (placement?: Placement, direction?: string): Placement => {
  if (placement !== undefined) {
    return placement;
  }
  return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
};

const Dropdown: React.FC<DropdownProps> & { Button: typeof DropdownButton } = (props) => {
  const {
    arrow,
    prefixCls: customPrefixCls,
    children,
    trigger,
    disabled,
    getPopupContainer: customGetPopupContainer,
    overlayClassName,
    placement,
    transitionName,
    overlay,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    ...restProps
  } = props;

  const { getPopupContainer, getPrefixCls, direction } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('dropdown', customPrefixCls);

  const child = React.Children.only(children);
  
  const triggerElement = cloneElement(child, {
    className: classNames(
      `${prefixCls}-trigger`,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl'
      },
      child.props.className
    ),
    disabled
  });

  const overlayClassNameMerged = classNames(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });

  let triggerActions: TriggerType[] = disabled ? [] : (trigger ?? []);
  const alignPoint = triggerActions && triggerActions.indexOf('contextMenu') !== -1;

  return React.createElement(
    RcDropdown,
    {
      arrow,
      alignPoint,
      ...restProps,
      overlayClassName: overlayClassNameMerged,
      prefixCls,
      getPopupContainer: customGetPopupContainer || getPopupContainer,
      transitionName: getTransitionName(placement, transitionName),
      trigger: triggerActions,
      overlay: () => generateOverlay(prefixCls, overlay),
      placement: getPlacement(placement, direction),
      mouseEnterDelay,
      mouseLeaveDelay
    },
    triggerElement
  );
};

Dropdown.Button = DropdownButton;

export default Dropdown;