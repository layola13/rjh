import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { Icons } from './Icons';
import './EditInput.css';

interface EditInputProps {
  className?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
  enableEdit?: boolean;
  isValid?: (value: string) => boolean;
  resetAfterSubmit?: boolean;
  onBlur?: () => void;
}

export const EditInput: React.FC<EditInputProps> = ({
  className = '',
  defaultValue,
  onSubmit,
  placeholder,
  enableEdit = false,
  isValid = () => true,
  resetAfterSubmit = false,
  onBlur = () => {},
}) => {
  const [isValidValue, setIsValidValue] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');

  useEffect(() => {
    setInputValue(defaultValue || '');
  }, [defaultValue]);

  const handleSubmit = (): void => {
    if (isValidValue) {
      onSubmit(inputValue);
      if (resetAfterSubmit) {
        setInputValue('');
      }
    }
  };

  const getFocusStateClass = (): string => {
    if (!isFocused) return 'not-focus';
    if (inputValue === '') return 'gray';
    return isValidValue ? 'success' : 'failed';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    const valid = isValid(value);
    setIsValidValue(valid);
  };

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
    onBlur();
  };

  const handleClear = (): void => {
    setInputValue('');
  };

  const editModeClass = enableEdit ? '' : 'disable-edit';
  const focusStateClass = getFocusStateClass();

  return (
    <div className={`opendesign-input-body ${className} ${editModeClass} ${focusStateClass}`}>
      <Input
        className="edit-input"
        placeholder={placeholder || 'input text'}
        value={inputValue}
        onChange={handleChange}
        onPressEnter={handleSubmit}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="icon-clear" onClick={handleClear} />
      <div className="icon-wrapper" onMouseDown={handleSubmit}>
        <Icons type="hs_mian_gou" />
      </div>
    </div>
  );
};