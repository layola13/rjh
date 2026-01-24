/**
 * Module: VSpeedDial
 * Speed dial component for quick actions menu
 */

/**
 * VSpeedDial component for displaying floating action buttons in a expandable menu
 * Provides quick access to related actions in a compact, accessible format
 */
export declare class VSpeedDial {
  /**
   * Creates a new VSpeedDial instance
   * @param options - Configuration options for the speed dial component
   */
  constructor(options?: VSpeedDialOptions);
}

/**
 * Configuration options for VSpeedDial component
 */
export interface VSpeedDialOptions {
  /**
   * Whether the speed dial is open by default
   * @default false
   */
  open?: boolean;

  /**
   * Direction in which the speed dial expands
   * @default 'top'
   */
  direction?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Transition animation type
   * @default 'scale'
   */
  transition?: 'scale' | 'slide' | 'fade';

  /**
   * Whether to show tooltips for action buttons
   * @default true
   */
  tooltips?: boolean;
}

export default VSpeedDial;