import React, { useState } from 'react';
import { Checkbox } from 'antd';

interface CheckboxOption {
  value: string | number;
  label: string;
}

interface CheckboxComponentProps {
  value: string | number;
  options: CheckboxOption[];
  onChange: (values: (string | number)[]) => void;
}

export const CheckboxComponent: React.FC<CheckboxComponentProps> = (props) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([props.value]);

  const handleChange = (checkedValues: (string | number)[]): void => {
    props.onChange(checkedValues);
    setSelectedValues(checkedValues);
  };

  return (
    <Checkbox.Group value={selectedValues} onChange={handleChange}>
      {props.options.map((option) => (
        <div key={option.value} className="checkbox-item">
          <Checkbox value={option.value}>{option.label}</Checkbox>
        </div>
      ))}
    </Checkbox.Group>
  );
};