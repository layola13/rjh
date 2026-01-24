/**
 * Toolbar folder component that displays a collapsible menu item with optional sub-items.
 * Supports features like tooltips, badges, checkboxes, and nested menu structures.
 */

import React from 'react';

/**
 * Placement options for tooltips and popovers
 */
type Placement = 
  | 'top' 
  | 'bottom' 
  | 'left' 
  | 'right' 
  | 'topLeft' 
  | 'topRight' 
  | 'bottomLeft' 
  | 'bottomRight' 
  | 'leftTop' 
  | 'leftBottom' 
  | 'rightTop' 
  | 'rightBottom';

/**
 * Trigger type for interactive elements
 */
type TriggerType = 'hover' | 'click' | 'focus' | 'move' | 'new';

/**
 * Check status for checkbox items
 */
type CheckStatus = 'all' | 'none' | 'half-checked';

/**
 * Menu item types
 */
type MenuItemType = 'folder' | 'image' | 'checkbox' | 'radio' | 'divider' | 'button';

/**
 * Badge configuration
 */
interface BadgeConfig {
  /** Badge icon URL */
  icon: string;
  /** Badge tooltip text */
  tooltip?: string;
  /** Click handler for badge */
  onclick?: () => void;
}

/**
 * Popover configuration
 */
interface PopoverConfig {
  /** Popover placement relative to trigger element */
  placement: Placement;
  /** Trigger behavior */
  trigger: TriggerType;
  /** Delay before showing (ms) */
  delay?: number;
  /** Open delay (ms) */
  delayOpen?: number;
  /** Close delay (ms) */
  delayClose?: number;
  /** Image URL to display */
  imageUrl?: string;
  /** Video URL to display */
  videoUrl?: string;
  /** Text content */
  text?: string;
  /** Whether to show action button */
  showBtn?: boolean;
  /** Button click handler */
  onBtnClick?: () => void;
  /** Button text */
  btnText?: string;
  /** Link text */
  linkText?: string;
  /** Link URL */
  linkUrl?: string;
}

/**
 * Tooltip configuration
 */
interface TooltipConfig {
  /** Tooltip placement */
  placement: Placement;
  /** Trigger behavior */
  trigger: TriggerType;
  /** Tooltip title/content */
  title: string;
  /** Delay before showing (ms) */
  delay?: number;
  /** Open delay (ms) */
  delayOpen?: number;
  /** Close delay (ms) */
  delayClose?: number;
}

/**
 * Dynamic tooltip configuration with additional features
 */
interface DynamicTooltipConfig extends TooltipConfig {
  /** Whether to show the tooltip */
  isShow: boolean;
  /** Tooltip type/style variant */
  type?: string;
  /** Whether tooltip can be manually closed */
  canRemove?: boolean;
  /** Whether to show a dot indicator */
  showDot?: boolean;
}

/**
 * Menu item data structure
 */
interface MenuItemData {
  /** Display label */
  label: string;
  /** Icon identifier */
  icon?: string;
  /** Whether item is visible */
  visible: boolean;
  /** Whether item is enabled */
  enable: boolean;
  /** Tooltip text or config */
  tooltip?: string | TooltipConfig;
  /** Popover configuration */
  popover?: PopoverConfig;
  /** Click handler */
  onclick?: () => void;
  /** Whether item is pressed/active */
  isPressed?: boolean;
  /** Badge configuration */
  badge?: BadgeConfig;
  /** Hotkey binding */
  hotkey?: string;
  /** Custom CSS class */
  className?: string;
  /** Check status for checkable items */
  checkStatus?: CheckStatus;
  /** Whether this is a group item */
  isGroup?: boolean;
  /** Change handler for checkable items */
  onchange?: (checked: boolean) => void;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Delay before disappearing (ms) */
  delayDisappearTime?: number;
  /** Hover state */
  hover?: boolean;
  /** Item count badge number */
  count?: number;
  /** Label icon identifier */
  labelIcon?: string;
  /** Text CSS class name */
  textClassName?: string;
  /** Whether to show as new */
  showNew?: boolean;
  /** Whether to show notification dot */
  hasDot?: boolean;
  /** Callback when showing new badge */
  showNewCallBack?: () => boolean;
  /** Whether to show icon */
  isShowIcon?: boolean;
  /** Info icon identifier */
  infoIcon?: string;
  /** Get benefit amount function */
  getBenefitAmount?: () => number;
  /** Show market modal function */
  showMarketModal?: () => void;
  /** Item category for grouping */
  catagory?: 'lv1' | 'lv2' | 'lv3';
  /** Whether item is checked */
  isChecked?: boolean;
  /** Radio button group ID */
  groupId?: string;
  /** Half-checked status */
  checkHalfStatus?: boolean;
}

/**
 * Menu item node structure
 */
interface MenuItem {
  /** Item unique name/ID */
  name: string;
  /** Item type */
  type: MenuItemType;
  /** Item data configuration */
  data: MenuItemData;
  /** Child menu items */
  childItems?: MenuItem[];
  /** Whether any child is pressed */
  hasChildPressed?: boolean;
  /** Whether item has badge dot */
  hasBadgeDot?: boolean;
  /** Whether item has warning */
  hasWarning?: boolean;
  /** Signal for change notifications */
  signalChanged?: unknown;
  /** Get item path in menu hierarchy */
  getPath: () => string;
  /** Click handler */
  click: () => void;
  /** Set data without triggering UI update */
  setDataOnly: (data: Partial<MenuItemData>) => void;
  /** Set checked state */
  setChecked?: (checked: boolean) => void;
}

/**
 * Component props
 */
interface ToolbarFolderProps {
  /** Whether this is a top-level toolbar item */
  isTopLevel?: boolean;
  /** Whether item is visible */
  visible: boolean;
  /** Whether item is enabled/clickable */
  enable: boolean;
  /** Display label text */
  label: string;
  /** Icon identifier */
  icon: string;
  /** Hover state icon identifier */
  iconhover?: string;
  /** Tooltip text or configuration */
  tooltip?: string | TooltipConfig;
  /** Dynamic tooltip configuration */
  dynamicTooltip?: DynamicTooltipConfig;
  /** Popover configuration */
  popover?: PopoverConfig;
  /** Child menu items */
  childItems: MenuItem[];
  /** Whether item is pressed/active */
  isPressed?: boolean;
  /** Whether any child item is pressed */
  hasChildPressed?: boolean;
  /** Whether to show notification dot */
  hasDot?: boolean;
  /** Badge configuration */
  badge?: BadgeConfig;
  /** Item path in menu hierarchy */
  path: string;
  /** Whether item has warning indicator */
  hasWarning?: boolean;
  /** Label icon identifier */
  labelIcon?: string;
  /** Custom CSS class name */
  className?: string;
  /** Check status for checkable items */
  checkStatus?: CheckStatus;
  /** Whether this is a group item with checkbox */
  isGroup?: boolean;
  /** Change handler for group checkbox */
  onchange?: (checked: boolean) => void;
  /** Click handler */
  onclick?: () => void;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Delay before menu disappears on mouse leave (ms) */
  delayDisappearTime?: number;
  /** Initial hover state */
  hover?: boolean;
  /** Item count for badge display */
  count?: number;
  /** Line type style variant */
  lineType?: boolean;
  /** Text content CSS class */
  textClassName?: string;
  /** Whether to hide icon */
  hiddenIcon?: boolean;
  /** Whether icon is an image URL */
  isImg?: boolean;
  /** Background image URL */
  bgImg?: string;
  /** Two-level folder CSS class */
  twoLClassName?: string;
  /** Custom style name */
  styleName?: string;
  /** First-time tooltip text */
  firstTooltip?: string;
  /** Whether to show tooltip by signal */
  showTipBySignal?: boolean;
  /** Signal hook for tooltip control */
  toolTipSignalHook?: unknown;
  /** Whether toolbar is active */
  isToolbarActive?: boolean;
  /** Callback when showing new badge */
  showNewCallBack?: () => boolean;
}

/**
 * Component state
 */
interface ToolbarFolderState {
  /** Current hover state */
  hover: boolean;
  /** Display style for label */
  showDisplay: string;
  /** Current check status */
  checkStatus?: CheckStatus;
  /** Whether to show first-time tooltip */
  showFirstTooltip: boolean;
  /** Customized tooltip text */
  customizedTips?: string;
  /** Callback when tooltip is closed */
  closeCallBack?: () => void;
}

/**
 * Toolbar folder component - displays a collapsible menu item with optional nested items.
 * Supports checkboxes, badges, tooltips, and various interaction patterns.
 */
export default class ToolbarFolder extends React.Component<ToolbarFolderProps, ToolbarFolderState> {
  static defaultProps: Partial<ToolbarFolderProps>;
  
  /** Timer for delayed hover interactions */
  private hoverTimer: NodeJS.Timeout | null;
  
  /** Whether a sub-item is currently hovered */
  private _isSubItemHovered: boolean;
  
  /** Whether mouse has left the component */
  private _isMouseLeave: boolean;
  
  /** Whether toolbar is in active state */
  private _isToolbarActive: boolean;
  
  /** Reference to tooltip component */
  private tooltipRef: React.RefObject<any>;
  
  /** Reference to icon container element */
  private _refIconContainer?: HTMLElement;
  
  /** Reference to icon image element */
  private _refIconImage?: HTMLElement;
  
  /** Reference to hover icon image element */
  private _refIconHoverImage?: HTMLElement;
  
  /** Reference to badge image element */
  private _refBadgeImage?: HTMLImageElement;
  
  /** Signal hook for tooltip control */
  private _signalHook?: any;

  /**
   * Renders tooltip content with close button
   * @param content - Tooltip text content
   * @returns Tooltip JSX element
   */
  tooltipCanRemove(content: string): JSX.Element;

  /**
   * Closes the tooltip and triggers callback
   */
  closeToolTip(): void;

  /**
   * Handles mouse leave with optional delay
   */
  private _handleMouseLeave(): void;

  /**
   * Sets the check status of this item
   * @param status - New check status
   */
  private _setChecked(status: CheckStatus): void;

  /**
   * Handles item click - triggers group checkbox or custom onclick
   */
  private _onClick(): void;

  /**
   * Handles checkbox click for group items
   */
  private onCheckClick(): void;

  /**
   * Handles checkbox state change
   * @param checked - Whether checkbox should be checked
   */
  private onCheckChange(checked: boolean): void;

  /**
   * Gets the folder's checked state
   * @returns True if all checked, false if none, undefined if half-checked
   */
  private getFolderChecked(): boolean | undefined;

  /**
   * Checks if a prop value has changed
   * @param nextProps - New props
   * @param propName - Property name to check
   * @returns True if prop value changed
   */
  private _isPropChanged(nextProps: ToolbarFolderProps, propName: keyof ToolbarFolderProps): boolean;

  /**
   * Checks if item is enabled
   * @returns True if enabled
   */
  private _isEnabled(): boolean;

  /**
   * Handles mouse enter event
   */
  private _onMouseEnter(): void;

  /**
   * Handles mouse leave event
   */
  private _onMouseLeave(): void;

  /**
   * Handles submenu click
   * @param event - Click event
   */
  private _onSubMenuClick(event: React.MouseEvent<HTMLElement>): void;

  /**
   * Handles sub-item mouse enter
   */
  private _handleSubItemEnter(): void;

  /**
   * Handles sub-item mouse leave
   */
  private _handleSubItemLeave(): void;

  /**
   * Renders dropdown menu layout from child items
   * @param items - Menu items to render
   * @returns Array of rendered menu JSX elements
   */
  private _dropdownLayout(items: MenuItem[]): JSX.Element[];

  /**
   * Renders folder label with optional checkbox and icons
   * @param classNames - Array of CSS class names
   * @returns Label JSX element
   */
  renderFolderLabel(classNames: string[]): JSX.Element;

  /**
   * Renders folder content (label text, count, icon)
   * @param label - Label text
   * @param count - Item count
   * @param labelIcon - Label icon identifier
   * @returns Content JSX element
   */
  renderFolderContent(label: string, count?: number, labelIcon?: string): JSX.Element;
}

/**
 * Default prop values
 */
ToolbarFolder.defaultProps = {
  isTopLevel: false,
  isPressed: false,
  hasChildPressed: false,
  hasDot: false,
  badge: undefined,
  hasWarning: false
};