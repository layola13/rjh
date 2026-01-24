import type { PushSash, Handle } from './module-1';
import type { EditHardwareOnFrameTool, ToolType } from './module-5';
import type { PushSashHardwareManager, FoldHardwareManager } from './module-13';

/**
 * Hardware item interface representing hinges, handles, and other hardware components
 */
interface HardwareItem {
  /** The edge index where this hardware is attached */
  edgeIndex: number;
  
  /** Updates the polygon representation of this hardware */
  updatePoly(): void;
  
  /** Draws the hardware on the given view */
  draw(view: View): void;
  
  /** Aligns this hardware to another hardware item */
  alignTo(other: HardwareItem, updatePosition?: boolean): void;
}

/**
 * Hardware indicator for visual feedback
 */
interface HardwareIndicator {
  /** Updates the polygon representation of the indicator */
  updatePoly(): void;
  
  /** Draws the indicator on the given view */
  draw(view: View): void;
}

/**
 * Manager for hardware components (hinges, handles, indicators)
 */
interface HardwareManager {
  /** Collection of hinge hardware items */
  hinges: HardwareItem[];
  
  /** Handle hardware item, may be undefined */
  handle?: Handle | HardwareItem;
  
  /** Visual indicator for hardware placement */
  indicator: HardwareIndicator;
  
  /** Calculates the proper handle index based on hinge position */
  properHandleIndexByHinge(hingeIndex: number): number;
  
  /** Matches the opening direction of the sash */
  matchOpenDirection(): void;
}

/**
 * Polygon identifier for matching sash instances
 */
interface PolyId {
  /** Checks if this PolyId equals another */
  equalTo(other: PolyId): boolean;
}

/**
 * Sash frame manager
 */
interface SashManager {
  /** All sashes in the current frame */
  sashes: Sash[];
  
  /** All sashes including nested frames */
  allSashes: Sash[];
}

/**
 * Top frame container
 */
interface TopFrame {
  /** Sash manager for this frame */
  sashManager: SashManager;
}

/**
 * Base sash interface
 */
interface Sash {
  /** Whether this sash is standalone */
  isStandalone: boolean;
  
  /** Hardware manager for this sash */
  hardwareManager: HardwareManager | PushSashHardwareManager | FoldHardwareManager;
  
  /** Unique polygon identifier */
  polyId: PolyId;
  
  /** Parent frame reference */
  topFrame: TopFrame;
}

/**
 * View/canvas interface for rendering
 */
interface View {
  // View-specific rendering methods would be defined here
}

/**
 * Tool for editing hinge hardware on push sashes.
 * Handles hinge position updates and synchronization across related sashes.
 */
export declare class EditHingeTool extends EditHardwareOnFrameTool {
  /** The view/canvas where hardware is rendered */
  protected view: View;
  
  /** The sash being edited */
  protected sash: Sash;
  
  /** The hardware item being edited */
  protected hardware: HardwareItem;
  
  /**
   * Creates a new EditHingeTool instance
   * @param view - The view/canvas for rendering
   */
  constructor(view: View);
  
  /**
   * Callback invoked when hardware has been edited.
   * Updates hinge positions, realigns handles, synchronizes related sashes,
   * and broadcasts changes to the top view.
   * 
   * @param hardwareItem - The hardware item that was edited
   * @param newEdgeIndex - The new edge index for the hardware placement
   */
  onHardwareEdited(hardwareItem: HardwareItem, newEdgeIndex: number): void;
  
  /**
   * Broadcasts top view changes to other components
   * @protected
   */
  protected broadcastTopViewChange(): void;
}