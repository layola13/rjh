import React, { forwardRef, useContext, useRef, Ref, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import classNames from 'classnames';
import { composeRef } from '../_util/ref';
import Input from './Input';
import Button from '../button';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SizeContext from '../config-provider/SizeContext';
import { ConfigContext } from '../config-provider';
import { cloneElement } from '../_util/reactNode';

type SizeType = 'small' | 'middle' | 'large' | undefined;

interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange'> {
  prefixCls?: string;
  inputPrefixCls?: string;
  className?: string;
  size?: SizeType;
  suffix?: React.ReactNode;
  enterButton?: boolean | React.ReactNode;
  addonAfter?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onSearch?: (value: string, event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search = forwardRef<Input, SearchProps>((props, ref) => {
  const {
    prefixCls: customPrefixCls,
    inputPrefixCls: customInputPrefixCls,
    className,
    size: customSize,
    suffix,
    enterButton = false,
    addonAfter,
    loading,
    disabled,
    onSearch,
    onChange,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const contextSize = useContext(SizeContext);
  const size = customSize ?? contextSize;

  const inputRef = useRef<Input>(null);

  const handleMouseDown = (event: MouseEvent<HTMLElement>): void => {
    if (document.activeElement === inputRef.current?.input) {
      event.preventDefault();
    }
  };

  const handleSearch = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>): void => {
    if (onSearch) {
      onSearch(inputRef.current?.input?.value ?? '', event);
    }
  };

  const prefixCls = getPrefixCls('input-search', customPrefixCls);
  const inputPrefixCls = getPrefixCls('input', customInputPrefixCls);

  const defaultIcon = typeof enterButton === 'boolean' || enterButton === undefined 
    ? <SearchOutlined /> 
    : null;

  const buttonClassName = `${prefixCls}-button`;

  let buttonNode: React.ReactNode;
  const enterButtonAsNode = enterButton as any;
  const isAntButton = enterButtonAsNode.type?.__ANT_BUTTON === true;

  if (isAntButton || enterButtonAsNode.type === 'button') {
    buttonNode = cloneElement(enterButtonAsNode, {
      onMouseDown: handleMouseDown,
      onClick: handleSearch,
      key: 'enterButton',
      ...(isAntButton ? {
        className: buttonClassName,
        size,
      } : {}),
    });
  } else {
    buttonNode = (
      <Button
        className={buttonClassName}
        type={enterButton ? 'primary' : undefined}
        size={size}
        disabled={disabled}
        key="enterButton"
        onMouseDown={handleMouseDown}
        onClick={handleSearch}
        loading={loading}
        icon={defaultIcon}
      >
        {enterButton}
      </Button>
    );
  }

  let addonAfterNode: React.ReactNode = buttonNode;
  if (addonAfter) {
    addonAfterNode = [
      buttonNode,
      cloneElement(addonAfter, { key: 'addonAfter' }),
    ];
  }

  const searchClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-with-button`]: !!enterButton,
    },
    className,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event?.target && (event as any).type === 'click' && onSearch) {
      onSearch(event.target.value, event as any);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Input
      ref={composeRef(inputRef, ref as Ref<Input>)}
      onPressEnter={handleSearch}
      {...restProps}
      size={size}
      prefixCls={inputPrefixCls}
      addonAfter={addonAfterNode}
      suffix={suffix}
      onChange={handleChange}
      className={searchClassName}
      disabled={disabled}
    />
  );
});

Search.displayName = 'Search';

export default Search;