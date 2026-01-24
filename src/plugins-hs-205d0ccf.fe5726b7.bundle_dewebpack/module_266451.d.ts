/**
 * Menu item data source interface
 */
interface MenuItemDataSource {
  order?: number;
  visible?: boolean;
  enable?: boolean;
  badge?: string | number;
  hover?: boolean;
  command?: string;
  hotkey?: string;
  registerHotkey?: boolean;
  hotkeyOptions?: Record<string, any>;
  count?: number;
  isGroup?: boolean;
  defaultHoverFirstChild?: boolean;
  firstTooltip?: string;
  className?: string;
  delayDisappearTime?: number;
  checkStatus?: boolean;
  label?: string;
  labelIcon?: string;
  icon?: string;
  isImg?: boolean;
  bgImg?: string;
  iconhover?: string;
  linetype?: string;
  catagory?: string;
  tooltip?: string;
  width?: number | string;
  onclick?: () => void;
  isPressed?: boolean;
  styleName?: string;
  guidetip?: string;
  isChecked?: boolean;
  checkHalfStatus?: boolean;
  onchange?: (value: any) => void;
  groupId?: string;
  cancelRadioStatus?: boolean;
  popover?: any;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onButtonMouseEnter?: (event: MouseEvent) => void;
  onButtonMouseLeave?: (event: MouseEvent) => void;
  dynamicTooltip?: string;
  hasDot?: boolean;
  showNew?: boolean;
  textClassName?: string;
  hasBadgeDot?: boolean;
  hasWarning?: boolean;
  showNewCallBack?: () => void;
  showTipBySignal?: boolean;
  infoIcon?: string;
  getBenefitAmount?: () => number;
  showMarketModal?: () => void;
}

/**
 * Menu item source interface
 */
interface MenuItemSource {
  name: string;
  type: string;
  data: MenuItemDataSource;
  setData(data: Partial<MenuItemDataSource>): void;
  disable(): void;
  enable(): void;
  collapse(): void;
  expand(): void;
  show(): void;
  hide(): void;
  addBadge(badge: string | number): void;
  removeBadge(): void;
  addDot(): void;
  removeDot(): void;
  getPath(): string[];
  isPressed(): boolean;
  setPressed(pressed: boolean): void;
  click(): void;
  setChecked(checked: boolean): void;
  setDataOnly(data: Partial<MenuItemDataSource>): void;
  setShowDynamicTooltip(show: boolean): void;
}

/**
 * Folder implementation interface
 */
interface FolderImpl {
  childItems: MenuItem[];
  hasBadgeDot: boolean;
  hasChildPressed: boolean;
  setData(data: { submenu?: any }): void;
  getChild(name: string): MenuItem | undefined;
  getAllChildren(): MenuItem[];
  add(item: MenuItem): void;
  remove(name: string): void;
  onchange(callback: () => void): void;
  insertBefore(item: MenuItem, reference: string): void;
  insertAfter(item: MenuItem, reference: string): void;
}

/**
 * Menu item configuration
 */
interface MenuItemConfig extends Partial<MenuItemDataSource> {
  name?: string;
  order?: number;
  submenu?: any;
}

/**
 * Menu item data wrapper class
 */
declare class MenuItemData {
  private readonly _source: MenuItemDataSource;
  order: number;

  constructor(source: MenuItemDataSource);

  readonly visible?: boolean;
  readonly enable?: boolean;
  readonly badge?: string | number;
  readonly hover?: boolean;
  readonly command?: string;
  readonly hotkey?: string;
  readonly registerHotkey?: boolean;
  readonly hotkeyOptions?: Record<string, any>;
  readonly count?: number;
  readonly isGroup?: boolean;
  readonly defaultHoverFirstChild?: boolean;
  readonly firstTooltip?: string;
  readonly className?: string;
  readonly delayDisappearTime?: number;
  readonly checkStatus?: boolean;
  readonly label?: string;
  readonly labelIcon?: string;
  readonly icon?: string;
  readonly isImg?: boolean;
  readonly bgImg?: string;
  readonly iconhover?: string;
  readonly linetype?: string;
  readonly catagory?: string;
  readonly tooltip?: string;
  readonly width?: number | string;
  readonly onclick?: () => void;
  readonly isPressed?: boolean;
  readonly styleName?: string;
  readonly guidetip?: string;
  readonly isChecked?: boolean;
  readonly checkHalfStatus?: boolean;
  readonly onchange?: (value: any) => void;
  readonly groupId?: string;
  readonly cancelRadioStatus?: boolean;
  readonly popover?: any;
  readonly onMouseEnter?: (event: MouseEvent) => void;
  readonly onMouseLeave?: (event: MouseEvent) => void;
  readonly onButtonMouseEnter?: (event: MouseEvent) => void;
  readonly onButtonMouseLeave?: (event: MouseEvent) => void;
  readonly dynamicTooltip?: string;
  readonly hasDot?: boolean;
  readonly showNew?: boolean;
  readonly textClassName?: string;
  readonly hasBadgeDot?: boolean;
  readonly hasWarning?: boolean;
  readonly showNewCallBack?: () => void;
  readonly showTipBySignal?: boolean;
  readonly infoIcon?: string;
  readonly getBenefitAmount?: () => number;
  readonly showMarketModal?: () => void;
}

/**
 * Menu item class representing a menu entry with data, child items, and folder implementation
 */
declare class MenuItem {
  /** The name identifier of the menu item */
  readonly name: string;

  /** Child items contained in this menu item */
  readonly childItems: MenuItem[];

  /** The data associated with this menu item */
  readonly data: MenuItemData;

  private readonly _source: MenuItemSource;
  private readonly _changeCallback: () => void;
  private readonly _folderImpl: FolderImpl;

  /**
   * Creates a new menu item
   * @param config - Configuration object for the menu item
   * @param source - The underlying menu item source
   * @param folderImpl - Folder implementation for managing child items
   * @param changeCallback - Callback invoked when the item changes
   */
  constructor(
    config: MenuItemConfig,
    source: MenuItemSource,
    folderImpl: FolderImpl,
    changeCallback: () => void
  );

  /**
   * Updates the menu item data
   * @param data - Partial data to update
   */
  setData(data?: MenuItemConfig): void;

  /** The type of the menu item */
  readonly type: string;

  /** Whether the menu item has a badge dot indicator */
  readonly hasBadgeDot: boolean;

  /** Whether the menu item or its children have warnings */
  readonly hasWarning: boolean;

  /** Whether any child item is pressed */
  readonly hasChildPressed: boolean;

  /** The count value associated with the menu item */
  readonly count: number;

  /** Disables the menu item */
  disable(): void;

  /** Enables the menu item */
  enable(): void;

  /** Collapses the menu item */
  collapse(): void;

  /** Expands the menu item */
  expand(): void;

  /** Shows the menu item */
  show(): void;

  /** Hides the menu item */
  hide(): void;

  /**
   * Adds a badge to the menu item
   * @param badge - Badge content
   */
  addBadge(badge: string | number): void;

  /** Removes the badge from the menu item */
  removeBadge(): void;

  /** Adds a dot indicator to the menu item */
  addDot(): void;

  /** Removes the dot indicator from the menu item */
  removeDot(): void;

  /**
   * Gets the path to this menu item
   * @returns Array of names representing the path
   */
  getPath(): string[];

  /**
   * Checks if the menu item is pressed
   * @returns True if pressed
   */
  isPressed(): boolean;

  /**
   * Sets the pressed state of the menu item
   * @param pressed - Pressed state
   */
  setPressed(pressed: boolean): void;

  /** Triggers a click on the menu item */
  click(): void;

  /**
   * Sets the checked state of the menu item
   * @param checked - Checked state
   */
  setChecked(checked: boolean): void;

  /**
   * Sets data without triggering side effects
   * @param data - Data to set
   */
  setDataOnly(data: Partial<MenuItemDataSource>): void;

  /**
   * Sets whether to show dynamic tooltip
   * @param show - Whether to show
   */
  setShowDynamicTooltip(show: boolean): void;

  /**
   * Gets a child menu item by name
   * @param name - Name of the child
   * @returns The child menu item or undefined
   */
  getChild(name: string): MenuItem | undefined;

  /**
   * Gets all child menu items
   * @returns Array of all children
   */
  getAllChildren(): MenuItem[];

  /**
   * Adds a child menu item
   * @param item - Menu item to add
   */
  add(item: MenuItem): void;

  /**
   * Removes a child menu item by name
   * @param name - Name of the child to remove
   */
  remove(name: string): void;

  /**
   * Registers a change callback
   * @param callback - Callback function
   */
  onchange(callback: () => void): void;

  /**
   * Inserts a menu item before a reference item
   * @param item - Item to insert
   * @param reference - Reference item name
   */
  insertBefore(item: MenuItem, reference: string): void;

  /**
   * Inserts a menu item after a reference item
   * @param item - Item to insert
   * @param reference - Reference item name
   */
  insertAfter(item: MenuItem, reference: string): void;
}

export default MenuItem;