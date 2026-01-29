import React from 'react';
import { Slider, NumberInput } from './components';
import { assembleProps, decimalAdjust } from './utils';
import { IValueChange } from './mixins';

interface NumberInputProps {
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  precision: number;
  isLenghtUnit: boolean;
  readOnly: boolean;
}

interface SliderInputData {
  className?: string;
  label?: string;
  checkboxOptions?: unknown;
  twoWays?: boolean;
  startValue?: number;
  disabled?: boolean;
  options?: {
    tips?: string;
  };
  tooltip?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onValueChange?: (value: number) => void;
  delay?: boolean;
}

interface SliderInputProps {
  data: SliderInputData;
}

interface SliderInputState {
  value: number;
}

interface ChangeEvent {
  detail: {
    value: number;
  };
}

declare global {
  interface Window {
    HSCore: {
      Util: {
        Unit: {
          ConvertToMeter(unit: string, value: number): number;
          ConvertMeterToCustom(unit: string, value: number): number;
        };
      };
    };
    HSApp: {
      Config: {
        TENANT: string;
      };
    };
  }
}

declare function updateMouseTips(
  tips?: string,
  position?: { x: number; y: number },
  style?: { background: string; txtColor: string }
): void;

class SliderInput extends React.Component<SliderInputProps, SliderInputState> {
  private numberInputProps: NumberInputProps;
  private dirty: boolean;

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

  UNSAFE_componentWillReceiveProps(nextProps: SliderInputProps): void {
    this.numberInputProps = assembleProps(nextProps.data);
    this.setState({
      value: this.numberInputProps.value
    });
    this.updateController(nextProps);
  }

  private onFocus = (): void => {
    const { onFocus } = this.props.data;
    onFocus?.();
  };

  private onBlur = (): void => {
    const { onBlur } = this.props.data;
    onBlur?.();
  };

  private handleSliderChange(sliderValue: number): void {
    const { delay } = this.props.data;
    const convertedValue = this.numberInputProps.isLenghtUnit
      ? window.HSCore.Util.Unit.ConvertToMeter(this.numberInputProps.unit, sliderValue)
      : sliderValue;

    if (!this.dirty) {
      this.handleBeforeSliderChange(sliderValue);
      this.dirty = true;
    }

    this.setState({
      value: convertedValue
    });

    if (!delay) {
      const event: ChangeEvent = {
        detail: {
          value: convertedValue
        }
      };
      this.changed(event);
    }
  }

  private handleBeforeSliderChange(sliderValue: number): void {
    const convertedValue = this.numberInputProps.isLenghtUnit
      ? window.HSCore.Util.Unit.ConvertToMeter(this.numberInputProps.unit, sliderValue)
      : sliderValue;

    const event: ChangeEvent = {
      detail: {
        value: convertedValue
      }
    };
    this.changeStart(event);
  }

  private handleAfterSliderChange(sliderValue: number): void {
    const convertedValue = this.numberInputProps.isLenghtUnit
      ? window.HSCore.Util.Unit.ConvertToMeter(this.numberInputProps.unit, sliderValue)
      : sliderValue;

    const event: ChangeEvent = {
      detail: {
        value: convertedValue
      }
    };
    this.changeEnd(event);
    this.dirty = false;
  }

  private handleInputChange(inputValue: number): void {
    this.setState({
      value: inputValue
    });

    const event: ChangeEvent = {
      detail: {
        value: inputValue
      }
    };
    this.changeStart(event);
    this.changed(event);
    this.changeEnd(event);
  }

  private updateTips(mouseEvent: React.MouseEvent): void {
    const { options } = this.props.data;
    if (options?.tips) {
      const tips = options.tips;
      updateMouseTips(tips, {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY + 50
      }, {
        background: 'rgba(60, 60, 60, 0.85)',
        txtColor: 'rgba(255, 255, 255, 1)'
      });
    }
  }

  private deleteTips(): void {
    updateMouseTips();
  }

  private updateController(props: SliderInputProps): void {
    // Implementation from IValueChange mixin
  }

  private changed(event: ChangeEvent): void {
    // Implementation from IValueChange mixin
  }

  private changeStart(event: ChangeEvent): void {
    // Implementation from IValueChange mixin
  }

  private changeEnd(event: ChangeEvent): void {
    // Implementation from IValueChange mixin
  }

  render(): React.ReactElement {
    const {
      className = '',
      label,
      twoWays,
      startValue = 0,
      disabled,
      tooltip
    } = this.props.data;

    const {
      min,
      max,
      readOnly,
      step,
      unit,
      precision,
      isLenghtUnit
    } = this.numberInputProps;

    const displayValue = isLenghtUnit
      ? window.HSCore.Util.Unit.ConvertMeterToCustom(unit, this.state.value)
      : this.state.value;

    const isFPTenant = window.HSApp.Config.TENANT === 'fp';
    const minValue = decimalAdjust('round', min, -precision);
    const maxValue = decimalAdjust('round', max || Math.floor(2 * displayValue), -precision);

    return (
      <div
        className={`property-bar-slider-input ${className}`}
        onMouseEnter={(event) => this.updateTips(event)}
        onMouseMove={(event) => this.updateTips(event)}
        onMouseLeave={() => this.deleteTips()}
      >
        <div className="property-bar-slider-input-content">
          <div className="property-bar-slider">
            <span className="property-bar-label slider-input-label">{label}</span>
            <Slider
              min={minValue}
              max={maxValue}
              value={displayValue}
              disabled={disabled || readOnly}
              twoWays={twoWays}
              startValue={startValue}
              step={step}
              onChange={this.handleSliderChange}
              onAfterChange={this.handleAfterSliderChange}
            />
          </div>
          <div className="property-bar-input">
            <NumberInput
              {...this.numberInputProps}
              tooltip={tooltip}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              baseUnit="m"
              autoSelect={true}
              value={displayValue}
              min={minValue}
              max={isFPTenant ? undefined : maxValue}
              disabledTooltip={isFPTenant}
              onValueChange={this.handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SliderInput;