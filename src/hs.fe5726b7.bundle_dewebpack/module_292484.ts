import React from 'react';
import type { Component } from 'react';
import { IValueChange } from './IValueChange';

interface RangeRules {
  min?: number | string;
  max?: number | string;
}

interface ComponentOptions {
  unitType?: string;
  displayDigits?: number;
  includeUnit?: boolean;
  readOnly?: boolean;
  rules?: {
    range?: RangeRules;
    positiveOnly?: boolean;
  };
}

interface ComponentData {
  className?: string;
  label?: string;
  value?: number | string;
  delay?: boolean;
  options?: ComponentOptions;
  onValueChangeStart?: (value: number) => void;
}

interface DoubleSliderInputProps {
  data: ComponentData;
}

interface DoubleSliderInputState {
  value: number;
  readOnly: boolean;
}

interface ValueChangeEvent {
  detail?: {
    value: number;
  };
}

interface SliderData {
  className: string;
  label: string;
  value: number;
  delay?: boolean;
  onValueChangeStart: (event: ValueChangeEvent | number) => void;
  onValueChange: (event: ValueChangeEvent | number) => void;
  onValueChangeEnd: (event: ValueChangeEvent | number) => void;
  options: {
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
      };
    };
  };
}

interface InputData {
  className: string;
  label: string;
  value: number;
  listValues: undefined;
  labelPosition: string;
  onValueChangeStart: (event: ValueChangeEvent | number) => void;
  onValueChange: (event: ValueChangeEvent | number) => void;
  onValueChangeEnd: (event: ValueChangeEvent | number) => void;
  options: {
    unitType?: string;
    displayDigits?: number;
    includeUnit?: boolean;
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
      };
      positiveOnly: boolean;
    };
  };
}

const DEFAULT_MAX_VALUE = 10;
const DEFAULT_MIN_VALUE = 0;

class DoubleSliderInput extends React.Component<DoubleSliderInputProps, DoubleSliderInputState> implements IValueChange {
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

  constructor(props: DoubleSliderInputProps) {
    super(props);

    const { data } = props;
    let value = data.value ?? 0;

    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    const readOnly = data.options?.readOnly ?? false;

    this.state = {
      value,
      readOnly
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: DoubleSliderInputProps): void {
    const { data } = nextProps;
    let value = data.value ?? 0;

    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    const readOnly = data.options?.readOnly ?? false;

    this.setState({
      value,
      readOnly
    });
  }

  changeStart(value: number): void {
    // Implementation from IValueChange mixin
  }

  changed(value: number): void {
    // Implementation from IValueChange mixin
  }

  changeEnd(value: number): void {
    // Implementation from IValueChange mixin
  }

  onValueChangeStart(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    this.setState({ value });
    this.changeStart(value);
  }

  valueChange(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : (event?.detail?.value ?? 0);
    this.setState({ value });
    this.changed(value);
  }

  onValueChangeEnd(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    this.setState({ value });
    this.changeEnd(value);
  }

  render(): React.ReactElement {
    const { data } = this.props;
    const { options } = data;

    let maxValue = DEFAULT_MAX_VALUE;
    if (options?.rules?.range?.max !== undefined) {
      let max = options.rules.range.max;
      if (typeof max === 'string') {
        max = parseFloat(max);
      }
      if (Number.isFinite(max)) {
        maxValue = max;
      }
    }

    let minValue = -maxValue;
    if (options?.rules?.range?.min !== undefined) {
      let min = options.rules.range.min;
      if (typeof min === 'string') {
        min = parseFloat(min);
      }
      if (Number.isFinite(min)) {
        minValue = min;
      }
    }

    const sliderData: SliderData = {
      className: '',
      label: data.label ?? '',
      value: this.state.value,
      delay: data.delay,
      onValueChangeStart: this.onValueChangeStart.bind(this),
      onValueChange: this.valueChange.bind(this),
      onValueChangeEnd: this.onValueChangeEnd.bind(this),
      options: {
        readOnly: this.state.readOnly,
        rules: {
          range: {
            min: minValue,
            max: maxValue
          }
        }
      }
    };

    const inputData: InputData = {
      className: '',
      label: '',
      value: this.state.value,
      listValues: undefined,
      labelPosition: '',
      onValueChangeStart: this.onValueChangeStart.bind(this),
      onValueChange: this.valueChange.bind(this),
      onValueChangeEnd: this.onValueChangeEnd.bind(this),
      options: {
        unitType: options?.unitType,
        displayDigits: options?.displayDigits,
        includeUnit: options?.includeUnit,
        readOnly: this.state.readOnly,
        rules: {
          range: {
            min: minValue,
            max: maxValue
          },
          positiveOnly: false
        }
      }
    };

    return (
      <div className={`double-slider-input ${data.className ?? ''}`}>
        <div className="double-slider-outer">
          <SliderComponent data={sliderData} />
        </div>
        <div className="length-input-outer">
          <LengthInputComponent data={inputData} />
        </div>
      </div>
    );
  }
}

export default DoubleSliderInput;