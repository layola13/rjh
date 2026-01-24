import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * Props for VWindowItem component
 */
interface VWindowItemProps {
  /** Whether the window item is disabled */
  disabled?: boolean;
  /** Transition to use when reversing (moving backwards) */
  reverseTransition?: boolean | string;
  /** Transition to use when moving forward */
  transition?: boolean | string;
  /** The value used for groupable registration */
  value?: any;
}

/**
 * Data state for VWindowItem component
 */
interface VWindowItemData {
  /** Whether this item is currently active in the window */
  isActive: boolean;
  /** Whether this item is currently transitioning */
  inTransition: boolean;
}

/**
 * Computed properties for VWindowItem component
 */
interface VWindowItemComputed {
  /** CSS classes from the groupable mixin */
  classes: Record<string, boolean>;
  /** Resolved transition name based on direction and props */
  computedTransition: string | undefined;
}

/**
 * WindowGroup instance reference (injected by groupable mixin)
 */
interface WindowGroup {
  /** Whether the window is currently reversing direction */
  internalReverse: boolean;
  /** Default transition name for the window group */
  computedTransition: string;
  /** Number of currently active transitions */
  transitionCount: number;
  /** Stored height during transition */
  transitionHeight?: string | number;
  /** Root element reference */
  $el: HTMLElement;
}

/**
 * Methods for VWindowItem component
 */
interface VWindowItemMethods {
  /**
   * Generates the default slot content
   * @returns Array of VNodes from default slot
   */
  genDefaultSlot(): VNode[] | undefined;

  /**
   * Generates the main window item wrapper element
   * @returns VNode for the window item container
   */
  genWindowItem(): VNode;

  /**
   * Called after transition completes
   * Decrements transition counter and cleans up transition height
   */
  onAfterTransition(): void;

  /**
   * Called before transition starts
   * Increments transition counter and stores initial height
   */
  onBeforeTransition(): void;

  /**
   * Called when transition is cancelled
   * Performs same cleanup as onAfterTransition
   */
  onTransitionCancelled(): void;

  /**
   * Called during enter transition
   * Updates transition height to match entering element
   * @param element - The DOM element being transitioned in
   */
  onEnter(element: HTMLElement): void;
}

/**
 * VWindowItem component instance type
 * Provides individual slides/pages within a VWindow carousel
 */
declare const VWindowItem: {
  new (): Vue & {
    /** Component props */
    readonly $props: VWindowItemProps;
    /** Component data */
    readonly $data: VWindowItemData;
    /** Computed properties */
    readonly classes: Record<string, boolean>;
    readonly computedTransition: string | undefined;
    /** Reference to parent window group */
    readonly windowGroup: WindowGroup;
    /** Methods from groupable mixin */
    readonly groupClasses: Record<string, boolean>;
    /** Methods from bootable mixin */
    showLazyContent(content: () => VNode[]): VNode[];
  } & VWindowItemMethods;
};

export default VWindowItem;