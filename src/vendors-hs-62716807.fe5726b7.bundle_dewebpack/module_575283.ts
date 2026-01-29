import * as React from 'react';
import { Item as MenuItem } from 'rc-menu';
import Tooltip from '../tooltip';
import classNames from 'classnames';
import { SiderContext } from '../layout/Sider';
import { cloneElement, isValidElement } from '../_util/reactNode';

interface MenuItemProps {
  level?: number;
  className?: string;
  children?: React.ReactNode;
  rootPrefixCls?: string;
  title?: React.ReactNode | false;
  icon?: React.ReactNode;
  danger?: boolean;
  [key: string]: unknown;
}

interface MenuContextValue {
  inlineCollapsed?: boolean;
  direction?: 'ltr' | 'rtl';
}

interface SiderContextValue {
  siderCollapsed?: boolean;
}

interface InternalMenuItemComponent extends React.Component<MenuItemProps> {
  renderItem: (context: SiderContextValue) => React.ReactElement;
  renderItemChildren: (inlineCollapsed?: boolean) => React.ReactNode;
}

const omitProps = (
  obj: Record<string, unknown>,
  keysToOmit: string[]
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keysToOmit.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (obj != null && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        keysToOmit.indexOf(symbol as unknown as string) < 0 &&
        Object.prototype.propertyIsEnumerable.call(obj, symbol)
      ) {
        result[symbol as unknown as string] = obj[symbol as unknown as string];
      }
    }
  }
  
  return result;
};

class InternalMenuItem extends React.Component<MenuItemProps> implements InternalMenuItemComponent {
  static isMenuItem = true;

  renderItem = (siderContext: SiderContextValue): React.ReactElement => {
    const { siderCollapsed } = siderContext;
    const { level, className, children, rootPrefixCls } = this.props;
    const { title, icon, danger, ...restProps } = this.props;
    const propsWithoutTitleIconDanger = omitProps(restProps, ['title', 'icon', 'danger']);

    return (
      <MenuContext.Consumer>
        {(menuContext: MenuContextValue) => {
          const { inlineCollapsed, direction } = menuContext;
          
          let displayTitle: React.ReactNode = title;
          if (title === undefined) {
            displayTitle = level === 1 ? children : '';
          } else if (title === false) {
            displayTitle = '';
          }

          const tooltipProps: {
            title: React.ReactNode;
            visible?: boolean;
          } = {
            title: displayTitle,
          };

          if (!siderCollapsed && !inlineCollapsed) {
            tooltipProps.title = null;
            tooltipProps.visible = false;
          }

          const childrenCount = React.Children.count(children);
          const itemClassName = classNames(
            {
              [`${rootPrefixCls}-item-danger`]: danger,
              [`${rootPrefixCls}-item-only-child`]: (icon ? childrenCount + 1 : childrenCount) === 1,
            },
            className
          );

          return (
            <Tooltip
              {...tooltipProps}
              placement={direction === 'rtl' ? 'left' : 'right'}
              overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
            >
              <MenuItem
                {...propsWithoutTitleIconDanger}
                className={itemClassName}
                title={title as string}
              >
                {cloneElement(icon, {
                  className: classNames(
                    isValidElement(icon) ? icon.props?.className : '',
                    `${rootPrefixCls}-item-icon`
                  ),
                })}
                {this.renderItemChildren(inlineCollapsed)}
              </MenuItem>
            </Tooltip>
          );
        }}
      </MenuContext.Consumer>
    );
  };

  renderItemChildren(inlineCollapsed?: boolean): React.ReactNode {
    const { icon, children, level, rootPrefixCls } = this.props;

    if (!icon || (isValidElement(children) && children.type === 'span')) {
      if (children && inlineCollapsed && level === 1 && typeof children === 'string') {
        return (
          <div className={`${rootPrefixCls}-inline-collapsed-noicon`}>
            {children.charAt(0)}
          </div>
        );
      }
      return children;
    }

    return <span>{children}</span>;
  }

  render(): React.ReactElement {
    return <SiderContext.Consumer>{this.renderItem}</SiderContext.Consumer>;
  }
}

// MenuContext placeholder (should be imported from actual context file)
const MenuContext = React.createContext<MenuContextValue>({});

export default InternalMenuItem;