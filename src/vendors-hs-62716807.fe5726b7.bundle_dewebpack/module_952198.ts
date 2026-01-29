import React, { createContext, useContext, useState, ReactNode, HTMLAttributes } from 'react';
import { ConfigContext } from './ConfigContext';

interface SiderHook {
  addSider: (id: string) => void;
  removeSider: (id: string) => void;
}

interface LayoutContextValue {
  siderHook: SiderHook;
}

export const LayoutContext = createContext<LayoutContextValue>({
  siderHook: {
    addSider: () => null,
    removeSider: () => null,
  },
});

interface BasicProps extends HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  className?: string;
  children?: ReactNode;
}

interface ComponentConfig {
  suffixCls: string;
  tagName: keyof JSX.IntrinsicElements;
  displayName: string;
}

interface BasicComponentProps extends BasicProps {
  tagName: keyof JSX.IntrinsicElements;
}

interface LayoutProps extends BasicProps {
  hasSider?: boolean;
  tagName?: keyof JSX.IntrinsicElements;
}

function createLayoutComponent(config: ComponentConfig) {
  return function <P extends BasicProps>(Component: React.ComponentType<BasicComponentProps & P>) {
    const WrappedComponent: React.FC<P> = (props) => {
      const { getPrefixCls } = useContext(ConfigContext);
      const { prefixCls, ...restProps } = props;
      const finalPrefixCls = getPrefixCls(config.suffixCls, prefixCls);

      return (
        <Component
          prefixCls={finalPrefixCls}
          tagName={config.tagName}
          {...(restProps as P)}
        />
      );
    };

    WrappedComponent.displayName = config.displayName;
    return WrappedComponent;
  };
}

const BasicComponent: React.FC<BasicComponentProps> = ({
  prefixCls,
  className,
  children,
  tagName: Tag,
  ...restProps
}) => {
  const classNames = [prefixCls, className].filter(Boolean).join(' ');

  return (
    <Tag className={classNames} {...restProps}>
      {children}
    </Tag>
  );
};

const InternalLayout: React.FC<LayoutProps & { prefixCls: string; tagName: keyof JSX.IntrinsicElements }> = ({
  prefixCls,
  className,
  children,
  hasSider,
  tagName: Tag,
  ...restProps
}) => {
  const { direction } = useContext(ConfigContext);
  const [siders, setSiders] = useState<string[]>([]);

  const classNames = [
    prefixCls,
    typeof hasSider === 'boolean' ? hasSider : siders.length > 0 ? `${prefixCls}-has-sider` : '',
    direction === 'rtl' ? `${prefixCls}-rtl` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contextValue: LayoutContextValue = {
    siderHook: {
      addSider: (id: string) => {
        setSiders((prev) => [...prev, id]);
      },
      removeSider: (id: string) => {
        setSiders((prev) => prev.filter((siderId) => siderId !== id));
      },
    },
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <Tag className={classNames} {...restProps}>
        {children}
      </Tag>
    </LayoutContext.Provider>
  );
};

const Layout = createLayoutComponent({
  suffixCls: 'layout',
  tagName: 'section',
  displayName: 'Layout',
})<LayoutProps>((props) => {
  const { tagName = 'section', ...restProps } = props;
  return <InternalLayout tagName={tagName} {...restProps} />;
});

export const Header = createLayoutComponent({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header',
})(BasicComponent);

export const Footer = createLayoutComponent({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer',
})(BasicComponent);

export const Content = createLayoutComponent({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content',
})(BasicComponent);

export default Layout;