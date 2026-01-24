/**
 * Balloon tip theme types
 */
export type BalloonTipTheme = 'teaching-black' | 'light' | 'black' | string;

/**
 * Teaching item data structure
 */
export interface TeachingItem {
  /** Function name or title of the teaching item */
  function: string;
  [key: string]: unknown;
}

/**
 * Balloon tip data structure
 */
export interface BalloonTipData {
  /** Type of the balloon tip */
  type: string;
  /** Array of teaching items to display */
  data: TeachingItem[];
}

/**
 * Context interface for remind modal operations
 */
export interface RemindModalContext {
  /** Close the modal */
  close: () => void;
  /** Check/view teaching content for a specific item */
  checkTeaching: (item: TeachingItem) => void;
}

/**
 * Props for BalloonTipWrapper component
 */
export interface BalloonTipWrapperProps {
  /** Theme variant for styling */
  theme: BalloonTipTheme;
  /** Child elements to render inside the wrapper */
  children: React.ReactNode;
}

/**
 * Props for BalloonTips component
 */
export interface BalloonTipsProps {
  /** Type identifier for the balloon tip */
  type: string;
  /** Array containing teaching items to display */
  data: TeachingItem[];
}

/**
 * Wrapper component for balloon tip styling
 * Applies theme-based CSS classes to child elements
 * 
 * @param props - Component properties
 * @returns Themed wrapper div element
 */
export declare function BalloonTipWrapper(props: BalloonTipWrapperProps): React.ReactElement;

/**
 * Main balloon tip component
 * Displays teaching prompts with close and "not remind" options
 * 
 * Features:
 * - Shows clickable teaching function title
 * - Provides "not remind" checkbox option
 * - Includes close button
 * - Auto-adjusts theme based on context
 * 
 * @param props - Component properties including type and teaching data
 * @returns Balloon tip UI element
 */
export declare function BalloonTips(props: BalloonTipsProps): React.ReactElement;