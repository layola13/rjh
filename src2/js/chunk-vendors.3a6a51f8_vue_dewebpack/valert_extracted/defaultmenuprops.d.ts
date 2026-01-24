/**
 * Default menu properties for VSelect component
 */
export interface DefaultMenuProps {
  /** Whether to close menu on click */
  closeOnClick: boolean;
  /** Whether to close menu on content click */
  closeOnContentClick: boolean;
  /** Whether to disable keyboard navigation keys */
  disableKeys: boolean;
  /** Whether to open menu on click */
  openOnClick: boolean;
  /** Maximum height of the menu in pixels */
  maxHeight: number;
}

/**
 * Default configuration for VSelect menu
 */
export const defaultMenuProps: DefaultMenuProps;

/**
 * Item structure for VSelect options
 */
export interface VSelectItem {
  /** Display text for the item */
  text?: string;
  /** Value of the item */
  value?: any;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether this is a header item */
  header?: boolean;
  /** Whether this is a divider item */
  divider?: boolean;
}

/**
 * Props configuration for VSelect component
 */
export interface VSelectProps {
  /** Icon to append to the select */
  appendIcon: string;
  /** Element to attach the menu to */
  attach: boolean | string | Element;
  /** Whether to cache items */
  cacheItems: boolean;
  /** Display selected items as chips */
  chips: boolean;
  /** Show clear icon when clearable */
  clearable: boolean;
  /** Allow deleting chips with remove button */
  deletableChips: boolean;
  /** Disable keyboard lookup functionality */
  disableLookup: boolean;
  /** Force menu to render immediately */
  eager: boolean;
  /** Hide selected items from the list */
  hideSelected: boolean;
  /** Array of selectable items */
  items: VSelectItem[];
  /** Color of selected items */
  itemColor: string;
  /** Property name or function to determine if item is disabled */
  itemDisabled: string | string[] | ((item: VSelectItem) => boolean);
  /** Property name or function to get item display text */
  itemText: string | string[] | ((item: VSelectItem) => string);
  /** Property name or function to get item value */
  itemValue: string | string[] | ((item: VSelectItem) => any);
  /** Configuration for the dropdown menu */
  menuProps: string | string[] | Partial<DefaultMenuProps>;
  /** Allow multiple selections */
  multiple: boolean;
  /** Open menu when clear icon is clicked */
  openOnClear: boolean;
  /** Return the entire object instead of just the value */
  returnObject: boolean;
  /** Use small chips */
  smallChips: boolean;
}

/**
 * Data state for VSelect component
 */
export interface VSelectData {
  /** Cached items array */
  cachedItems: VSelectItem[];
  /** Whether the menu has been bootstrapped */
  menuIsBooted: boolean;
  /** Whether the menu is currently active/open */
  isMenuActive: boolean;
  /** Index of the last rendered item for virtual scrolling */
  lastItem: number;
  /** Internal lazy-loaded value */
  lazyValue: any;
  /** Index of currently selected item */
  selectedIndex: number;
  /** Array of selected item objects */
  selectedItems: VSelectItem[];
  /** Prefix for keyboard lookup */
  keyboardLookupPrefix: string;
  /** Timestamp of last keyboard lookup */
  keyboardLookupLastTime: number;
}

/**
 * Computed properties for VSelect component
 */
export interface VSelectComputed {
  /** All items including cached and current items */
  allItems: VSelectItem[];
  /** CSS classes for the component */
  classes: Record<string, boolean>;
  /** Filtered and processed items for display */
  computedItems: VSelectItem[];
  /** ID reference for aria-owns attribute */
  computedOwns: string;
  /** Counter value for character/item count */
  computedCounterValue: number;
  /** Click-outside directive configuration */
  directives: Array<{ name: string; value: any }> | undefined;
  /** Dynamic height setting for menu */
  dynamicHeight: string;
  /** Whether chips are being used */
  hasChips: boolean;
  /** Whether selection slot is being used */
  hasSlot: boolean;
  /** Whether the select has a value */
  isDirty: boolean;
  /** Data configuration for the list component */
  listData: {
    attrs: Record<string, any>;
    props: Record<string, any>;
    on: Record<string, Function>;
    scopedSlots: Record<string, any>;
  };
  /** Static list VNode */
  staticList: any;
  /** Virtualized subset of items for rendering */
  virtualizedItems: VSelectItem[];
  /** Whether the menu can be shown */
  menuCanShow: boolean;
  /** Processed menu properties */
  $_menuProps: DefaultMenuProps & { eager: boolean; value: boolean; nudgeBottom: number };
}

/**
 * Methods for VSelect component
 */
export interface VSelectMethods {
  /** Blur the select input */
  blur(event?: Event): void;
  /** Activate/open the dropdown menu */
  activateMenu(): void;
  /** Callback when clear icon is clicked */
  clearableCallback(): void;
  /** Determine if click-outside should close menu */
  closeConditional(event: MouseEvent): boolean;
  /** Remove duplicate items from array */
  filterDuplicates(items: VSelectItem[]): VSelectItem[];
  /** Find index of existing item in selection */
  findExistingIndex(item: VSelectItem): number;
  /** Get menu content element */
  getContent(): HTMLElement | undefined;
  /** Generate chip selection VNode */
  genChipSelection(item: VSelectItem, index: number): any;
  /** Generate comma-separated selection VNode */
  genCommaSelection(item: VSelectItem, index: number, isLast: boolean): any;
  /** Generate default slot content */
  genDefaultSlot(): any[];
  /** Generate icon VNode */
  genIcon(type: string, callback: Function, node: any): any;
  /** Generate input element VNode */
  genInput(): any;
  /** Generate hidden input for form submission */
  genHiddenInput(): any;
  /** Generate input slot wrapper */
  genInputSlot(): any;
  /** Generate list VNode */
  genList(): any;
  /** Generate list with slots VNode */
  genListWithSlot(): any;
  /** Generate menu VNode */
  genMenu(): any;
  /** Generate selections display */
  genSelections(): any;
  /** Generate slot-based selection */
  genSlotSelection(item: VSelectItem, index: number): any;
  /** Get current menu list index */
  getMenuIndex(): number;
  /** Check if item is disabled */
  getDisabled(item: VSelectItem): boolean;
  /** Get display text from item */
  getText(item: VSelectItem): string;
  /** Get value from item */
  getValue(item: VSelectItem): any;
  /** Handle blur event */
  onBlur(event?: FocusEvent): void;
  /** Handle chip close/remove */
  onChipInput(item: VSelectItem): void;
  /** Handle click event */
  onClick(event: MouseEvent): void;
  /** Handle escape key press */
  onEscDown(event: KeyboardEvent): void;
  /** Handle key press for type-to-search */
  onKeyPress(event: KeyboardEvent): void;
  /** Handle key down events */
  onKeyDown(event: KeyboardEvent): void;
  /** Handle menu active state change */
  onMenuActiveChange(isActive: boolean): void;
  /** Handle mouse up event */
  onMouseUp(event: MouseEvent): void;
  /** Handle menu scroll for virtual scrolling */
  onScroll(): void;
  /** Handle space key press */
  onSpaceDown(event: KeyboardEvent): void;
  /** Handle tab key press */
  onTabDown(event: KeyboardEvent): void;
  /** Handle up/down arrow keys */
  onUpDown(event: KeyboardEvent): void;
  /** Select or deselect an item */
  selectItem(item: VSelectItem): void;
  /** Set the menu list index */
  setMenuIndex(index: number): void;
  /** Update selected items array based on internal value */
  setSelectedItems(): void;
  /** Set the internal value */
  setValue(value: any): void;
  /** Check if element is within append-inner slot */
  isAppendInner(element: Element): boolean;
}

/**
 * VSelect component - Material Design select/dropdown component
 * Extends VTextField with dropdown menu functionality
 */
declare const VSelect: {
  name: "v-select";
  props: VSelectProps;
  data(): VSelectData;
  computed: VSelectComputed;
  methods: VSelectMethods;
};

export default VSelect;