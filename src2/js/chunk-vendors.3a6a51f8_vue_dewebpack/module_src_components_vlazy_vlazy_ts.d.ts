import { VNode, VNodeData } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * Intersection Observer options interface
 */
export interface IntersectionObserverOptions {
  /**
   * The element that is used as the viewport for checking visibility of the target.
   * Must be an ancestor of the target. Defaults to the browser viewport if not specified or if null.
   */
  root?: Element | null;
  
  /**
   * Margin around the root. Can have values similar to CSS margin property.
   * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
   */
  rootMargin?: string;
  
  /**
   * Either a single number or an array of numbers which indicate at what percentage
   * of the target's visibility the observer's callback should be executed.
   */
  threshold?: number | number[];
}

/**
 * Intersection observer callback parameters
 */
export interface IntersectionObserveHandler {
  (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    isIntersecting: boolean
  ): void;
}

/**
 * VLazy component props
 */
export interface VLazyProps {
  /**
   * Height of the component
   */
  height?: number | string;
  
  /**
   * Maximum height of the component
   */
  maxHeight?: number | string;
  
  /**
   * Maximum width of the component
   */
  maxWidth?: number | string;
  
  /**
   * Minimum height of the component
   */
  minHeight?: number | string;
  
  /**
   * Minimum width of the component
   */
  minWidth?: number | string;
  
  /**
   * Width of the component
   */
  width?: number | string;
  
  /**
   * Intersection Observer API options for controlling when the component becomes active
   */
  options?: IntersectionObserverOptions;
  
  /**
   * The HTML tag to use for the root element
   * @default 'div'
   */
  tag?: string;
  
  /**
   * The transition to use when content becomes visible
   * @default 'fade-transition'
   */
  transition?: string;
  
  /**
   * Controls whether the component is active/visible
   */
  value?: boolean;
}

/**
 * VLazy component - A lazy loading wrapper that uses Intersection Observer
 * to defer rendering content until it enters the viewport.
 * 
 * Combines measurable and toggleable mixins to provide:
 * - Dimension control (height, width, min/max values)
 * - Active state management
 * - Intersection observer integration
 * - Optional transition animations
 */
declare const VLazy: {
  name: 'VLazy';
  
  props: {
    options: PropType<IntersectionObserverOptions>;
    tag: PropType<string>;
    transition: PropType<string>;
    height: PropType<number | string>;
    maxHeight: PropType<number | string>;
    maxWidth: PropType<number | string>;
    minHeight: PropType<number | string>;
    minWidth: PropType<number | string>;
    width: PropType<number | string>;
    value: PropType<boolean>;
  };
  
  computed: {
    /**
     * Computed styles based on measurable properties
     */
    styles(): Partial<CSSStyleDeclaration>;
  };
  
  methods: {
    /**
     * Generates the content to be rendered, wrapped in a transition if specified
     */
    genContent(): VNode | VNode[];
    
    /**
     * Intersection observer callback - activates component when intersecting
     */
    onObserve(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
      isIntersecting: boolean
    ): void;
  };
  
  /**
   * Render function - creates the root element with intersection observer directive
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
};

export default VLazy;