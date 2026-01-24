import VDialog from '../VDialog/VDialog';

/**
 * VBottomSheet component interface
 * A bottom sheet is a modified dialog that slides from the bottom of the screen
 */
export interface VBottomSheetProps {
  /** Whether the bottom sheet is inset from the edges */
  inset: boolean;
  
  /** Maximum width of the bottom sheet */
  maxWidth: string | number;
  
  /** Transition animation name */
  transition: string;
}

/**
 * VBottomSheet computed properties interface
 */
export interface VBottomSheetComputed {
  /** Combined CSS classes for the component */
  classes: Record<string, boolean>;
}

/**
 * VBottomSheet component
 * Extends VDialog to provide a bottom sheet implementation
 * 
 * @example
 *