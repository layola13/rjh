import React from 'react';
import defaultRenderEmpty from './defaultRenderEmpty';

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty?: () => React.ReactNode;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string): string => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
  renderEmpty: defaultRenderEmpty,
});

export const ConfigConsumer = ConfigContext.Consumer;

interface WithConfigConsumerOptions {
  prefixCls?: string;
}

export function withConfigConsumer<P extends { prefixCls?: string }>(
  options: WithConfigConsumerOptions
) {
  return function (Component: React.ComponentType<P>): React.FC<P> {
    const WithConfigConsumerComponent: React.FC<P> = (props) => {
      return (
        <ConfigConsumer>
          {(configContext) => {
            const { prefixCls: suffixCls } = options;
            const prefixCls = configContext.getPrefixCls(suffixCls, props.prefixCls);
            
            return (
              <Component
                {...configContext}
                {...props}
                prefixCls={prefixCls}
              />
            );
          }}
        </ConfigConsumer>
      );
    };

    const componentConstructor = Component.constructor;
    const displayName =
      (componentConstructor && componentConstructor.displayName) ||
      Component.name ||
      'Component';
    
    WithConfigConsumerComponent.displayName = `withConfigConsumer(${displayName})`;

    return WithConfigConsumerComponent;
  };
}