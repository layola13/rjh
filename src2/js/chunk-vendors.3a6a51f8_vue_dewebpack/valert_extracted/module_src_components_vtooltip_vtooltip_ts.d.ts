import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * VTooltip Component Type Definitions
 * 
 * A versatile tooltip component that displays contextual information
 * when hovering over or focusing an activator element.
 */

/** Tooltip position type */
export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

/** Transition name type */
export type TransitionName = 'scale-transition' | 'fade-transition' | string;

/** Attach target type */
export type AttachTarget = boolean | string | Element;

/**
 * Dimensions interface for tooltip positioning calculations
 */
export interface TooltipDimensions {
  /** Activator element dimensions */
  activator: {
    offsetLeft: number;
    offsetTop: number;
    left: number;
    top: number;
    width: number;
    height: number;
  };
  /** Content element dimensions */
  content: {
    width: number;
    height: number;
  };
}

/**
 * Activator event listeners interface
 */
export interface ActivatorListeners {
  focus?: (event: FocusEvent) => void;
  blur?: (event: FocusEvent) => void;
  keydown?: (event: KeyboardEvent) => void;
  click?: (event: MouseEvent) => void;
  mouseenter?: (event: MouseEvent) => void;
  mouseleave?: (event: MouseEvent) => void;
}

/**
 * Activator attributes interface
 */
export interface ActivatorAttributes {
  'aria-haspopup': boolean;
  'aria-expanded': string;
}

/**
 * Component data interface
 */
export interface VTooltipData {
  /** Calculated minimum width for the tooltip */
  calculatedMinWidth: number;
  /** Whether to close dependent elements */
  closeDependents: boolean;
}

/**
 * Computed styles interface
 */
export interface TooltipStyles {
  left: string;
  maxWidth?: string;
  minWidth?: string;
  opacity: number;
  top: string;
  zIndex?: number | string;
}

/**
 * VTooltip Component Props
 */
export interface VTooltipProps {
  /** Delay in milliseconds before tooltip closes */
  closeDelay?: number | string;
  
  /** Disables the tooltip */
  disabled?: boolean;
  
  /** Uses fixed positioning for the tooltip */
  fixed?: boolean;
  
  /** Delay in milliseconds before tooltip opens */
  openDelay?: number | string;
  
  /** Opens tooltip on hover */
  openOnHover?: boolean;
  
  /** HTML tag to use for the root element */
  tag?: string;
  
  /** Transition name to use for show/hide animation */
  transition?: string;
  
  /** Tooltip background color */
  color?: string;
  
  /** Position the tooltip at the top */
  top?: boolean;
  
  /** Position the tooltip at the right */
  right?: boolean;
  
  /** Position the tooltip at the bottom */
  bottom?: boolean;
  
  /** Position the tooltip at the left */
  left?: boolean;
  
  /** Specifies which DOM element the tooltip should detach to */
  attach?: AttachTarget;
  
  /** Maximum width of the tooltip */
  maxWidth?: number | string;
  
  /** Minimum width of the tooltip */
  minWidth?: number | string;
  
  /** Moves the tooltip left by specified pixels */
  nudgeLeft?: number | string;
  
  /** Moves the tooltip right by specified pixels */
  nudgeRight?: number | string;
  
  /** Moves the tooltip up by specified pixels */
  nudgeTop?: number | string;
  
  /** Moves the tooltip down by specified pixels */
  nudgeBottom?: number | string;
  
  /** Controls visibility of the tooltip */
  value?: boolean;
  
  /** Z-index of the tooltip */
  zIndex?: number | string;
  
  /** CSS class to apply to the content element */
  contentClass?: string;
  
  /** Page Y offset for positioning calculations */
  pageYOffset?: number;
}

/**
 * VTooltip Component Instance
 */
export interface VTooltip extends Vue {
  // Props
  closeDelay: number | string;
  disabled: boolean;
  fixed: boolean;
  openDelay: number | string;
  openOnHover: boolean;
  tag: string;
  transition?: string;
  color?: string;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  attach?: AttachTarget;
  maxWidth?: number | string;
  minWidth?: number | string;
  nudgeLeft?: number | string;
  nudgeRight?: number | string;
  nudgeTop?: number | string;
  nudgeBottom?: number | string;
  value?: boolean;
  zIndex?: number | string;
  contentClass?: string;
  pageYOffset?: number;

  // Data
  calculatedMinWidth: number;
  closeDependents: boolean;

  // Computed
  readonly calculatedLeft: string;
  readonly calculatedTop: string;
  readonly classes: Record<string, boolean>;
  readonly computedTransition: TransitionName;
  readonly offsetY: boolean;
  readonly offsetX: boolean;
  readonly styles: TooltipStyles;
  readonly dimensions: TooltipDimensions;
  readonly isActive: boolean;
  readonly activeZIndex: number;
  readonly isContentActive: boolean;
  readonly activatorFixed: boolean;

  // Methods
  /**
   * Activates the tooltip
   */
  activate(): void;

  /**
   * Deactivates the tooltip
   */
  deactivate(): void;

  /**
   * Generates event listeners for the activator element
   */
  genActivatorListeners(): ActivatorListeners;

  /**
   * Generates ARIA attributes for the activator element
   */
  genActivatorAttributes(): ActivatorAttributes;

  /**
   * Generates the transition wrapper VNode
   */
  genTransition(): VNode;

  /**
   * Generates the tooltip content VNode
   */
  genContent(): VNode;

  /**
   * Updates the dimensions for positioning calculations
   */
  updateDimensions(): void;

  /**
   * Starts the transition animation
   */
  startTransition(): void;

  /**
   * Runs open or close delay
   */
  runDelay(type: 'open' | 'close'): void;

  /**
   * Gets the activator element
   */
  getActivator(event?: Event): HTMLElement | undefined;

  /**
   * Calculates X-axis overflow
   */
  calcXOverflow(left: number, width: number): number;

  /**
   * Calculates Y-axis overflow
   */
  calcYOverflow(top: number): number;

  /**
   * Sets background color (from colorable mixin)
   */
  setBackgroundColor(color: string | undefined, data: VNodeData): VNodeData;

  /**
   * Gets scope ID attributes
   */
  getScopeIdAttrs(): Record<string, string>;

  /**
   * Gets the content slot VNodes
   */
  getContentSlot(): VNode[];

  /**
   * Generates the activator VNode
   */
  genActivator(): VNode;

  /**
   * Shows lazy content
   */
  showLazyContent(fn: () => VNode[]): VNode[];

  /**
   * Calls activate method
   */
  callActivate(): void;
}

/**
 * VTooltip Component Declaration
 * 
 * @example
 * <v-tooltip top>
 *   <template v-slot:activator="{ on, attrs }">
 *     <v-btn v-bind="attrs" v-on="on">
 *       Hover me
 *     </v-btn>
 *   </template>
 *   <span>Tooltip content</span>
 * </v-tooltip>
 */
declare const VTooltip: {
  new (): VTooltip;
};

export default VTooltip;