import * as React from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import warning from 'rc-util/lib/warning';
import Steps from './Steps';
import Marks from './Marks';
import Handle from './Handle';
import * as utils from './utils';

interface Bounds {
  [key: number]: number;
}

interface Mark {
  style?: React.CSSProperties;
  label?: React.ReactNode;
}

interface Marks {
  [key: number]: React.ReactNode | Mark;
}

interface HandleProps {
  prefixCls?: string;
  vertical?: boolean;
  offset?: number;
  value?: number;
  index?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  reverse?: boolean;
  tabIndex?: number;
  ref?: React.Ref<any>;
  dragging?: boolean;
}

interface SliderProps {
  prefixCls?: string;
  className?: string;
  marks?: Marks;
  dots?: boolean;
  step?: number;
  included?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  min?: number;
  max?: number;
  children?: React.ReactNode;
  maximumTrackStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  railStyle?: React.CSSProperties;
  dotStyle?: React.CSSProperties;
  activeDotStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties[];
  handleStyle?: React.CSSProperties[];
  draggableTrack?: boolean;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onBeforeChange?: (value: number | number[]) => void;
  onChange?: (value: number | number[]) => void;
  onAfterChange?: (value: number | number[]) => void;
  value?: number | number[];
  defaultValue?: number | number[];
}

interface SliderState {
  value: number | number[];
  bounds: number[];
  dragging?: boolean;
}

interface EventListener {
  remove: () => void;
}

function noop(): void {}

export default function createSlider(Component: React.ComponentClass<any>) {
  class ComponentEnhancer extends Component {
    static displayName = `ComponentEnhancer(${Component.displayName})`;

    static defaultProps = {
      ...Component.defaultProps,
      prefixCls: 'rc-slider',
      className: '',
      min: 0,
      max: 100,
      step: 1,
      marks: {},
      handle: (props: HandleProps) => {
        const { index, ...restProps } = props;
        delete restProps.dragging;
        return restProps.value === null ? null : <Handle {...restProps} key={index} />;
      },
      onBeforeChange: noop,
      onChange: noop,
      onAfterChange: noop,
      included: true,
      disabled: false,
      dots: false,
      vertical: false,
      reverse: false,
      trackStyle: [{}],
      handleStyle: [{}],
      railStyle: {},
      dotStyle: {},
      activeDotStyle: {},
    };

    handlesRefs: { [key: number]: any } = {};
    sliderRef: HTMLDivElement | null = null;
    document: Document | null = null;
    dragOffset: number = 0;
    dragTrack: boolean = false;
    startBounds: number[] = [];
    prevMovedHandleIndex: number = 0;
    onTouchMoveListener: EventListener | null = null;
    onTouchUpListener: EventListener | null = null;
    onMouseMoveListener: EventListener | null = null;
    onMouseUpListener: EventListener | null = null;
    positionGetValue?: (position: number) => number[];

    constructor(props: SliderProps) {
      super(props);

      const { step, max, min } = props;
      const isStepValid = !step || Math.floor(step) !== step || (max - min) % step === 0;

      warning(
        !step || Math.floor(step) !== step || isStepValid,
        `Slider[max] - Slider[min] (${max - min}) should be a multiple of Slider[step] (${step})`
      );
    }

    componentDidMount(): void {
      this.document = this.sliderRef?.ownerDocument ?? null;
      const { autoFocus, disabled } = this.props;
      if (autoFocus && !disabled) {
        this.focus();
      }
    }

    componentWillUnmount(): void {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
      this.removeDocumentEvents();
    }

    onDown = (event: React.MouseEvent | React.TouchEvent, position: number): void => {
      const { draggableTrack, vertical } = this.props;
      const { bounds } = this.state as SliderState;
      const positionValues = (draggableTrack && this.positionGetValue?.(position)) || [];
      const isEventFromHandle = utils.isEventFromHandle(event, this.handlesRefs);

      if (
        draggableTrack &&
        bounds.length >= 2 &&
        !isEventFromHandle &&
        !positionValues
          .map((value, index) => {
            const inBounds = !!index || value >= bounds[index];
            return index === positionValues.length - 1 ? value <= bounds[index] : inBounds;
          })
          .some((result) => !result)
      ) {
        this.dragTrack = true;
        this.dragOffset = position;
        this.startBounds = [...bounds];
      } else {
        if (isEventFromHandle) {
          const handlePosition = utils.getHandleCenterPosition(vertical, event.target as HTMLElement);
          this.dragOffset = position - handlePosition;
          position = handlePosition;
        } else {
          this.dragOffset = 0;
        }
        this.onStart(position);
      }
    };

    onMouseDown = (event: React.MouseEvent): void => {
      if (event.button === 0) {
        this.removeDocumentEvents();
        const { vertical } = this.props;
        const position = utils.getMousePosition(vertical, event);
        this.onDown(event, position);
        this.addDocumentMouseEvents();
      }
    };

    onTouchStart = (event: React.TouchEvent): void => {
      if (!utils.isNotTouchEvent(event)) {
        const { vertical } = this.props;
        const position = utils.getTouchPosition(vertical, event);
        this.onDown(event, position);
        this.addDocumentTouchEvents();
        utils.pauseEvent(event);
      }
    };

    onFocus = (event: React.FocusEvent): void => {
      const { onFocus, vertical } = this.props;
      if (utils.isEventFromHandle(event, this.handlesRefs) && !this.dragTrack) {
        const handlePosition = utils.getHandleCenterPosition(vertical, event.target as HTMLElement);
        this.dragOffset = 0;
        this.onStart(handlePosition);
        utils.pauseEvent(event);
        onFocus?.(event);
      }
    };

    onBlur = (event: React.FocusEvent): void => {
      const { onBlur } = this.props;
      if (!this.dragTrack) {
        this.onEnd();
      }
      onBlur?.(event);
    };

    onMouseUp = (): void => {
      this.handlesRefs[this.prevMovedHandleIndex]?.clickFocus();
    };

    onMouseMove = (event: MouseEvent): void => {
      if (this.sliderRef) {
        const position = utils.getMousePosition(this.props.vertical, event);
        this.onMove(event, position - this.dragOffset, this.dragTrack, this.startBounds);
      } else {
        this.onEnd();
      }
    };

    onTouchMove = (event: TouchEvent): void => {
      if (!utils.isNotTouchEvent(event) && this.sliderRef) {
        const position = utils.getTouchPosition(this.props.vertical, event);
        this.onMove(event, position - this.dragOffset, this.dragTrack, this.startBounds);
      } else {
        this.onEnd();
      }
    };

    onKeyDown = (event: React.KeyboardEvent): void => {
      if (this.sliderRef && utils.isEventFromHandle(event, this.handlesRefs)) {
        this.onKeyboard(event);
      }
    };

    onClickMarkLabel = (event: React.MouseEvent, value: number): void => {
      event.stopPropagation();
      this.onChange({ value });
      this.setState({ value }, () => this.onEnd(true));
    };

    getSliderStart(): number {
      const slider = this.sliderRef!;
      const { vertical, reverse } = this.props;
      const rect = slider.getBoundingClientRect();
      return vertical ? (reverse ? rect.bottom : rect.top) : window.pageXOffset + (reverse ? rect.right : rect.left);
    }

    getSliderLength(): number {
      const slider = this.sliderRef;
      if (!slider) return 0;
      const rect = slider.getBoundingClientRect();
      return this.props.vertical ? rect.height : rect.width;
    }

    addDocumentTouchEvents(): void {
      this.onTouchMoveListener = addEventListener(this.document!, 'touchmove', this.onTouchMove);
      this.onTouchUpListener = addEventListener(this.document!, 'touchend', this.onEnd);
    }

    addDocumentMouseEvents(): void {
      this.onMouseMoveListener = addEventListener(this.document!, 'mousemove', this.onMouseMove);
      this.onMouseUpListener = addEventListener(this.document!, 'mouseup', this.onEnd);
    }

    removeDocumentEvents(): void {
      this.onTouchMoveListener?.remove();
      this.onTouchUpListener?.remove();
      this.onMouseMoveListener?.remove();
      this.onMouseUpListener?.remove();
    }

    focus(): void {
      if (!this.props.disabled) {
        this.handlesRefs[0]?.focus();
      }
    }

    blur(): void {
      if (!this.props.disabled) {
        Object.keys(this.handlesRefs).forEach((key) => {
          this.handlesRefs[parseInt(key)]?.blur?.();
        });
      }
    }

    calcValue(offset: number): number {
      const { vertical, min, max } = this.props;
      const ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
      return vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
    }

    calcValueByPos(position: number): number {
      const { reverse } = this.props;
      const pixelOffset = (reverse ? -1 : 1) * (position - this.getSliderStart());
      return this.trimAlignValue(this.calcValue(pixelOffset));
    }

    calcOffset(value: number): number {
      const { min, max } = this.props;
      const ratio = (value - min) / (max - min);
      return Math.max(0, ratio * 100);
    }

    saveHandle = (index: number, handle: any): void => {
      this.handlesRefs[index] = handle;
    };

    saveSlider = (slider: HTMLDivElement | null): void => {
      this.sliderRef = slider;
    };

    render(): React.ReactNode {
      const {
        prefixCls,
        className,
        marks,
        dots,
        step,
        included,
        disabled,
        vertical,
        reverse,
        min,
        max,
        children,
        maximumTrackStyle,
        style,
        railStyle,
        dotStyle,
        activeDotStyle,
      } = this.props;

      const renderResult = super.render() as { tracks: React.ReactNode; handles: React.ReactNode };
      const { tracks, handles } = renderResult;

      const sliderClassName = classNames(prefixCls, {
        [`${prefixCls}-with-marks`]: Object.keys(marks!).length > 0,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-vertical`]: vertical,
        [className!]: className,
      });

      return (
        <div
          ref={this.saveSlider}
          className={sliderClassName}
          onTouchStart={disabled ? noop : this.onTouchStart}
          onMouseDown={disabled ? noop : this.onMouseDown}
          onMouseUp={disabled ? noop : this.onMouseUp}
          onKeyDown={disabled ? noop : this.onKeyDown}
          onFocus={disabled ? noop : this.onFocus}
          onBlur={disabled ? noop : this.onBlur}
          style={style}
        >
          <div className={`${prefixCls}-rail`} style={{ ...maximumTrackStyle, ...railStyle }} />
          {tracks}
          <Steps
            prefixCls={prefixCls!}
            vertical={vertical!}
            reverse={reverse!}
            marks={marks!}
            dots={dots!}
            step={step!}
            included={included!}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max!}
            min={min!}
            dotStyle={dotStyle}
            activeDotStyle={activeDotStyle}
          />
          {handles}
          <Marks
            className={`${prefixCls}-mark`}
            onClickLabel={disabled ? noop : this.onClickMarkLabel}
            vertical={vertical!}
            marks={marks!}
            included={included!}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max!}
            min={min!}
            reverse={reverse!}
          />
          {children}
        </div>
      );
    }
  }

  return ComponentEnhancer;
}