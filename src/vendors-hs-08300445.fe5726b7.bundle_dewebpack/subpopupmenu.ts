import React, { Component, ReactElement, CSSProperties, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import {
  menuAllProps,
  loopMenuItem,
  getKeyFromChildrenIndex,
  isMobileDevice,
  noop,
} from './utils';
import type { Store, StoreState } from './types';

interface ActiveKeyMap {
  [key: string]: string | null;
}

interface SubPopupMenuProps {
  prefixCls?: string;
  className?: string;
  mode?: 'vertical' | 'horizontal' | 'inline';
  level?: number;
  inlineIndent?: number;
  visible?: boolean;
  focusable?: boolean;
  style?: CSSProperties;
  role?: string;
  id?: string;
  eventKey?: string;
  activeKey?: string;
  defaultActiveFirst?: boolean;
  multiple?: boolean;
  motion?: object;
  subMenuOpenDelay?: number;
  subMenuCloseDelay?: number;
  forceSubMenuRender?: boolean;
  triggerSubMenuAction?: string;
  builtinPlacements?: object;
  itemIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  overflowedIndicator?: React.ReactNode;
  theme?: string;
  direction?: 'ltr' | 'rtl';
  parentMenu?: unknown;
  store: Store;
  children?: React.ReactNode;
  manualRef?: (instance: SubPopupMenu | null) => void;
  onKeyDown?: (event: KeyboardEvent, callback?: (item: unknown) => void) => void;
  onDeselect?: (selectInfo: unknown) => void;
  onSelect?: (selectInfo: unknown) => void;
  onClick?: (eventInfo: unknown) => void;
  onOpenChange?: (openInfo: unknown) => void;
  onDestroy?: (key: string) => void;
}

interface MenuItem {
  props: {
    eventKey?: string;
    disabled?: boolean;
    active?: boolean;
    mode?: string;
    itemIcon?: React.ReactNode;
    expandIcon?: React.ReactNode;
    onClick?: (e: unknown) => void;
  };
  onKeyDown?: (event: KeyboardEvent) => number | void;
  ref?: React.Ref<unknown>;
  type?: string;
}

function updateActiveKey(
  component: { props: SubPopupMenuProps },
  subMenuKey: string,
  activeKey: string | null
): void {
  const state = component.props.store.getState();
  component.props.store.setState({
    activeKey: {
      ...state.activeKey,
      [subMenuKey]: activeKey,
    },
  });
}

function getEventKey(props: SubPopupMenuProps): string {
  return props.eventKey || '0-menu-';
}

export function getActiveKey(
  props: SubPopupMenuProps,
  originalActiveKey?: string
): string | null {
  let activeKey: string | null = originalActiveKey ?? null;
  const { children, eventKey, defaultActiveFirst } = props;

  if (activeKey) {
    let foundActiveKey = false;
    loopMenuItem(children, (child: MenuItem, index: number) => {
      if (
        child &&
        child.props &&
        !child.props.disabled &&
        activeKey === getKeyFromChildrenIndex(child, eventKey, index)
      ) {
        foundActiveKey = true;
      }
    });

    if (foundActiveKey) {
      return activeKey;
    }
  }

  activeKey = null;

  if (defaultActiveFirst) {
    loopMenuItem(children, (child: MenuItem, index: number) => {
      if (!activeKey && child && !child.props.disabled) {
        activeKey = getKeyFromChildrenIndex(child, eventKey, index);
      }
    });
    return activeKey;
  }

  return activeKey;
}

export function saveRef(this: SubPopupMenu, instance: MenuItem | null): void {
  if (instance) {
    const index = this.instanceArray.indexOf(instance);
    if (index !== -1) {
      this.instanceArray[index] = instance;
    } else {
      this.instanceArray.push(instance);
    }
  }
}

export class SubPopupMenu extends Component<SubPopupMenuProps> {
  static defaultProps: Partial<SubPopupMenuProps> = {
    prefixCls: 'rc-menu',
    className: '',
    mode: 'vertical',
    level: 1,
    inlineIndent: 24,
    visible: true,
    focusable: true,
    style: {},
    manualRef: noop,
  };

  private instanceArray: MenuItem[] = [];

  constructor(props: SubPopupMenuProps) {
    super(props);

    props.store.setState({
      activeKey: {
        ...props.store.getState().activeKey,
        [props.eventKey || '0-menu-']: getActiveKey(props, props.activeKey),
      },
    });

    this.instanceArray = [];
  }

  componentDidMount(): void {
    if (this.props.manualRef) {
      this.props.manualRef(this);
    }
  }

  shouldComponentUpdate(nextProps: SubPopupMenuProps): boolean {
    return (
      this.props.visible ||
      nextProps.visible ||
      this.props.className !== nextProps.className ||
      !shallowEqual(this.props.style, nextProps.style)
    );
  }

  componentDidUpdate(prevProps: SubPopupMenuProps): void {
    const { props } = this;
    const currentActiveKey =
      'activeKey' in props
        ? props.activeKey
        : props.store.getState().activeKey[getEventKey(props)];

    const validActiveKey = getActiveKey(props, currentActiveKey);

    if (validActiveKey !== currentActiveKey) {
      updateActiveKey(this, getEventKey(props), validActiveKey);
    } else if ('activeKey' in prevProps) {
      const prevValidActiveKey = getActiveKey(prevProps, prevProps.activeKey);
      if (validActiveKey !== prevValidActiveKey) {
        updateActiveKey(this, getEventKey(props), validActiveKey);
      }
    }
  }

  onKeyDown = (event: KeyboardEvent, callback?: (item: MenuItem) => void): number | void => {
    const keyCode = event.keyCode;
    let handled: number | void;

    this.getFlatInstanceArray().forEach((instance) => {
      if (instance?.props.active && instance.onKeyDown) {
        handled = instance.onKeyDown(event);
      }
    });

    if (handled) {
      return 1;
    }

    let activeItem: MenuItem | null = null;

    if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      activeItem = this.step(keyCode === KeyCode.UP ? -1 : 1);
    }

    if (activeItem) {
      event.preventDefault();
      updateActiveKey(this.props, getEventKey(this.props), activeItem.props.eventKey ?? null);
      if (typeof callback === 'function') {
        callback(activeItem);
      }
      return 1;
    }
  };

  onItemHover = (hoverInfo: { key: string; hover: boolean }): void => {
    const { key, hover } = hoverInfo;
    updateActiveKey(this.props, getEventKey(this.props), hover ? key : null);
  };

  onDeselect = (selectInfo: unknown): void => {
    this.props.onDeselect?.(selectInfo);
  };

  onSelect = (selectInfo: unknown): void => {
    this.props.onSelect?.(selectInfo);
  };

  onClick = (eventInfo: unknown): void => {
    this.props.onClick?.(eventInfo);
  };

  onOpenChange = (openInfo: unknown): void => {
    this.props.onOpenChange?.(openInfo);
  };

  onDestroy = (key: string): void => {
    this.props.onDestroy?.(key);
  };

  getFlatInstanceArray = (): MenuItem[] => {
    return this.instanceArray;
  };

  step = (direction: number): MenuItem | null => {
    const instanceArray = this.getFlatInstanceArray();
    const currentActiveKey = this.props.store.getState().activeKey[getEventKey(this.props)];
    const arrayLength = instanceArray.length;

    if (!arrayLength) {
      return null;
    }

    let items = direction < 0 ? [...instanceArray].reverse() : instanceArray;
    let currentIndex = -1;

    items.every((item, index) => {
      if (!item || item.props.eventKey !== currentActiveKey) {
        return true;
      }
      currentIndex = index;
      return false;
    });

    if (
      !this.props.defaultActiveFirst &&
      currentIndex !== -1 &&
      items.slice(currentIndex, arrayLength - 1).length &&
      !items.slice(currentIndex, arrayLength - 1).every((item) => !!item.props.disabled)
    ) {
      const startIndex = (currentIndex + 1) % arrayLength;
      let checkIndex = startIndex;

      do {
        const candidate = items[checkIndex];
        if (candidate && !candidate.props.disabled) {
          return candidate;
        }
        checkIndex = (checkIndex + 1) % arrayLength;
      } while (checkIndex !== startIndex);

      return null;
    }

    return null;
  };

  renderCommonMenuItem = (
    child: ReactElement,
    index: number,
    extraProps: object
  ): ReactElement => {
    const state = this.props.store.getState();
    const props = this.props;
    const key = getKeyFromChildrenIndex(child, props.eventKey, index);
    const childProps = child.props;

    if (!childProps || typeof child.type === 'string') {
      return child;
    }

    const isActive = key === state.activeKey;

    const commonProps = {
      mode: childProps.mode || props.mode,
      level: props.level,
      inlineIndent: props.inlineIndent,
      renderMenuItem: this.renderMenuItem,
      rootPrefixCls: props.prefixCls,
      index,
      parentMenu: props.parentMenu,
      manualRef: childProps.disabled ? undefined : saveRef.bind(this),
      eventKey: key,
      active: !childProps.disabled && isActive,
      multiple: props.multiple,
      onClick: (e: unknown) => {
        childProps.onClick?.(e);
        this.onClick(e);
      },
      onItemHover: this.onItemHover,
      motion: props.motion,
      subMenuOpenDelay: props.subMenuOpenDelay,
      subMenuCloseDelay: props.subMenuCloseDelay,
      forceSubMenuRender: props.forceSubMenuRender,
      onOpenChange: this.onOpenChange,
      onDeselect: this.onDeselect,
      onSelect: this.onSelect,
      builtinPlacements: props.builtinPlacements,
      itemIcon: childProps.itemIcon || this.props.itemIcon,
      expandIcon: childProps.expandIcon || this.props.expandIcon,
      ...extraProps,
      direction: props.direction,
    };

    if (props.mode === 'inline' || isMobileDevice()) {
      commonProps.triggerSubMenuAction = 'click';
    }

    return React.cloneElement(child, {
      ...commonProps,
      key: key || index,
    });
  };

  renderMenuItem = (
    child: ReactElement,
    index: number,
    subMenuKey: string
  ): ReactElement | null => {
    if (!child) {
      return null;
    }

    const state = this.props.store.getState();
    const extraProps = {
      openKeys: state.openKeys,
      selectedKeys: state.selectedKeys,
      triggerSubMenuAction: this.props.triggerSubMenuAction,
      subMenuKey,
    };

    return this.renderCommonMenuItem(child, index, extraProps);
  };

  render(): ReactElement {
    const props = { ...this.props };
    this.instanceArray = [];

    const domProps: Record<string, unknown> = {
      className: classNames(props.prefixCls, props.className, `${props.prefixCls}-${props.mode}`),
      role: props.role || 'menu',
    };

    if (props.id) {
      domProps.id = props.id;
    }

    if (props.focusable) {
      domProps.tabIndex = 0;
      domProps.onKeyDown = this.onKeyDown;
    }

    const {
      prefixCls,
      eventKey,
      visible,
      level,
      mode,
      overflowedIndicator,
      theme,
    } = props;

    menuAllProps.forEach((prop) => delete props[prop]);
    delete props.onClick;

    return React.createElement(
      'ul',
      {
        ...props,
        ...domProps,
      },
      React.Children.map(props.children, (child, index) =>
        this.renderMenuItem(child as ReactElement, index, eventKey || '0-menu-')
      )
    );
  }
}

function shallowEqual(objA: unknown, objB: unknown): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export default connect()(SubPopupMenu);