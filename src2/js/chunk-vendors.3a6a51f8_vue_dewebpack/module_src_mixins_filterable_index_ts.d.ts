/**
 * Filterable Mixin
 * 
 * Provides filtering functionality for Vuetify components.
 * This mixin adds support for displaying a "no data" message when filters return empty results.
 * 
 * @module FilterableMixin
 */

import { Vue } from 'vue';

/**
 * Props interface for the Filterable mixin
 */
export interface FilterableProps {
  /**
   * Text to display when no data is available after filtering.
   * Supports Vuetify i18n translation keys (e.g., "$vuetify.noDataText").
   * 
   * @default "$vuetify.noDataText"
   */
  noDataText: string;
}

/**
 * Filterable Mixin Component
 * 
 * A Vue mixin that provides basic filtering capabilities with customizable
 * "no data" messaging. Commonly used in data tables, lists, and other
 * components that display filtered collections.
 */
declare const Filterable: import('vue').ExtendedVue<
  Vue,
  {},
  {},
  {},
  FilterableProps
>;

export default Filterable;