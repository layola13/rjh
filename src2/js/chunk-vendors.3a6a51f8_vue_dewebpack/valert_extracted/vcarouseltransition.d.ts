/**
 * Vuetify Transitions Module
 * Provides a collection of Vue transition components for various animation effects
 */

import { VNode } from 'vue';
import { Component } from 'vue/types/options';

/**
 * Base transition component type
 */
export type TransitionComponent = Component;

/**
 * Transition mode for Vue transitions
 */
export type TransitionMode = 'in-out' | 'out-in' | undefined;

/**
 * Transform origin for transitions
 */
export type TransformOrigin = string;

/**
 * Carousel slide transition component
 * Used for horizontal carousel animations
 */
export const VCarouselTransition: TransitionComponent;

/**
 * Reverse carousel slide transition component
 * Used for horizontal carousel animations in reverse direction
 */
export const VCarouselReverseTransition: TransitionComponent;

/**
 * Tab switching transition component
 * Used for tab navigation animations
 */
export const VTabTransition: TransitionComponent;

/**
 * Reverse tab switching transition component
 * Used for tab navigation animations in reverse direction
 */
export const VTabReverseTransition: TransitionComponent;

/**
 * Menu appear/disappear transition component
 * Used for dropdown menu animations
 */
export const VMenuTransition: TransitionComponent;

/**
 * Floating Action Button transition component
 * Centers the transition with out-in mode
 */
export const VFabTransition: TransitionComponent;

/**
 * Dialog modal transition component
 * Used for dialog/modal window animations
 */
export const VDialogTransition: TransitionComponent;

/**
 * Bottom sheet dialog transition component
 * Used for bottom sheet style dialog animations
 */
export const VDialogBottomTransition: TransitionComponent;

/**
 * Fade in/out transition component
 * Simple opacity-based transition
 */
export const VFadeTransition: TransitionComponent;

/**
 * Scale transition component
 * Scales element size during transition
 */
export const VScaleTransition: TransitionComponent;

/**
 * Horizontal scroll transition component
 * Scrolls content horizontally
 */
export const VScrollXTransition: TransitionComponent;

/**
 * Reverse horizontal scroll transition component
 * Scrolls content horizontally in reverse direction
 */
export const VScrollXReverseTransition: TransitionComponent;

/**
 * Vertical scroll transition component
 * Scrolls content vertically
 */
export const VScrollYTransition: TransitionComponent;

/**
 * Reverse vertical scroll transition component
 * Scrolls content vertically in reverse direction
 */
export const VScrollYReverseTransition: TransitionComponent;

/**
 * Horizontal slide transition component
 * Slides content horizontally
 */
export const VSlideXTransition: TransitionComponent;

/**
 * Reverse horizontal slide transition component
 * Slides content horizontally in reverse direction
 */
export const VSlideXReverseTransition: TransitionComponent;

/**
 * Vertical slide transition component
 * Slides content vertically
 */
export const VSlideYTransition: TransitionComponent;

/**
 * Reverse vertical slide transition component
 * Slides content vertically in reverse direction
 */
export const VSlideYReverseTransition: TransitionComponent;

/**
 * Expand/collapse transition component
 * Animates height changes with JavaScript
 */
export const VExpandTransition: TransitionComponent;

/**
 * Horizontal expand/collapse transition component
 * Animates width changes with JavaScript
 */
export const VExpandXTransition: TransitionComponent;

/**
 * Default export containing all transition subcomponents
 */
export default interface VuetifyTransitions {
  /**
   * Internal Vuetify subcomponents registry
   */
  $_vuetify_subcomponents: {
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
  };
}