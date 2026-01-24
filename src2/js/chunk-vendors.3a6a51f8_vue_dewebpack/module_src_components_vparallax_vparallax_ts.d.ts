/**
 * VParallax Component
 * A parallax scrolling component that creates a depth effect with background images
 */

import Vue, { VNode, CreateElement } from 'vue';

/**
 * Component props interface
 */
interface VParallaxProps {
  /**
   * Alternative text for the parallax image (for accessibility)
   * @default ""
   */
  alt: string;
  
  /**
   * Height of the parallax container in pixels
   * @default 500
   */
  height: string | number;
  
  /**
   * Source URL of the parallax image
   */
  src?: string;
  
  /**
   * Srcset attribute for responsive images
   */
  srcset?: string;
}

/**
 * Component data interface
 */
interface VParallaxData {
  /**
   * Flag indicating whether the component has been initialized
   */
  isBooted: boolean;
}

/**
 * Computed properties interface
 */
interface VParallaxComputed {
  /**
   * Computed styles for the parallax image
   * Includes display, opacity, and transform properties
   */
  styles: {
    display: string;
    opacity: number;
    transform: string;
  };
}

/**
 * Component methods interface
 */
interface VParallaxMethods {
  /**
   * Initializes the parallax effect
   * Sets up image load listeners and translation
   */
  init(): void;
  
  /**
   * Returns the natural height of the parallax image
   * @returns The natural height in pixels
   */
  objHeight(): number;
  
  /**
   * Translates the image position for parallax effect
   * (Inherited from translatable mixin)
   */
  translate(): void;
  
  /**
   * Registers scroll/resize listeners for parallax effect
   * (Inherited from translatable mixin)
   */
  listeners(): void;
  
  /**
   * Parallax offset value in pixels
   * (Inherited from translatable mixin)
   */
  parallax: number;
}

/**
 * Component refs interface
 */
interface VParallaxRefs {
  /**
   * Reference to the img element
   */
  img: HTMLImageElement;
}

/**
 * VParallax Component Declaration
 * Provides a parallax scrolling effect for background images
 */
declare const VParallax: {
  new (): Vue & VParallaxProps & VParallaxData & VParallaxComputed & VParallaxMethods & {
    $refs: VParallaxRefs;
  };
  
  name: 'v-parallax';
  
  props: {
    alt: {
      type: typeof String;
      default: string;
    };
    height: {
      type: [typeof String, typeof Number];
      default: number;
    };
    src: typeof String;
    srcset: typeof String;
  };
  
  data(this: Vue): VParallaxData;
  
  computed: {
    styles(this: Vue & VParallaxData & VParallaxMethods): VParallaxComputed['styles'];
  };
  
  mounted(this: Vue & VParallaxMethods): void;
  
  methods: {
    init(this: Vue & VParallaxData & VParallaxMethods & { $refs: VParallaxRefs }): void;
    objHeight(this: Vue & { $refs: VParallaxRefs }): number;
  };
  
  render(this: Vue & VParallaxProps & VParallaxComputed, createElement: CreateElement): VNode;
};

export default VParallax;