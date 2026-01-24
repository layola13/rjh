/**
 * VTimeline component module
 * Provides timeline visualization components for displaying chronological information
 */

import { Component } from 'vue';

/**
 * VTimeline component
 * Main container for timeline items, manages layout and styling
 */
export declare const VTimeline: Component;

/**
 * VTimelineItem component
 * Individual item within a timeline, represents a single event or milestone
 */
export declare const VTimelineItem: Component;

/**
 * Default export containing all timeline subcomponents
 */
export interface VTimelineModule {
  /**
   * Internal Vuetify registry of timeline subcomponents
   */
  readonly $_vuetify_subcomponents: {
    readonly VTimeline: Component;
    readonly VTimelineItem: Component;
  };
}

declare const _default: VTimelineModule;
export default _default;