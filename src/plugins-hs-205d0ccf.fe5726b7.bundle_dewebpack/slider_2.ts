import { IValueChange } from './IValueChange';

interface SliderRange {
  min: number;
  max: number;
}

interface SliderRules {
  range: SliderRange;
}

interface SliderOptions {
  rules: SliderRules;
  readOnly?: boolean;
  startFromMin?: boolean;
}

interface SliderData {
  value?: number;
  options: SliderOptions;
  delay?: boolean;
  className?: string;
  label?: string;
  iconSrc?: string;
}

interface SliderProps {
  data: SliderData;
}

interface SliderState {
  value: number;
  readOnly: boolean;
}

export class Slider extends IValueChange<SliderProps, SliderState> {
  private startMove: boolean = false;
  private showVal: number | undefined;
  private readOnly: boolean | undefined;
  private startX: number = 0;
  private startValue: number = 0;
  private sliderLength: number = 0;
  private slider: HTMLDivElement | null = null;
  private leftOne: HTMLDivElement | null = null;
  private leftTwo: HTMLDivElement | null = null;
  private leftPixel: number = 0;
  private rightPixel: number = 0;

  constructor(props: SliderProps) {
    super(props);

    const { data } = props;
    const initialValue = data.value ?? 0;
    const maxValue = data.options.rules.range.max;
    const clampedValue = initialValue > maxValue ? maxValue : initialValue;

    this.state = {
      value: clampedValue,
      readOnly: data.options.readOnly ?? false,
    };
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount(): void {
    this.onDeactive();
    window.removeEventListener('resize', this.handleResize);
    this.removeEventListener();
  }

  UNSAFE_componentWillReceiveProps(nextProps: SliderProps): void {
    const { data } = nextProps;
    const initialValue = data.value ?? 0;
    const maxValue = data.options.rules.range.max;
    const clampedValue = initialValue > maxValue ? maxValue : initialValue;

    this.setState({
      value: clampedValue,
      readOnly: data.options.readOnly ?? false,
    });
  }

  private onmousedown = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.button === 0 && this.state.readOnly === false) {
      this.handleResize();
      this.startMove = true;
      this.startX = event.pageX;
      this.startValue = this.state.value;
      this.addEventListener();
      this.changeStart(this.startValue);
    }
    this.pauseEvent(event);
  };

  private onmousemove = (event: MouseEvent): void => {
    if (this.startMove) {
      const newValue = this.calMouseMoveValue(event);
      this.setState({ value: newValue }, () => {
        this.changed(newValue);
      });
    }
  };

  private delayMousemoveFun = (event: MouseEvent): void => {
    if (this.startMove) {
      const newValue = this.calMouseMoveValue(event);
      this.setState({ value: newValue });
    }
  };

  private onmouseup = (): void => {
    this.startMove = false;
    this.removeEventListener();
    this.changeEnd(this.state.value);
  };

  private delayMouseupFun = (): void => {
    this.startMove = false;
    this.removeEventListener();
    this.changeEnd(this.state.value);
  };

  private handleResize = (): void => {
    if (this.slider) {
      const rect = this.slider.getBoundingClientRect();
      this.leftPixel = rect.left;
      this.rightPixel = rect.right;
      this.sliderLength = this.rightPixel - this.leftPixel;
    }
  };

  private calMouseMoveValue(event: MouseEvent): number {
    const { min, max } = this.props.data.options.rules.range;
    const delta = ((event.pageX - this.startX) / this.sliderLength) * (max - min);
    let newValue = this.startValue + delta;

    if (newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }

    return newValue;
  }

  private addEventListener(): void {
    if (this.props.data.delay) {
      document.addEventListener('mousemove', this.delayMousemoveFun, false);
      document.addEventListener('mouseup', this.delayMouseupFun, false);
    } else {
      document.addEventListener('mousemove', this.onmousemove, false);
      document.addEventListener('mouseup', this.onmouseup, false);
    }
  }

  private removeEventListener(): void {
    if (this.props.data.delay) {
      document.removeEventListener('mousemove', this.delayMousemoveFun, false);
      document.removeEventListener('mouseup', this.delayMouseupFun, false);
    }
    document.removeEventListener('mousemove', this.onmousemove, false);
    document.removeEventListener('mouseup', this.onmouseup, false);
  }

  private pauseEvent(event: React.MouseEvent): boolean {
    event.stopPropagation?.();
    return false;
  }

  render(): React.ReactElement | null {
    const { data } = this.props;
    const { min, max } = data.options.rules.range;

    if (!Number.isFinite(max) || !Number.isFinite(this.state.value) || !Number.isFinite(min)) {
      return null;
    }

    let clampedValue = this.state.value;
    if (this.state.value < min) {
      clampedValue = min;
    }
    if (this.state.value > max) {
      clampedValue = max;
    }

    let percentage = Number((clampedValue / max).toFixed(3)) * 100;
    if (data.options?.startFromMin) {
      percentage = Number(((clampedValue - min) / (max - min)).toFixed(3)) * 100;
    }

    const trackStyle: React.CSSProperties = {
      width: `${parseFloat(percentage.toString())}%`,
    };

    const circleStyle: React.CSSProperties = {
      left: `${parseFloat(percentage.toString())}%`,
    };

    const track = (
      <div className="slider-track">
        <div
          className="slider-track-left-one"
          ref={(ref) => { this.leftOne = ref; }}
        />
        <div
          className="slider-track-left-two"
          ref={(ref) => { this.leftTwo = ref; }}
          style={trackStyle}
        />
      </div>
    );

    const disableMaskStyle: React.CSSProperties = {
      display: this.state.readOnly ? 'block' : 'none',
    };

    const { className, label } = data;
    let wrapperClassName = 'slider-bar-wrapper-dark ';
    if (className) {
      wrapperClassName += className;
    }

    let labelClassName = 'slider-label hide';
    if (label) {
      labelClassName = 'slider-label';
    }

    return (
      <div className={wrapperClassName}>
        <div className="slider-bar">
          <span className={labelClassName}>{label}</span>
          <div style={{ height: 16, position: 'relative', bottom: 1 }}>
            <div
              className="slider-wrapper"
              ref={(ref) => { this.slider = ref; }}
            >
              <div style={disableMaskStyle} className="slider-disable-mask" />
              {track}
              <div
                className="slider-circle"
                style={circleStyle}
                onMouseDown={this.onmousedown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}