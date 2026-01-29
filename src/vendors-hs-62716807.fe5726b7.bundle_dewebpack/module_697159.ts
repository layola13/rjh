import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import RcMenu from 'rc-menu';
import { ConfigConsumer, ConfigConsumerProps } from './ConfigContext';
import { SiderContext, SiderContextProps } from './SiderContext';
import MenuContext, { MenuContextProps } from './MenuContext';
import { Divider, ItemGroup } from 'rc-menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { cloneElement } from './utils';
import warning from './warning';
import defaultMotions from './defaultMotions';

type MenuTheme = 'light' | 'dark';
type MenuMode = 'horizontal' | 'inline' | 'vertical';

interface MotionConfig {
  motionName: string;
}

interface DefaultMotions {
  horizontal: MotionConfig;
  inline: typeof defaultMotions;
  other: MotionConfig;
}

interface InternalMenuProps {
  prefixCls?: string;
  className?: string;
  theme?: MenuTheme;
  mode?: MenuMode;
  inlineCollapsed?: boolean;
  siderCollapsed?: boolean;
  expandIcon?: ReactElement;
  focusable?: boolean;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  direction?: 'ltr' | 'rtl';
}

interface MenuProps extends InternalMenuProps {
  // Additional props from rc-menu can be added here
  [key: string]: unknown;
}

class InternalMenu extends Component<InternalMenuProps> {
  static defaultProps = {
    className: '',
    theme: 'light' as MenuTheme,
    focusable: false,
  };

  constructor(props: InternalMenuProps) {
    super(props);

    warning(
      !('inlineCollapsed' in props && props.mode !== 'inline'),
      'Menu',
      '`inlineCollapsed` should only be used when `mode` is inline.'
    );

    warning(
      !(props.siderCollapsed !== undefined && 'inlineCollapsed' in props),
      'Menu',
      '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.'
    );
  }

  getInlineCollapsed(): boolean | undefined {
    const { inlineCollapsed, siderCollapsed } = this.props;
    return siderCollapsed !== undefined ? siderCollapsed : inlineCollapsed;
  }

  renderMenu = (configProps: ConfigConsumerProps): ReactElement => {
    const { getPopupContainer, getPrefixCls, direction } = configProps;
    const { prefixCls, className, theme, expandIcon, ...restProps } = this.props;

    const defaultMotionsConfig: DefaultMotions = {
      horizontal: {
        motionName: 'slide-up',
      },
      inline: defaultMotions,
      other: {
        motionName: 'zoom-big',
      },
    };

    const menuPrefixCls = getPrefixCls('menu', prefixCls);
    const menuClassName = classNames(
      `${menuPrefixCls}-${theme}`,
      {
        [`${menuPrefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
      },
      className
    );

    const contextValue: MenuContextProps = {
      inlineCollapsed: this.getInlineCollapsed() || false,
      antdMenuTheme: theme,
      direction,
    };

    const clonedExpandIcon = expandIcon
      ? cloneElement(expandIcon, {
          className: `${menuPrefixCls}-submenu-expand-icon`,
        })
      : undefined;

    return (
      <MenuContext.Provider value={contextValue}>
        <RcMenu
          getPopupContainer={getPopupContainer}
          {...restProps}
          className={menuClassName}
          prefixCls={menuPrefixCls}
          direction={direction}
          defaultMotions={defaultMotionsConfig}
          expandIcon={clonedExpandIcon}
        />
      </MenuContext.Provider>
    );
  };

  render(): ReactElement {
    return <ConfigConsumer>{this.renderMenu}</ConfigConsumer>;
  }
}

class Menu extends Component<MenuProps> {
  static Divider = Divider;
  static Item = MenuItem;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;

  render(): ReactElement {
    return (
      <SiderContext.Consumer>
        {(siderContext: SiderContextProps) => (
          <InternalMenu {...this.props} {...siderContext} />
        )}
      </SiderContext.Consumer>
    );
  }
}

export default Menu;