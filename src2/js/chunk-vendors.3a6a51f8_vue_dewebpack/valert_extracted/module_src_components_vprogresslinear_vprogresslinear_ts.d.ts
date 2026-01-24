/**
 * VProgressLinear - A linear progress indicator component
 * Supports determinate, indeterminate, buffer, and query modes
 */

import Vue, { VNode, CreateElement, VNodeData } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * Slot scope data passed to the default slot
 */
interface ProgressLinearSlotScope {
  /** Current progress value (0-100) */
  value: number;
}

/**
 * Component props interface
 */
interface VProgressLinearProps {
  /** Whether the progress bar is active/visible */
  active: boolean;
  /** Background color override (defaults to color prop) */
  backgroundColor: string | null;
  /** Opacity of the background bar (0-1) */
  backgroundOpacity: number | string | null;
  /** Buffer value for buffering mode (0-100) */
  bufferValue: number | string;
  /** Primary color of the progress bar */
  color: string;
  /** Height of the progress bar in pixels */
  height: number | string;
  /** Enable indeterminate animation */
  indeterminate: boolean;
  /** Enable query/pre-loading animation */
  query: boolean;
  /** Reverse the progress direction */
  reverse: boolean;
  /** Apply rounded corners */
  rounded: boolean;
  /** Show streaming animation */
  stream: boolean;
  /** Apply striped pattern */
  striped: boolean;
  /** Current progress value (0-100) */
  value: number | string;
  /** Position absolutely */
  absolute: boolean;
  /** Position fixed */
  fixed: boolean;
  /** Align to top */
  top: boolean;
  /** Align to bottom */
  bottom: boolean;
}

/**
 * Component data interface
 */
interface VProgressLinearData {
  /** Internal lazy-loaded value */
  internalLazyValue: number;
}

/**
 * Computed properties interface
 */
interface VProgressLinearComputed {
  /** Cached background layer VNode */
  __cachedBackground: VNode;
  /** Cached progress bar VNode with transition */
  __cachedBar: VNode;
  /** Cached progress bar type (determinate or indeterminate) */
  __cachedBarType: VNode;
  /** Cached buffer layer VNode */
  __cachedBuffer: VNode;
  /** Cached determinate progress bar VNode */
  __cachedDeterminate: VNode;
  /** Cached indeterminate progress bar VNode */
  __cachedIndeterminate: VNode;
  /** Cached stream effect VNode */
  __cachedStream: VNode | null;
  /** CSS styles for background layer */
  backgroundStyle: {
    opacity: number;
    left?: string;
    right?: string;
    width: string;
  };
  /** CSS classes for root element */
  classes: Record<string, boolean>;
  /** Transition component to use (fade or slide) */
  computedTransition: typeof Vue;
  /** Whether progress direction is reversed (RTL aware) */
  isReversed: boolean;
  /** Normalized buffer value (0-100) */
  normalizedBuffer: number;
  /** Normalized progress value (0-100) */
  normalizedValue: number;
  /** Whether component has reactive click behavior */
  reactive: boolean;
  /** CSS styles for root element */
  styles: {
    height?: number;
    width?: string;
  };
}

/**
 * Component methods interface
 */
interface VProgressLinearMethods {
  /**
   * Generate the content slot wrapper
   * @returns Content VNode or null
   */
  genContent(): VNode | null;

  /**
   * Generate event listeners for root element
   * @returns Event listeners object
   */
  genListeners(): Record<string, Function>;

  /**
   * Generate an indeterminate progress bar segment
   * @param type - Bar type ('long' or 'short')
   * @returns Progress bar VNode
   */
  genProgressBar(type: 'long' | 'short'): VNode;

  /**
   * Handle click events for reactive mode
   * @param event - Mouse click event
   */
  onClick(event: MouseEvent): void;

  /**
   * Normalize a value to 0-100 range
   * @param value - Value to normalize
   * @returns Normalized value
   */
  normalize(value: number | string): number;
}

/**
 * VProgressLinear component instance type
 */
type VProgressLinearInstance = Vue & 
  VProgressLinearProps & 
  VProgressLinearData & 
  VProgressLinearComputed & 
  VProgressLinearMethods & {
    /** Internal proxyable value */
    internalValue: number;
    /** Theme classes mixin */
    themeClasses: Record<string, boolean>;
    /** Set background color utility from colorable mixin */
    setBackgroundColor(color: string | undefined, data: VNodeData): VNodeData;
    /** Set text color utility from colorable mixin */
    setTextColor(color: string | undefined, data: VNodeData): VNodeData;
    /** Vuetify instance */
    $vuetify: {
      rtl: boolean;
    };
  };

/**
 * VProgressLinear component definition
 * A versatile linear progress indicator with multiple display modes
 */
declare const VProgressLinear: {
  new (): VProgressLinearInstance;
  
  /** Component name */
  name: 'v-progress-linear';
  
  /** Component props */
  props: {
    active: PropValidator<boolean> & { default: true };
    backgroundColor: PropValidator<string | null> & { default: null };
    backgroundOpacity: PropValidator<number | string | null> & { default: null };
    bufferValue: PropValidator<number | string> & { default: 100 };
    color: PropValidator<string> & { default: 'primary' };
    height: PropValidator<number | string> & { default: 4 };
    indeterminate: PropValidator<boolean>;
    query: PropValidator<boolean>;
    reverse: PropValidator<boolean>;
    rounded: PropValidator<boolean>;
    stream: PropValidator<boolean>;
    striped: PropValidator<boolean>;
    value: PropValidator<number | string> & { default: 0 };
    absolute: PropValidator<boolean>;
    fixed: PropValidator<boolean>;
    top: PropValidator<boolean>;
    bottom: PropValidator<boolean>;
  };
};

export default VProgressLinear;