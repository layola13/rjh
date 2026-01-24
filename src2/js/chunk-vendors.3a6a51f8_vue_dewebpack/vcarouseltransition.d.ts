/**
 * Vuetify Transitions Module
 * 
 * This module provides a collection of pre-configured Vue transition components
 * for animating elements in Vuetify applications.
 */

import type { Component, FunctionalComponent } from 'vue';

/**
 * Configuration options for simple CSS-based transitions
 */
export interface SimpleTransitionOptions {
  /** CSS class name for the transition */
  name: string;
  /** Transform origin for the transition (e.g., "center center") */
  origin?: string;
  /** Transition mode ("in-out" | "out-in") */
  mode?: 'in-out' | 'out-in';
}

/**
 * Configuration options for JavaScript-based transitions
 */
export interface JavascriptTransitionOptions {
  /** Transition name */
  name: string;
  /** Transition hook handlers */
  hooks: TransitionHooks;
}

/**
 * Vue transition lifecycle hooks
 */
export interface TransitionHooks {
  /** Called before enter transition */
  beforeEnter?: (el: Element) => void;
  /** Called during enter transition */
  enter?: (el: Element, done: () => void) => void;
  /** Called after enter transition completes */
  afterEnter?: (el: Element) => void;
  /** Called when enter transition is cancelled */
  enterCancelled?: (el: Element) => void;
  /** Called before leave transition */
  beforeLeave?: (el: Element) => void;
  /** Called during leave transition */
  leave?: (el: Element, done: () => void) => void;
  /** Called after leave transition completes */
  afterLeave?: (el: Element) => void;
  /** Called when leave transition is cancelled */
  leaveCancelled?: (el: Element) => void;
}

/**
 * Generic transition component type
 */
export type TransitionComponent = Component | FunctionalComponent;

/**
 * Carousel transition - slides content horizontally
 */
export const VCarouselTransition: TransitionComponent;

/**
 * Reverse carousel transition - slides content horizontally in reverse
 */
export const VCarouselReverseTransition: TransitionComponent;

/**
 * Tab transition - horizontal slide for tab content
 */
export const VTabTransition: TransitionComponent;

/**
 * Reverse tab transition - horizontal slide for tab content in reverse
 */
export const VTabReverseTransition: TransitionComponent;

/**
 * Menu transition - scale and fade for dropdown menus
 */
export const VMenuTransition: TransitionComponent;

/**
 * FAB (Floating Action Button) transition - scale from center
 */
export const VFabTransition: TransitionComponent;

/**
 * Dialog transition - scale and fade for modal dialogs
 */
export const VDialogTransition: TransitionComponent;

/**
 * Dialog bottom transition - slide up from bottom for bottom sheets
 */
export const VDialogBottomTransition: TransitionComponent;

/**
 * Fade transition - simple opacity fade in/out
 */
export const VFadeTransition: TransitionComponent;

/**
 * Scale transition - grows/shrinks elements
 */
export const VScaleTransition: TransitionComponent;

/**
 * Scroll X transition - horizontal scroll reveal
 */
export const VScrollXTransition: TransitionComponent;

/**
 * Reverse scroll X transition - horizontal scroll reveal in reverse
 */
export const VScrollXReverseTransition: TransitionComponent;

/**
 * Scroll Y transition - vertical scroll reveal
 */
export const VScrollYTransition: TransitionComponent;

/**
 * Reverse scroll Y transition - vertical scroll reveal in reverse
 */
export const VScrollYReverseTransition: TransitionComponent;

/**
 * Slide X transition - horizontal slide animation
 */
export const VSlideXTransition: TransitionComponent;

/**
 * Reverse slide X transition - horizontal slide animation in reverse
 */
export const VSlideXReverseTransition: TransitionComponent;

/**
 * Slide Y transition - vertical slide animation
 */
export const VSlideYTransition: TransitionComponent;

/**
 * Reverse slide Y transition - vertical slide animation in reverse
 */
export const VSlideYReverseTransition: TransitionComponent;

/**
 * Expand transition - expands height with JavaScript animation
 * Uses getBoundingClientRect to calculate and animate height changes
 */
export const VExpandTransition: TransitionComponent;

/**
 * Expand X transition - expands width with JavaScript animation
 * Uses getBoundingClientRect to calculate and animate width changes
 */
export const VExpandXTransition: TransitionComponent;

/**
 * Collection of all transition subcomponents
 */
export interface TransitionSubcomponents {
  VCarouselTransition: TransitionComponent;
  VCarouselReverseTransition: TransitionComponent;
  VTabTransition: TransitionComponent;
  VTabReverseTransition: TransitionComponent;
  VMenuTransition: TransitionComponent;
  VFabTransition: TransitionComponent;
  VDialogTransition: TransitionComponent;
  VDialogBottomTransition: TransitionComponent;
  VFadeTransition: TransitionComponent;
  VScaleTransition: TransitionComponent;
  VScrollXTransition: TransitionComponent;
  VScrollXReverseTransition: TransitionComponent;
  VScrollYTransition: TransitionComponent;
  VScrollYReverseTransition: TransitionComponent;
  VSlideXTransition: TransitionComponent;
  VSlideXReverseTransition: TransitionComponent;
  VSlideYTransition: TransitionComponent;
  VSlideYReverseTransition: TransitionComponent;
  VExpandTransition: TransitionComponent;
  VExpandXTransition: TransitionComponent;
}

/**
 * Default export containing all transition subcomponents
 * Used internally by Vuetify for component registration
 */
export default interface VuetifyTransitions {
  $_vuetify_subcomponents: TransitionSubcomponents;
}