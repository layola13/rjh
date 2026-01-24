/**
 * Bottom navigation bar component for mobile view
 * Displays menu items with icons and labels for main app navigation
 */

/**
 * Menu item configuration interface
 */
interface MenuItem {
  /** Translation key for the menu label */
  label: string;
  /** Icon class name for inactive state */
  icon: string;
  /** Icon class name for active state */
  active_icon: string;
  /** Vue router name for navigation */
  router_name: string;
}

/**
 * Component data structure
 */
interface BottomBarData {
  /** List of navigation menu items */
  menu_list: MenuItem[];
}

/**
 * Component computed properties
 */
interface BottomBarComputed {
  /** Whether the screen size is considered small (mobile) */
  is_small_screen: boolean;
}

/**
 * Bottom bar component definition
 */
declare const BottomBarComponent: {
  /** Component name */
  name: "bottom-bar";
  
  /**
   * Component data factory
   * @returns Initial component data with menu configuration
   */
  data(): BottomBarData;
  
  /** Component methods (empty in this implementation) */
  methods: Record<string, never>;
  
  /** Computed properties for reactive state */
  computed: {
    /**
     * Determines if the current screen size is small
     * @returns True if screen is mobile-sized
     */
    is_small_screen(): boolean;
  };
  
  /**
   * Lifecycle hook called after component is mounted
   */
  mounted(): void;
};

export default BottomBarComponent;