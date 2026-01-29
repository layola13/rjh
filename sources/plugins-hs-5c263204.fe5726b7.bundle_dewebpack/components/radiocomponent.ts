import React, { useState } from 'react';
import { RadioGroup, Radio } from './radio-library';

interface RadioOption {
  value: string | number;
  label: string;
}

interface RadioComponentProps {
  value: string | number;
  options: RadioOption[];
  onChange: (value: string | number) => void;
}

export const RadioComponent: React.FC<RadioComponentProps> = ({ value, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(value);

  const handleChange = (newValue: string | number): void => {
    onChange(newValue);
    setSelectedValue(newValue);
  };

  return (
    <RadioGroup value={selectedValue} onChange={handleChange}>
      {options.map((option) => (
        <div key={option.value} className="radio-item">
          <Radio value={option.value}>{option.label}</Radio>
        </div>
      ))}
    </RadioGroup>
  );
};