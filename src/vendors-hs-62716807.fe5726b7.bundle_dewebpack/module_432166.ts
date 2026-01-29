import React from 'react';

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

interface SkeletonAvatarProps {
  prefixCls?: string;
  className?: string;
  active?: boolean;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square';
}

type AvatarElementProps = Omit<SkeletonAvatarProps, 'prefixCls'>;

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = (props) => {
  const renderAvatar = (config: ConfigConsumerProps) => {
    const { getPrefixCls } = config;
    const {
      prefixCls: customizePrefixCls,
      className,
      active,
      ...restProps
    } = props;

    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const elementPrefixCls = `${prefixCls}-element`;
    const activeClass = active ? `${prefixCls}-active` : '';
    
    const classNames = [
      prefixCls,
      elementPrefixCls,
      activeClass,
      className
    ].filter(Boolean).join(' ');

    const avatarProps: AvatarElementProps & { prefixCls: string } = {
      prefixCls: `${prefixCls}-avatar`,
      ...restProps
    };

    return React.createElement('div', { className: classNames },
      React.createElement(AvatarElement, avatarProps)
    );
  };

  return React.createElement(ConfigConsumer, null, renderAvatar);
};

SkeletonAvatar.defaultProps = {
  size: 'default',
  shape: 'circle'
};

export default SkeletonAvatar;

// Note: ConfigConsumer and AvatarElement are external dependencies
// ConfigConsumer from '../../config-provider/context'
// AvatarElement from './Avatar' or similar component
declare const ConfigConsumer: React.ComponentType<{
  children: (config: ConfigConsumerProps) => React.ReactNode;
}>;
declare const AvatarElement: React.ComponentType<AvatarElementProps & { prefixCls: string }>;