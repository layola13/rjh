/**
 * Transitionable Mixin
 * 
 * Provides transition-related props for Vue components.
 * Used to control transition modes, transform origins, and transition effects.
 * 
 * @module mixins/transitionable
 */

import Vue from 'vue';

/**
 * Props interface for the transitionable mixin
 */
export interface TransitionableProps {
  /**
   * Transition mode - controls how enter/leave transitions are coordinated
   * Common values: 'in-out' | 'out-in' | 'default'
   */
  mode?: string;

  /**
   * Transform origin for the transition animation
   * @example 'top left', 'center center', '50% 50%'
   */
  origin?: string;

  /**
   * Name of the transition to apply
   * @example 'fade', 'slide', 'scale'
   */
  transition?: string;
}

/**
 * Transitionable mixin component
 * 
 * A Vue mixin that adds transition-related properties to components,
 * enabling consistent transition behavior across the application.
 */
declare const Transitionable: Vue.VueConstructor<Vue & TransitionableProps>;

export default Transitionable;