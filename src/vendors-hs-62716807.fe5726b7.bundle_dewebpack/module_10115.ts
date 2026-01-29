import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from './ConfigContext';

interface InputGroupProps {
  prefixCls?: string;
  className?: string;
  size?: 'large' | 'small' | 'default';
  compact?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onBlur?: React.FocusEventHandler<HTMLSpanElement>;
  children?: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = (props) => {
  return React.createElement(ConfigConsumer, null, (config: ConfigConsumerProps) => {
    const { getPrefixCls, direction } = config;
    const {
      prefixCls: customizePrefixCls,
      className = '',
      size,
      compact,
      style,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      children
    } = props;

    const prefixCls = getPrefixCls('input-group', customizePrefixCls);

    const groupClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-compact`]: compact,
        [`${prefixCls}-rtl`]: direction === 'rtl'
      },
      className
    );

    return React.createElement('span', {
      className: groupClassName,
      style,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur
    }, children);
  });
};

export default InputGroup;