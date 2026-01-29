import { useState, useEffect } from 'react';
import { SmartText, Tooltip, RadioGroup, Radio } from './components';

interface RadioButtonData {
  values: string[];
  defaultValue?: string;
  selectedValue?: string;
  onChange?: (event: { detail: { value: string } }) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
}

interface RadioButtonProps {
  data: RadioButtonData;
  id: string;
}

export default function RadioButton({ data, id }: RadioButtonProps): JSX.Element {
  const {
    values,
    defaultValue,
    selectedValue,
    onChange,
    label,
    className = '',
    disabled = false,
    tooltip
  } = data;

  let initialValue = selectedValue || defaultValue;

  if (values && !values.includes(initialValue)) {
    initialValue = values[0];
  }

  const [currentValue, setCurrentValue] = useState<string>(initialValue);

  useEffect(() => {
    if (values && values.includes(selectedValue)) {
      setCurrentValue(selectedValue);
    }
  }, [selectedValue, values]);

  const handleChange = (value: string): void => {
    if (onChange) {
      onChange({
        detail: {
          value
        }
      });
    }
    setCurrentValue(value);
  };

  const radioGroupContent = (
    <div className="radio-group">
      <RadioGroup value={currentValue} onChange={handleChange}>
        {values?.map((value) => (
          <Radio key={value} value={value} disabled={disabled}>
            {ResourceManager.getString(value) || value}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <div id={id} className={`property-bar-radio-button ${className}`}>
      {label && (
        <SmartText className="property-bar-label radio-button-label">
          {label}
        </SmartText>
      )}
      {tooltip?.length ? (
        <Tooltip placement="top" title={tooltip} trigger="hover" color="dark">
          {radioGroupContent}
        </Tooltip>
      ) : (
        radioGroupContent
      )}
    </div>
  );
}