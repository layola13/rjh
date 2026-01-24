/**
 * VImg Component Type Definitions
 * A responsive image component with lazy loading, placeholder, and transition support
 */

import Vue, { VNode, VNodeData, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * Image source object configuration
 */
export interface ImageSource {
  /** Primary image source URL */
  src: string;
  /** Responsive image srcset attribute */
  srcset?: string;
  /** Low-quality placeholder image source for lazy loading */
  lazySrc?: string;
  /** Aspect ratio of the image */
  aspect?: number;
}

/**
 * Intersection Observer options for lazy loading
 */
export interface IntersectionObserverOptions {
  /** The element that is used as the viewport for checking visibility */
  root?: Element | null;
  /** Margin around the root element */
  rootMargin?: string;
  /** Threshold(s) at which to trigger callback */
  threshold?: number | number[];
}

/**
 * VImg component data interface
 */
export interface VImgData {
  /** Currently displayed image source */
  currentSrc: string;
  /** Reference to the loaded Image element */
  image: HTMLImageElement | null;
  /** Whether the image is currently loading */
  isLoading: boolean;
  /** Calculated aspect ratio from the loaded image */
  calculatedAspectRatio: number | undefined;
  /** Natural width of the loaded image */
  naturalWidth: number | undefined;
  /** Whether an error occurred during image loading */
  hasError: boolean;
}

/**
 * VImg component props interface
 */
export interface VImgProps {
  /** Alternative text for the image */
  alt?: string;
  /** Forces image to use contain fit instead of cover */
  contain?: boolean;
  /** Loads image immediately, bypassing lazy loading */
  eager?: boolean;
  /** CSS gradient overlay on the image */
  gradient?: string;
  /** Low-quality placeholder image URL for lazy loading */
  lazySrc?: string;
  /** Intersection Observer options for lazy loading */
  options?: IntersectionObserverOptions;
  /** CSS background-position value */
  position?: string;
  /** Responsive image sizes attribute */
  sizes?: string;
  /** Image source URL or source object */
  src?: string | ImageSource;
  /** Responsive image srcset attribute */
  srcset?: string;
  /** Transition name to use when image loads, or false to disable */
  transition?: boolean | string;
  /** Aspect ratio for the image container */
  aspectRatio?: string | number;
}

/**
 * Normalized image source structure
 */
export interface NormalisedImageSource {
  /** Primary image source URL */
  src: string;
  /** Responsive image srcset attribute */
  srcset: string | undefined;
  /** Low-quality placeholder image source */
  lazySrc: string | undefined;
  /** Numeric aspect ratio value */
  aspect: number;
}

/**
 * VImg Component
 * 
 * A responsive image component with built-in lazy loading using Intersection Observer,
 * placeholder support, gradient overlays, and customizable transitions.
 * 
 * @example
 *