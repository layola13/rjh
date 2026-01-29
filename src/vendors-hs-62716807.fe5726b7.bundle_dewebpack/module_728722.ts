import React, { forwardRef, useContext, ForwardedRef, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import SizeContext from './SizeContext';
import RcInputNumber from 'rc-input-number';
import UpOutlined from '@ant-design/icons/UpOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';

type SizeType = 'small' | 'middle' | 'large';

interface InputNumberProps {
  className?: string;
  size?: SizeType;
  prefixCls?: string;
  readOnly?: boolean;
  style?: CSSProperties;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: number | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onStep?: (value: number, info: { offset: number; type: 'up' | 'down' }) => void;
  precision?: number;
  decimalSeparator?: string;
  formatter?: (value: number | undefined) => string;
  parser?: (displayValue: string | undefined) => number;
  controls?: boolean;
  upHandler?: ReactNode;
  downHandler?: ReactNode;
  prefix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  keyboard?: boolean;
  stringMode?: boolean;
}

const DEFAULT_STEP = 1;

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const { getPrefixCls, direction } = useContext(ConfigContext);
    const contextSize = useContext(SizeContext);

    const {
      className,
      size,
      prefixCls: customPrefixCls,
      readOnly,
      ...restProps
    } = props;

    const prefixCls = getPrefixCls('input-number', customPrefixCls);

    const upIcon = <UpOutlined className={`${prefixCls}-handler-up-inner`} />;
    const downIcon = <DownOutlined className={`${prefixCls}-handler-down-inner`} />;

    const mergedSize = size || contextSize;

    const mergedClassName = classNames(
      {
        [`${prefixCls}-lg`]: mergedSize === 'large',
        [`${prefixCls}-sm`]: mergedSize === 'small',
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-readonly`]: readOnly,
      },
      className
    );

    return (
      <RcInputNumber
        ref={ref}
        className={mergedClassName}
        upHandler={upIcon}
        downHandler={downIcon}
        prefixCls={prefixCls}
        readOnly={readOnly}
        {...restProps}
      />
    );
  }
);

InputNumber.defaultProps = {
  step: DEFAULT_STEP,
};

export default InputNumber;