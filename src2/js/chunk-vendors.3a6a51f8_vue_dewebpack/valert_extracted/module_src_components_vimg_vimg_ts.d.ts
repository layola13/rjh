/**
 * VImg - Vuetify Image Component
 * 
 * A responsive image component with lazy loading, intersection observer support,
 * aspect ratio management, and transition effects.
 */

import Vue, { VNode, CreateElement } from 'vue';
import { DirectiveOptions } from 'vue/types/options';

/**
 * Image source configuration object
 */
export interface ImageSourceObject {
  /** Main image source URL */
  src: string;
  /** Responsive image srcset attribute */
  srcset?: string;
  /** Low-quality placeholder image source for lazy loading */
  lazySrc?: string;
  /** Aspect ratio of the image (width / height) */
  aspect?: number;
}

/**
 * Intersection Observer options for lazy loading
 */
export interface IntersectionObserverOptions {
  /** The element used as the viewport for visibility checking */
  root?: Element | null;
  /** Margin around the root element */
  rootMargin?: string;
  /** Threshold(s) at which to trigger intersection callbacks */
  threshold?: number | number[];
}

/**
 * Component data structure
 */
export interface VImgData {
  /** Currently displayed image source URL */
  currentSrc: string;
  /** Reference to the underlying Image element */
  image: HTMLImageElement | null;
  /** Whether the image is currently loading */
  isLoading: boolean;
  /** Calculated aspect ratio from loaded image dimensions */
  calculatedAspectRatio: number | undefined;
  /** Natural width of the loaded image in pixels */
  naturalWidth: number | undefined;
  /** Whether an error occurred during image loading */
  hasError: boolean;
}

/**
 * Computed properties interface
 */
export interface VImgComputed {
  /** Final computed aspect ratio (from props or calculated) */
  computedAspectRatio: number;
  /** Normalized image source object with all properties */
  normalisedSrc: {
    src: string;
    srcset?: string;
    lazySrc?: string;
    aspect: number;
  };
  /** Cached virtual node for the image background element */
  __cachedImage: VNode | VNode[];
}

/**
 * Component methods interface
 */
export interface VImgMethods {
  /**
   * Initialize image loading based on intersection observer or eager loading
   * @param entry - IntersectionObserver entry (unused)
   * @param observer - IntersectionObserver instance (unused)
   * @param isUpdate - Whether this is triggered by a prop update
   */
  init(entry?: IntersectionObserverEntry, observer?: IntersectionObserver, isUpdate?: boolean): void;

  /**
   * Handle successful image load event
   */
  onLoad(): void;

  /**
   * Handle image load error event
   */
  onError(): void;

  /**
   * Update currentSrc from the loaded image element
   */
  getSrc(): void;

  /**
   * Create and configure Image element for loading
   */
  loadImage(): void;

  /**
   * Poll for image dimensions when aspectRatio is not provided
   * @param image - The Image element to poll
   * @param pollInterval - Polling interval in milliseconds (default: 100)
   */
  pollForSize(image: HTMLImageElement, pollInterval?: number | null): void;

  /**
   * Generate the content slot wrapper element
   */
  genContent(): VNode;

  /**
   * Generate the placeholder slot wrapper with transition
   */
  __genPlaceholder(): VNode | VNode[] | undefined;
}

/**
 * VImg Component Props
 */
export interface VImgProps {
  /** Alt text for accessibility */
  alt?: string;
  /** Use contain instead of cover for background-size */
  contain?: boolean;
  /** Load image immediately instead of lazy loading */
  eager?: boolean;
  /** CSS gradient overlay (e.g., "to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)") */
  gradient?: string;
  /** Low-resolution placeholder image for lazy loading */
  lazySrc?: string;
  /** IntersectionObserver configuration options */
  options?: IntersectionObserverOptions;
  /** CSS background-position value */
  position?: string;
  /** Responsive image sizes attribute */
  sizes?: string;
  /** Image source URL or source object */
  src?: string | ImageSourceObject;
  /** Responsive image srcset attribute */
  srcset?: string;
  /** Transition name or false to disable */
  transition?: boolean | string;
}

/**
 * VImg Component
 * 
 * Extends VResponsive with image-specific functionality including:
 * - Lazy loading with IntersectionObserver
 * - Placeholder images during load
 * - Error handling
 * - Automatic aspect ratio calculation
 * - Theme support
 * - Gradient overlays
 */
declare const VImg: Vue & {
  /** Component name */
  readonly name: 'v-img';
  
  /** Component props */
  readonly $props: VImgProps;
  
  /** Component data */
  readonly $data: VImgData;
  
  /** Component computed properties */
  readonly $computed: VImgComputed;
  
  /** Component methods */
  readonly $methods: VImgMethods;
  
  /**
   * Emitted when image successfully loads
   * @event load
   * @param src - The source that was loaded
   */
  $emit(event: 'load', src: string | ImageSourceObject): this;
  
  /**
   * Emitted when image fails to load
   * @event error
   * @param src - The source that failed to load
   */
  $emit(event: 'error', src: string | ImageSourceObject): this;
};

export default VImg;