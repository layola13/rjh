import React from 'react';
import warning from 'rc-util/lib/warning';
import * as utils from './utils';
import Track from './Track';
import createSlider from './createSlider';

interface SliderProps {
  prefixCls?: string;
  vertical?: boolean;
  included?: boolean;
  disabled?: boolean;
  minimumTrackStyle?: React.CSSProperties;
  maximumTrackStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties | React.CSSProperties[];
  handleStyle?: React.CSSProperties | React.CSSProperties[];
  railStyle?: React.CSSProperties;
  tabIndex?: number;
  ariaLabelForHandle?: string;
  ariaLabelledByForHandle?: string;
  ariaValueTextFormatterForHandle?: (value: number) => string;
  min: number;
  max: number;
  step?: number;
  marks?: Record<number, React.ReactNode | { style?: React.CSSProperties; label?: string }>;
  dots?: boolean;
  value?: number;
  defaultValue?: number;
  startPoint?: number;
  reverse?: boolean;
  handle?: (props: HandleProps) => React.ReactElement;
  onChange: (value: number) => void;
  onBeforeChange: (value: number) => void;
  onAfterChange: (value: number) => void;
}

interface HandleProps {
  className: string;
  prefixCls: string;
  vertical: boolean;
  offset: number;
  value: number;
  dragging: boolean;
  disabled: boolean;
  min: number;
  max: number;
  reverse: boolean;
  index: number;
  tabIndex?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaValueTextFormatter?: (value: number) => string;
  style?: React.CSSProperties;
  ref: (handle: any) => void;
}

interface SliderState {
  value: number;
  dragging: boolean;
}

class Slider extends React.Component<SliderProps, SliderState> {
  private startValue?: number;
  private startPosition?: number;
  private prevMovedHandleIndex?: number;

  constructor(props: SliderProps) {
    super(props);

    const defaultValue = props.defaultValue !== undefined ? props.defaultValue : props.min;
    const value = props.value !== undefined ? props.value : defaultValue;

    this.state = {
      value: this.trimAlignValue(value),
      dragging: false,
    };

    warning(
      !('minimumTrackStyle' in props),
      'minimumTrackStyle will be deprecated, please use trackStyle instead.'
    );

    warning(
      !('maximumTrackStyle' in props),
      'maximumTrackStyle will be deprecated, please use railStyle instead.'
    );
  }

  componentDidUpdate(prevProps: SliderProps, prevState: SliderState): void {
    const { min, max, value, onChange } = this.props;

    if ('min' in this.props || 'max' in this.props) {
      const currentValue = value !== undefined ? value : prevState.value;
      const trimmedValue = this.trimAlignValue(currentValue, this.props);

      if (trimmedValue !== prevState.value) {
        this.setState({ value: trimmedValue });

        if (
          min !== prevProps.min ||
          max !== prevProps.max ||
          utils.isValueOutOfRange(currentValue, this.props)
        ) {
          onChange(trimmedValue);
        }
      }
    }
  }

  positionGetValue = (position: number): number[] => {
    return [];
  };

  calcValueByPos(position: number): number {
    return 0;
  }

  calcOffset(value: number): number {
    return 0;
  }

  saveHandle(index: number, handle: any): void {}

  removeDocumentEvents(): void {}

  getValue(): number {
    return this.state.value;
  }

  getLowerBound(): number {
    const startPoint = this.props.startPoint ?? this.props.min;
    return this.state.value > startPoint ? startPoint : this.state.value;
  }

  getUpperBound(): number {
    const { startPoint } = this.props;
    return startPoint !== undefined && this.state.value < startPoint
      ? startPoint
      : this.state.value;
  }

  trimAlignValue(rawValue: number | null, propsOverride: Partial<SliderProps> = {}): number | null {
    if (rawValue === null) {
      return null;
    }

    const mergedProps = { ...this.props, ...propsOverride };
    const valueInRange = utils.ensureValueInRange(rawValue, mergedProps);
    return utils.ensureValuePrecision(valueInRange, mergedProps);
  }

  onChange(changeData: { value: number }): void {
    const isControlled = 'value' in this.props;
    const adjustedChange =
      changeData.value > this.props.max
        ? { ...changeData, value: this.props.max }
        : changeData;

    if (!isControlled) {
      this.setState(adjustedChange);
    }

    this.props.onChange(adjustedChange.value);
  }

  onStart(position: number): void {
    this.setState({ dragging: true });

    const currentValue = this.getValue();
    this.props.onBeforeChange(currentValue);

    const newValue = this.calcValueByPos(position);
    this.startValue = newValue;
    this.startPosition = position;

    if (newValue !== currentValue) {
      this.prevMovedHandleIndex = 0;
      this.onChange({ value: newValue });
    }
  }

  onMove(event: React.MouseEvent | React.TouchEvent, position: number): void {
    utils.pauseEvent(event);

    const { value: currentValue } = this.state;
    const newValue = this.calcValueByPos(position);

    if (newValue !== currentValue) {
      this.onChange({ value: newValue });
    }
  }

  onEnd = (force?: boolean): void => {
    const { dragging } = this.state;
    this.removeDocumentEvents();

    if (dragging || force) {
      this.props.onAfterChange(this.getValue());
    }

    this.setState({ dragging: false });
  };

  onKeyboard(event: React.KeyboardEvent): void {
    const { reverse, vertical } = this.props;
    const valueMutator = utils.getKeyboardValueMutator(event, vertical, reverse);

    if (valueMutator) {
      utils.pauseEvent(event);

      const { value: currentValue } = this.state;
      const mutatedValue = valueMutator(currentValue, this.props);
      const trimmedValue = this.trimAlignValue(mutatedValue);

      if (trimmedValue === currentValue) {
        return;
      }

      this.onChange({ value: trimmedValue });
      this.props.onAfterChange(trimmedValue);
      this.onEnd();
    }
  }

  render(): { tracks: React.ReactElement; handles: React.ReactElement } {
    const {
      prefixCls,
      vertical,
      included,
      disabled,
      minimumTrackStyle,
      trackStyle,
      handleStyle,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaValueTextFormatterForHandle,
      min,
      max,
      startPoint,
      reverse,
      handle,
    } = this.props;

    const { value, dragging } = this.state;
    const offset = this.calcOffset(value);

    const handleElement = handle({
      className: `${prefixCls}-handle`,
      prefixCls: prefixCls!,
      vertical: vertical!,
      offset,
      value,
      dragging,
      disabled: disabled!,
      min,
      max,
      reverse: reverse!,
      index: 0,
      tabIndex,
      ariaLabel: ariaLabelForHandle,
      ariaLabelledBy: ariaLabelledByForHandle,
      ariaValueTextFormatter: ariaValueTextFormatterForHandle,
      style: Array.isArray(handleStyle) ? handleStyle[0] : handleStyle,
      ref: (handleRef) => this.saveHandle(0, handleRef),
    });

    const startOffset = startPoint !== undefined ? this.calcOffset(startPoint) : 0;
    const trackStyleValue = Array.isArray(trackStyle) ? trackStyle[0] : trackStyle;

    return {
      tracks: (
        <Track
          className={`${prefixCls}-track`}
          vertical={vertical}
          included={included}
          offset={startOffset}
          reverse={reverse}
          length={offset - startOffset}
          style={{ ...minimumTrackStyle, ...trackStyleValue }}
        />
      ),
      handles: handleElement,
    };
  }
}

export default createSlider(Slider);