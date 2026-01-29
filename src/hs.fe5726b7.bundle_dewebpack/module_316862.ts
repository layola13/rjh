import React from 'react';
import { IValueChange } from './IValueChange';

interface Range {
  min?: number;
  max?: number;
}

interface SliderRules {
  range: Range;
}

interface SliderOptions {
  readOnly: boolean;
  rules: SliderRules;
}

interface SliderData {
  className?: string;
  label?: string;
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

const DEFAULT_MAX_VALUE = 10;

class DoubleSlider extends React.Component<SliderProps, SliderState> implements IValueChange {
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
  private startX: number = 0;
  private startValue: number = 0;
  private leftPixel: number = 0;
  private rightPixel: number = 0;
  private sliderLength: number = 0;
  
  private slider?: HTMLDivElement | null;
  private leftOne?: HTMLDivElement | null;
  private leftTwo?: HTMLDivElement | null;
  private rightOne?: HTMLDivElement | null;
  private rightTwo?: HTMLDivElement | null;
  private sliderHandle?: HTMLDivElement | null;

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
    // Update logic if needed
  }

  private onmouseup = (): void => {
    this.startMove = false;
    this.removeEventListener();
    this.changeEnd(this.state.value);
  };

  private onmousemove = (event: MouseEvent): void => {
    if (this.startMove) {
      const calculatedValue = this.calMouseMoveValue(event);
      this.setState({ value: calculatedValue }, () => {
        this.changed(calculatedValue);
      });
    }
  };

  private onmousedown = (event: React.MouseEvent): void => {
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

  private delayMousemoveFun = (event: MouseEvent): void => {
    if (this.startMove) {
      const calculatedValue = this.calMouseMoveValue(event);
      this.setState({ value: calculatedValue });
    }
  };

  private delayMouseupFun = (): void => {
    this.changeEnd(this.state.value);
    this.startMove = false;
    this.removeEventListener();
  };

  private calMouseMoveValue(event: MouseEvent): number {
    const deltaX = event.pageX - this.startX;
    const { options } = this.props.data;
    const { min, max } = options.rules.range;
    
    let maxValue = DEFAULT_MAX_VALUE;
    let minValue = 0;
    
    if (max) {
      maxValue = max;
    }
    minValue = min ?? (0 - maxValue);
    
    const ratio = deltaX / this.sliderLength * maxValue * 2;
    let calculatedValue = this.startValue + ratio;
    
    if (calculatedValue > maxValue) {
      calculatedValue = maxValue;
    } else if (calculatedValue < minValue) {
      calculatedValue = minValue;
    }
    
    return calculatedValue;
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
    if (sliderElement !== undefined && sliderElement !== null) {
      const rect = sliderElement.getBoundingClientRect();
      this.leftPixel = rect.left;
      this.rightPixel = rect.right;
      this.sliderLength = this.rightPixel - this.leftPixel;
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

  changeStart(value: number): void {
    // Implementation from IValueChange interface
  }

  changed(value: number): void {
    // Implementation from IValueChange interface
  }

  changeEnd(value: number): void {
    // Implementation from IValueChange interface
  }

  onDeactive(): void {
    // Implementation from IValueChange interface
  }

  render(): React.ReactElement | null {
    const { options } = this.props.data;
    const { min, max } = options.rules.range;
    
    let maxValue = DEFAULT_MAX_VALUE;
    let minValue = 0;
    
    if (max) {
      maxValue = max;
    }
    minValue = min ?? (0 - maxValue);
    
    if (!Number.isFinite(maxValue) || !Number.isFinite(this.state.value) || !Number.isFinite(minValue)) {
      return null;
    }
    
    if (maxValue <= 0) {
      return null;
    }
    
    let currentValue = this.state.value;
    if (this.state.value < minValue) {
      currentValue = minValue;
    }
    if (this.state.value > maxValue) {
      currentValue = maxValue;
    }
    
    let leftPercentage = 0;
    let rightPercentage = 0;
    
    if (currentValue < 0) {
      leftPercentage = 100 * parseFloat((currentValue / (2 * minValue)).toFixed(3));
    } else {
      rightPercentage = 100 * parseFloat((currentValue / (2 * maxValue)).toFixed(3));
    }
    
    const leftOneWidth = 50 - leftPercentage;
    const leftTwoWidth = 50 - rightPercentage;
    const rightOneEnd = 50 + rightPercentage;
    
    const handlePosition = currentValue > 0 
      ? 50 + rightPercentage 
      : 50 - leftPercentage;
    
    const leftOneStyle = {
      width: `${leftOneWidth}%`
    };
    
    const leftTwoStyle = {
      left: `${leftOneWidth}%`,
      width: `${leftPercentage}%`
    };
    
    const rightOneStyle = {
      width: `${rightPercentage}%`
    };
    
    const rightTwoStyle = {
      left: `${rightOneEnd}%`,
      width: `${leftTwoWidth}%`
    };
    
    const handleStyle = {
      left: `${handlePosition}%`
    };
    
    const maskStyle = {
      display: this.state.readOnly ? 'block' : 'none'
    };
    
    const sliderTrack = (
      <div className="slider-track">
        <div 
          className="slider-track-left-one" 
          ref={el => { this.leftOne = el; }} 
          style={leftOneStyle}
        />
        <div 
          className="slider-track-left-two" 
          ref={el => { this.leftTwo = el; }} 
          style={leftTwoStyle}
        />
        <div 
          className="slider-track-right-one" 
          ref={el => { this.rightOne = el; }} 
          style={rightOneStyle}
        />
        <div 
          className="slider-track-right-two" 
          ref={el => { this.rightTwo = el; }} 
          style={rightTwoStyle}
        />
        <div className="slider-track-center" />
      </div>
    );
    
    const { className, label } = this.props.data;
    let wrapperClassName = 'double-slider-wrapper ';
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
          <div 
            className="slider-wrapper" 
            ref={el => { this.slider = el; }}
          >
            <div style={maskStyle} className="slider-disabled-mask" />
            {sliderTrack}
            <div 
              className="slider-circle" 
              style={handleStyle} 
              onMouseDown={this.onmousedown}
              ref={el => { this.sliderHandle = el; }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DoubleSlider;