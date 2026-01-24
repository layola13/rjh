/**
 * VDataIterator module exports
 * 
 * This module provides data iteration and pagination components for Vuetify.
 * @module VDataIterator
 */

/**
 * Main data iterator component for displaying paginated or iterated data
 * 
 * @remarks
 * VDataIterator is a flexible component that allows you to iterate through data
 * with built-in support for pagination, sorting, and filtering.
 */
export declare const VDataIterator: any;

/**
 * Footer component for data pagination controls
 * 
 * @remarks
 * VDataFooter provides pagination controls typically used with VDataIterator
 * or VDataTable components, including page navigation and items-per-page selection.
 */
export declare const VDataFooter: any;

/**
 * Default export containing all subcomponents
 * 
 * @remarks
 * This object groups all VDataIterator-related components for convenient registration
 * with Vuetify's component system.
 */
declare const _default: {
  /**
   * Internal Vuetify subcomponents registry
   * 
   * @internal
   */
  $_vuetify_subcomponents: {
    /** Data iterator component */
    VDataIterator: any;
    /** Data footer/pagination component */
    VDataFooter: any;
  };
};

export default _default;