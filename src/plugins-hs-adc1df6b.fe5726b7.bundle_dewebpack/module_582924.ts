import { useState, useEffect } from 'react';
import React from 'react';
import { SmartText, Switch, Select } from './components';

interface ColorPickerData {
  value: number | string;
  classname?: string;
  tooltip?: string;
  format?: 10 | 16;
  label?: string;
  labelType?: 'default' | 'switch';
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  presetColors?: string[];
  onClose?: () => void;
  onValueChange?: (value: number | string) => void;
  onStatusChange?: (checked: boolean) => void;
}

interface ColorPickerProps {
  data: ColorPickerData;
}

const convertToHexString = (value: number | string | undefined): string => {
  if ((value || value === 0) && typeof value !== 'object') {
    const hexString = value.toString(16);
    const paddingLength = Math.abs(6 - hexString.length + 1);
    const padding = new Array(paddingLength).join('0');
    return `#${padding}${hexString}`;
  }
  return '';
};

const parseColorValue = (value: number | string | undefined, format: number): number | string => {
  let normalizedValue = value ?? 0;
  const valueString = normalizedValue.toString();
  
  if (valueString.match('#')) {
    return parseInt(valueString.split('#')[1], 16);
  }
  
  return convertToHexString(normalizedValue);
};

const ColorPicker: React.FC<ColorPickerProps> = ({ data }) => {
  const {
    value,
    classname = '',
    format = 16,
    label,
    labelType,
    status,
    disabled,
    presetColors,
    onClose,
    onValueChange,
    onStatusChange
  } = data;

  const [isChecked, setIsChecked] = useState<boolean>(status === 'checked');

  useEffect(() => {
    if (onClose) {
      return onClose;
    }
  }, []);

  useEffect(() => {
    setIsChecked(status === 'checked');
  }, [status]);

  const handleSwitchChange = (checked: boolean): void => {
    setIsChecked(checked);
    onStatusChange?.(checked);
  };

  const handleColorChange = (selectedValue: string): void => {
    let convertedValue: number | string = selectedValue;
    
    if (format === 16) {
      convertedValue = parseInt(selectedValue.split('#')[1], 16);
    }
    
    onValueChange?.(convertedValue);
  };

  let containerClassName = `property-bar-colorpicker ${classname}`;
  
  if (labelType === 'switch') {
    containerClassName += ' property-bar-colorpicker__switch';
  }

  const selectValue = parseColorValue(value, format);

  return (
    <div className={containerClassName}>
      {label ? (
        <SmartText className="property-bar-label switch-label">
          {label}
        </SmartText>
      ) : (
        <div />
      )}
      
      {labelType === 'switch' && (
        <div className="property-bar-switch-button">
          <Switch
            disabled={disabled}
            checked={isChecked}
            onChange={handleSwitchChange}
          />
        </div>
      )}
      
      <Select
        value={selectValue}
        size="middle"
        onChange={handleColorChange}
        position="right"
        mode="color"
        presetColors={presetColors}
      />
    </div>
  );
};

export default ColorPicker;