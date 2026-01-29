import React, { useContext, useState, useEffect, forwardRef, cloneElement, isValidElement, ReactElement, CSSProperties, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import RcTooltip from 'rc-tooltip';
import getPlacements from './placements';
import { ConfigContext } from '../config-provider';
import { PresetColorTypes } from '../_util/colors';

interface PickedStyleResult {
  picked: CSSProperties;
  omitted: CSSProperties;
}

interface TooltipProps {
  prefixCls?: string;
  openClassName?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  getTooltipContainer?: (triggerNode: HTMLElement) => HTMLElement;
  overlayClassName?: string;
  color?: string;
  overlayInnerStyle?: CSSProperties;
  children: ReactElement;
  visible?: boolean;
  defaultVisible?: boolean;
  title?: React.ReactNode;
  overlay?: React.ReactNode;
  placement?: string;
  transitionName?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean;
  builtinPlacements?: Record<string, any>;
  onVisibleChange?: (visible: boolean) => void;
}

interface ComponentType {
  __ANT_BUTTON?: boolean;
  __ANT_SWITCH?: boolean;
  __ANT_CHECKBOX?: boolean;
}

const PRESET_COLOR_REGEX = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);

function pickStyle(style: CSSProperties, keys: string[]): PickedStyleResult {
  const picked: CSSProperties = {};
  const omitted: CSSProperties = { ...style };

  keys.forEach((key) => {
    if (style && key in style) {
      picked[key] = style[key];
      delete omitted[key];
    }
  });

  return { picked, omitted };
}

function wrapDisabledChild(element: ReactElement, prefixCls: string): ReactElement {
  const elementType = element.type as ComponentType;

  if (
    (elementType.__ANT_BUTTON === true ||
      elementType.__ANT_SWITCH === true ||
      elementType.__ANT_CHECKBOX === true ||
      element.type === 'button') &&
    element.props.disabled
  ) {
    const { picked, omitted } = pickStyle(element.props.style, [
      'position',
      'left',
      'right',
      'top',
      'bottom',
      'float',
      'display',
      'zIndex',
    ]);

    const wrapperStyle: CSSProperties = {
      display: 'inline-block',
      ...picked,
      cursor: 'not-allowed',
      width: element.props.block ? '100%' : undefined,
    };

    const childStyle: CSSProperties = {
      ...omitted,
      pointerEvents: 'none',
    };

    const wrappedChild = cloneElement(element, {
      style: childStyle,
      className: null,
    });

    return React.createElement(
      'span',
      {
        style: wrapperStyle,
        className: classNames(element.props.className, `${prefixCls}-disabled-compatible-wrapper`),
      },
      wrappedChild
    );
  }

  return element;
}

const Tooltip: ForwardRefRenderFunction<unknown, TooltipProps> = (props, ref) => {
  const { getPopupContainer, getPrefixCls, direction } = useContext(ConfigContext);

  const [visible, setVisible] = useState(!!props.visible || !!props.defaultVisible);

  useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible);
    }
  }, [props.visible]);

  const isNoContent = (): boolean => {
    const { title, overlay } = props;
    return !title && !overlay && title !== 0;
  };

  const getBuiltinPlacements = () => {
    const { builtinPlacements, arrowPointAtCenter, autoAdjustOverflow } = props;
    return builtinPlacements || getPlacements({
      arrowPointAtCenter,
      autoAdjustOverflow,
    });
  };

  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getPopupContainer: customGetPopupContainer,
    getTooltipContainer,
    overlayClassName,
    color,
    overlayInnerStyle,
    children,
  } = props;

  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);

  let tempVisible = visible;
  if (!('visible' in props) && isNoContent()) {
    tempVisible = false;
  }

  const child = wrapDisabledChild(
    isValidElement(children) ? children : React.createElement('span', null, children),
    prefixCls
  );

  const childClassName = classNames(child.props.className, {
    [openClassName || `${prefixCls}-open`]: true,
  });

  const overlayClassNameCustomized = classNames(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-${color}`]: color && PRESET_COLOR_REGEX.test(color),
  });

  let formattedOverlayInnerStyle = overlayInnerStyle;
  let arrowContentStyle: CSSProperties | undefined;

  if (color && !PRESET_COLOR_REGEX.test(color)) {
    formattedOverlayInnerStyle = {
      ...overlayInnerStyle,
      background: color,
    };
    arrowContentStyle = { background: color };
  }

  const getOverlay = (): React.ReactNode => {
    const { title, overlay } = props;
    return title === 0 ? title : overlay || title || '';
  };

  const handleVisibleChange = (newVisible: boolean): void => {
    if (!('visible' in props)) {
      setVisible(!isNoContent() && newVisible);
    }
    if (props.onVisibleChange && !isNoContent()) {
      props.onVisibleChange(newVisible);
    }
  };

  const handlePopupAlign = (popupElement: HTMLElement, align: any): void => {
    const placements = getBuiltinPlacements();
    const placementKeys = Object.keys(placements).filter(
      (key) =>
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1]
    );

    if (placementKeys.length > 0) {
      const placement = placementKeys[0];
      const rect = popupElement.getBoundingClientRect();
      const transformOrigin: CSSProperties = {
        top: '50%',
        left: '50%',
      };

      if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
        transformOrigin.top = `${rect.height - align.offset[1]}px`;
      } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
        transformOrigin.top = `${-align.offset[1]}px`;
      }

      if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
        transformOrigin.left = `${rect.width - align.offset[0]}px`;
      } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
        transformOrigin.left = `${-align.offset[0]}px`;
      }

      popupElement.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
    }
  };

  return (
    <RcTooltip
      {...props}
      prefixCls={prefixCls}
      overlayClassName={overlayClassNameCustomized}
      getTooltipContainer={customGetPopupContainer || getTooltipContainer || getPopupContainer}
      ref={ref}
      builtinPlacements={getBuiltinPlacements()}
      overlay={getOverlay()}
      visible={tempVisible}
      onVisibleChange={handleVisibleChange}
      onPopupAlign={handlePopupAlign}
      overlayInnerStyle={formattedOverlayInnerStyle}
      arrowContent={<span className={`${prefixCls}-arrow-content`} style={arrowContentStyle} />}
    >
      {tempVisible ? cloneElement(child, { className: childClassName }) : child}
    </RcTooltip>
  );
};

const TooltipComponent = forwardRef(Tooltip);

TooltipComponent.displayName = 'Tooltip';

TooltipComponent.defaultProps = {
  placement: 'top',
  transitionName: 'zoom-big-fast',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
};

export default TooltipComponent;