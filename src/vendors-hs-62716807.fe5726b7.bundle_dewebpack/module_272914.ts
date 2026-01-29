import React from 'react';
import defaultRenderEmpty from './defaultRenderEmpty';

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty?: () => React.ReactNode;
}

interface WithConfigSettings {
  prefixCls?: string;
}

const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string): string => {
    return customizePrefixCls || (suffixCls ? `ant-${suffixCls}` : 'ant');
  },
  renderEmpty: defaultRenderEmpty
});

const ConfigConsumer = ConfigContext.Consumer;

function withConfigConsumer<P extends object>(settings: WithConfigSettings) {
  return function <T extends React.ComponentType<P>>(Component: T): React.FC<P> {
    const WrappedComponent: React.FC<P> = (props: P) => {
      return React.createElement(ConfigConsumer, null, (contextProps: ConfigConsumerProps) => {
        const { prefixCls: suffixCls } = settings;
        const prefixCls = contextProps.getPrefixCls(suffixCls, (props as any).prefixCls);
        
        return React.createElement(Component, {
          ...contextProps,
          ...props,
          prefixCls
        } as P);
      });
    };

    const componentConstructor = Component as any;
    const displayName = componentConstructor?.displayName || componentConstructor?.name || 'Component';
    WrappedComponent.displayName = `withConfigConsumer(${displayName})`;

    return WrappedComponent;
  };
}

export { ConfigContext, ConfigConsumer, withConfigConsumer };