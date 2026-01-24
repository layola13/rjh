/**
 * VTimeline component definition
 * A timeline component for displaying chronological content
 */

import Vue, { VNode, VueConstructor } from 'vue';

/**
 * Timeline context provided to child components
 */
export interface TimelineProvide {
  /** Reference to the parent timeline instance */
  timeline: Vue;
}

/**
 * Props for the VTimeline component
 */
export interface VTimelineProps {
  /** Align timeline items to the top instead of center */
  alignTop: boolean;
  /** Enable dense/compact mode with reduced spacing */
  dense: boolean;
  /** Reverse the order of timeline items */
  reverse: boolean;
}

/**
 * Computed properties for VTimeline
 */
export interface VTimelineComputed {
  /** Combined CSS classes for the timeline element */
  classes: Record<string, boolean>;
}

/**
 * VTimeline component interface
 * Displays content in a chronological timeline layout
 */
export interface VTimeline extends Vue {
  /** Align timeline items to the top instead of center */
  alignTop: boolean;
  /** Enable dense/compact mode with reduced spacing */
  dense: boolean;
  /** Reverse the order of timeline items */
  reverse: boolean;
  /** Combined CSS classes for the timeline element */
  readonly classes: Record<string, boolean>;
}

/**
 * VTimeline component constructor
 */
declare const VTimeline: VueConstructor<VTimeline>;

export default VTimeline;