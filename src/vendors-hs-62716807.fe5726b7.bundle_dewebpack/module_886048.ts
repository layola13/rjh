import React, { forwardRef, useContext, useState, useEffect, memo, CSSProperties, MouseEvent } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import { SizeContext } from './SizeContext';
import { RadioGroupContextProvider } from './RadioGroupContext';
import Radio from './Radio';

type SizeType = 'small' | 'middle' | 'large';
type ButtonStyle = 'outline' | 'solid';
type OptionType = 'default' | 'button';

interface RadioOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  style?: CSSProperties;
}

interface RadioGroupProps {
  prefixCls?: string;
  className?: string;
  options?: Array<string | RadioOption>;
  optionType?: OptionType;
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
  children?: React.ReactNode;
  size?: SizeType;
  style?: CSSProperties;
  id?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
  name?: string;
}

const useControlledState = <T,>(
  defaultValue: T | undefined,
  controlledValue: T | undefined
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  return [value, setInternalValue];
};

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { getPrefixCls, direction } = useContext(ConfigContext);
  const contextSize = useContext(SizeContext);

  const [groupValue, setGroupValue] = useControlledState(
    props.defaultValue,
    props.value
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const previousValue = groupValue;
    const newValue = e.target.value;

    if (!('value' in props)) {
      setGroupValue(newValue);
    }

    const { onChange } = props;
    if (onChange && newValue !== previousValue) {
      onChange(e);
    }
  };

  const {
    prefixCls: customPrefixCls,
    className = '',
    options,
    optionType,
    buttonStyle = 'outline',
    disabled,
    children,
    size,
    style,
    id,
    onMouseEnter,
    onMouseLeave,
    name,
  } = props;

  const prefixCls = getPrefixCls('radio', customPrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;

  let childrenNodes = children;

  if (options && options.length > 0) {
    const optionPrefixCls = optionType === 'button' ? `${prefixCls}-button` : prefixCls;

    childrenNodes = options.map((option) => {
      if (typeof option === 'string') {
        return (
          <Radio
            key={option}
            prefixCls={optionPrefixCls}
            disabled={disabled}
            value={option}
            checked={groupValue === option}
          >
            {option}
          </Radio>
        );
      }

      return (
        <Radio
          key={`radio-group-value-options-${option.value}`}
          prefixCls={optionPrefixCls}
          disabled={option.disabled || disabled}
          value={option.value}
          checked={groupValue === option.value}
          style={option.style}
        >
          {option.label}
        </Radio>
      );
    });
  }

  const finalSize = size || contextSize;

  const groupClassName = classNames(
    groupPrefixCls,
    `${groupPrefixCls}-${buttonStyle}`,
    {
      [`${groupPrefixCls}-${finalSize}`]: finalSize,
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  return (
    <RadioGroupContextProvider
      value={{
        onChange: handleChange,
        value: groupValue,
        disabled,
        name,
      }}
    >
      <div
        className={groupClassName}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={id}
        ref={ref}
      >
        {childrenNodes}
      </div>
    </RadioGroupContextProvider>
  );
});

export default memo(RadioGroup);