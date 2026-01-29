import React from 'react';
import BaseSelect from './BaseSelect';

interface SelectProps {
  size?: 'small' | 'medium' | 'large';
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  disabled?: boolean;
  [key: string]: any;
}

interface SelectComponent extends React.FC<SelectProps> {
  Option: typeof BaseSelect.Option;
}

const Select: SelectComponent = (props: SelectProps) => {
  return React.createElement(BaseSelect, {
    size: 'small',
    ...props
  });
};

Select.Option = BaseSelect.Option;

export default Select;