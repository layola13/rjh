import React from 'react';
import { IValueChange } from './IValueChange';

interface SliderRange {
  min: number;
  max: number;
}

interface SliderRules {
  range: SliderRange;
}

interface SliderOptions {
  startFromMin?: boolean;
  readOnly?: boolean;
  rules: SliderRules;
}

interface SliderData {
  className?: string;
  label?: string;
  iconSrc?: string;
  value: number;
  delay?: boolean;
  options: SliderOptions;
}

interface SliderProps {
  data: SliderData;
}

interface SliderState {
  value: number;
  readOnly: boolean;
}

class Slider extends React.Component<SliderProps, SliderState> implements IValueChange {
  static defaultProps: SliderProps = {
    data: {
      className: '',
      label: '',
      iconSrc: '',
      value: 0,
      delay: false,
      options: {
        startFromMin: false,
        readOnly: false,
        rules: {
          range: {
            min: 0,
            max: 100
          }
        }
      }
    }
  };

  private startMove: boolean = false;
  private startX: number = 0;
  private startValue: number = 0;
  private leftPixel: number = 0;
  private rightPixel: number = 0;
  private sliderLength: number = 0;
  private slider?: HTMLDivElement | null;
  private sliderHandle?: HTMLDivElement | null;
  private leftOne?: HTMLDivElement | null;
  private leftTwo?: HTMLDivElement | null;

  changeStart: (value: number) => void;
  changed: (value: number) => void;
  changeEnd: (value: number) => void;
  onDeactive: () => void;

  constructor(props: SliderProps) {
    super(props);

    const data = props.data;
    let initialValue = data.value || 0;
    
    if (initialValue > data.options.rules.range.max) {
      initialValue = data.options.rules.range.max;
    }

    this.state = {
      value: initialValue,
      readOnly: data.options.readOnly ?? false
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
    const data = nextProps.data;
    let newValue = data.value || 0;

    if (newValue > data.options.rules.range.max) {
      newValue = data.options.rules.range.max;
    }

    this.setState({
      value: newValue,
      readOnly: data.options.readOnly ?? false
    });
  }

  private handleResize = (): void => {
    const slider = this.slider;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      this.leftPixel = rect.left;
      this.rightPixel = rect.right;
      this.sliderLength = this.rightPixel - this.leftPixel;
    }
  };

  private onmousedown = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.button === 0 && !this.state.readOnly) {
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

  private calMouseMoveValue(event: MouseEvent): number {
    const range = this.props.data.options.rules.range;
    const { min, max } = range;
    const deltaRatio = (event.pageX - this.startX) / this.sliderLength;
    const deltaValue = deltaRatio * (max - min);
    let newValue = this.startValue + deltaValue;

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
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    return false;
  }

  render(): React.ReactNode {
    const data = this.props.data;
    const { max, min } = data.options.rules.range;

    if (!Number.isFinite(max) || !Number.isFinite(this.state.value) || !Number.isFinite(min)) {
      return null;
    }

    if (max <= 0) {
      return null;
    }

    let clampedValue = this.state.value;
    if (this.state.value < min) {
      clampedValue = min;
    }
    if (this.state.value > max) {
      clampedValue = max;
    }

    let percentage = 100 * parseFloat((clampedValue / max).toFixed(3));
    
    if (data.options?.startFromMin) {
      percentage = 100 * parseFloat(((clampedValue - min) / (max - min)).toFixed(3));
    }

    const trackStyle: React.CSSProperties = {
      width: `${percentage}%`
    };

    const circleStyle: React.CSSProperties = {
      left: `${percentage}%`
    };

    const sliderTrack = (
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
      display: this.state.readOnly ? 'block' : 'none'
    };

    const { className, label, iconSrc } = data;
    let wrapperClassName = 'slider-bar-wrapper ';
    if (className) {
      wrapperClassName += className;
    }

    let labelClassName = 'slider-label hide';
    if (label) {
      labelClassName = 'slider-label';
    }

    let iconLabelClassName: string | undefined;
    if (iconSrc) {
      iconLabelClassName = 'slider-label slider-icon-label';
    }

    return (
      <div className={wrapperClassName}>
        <div className="slider-bar">
          <span className={labelClassName}>{label}</span>
          <span className={iconLabelClassName}>
            <img src={iconSrc} />
          </span>
          <div 
            className="slider-wrapper" 
            ref={(ref) => { this.slider = ref; }}
          >
            <div style={disableMaskStyle} className="slider-disable-mask" />
            {sliderTrack}
            <div
              className="slider-circle"
              style={circleStyle}
              onMouseDown={this.onmousedown}
              ref={(ref) => { this.sliderHandle = ref; }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;