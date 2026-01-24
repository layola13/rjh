import Vue, { VNode, CreateElement } from 'vue';
import { PropType } from 'vue';

/**
 * Props interface for VProgressCircular component
 */
interface VProgressCircularProps {
  /** Whether the progress circular is in button mode (adds extra padding) */
  button: boolean;
  /** Whether to show indeterminate animation */
  indeterminate: boolean;
  /** Rotation angle in degrees */
  rotate: number | string;
  /** Size of the circular progress in pixels */
  size: number | string;
  /** Width of the progress stroke in pixels */
  width: number | string;
  /** Current progress value (0-100) */
  value: number | string;
  /** Color of the progress indicator */
  color?: string;
}

/**
 * Data interface for VProgressCircular component
 */
interface VProgressCircularData {
  /** Internal radius of the circle */
  radius: number;
}

/**
 * Computed properties interface
 */
interface VProgressCircularComputed {
  /** Calculated size including button padding if applicable */
  calculatedSize: number;
  /** Circle circumference based on radius */
  circumference: number;
  /** CSS classes for the component */
  classes: Record<string, boolean>;
  /** Normalized value clamped between 0 and 100 */
  normalizedValue: number;
  /** SVG stroke-dasharray value */
  strokeDashArray: number;
  /** SVG stroke-dashoffset value for progress indicator */
  strokeDashOffset: string;
  /** Calculated stroke width */
  strokeWidth: number;
  /** Container styles */
  styles: Record<string, string>;
  /** SVG rotation styles */
  svgStyles: Record<string, string>;
  /** ViewBox size for SVG */
  viewBoxSize: number;
}

/**
 * Methods interface
 */
interface VProgressCircularMethods {
  /**
   * Generate a circle SVG element
   * @param name - Circle element name (e.g., 'underlay', 'overlay')
   * @param strokeDashOffset - Stroke dash offset value
   * @returns VNode representing the circle element
   */
  genCircle(name: string, strokeDashOffset: number | string): VNode;
  
  /**
   * Generate the SVG container with circles
   * @returns VNode representing the SVG element
   */
  genSvg(): VNode;
  
  /**
   * Generate the info slot container
   * @returns VNode representing the info div
   */
  genInfo(): VNode;
  
  /**
   * Set text color mixin method
   * @param color - Color value
   * @param data - VNode data object
   * @returns Modified VNode data object with color applied
   */
  setTextColor(color: string | undefined, data: any): any;
}

/**
 * VProgressCircular component declaration
 * A circular progress indicator that can be determinate or indeterminate
 */
declare const VProgressCircular: Vue.ComponentOptions<
  Vue,
  VProgressCircularData,
  VProgressCircularMethods,
  VProgressCircularComputed,
  VProgressCircularProps
> & {
  name: 'v-progress-circular';
  props: {
    button: { type: typeof Boolean };
    indeterminate: { type: typeof Boolean };
    rotate: { type: PropType<number | string>; default: number };
    size: { type: PropType<number | string>; default: number };
    width: { type: PropType<number | string>; default: number };
    value: { type: PropType<number | string>; default: number };
  };
  data(): VProgressCircularData;
  computed: {
    calculatedSize(): number;
    circumference(): number;
    classes(): Record<string, boolean>;
    normalizedValue(): number;
    strokeDashArray(): number;
    strokeDashOffset(): string;
    strokeWidth(): number;
    styles(): Record<string, string>;
    svgStyles(): Record<string, string>;
    viewBoxSize(): number;
  };
  methods: VProgressCircularMethods;
  render(createElement: CreateElement): VNode;
};

export default VProgressCircular;