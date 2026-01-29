import React, { Component, FocusEvent, KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from './ConfigContext';
import SizeContext, { SizeType } from './SizeContext';
import ClearableInput, { hasPrefixSuffix } from './ClearableInput';
import warning from './warning';
import omit from './omit';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  prefixCls?: string;
  size?: SizeType;
  onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  inputType?: string;
}

interface InputState {
  value: string | number | readonly string[] | undefined;
  focused: boolean;
  prevValue?: string | number | readonly string[] | undefined;
}

interface FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}

export function fixControlledValue(value: string | number | readonly string[] | undefined): string {
  return value == null ? '' : String(value);
}

export function resolveOnChange(
  target: HTMLInputElement,
  event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLElement>,
  onChange?: (e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLElement>) => void
): void {
  if (onChange) {
    let clonedEvent = event;
    if (event.type === 'click') {
      clonedEvent = Object.create(event) as typeof event;
      (clonedEvent as any).target = target;
      (clonedEvent as any).currentTarget = target;
      const originalValue = target.value;
      target.value = '';
      onChange(clonedEvent);
      target.value = originalValue;
      return;
    }
    onChange(clonedEvent);
  }
}

export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: SizeType,
  disabled?: boolean,
  direction?: string
): string {
  return classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered,
  });
}

export function triggerFocus(
  element: HTMLInputElement | null,
  options?: FocusOptions
): void {
  if (!element) return;

  element.focus(options as FocusOptions);
  const { cursor } = options ?? {};

  if (cursor) {
    const length = element.value.length;
    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;
      case 'end':
        element.setSelectionRange(length, length);
        break;
      default:
        element.setSelectionRange(0, length);
    }
  }
}

class Input extends Component<InputProps, InputState> {
  static defaultProps = {
    type: 'text',
  };

  static getDerivedStateFromProps(props: InputProps, state: InputState): Partial<InputState> {
    const { prevValue } = state;
    const newState: Partial<InputState> = {
      prevValue: props.value,
    };

    if (props.value === undefined && prevValue === props.value) {
      return newState;
    }

    newState.value = props.value;
    return newState;
  }

  input!: HTMLInputElement;
  clearableInput!: any;
  removePasswordTimeout?: number;
  direction: string = 'ltr';

  constructor(props: InputProps) {
    super(props);
    const value = props.value === undefined ? props.defaultValue : props.value;
    this.state = {
      value,
      focused: false,
      prevValue: props.value,
    };
  }

  componentDidMount(): void {
    this.clearPasswordValueAttribute();
  }

  componentDidUpdate(): void {
    // Component update logic if needed
  }

  getSnapshotBeforeUpdate(prevProps: InputProps): null {
    if (hasPrefixSuffix(prevProps) !== hasPrefixSuffix(this.props)) {
      warning(
        this.input !== document.activeElement,
        'Input',
        'When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ'
      );
    }
    return null;
  }

  componentWillUnmount(): void {
    if (this.removePasswordTimeout) {
      clearTimeout(this.removePasswordTimeout);
    }
  }

  focus = (options?: FocusOptions): void => {
    triggerFocus(this.input, options);
  };

  blur(): void {
    this.input.blur();
  }

  setSelectionRange(
    start: number,
    end: number,
    direction?: 'forward' | 'backward' | 'none'
  ): void {
    this.input.setSelectionRange(start, end, direction);
  }

  select(): void {
    this.input.select();
  }

  saveClearableInput = (input: any): void => {
    this.clearableInput = input;
  };

  saveInput = (input: HTMLInputElement): void => {
    this.input = input;
  };

  setValue(value: string, callback?: () => void): void {
    if (this.props.value === undefined) {
      this.setState({ value }, callback);
    } else {
      callback?.();
    }
  }

  onFocus = (e: FocusEvent<HTMLInputElement>): void => {
    const { onFocus } = this.props;
    this.setState({ focused: true }, this.clearPasswordValueAttribute);
    onFocus?.(e);
  };

  onBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { onBlur } = this.props;
    this.setState({ focused: false }, this.clearPasswordValueAttribute);
    onBlur?.(e);
  };

  handleReset = (e: MouseEvent<HTMLElement>): void => {
    this.setValue('', () => {
      this.focus();
    });
    resolveOnChange(this.input, e, this.props.onChange);
  };

  clearPasswordValueAttribute = (): void => {
    this.removePasswordTimeout = window.setTimeout(() => {
      if (
        this.input &&
        this.input.getAttribute('type') === 'password' &&
        this.input.hasAttribute('value')
      ) {
        this.input.removeAttribute('value');
      }
    });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setValue(e.target.value, this.clearPasswordValueAttribute);
    resolveOnChange(this.input, e, this.props.onChange);
  };

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    onKeyDown?.(e);
  };

  renderInput = (
    prefixCls: string,
    size?: SizeType,
    bordered?: boolean,
    inputConfig: any = {}
  ): React.ReactElement => {
    const { className, addonBefore, addonAfter, size: propsSize, disabled } = this.props;
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
      'allowClear',
      'defaultValue',
      'size',
      'inputType',
      'bordered',
    ]);

    return (
      <input
        autoComplete={inputConfig.autoComplete}
        {...otherProps}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.handleKeyDown}
        className={classNames(
          getInputClassName(prefixCls, bordered ?? true, propsSize ?? size, disabled, this.direction),
          {
            [className!]: className && !addonBefore && !addonAfter,
          }
        )}
        ref={this.saveInput}
      />
    );
  };

  renderComponent = (config: ConfigConsumerProps): React.ReactElement => {
    const { getPrefixCls, direction, input } = config;
    const { value, focused } = this.state;
    const { prefixCls, bordered = true } = this.props;
    const inputPrefixCls = getPrefixCls('input', prefixCls);
    this.direction = direction ?? 'ltr';

    return (
      <SizeContext.Consumer>
        {(size?: SizeType) => (
          <ClearableInput
            size={size}
            {...this.props}
            prefixCls={inputPrefixCls}
            inputType="input"
            value={fixControlledValue(value)}
            element={this.renderInput(inputPrefixCls, size, bordered, input)}
            handleReset={this.handleReset}
            ref={this.saveClearableInput}
            direction={direction}
            focused={focused}
            triggerFocus={this.focus}
            bordered={bordered}
          />
        )}
      </SizeContext.Consumer>
    );
  };

  render(): React.ReactElement {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}

export default Input;