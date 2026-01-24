/**
 * Catalog Tree Component Type Definitions
 * A Vue component for displaying and managing hierarchical catalog structures
 */

/**
 * Represents a catalog item in the tree structure
 */
export interface CatalogItem {
  /** Unique identifier for the catalog item */
  id: number;
  
  /** Display name of the catalog item */
  name: string;
  
  /** Child catalog items (nested structure) */
  children: CatalogItem[];
  
  /** Whether this item is restricted from editing */
  limit_edit?: boolean;
}

/**
 * Active catalog IDs tracking selection at each level
 */
export interface ActiveIds {
  /** First level (root) active catalog ID */
  first: number;
  
  /** Second level active catalog ID */
  second: number;
  
  /** Third level active catalog ID */
  third: number;
}

/**
 * Fixed top positioning configuration
 */
export interface FixTopConfig {
  /** Whether to use fixed top positioning */
  use: boolean;
  
  /** Top offset in pixels */
  top: number;
}

/**
 * Component data structure
 */
export interface CatalogTreeData {
  /** Document body height in pixels */
  body_height: number;
  
  /** Whether the catalog menu is shown */
  show: boolean;
  
  /** Whether the catalog is in edit mode */
  edit: boolean;
}

/**
 * Catalog click event payload
 */
export interface CatalogClickEvent {
  /** The level of the clicked catalog (1-3) */
  level: number;
  
  /** Array of catalog items from root to clicked item */
  catalogs: CatalogItem[];
}

/**
 * Catalog action event payload
 */
export interface CatalogActionEvent {
  /** The level where the action occurred (0-4) */
  level: number;
  
  /** Type of action performed */
  type: 'add' | 'edit' | 'delete';
  
  /** Array of catalog items involved in the action */
  catalogs: CatalogItem[];
}

/**
 * Component props interface
 */
export interface CatalogTreeProps {
  /** Whether the catalog can be edited */
  canEdit: boolean;
  
  /** List of root-level catalog items */
  list: CatalogItem[];
  
  /** Currently active catalog IDs at each level */
  activeIds: ActiveIds;
  
  /** Current active level (0-3) */
  level: number;
  
  /** Custom height for the navigation drawer */
  height: string;
  
  /** Whether to hide the header section */
  hideHead: boolean;
  
  /** Fixed top positioning configuration */
  fix_top: FixTopConfig;
}

/**
 * Component computed properties
 */
export interface CatalogTreeComputed {
  /** Whether the screen size is small (mobile) */
  is_small_screen: boolean;
  
  /** Top offset for navigation in pixels */
  nav_top: number;
  
  /** Calculated height for navigation drawer */
  nav_height: number;
  
  /** Whether the current route is product management */
  isProductManage: boolean;
}

/**
 * Component methods interface
 */
export interface CatalogTreeMethods {
  /**
   * Handles menu display state change
   * @param show - Whether to show the menu
   */
  changeMenuDisplay(show: boolean): void;
  
  /**
   * Handles catalog item click
   * @param level - The level of the clicked catalog
   * @param catalogs - Array of catalog items from root to clicked item
   */
  clickCatalog(level: number, catalogs: CatalogItem[]): void;
  
  /**
   * Handles catalog action (add/edit/delete)
   * @param level - The level where action occurred
   * @param type - Type of action (add, edit, delete)
   * @param catalogs - Array of catalog items involved
   */
  catalogAction(level: number, type: 'add' | 'edit' | 'delete', catalogs: CatalogItem[]): void;
}

/**
 * Catalog Tree Vue Component
 * Displays a hierarchical tree structure for catalog navigation with optional editing capabilities
 */
declare const CatalogTree: {
  name: 'catalog-tree';
  data(): CatalogTreeData;
  props: CatalogTreeProps;
  computed: CatalogTreeComputed;
  methods: CatalogTreeMethods;
  mounted(): void;
};

export default CatalogTree;