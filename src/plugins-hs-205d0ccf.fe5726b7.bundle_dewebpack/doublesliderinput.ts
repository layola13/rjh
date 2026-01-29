import React from 'react';
import { Slider, NumberInput } from './500992';
import { assembleProps } from './295190';
import { IValueChange } from './662049';

interface Range {
  min?: number | string;
  max?: number | string;
}

interface Rules {
  range?: Range;
}

interface Options {
  unitType?: string;
  displayDigits?: number;
  includeUnit?: boolean;
  readOnly?: boolean;
  rules?: Rules;
}

interface DoubleSliderInputData {
  className?: string;
  label?: string;
  value: number | string;
  delay?: boolean;
  options?: Options;
  tooltip?: string;
  twoWays?: boolean;
  startValue?: number;
  step?: number;
  onValueChangeStart?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface DoubleSliderInputProps {
  data: DoubleSliderInputData;
}

interface DoubleSliderInputState {
  value: number;
  readOnly: boolean;
}

interface NumberInputProps {
  isLenghtUnit?: boolean;
  unit?: string;
  [key: string]: unknown;
}

interface ValueChangeEvent {
  detail?: {
    value: number;
  };
}

declare global {
  const HSCore: {
    Util: {
      Unit: {
        ConvertToMeter: (unit: string, value: number) => number;
      };
    };
  };
  const HSApp: {
    Config: {
      TENANT: string;
    };
  };
}

export class DoubleSliderInput extends IValueChange<DoubleSliderInputProps, DoubleSliderInputState> {
  static defaultProps: DoubleSliderInputProps = {
    data: {
      className: '',
      label: '',
      value: 0,
      delay: false,
      options: {
        unitType: undefined,
        displayDigits: undefined,
        includeUnit: undefined,
        readOnly: false,
        rules: {
          range: {}
        }
      }
    }
  };

  private numberInputProps: NumberInputProps;
  private dirty: boolean;

  constructor(props: DoubleSliderInputProps) {
    super(props);

    this.numberInputProps = assembleProps(this.props.data);
    this.dirty = false;

    const { data } = props;
    let parsedValue = data.value;
    if (typeof parsedValue === 'string') {
      parsedValue = parseFloat(parsedValue);
    }

    let readOnly = false;
    if (data.options?.readOnly) {
      readOnly = data.options.readOnly;
    }

    this.state = {
      value: parsedValue as number,
      readOnly
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: DoubleSliderInputProps): void {
    const { data } = nextProps;
    let parsedValue = data.value;

    this.numberInputProps = assembleProps(nextProps.data);

    if (typeof parsedValue === 'string') {
      parsedValue = parseFloat(parsedValue);
    }

    let readOnly = false;
    if (data.options?.readOnly) {
      readOnly = data.options.readOnly;
    }

    this.setState({
      value: parsedValue as number,
      readOnly
    });
  }

  private onValueChangeStart = (event: ValueChangeEvent | number): void => {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    this.setState({ value });
    this.changeStart(value);
  };

  private valueChange = (event: ValueChangeEvent | number): void => {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    this.setState({ value });
    this.changed(value);
  };

  private onValueChangeEnd = (event: ValueChangeEvent | number): void => {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    this.setState({ value });
    this.changeEnd(value);
  };

  private onFocus = (): void => {
    const { onFocus } = this.props.data;
    onFocus?.();
  };

  private onBlur = (): void => {
    const { onBlur } = this.props.data;
    onBlur?.();
  };

  private handleInputChange = (event: ValueChangeEvent | number): void => {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    this.setState({ value });
    this.changeStart(value);
    this.changed(value);
    this.changeEnd(value);
  };

  private handleBeforeSliderChange = (sliderValue: number): void => {
    const convertedValue = this.numberInputProps.isLenghtUnit
      ? HSCore.Util.Unit.ConvertToMeter(this.numberInputProps.unit ?? '', sliderValue)
      : sliderValue;
    this.changeStart(convertedValue);
  };

  private handleSliderChange = (sliderValue: number): void => {
    const { delay } = this.props.data;
    const convertedValue = this.numberInputProps.isLenghtUnit
      ? HSCore.Util.Unit.ConvertToMeter(this.numberInputProps.unit ?? '', sliderValue)
      : sliderValue;

    if (!this.dirty) {
      this.handleBeforeSliderChange(sliderValue);
      this.dirty = true;
    }

    this.setState({ value: convertedValue });

    if (!delay) {
      this.changed(convertedValue);
    }
  };

  private handleAfterSliderChange = (sliderValue: number): void => {
    const convertedValue = this.numberInputProps.isLenghtUnit
      ? HSCore.Util.Unit.ConvertToMeter(this.numberInputProps.unit ?? '', sliderValue)
      : sliderValue;
    this.changeEnd(convertedValue);
    this.dirty = false;
  };

  render(): React.ReactElement {
    const { data } = this.props;
    const { options, tooltip, twoWays, startValue, step, label } = data;

    const isFpTenant = HSApp.Config.TENANT === 'fp';

    let maxValue = 10;
    if (options?.rules?.range?.max) {
      let parsedMax = options.rules.range.max;
      if (typeof parsedMax === 'string') {
        parsedMax = parseFloat(parsedMax);
      }
      if (Number.isFinite(parsedMax)) {
        maxValue = parsedMax as number;
      }
    }

    let minValue = 0 - maxValue;
    if (options?.rules?.range?.min) {
      let parsedMin = options.rules.range.min;
      if (typeof parsedMin === 'string') {
        parsedMin = parseFloat(parsedMin);
      }
      if (Number.isFinite(parsedMin)) {
        minValue = parsedMin as number;
      }
    }

    return (
      <div className={`render-double-slider-input ${data.className ?? ''}`}>
        <div className="left-content">
          <span className="label-text">{label}</span>
          <Slider
            min={minValue}
            max={maxValue}
            value={this.state.value}
            disabled={this.state.readOnly}
            twoWays={twoWays}
            startValue={startValue}
            step={step}
            onChange={this.handleSliderChange}
            onAfterChange={this.handleAfterSliderChange}
          />
        </div>
        <NumberInput
          tooltip={tooltip}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.numberInputProps}
          baseUnit="m"
          autoSelect={true}
          value={this.state.value}
          min={minValue}
          max={isFpTenant ? undefined : maxValue}
          disabledTooltip={true}
          onValueChange={this.handleInputChange}
        />
      </div>
    );
  }
}