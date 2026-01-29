interface DropdownOption {
  id: string;
  title: string;
}

interface ValidOptions {
  checkValid: (value: number) => boolean;
  valid: boolean;
  errorTip: string;
}

interface DropdownInputProps {
  data: {
    title?: string;
    className?: string;
    options: DropdownOption[];
    tooltip?: string;
    editable?: boolean;
    suffix?: string;
    defaultValue?: string;
    validOptions?: ValidOptions;
    disabled?: boolean;
    onChange?: (value: string) => void;
  };
}

import React from 'react';
import { SmartText, Tooltip, Icons, Select, Option } from './components';

export default function DropdownInput(props: DropdownInputProps): JSX.Element {
  const {
    title,
    className,
    options,
    tooltip,
    editable,
    suffix,
    defaultValue,
    validOptions,
    disabled,
    onChange
  } = props.data;

  const selectValidOptions = validOptions
    ? {
        checkValid: (value: string): boolean => {
          const numericValue = Number(value);
          return !isNaN(numericValue) && validOptions.checkValid(numericValue);
        },
        valid: validOptions.valid,
        errorTip: validOptions.errorTip
      }
    : undefined;

  return (
    <div className={`property-bar-dropdowninput ${className ?? ''}`}>
      {title && (
        <SmartText
          placement="right"
          className="property-bar-label dropdowninput-label"
        >
          {title}
        </SmartText>
      )}
      {tooltip && (
        <Tooltip
          placement="top"
          color="dark"
          title={
            <div className="property-bar-dropdowninpu-label-tooltip">
              {tooltip}
            </div>
          }
        >
          <Icons
            className="dropdowninput-tooltip"
            type="hs_shuxingmianban_xiangqing"
          />
        </Tooltip>
      )}
      <div className="property-bar-comp dropdowninput-comp">
        <Select
          defaultValue={defaultValue}
          suffix={suffix}
          onChange={onChange}
          editable={editable}
          hideCurrent={true}
          disabled={disabled}
          validOptions={selectValidOptions}
        >
          {options.map((option) => (
            <Option key={option.id} value={option.id} title={option.title}>
              {option.title}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
}