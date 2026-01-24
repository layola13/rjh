/**
 * VTreeview component module
 * Provides tree view components for displaying hierarchical data
 */

/**
 * Main tree view component for rendering hierarchical tree structures
 */
export declare class VTreeview {
  /**
   * Vuetify subcomponents registry
   * @internal
   */
  static readonly $_vuetify_subcomponents: {
    VTreeview: typeof VTreeview;
    VTreeviewNode: typeof VTreeviewNode;
  };
}

/**
 * Individual tree node component used within VTreeview
 * Represents a single node in the tree hierarchy
 */
export declare class VTreeviewNode {}

/**
 * Default export containing all VTreeview subcomponents
 */
declare const _default: {
  /**
   * Internal registry of Vuetify subcomponents
   * Maps component names to their implementations
   */
  $_vuetify_subcomponents: {
    VTreeview: typeof VTreeview;
    VTreeviewNode: typeof VTreeviewNode;
  };
};

export default _default;