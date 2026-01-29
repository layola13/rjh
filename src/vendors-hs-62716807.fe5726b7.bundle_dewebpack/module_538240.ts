import React, { useContext, useEffect, useRef, forwardRef, CSSProperties, ChangeEvent } from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import { ConfigContext } from '../config-provider';
import { GroupContext } from './Group';
import warning from '../_util/warning';

interface CheckboxChangeEvent {
  target: CheckboxProps & { checked: boolean };
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: ChangeEvent;
}

export interface CheckboxProps {
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  indeterminate?: boolean;
  style?: CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  skipGroup?: boolean;
  checked?: boolean;
  disabled?: boolean;
  value?: string | number | boolean;
  name?: string;
  onChange?: (e: CheckboxChangeEvent) => void;
}

const InternalCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    children,
    indeterminate = false,
    style,
    onMouseEnter,
    onMouseLeave,
    skipGroup = false,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const groupContext = useContext(GroupContext);
  const previousValue = useRef(restProps.value);

  useEffect(() => {
    groupContext?.registerValue(restProps.value);
    warning(
      'checked' in restProps || !!groupContext || !('value' in restProps),
      'Checkbox',
      '`value` is not a valid prop, do you mean `checked`?'
    );
  }, []);

  useEffect(() => {
    if (skipGroup) {
      return;
    }

    if (restProps.value !== previousValue.current) {
      groupContext?.cancelValue(previousValue.current);
      groupContext?.registerValue(restProps.value);
    }

    return () => {
      groupContext?.cancelValue(restProps.value);
    };
  }, [restProps.value]);

  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const checkboxProps: CheckboxProps = { ...restProps };

  if (groupContext && !skipGroup) {
    checkboxProps.onChange = (...args: [CheckboxChangeEvent]) => {
      if (restProps.onChange) {
        restProps.onChange(...args);
      }
      if (groupContext.toggleOption) {
        groupContext.toggleOption({
          label: children,
          value: restProps.value,
        });
      }
    };
    checkboxProps.name = groupContext.name;
    checkboxProps.checked = groupContext.value.indexOf(restProps.value) !== -1;
    checkboxProps.disabled = restProps.disabled || groupContext.disabled;
  }

  const wrapperClassNames = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
    },
    className
  );

  const checkboxClassNames = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  });

  return (
    <label
      className={wrapperClassNames}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <RcCheckbox
        {...checkboxProps}
        prefixCls={prefixCls}
        className={checkboxClassNames}
        ref={ref}
      />
      {children !== undefined && <span>{children}</span>}
    </label>
  );
};

const Checkbox = forwardRef(InternalCheckbox);
Checkbox.displayName = 'Checkbox';

export default Checkbox;