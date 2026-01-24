/**
 * Transitionable Mixin
 * 
 * A Vue mixin that provides transition-related properties for components.
 * This mixin enables components to configure CSS transitions with customizable
 * mode, origin, and transition timing.
 * 
 * @module TransitionableMixin
 */

import Vue from 'vue';

/**
 * Props interface for the Transitionable mixin
 */
export interface TransitionableProps {
  /**
   * Transition mode - controls how entering/leaving transitions are sequenced
   * Common values: 'in-out', 'out-in', or 'default'
   */
  mode?: string;

  /**
   * Transform origin point for the transition
   * @example 'top left', 'center', '50% 50%'
   */
  origin?: string;

  /**
   * Transition name or custom transition class
   * Used to apply specific CSS transition styles
   */
  transition?: string;
}

/**
 * Transitionable mixin type definition
 */
export interface TransitionableMixin extends Vue {
  mode?: string;
  origin?: string;
  transition?: string;
}

/**
 * Default export: Vue mixin that adds transition configuration props
 * 
 * @example
 *