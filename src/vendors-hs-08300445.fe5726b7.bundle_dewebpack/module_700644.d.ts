import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Overlay props configuration
 */
export interface OverlayProps {
  /**
   * Controls the visibility of the overlay component
   */
  visible?: boolean;
  
  /**
   * The overlay content to be displayed
   */
  overlay?: React.ReactNode;
  
  /**
   * Additional props passed to the underlying component
   */
  [key: string]: any;
}

/**
 * Reference type for the overlay component
 * Exposes the forcePopupAlign method to manually trigger alignment
 */
export interface OverlayRef {
  /**
   * Forces the popup to recalculate and update its alignment
   */
  forcePopupAlign(): void;
}

/**
 * A forward ref component that manages overlay visibility and alignment.
 * 
 * This component automatically triggers popup alignment when the overlay becomes visible,
 * using request animation frame for optimal performance.
 * 
 * @example
 *