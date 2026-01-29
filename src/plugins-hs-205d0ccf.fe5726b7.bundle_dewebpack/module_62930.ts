import React, { useRef, useState, useMemo, ChangeEvent } from 'react';
import { Input } from './Input';
import { useTheme } from './useTheme';
import { Icons } from './Icons';
import './styles.css';

interface RoundInputProps {
  suffix?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

export default function RoundInput(props: RoundInputProps): JSX.Element {
  const theme = useTheme();
  const inputRef = useRef<{ setValue: (value: string) => void } | null>(null);

  function clearInput(): void {
    inputRef.current?.setValue('');
  }

  const [inputValue, setInputValue] = useState<string>('');

  const suffixElement = useMemo(() => {
    return (
      <>
        {inputValue && (
          <div className="clear-icon-wrapper">
            <Icons
              onClick={clearInput}
              className="clear-icon"
              type="hs_xiao_shanchu"
            />
          </div>
        )}
        {props.suffix}
      </>
    );
  }, [props.suffix, inputValue]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const newValue = event.target?.value;
    setInputValue(newValue);
    props.onChange?.(event);
  }

  return (
    <Input
      ref={inputRef}
      className={`round-input ${theme}`}
      {...props}
      allowClear={false}
      suffix={suffixElement}
      onChange={handleChange}
    />
  );
}