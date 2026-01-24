/**
 * Filterable Mixin
 * 
 * A Vue mixin that provides filterable functionality with customizable no-data text.
 * This mixin extends Vue components with props for handling empty/filtered states.
 * 
 * @module Filterable
 */

import Vue from 'vue';

/**
 * Props interface for the Filterable mixin
 */
export interface FilterableProps {
  /**
   * Text to display when no data is available.
   * Supports i18n key format (e.g., "$vuetify.noDataText")
   * @default "$vuetify.noDataText"
   */
  noDataText?: string;
}

/**
 * Filterable mixin component interface
 */
export interface FilterableMixin extends Vue {
  /** Text to display when no data is available */
  noDataText: string;
}

/**
 * Filterable mixin - provides no-data text functionality for filterable components
 * 
 * @example
 *