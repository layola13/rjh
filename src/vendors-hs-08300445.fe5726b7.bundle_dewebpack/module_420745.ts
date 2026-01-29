import React, { Component, ReactNode } from 'react';

interface MenuItemData {
  key: string;
  [key: string]: unknown;
}

interface MenuItemGroupProps {
  className?: string;
  rootPrefixCls: string;
  title: ReactNode;
  children: ReactNode;
  renderMenuItem: (item: ReactNode, index: number, subMenuKey?: string) => ReactNode;
  index: number;
  subMenuKey?: string;
  disabled?: boolean;
  direction?: string;
  [key: string]: unknown;
}

const MENU_ALL_PROPS: string[] = [
  'eventKey',
  'openKeys',
  'selectedKeys',
  'triggerSubMenuAction',
  'subMenuOpenDelay',
  'subMenuCloseDelay',
  'forceSubMenuRender',
  'defaultOpenKeys',
  'defaultSelectedKeys',
  'onOpenChange',
  'onSelect',
  'onDeselect',
  'mode',
  'multiple',
  'inlineIndent',
  'inlineCollapsed',
  'isRootMenu',
  'overflowedIndicator',
];

class MenuItemGroup extends Component<MenuItemGroupProps> {
  static isMenuItemGroup = true;
  
  static defaultProps = {
    disabled: true,
  };

  renderInnerMenuItem = (item: ReactNode): ReactNode => {
    const { renderMenuItem, index, subMenuKey } = this.props;
    return renderMenuItem(item, index, subMenuKey);
  };

  render(): ReactNode {
    const props = { ...this.props };
    const {
      className = '',
      rootPrefixCls,
      title,
      children,
    } = props;

    const titleClassName = `${rootPrefixCls}-item-group-title`;
    const listClassName = `${rootPrefixCls}-item-group-list`;

    MENU_ALL_PROPS.forEach((propName) => {
      delete props[propName];
    });
    delete props.direction;

    return (
      <li
        {...props}
        onClick={(e) => e.stopPropagation()}
        className={`${className} ${rootPrefixCls}-item-group`}
      >
        <div
          className={titleClassName}
          title={typeof title === 'string' ? title : undefined}
        >
          {title}
        </div>
        <ul className={listClassName}>
          {React.Children.map(children, this.renderInnerMenuItem)}
        </ul>
      </li>
    );
  }
}

export default MenuItemGroup;