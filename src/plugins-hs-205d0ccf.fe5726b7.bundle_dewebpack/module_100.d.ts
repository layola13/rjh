/**
 * Task popup/tips component module
 * Provides functions to show and close tip notifications with customizable positioning
 */

/**
 * Arrow position for the tip popup
 */
export type ArrowPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Rectangle position and size information
 */
export interface Rectangle {
  /** X coordinate (left position) */
  x: number;
  /** Y coordinate (top position) */
  y: number;
  /** Width of the rectangle */
  width: number;
  /** Height of the rectangle */
  height: number;
}

/**
 * Options for showing a tip popup
 */
export interface ShowTipsOptions {
  /** Position rectangle where the tip should appear */
  rec: Rectangle;
  
  /** Content to display (MDS key value) */
  contentMdsKeyValue: string;
  
  /** Position of the arrow relative to the content box */
  arrowPosition?: ArrowPosition;
  
  /** Whether the tip can be manually closed by the user */
  canClose?: boolean;
  
  /** Whether the tip should automatically close */
  autoClose?: boolean;
  
  /** Duration in seconds before auto-close (default: 5) */
  duration?: number;
  
  /** Callback function when the tip is closed */
  onClose?: () => void;
}

/**
 * Internal props for the tip component
 */
export interface TipComponentProps extends ShowTipsOptions {
  /** Internal close handler */
  onClose: () => void;
}

/**
 * Shows a tip popup with the specified options
 * @param options - Configuration options for the tip display
 */
export function showTips(options: ShowTipsOptions): void;

/**
 * Closes and removes any currently displayed tip popup
 */
export function closeTips(): void;