import { Slider } from './Slider';
import { LengthInput } from './LengthInput';
import { IValueChange } from './IValueChange';

interface RangeRules {
  min?: number | string;
  max?: number | string;
  minInput?: number | string;
  maxInput?: number | string;
  checkMin?: boolean;
  checkMax?: boolean;
}

interface SliderInputRules {
  range?: RangeRules;
  positiveOnly?: boolean;
}

interface SliderInputOptions {
  readOnly?: boolean;
  rules?: SliderInputRules;
  tips?: string;
  startFromMin?: boolean;
  unitType?: string;
  displayDigits?: number;
  includeUnit?: boolean;
}

interface SliderInputData {
  value: number | string;
  label?: string;
  iconSrc?: string;
  className?: string;
  delay?: number;
  options?: SliderInputOptions;
  onValueChangeStart?: (event: ValueChangeEvent) => void;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

interface SliderInputProps {
  data: SliderInputData;
  multiValueState?: unknown;
}

interface SliderInputState {
  value: number;
  readOnly: boolean;
}

interface SliderData {
  className: string;
  label?: string;
  iconSrc?: string;
  value: number;
  delay?: number;
  onValueChangeStart: (event: ValueChangeEvent) => void;
  onValueChange: (event: ValueChangeEvent) => void;
  onValueChangeEnd: (event: ValueChangeEvent) => void;
  options: {
    startFromMin: boolean;
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
      };
    };
  };
}

interface LengthInputData {
  className: string;
  label: string;
  iconSrc: string;
  value: number;
  listValues: undefined;
  labelPosition: string;
  onValueChangeStart: (event: ValueChangeEvent) => void;
  onValueChange: (event: ValueChangeEvent) => void;
  onValueChangeEnd: (event: ValueChangeEvent) => void;
  options: {
    unitType?: string;
    displayDigits?: number;
    includeUnit?: boolean;
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
        checkMin: boolean;
        checkMax: boolean;
      };
      positiveOnly: boolean;
    };
  };
}

declare function updateMouseTips(
  text?: string,
  position?: { x: number; y: number },
  style?: { background: string; txtColor: string }
): void;

export class SliderInput extends IValueChange<SliderInputProps, SliderInputState> {
  constructor(props: SliderInputProps) {
    super(props);

    const { data } = props;
    let value = data.value;

    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    let readOnly = false;
    if (data.options) {
      readOnly = !!data.options.readOnly;
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
    const value = typeof event === 'number' ? event : event.detail.value;

    this.setState({ value });

    const eventObject: ValueChangeEvent = {
      detail: { value }
    };

    this.changeStart(eventObject);
  }

  onValueChange(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail.value;

    this.setState({ value });

    const eventObject: ValueChangeEvent = {
      detail: { value }
    };

    this.changed(eventObject);
  }

  onValueChangeEnd(event: ValueChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail.value;

    this.setState({ value });

    const eventObject: ValueChangeEvent = {
      detail: { value }
    };

    this.changeEnd(eventObject);
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

  render(): JSX.Element {
    const { data, multiValueState } = this.props;
    const options = data.options;

    let maxValue = 10;
    let minValue = 0;
    let maxInput: number | undefined;
    let minInput: number | undefined;
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
        let max = range.maxInput;
        if (typeof max === 'string') {
          max = parseFloat(max);
        }
        if (Number.isFinite(max)) {
          maxInput = max;
        }
      }

      if (range.minInput !== undefined) {
        let min = range.minInput;
        if (typeof min === 'string') {
          min = parseFloat(min);
        }
        if (Number.isFinite(min)) {
          minInput = min;
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

    const onValueChangeEnd = this.onValueChangeEnd.bind(this);

    let startFromMin = false;
    if (options?.startFromMin !== undefined) {
      startFromMin = options.startFromMin;
    }

    const sliderData: SliderData = {
      className: '',
      label: data.label,
      iconSrc: data.iconSrc,
      value: this.state.value,
      delay: data.delay,
      onValueChangeStart: this.onValueChangeStart.bind(this),
      onValueChange: this.onValueChange.bind(this),
      onValueChangeEnd,
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

    const lengthInputData: LengthInputData = {
      className: '',
      label: '',
      iconSrc: '',
      value: this.state.value,
      listValues: undefined,
      labelPosition: '',
      onValueChangeStart: this.onValueChangeStart.bind(this),
      onValueChange: this.onValueChange.bind(this),
      onValueChangeEnd,
      options: {
        unitType: options?.unitType,
        displayDigits: options?.displayDigits,
        includeUnit: options?.includeUnit,
        readOnly: this.state.readOnly,
        rules: {
          range: {
            min: minInput !== undefined ? minInput : minValue,
            max: maxInput !== undefined ? maxInput : maxValue,
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
          <Slider data={sliderData} />
        </div>
        <div className="length-input-outer">
          <LengthInput data={lengthInputData} multiValueState={multiValueState} />
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
            <Slider data={sliderData} />
          </div>
          <div className="length-input-outer">
            <LengthInput data={lengthInputData} multiValueState={multiValueState} />
          </div>
        </div>
      );
    }

    return content;
  }
}