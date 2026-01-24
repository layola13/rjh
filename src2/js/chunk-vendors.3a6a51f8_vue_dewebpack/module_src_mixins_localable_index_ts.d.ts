/**
 * Localable Mixin
 * 
 * Provides locale management functionality for Vue components.
 * Allows components to use a custom locale or fall back to the global Vuetify locale.
 * 
 * @module Localable
 */

import Vue from 'vue';

/**
 * Props interface for the Localable mixin
 */
export interface LocalableProps {
  /**
   * Custom locale override for this component.
   * If not provided, falls back to the global Vuetify locale.
   * @example 'en', 'zh-CN', 'fr'
   */
  locale?: string;
}

/**
 * Computed properties interface for the Localable mixin
 */
export interface LocalableComputed {
  /**
   * Returns the current active locale for this component.
   * Uses the component's locale prop if provided, otherwise falls back to
   * the global Vuetify language configuration.
   * 
   * @returns The current locale code
   */
  currentLocale: string;
}

/**
 * Localable mixin type definition
 * 
 * This mixin provides locale management for components that need
 * internationalization support within Vuetify applications.
 */
export type Localable = Vue & LocalableProps & LocalableComputed;

/**
 * Localable mixin declaration
 * 
 * Use this mixin to add locale management to your component:
 * 
 * @example
 *