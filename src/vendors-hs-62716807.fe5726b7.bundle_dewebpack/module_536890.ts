import React, { useState, useEffect, useContext, createContext, memo, CSSProperties, ReactNode } from 'react';
import { ConfigContext } from './ConfigContext';

interface CheckboxOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
  style?: CSSProperties;
}

interface CheckboxChangeEvent {
  target: {
    checked: boolean;
    value: string;
  };
}

interface GroupContextValue {
  toggleOption: (option: { value: string }) => void;
  value: string[];
  disabled?: boolean;
  name?: string;
  registerValue: (value: string) => void;
  cancelValue: (value: string) => void;
}

export const GroupContext = createContext<GroupContextValue | null>(null);

interface CheckboxGroupProps {
  defaultValue?: string[];
  value?: string[];
  children?: ReactNode;
  options?: (string | CheckboxOption)[];
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  onChange?: (checkedValues: string[]) => void;
  disabled?: boolean;
  name?: string;
  [key: string]: unknown;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    defaultValue,
    children,
    options = [],
    prefixCls,
    className,
    style,
    onChange,
    value: controlledValue,
    disabled,
    name,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);

  const [value, setValue] = useState<string[]>(controlledValue ?? defaultValue ?? []);
  const [registeredValues, setRegisteredValues] = useState<string[]>([]);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const normalizeOptions = (): CheckboxOption[] => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  };

  const checkboxPrefixCls = getPrefixCls('checkbox', prefixCls);
  const groupPrefixCls = `${checkboxPrefixCls}-group`;

  const filterRestProps = (obj: Record<string, unknown>): Record<string, unknown> => {
    const { value, disabled, ...rest } = obj;
    return rest;
  };

  let childrenNode = children;

  if (options.length > 0) {
    const normalizedOptions = normalizeOptions();
    childrenNode = normalizedOptions.map((option) => {
      return React.createElement(
        'Checkbox',
        {
          prefixCls: checkboxPrefixCls,
          key: option.value.toString(),
          disabled: option.disabled !== undefined ? option.disabled : disabled,
          value: option.value,
          checked: value.indexOf(option.value) !== -1,
          onChange: option.onChange,
          className: `${groupPrefixCls}-item`,
          style: option.style,
        },
        option.label
      );
    });
  }

  const contextValue: GroupContextValue = {
    toggleOption: (option: { value: string }) => {
      const optionIndex = value.indexOf(option.value);
      const newValue = [...value];

      if (optionIndex === -1) {
        newValue.push(option.value);
      } else {
        newValue.splice(optionIndex, 1);
      }

      if (controlledValue === undefined) {
        setValue(newValue);
      }

      if (onChange) {
        const normalizedOptions = normalizeOptions();
        const sortedValues = newValue
          .filter((val) => registeredValues.indexOf(val) !== -1)
          .sort((a, b) => {
            const aIndex = normalizedOptions.findIndex((opt) => opt.value === a);
            const bIndex = normalizedOptions.findIndex((opt) => opt.value === b);
            return aIndex - bIndex;
          });
        onChange(sortedValues);
      }
    },
    value,
    disabled,
    name,
    registerValue: (val: string) => {
      setRegisteredValues((prev) => [...prev, val]);
    },
    cancelValue: (val: string) => {
      setRegisteredValues((prev) => prev.filter((v) => v !== val));
    },
  };

  const groupClassName = [
    groupPrefixCls,
    direction === 'rtl' ? `${groupPrefixCls}-rtl` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const filteredRestProps = filterRestProps(restProps);

  return (
    <div className={groupClassName} style={style} {...filteredRestProps}>
      <GroupContext.Provider value={contextValue}>
        {childrenNode}
      </GroupContext.Provider>
    </div>
  );
};

export default memo(CheckboxGroup);