/**
 * VTimeline Component
 * A timeline component for displaying chronological information
 */
export declare class VTimeline {
  /** @private Internal Vuetify components registry */
  readonly $_vuetify_subcomponents?: Record<string, unknown>;
}

/**
 * VTimelineItem Component
 * Individual item within a VTimeline component
 */
export declare class VTimelineItem {
  /** @private Internal Vuetify components registry */
  readonly $_vuetify_subcomponents?: Record<string, unknown>;
}

/**
 * Module default export containing all timeline subcomponents
 */
export interface VTimelineModule {
  /** @private Vuetify internal subcomponents registry */
  $_vuetify_subcomponents: {
    VTimeline: typeof VTimeline;
    VTimelineItem: typeof VTimelineItem;
  };
}

declare const _default: VTimelineModule;
export default _default;

/**
 * Named exports for direct component import
 */
export { VTimeline, VTimelineItem };