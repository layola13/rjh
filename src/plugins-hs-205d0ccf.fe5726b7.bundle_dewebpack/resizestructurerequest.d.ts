/**
 * Module: ResizeStructureRequest
 * 
 * This module provides functionality for resizing structures with snapping support.
 * It handles drag operations, snapping calculations, and structure dimension updates.
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * Minimum size threshold for structure dimensions (in meters)
 */
declare const MINIMUM_SIZE_THRESHOLD = 0.001;

/**
 * Represents a 2D point in space
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents a 3D point in space
 */
interface Point3D extends Point2D {
  z: number;
}

/**
 * Represents the base dimensions and position of a structure
 */
interface ContentBase extends Point3D {
  /** Size along the X axis */
  XSize: number;
  /** Size along the Y axis */
  YSize: number;
  /** Size along the Z axis */
  ZSize: number;
}

/**
 * Represents a dragging gizmo direction indicator
 */
interface DraggingGizmo extends Point2D {
  /** X direction: -1 (left), 0 (none), or 1 (right) */
  x: -1 | 0 | 1;
  /** Y direction: -1 (down), 0 (none), or 1 (up) */
  y: -1 | 0 | 1;
}

/**
 * Snapping configuration options
 */
interface SnappingOptions {
  /** Offset threshold for snapping (in meters) */
  snapOffset: number;
  /** Whether to enable auto-fit during snapping */
  autoFitEnable: boolean;
  /** Whether to ignore snap offset limits */
  ignoreSnapOffset: boolean;
  /** Whether to ignore Z-axis snapping */
  notZ: boolean;
  /** Fixed Z value to use when notZ is true */
  fixedZValue: number;
  /** The gizmo being dragged */
  draggingGizmo: HSCore.Math.Vector2;
}

/**
 * Snapping result data
 */
interface SnappingResult {
  /** Whether snapping occurred */
  snapped: boolean;
  /** Snapped offset values */
  offset: [number, number];
}

/**
 * Base structure interface with transformation properties
 */
interface IStructure {
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Z position */
  z: number;
  /** Base length along X axis */
  XLength: number;
  /** Base length along Y axis */
  YLength: number;
  /** Scale factor along X axis */
  XScale: number;
  /** Scale factor along Y axis */
  YScale: number;
  /** Computed size along X axis */
  XSize: number;
  /** Computed size along Y axis */
  YSize: number;
  /** Rotation angle in degrees */
  rotation: number;
  /** List of faces belonging to this structure */
  faceList: IFace[];
}

/**
 * Face interface for structure geometry
 */
interface IFace {
  /** Mark the face geometry as needing recalculation */
  dirtyGeometry(): void;
}

/**
 * Customized structure that can be rebuilt
 */
interface NCustomizedStructure extends IStructure {
  /** Rebuild the structure geometry */
  rebuild(): void;
}

/**
 * Opening structure that can be built
 */
interface Opening extends IStructure {
  /** Build the opening geometry */
  build(): void;
}

/**
 * Snapping strategy constructor type
 */
type SnappingStrategyConstructor = new (
  structure: IStructure,
  helper: HSApp.Snapping.Helper,
  callback: (offset: [number, number]) => void,
  extra?: unknown
) => HSApp.Snapping.IStrategy;

/**
 * Request handler for resizing structures with snapping support.
 * 
 * This class manages the resize operation lifecycle including:
 * - Drag interaction handling
 * - Dimension calculations with constraints
 * - Snapping to walls and other structures
 * - Undo/redo transaction support
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 */
export declare class ResizeStructureRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The structure being resized
   */
  readonly structure: IStructure | NCustomizedStructure | Opening;

  /**
   * Signal dispatched when snapping occurs during resize
   */
  readonly signalResizeSnapped: HSCore.Util.Signal<SnappingResult>;

  /**
   * The gizmo handle being dragged (indicates resize direction)
   * @private
   */
  private readonly _draggingGizmo: DraggingGizmo;

  /**
   * Snapshot of the structure's initial state before resizing
   * @private
   */
  private readonly _contentBase: ContentBase;

  /**
   * Helper for calculating snapping positions
   * @private
   */
  private readonly snappingHelper: HSApp.Snapping.Helper;

  /**
   * Creates a new resize request
   * 
   * @param structure - The structure to resize
   * @param draggingGizmo - The gizmo handle being dragged
   */
  constructor(structure: IStructure | NCustomizedStructure | Opening, draggingGizmo: DraggingGizmo);

  /**
   * Called when the resize operation is committed.
   * Rebuilds the structure and auto-fits face moldings.
   */
  onCommit(): void;

  /**
   * Handles incoming events during the resize operation
   * 
   * @param eventType - The type of event received
   * @param eventData - Event data containing offset information
   * @returns True if the event was handled
   */
  onReceive(eventType: string, eventData: { offset: [number, number] }): boolean;

  /**
   * Called when the resize operation is undone.
   * Reverts structure to previous state and marks faces dirty.
   */
  onUndo(): void;

  /**
   * Called when the resize operation is redone.
   * Re-applies the resize and marks faces dirty.
   */
  onRedo(): void;

  /**
   * Performs snapping calculations and dispatches snapping signals
   * @private
   */
  private _doSnapping(): void;

  /**
   * Callback invoked when snapping occurs
   * 
   * @param offset - The snapped offset as [x, y] coordinates
   * @private
   */
  private _doSnappingCallback(offset: [number, number]): void;

  /**
   * Resizes the structure based on the given offset
   * 
   * Calculates new dimensions while maintaining:
   * - Minimum size constraints
   * - Aspect ratio (when dragging corners)
   * - Proper positioning based on drag direction
   * 
   * @param offset - The offset as [x, y] in world coordinates
   * @private
   */
  private _resizeStructure(offset: [number, number]): void;

  /**
   * Creates snapping strategies for the resize operation
   * 
   * @param helper - The snapping helper instance
   * @returns Array of snapping strategy instances
   * @private
   */
  private _getSnappingStrategies(helper: HSApp.Snapping.Helper): HSApp.Snapping.IStrategy[];

  /**
   * Determines if this request can be included in field transactions
   * 
   * @returns Always true for resize requests
   */
  canTransactField(): boolean;

  /**
   * Marks all structure faces as needing geometry recalculation
   * @private
   */
  private _dirtyStructureFaces(): void;
}