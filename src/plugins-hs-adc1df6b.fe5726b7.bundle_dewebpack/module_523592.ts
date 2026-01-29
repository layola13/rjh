import { useState, useEffect, ReactElement } from 'react';
import { CheckBox } from './CheckBox';

type CheckboxStatus = 'checked' | 'unchecked';

interface CheckboxChangeEvent {
  target: {
    checked: boolean;
  };
}

interface PropertyBarCheckboxData {
  tooltip?: string;
  text: string;
  status: CheckboxStatus;
  className?: string;
  disabled?: boolean;
  onClick?: (event: CheckboxChangeEvent) => void;
  onStatusChange?: (status: boolean) => void;
}

interface PropertyBarCheckboxProps {
  data: PropertyBarCheckboxData;
}

export default function PropertyBarCheckbox({ data }: PropertyBarCheckboxProps): ReactElement {
  const {
    text,
    status,
    className = '',
    disabled = false,
    onClick = (event: CheckboxChangeEvent) => console.log(event)
  } = data;

  const [isChecked, setIsChecked] = useState<boolean>(status === 'checked');

  useEffect(() => {
    setIsChecked(status === 'checked');
  }, [status]);

  const handleChange = (checked: boolean): void => {
    setIsChecked(checked);
    onClick?.({
      target: {
        checked
      }
    });
  };

  return (
    <div className={`property-bar-checkbox ${className}`}>
      <CheckBox
        className="property-bar-checkbox-box"
        onChange={handleChange}
        checked={isChecked}
        disabled={disabled}
      >
        {text}
      </CheckBox>
    </div>
  );
}