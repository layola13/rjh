/**
 * VCarousel module - Carousel component for rotating through elements
 * @module VCarousel
 */

import type { Component, DefineComponent } from 'vue';

/**
 * Props for VCarousel component
 */
export interface VCarouselProps {
  /** Active slide index */
  modelValue?: number;
  /** Show navigation arrows */
  showArrows?: boolean | 'hover';
  /** Show navigation dots */
  showDelimiters?: boolean;
  /** Auto-advance slides */
  cycle?: boolean;
  /** Interval for auto-advance (milliseconds) */
  interval?: number;
  /** Slide transition direction */
  direction?: 'horizontal' | 'vertical';
  /** Carousel height */
  height?: string | number;
  /** Hide delimiters background */
  hideDelimiterBackground?: boolean;
  /** Continuous sliding */
  continuous?: boolean;
  /** Reverse slide direction */
  reverse?: boolean;
}

/**
 * VCarousel - Main carousel container component
 * Displays a rotating carousel of items with navigation controls
 */
export declare const VCarousel: DefineComponent<VCarouselProps>;

/**
 * Props for VCarouselItem component
 */
export interface VCarouselItemProps {
  /** Item value/identifier */
  value?: unknown;
  /** Transition effect */
  transition?: string;
  /** Reverse transition effect */
  reverseTransition?: string;
  /** Eager loading */
  eager?: boolean;
}

/**
 * VCarouselItem - Individual carousel slide component
 * Represents a single slide within the VCarousel
 */
export declare const VCarouselItem: DefineComponent<VCarouselItemProps>;

/**
 * Default export containing all carousel subcomponents
 */
export interface VCarouselModule {
  /** Internal Vuetify subcomponents registry */
  $_vuetify_subcomponents: {
    /** VCarousel component */
    VCarousel: typeof VCarousel;
    /** VCarouselItem component */
    VCarouselItem: typeof VCarouselItem;
  };
}

declare const _default: VCarouselModule;
export default _default;