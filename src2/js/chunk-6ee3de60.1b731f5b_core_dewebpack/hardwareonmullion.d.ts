import type { Segment, Arc } from './geometry-library';
import type { HardwareOnEdge } from './HardwareOnEdge';
import type { ToolType } from './tool-types';

/**
 * Represents a mullion bar (horizontal or vertical divider) in a window/door sash system
 */
interface MullionBar {
  /** Polygon identifier containing the edge index */
  polyId: {
    idx: number;
  };
  /** Associated polygon shape information */
  polygon: {
    /** The geometric shape of the mullion (Segment or Arc) */
    mulShape: Segment | Arc | unknown;
  };
}

/**
 * Manages mullion bars within a sash
 */
interface MullionManager {
  /** Collection of all mullion bars */
  bars: MullionBar[];
}

/**
 * Represents a window or door sash containing mullion bars
 */
interface Sash {
  /** Manager for mullion bar operations */
  mulManager: MullionManager;
}

/**
 * Hardware component that can be placed on a mullion bar
 * Extends HardwareOnEdge to provide mullion-specific functionality
 * 
 * @remarks
 * This class represents hardware (such as locks, handles, or hinges) that is specifically
 * mounted on mullion bars rather than the main frame edges of a window or door.
 * 
 * @example
 *