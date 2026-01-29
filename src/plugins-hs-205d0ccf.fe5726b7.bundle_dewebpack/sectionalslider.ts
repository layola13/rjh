import { Slider } from './Slider';
import { IValueChange } from './IValueChange';

interface SliderRange {
  min?: number;
  max?: number;
}

interface SliderRules {
  range?: SliderRange;
}

interface SliderOptions {
  unitType?: string;
  displayDigits?: number;
  includeUnit?: boolean;
  readOnly?: boolean;
  tips?: string;
  startFromMin?: boolean;
  rules?: SliderRules;
}

interface SliderMarks {
  [key: string]: string | number;
}

interface SliderController {
  onValueChangeStart?: (value: number) => void;
  onValueChangeEnd?: (value: number) => void;
  onValueChanged?: (value: number) => void;
}

interface SliderData {
  className?: string;
  label?: string;
  iconSrc?: string;
  value: number | string;
  delay?: boolean;
  options?: SliderOptions;
  marks?: SliderMarks;
  step?: number;
  tip?: (value: number) => string;
  snappingStep?: number;
  controller?: SliderController;
}

interface SectionalSliderProps {
  data: SliderData;
}

interface SectionalSliderState {
  value: number;
  readOnly: boolean;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

interface SliderChangeEvent {
  detail?: {
    value: number;
  };
}

export class SectionalSlider extends IValueChange<SectionalSliderProps, SectionalSliderState> {
  static defaultProps: Partial<SectionalSliderProps> = {
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

  constructor(props: SectionalSliderProps) {
    super(props);

    const { data } = props;
    let { value } = data;

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

  UNSAFE_componentWillReceiveProps(nextProps: SectionalSliderProps): void {
    const { data } = nextProps;
    let { value } = data;

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

  onValueChangeStart(event: SliderChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    
    this.setState({ value });

    const changeEvent: ValueChangeEvent = {
      detail: { value }
    };

    this.changeStart(changeEvent);
  }

  onValueChange(event: SliderChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    
    this.setState({ value });

    const changeEvent: ValueChangeEvent = {
      detail: { value }
    };

    this.changed(changeEvent);
  }

  onValueChangeEnd(event: SliderChangeEvent | number): void {
    const value = typeof event === 'number' ? event : event.detail?.value ?? 0;
    
    this.setState({ value });

    const changeEvent: ValueChangeEvent = {
      detail: { value }
    };

    this.changeEnd(changeEvent);
  }

  onSliderChangeStart(value: string | number): void {
    const numericValue = parseFloat(value.toString());
    const controller = this.props.data.controller;

    if (controller?.onValueChangeStart) {
      controller.onValueChangeStart(numericValue);
    }
  }

  onSliderChangeEnd(value: string | number): void {
    const numericValue = parseFloat(value.toString());
    const controller = this.props.data.controller;

    if (controller?.onValueChangeEnd) {
      controller.onValueChangeEnd(numericValue);
    }
  }

  onChangeHandle(value: number): void {
    let adjustedValue = value;
    const { data } = this.props;
    const { marks, options, snappingStep, controller } = data;

    if (snappingStep && marks) {
      let minRange = 0;
      let maxRange = 10;

      if (options?.rules?.range) {
        minRange = options.rules.range.min ?? 0;
        maxRange = options.rules.range.max ?? 10;
      }

      const snapThreshold = (maxRange - minRange) * snappingStep;

      Object.keys(marks).forEach((key) => {
        const markValue = parseFloat(key);
        if (adjustedValue < markValue + snapThreshold && adjustedValue > markValue - snapThreshold) {
          adjustedValue = markValue;
        }
      });

      if (adjustedValue !== this.state.value) {
        this.setState({ value: adjustedValue });
      }
    }

    if (controller?.onValueChanged) {
      controller.onValueChanged(adjustedValue);
    }
  }

  render(): JSX.Element {
    const { data } = this.props;
    const { options } = data;
    const { value } = this.state;

    let minRange = 0;
    let maxRange = 10;

    if (options?.rules?.range) {
      minRange = options.rules.range.min ?? 0;
      maxRange = options.rules.range.max ?? 10;
    }

    const marks = data.marks ?? {};

    return (
      <div className="slider-input">
        <div className="slider-outer">
          <Slider
            marks={marks}
            min={minRange}
            max={maxRange}
            value={value}
            step={data.step}
            tipFormatter={data.tip}
            onChange={this.onChangeHandle.bind(this)}
            onAfterChange={this.onSliderChangeEnd.bind(this)}
          />
        </div>
      </div>
    );
  }
}