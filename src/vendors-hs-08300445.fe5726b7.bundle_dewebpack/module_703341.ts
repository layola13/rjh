import React from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { getOffsetLeft } from './util';
import Star from './Star';

interface RateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  style?: React.CSSProperties;
  id?: string;
  prefixCls?: string;
  disabled?: boolean;
  className?: string;
  character?: React.ReactNode;
  characterRender?: (origin: React.ReactNode, props: { index: number }) => React.ReactNode;
  tabIndex?: number;
  direction?: 'ltr' | 'rtl';
  onChange?: (value: number) => void;
  onHoverChange?: (value: number | undefined) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  autoFocus?: boolean;
}

interface RateState {
  value: number;
  focused: boolean;
  cleanedValue: number | null;
  hoverValue?: number;
}

function noop(): void {}

class Rate extends React.Component<RateProps, RateState> {
  static defaultProps = {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    style: {},
    prefixCls: 'rc-rate',
    onChange: noop,
    character: '★',
    onHoverChange: noop,
    tabIndex: 0,
    direction: 'ltr' as const,
  };

  static getDerivedStateFromProps(nextProps: RateProps, prevState: RateState): RateState {
    if ('value' in nextProps && nextProps.value !== undefined) {
      return {
        ...prevState,
        value: nextProps.value,
      };
    }
    return prevState;
  }

  private stars: Record<number, HTMLElement | null> = {};
  private rate: HTMLUListElement | null = null;

  constructor(props: RateProps) {
    super(props);

    let initialValue = props.value;
    if (initialValue === undefined) {
      initialValue = props.defaultValue;
    }

    this.state = {
      value: initialValue ?? 0,
      focused: false,
      cleanedValue: null,
    };
  }

  componentDidMount(): void {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  onHover = (event: React.MouseEvent, index: number): void => {
    const { onHoverChange } = this.props;
    const starValue = this.getStarValue(index, event.pageX);

    if (starValue !== this.state.cleanedValue) {
      this.setState({
        hoverValue: starValue,
        cleanedValue: null,
      });
    }

    onHoverChange?.(starValue);
  };

  onMouseLeave = (): void => {
    const { onHoverChange } = this.props;
    this.setState({
      hoverValue: undefined,
      cleanedValue: null,
    });
    onHoverChange?.(undefined);
  };

  onClick = (event: React.MouseEvent, index: number): void => {
    const { allowClear } = this.props;
    const { value } = this.state;
    const starValue = this.getStarValue(index, event.pageX);
    let isReset = false;

    if (allowClear) {
      isReset = starValue === value;
    }

    this.onMouseLeave();
    this.changeValue(isReset ? 0 : starValue);
    this.setState({
      cleanedValue: isReset ? starValue : null,
    });
  };

  onFocus = (): void => {
    const { onFocus } = this.props;
    this.setState({
      focused: true,
    });
    onFocus?.();
  };

  onBlur = (): void => {
    const { onBlur } = this.props;
    this.setState({
      focused: false,
    });
    onBlur?.();
  };

  onKeyDown = (event: React.KeyboardEvent): void => {
    const { keyCode } = event;
    const { count = 5, allowHalf, onKeyDown, direction } = this.props;
    const isRtl = direction === 'rtl';
    let { value } = this.state;

    if (keyCode === KeyCode.RIGHT && value < count && !isRtl) {
      value += allowHalf ? 0.5 : 1;
      this.changeValue(value);
      event.preventDefault();
    } else if (
      (keyCode === KeyCode.LEFT && value > 0 && !isRtl) ||
      (keyCode === KeyCode.RIGHT && value > 0 && isRtl)
    ) {
      value -= allowHalf ? 0.5 : 1;
      this.changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && value < count && isRtl) {
      value += allowHalf ? 0.5 : 1;
      this.changeValue(value);
      event.preventDefault();
    }

    onKeyDown?.(event);
  };

  saveRef = (index: number) => {
    return (node: HTMLElement | null): void => {
      this.stars[index] = node;
    };
  };

  saveRate = (node: HTMLUListElement | null): void => {
    this.rate = node;
  };

  getStarDOM(index: number): HTMLElement | null {
    return this.stars[index] ?? null;
  }

  getStarValue(index: number, pageX: number): number {
    const { allowHalf, direction } = this.props;
    const isRtl = direction === 'rtl';
    let starValue = index + 1;

    if (allowHalf) {
      const star = this.getStarDOM(index);
      if (star) {
        const offset = getOffsetLeft(star);
        const width = star.clientWidth;
        if ((isRtl && pageX - offset > width / 2) || (!isRtl && pageX - offset < width / 2)) {
          starValue -= 0.5;
        }
      }
    }

    return starValue;
  }

  focus(): void {
    if (!this.props.disabled) {
      this.rate?.focus();
    }
  }

  blur(): void {
    if (!this.props.disabled) {
      this.rate?.blur();
    }
  }

  changeValue(newValue: number): void {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value: newValue,
      });
    }
    onChange?.(newValue);
  }

  render(): React.ReactNode {
    const {
      count = 5,
      allowHalf,
      style,
      id,
      prefixCls = 'rc-rate',
      disabled,
      className,
      character,
      characterRender,
      tabIndex,
      direction,
    } = this.props;
    const { value, hoverValue, focused } = this.state;

    const stars: React.ReactNode[] = [];
    const disabledClass = disabled ? `${prefixCls}-disabled` : '';

    for (let index = 0; index < count; index += 1) {
      stars.push(
        <Star
          ref={this.saveRef(index)}
          index={index}
          count={count}
          disabled={disabled}
          prefixCls={`${prefixCls}-star`}
          allowHalf={allowHalf}
          value={hoverValue !== undefined ? hoverValue : value}
          onClick={this.onClick}
          onHover={this.onHover}
          key={index}
          character={character}
          characterRender={characterRender}
          focused={focused}
        />
      );
    }

    const rateClassName = classNames(prefixCls, disabledClass, className, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });

    return (
      <ul
        className={rateClassName}
        style={style}
        id={id}
        onMouseLeave={disabled ? undefined : this.onMouseLeave}
        tabIndex={disabled ? -1 : tabIndex}
        onFocus={disabled ? undefined : this.onFocus}
        onBlur={disabled ? undefined : this.onBlur}
        onKeyDown={disabled ? undefined : this.onKeyDown}
        ref={this.saveRate}
        role="radiogroup"
      >
        {stars}
      </ul>
    );
  }
}

export default Rate;