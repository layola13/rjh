import React from 'react';
import BaseSelect from './BaseSelect';

interface SmallSelectProps {
  value?: string | number | string[];
  onChange?: (value: string | number | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
  options?: Array<{ label: string; value: string | number }>;
  children?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * A small-sized select component wrapper
 * @param props - Select component props
 * @returns React element with small size preset
 */
const SmallSelect: React.FC<SmallSelectProps> & { Option: typeof BaseSelect.Option } = (props) => {
  return React.createElement(BaseSelect, {
    size: 'small',
    ...props
  });
};

SmallSelect.Option = BaseSelect.Option;

export default SmallSelect;