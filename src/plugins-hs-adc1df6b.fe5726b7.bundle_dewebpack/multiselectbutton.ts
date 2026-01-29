import React from 'react';
import { MultiSelect } from './MultiSelect';

interface MultiSelectButtonTheme {
  [key: string]: unknown;
}

interface MultiSelectListItem {
  value: string | number;
  label: string;
  [key: string]: unknown;
}

interface MultiSelectButtonData {
  type: string;
  list: MultiSelectListItem[];
  theme?: MultiSelectButtonTheme;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface MultiSelectButtonProps {
  data: MultiSelectButtonData;
  id: string;
}

export const MultiSelectButton: React.FC<MultiSelectButtonProps> = ({ data, id }) => {
  const { type, list, theme, className = '', placement } = data;

  return (
    <div
      id={id}
      className={`property-bar-multiselectbutton ${className}`}
    >
      <MultiSelect
        className="property-bar-multiselectbutton-button"
        type={type}
        list={list}
        theme={theme}
        placement={placement}
      />
    </div>
  );
};