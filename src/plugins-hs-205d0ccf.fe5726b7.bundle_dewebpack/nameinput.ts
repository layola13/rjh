import { useRef, useState, useEffect } from 'react';
import { Input } from 'antd';
import { IconfontView } from './IconfontView';
import classNames from 'classnames';

interface NameInputProps {
  value: string;
  commitEditingName: (name: string) => void;
}

export const NameInput: React.FC<NameInputProps> = ({ value, commitEditingName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasError((inputValue?.length ?? 0) > 20);
  }, [inputValue]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommit = (): void => {
    commitEditingName(inputValue);
  };

  return (
    <div className="task-view-name-input">
      <Input
        onClick={(e) => e.stopPropagation()}
        ref={inputRef}
        className={classNames('name-input', hasError && 'error')}
        value={inputValue}
        allowClear={true}
        maxLength={20}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleCommit}
        onFocus={(e) => e.target?.select()}
        onBlur={() => commitEditingName(inputValue)}
      />
      <div className="iconWrapper" onMouseDown={handleCommit}>
        <IconfontView
          showType="hs_mian_gou"
          customClass="icon"
          customStyle={{
            fontSize: '16px',
            color: '#D4D7E1'
          }}
        />
      </div>
    </div>
  );
};