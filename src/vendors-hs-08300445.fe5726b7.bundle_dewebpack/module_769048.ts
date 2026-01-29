import React from 'react';
import Tooltip from './Tooltip';
import Handle from './Handle';

interface TooltipVisibles {
  [index: number]: boolean;
}

interface HandleWithTooltipProps {
  value: number;
  dragging: boolean;
  index: number;
  disabled: boolean;
  [key: string]: any;
}

interface TooltipProps {
  prefixCls?: string;
  overlay?: React.ReactNode;
  placement?: string;
  visible?: boolean;
  [key: string]: any;
}

interface SliderWithTooltipProps {
  tipFormatter?: (value: number) => React.ReactNode;
  handleStyle?: React.CSSProperties | React.CSSProperties[];
  tipProps?: TooltipProps;
  getTooltipContainer?: (node: HTMLElement) => HTMLElement;
  [key: string]: any;
}

interface SliderWithTooltipState {
  visibles: TooltipVisibles;
}

export default function createSliderWithTooltip<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & SliderWithTooltipProps> {
  class SliderWithTooltip extends React.Component<
    P & SliderWithTooltipProps,
    SliderWithTooltipState
  > {
    static defaultProps = {
      tipFormatter: (value: number) => value,
      handleStyle: [{}],
      tipProps: {},
      getTooltipContainer: (node: HTMLElement) => node.parentNode as HTMLElement,
    };

    state: SliderWithTooltipState = {
      visibles: {},
    };

    handleTooltipVisibleChange = (index: number, visible: boolean): void => {
      this.setState((prevState) => ({
        visibles: {
          ...prevState.visibles,
          [index]: visible,
        },
      }));
    };

    handleWithTooltip = (props: HandleWithTooltipProps): React.ReactElement => {
      const { value, dragging, index, disabled, ...restHandleProps } = props;
      const {
        tipFormatter,
        tipProps,
        handleStyle,
        getTooltipContainer,
      } = this.props;

      const {
        prefixCls = 'rc-slider-tooltip',
        overlay = tipFormatter?.(value),
        placement = 'top',
        visible: visibleProp,
        ...restTipProps
      } = tipProps ?? {};

      const currentHandleStyle = Array.isArray(handleStyle)
        ? handleStyle[index] ?? handleStyle[0]
        : handleStyle;

      const isVisible =
        visibleProp !== undefined
          ? visibleProp
          : !disabled && (this.state.visibles[index] || dragging);

      return (
        <Tooltip
          {...restTipProps}
          getTooltipContainer={getTooltipContainer}
          prefixCls={prefixCls}
          overlay={overlay}
          placement={placement}
          visible={isVisible}
          key={index}
        >
          <Handle
            {...restHandleProps}
            style={{ ...currentHandleStyle }}
            value={value}
            onMouseEnter={() => this.handleTooltipVisibleChange(index, true)}
            onMouseLeave={() => this.handleTooltipVisibleChange(index, false)}
          />
        </Tooltip>
      );
    };

    render(): React.ReactElement {
      return <Component {...this.props} handle={this.handleWithTooltip} />;
    }
  }

  return SliderWithTooltip;
}