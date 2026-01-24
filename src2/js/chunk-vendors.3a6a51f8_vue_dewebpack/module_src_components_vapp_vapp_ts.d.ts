/**
 * VApp Component Type Definitions
 * 
 * The root application component that provides theme and RTL support.
 * Must be the ancestor of all Vuetify components.
 * 
 * @module VApp
 */

import Vue, { VNode, CreateElement } from 'vue';

/**
 * Props for the VApp component
 */
export interface VAppProps {
  /**
   * Applies the dark theme variant to the component
   * @default undefined
   */
  dark?: boolean;

  /**
   * Sets the DOM id on the component
   * @default "app"
   */
  id?: string;

  /**
   * Applies the light theme variant to the component
   * @default undefined
   */
  light?: boolean;
}

/**
 * Computed properties for the VApp component
 */
export interface VAppComputed {
  /**
   * Returns whether the dark theme is currently active
   * @returns {boolean} True if dark theme is enabled
   */
  isDark(): boolean;
}

/**
 * Methods for the VApp component
 */
export interface VAppMethods {
  /**
   * Render function that creates the root application wrapper
   * @param {CreateElement} createElement - Vue's createElement function
   * @returns {VNode} The rendered VNode
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VApp Component
 * 
 * The application component that wraps all Vuetify components.
 * Provides theme management, RTL support, and sets up the application context.
 * 
 * @example
 *