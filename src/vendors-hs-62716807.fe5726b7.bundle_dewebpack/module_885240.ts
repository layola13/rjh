import React, { useContext, forwardRef, Ref } from 'react';
import Radio from './Radio';
import { ConfigContext } from './ConfigContext';
import RadioGroupContext from './RadioGroupContext';

interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  prefixCls?: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref: Ref<HTMLInputElement>) => {
    const groupContext = useContext(RadioGroupContext);
    const { getPrefixCls } = useContext(ConfigContext);
    
    const { prefixCls, ...restProps } = props;
    const mergedPrefixCls = getPrefixCls('radio-button', prefixCls);

    const radioProps: RadioButtonProps = { ...restProps };

    if (groupContext) {
      radioProps.checked = props.value === groupContext.value;
      radioProps.disabled = props.disabled ?? groupContext.disabled;
    }

    return (
      <Radio
        prefixCls={mergedPrefixCls}
        {...radioProps}
        type="radio"
        ref={ref}
      />
    );
  }
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;