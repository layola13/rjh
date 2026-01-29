import React, { forwardRef, useContext, useState, useRef, ReactElement } from 'react';
import RcSlider from 'rc-slider';
import RcSliderHandle from 'rc-slider/lib/Handle';
import RcSliderRange from 'rc-slider/lib/Range';
import Tooltip from '../tooltip';
import { ConfigContext } from '../config-provider';
import classNames from 'classnames';

type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

interface HandleInfo {
  value: number;
  dragging: boolean;
  index: number;
  [key: string]: any;
}

interface TooltipVisibilityState {
  [index: number]: boolean;
}

interface RangeConfig {
  draggableTrack?: boolean;
  [key: string]: any;
}

interface SliderProps {
  prefixCls?: string;
  tooltipPrefixCls?: string;
  range?: boolean | RangeConfig;
  className?: string;
  tipFormatter?: ((value: number) => string) | null;
  tooltipVisible?: boolean;
  tooltipPlacement?: TooltipPlacement;
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  vertical?: boolean;
  reverse?: boolean;
  step?: number;
  [key: string]: any;
}

const getTooltipPlacement = (placement: TooltipPlacement | undefined, isVertical: boolean, direction: 'ltr' | 'rtl'): TooltipPlacement => {
  if (placement) {
    return placement;
  }
  return isVertical ? (direction === 'rtl' ? 'left' : 'right') : 'top';
};

const Slider = forwardRef<any, SliderProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    tooltipPrefixCls: customizeTooltipPrefixCls,
    range,
    className,
    tipFormatter = (value: number): string => {
      return typeof value === 'number' ? value.toString() : '';
    },
    tooltipVisible,
    tooltipPlacement,
    getTooltipPopupContainer,
    vertical,
    reverse,
    step,
    ...restProps
  } = props;

  const { getPrefixCls, direction, getPopupContainer } = useContext(ConfigContext);
  
  const [tooltipVisibilityStates, setTooltipVisibilityStates] = useState<TooltipVisibilityState>({});

  const updateTooltipVisibility = (index: number, visible: boolean): void => {
    setTooltipVisibilityStates((prevStates) => ({
      ...prevStates,
      [index]: visible,
    }));
  };

  const renderHandle = (handleProps: {
    tooltipPrefixCls: string;
    prefixCls: string;
    info: HandleInfo;
  }): ReactElement => {
    const { tooltipPrefixCls, prefixCls, info } = handleProps;
    const { value, dragging, index, ...restHandleInfo } = info;

    const shouldShowTooltip = !!tipFormatter && (tooltipVisibilityStates[index] || dragging);
    const isTooltipVisible = tooltipVisible ?? (tooltipVisible === undefined && shouldShowTooltip);

    const placement = getTooltipPlacement(tooltipPlacement, !!vertical, direction);

    return (
      <Tooltip
        prefixCls={tooltipPrefixCls}
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={isTooltipVisible}
        placement={placement}
        transitionName="zoom-down"
        key={index}
        overlayClassName={`${prefixCls}-tooltip`}
        getPopupContainer={getTooltipPopupContainer || getPopupContainer}
      >
        <RcSliderHandle
          {...restHandleInfo}
          value={value}
          onMouseEnter={() => updateTooltipVisibility(index, true)}
          onMouseLeave={() => updateTooltipVisibility(index, false)}
        />
      </Tooltip>
    );
  };

  const sliderPrefixCls = getPrefixCls('slider', customizePrefixCls);
  const tooltipPrefixCls = getPrefixCls('tooltip', customizeTooltipPrefixCls);

  const sliderClassName = classNames(className, {
    [`${sliderPrefixCls}-rtl`]: direction === 'rtl',
  });

  let finalReverse = reverse;
  if (direction === 'rtl' && !vertical) {
    finalReverse = !reverse;
  }

  let draggableTrack: boolean | undefined;
  if (typeof range === 'object') {
    draggableTrack = range.draggableTrack;
  }

  const commonProps = {
    ...restProps,
    step,
    className: sliderClassName,
    ref,
    prefixCls: sliderPrefixCls,
    reverse: finalReverse,
    handle: (info: HandleInfo) => renderHandle({
      tooltipPrefixCls,
      prefixCls: sliderPrefixCls,
      info,
    }),
  };

  if (range) {
    return (
      <RcSliderRange
        {...commonProps}
        draggableTrack={draggableTrack}
      />
    );
  }

  return <RcSlider {...commonProps} />;
});

Slider.displayName = 'Slider';

export default Slider;