/**
 * Left menu component module for icon-based context menus
 * Provides tooltip, icon font support, and dynamic menu positioning
 */

// ============================================================================
// Enums & Constants
// ============================================================================

/**
 * Menu item types
 */
export enum LEFTITEM_TYPE {
  /** Horizontal divider line */
  Divider = "divider",
  /** Group divider with spacing */
  GroupDivider = "groupDivider"
}

/**
 * Default number of visible menu items before showing extend button
 */
export const DEFAULT_SHOW_ITEM_COUNT = 8;

/**
 * Default delay (ms) before hiding extend bar on mouse leave
 */
export const DEFAULT_EXTENDBAR_DELAY = 3000;

/**
 * Maximum number of sub-items displayed in submenu
 */
export const DEFAULT_MAX_SUB_ITEM_COUNT = 8;

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Position configuration for menu placement
 */
export interface MenuPosition {
  /** Left offset in pixels */
  left?: number | string;
  /** Top offset in pixels */
  top?: number | string;
  /** Right offset in pixels */
  right?: number | string;
  /** Bottom offset in pixels */
  bottom?: number | string;
  /** X coordinate (alias for left) */
  x?: number;
  /** Y coordinate (alias for top) */
  y?: number;
  /** CSS transform string */
  transform?: string;
}

/**
 * Menu item benefit configuration
 */
export interface MenuItemBenefit {
  /** Amount of free trial benefits remaining */
  getBenefitAmount?: () => number;
  /** Handler to show market/pricing modal */
  showMarketModal?: () => void;
}

/**
 * Custom submenu component configuration
 */
export interface CustomSubmenuItem {
  /** React component type for custom submenu */
  childrenType: React.ComponentType<any>;
  /** Props passed to custom component */
  props: Record<string, unknown> & {
    /** Submit handler */
    onSubmit: (data: unknown) => void;
    /** Close handler */
    onClose?: () => void;
  };
}

/**
 * Menu item definition
 */
export interface LeftMenuItem extends MenuItemBenefit {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon identifier from icon font */
  src?: string;
  /** Custom icon render function */
  iconDomFunc?: (className: string) => React.ReactNode;
  /** Tooltip text shown on hover */
  tooltip?: string;
  /** Dynamic mouse-following tooltip */
  mouseTips?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  /** State reducer for item updates after click */
  stateReducer?: (item: LeftMenuItem) => LeftMenuItem;
  /** Whether item is disabled (greyed out) */
  disable?: boolean;
  /** Whether item is unusable (different visual state) */
  unusable?: boolean;
  /** Child menu items */
  children?: Array<LeftMenuItem | { childrenItem: CustomSubmenuItem }>;
  /** Display order (lower = earlier) */
  order?: number;
  /** Group order for grouped items */
  groupOrder?: number;
  /** Item type (normal or divider) */
  type?: LEFTITEM_TYPE;
  /** Whether to show divider above this item */
  needDivider?: boolean;
  /** Keyboard shortcut hint text */
  hotkeyTip?: string;
  /** Whether to keep item visible even when disabled */
  keep?: boolean;
  /** Whether to hide menu after clicking */
  hideAfterClick?: boolean;
  /** Whether to show hotkey in label */
  showHotKey?: boolean;
}

/**
 * Icon component props
 */
export interface IconViewProps {
  /** Current icon type identifier */
  showType: string;
  /** Hover state icon type */
  hoverType?: string;
  /** Icon color (CSS color string) */
  hoverColor?: string;
  /** Active/click state color */
  clickColor?: string;
  /** Background color on hover */
  hoverBgColor?: string;
  /** Click handler */
  iconOnclick?: (event: React.MouseEvent) => void;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Custom CSS class */
  customClass?: string;
  /** Custom icon styles */
  customStyle?: React.CSSProperties;
  /** Custom background styles */
  customBgStyle?: React.CSSProperties;
  /** Background hover area extension size in pixels */
  bgExtendSize?: number;
}

/**
 * Tooltip component props
 */
export interface TooltipProps {
  /** Tooltip content */
  title: React.ReactNode;
  /** Trigger element */
  children: React.ReactElement;
  /** Placement relative to trigger */
  placement?: 
    | "top" | "bottom" | "left" | "right"
    | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
    | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
  /** Trigger mode */
  trigger?: "hover" | "click" | "focus" | "move";
  /** Delay before showing (ms) */
  delayOpen?: number;
  /** Delay before hiding (ms) */
  delayClose?: number;
  /** Combined delay for both show/hide */
  delay?: number;
  /** Show handler */
  onOpen?: () => void;
  /** Hide handler */
  onClose?: () => void;
  /** Enable animation */
  animation?: boolean;
  /** Custom overlay class */
  overlayClassName?: string;
  /** Color theme */
  color?: "light" | "dark";
  /** Container element getter */
  getPopupContainer?: () => HTMLElement;
  /** Whether arrow points at trigger center */
  arrowPointAtCenter?: boolean;
  /** Disable hover interaction on popover itself */
  disableHoverPopover?: boolean;
}

/**
 * Left menu component props
 */
export interface LeftMenuProps {
  /** Menu items data */
  data: LeftMenuItem[];
  /** Initial position */
  position: MenuPosition;
  /** Number of items shown before extend button appears */
  showItemCount?: number;
  /** Whether to show mask overlay */
  mask?: boolean;
  /** Menu close callback */
  onLeftMenuClose?: () => void;
  /** Auto-fit position calculator */
  autoFit?: (position: MenuPosition, menuElement: HTMLElement) => MenuPosition;
}

/**
 * Menu event payload
 */
export interface LeftMenuEvent {
  /** Clicked main item */
  item: LeftMenuItem;
  /** Clicked sub-item (if any) */
  subItem?: LeftMenuItem | CustomSubmenuItem;
}

// ============================================================================
// Icon Font Map
// ============================================================================

/**
 * Predefined icon identifiers mapped to icon font names
 */
export const SvgMap: Record<string, string> = {
  hide: "hide",
  flip: "flip",
  place: "place",
  del: "delete",
  group: "group",
  replace: "replace",
  ungroup: "ungroup",
  duplicate: "duplicate",
  editCabinet: "cabinet_edit",
  editModeling: "bianji",
  favRemove: "favRemove",
  favAdded: "favAdded",
  clearmaterial: "clearmaterial",
  lock: "lock",
  unlock: "unlock",
  copy_attribute: "copy_attribute",
  door_close: "door_close",
  door_open: "door_open",
  ceilingadvanced: "ceilingadvanced",
  customizedFeatureModel: "customizedfeaturemodel",
  platformAdvanced: "platformadvanced",
  linetoArc: "line2arc",
  offsetRegionSvg: "offset_region",
  wallDecorationAdvanced: "wall_decoration_advanced",
  facegroup: "facegroup",
  distributionContents: "distribution_contents",
  align: "align",
  limian: "limian-19",
  move: "movemode",
  scale: "scalemode",
  array: "array",
  part_choose: "bujianxuanze",
  smartAccessoryLayoutLeftMenu: "smartlayout",
  splitMolding: "hs_mian_chaifenxian",
  connectMolding: "hs_mian_lianjiexian",
  replaceMaterial: "replace_material"
};

// ============================================================================
// Components
// ============================================================================

/**
 * Tooltip component for displaying hints
 */
export const Tooltip: React.ForwardRefExoticComponent<
  TooltipProps & React.RefAttributes<unknown>
>;

/**
 * Icon font component for rendering SVG icons
 */
export const Icons: React.ComponentType<{
  /** Icon type identifier */
  type: string;
  /** Custom CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}>;

/**
 * Icon view component with hover/click states
 */
export const IconfontView: React.FC<IconViewProps>;

/**
 * Single menu item component
 */
export const LeftItem: React.ComponentClass<{
  /** Item data */
  item: LeftMenuItem;
  /** Click handler */
  onClick: (event: React.MouseEvent) => void;
  /** Whether rendered in extend bar */
  extendBar?: boolean;
}>;

/**
 * Main left menu component
 */
export class LeftMenu extends React.Component<LeftMenuProps> {
  /** Get underlying DOM node */
  readonly leftMenuNode: HTMLDivElement | null;
  
  /** Hide menu with animation */
  hide(): Promise<void>;
  
  /** Show menu */
  show(): Promise<void>;
  
  /** Update menu position */
  updatePosition(position: MenuPosition): void;
}

// ============================================================================
// Signal/Event System
// ============================================================================

/**
 * Event dispatcher for menu interactions (singleton)
 */
export class LeftMenuSignal {
  /** Get singleton instance */
  static getInstance(): LeftMenuSignal;
  
  /** Register event listener */
  listen(callback: (event: LeftMenuEvent) => void): void;
  
  /** Emit event to all listeners */
  dispatch(event: LeftMenuEvent): void;
  
  /** Remove specific listener */
  unlisten(callback: (event: LeftMenuEvent) => void): void;
  
  /** Remove all listeners */
  unlistenAll(): void;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Display left menu at specified position
 * @param items - Menu items to display
 * @param position - Menu position coordinates
 * @param options - Additional configuration
 * @returns Promise resolving to menu instance
 */
export function showLeftMenu(
  items: LeftMenuItem[],
  position: MenuPosition,
  options?: {
    showItemCount?: number;
    mask?: boolean;
    onLeftMenuClose?: () => void;
    autoFit?: (position: MenuPosition, menuElement: HTMLElement) => MenuPosition;
  }
): Promise<LeftMenu | undefined>;

/**
 * Update position of currently displayed menu
 * @param position - New position coordinates
 */
export function updatePosition(position: MenuPosition): void;

/**
 * Hide currently displayed menu
 * @returns Promise resolving when hidden
 */
export function hideLeftMenu(): Promise<void>;

/**
 * Show previously hidden menu
 * @returns Promise resolving when shown
 */
export function displayLeftMenu(): Promise<void>;

/**
 * Destroy menu and remove from DOM
 */
export function destroyLeftMenu(): void;