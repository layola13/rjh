/**
 * VProgressLinear Component Type Definitions
 * A linear progress indicator component with support for determinate, indeterminate, buffered, and streamed modes.
 */

import Vue, { VNode, VNodeData, CreateElement } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Slot scope data passed to the default slot
 */
export interface VProgressLinearSlotScope {
  /** Current progress value (0-100) */
  value: number;
}

/**
 * Props for VProgressLinear component
 */
export interface VProgressLinearProps {
  /** Whether the progress bar is actively animating */
  active?: boolean;
  
  /** Absolute positioning */
  absolute?: boolean;
  
  /** Fixed positioning */
  fixed?: boolean;
  
  /** Position at top of container */
  top?: boolean;
  
  /** Position at bottom of container */
  bottom?: boolean;
  
  /** Background color override (defaults to component color if not specified) */
  backgroundColor?: string | null;
  
  /** Opacity of the background bar (0-1). Defaults to 1 if backgroundColor is set, 0.3 otherwise */
  backgroundOpacity?: number | string | null;
  
  /** Buffer value for buffered progress mode (0-100) */
  bufferValue?: number | string;
  
  /** Color of the progress bar */
  color?: string;
  
  /** Height of the progress bar in pixels */
  height?: number | string;
  
  /** Show indeterminate animation (ignores value prop) */
  indeterminate?: boolean;
  
  /** Query mode - shows reversed indeterminate animation */
  query?: boolean;
  
  /** Reverse the progress bar direction */
  reverse?: boolean;
  
  /** Apply rounded corners to the progress bar */
  rounded?: boolean;
  
  /** Show stream indicator at the end of buffer */
  stream?: boolean;
  
  /** Apply striped pattern to the progress bar */
  striped?: boolean;
  
  /** Current progress value (0-100) */
  value?: number | string;
  
  /** Dark theme variant */
  dark?: boolean;
  
  /** Light theme variant */
  light?: boolean;
}

/**
 * Computed properties interface
 */
export interface VProgressLinearComputed {
  /** Cached background bar VNode */
  __cachedBackground: VNode;
  
  /** Cached progress bar with transition wrapper */
  __cachedBar: VNode;
  
  /** Cached progress bar type (determinate or indeterminate) */
  __cachedBarType: VNode;
  
  /** Cached buffer bar VNode */
  __cachedBuffer: VNode;
  
  /** Cached determinate progress bar VNode */
  __cachedDeterminate: VNode;
  
  /** Cached indeterminate progress bar VNode */
  __cachedIndeterminate: VNode;
  
  /** Cached stream indicator VNode */
  __cachedStream: VNode | null;
  
  /** Computed styles for background bar */
  backgroundStyle: Partial<CSSStyleDeclaration> & {
    opacity: number;
    left?: string;
    right?: string;
    width: string;
  };
  
  /** Component CSS classes */
  classes: Record<string, boolean>;
  
  /** Transition component to use based on mode */
  computedTransition: VueConstructor;
  
  /** Whether progress direction is reversed (considering RTL) */
  isReversed: boolean;
  
  /** Normalized buffer value (clamped 0-100) */
  normalizedBuffer: number;
  
  /** Normalized current value (clamped 0-100) */
  normalizedValue: number;
  
  /** Whether component is in reactive/clickable mode */
  reactive: boolean;
  
  /** Computed styles for buffer bar */
  styles: {
    height?: number;
    width?: string;
  };
}

/**
 * Component data interface
 */
export interface VProgressLinearData {
  /** Internal lazy value for v-model support */
  internalLazyValue: number;
}

/**
 * Component methods interface
 */
export interface VProgressLinearMethods {
  /**
   * Generate content slot wrapper
   * @returns VNode with default slot content or null
   */
  genContent(): VNode | null;
  
  /**
   * Generate event listeners object
   * @returns Event listeners with optional click handler
   */
  genListeners(): Record<string, Function>;
  
  /**
   * Generate individual progress bar for indeterminate mode
   * @param type - Bar type identifier ('long' or 'short')
   * @returns VNode for progress bar
   */
  genProgressBar(type: 'long' | 'short'): VNode;
  
  /**
   * Handle click event for reactive mode
   * @param event - Mouse click event
   */
  onClick(event: MouseEvent): void;
  
  /**
   * Normalize value to 0-100 range
   * @param value - Value to normalize
   * @returns Clamped value between 0 and 100
   */
  normalize(value: number | string): number;
}

/**
 * VProgressLinear component instance type
 */
export interface VProgressLinear extends Vue, VProgressLinearData, VProgressLinearComputed, VProgressLinearMethods {
  $props: VProgressLinearProps;
  
  /**
   * Internal value with proxyable mixin support
   */
  internalValue: number;
}

/**
 * VProgressLinear component constructor
 */
declare const VProgressLinear: VueConstructor<VProgressLinear> & {
  options: {
    name: 'v-progress-linear';
    props: VProgressLinearProps;
  };
};

export default VProgressLinear;