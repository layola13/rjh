import React from 'react';

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
}

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  size?: 'large' | 'middle' | 'small';
  className?: string;
}

type ButtonGroupSize = 'large' | 'middle' | 'small';

const SIZE_MAP: Record<ButtonGroupSize, string> = {
  large: 'lg',
  middle: '',
  small: 'sm',
};

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  return (
    <ConfigConsumer>
      {(config: ConfigConsumerProps) => {
        const { getPrefixCls, direction } = config;
        const { prefixCls: customizePrefixCls, size, className, ...restProps } = props;
        
        const prefixCls = getPrefixCls('btn-group', customizePrefixCls);
        
        let sizeClassSuffix = '';
        if (size !== undefined && size !== 'middle') {
          sizeClassSuffix = SIZE_MAP[size] || '';
          if (size !== 'large' && size !== 'small' && size !== 'middle') {
            console.warn(new Error(`Invalid size: ${size}`));
          }
        }
        
        const classNames = [
          prefixCls,
          sizeClassSuffix ? `${prefixCls}-${sizeClassSuffix}` : '',
          direction === 'rtl' ? `${prefixCls}-rtl` : '',
          className || '',
        ]
          .filter(Boolean)
          .join(' ');
        
        return <div {...restProps} className={classNames} />;
      }}
    </ConfigConsumer>
  );
};

export default ButtonGroup;

const ConfigConsumer: React.FC<{
  children: (config: ConfigConsumerProps) => React.ReactNode;
}> = ({ children }) => {
  return <>{children}</> as React.ReactElement;
};