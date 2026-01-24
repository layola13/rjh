import { VNode, VNodeData } from 'vue';
import { BaseItemGroup } from '../VItemGroup/VItemGroup';
import { DirectiveOptions } from 'vue/types/options';

/**
 * Touch directive configuration for swipe gestures
 */
interface TouchDirectiveConfig {
  /** Handler for left swipe gesture */
  left?: (event: TouchEvent) => void;
  /** Handler for right swipe gesture */
  right?: (event: TouchEvent) => void;
  /** Handler for touch end event */
  end?: (event: TouchEvent) => void;
  /** Handler for touch start event */
  start?: (event: TouchEvent) => void;
}

/**
 * Window item interface representing a single item in the window
 */
interface WindowItem {
  /** Whether the item is disabled */
  disabled: boolean;
  /** Unique value identifier for the item */
  value?: unknown;
}

/**
 * VWindow component - A container for displaying content in a sliding window with navigation controls
 * 
 * @example
 * <v-window v-model="activeWindow" show-arrows>
 *   <v-window-item>Content 1</v-window-item>
 *   <v-window-item>Content 2</v-window-item>
 * </v-window>
 */
declare const VWindow: {
  /** Component name */
  name: 'v-window';

  /** Directives used by the component */
  directives: {
    /** Touch directive for swipe gestures */
    Touch: DirectiveOptions;
  };

  /** Provides windowGroup context to child components */
  provide(): {
    windowGroup: typeof VWindow;
  };

  /** Component props */
  props: {
    /** CSS class applied to the active window item */
    activeClass: {
      type: StringConstructor;
      default: 'v-window-item--active';
    };
    
    /** Enables continuous navigation (wrap around) */
    continuous: BooleanConstructor;
    
    /** Forces at least one item to be selected */
    mandatory: {
      type: BooleanConstructor;
      default: true;
    };
    
    /** Icon for next navigation button */
    nextIcon: {
      type: [BooleanConstructor, StringConstructor];
      default: '$next';
    };
    
    /** Icon for previous navigation button */
    prevIcon: {
      type: [BooleanConstructor, StringConstructor];
      default: '$prev';
    };
    
    /** Reverses the transition direction */
    reverse: BooleanConstructor;
    
    /** Shows navigation arrows */
    showArrows: BooleanConstructor;
    
    /** Shows navigation arrows only on hover */
    showArrowsOnHover: BooleanConstructor;
    
    /** Custom touch directive configuration */
    touch: ObjectConstructor;
    
    /** Disables touch gestures */
    touchless: BooleanConstructor;
    
    /** Currently active item value (v-model) */
    value: {
      required: false;
    };
    
    /** Enables vertical transition direction */
    vertical: BooleanConstructor;
  };

  /** Component data */
  data(): {
    /** Internal height of the window container */
    internalHeight: string | undefined;
    /** Height during transition animations */
    transitionHeight: string | undefined;
    /** Number of active transitions */
    transitionCount: number;
    /** Whether the component has finished initial mount */
    isBooted: boolean;
    /** Whether the current transition is reversed */
    isReverse: boolean;
  };

  /** Computed properties */
  computed: {
    /** Whether a transition is currently active */
    isActive(): boolean;
    
    /** CSS classes for the component */
    classes(): Record<string, boolean>;
    
    /** Computed transition name based on direction and reverse state */
    computedTransition(): string;
    
    /** Whether there are any non-disabled items */
    hasActiveItems(): boolean;
    
    /** Whether navigation to next item is possible */
    hasNext(): boolean;
    
    /** Whether navigation to previous item is possible */
    hasPrev(): boolean;
    
    /** Index of the currently active item */
    internalIndex(): number;
    
    /** Computed reverse state considering RTL mode */
    internalReverse(): boolean;
  };

  /** Watchers */
  watch: {
    /**
     * Watches internal index changes to update reverse state
     * @param newIndex - New active index
     * @param oldIndex - Previous active index
     */
    internalIndex(newIndex: number, oldIndex: number): void;
  };

  /** Lifecycle hook - component mounted */
  mounted(): void;

  /** Component methods */
  methods: {
    /**
     * Generates the window container element
     * @returns VNode for the container
     */
    genContainer(): VNode;

    /**
     * Generates a navigation icon button
     * @param direction - Direction identifier ('prev' or 'next')
     * @param icon - Icon identifier
     * @param onClick - Click handler function
     * @returns VNode for the icon button
     */
    genIcon(direction: string, icon: string, onClick: () => void): VNode;

    /**
     * Generates both prev and next control icons
     * @returns Array of VNodes for control icons
     */
    genControlIcons(): VNode[];

    /**
     * Gets the next valid (non-disabled) item index
     * @param currentIndex - Current item index
     * @returns Next valid index
     */
    getNextIndex(currentIndex: number): number;

    /**
     * Gets the previous valid (non-disabled) item index
     * @param currentIndex - Current item index
     * @returns Previous valid index
     */
    getPrevIndex(currentIndex: number): number;

    /**
     * Navigates to the next item
     */
    next(): void;

    /**
     * Navigates to the previous item
     */
    prev(): void;

    /**
     * Determines if the transition should be reversed
     * @param newIndex - New active index
     * @param oldIndex - Previous active index
     * @returns Whether transition should be reversed
     */
    updateReverse(newIndex: number, oldIndex: number): boolean;

    /**
     * Gets the value for a given item
     * @param item - Window item
     * @param index - Item index
     * @returns Item value
     */
    getValue(item: WindowItem, index: number): unknown;
  };

  /**
   * Render function
   * @param createElement - Vue's createElement function
   * @returns Root VNode
   */
  render(createElement: (
    tag: string,
    data: VNodeData,
    children?: VNode[]
  ) => VNode): VNode;
};

export default VWindow;