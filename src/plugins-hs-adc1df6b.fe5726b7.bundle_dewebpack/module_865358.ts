import React, { useState } from 'react';
import { Option, SmartText, Select, Tooltip } from './components';

interface DropdownNumberItem {
  value: number | string;
}

interface DropdownNumberData {
  defaultKey: number | string;
  items: (number | string)[];
  className?: string;
  onChange?: (value: number | string) => void;
  unit?: string;
  tooltip?: string;
  precisionDigits?: number;
}

interface DropdownNumberProps {
  data: DropdownNumberData;
}

export default function DropdownNumber({ data }: DropdownNumberProps): JSX.Element {
  const {
    defaultKey,
    items,
    className = '',
    onChange,
    unit,
    tooltip,
    precisionDigits
  } = data;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  let composedClassName = className;
  if (unit && !isHovered) {
    composedClassName += ' property-bar-dropdownnumber-unit';
  }

  const renderOption = (itemValue: number | string): JSX.Element => {
    const labelClassName = 'dropdownnumber-label__text';
    
    return (
      <Option
        key={itemValue}
        value={itemValue}
        title={
          <SmartText className={labelClassName}>
            {HSApp.Util.UnitFormater.toLengthDisplayString(itemValue, unit, precisionDigits)}
          </SmartText>
        }
      >
        <SmartText className={labelClassName}>
          {itemValue}
        </SmartText>
      </Option>
    );
  };

  const handleChange = (value: number | string): void => {
    onChange?.(value);
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const selectElement = (
    <Select
      dropdownClassName="dropdownnumber-popdom"
      size="small"
      position="right"
      onChange={handleChange}
      hideCurrent={true}
      bindSelf={!tooltip}
      value={defaultKey}
    >
      {items?.map(renderOption)}
    </Select>
  );

  return (
    <div
      className={`property-bar-dropdownnumber ${composedClassName}`}
      onMouseOverCapture={handleMouseEnter}
      onMouseOutCapture={handleMouseLeave}
    >
      {tooltip ? (
        <Tooltip placement="top" color="dark" title={tooltip}>
          <div>{selectElement}</div>
        </Tooltip>
      ) : (
        selectElement
      )}
      {!isHovered && unit && (
        <div className="property-bar-dropdownnumber-unit">
          {unit}
        </div>
      )}
    </div>
  );
}