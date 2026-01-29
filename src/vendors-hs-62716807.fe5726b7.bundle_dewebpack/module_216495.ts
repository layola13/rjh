import React from 'react';

interface SkeletonInputProps {
  prefixCls?: string;
  className?: string;
  active?: boolean;
  size?: 'default' | 'large' | 'small';
}

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

interface SkeletonElementProps extends Omit<SkeletonInputProps, 'prefixCls'> {
  prefixCls: string;
}

/**
 * Skeleton Input Component
 * Renders a skeleton placeholder for input fields
 */
const SkeletonInput: React.FC<SkeletonInputProps> = (props) => {
  const renderSkeletonInput = (config: ConfigConsumerProps): React.ReactElement => {
    const { getPrefixCls } = config;
    const { prefixCls: customPrefixCls, className, active, ...restProps } = props;
    
    const prefixCls = getPrefixCls('skeleton', customPrefixCls);
    
    const classNames = [
      prefixCls,
      `${prefixCls}-element`,
      active ? `${prefixCls}-active` : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={classNames}>
        <SkeletonInputElement
          prefixCls={`${prefixCls}-input`}
          {...restProps}
        />
      </div>
    );
  };

  return <ConfigConsumer>{renderSkeletonInput}</ConfigConsumer>;
};

SkeletonInput.defaultProps = {
  size: 'default'
};

export default SkeletonInput;

// Note: ConfigConsumer and SkeletonInputElement are imported dependencies
// that would need to be defined or imported separately
declare const ConfigConsumer: React.FC<{
  children: (config: ConfigConsumerProps) => React.ReactElement;
}>;

declare const SkeletonInputElement: React.FC<SkeletonElementProps>;