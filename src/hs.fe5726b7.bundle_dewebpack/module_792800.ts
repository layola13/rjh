import React from 'react';
import PropTypes from 'prop-types';

interface Range {
  min?: number;
  max?: number;
}

interface Rules {
  range: Range;
}

interface Options {
  readOnly: boolean;
  rules: Rules;
}

interface SliderData {
  className?: string;
  label?: string;
  value: number;
  delay?: boolean;
  options: Options;
}

interface SliderProps {
  data: SliderData;
}

interface SliderState {
  value: number;
  readOnly: boolean;
}

interface IValueChange {
  changed(value: number): void;
  changeStart(value: number): void;
  changeEnd(value: number): void;
  onDeactive(): void;
}

class VerticalDoubleSlider extends React.Component<SliderProps, SliderState> implements IValueChange {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps: SliderProps = {
    data: {
      className: '',
      label: '',
      value: 0,
      delay: false,
      options: {
        readOnly: false,
        rules: {
          range: {}
        }
      }
    }
  };

  private startMove: boolean = false;
  private startY: number = 0;
  private startValue: number = 0;
  private topPixel: number = 0;
  private bottomPixel: number = 0;
  private sliderLength: number = 0;
  private slider?: HTMLDivElement;
  private sliderHandle?: HTMLDivElement;
  private leftOne?: HTMLDivElement;
  private leftTwo?: HTMLDivElement;
  private rightOne?: HTMLDivElement;
  private rightTwo?: HTMLDivElement;

  constructor(props: SliderProps) {
    super(props);
    const { data } = props;
    this.state = {
      value: data.value,
      readOnly: data.options.readOnly
    };
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount(): void {
    this.onDeactive();
    window.removeEventListener('resize', this.handleResize);
    this.removeEventListener();
  }

  UNSAFE_componentWillReceiveProps(nextProps: SliderProps): void {
    const { data } = nextProps;
    this.setState({
      value: data.value,
      readOnly: data.options.readOnly
    });
  }

  componentDidUpdate(): void {
    // Hook for updates
  }

  private onmouseup = (): void => {
    this.startMove = false;
    this.removeEventListener();
    this.changeEnd(this.state.value);
  };

  private onmousemove = (event: MouseEvent): void => {
    if (this.startMove) {
      const newValue = this.calMouseMoveValue(event);
      this.setState({ value: newValue }, () => {
        this.changed(newValue);
      });
    }
  };

  private onmousedown = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.button === 0 && this.state.readOnly === false) {
      this.handleResize();
      this.startMove = true;
      this.startY = event.pageY;
      this.startValue = this.state.value;
      this.addEventListener();
      this.changeStart(this.startValue);
    }
    this.pauseEvent(event);
  };

  private delayMousemoveFun = (event: MouseEvent): void => {
    if (this.startMove) {
      const newValue = this.calMouseMoveValue(event);
      this.setState({ value: newValue });
    }
  };

  private delayMouseupFun = (): void => {
    this.changeEnd(this.state.value);
    this.startMove = false;
    this.removeEventListener();
  };

  private calMouseMoveValue(event: MouseEvent): number {
    const deltaY = event.pageY - this.startY;
    const { range } = this.props.data.options.rules;
    const minValue = range.min ?? 0;
    let maxValue = 10;
    
    if (range.max) {
      maxValue = range.max;
    }
    
    const minLimit = minValue || (0 - maxValue);
    const ratio = deltaY / this.sliderLength * maxValue * 2;
    let newValue = this.startValue + ratio;
    
    if (newValue > maxValue) {
      newValue = maxValue;
    } else if (newValue < minLimit) {
      newValue = minLimit;
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

  private handleResize = (): void => {
    const sliderElement = this.slider;
    if (sliderElement !== undefined) {
      const rect = sliderElement.getBoundingClientRect();
      this.topPixel = rect.top;
      this.bottomPixel = rect.bottom;
      this.sliderLength = this.bottomPixel - this.topPixel;
    }
  };

  private mouseDisabled(): void {
    const elements = document.getElementsByClassName('slider-disabled-mask');
    if (elements && elements.length !== 0) {
      (elements[0] as HTMLElement).style.cursor = 'not-allowed';
    }
  }

  private mouseEnabled(): void {
    const elements = document.getElementsByClassName('slider-disabled-mask');
    if (elements && elements.length !== 0) {
      (elements[0] as HTMLElement).style.cursor = 'default';
    }
  }

  private pauseEvent(event: React.MouseEvent | MouseEvent): boolean {
    event.stopPropagation?.();
    event.preventDefault?.();
    return false;
  }

  changed(value: number): void {
    // Implement IValueChange interface
  }

  changeStart(value: number): void {
    // Implement IValueChange interface
  }

  changeEnd(value: number): void {
    // Implement IValueChange interface
  }

  onDeactive(): void {
    // Implement IValueChange interface
  }

  render(): React.ReactNode {
    const { range } = this.props.data.options.rules;
    const minValue = range.min ?? 0;
    let maxValue = 10;
    
    if (range.max) {
      maxValue = range.max;
    }
    
    const minLimit = minValue || (0 - maxValue);

    if (!Number.isFinite(maxValue) || !Number.isFinite(this.state.value) || !Number.isFinite(minLimit)) {
      return null;
    }

    if (maxValue <= 0) {
      return null;
    }

    let clampedValue = this.state.value;
    if (this.state.value < minLimit) {
      clampedValue = minLimit;
    }
    if (this.state.value > maxValue) {
      clampedValue = maxValue;
    }

    let negativePercent = 0;
    let positivePercent = 0;

    if (clampedValue < 0) {
      negativePercent = 100 * parseFloat((clampedValue / (2 * minLimit)).toFixed(3));
    } else {
      positivePercent = 100 * parseFloat((clampedValue / (2 * maxValue)).toFixed(3));
    }

    const leftOneWidth = 50 - negativePercent;
    const leftTwoWidth = 50 - positivePercent;
    const rightOneStart = 50 + positivePercent;
    const handlePosition = clampedValue > 0 ? 50 + positivePercent : 50 - negativePercent;

    const leftOneStyle: React.CSSProperties = {
      width: `${leftOneWidth}%`
    };

    const leftTwoStyle: React.CSSProperties = {
      left: `${leftOneWidth}%`,
      width: `${negativePercent}%`
    };

    const rightOneStyle: React.CSSProperties = {
      width: `${positivePercent}%`
    };

    const rightTwoStyle: React.CSSProperties = {
      left: `${rightOneStart}%`,
      width: `${leftTwoWidth}%`
    };

    const handleStyle: React.CSSProperties = {
      left: `${handlePosition}%`
    };

    const maskStyle: React.CSSProperties = {
      display: this.state.readOnly ? 'block' : 'none'
    };

    const trackElement = (
      <div className="slider-track">
        <div
          className="slider-track-left-one"
          ref={(ref) => { this.leftOne = ref ?? undefined; }}
          style={leftOneStyle}
        />
        <div
          className="slider-track-left-two"
          ref={(ref) => { this.leftTwo = ref ?? undefined; }}
          style={leftTwoStyle}
        />
        <div
          className="slider-track-right-one"
          ref={(ref) => { this.rightOne = ref ?? undefined; }}
          style={rightOneStyle}
        />
        <div
          className="slider-track-right-two"
          ref={(ref) => { this.rightTwo = ref ?? undefined; }}
          style={rightTwoStyle}
        />
        <div className="slider-track-center" />
      </div>
    );

    const { className, label } = this.props.data;
    let wrapperClassName = 'double-slider-wrapper vertical-double-slider-wrapper';
    if (className) {
      wrapperClassName += ` ${className}`;
    }

    let labelClassName = 'slider-label hide';
    if (label) {
      labelClassName = 'slider-label';
    }

    return (
      <div className={wrapperClassName}>
        <div className="slider-bar">
          <span className={labelClassName}>{label}</span>
          <div
            className="slider-wrapper"
            ref={(ref) => { this.slider = ref ?? undefined; }}
          >
            <div style={maskStyle} className="slider-disabled-mask" />
            {trackElement}
            <div
              className="slider-circle"
              style={handleStyle}
              onMouseDown={this.onmousedown}
              ref={(ref) => { this.sliderHandle = ref ?? undefined; }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VerticalDoubleSlider;