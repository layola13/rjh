import React, { useContext, MouseEvent } from 'react';
import { ConfigContext } from './ConfigContext';

interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  [key: string]: any;
}

const CheckableTag: React.FC<CheckableTagProps> = (props) => {
  const {
    prefixCls,
    className,
    checked = false,
    onChange,
    onClick,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const mergedPrefixCls = getPrefixCls('tag', prefixCls);

  const classNames = [
    mergedPrefixCls,
    `${mergedPrefixCls}-checkable`,
    checked ? `${mergedPrefixCls}-checkable-checked` : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event: MouseEvent<HTMLSpanElement>): void => {
    onChange?.(!checked);
    onClick?.(event);
  };

  return (
    <span
      {...restProps}
      className={classNames}
      onClick={handleClick}
    />
  );
};

export default CheckableTag;