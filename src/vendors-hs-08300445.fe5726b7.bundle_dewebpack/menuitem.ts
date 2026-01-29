import React, { Component, ReactNode, CSSProperties, RefObject } from 'react';
import KeyCode from './KeyCode';
import { connect } from './connect';
import { omit } from './utils';

interface MenuItemProps {
  eventKey: string;
  subMenuKey?: string;
  className?: string;
  rootPrefixCls?: string;
  disabled?: boolean;
  title?: string | ReactNode;
  level?: number;
  inlineIndent?: number;
  mode?: 'inline' | 'vertical' | 'horizontal';
  direction?: 'ltr' | 'rtl';
  multiple?: boolean;
  active?: boolean;
  isSelected?: boolean;
  role?: string;
  style?: CSSProperties;
  attribute?: Record<string, unknown>;
  itemIcon?: ReactNode | ((props: MenuItemProps) => ReactNode);
  children?: ReactNode;
  onSelect?: (info: SelectInfo) => void;
  onDeselect?: (info: SelectInfo) => void;
  onClick?: (info: SelectInfo) => void;
  onItemHover?: (info: HoverInfo) => void;
  onMouseEnter?: (info: MouseEventInfo) => void;
  onMouseLeave?: (info: MouseEventInfo) => void;
  onDestroy?: (eventKey: string) => void;
  manualRef?: (instance: MenuItem) => void;
}

interface SelectInfo {
  key: string;
  keyPath: string[];
  item: MenuItem;
  domEvent: React.MouseEvent | React.KeyboardEvent;
}

interface HoverInfo {
  key: string;
  hover: boolean;
}

interface MouseEventInfo {
  key: string;
  domEvent: React.MouseEvent;
}

interface ConnectedState {
  activeKey: Record<string, string>;
  selectedKeys: string[] | string;
}

const MENU_ALL_PROPS = [
  'eventKey',
  'subMenuKey',
  'rootPrefixCls',
  'disabled',
  'level',
  'inlineIndent',
  'mode',
  'multiple',
  'active',
  'isSelected',
  'onSelect',
  'onDeselect',
  'onItemHover',
  'onDestroy',
  'manualRef',
  'itemIcon'
];

const noop = (): void => {};

export class MenuItem extends Component<MenuItemProps> {
  static readonly isMenuItem = true;

  static readonly defaultProps: Partial<MenuItemProps> = {
    onSelect: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    manualRef: noop
  };

  private node: HTMLLIElement | null = null;

  componentDidMount(): void {
    this.callRef();
  }

  componentDidUpdate(): void {
    this.callRef();
  }

  componentWillUnmount(): void {
    const { onDestroy, eventKey } = this.props;
    onDestroy?.(eventKey);
  }

  private getPrefixCls(): string {
    return `${this.props.rootPrefixCls}-item`;
  }

  private getActiveClassName(): string {
    return `${this.getPrefixCls()}-active`;
  }

  private getSelectedClassName(): string {
    return `${this.getPrefixCls()}-selected`;
  }

  private getDisabledClassName(): string {
    return `${this.getPrefixCls()}-disabled`;
  }

  private callRef(): void {
    this.props.manualRef?.(this);
  }

  private onKeyDown = (event: React.KeyboardEvent): boolean => {
    if (event.keyCode === KeyCode.ENTER) {
      this.onClick(event as unknown as React.MouseEvent);
      return true;
    }
    return false;
  };

  private onMouseLeave = (event: React.MouseEvent): void => {
    const { eventKey, onItemHover, onMouseLeave } = this.props;
    onItemHover?.({ key: eventKey, hover: false });
    onMouseLeave?.({ key: eventKey, domEvent: event });
  };

  private onMouseEnter = (event: React.MouseEvent): void => {
    const { eventKey, onItemHover, onMouseEnter } = this.props;
    onItemHover?.({ key: eventKey, hover: true });
    onMouseEnter?.({ key: eventKey, domEvent: event });
  };

  private onClick = (event: React.MouseEvent | React.KeyboardEvent): void => {
    const {
      eventKey,
      multiple,
      onClick,
      onSelect,
      onDeselect,
      isSelected
    } = this.props;

    const info: SelectInfo = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: event as React.MouseEvent
    };

    onClick?.(info);

    if (multiple) {
      isSelected ? onDeselect?.(info) : onSelect?.(info);
    } else if (!isSelected) {
      onSelect?.(info);
    }
  };

  private saveNode = (node: HTMLLIElement | null): void => {
    this.node = node;
  };

  render(): JSX.Element {
    const props = { ...this.props };
    const prefixCls = this.getPrefixCls();
    
    const classNames = [
      prefixCls,
      props.className,
      !props.disabled && props.active ? this.getActiveClassName() : null,
      props.isSelected ? this.getSelectedClassName() : null,
      props.disabled ? this.getDisabledClassName() : null
    ].filter(Boolean).join(' ');

    let attributes: Record<string, unknown> = {
      ...props.attribute,
      title: typeof props.title === 'string' ? props.title : undefined,
      className: classNames,
      role: props.role || 'menuitem',
      'aria-disabled': props.disabled
    };

    if (props.role === 'option') {
      attributes = {
        ...attributes,
        role: 'option',
        'aria-selected': props.isSelected
      };
    } else if (props.role === null || props.role === 'none') {
      attributes.role = 'none';
    }

    const eventHandlers = {
      onClick: props.disabled ? null : this.onClick,
      onMouseLeave: props.disabled ? null : this.onMouseLeave,
      onMouseEnter: props.disabled ? null : this.onMouseEnter
    };

    const style: CSSProperties = { ...props.style };
    if (props.mode === 'inline') {
      const indentValue = (props.inlineIndent ?? 24) * (props.level ?? 1);
      if (props.direction === 'rtl') {
        style.paddingRight = indentValue;
      } else {
        style.paddingLeft = indentValue;
      }
    }

    const cleanedProps = omit(props, [
      ...MENU_ALL_PROPS,
      'onClick',
      'onMouseEnter',
      'onMouseLeave',
      'onSelect',
      'direction'
    ]);

    let itemIcon = this.props.itemIcon;
    if (typeof this.props.itemIcon === 'function') {
      itemIcon = React.createElement(this.props.itemIcon as React.ComponentType<MenuItemProps>, this.props);
    }

    return (
      <li
        {...cleanedProps}
        {...attributes}
        {...eventHandlers}
        style={style}
        ref={this.saveNode}
      >
        {props.children}
        {itemIcon}
      </li>
    );
  }
}

export default connect<MenuItemProps, ConnectedState>(
  (state: ConnectedState, ownProps: MenuItemProps) => {
    const { activeKey, selectedKeys } = state;
    const { eventKey, subMenuKey } = ownProps;

    return {
      active: subMenuKey ? activeKey[subMenuKey] === eventKey : false,
      isSelected: Array.isArray(selectedKeys)
        ? selectedKeys.indexOf(eventKey) !== -1
        : selectedKeys === eventKey
    };
  }
)(MenuItem);