/**
 * VTreeview Node Component Props and Type Definitions
 * Provides tree node functionality with selection, expansion, and loading capabilities
 */

/**
 * Props configuration for VTreeview Node component
 */
export interface VTreeviewNodeProps {
  /**
   * Enables node activation on click
   * @default false
   */
  activatable: boolean;

  /**
   * CSS class applied to active nodes
   * @default "v-treeview-node--active"
   */
  activeClass: string;

  /**
   * Color theme for active state
   * @default "primary"
   */
  color: string;

  /**
   * Icon for expand/collapse toggle
   * @default "$subgroup"
   */
  expandIcon: string;

  /**
   * Icon for indeterminate checkbox state
   * @default "$checkboxIndeterminate"
   */
  indeterminateIcon: string;

  /**
   * Property name for accessing child nodes in item data
   * @default "children"
   */
  itemChildren: string;

  /**
   * Property name for disabled state in item data
   * @default "disabled"
   */
  itemDisabled: string;

  /**
   * Property name for unique key in item data
   * @default "id"
   */
  itemKey: string;

  /**
   * Property name for display text in item data
   * @default "name"
   */
  itemText: string;

  /**
   * Async function to load child nodes dynamically
   */
  loadChildren?: (item: unknown) => Promise<void>;

  /**
   * Icon displayed during loading state
   * @default "$loading"
   */
  loadingIcon: string;

  /**
   * Icon for unchecked checkbox state
   * @default "$checkboxOff"
   */
  offIcon: string;

  /**
   * Icon for checked checkbox state
   * @default "$checkboxOn"
   */
  onIcon: string;

  /**
   * Opens/closes node on click instead of just activating
   * @default false
   */
  openOnClick: boolean;

  /**
   * Applies rounded styling to node
   * @default false
   */
  rounded: boolean;

  /**
   * Enables checkbox selection for node
   * @default false
   */
  selectable: boolean;

  /**
   * Color theme for selected state
   * @default "accent"
   */
  selectedColor: string;

  /**
   * Applies shaped styling to node
   * @default false
   */
  shaped: boolean;

  /**
   * Enables expand/collapse transition animation
   * @default false
   */
  transition: boolean;

  /**
   * Selection behavior mode:
   * - "leaf": only leaf nodes can be selected, disabled state propagates to children
   * - "independent": all nodes selectable independently
   * @default "leaf"
   */
  selectionType: 'leaf' | 'independent';
}

/**
 * Internal props extending VTreeviewNodeProps with component-specific properties
 */
interface VTreeviewNodeInternalProps extends VTreeviewNodeProps {
  /**
   * Nesting level in tree hierarchy (0-based)
   */
  level: number;

  /**
   * Data object for this tree node
   */
  item: Record<string, unknown>;

  /**
   * Whether parent node is disabled (affects child selection)
   * @default false
   */
  parentIsDisabled: boolean;
}

/**
 * Component data state
 */
interface VTreeviewNodeData {
  /**
   * Whether children have been loaded (for lazy loading)
   */
  hasLoaded: boolean;

  /**
   * Whether node is currently active/focused
   */
  isActive: boolean;

  /**
   * Whether checkbox is in indeterminate state
   */
  isIndeterminate: boolean;

  /**
   * Whether node is currently loading children
   */
  isLoading: boolean;

  /**
   * Whether node is expanded to show children
   */
  isOpen: boolean;

  /**
   * Whether node is selected (checkbox checked)
   */
  isSelected: boolean;
}

/**
 * Scoped slot props exposed to parent component
 */
interface VTreeviewNodeScopedProps {
  /**
   * The node's data item
   */
  item: Record<string, unknown>;

  /**
   * Whether node is a leaf (has no children)
   */
  leaf: boolean;

  /**
   * Whether node is selected
   */
  selected: boolean;

  /**
   * Whether node checkbox is indeterminate
   */
  indeterminate: boolean;

  /**
   * Whether node is active
   */
  active: boolean;

  /**
   * Whether node is expanded
   */
  open: boolean;
}

/**
 * Treeview injection interface for parent-child communication
 */
interface TreeviewInjection {
  /**
   * Registers a node with the treeview parent
   */
  register(node: VTreeviewNodeComponent): void;

  /**
   * Unregisters a node from the treeview parent
   */
  unregister(node: VTreeviewNodeComponent): void;

  /**
   * Updates open state in parent treeview
   */
  updateOpen(key: string | number, isOpen: boolean): void;

  /**
   * Updates selected state in parent treeview
   */
  updateSelected(key: string | number, isSelected: boolean): void;

  /**
   * Updates active state in parent treeview
   */
  updateActive(key: string | number, isActive: boolean): void;

  /**
   * Emits open event to parent
   */
  emitOpen(): void;

  /**
   * Emits selected event to parent
   */
  emitSelected(): void;

  /**
   * Emits active event to parent
   */
  emitActive(): void;

  /**
   * Checks if a key is excluded from the tree
   */
  isExcluded(key: string | number): boolean;
}

/**
 * VTreeview Node Component Instance
 */
interface VTreeviewNodeComponent {
  /**
   * Component props
   */
  readonly $props: VTreeviewNodeInternalProps;

  /**
   * Component data
   */
  $data: VTreeviewNodeData;

  /**
   * Injected treeview parent instance
   */
  readonly treeview: TreeviewInjection;

  /**
   * Whether the node is disabled
   */
  readonly disabled: boolean;

  /**
   * Unique key for this node
   */
  readonly key: string | number;

  /**
   * Filtered array of child nodes
   */
  readonly children: Array<Record<string, unknown>> | null;

  /**
   * Display text for the node
   */
  readonly text: string;

  /**
   * Props object for scoped slots
   */
  readonly scopedProps: VTreeviewNodeScopedProps;

  /**
   * Computed icon based on selection state
   */
  readonly computedIcon: string;

  /**
   * Whether node has children (existing or loadable)
   */
  readonly hasChildren: boolean;

  /**
   * Checks and loads children if needed
   * @returns Promise that resolves when children are loaded
   */
  checkChildren(): Promise<void>;

  /**
   * Toggles node open/closed state
   */
  open(): void;

  /**
   * Generates label VNode
   */
  genLabel(): VNode;

  /**
   * Generates prepend slot VNode
   */
  genPrependSlot(): VNode | null;

  /**
   * Generates append slot VNode
   */
  genAppendSlot(): VNode | null;

  /**
   * Generates content wrapper VNode
   */
  genContent(): VNode;

  /**
   * Generates expand/collapse toggle icon VNode
   */
  genToggle(): VNode;

  /**
   * Generates selection checkbox icon VNode
   */
  genCheckbox(): VNode;

  /**
   * Generates indentation level spacers
   * @param depth - Number of level spacers to generate
   */
  genLevel(depth: number): VNode[];

  /**
   * Generates the root node VNode
   */
  genNode(): VNode;

  /**
   * Generates a child node component
   * @param item - Child item data
   * @param parentDisabled - Whether parent is disabled
   */
  genChild(item: Record<string, unknown>, parentDisabled: boolean): VNode;

  /**
   * Generates children container wrapper
   */
  genChildrenWrapper(): VNode | null;

  /**
   * Generates children with transition wrapper
   */
  genTransition(): VNode;

  /**
   * Render function
   */
  render(h: CreateElement): VNode;
}

/**
 * Vue VNode type (simplified)
 */
type VNode = unknown;

/**
 * Vue CreateElement function type (simplified)
 */
type CreateElement = (tag: string | object, data?: object, children?: unknown[]) => VNode;

export default VTreeviewNodeComponent;