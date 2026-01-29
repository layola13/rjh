import React, { Component, Fragment, ReactElement, ReactNode, isValidElement } from 'react';
import { SubMenu as AntdSubMenu } from 'antd';
import classNames from 'classnames';
import MenuContext from './MenuContext';

interface SubMenuProps {
  icon?: ReactNode;
  title?: ReactNode;
  level?: number;
  rootPrefixCls?: string;
  popupClassName?: string;
  [key: string]: any;
}

interface MenuContextValue {
  inlineCollapsed?: boolean;
  antdMenuTheme?: string;
}

function omit<T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

class SubMenu extends Component<SubMenuProps> {
  static contextType = MenuContext;
  static isSubMenu = 1;

  context!: MenuContextValue;

  private renderTitle(inlineCollapsed?: boolean): ReactNode {
    const { icon, title, level, rootPrefixCls } = this.props;

    if (!icon) {
      if (inlineCollapsed && level === 1 && title && typeof title === 'string') {
        return (
          <div className={`${rootPrefixCls}-inline-collapsed-noicon`}>
            {title.charAt(0)}
          </div>
        );
      }
      return title;
    }

    const isSpanTitle = isValidElement(title) && title.type === 'span';

    return (
      <Fragment>
        {icon}
        {isSpanTitle ? title : <span>{title}</span>}
      </Fragment>
    );
  }

  render(): ReactNode {
    const { rootPrefixCls, popupClassName } = this.props;

    return (
      <MenuContext.Consumer>
        {(contextValue: MenuContextValue) => {
          const { inlineCollapsed, antdMenuTheme } = contextValue;

          return (
            <AntdSubMenu
              {...omit(this.props, ['icon'])}
              title={this.renderTitle(inlineCollapsed)}
              popupClassName={classNames(
                rootPrefixCls,
                `${rootPrefixCls}-${antdMenuTheme}`,
                popupClassName
              )}
            />
          );
        }}
      </MenuContext.Consumer>
    );
  }
}

export default SubMenu;