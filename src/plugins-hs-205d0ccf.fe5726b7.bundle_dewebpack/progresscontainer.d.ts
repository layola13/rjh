/**
 * Progress container component module
 * Displays progress bar with percentage and remaining time information
 */

/**
 * Progress display mode enumeration
 */
export enum ProgressModeEnum {
  /** Simple mode - shows minimal information */
  Simple = "Simple",
  /** Common mode - shows full information */
  Common = "Common"
}

/**
 * Props for the ProgressContainer component
 */
export interface ProgressContainerProps {
  /** Custom CSS class name for styling */
  customClassName?: string;
  /** Current progress percentage (0-100) */
  processSchedule: number;
  /** Remaining duration in seconds */
  processRemainingDuration?: number;
  /** Display mode for the progress container */
  mode?: ProgressModeEnum;
}

/**
 * Progress container component that displays a progress bar with time information
 * 
 * @param props - Component properties
 * @returns React element representing the progress container
 * 
 * @example
 *