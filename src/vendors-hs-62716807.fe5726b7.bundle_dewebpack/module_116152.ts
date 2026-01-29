import React, { forwardRef, useContext, ReactElement } from 'react';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import warning from '../_util/warning';

type SizeType = 'small' | 'middle' | 'large' | undefined;

interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  prefixCls?: string;
  size?: SizeType;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: MouseEvent) => void;
  onClick?: (checked: boolean, event: MouseEvent) => void;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  autoFocus?: boolean;
}

interface SwitchComponent extends React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>> {
  __ANT_SWITCH: boolean;
  displayName: string;
}

const omit = <T extends Record<string, unknown>>(obj: T, keys: string[]): Partial<T> => {
  const result: Partial<T> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (keys.indexOf(symbol as unknown as string) < 0 && Object.prototype.propertyIsEnumerable.call(obj, symbol)) {
        result[symbol as unknown as keyof T] = obj[symbol as unknown as keyof T];
      }
    }
  }
  
  return result;
};

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    loading = false,
    className = '',
    disabled = false,
    ...restProps
  } = props;

  warning(
    'checked' in restProps || !('value' in restProps),
    'Switch',
    '`value` is not a valid prop, do you mean `checked`?'
  );

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const contextSize = useContext(SizeContext);
  
  const prefixCls = getPrefixCls('switch', customizePrefixCls);
  const size = customizeSize || contextSize;

  const loadingIcon: ReactElement = (
    <div className={`${prefixCls}-handle`}>
      {loading && <LoadingOutlined className={`${prefixCls}-loading-icon`} />}
    </div>
  );

  const classes = classNames(
    {
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const switchProps = omit(restProps, ['prefixCls', 'size', 'loading', 'className', 'disabled']);

  return (
    <Wave insertExtraNode>
      <RcSwitch
        {...switchProps}
        prefixCls={prefixCls}
        className={classes}
        disabled={disabled || loading}
        ref={ref}
        loadingIcon={loadingIcon}
      />
    </Wave>
  );
}) as SwitchComponent;

Switch.__ANT_SWITCH = true;
Switch.displayName = 'Switch';

export default Switch;