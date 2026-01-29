import React, { useState, useEffect } from 'react';
import { CheckBox, Input, Tooltip } from './components';

interface CheckboxOptions {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

interface LabelInputData {
  className?: string;
  label?: string;
  placeholder?: string;
  checkboxOptions?: CheckboxOptions;
  tooltip?: string;
  disableChange?: boolean;
  value: string;
  maxLength?: number;
  type?: 'input' | 'textarea';
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChangeEnd?: (value: string) => void;
}

interface LabelInputProps {
  data: LabelInputData;
  [key: string]: unknown;
}

export default function LabelInput(props: LabelInputProps): React.ReactElement {
  const {
    data: {
      className = '',
      label,
      placeholder,
      checkboxOptions,
      tooltip,
      disableChange,
      value,
      maxLength,
      type = 'input',
      onBlur,
      onFocus,
      onChangeEnd,
      ...restData
    },
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    onBlur?.(event);
    onChangeEnd?.(inputValue);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    onFocus?.(event);
  };

  const handleCheckboxChange = (): void => {
    const defaultValue = '1';
    checkboxOptions?.onChange?.(defaultValue);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const inputComponent = (
    <div className={`propertybar-labelinput-wrapper ${className}`}>
      {checkboxOptions?.label && (
        <div className="propertybar-labelinput-checkbox">
          <CheckBox
            checked={checkboxOptions.checked}
            onChange={handleCheckboxChange}
            disabled={checkboxOptions.disabled}
          >
            {checkboxOptions.label}
          </CheckBox>
        </div>
      )}
      <div className="propertybar-labelinput">
        <span className="propertybar-labelinput-label">{label}</span>
        {type === 'textarea' ? (
          <Input.TextArea
            autoSize={{ maxRows: 3, minRows: 1 }}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disableChange}
            className="propertybar-labelinput-textarea"
            onChange={handleChange}
            value={inputValue}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...restData}
            {...restProps}
          />
        ) : (
          <Input
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disableChange}
            className="propertybar-labelinput-input"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={inputValue}
            {...restData}
            {...restProps}
          />
        )}
      </div>
    </div>
  );

  return tooltip ? (
    <Tooltip placement="top" title={tooltip} color="dark">
      {inputComponent}
    </Tooltip>
  ) : (
    inputComponent
  );
}