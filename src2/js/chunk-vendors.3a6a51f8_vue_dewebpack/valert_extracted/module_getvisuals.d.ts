/**
 * Groups and organizes visual elements based on their time ranges.
 * Processes events and assigns them to non-overlapping columns for visual display.
 * 
 * @template TEvent - The type of event being processed
 * @param config - Configuration object containing weekday and other settings
 * @param sourceData - Source data to be processed with timestamp identifier
 * @param shouldReset - Flag indicating whether to reset groups after processing
 * @param forceReset - Flag to force reset regardless of weekday configuration
 * @returns Array of processed visual elements with column assignments
 */
declare function getVisuals<TEvent = unknown>(
  config: VisualConfig,
  sourceData: unknown,
  shouldReset: boolean,
  forceReset?: boolean
): ProcessedVisual<TEvent>[];

/**
 * Configuration for visual element processing
 */
interface VisualConfig {
  /** Weekday identifier for filtering events */
  weekday?: number;
  /** Additional configuration properties */
  [key: string]: unknown;
}

/**
 * Processed visual element with column assignment
 */
interface ProcessedVisual<TEvent = unknown> {
  /** The original event data */
  event: TEvent;
  /** Assigned column index for non-overlapping display */
  column: number;
  /** Additional visual properties */
  [key: string]: unknown;
}

/**
 * Internal state for tracking visual groups and time ranges
 */
interface VisualGroupState {
  /** Array of time-based visual groups */
  groups: VisualGroup[];
  /** Minimum timestamp across all groups */
  min: number;
  /** Maximum timestamp across all groups */
  max: number;
  /** Resets the state to initial values */
  reset(): void;
}

/**
 * A group of visuals sharing a time column
 */
interface VisualGroup {
  /** Start timestamp of the group */
  start: number;
  /** End timestamp of the group */
  end: number;
  /** Visual elements in this group */
  visuals: ProcessedVisual[];
}