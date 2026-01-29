import React from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'center' | 'right' | '';
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  plain?: boolean;
}

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
}

interface ConfigConsumerComponent {
  (props: { children: (config: ConfigConsumerProps) => React.ReactElement }): React.ReactElement;
}

declare const ConfigConsumer: ConfigConsumerComponent;

const Divider: React.FC<DividerProps> = (props) => {
  return React.createElement(ConfigConsumer, null, (config: ConfigConsumerProps) => {
    const { getPrefixCls, direction } = config;
    const {
      prefixCls: customizePrefixCls,
      type = 'horizontal',
      orientation = 'center',
      className,
      children,
      dashed,
      plain,
      ...restProps
    } = props;

    const prefixCls = getPrefixCls('divider', customizePrefixCls);
    const orientationSuffix = orientation.length > 0 ? `-${orientation}` : orientation;
    const hasChildren = !!children;

    const classNames = [
      prefixCls,
      `${prefixCls}-${type}`,
      hasChildren && `${prefixCls}-with-text`,
      hasChildren && `${prefixCls}-with-text${orientationSuffix}`,
      dashed && `${prefixCls}-dashed`,
      plain && `${prefixCls}-plain`,
      direction === 'rtl' && `${prefixCls}-rtl`,
      className
    ].filter(Boolean).join(' ');

    return React.createElement(
      'div',
      {
        className: classNames,
        role: 'separator',
        ...restProps
      },
      children && React.createElement(
        'span',
        { className: `${prefixCls}-inner-text` },
        children
      )
    );
  });
};

export default Divider;