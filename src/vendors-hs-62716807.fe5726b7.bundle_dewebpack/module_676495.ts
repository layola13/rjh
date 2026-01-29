import React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import SkeletonButton from './Button';
import { ConfigConsumer } from '../config-provider';

interface SkeletonButtonElementProps {
  prefixCls?: string;
  className?: string;
  active?: boolean;
  size?: 'large' | 'small' | 'default';
  shape?: 'circle' | 'round' | 'default';
  block?: boolean;
}

const SkeletonButtonElement: React.FC<SkeletonButtonElementProps> = (props) => {
  const renderButton = (contextConfig: { getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string }) => {
    const { getPrefixCls } = contextConfig;
    const { prefixCls: customizePrefixCls, className, active, ...restProps } = props;
    
    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const buttonProps = omit(restProps, ['prefixCls']);
    
    const elementClassName = classNames(
      prefixCls,
      `${prefixCls}-element`,
      {
        [`${prefixCls}-active`]: active,
      },
      className
    );

    return (
      <div className={elementClassName}>
        <SkeletonButton 
          prefixCls={`${prefixCls}-button`}
          {...buttonProps}
        />
      </div>
    );
  };

  return <ConfigConsumer>{renderButton}</ConfigConsumer>;
};

SkeletonButtonElement.defaultProps = {
  size: 'default',
};

export default SkeletonButtonElement;