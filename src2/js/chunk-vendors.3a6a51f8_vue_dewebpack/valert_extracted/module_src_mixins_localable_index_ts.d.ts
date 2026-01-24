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
   * Custom locale override for this component instance.
   * If not provided, will use the global Vuetify locale.
   * 
   * @example 'en', 'zh-CN', 'ja'
   */
  locale?: string;
}

/**
 * Computed properties interface for the Localable mixin
 */
export interface LocalableComputed {
  /**
   * Returns the current active locale.
   * Uses the component's locale prop if provided, otherwise falls back to $vuetify.lang.current
   * 
   * @returns The active locale string
   */
  currentLocale: string;
}

/**
 * Localable mixin type definition
 */
export type Localable = Vue & LocalableProps & LocalableComputed;

/**
 * Vue mixin that adds locale management capabilities to components.
 * 
 * @example
 *