import React, { useContext, useEffect, useRef, forwardRef, CSSProperties, MouseEvent } from 'react';
import classNames from 'classnames';
import { composeRef } from '../_util/ref';
import { ConfigContext } from '../config-provider';
import RcCheckbox from 'rc-checkbox';
import RadioGroupContext from './context';
import { warning } from '../_util/warning';

interface RadioProps {
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  value?: unknown;
  checked?: boolean;
  disabled?: boolean;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLLabelElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLLabelElement>) => void;
}

const InternalRadio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const radioGroupContext = useContext(RadioGroupContext);
  const configContext = useContext(ConfigContext);
  const { getPrefixCls, direction } = configContext;
  const internalRef = useRef<HTMLInputElement>(null);
  const composedRef = composeRef(ref, internalRef);

  useEffect(() => {
    warning(
      !('optionType' in props),
      'Radio',
      '`optionType` is only support in Radio.Group.'
    );
  }, []);

  const {
    prefixCls: customizePrefixCls,
    className,
    children,
    style,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('radio', customizePrefixCls);
  const radioProps: Partial<RadioProps> = { ...restProps };

  if (radioGroupContext) {
    radioProps.name = radioGroupContext.name;
    radioProps.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(event);
      }
      if (radioGroupContext.onChange) {
        radioGroupContext.onChange(event);
      }
    };
    radioProps.checked = props.value === radioGroupContext.value;
    radioProps.disabled = props.disabled || radioGroupContext.disabled;
  }

  const wrapperClassNames = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    },
    className
  );

  return (
    <label
      className={wrapperClassNames}
      style={style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <RcCheckbox
        {...radioProps}
        prefixCls={prefixCls}
        ref={composedRef}
      />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  );
});

InternalRadio.displayName = 'Radio';

const Radio = InternalRadio as typeof InternalRadio & {
  defaultProps?: Partial<RadioProps>;
};

Radio.defaultProps = {
  type: 'radio',
};

export default Radio;