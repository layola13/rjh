import React from 'react';
import PropTypes from 'prop-types';
import { IValueChange } from './IValueChange';
import SliderComponent from './SliderComponent';
import LengthInputComponent from './LengthInputComponent';

interface RangeRules {
  min?: number;
  max?: number;
  minInput?: number;
  maxInput?: number;
  checkMin?: boolean;
  checkMax?: boolean;
}

interface ComponentRules {
  range?: RangeRules;
  positiveOnly?: boolean;
}

interface ComponentOptions {
  unitType?: string;
  displayDigits?: number;
  includeUnit?: boolean;
  readOnly?: boolean;
  tips?: string;
  startFromMin?: boolean;
  rules?: ComponentRules;
}

interface SliderInputData {
  className?: string;
  label?: string;
  iconSrc?: string;
  value: number;
  delay?: boolean;
  options?: ComponentOptions;
  onValueChangeStart?: (event: ValueChangeEvent) => void;
}

interface SliderInputProps {
  data: SliderInputData;
}

interface SliderInputState {
  value: number;
  readOnly: boolean;
}

interface ValueChangeEvent {
  detail?: {
    value: number;
  };
}

interface MouseTipsOptions {
  background: string;
  txtColor: string;
}

declare function updateMouseTips(text?: string, position?: { x: number; y: number }, options?: MouseTipsOptions): void;

function mix(baseClass: typeof React.Component) {
  return {
    with(mixin: any) {
      return class extends baseClass {
        static displayName = `Mixed(${baseClass.name})`;
      };
    }
  };
}

class SliderInput extends mix(React.Component).with(IValueChange)<SliderInputProps, SliderInputState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps: SliderInputProps = {
    data: {
      className: '',
      label: '',
      iconSrc: '',
      value: 0,
      delay: false,
      options: {
        unitType: undefined,
        displayDigits: undefined,
        includeUnit: undefined,
        readOnly: false,
        tips: '',
        startFromMin: false,
        rules: {
          range: {}
        }
      }
    }
  };

  constructor(props: SliderInputProps) {
    super(props);

    const { data } = props;
    let value = data.value;

    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    let readOnly = false;
    if (data.options?.readOnly) {
      readOnly = data.options.readOnly;
    }

    this.state = {
      value,
      readOnly
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: SliderInputProps): void {
    const { data } = nextProps;
    let value = data.value;

    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    let readOnly = false;
    if (data.options?.readOnly) {
      readOnly = data.options.readOnly;
    }

    this.setState({
      value,
      readOnly
    });
  }

  onValueChangeStart(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    
    this.setState({ value });

    const changeEvent: ValueChangeEvent = {
      detail: { value }
    };

    this.changeStart(changeEvent);
  }

  onValueChange(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    
    this.setState({ value });

    const changeEvent: ValueChangeEvent = {
      detail: { value }
    };

    this.changed(changeEvent);
  }

  onValueChangeEnd(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    
    this.setState({ value });

    const changeEvent: ValueChangeEvent = {
      detail: { value }
    };

    this.changeEnd(changeEvent);
  }

  updateTips(text: string, mouseEvent: React.MouseEvent): void {
    updateMouseTips(text, {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY + 50
    }, {
      background: 'rgba(60, 60, 60, 0.85)',
      txtColor: 'rgba(255, 255, 255, 1)'
    });
  }

  deleteTips(): void {
    updateMouseTips();
  }

  render(): React.ReactElement {
    const { data } = this.props;
    const { options } = data;

    let maxValue = 10;
    let minValue = 0;
    let maxInputValue: number | undefined = undefined;
    let minInputValue: number | undefined = undefined;
    let checkMin = true;
    let checkMax = true;

    if (options?.rules?.range) {
      const range = options.rules.range;

      if (range.max !== undefined) {
        let max = range.max;
        if (typeof max === 'string') {
          max = parseFloat(max);
        }
        if (Number.isFinite(max)) {
          maxValue = max;
        }
      }

      if (range.min !== undefined) {
        let min = range.min;
        if (typeof min === 'string') {
          min = parseFloat(min);
        }
        if (Number.isFinite(min)) {
          minValue = min;
        }
      }

      if (range.maxInput !== undefined) {
        let maxInput = range.maxInput;
        if (typeof maxInput === 'string') {
          maxInput = parseFloat(maxInput);
        }
        if (Number.isFinite(maxInput)) {
          maxInputValue = maxInput;
        }
      }

      if (range.minInput !== undefined) {
        let minInput = range.minInput;
        if (typeof minInput === 'string') {
          minInput = parseFloat(minInput);
        }
        if (Number.isFinite(minInput)) {
          minInputValue = minInput;
        }
      }

      if (range.checkMin !== undefined) {
        checkMin = range.checkMin;
      }

      if (range.checkMax !== undefined) {
        checkMax = range.checkMax;
      }
    }

    let positiveOnly = true;
    if (options?.rules?.positiveOnly !== undefined) {
      positiveOnly = options.rules.positiveOnly;
    }

    const onValueChangeEndBound = this.onValueChangeEnd.bind(this);

    let startFromMin = false;
    if (options?.startFromMin !== undefined) {
      startFromMin = options.startFromMin;
    }

    const sliderData = {
      className: '',
      label: data.label ?? '',
      iconSrc: data.iconSrc ?? '',
      value: this.state.value,
      delay: data.delay,
      onValueChangeStart: this.onValueChangeStart.bind(this),
      onValueChange: this.onValueChange.bind(this),
      onValueChangeEnd: onValueChangeEndBound,
      options: {
        startFromMin,
        readOnly: this.state.readOnly,
        rules: {
          range: {
            min: minValue,
            max: maxValue
          }
        }
      }
    };

    const inputData = {
      className: '',
      label: '',
      iconSrc: '',
      value: this.state.value,
      listValues: undefined,
      labelPosition: '',
      onValueChangeStart: this.onValueChangeStart.bind(this),
      onValueChange: this.onValueChange.bind(this),
      onValueChangeEnd: onValueChangeEndBound,
      options: {
        unitType: options?.unitType,
        displayDigits: options?.displayDigits,
        includeUnit: options?.includeUnit,
        readOnly: this.state.readOnly,
        rules: {
          range: {
            min: minInputValue !== undefined ? minInputValue : minValue,
            max: maxInputValue !== undefined ? maxInputValue : maxValue,
            checkMin,
            checkMax
          },
          positiveOnly
        }
      }
    };

    let content = (
      <div className={`slider-input ${data.className ?? ''}`}>
        <div className="slider-outer">
          <SliderComponent data={sliderData} />
        </div>
        <div className="length-input-outer">
          <LengthInputComponent data={inputData} />
        </div>
      </div>
    );

    if (options?.tips) {
      const tips = options.tips;
      content = (
        <div
          className={`slider-input ${data.className ?? ''}`}
          onMouseEnter={(event) => this.updateTips(tips, event)}
          onMouseMove={(event) => this.updateTips(tips, event)}
          onMouseLeave={() => this.deleteTips()}
        >
          <div className="slider-outer">
            <SliderComponent data={sliderData} />
          </div>
          <div className="length-input-outer">
            <LengthInputComponent data={inputData} />
          </div>
        </div>
      );
    }

    return content;
  }
}

export default SliderInput;