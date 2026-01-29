import React, { Component, ReactNode, CSSProperties } from 'react';
import { create as createStore, Provider } from 'mini-store';
import omit from 'lodash/omit';
import InternalMenu from './InternalMenu';
import { getActiveKey } from './utils';
import { getMotion } from './motionUtil';
import { noop } from './utils/commonUtils';

interface MenuMode {
  mode: 'horizontal' | 'vertical' | 'inline';
}

interface MenuState {
  selectedKeys: string[];
  openKeys: string[];
  activeKey: Record<string, string>;
}

interface SelectEventInfo {
  key: string;
  keyPath: string[];
  item: any;
  domEvent: React.MouseEvent | React.KeyboardEvent;
  selectedKeys: string[];
}

interface OpenEventInfo {
  key: string;
  open: boolean;
}

interface MenuProps {
  className?: string;
  prefixCls?: string;
  style?: CSSProperties;
  mode?: 'horizontal' | 'vertical' | 'inline';
  selectable?: boolean;
  multiple?: boolean;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  activeKey?: string;
  inlineCollapsed?: boolean;
  siderCollapsed?: boolean;
  collapsedWidth?: number | string;
  direction?: 'ltr' | 'rtl';
  subMenuOpenDelay?: number;
  subMenuCloseDelay?: number;
  triggerSubMenuAction?: 'hover' | 'click';
  builtinPlacements?: Record<string, any>;
  overflowedIndicator?: ReactNode;
  defaultMotions?: Record<string, any>;
  openAnimation?: string;
  openTransitionName?: string;
  children?: ReactNode;
  onClick?: (event: SelectEventInfo) => void;
  onSelect?: (event: SelectEventInfo) => void;
  onDeselect?: (event: SelectEventInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
}

interface InternalMenuState {
  switchingModeFromInline: boolean;
  prevProps: MenuProps;
  inlineOpenKeys: string[];
  store: any;
}

class Menu extends Component<MenuProps, InternalMenuState> {
  static defaultProps: Partial<MenuProps> = {
    selectable: true,
    onClick: noop,
    onSelect: noop,
    onOpenChange: noop,
    onDeselect: noop,
    defaultSelectedKeys: [],
    defaultOpenKeys: [],
    subMenuOpenDelay: 0.1,
    subMenuCloseDelay: 0.1,
    triggerSubMenuAction: 'hover',
    prefixCls: 'rc-menu',
    className: '',
    mode: 'vertical',
    style: {},
    builtinPlacements: {},
    overflowedIndicator: React.createElement('span', null, '···'),
  };

  static getDerivedStateFromProps(
    nextProps: MenuProps,
    prevState: InternalMenuState
  ): Partial<InternalMenuState> | null {
    const { prevProps, store, inlineOpenKeys } = prevState;
    const storeState = store.getState();
    const stateUpdate: Partial<InternalMenuState> = {
      prevProps: nextProps,
    };
    const storeUpdate: Partial<MenuState> = {};

    if (prevProps.mode === 'inline' && nextProps.mode !== 'inline') {
      stateUpdate.switchingModeFromInline = true;
    }

    if ('openKeys' in nextProps) {
      storeUpdate.openKeys = nextProps.openKeys || [];
    } else {
      const shouldCollapse =
        (nextProps.inlineCollapsed && !prevProps.inlineCollapsed) ||
        (nextProps.siderCollapsed && !prevProps.siderCollapsed);
      const shouldExpand =
        (!nextProps.inlineCollapsed && prevProps.inlineCollapsed) ||
        (!nextProps.siderCollapsed && prevProps.siderCollapsed);

      if (shouldCollapse) {
        stateUpdate.switchingModeFromInline = true;
        stateUpdate.inlineOpenKeys = storeState.openKeys;
        storeUpdate.openKeys = [];
      }

      if (shouldExpand) {
        storeUpdate.openKeys = inlineOpenKeys;
        stateUpdate.inlineOpenKeys = [];
      }
    }

    if (Object.keys(storeUpdate).length > 0) {
      store.setState(storeUpdate);
    }

    return Object.keys(stateUpdate).length > 0 ? stateUpdate : null;
  }

  isRootMenu: boolean = true;
  store: any;
  innerMenu: any;
  prevOpenKeys: string[] | null = null;

  constructor(props: MenuProps) {
    super(props);

    let selectedKeys = props.defaultSelectedKeys || [];
    let openKeys = props.defaultOpenKeys || [];

    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }

    if ('openKeys' in props) {
      openKeys = props.openKeys || [];
    }

    this.store = createStore({
      selectedKeys,
      openKeys,
      activeKey: {
        '0-menu-': getActiveKey(props, props.activeKey),
      },
    });

    this.state = {
      switchingModeFromInline: false,
      prevProps: props,
      inlineOpenKeys: [],
      store: this.store,
    };
  }

  componentDidMount(): void {
    this.updateMiniStore();
    this.updateMenuDisplay();
  }

  componentDidUpdate(prevProps: MenuProps): void {
    const { siderCollapsed, inlineCollapsed, onOpenChange } = this.props;

    const shouldCloseMenu =
      (!prevProps.inlineCollapsed && inlineCollapsed) ||
      (!prevProps.siderCollapsed && siderCollapsed);

    if (shouldCloseMenu && onOpenChange) {
      onOpenChange([]);
    }

    this.updateMiniStore();
    this.updateMenuDisplay();
  }

  onSelect = (event: SelectEventInfo): void => {
    const { props } = this;
    if (!props.selectable) {
      return;
    }

    let selectedKeys = this.store.getState().selectedKeys;
    const key = event.key;

    selectedKeys = props.multiple ? selectedKeys.concat([key]) : [key];

    if (!('selectedKeys' in props)) {
      this.store.setState({ selectedKeys });
    }

    props.onSelect?.({
      ...event,
      selectedKeys,
    });
  };

  onClick = (event: SelectEventInfo): void => {
    const mode = this.getRealMenuMode();
    const { store, props } = this;
    const { onOpenChange } = props;

    if (mode === 'inline' || 'openKeys' in this.props) {
      // Do nothing
    } else {
      store.setState({ openKeys: [] });
      onOpenChange?.([]);
    }

    props.onClick?.(event);
  };

  onKeyDown = (event: React.KeyboardEvent, callback: () => void): void => {
    this.innerMenu.getWrappedInstance().onKeyDown(event, callback);
  };

  onOpenChange = (event: OpenEventInfo | OpenEventInfo[]): void => {
    const { props } = this;
    const openKeys = this.store.getState().openKeys.concat();
    let changed = false;

    const processEvent = (item: OpenEventInfo): void => {
      let hasChanged = false;
      if (item.open) {
        hasChanged = openKeys.indexOf(item.key) === -1;
        if (hasChanged) {
          openKeys.push(item.key);
        }
      } else {
        const index = openKeys.indexOf(item.key);
        hasChanged = index !== -1;
        if (hasChanged) {
          openKeys.splice(index, 1);
        }
      }
      changed = changed || hasChanged;
    };

    if (Array.isArray(event)) {
      event.forEach(processEvent);
    } else {
      processEvent(event);
    }

    if (changed) {
      if (!('openKeys' in this.props)) {
        this.store.setState({ openKeys });
      }
      props.onOpenChange?.(openKeys);
    }
  };

  onDeselect = (event: SelectEventInfo): void => {
    const { props } = this;
    if (!props.selectable) {
      return;
    }

    const selectedKeys = this.store.getState().selectedKeys.concat();
    const key = event.key;
    const index = selectedKeys.indexOf(key);

    if (index !== -1) {
      selectedKeys.splice(index, 1);
    }

    if (!('selectedKeys' in props)) {
      this.store.setState({ selectedKeys });
    }

    props.onDeselect?.({
      ...event,
      selectedKeys,
    });
  };

  onMouseEnter = (event: React.MouseEvent): void => {
    this.restoreModeVerticalFromInline();
    const { onMouseEnter } = this.props;
    onMouseEnter?.(event);
  };

  onTransitionEnd = (event: React.TransitionEvent): void => {
    const isWidthTransition =
      event.propertyName === 'width' && event.target === event.currentTarget;

    const targetClassName = (event.target as HTMLElement).className;
    const className =
      Object.prototype.toString.call(targetClassName) === '[object SVGAnimatedString]'
        ? (targetClassName as any).animVal
        : targetClassName;

    const isIconTransition =
      event.propertyName === 'font-size' && className.indexOf('anticon') >= 0;

    if (isWidthTransition || isIconTransition) {
      this.restoreModeVerticalFromInline();
    }
  };

  setInnerMenu = (node: any): void => {
    this.innerMenu = node;
  };

  updateMiniStore(): void {
    if ('selectedKeys' in this.props) {
      this.store.setState({
        selectedKeys: this.props.selectedKeys || [],
      });
    }

    if ('openKeys' in this.props) {
      this.store.setState({
        openKeys: this.props.openKeys || [],
      });
    }
  }

  updateMenuDisplay(): void {
    const { collapsedWidth } = this.props;
    const { store, prevOpenKeys } = this;
    const isCollapsed = this.getInlineCollapsed();

    if (isCollapsed && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')) {
      this.prevOpenKeys = store.getState().openKeys.concat();
      this.store.setState({ openKeys: [] });
    } else if (prevOpenKeys) {
      this.store.setState({ openKeys: prevOpenKeys });
      this.prevOpenKeys = null;
    }
  }

  getRealMenuMode(): 'horizontal' | 'vertical' | 'inline' {
    const { mode } = this.props;
    const { switchingModeFromInline } = this.state;
    const inlineCollapsed = this.getInlineCollapsed();

    if (switchingModeFromInline && inlineCollapsed) {
      return 'inline';
    }

    return inlineCollapsed ? 'vertical' : mode || 'vertical';
  }

  getInlineCollapsed(): boolean {
    const { inlineCollapsed, siderCollapsed } = this.props;
    return siderCollapsed !== undefined ? siderCollapsed : inlineCollapsed || false;
  }

  restoreModeVerticalFromInline(): void {
    if (this.state.switchingModeFromInline) {
      this.setState({
        switchingModeFromInline: false,
      });
    }
  }

  render(): ReactNode {
    const menuProps = {
      ...omit(this.props, ['collapsedWidth', 'siderCollapsed', 'defaultMotions']),
    };

    const mode = this.getRealMenuMode();
    let { className = '' } = menuProps;

    className += ` ${menuProps.prefixCls}-root`;

    if (menuProps.direction === 'rtl') {
      className += ` ${menuProps.prefixCls}-rtl`;
    }

    const finalProps = {
      ...menuProps,
      mode,
      className,
      onClick: this.onClick,
      onOpenChange: this.onOpenChange,
      onDeselect: this.onDeselect,
      onSelect: this.onSelect,
      onMouseEnter: this.onMouseEnter,
      onTransitionEnd: this.onTransitionEnd,
      parentMenu: this,
      motion: getMotion(this.props, this.state, mode),
    };

    delete (finalProps as any).openAnimation;
    delete (finalProps as any).openTransitionName;

    return React.createElement(
      Provider,
      { store: this.store },
      React.createElement(
        InternalMenu,
        { ...finalProps, ref: this.setInnerMenu },
        this.props.children
      )
    );
  }
}

export default Menu;