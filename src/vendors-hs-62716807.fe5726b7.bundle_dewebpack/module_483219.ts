import React, { useCallback, Fragment } from 'react';
import CloseIcon from './CloseIcon';
import SearchIcon from './SearchIcon';
import Input from './Input';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  prefixCls?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function SearchInput(props: SearchInputProps): JSX.Element {
  const {
    placeholder = '',
    value,
    prefixCls,
    disabled,
    onChange,
    handleClear
  } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange]
  );

  const handleClearClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!disabled && handleClear) {
      handleClear(event);
    }
  };

  const showClearButton = value && value.length > 0;

  return (
    <Fragment>
      <Input
        placeholder={placeholder}
        className={prefixCls}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {showClearButton ? (
        <a
          className={`${prefixCls}-action`}
          onClick={handleClearClick}
        >
          <CloseIcon />
        </a>
      ) : (
        <span className={`${prefixCls}-action`}>
          <SearchIcon />
        </span>
      )}
    </Fragment>
  );
}