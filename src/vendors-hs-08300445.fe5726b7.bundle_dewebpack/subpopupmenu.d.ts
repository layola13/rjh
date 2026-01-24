import { Component, ReactElement, ReactNode, CSSProperties, RefObject } from 'react';
import { KeyCode } from './KeyCode';

/**
 * Store state for managing menu keys
 */
export interface MenuStoreState {
  /** Currently active menu item keys */
  activeKey: Record<string, string | null>;
  /** Currently open submenu keys */
  openKeys: string[];
  /** Currently selected menu item keys */
  selectedKeys: string[];
}

/**
 * Store interface for menu state management
 */
export interface MenuStore {
  /** Get current store state */
  getState(): MenuStoreState;
  /** Update store state */
  setState(state: Partial<MenuStoreState>): void;
}

/**
 * Built-in placement configurations for popup positioning
 */
export interface BuiltinPlacements {
  [placementName: string]: {
    points?: string[];
    offset?: number[];
    overflow?: {
      adjustX?: boolean;
      adjustY?: boolean;
    };
  };
}

/**
 * Motion configuration for animations
 */
export interface Motion {
  motionName?: string;
  motionAppear?: boolean;
  motionEnter?: boolean;
  motionLeave?: boolean;
  onAppearStart?: () => void;
  onEnterStart?: () => void;
  onLeaveStart?: () => void;
}

/**
 * Menu mode type
 */
export type MenuMode = 'vertical' | 'horizontal' | 'inline';

/**
 * Menu theme type
 */
export type MenuTheme = 'light' | 'dark';

/**
 * Submenu trigger action type
 */
export type TriggerSubMenuAction = 'click' | 'hover';

/**
 * Direction type for RTL support
 */
export type Direction = 'ltr' | 'rtl';

/**
 * Menu item hover event data
 */
export interface MenuItemHoverEvent {
  /** Menu item key */
  key: string;
  /** Whether the item is being hovered */
  hover: boolean;
}

/**
 * Menu select/deselect event data
 */
export interface MenuSelectEvent {
  /** Selected menu item key */
  key: string;
  /** Selected keys array */
  selectedKeys: string[];
  /** DOM event */
  domEvent: Event;
}

/**
 * Menu click event data
 */
export interface MenuClickEvent {
  /** Clicked menu item key */
  key: string;
  /** Clicked keys path */
  keyPath: string[];
  /** DOM event */
  domEvent: Event;
}

/**
 * Submenu open change event data
 */
export interface OpenChangeEvent {
  /** Submenu key */
  key: string;
  /** Whether the submenu is open */
  open: boolean;
}

/**
 * Props for SubPopupMenu component
 */
export interface SubPopupMenuProps {
  /** CSS class prefix */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Menu display mode */
  mode?: MenuMode;
  /** Menu nesting level */
  level?: number;
  /** Indentation width for inline mode */
  inlineIndent?: number;
  /** Whether the menu is visible */
  visible?: boolean;
  /** Whether the menu is focusable */
  focusable?: boolean;
  /** Custom styles */
  style?: CSSProperties;
  /** Menu children elements */
  children?: ReactNode;
  /** Event key for the submenu */
  eventKey?: string;
  /** Active menu item key */
  activeKey?: string;
  /** Whether to activate first item by default */
  defaultActiveFirst?: boolean;
  /** Whether multiple items can be selected */
  multiple?: boolean;
  /** Menu store instance */
  store: MenuStore;
  /** Parent menu reference */
  parentMenu?: Component;
  /** ARIA role attribute */
  role?: string;
  /** DOM id attribute */
  id?: string;
  /** Delay before opening submenu (ms) */
  subMenuOpenDelay?: number;
  /** Delay before closing submenu (ms) */
  subMenuCloseDelay?: number;
  /** Whether to force render submenus */
  forceSubMenuRender?: boolean;
  /** Built-in placement configurations */
  builtinPlacements?: BuiltinPlacements;
  /** Motion configuration */
  motion?: Motion;
  /** Menu theme */
  theme?: MenuTheme;
  /** Overflow indicator element */
  overflowedIndicator?: ReactNode;
  /** Text direction */
  direction?: Direction;
  /** Trigger action for opening submenus */
  triggerSubMenuAction?: TriggerSubMenuAction;
  /** Item icon renderer */
  itemIcon?: ReactNode | ((props: any) => ReactNode);
  /** Expand icon renderer */
  expandIcon?: ReactNode | ((props: any) => ReactNode);
  /** Manual ref callback */
  manualRef?: (instance: SubPopupMenu | null) => void;
  
  /** Callback when item is hovered */
  onItemHover?: (event: MenuItemHoverEvent) => void;
  /** Callback when item is deselected */
  onDeselect?: (event: MenuSelectEvent) => void;
  /** Callback when item is selected */
  onSelect?: (event: MenuSelectEvent) => void;
  /** Callback when item is clicked */
  onClick?: (event: MenuClickEvent) => void;
  /** Callback when submenu open state changes */
  onOpenChange?: (event: OpenChangeEvent) => void;
  /** Callback when component is destroyed */
  onDestroy?: (key: string) => void;
  /** Callback for rendering menu items */
  renderMenuItem?: (
    item: ReactElement,
    index: number,
    subMenuKey: string
  ) => ReactElement | null;
}

/**
 * SubPopupMenu component state
 */
export interface SubPopupMenuState {
  /** Currently active menu item key */
  activeKey?: Record<string, string | null>;
}

/**
 * Get the event key prefix for a submenu
 * @param props - SubPopupMenu props
 * @returns Event key prefix
 */
export declare function getEventKey(props: SubPopupMenuProps): string;

/**
 * Get the active key from props and children
 * @param props - SubPopupMenu props
 * @param activeKey - Currently active key
 * @returns Valid active key or null
 */
export declare function getActiveKey(
  props: SubPopupMenuProps,
  activeKey: string | undefined
): string | null;

/**
 * Save a ref to the instance array
 * @param instance - Component instance to save
 */
export declare function saveRef(instance: Component | null): void;

/**
 * SubPopupMenu component for rendering menu items
 * Handles keyboard navigation, hover states, and item selection
 */
export declare class SubPopupMenu extends Component<SubPopupMenuProps, SubPopupMenuState> {
  static defaultProps: Partial<SubPopupMenuProps>;
  
  /** Array of menu item instances */
  instanceArray: Component[];
  
  /**
   * Handle keyboard navigation
   * @param event - Keyboard event
   * @param callback - Optional callback function
   * @returns 1 if handled, undefined otherwise
   */
  onKeyDown(event: KeyboardEvent, callback?: (item: Component) => void): 1 | undefined;
  
  /**
   * Handle menu item hover
   * @param event - Hover event data
   */
  onItemHover(event: MenuItemHoverEvent): void;
  
  /**
   * Handle menu item deselection
   * @param event - Deselect event data
   */
  onDeselect(event: MenuSelectEvent): void;
  
  /**
   * Handle menu item selection
   * @param event - Select event data
   */
  onSelect(event: MenuSelectEvent): void;
  
  /**
   * Handle menu item click
   * @param event - Click event data
   */
  onClick(event: MenuClickEvent): void;
  
  /**
   * Handle submenu open state change
   * @param event - Open change event data
   */
  onOpenChange(event: OpenChangeEvent): void;
  
  /**
   * Handle component destruction
   * @param key - Event key of destroyed component
   */
  onDestroy(key: string): void;
  
  /**
   * Get flattened array of menu item instances
   * @returns Array of component instances
   */
  getFlatInstanceArray(): Component[];
  
  /**
   * Step through menu items by offset
   * @param offset - Step offset (positive or negative)
   * @returns Next valid menu item component or null
   */
  step(offset: number): Component | null;
  
  /**
   * Render a common menu item with shared props
   * @param item - Menu item element
   * @param index - Item index
   * @param extraProps - Additional props to merge
   * @returns Rendered menu item element
   */
  renderCommonMenuItem(
    item: ReactElement,
    index: number,
    extraProps: Record<string, any>
  ): ReactElement;
  
  /**
   * Render a menu item with context
   * @param item - Menu item element
   * @param index - Item index
   * @param subMenuKey - Parent submenu key
   * @returns Rendered menu item element or null
   */
  renderMenuItem(
    item: ReactElement,
    index: number,
    subMenuKey: string
  ): ReactElement | null;
  
  componentDidMount(): void;
  shouldComponentUpdate(nextProps: SubPopupMenuProps): boolean;
  componentDidUpdate(prevProps: SubPopupMenuProps): void;
  render(): ReactElement;
}

/**
 * Connected SubPopupMenu component with Redux store
 */
declare const ConnectedSubPopupMenu: typeof SubPopupMenu;

export default ConnectedSubPopupMenu;
export { SubPopupMenu };