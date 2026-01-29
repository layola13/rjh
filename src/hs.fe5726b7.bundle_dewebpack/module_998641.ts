import { Component, ReactNode, MouseEvent } from 'react';
import { NumberInput, Slider } from './components';
import { assembleProps, decimalAdjust } from './utils';
import { IValueChange } from './mixins';

interface NumberInputProps {
  value?: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  precision: number;
  readOnly: boolean;
  isLenghtUnit: boolean;
}

interface SliderInputData {
  className?: string;
  label?: string;
  twoWays?: boolean;
  startValue?: number;
  disabled?: boolean;
  tooltip?: string;
  marks?: Record<string, string | number>;
  delay?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onValueChange?: (value: number) => void;
  options?: {
    tips?: string;
  };
}

interface SliderInputProps {
  data: SliderInputData;
}

interface SliderInputState {
  value: number;
}

interface ChangeEventDetail {
  detail: {
    value: number;
  };
}

interface MouseTipsOptions {
  background: string;
  txtColor: string;
}

interface MouseTipsPosition {
  x: number;
  y: number;
}

declare global {
  const HSCore: {
    Util: {
      Unit: {
        ConvertToMeter(unit: string, value: number): number;
        ConvertMeterToCustom(unit: string, value: number): number;
      };
    };
  };
  const HSApp: {
    Config: {
      TENANT: string;
    };
  };
  function updateMouseTips(
    tips?: string,
    position?: MouseTipsPosition,
    options?: MouseTipsOptions
  ): void;
}

class SliderInput extends Component<SliderInputProps, SliderInputState> implements IValueChange {
  private numberInputProps: NumberInputProps;
  private dirty: boolean;

  changeStart: (event: ChangeEventDetail) => void;
  changed: (event: ChangeEventDetail) => void;
  changeEnd: (event: ChangeEventDetail) => void;
  updateController: (props: SliderInputProps) => void;

  constructor(props: SliderInputProps) {
    super(props);

    this.numberInputProps = assembleProps(props.data);
    this.state = {
      value: this.numberInputProps.value || 0
    };
    this.dirty = false;

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleBeforeSliderChange = this.handleBeforeSliderChange.bind(this);
    this.handleAfterSliderChange = this.handleAfterSliderChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onFocus = (): void => {
    const { onFocus } = this.props.data;
    onFocus?.();
  };

  onBlur = (): void => {
    const { onBlur } = this.props.data;
    onBlur?.();
  };

  UNSAFE_componentWillReceiveProps(nextProps: SliderInputProps): void {
    this.numberInputProps = assembleProps(nextProps.data);
    this.setState({
      value: this.numberInputProps.value
    });
    this.updateController(nextProps);
  }

  handleSliderChange(sliderValue: number): void {
    const { delay, marks } = this.props.data;
    const { isLenghtUnit } = this.numberInputProps;

    if (marks) {
      Object.keys(marks).forEach((markKey) => {
        const markValue = parseFloat(markKey);
        if (sliderValue < markValue + 5 && sliderValue > markValue - 5) {
          sliderValue = markValue;
        }
      });
    }

    const convertedValue = isLenghtUnit
      ? HSCore.Util.Unit.ConvertToMeter(this.numberInputProps.unit, sliderValue)
      : sliderValue;

    if (!this.dirty) {
      this.handleBeforeSliderChange(sliderValue);
      this.dirty = true;
    }

    this.setState({
      value: convertedValue
    });

    if (!delay) {
      const event: ChangeEventDetail = {
        detail: {
          value: convertedValue
        }
      };
      this.changed(event);
    }
  }

  handleBeforeSliderChange(sliderValue: number): void {
    const { isLenghtUnit, unit } = this.numberInputProps;
    const event: ChangeEventDetail = {
      detail: {
        value: isLenghtUnit
          ? HSCore.Util.Unit.ConvertToMeter(unit, sliderValue)
          : sliderValue
      }
    };
    this.changeStart(event);
  }

  handleAfterSliderChange(sliderValue: number): void {
    const { isLenghtUnit, unit } = this.numberInputProps;
    const event: ChangeEventDetail = {
      detail: {
        value: isLenghtUnit
          ? HSCore.Util.Unit.ConvertToMeter(unit, sliderValue)
          : sliderValue
      }
    };
    this.changeEnd(event);
    this.dirty = false;
  }

  handleInputChange(inputValue: number): void {
    this.setState({
      value: inputValue
    });

    const event: ChangeEventDetail = {
      detail: {
        value: inputValue
      }
    };

    this.changeStart(event);
    this.changed(event);
    this.changeEnd(event);
  }

  updateTips(mouseEvent: MouseEvent<HTMLDivElement>): void {
    const { options } = this.props.data;
    if (options?.tips) {
      updateMouseTips(
        options.tips,
        {
          x: mouseEvent.clientX,
          y: mouseEvent.clientY + 50
        },
        {
          background: 'rgba(60, 60, 60, 0.85)',
          txtColor: 'rgba(255, 255, 255, 1)'
        }
      );
    }
  }

  deleteTips(): void {
    updateMouseTips();
  }

  render(): ReactNode {
    const {
      className = '',
      label,
      twoWays,
      startValue = 0,
      disabled,
      tooltip,
      marks
    } = this.props.data;

    const { min, max, readOnly, step, unit, precision, isLenghtUnit } = this.numberInputProps;

    const displayValue = isLenghtUnit
      ? HSCore.Util.Unit.ConvertMeterToCustom(unit, this.state.value)
      : this.state.value;

    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const minValue = decimalAdjust('round', min, 0 - precision);
    const maxValue = decimalAdjust('round', max || Math.floor(2 * displayValue), 0 - precision);

    return (
      <div
        className={`widgtes-slider-input ${className}`}
        onMouseEnter={(e) => this.updateTips(e)}
        onMouseMove={(e) => this.updateTips(e)}
        onMouseLeave={() => this.deleteTips()}
      >
        <div className="widgtes-slider-input-content">
          <div className="widgtes-slider-input-content-input">
            <span className="widgtes-label slider-input-label">{label}</span>
            <NumberInput
              className="widgtes-slider-input-content-input_numberInput"
              tooltip={tooltip}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              {...this.numberInputProps}
              baseUnit="m"
              autoSelect={true}
              value={displayValue}
              min={minValue}
              max={isFpTenant ? undefined : maxValue}
              disabledTooltip={isFpTenant}
              onValueChange={this.handleInputChange}
            />
          </div>
          <div className="widgtes-slider-input-content-slider">
            <Slider
              min={minValue}
              max={maxValue}
              value={displayValue}
              disabled={disabled || readOnly}
              twoWays={twoWays}
              startValue={startValue}
              step={step}
              marks={marks}
              onChange={this.handleSliderChange}
              onAfterChange={this.handleAfterSliderChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SliderInput;