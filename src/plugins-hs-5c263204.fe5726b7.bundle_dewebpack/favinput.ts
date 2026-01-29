import { useRef, useState, useEffect } from 'react';
import ResourceManager from './ResourceManager';
import { Input } from './Input';
import IconfontView from './IconfontView';

interface FavoriteGroup {
  name: string;
  // 根据实际使用添加其他属性
}

interface FavInputProps {
  className?: string;
  type?: string;
  favoriteGroups?: FavoriteGroup[];
  onSubmit: (value: string) => void;
  placeholder?: string;
  onBlur?: () => void;
  primaryFocus?: boolean;
  maxLength?: number;
  value?: string;
  checkValid?: (value: string) => boolean | undefined;
  getValue?: (value: string) => void;
  initialValid?: boolean | undefined;
  errorTips?: string;
}

interface ChangeEventParams {
  event?: React.ChangeEvent<HTMLInputElement>;
  value?: string;
}

/**
 * 检查分组名称是否重复
 */
function isDuplicateInName(groups: FavoriteGroup[], name: string): boolean {
  return groups.some(group => group.name === name);
}

/**
 * FavInput 组件 - 收藏夹输入框
 */
export function FavInput(props: FavInputProps): JSX.Element {
  const {
    className = '',
    type,
    favoriteGroups,
    onSubmit,
    placeholder,
    onBlur,
    primaryFocus = false,
    maxLength,
    value: initialValue,
    checkValid,
    getValue,
    initialValid,
    errorTips = ResourceManager.getString('favorite_favorite_add_to_group_fail')
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState<boolean | undefined>(initialValid);
  const [inputValue, setInputValue] = useState<string>(initialValue ?? '');

  useEffect(() => {
    if (primaryFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [primaryFocus]);

  const validateInput = (value: string): boolean | undefined => {
    if (checkValid) {
      return checkValid(value);
    }

    if (!value) {
      return undefined;
    }

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return false;
    }

    if (favoriteGroups && isDuplicateInName(favoriteGroups, value)) {
      return false;
    }

    return true;
  };

  const handleChange = (params: ChangeEventParams): void => {
    const { event, value } = params;
    const newValue = value ?? event?.target?.value ?? '';
    
    setInputValue(newValue);
    
    const valid = validateInput(newValue);
    setIsValid(valid);
    
    if (getValue) {
      getValue(newValue);
    }
  };

  const handleSubmit = (): void => {
    if (isValid && inputValue) {
      onSubmit(inputValue);
    }
  };

  const handleClear = (): void => {
    handleChange({ value: '' });
    inputRef.current?.focus();
  };

  const getValidationClass = (): string => {
    if (isValid === true) return 'success';
    if (isValid === false) return 'failed';
    return 'gray';
  };

  return (
    <div className={`input-body ${type ?? ''} ${className} ${getValidationClass()}`}>
      <Input
        className="favorite-input"
        placeholder={placeholder ?? ResourceManager.getString('plugin_catalog_new_group')}
        value={inputValue}
        onChange={(event) => handleChange({ event })}
        onPressEnter={handleSubmit}
        onBlur={onBlur}
        ref={inputRef}
        maxLength={maxLength}
      />
      
      <div className="icon-clear" onClick={handleClear}>
        <IconfontView
          showType="hs_xiao_shanchu"
          customStyle={{ fontSize: '10px' }}
        />
      </div>
      
      <div className="iconWrapper" onMouseDown={handleSubmit}>
        <IconfontView
          showType="hs_mian_gou"
          customClass="icon"
          customStyle={{ fontSize: '16px', color: '#D4D7E1' }}
        />
      </div>
      
      {isValid === false && (
        <p className="error-tips">{errorTips}</p>
      )}
    </div>
  );
}