import React, { forwardRef, useState, KeyboardEvent, MouseEvent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { KeyCode } from './KeyCode';

interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loadingIcon?: React.ReactNode;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onClick?: (checked: boolean, event: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (checked: boolean, event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    prefixCls = 'rc-switch',
    className,
    checked,
    defaultChecked,
    disabled,
    loadingIcon,
    checkedChildren,
    unCheckedChildren,
    onClick,
    onChange,
    onKeyDown,
    ...restProps
  } = props;

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(
    isControlled ? checked : (defaultChecked ?? false)
  );

  const checkedState = isControlled ? checked : internalChecked;

  const toggleChecked = (
    newChecked: boolean,
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ): boolean => {
    if (disabled) {
      return checkedState;
    }

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked, event);

    return newChecked;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.which === KeyCode.LEFT) {
      toggleChecked(false, event);
    } else if (event.which === KeyCode.RIGHT) {
      toggleChecked(true, event);
    }

    onKeyDown?.(event);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const newChecked = toggleChecked(!checkedState, event);
    onClick?.(newChecked, event);
  };

  const switchClassName = classNames(
    prefixCls,
    className,
    {
      [`${prefixCls}-checked`]: checkedState,
      [`${prefixCls}-disabled`]: disabled,
    }
  );

  return (
    <button
      {...restProps}
      type="button"
      role="switch"
      aria-checked={checkedState}
      disabled={disabled}
      className={switchClassName}
      ref={ref}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {loadingIcon}
      <span className={`${prefixCls}-inner`}>
        {checkedState ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  );
});

Switch.displayName = 'Switch';

export default Switch;