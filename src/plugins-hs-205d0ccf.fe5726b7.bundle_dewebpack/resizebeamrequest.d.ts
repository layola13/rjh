/**
 * Beam resize request handler
 * Manages interactive beam resizing with snapping and auto-fit capabilities
 */

import { HSCore } from './HSCore';

/**
 * 2D Vector representation
 */
interface Vector2 {
  x: number;
  y: number;
}

/**
 * 3D positioning and sizing properties
 */
interface ContentBase {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
}

/**
 * Beam entity interface
 */
interface Beam {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  XLength: number;
  YLength: number;
  XScale: number;
  YScale: number;
  rotation: number;
  faceList: Face[];
  rebuild(): void;
}

/**
 * Face geometry interface
 */
interface Face {
  dirtyGeometry(): void;
}

/**
 * Dragging control direction/multiplier
 */
interface DraggingGizmo {
  x: number;
  y: number;
}

/**
 * Snapping configuration options
 */
interface SnappingOptions {
  /** Snapping distance threshold */
  snapOffset: number;
  /** Enable automatic fitting */
  autoFitEnable: boolean;
  /** Ignore snap offset constraints */
  ignoreSnapOffset: boolean;
  /** Disable Z-axis snapping */
  notZ: boolean;
  /** Fixed Z-coordinate value */
  fixedZValue: number;
  /** Current dragging gizmo state */
  draggingGizmo: Vector2;
}

/**
 * Snapping result data
 */
interface SnappingResult {
  snapped: boolean;
  offset: [number, number];
}

/**
 * Snapping strategy base interface
 */
interface SnappingStrategy {
  execute(options: SnappingOptions): SnappingResult | null;
}

/**
 * Snapping helper utility class
 */
declare class SnappingHelper {
  constructor(beam: Beam);
  strategies: SnappingStrategy[];
  doSnapping(options: SnappingOptions): SnappingResult;
}

/**
 * Request handler for beam resizing operations
 * Extends the core state request transaction system
 */
export declare class ResizeBeamRequest extends HSCore.Transaction.Common.StateRequest {
  /** The beam entity being resized */
  readonly beam: Beam;

  /** Signal dispatched when resize is snapped to constraints */
  readonly signalResizeSnapped: HSCore.Util.Signal<SnappingResult>;

  /** Minimum size threshold in meters */
  private static readonly MIN_SIZE = 0.001;

  /** Current dragging direction and multiplier */
  private readonly _draggingGizmo: DraggingGizmo;

  /** Cached initial beam state before resize */
  private readonly _contentBase: ContentBase;

  /** Helper for snapping calculations */
  private readonly snappingHelper: SnappingHelper;

  /**
   * Creates a new resize beam request
   * @param beam - The beam entity to resize
   * @param draggingGizmo - Direction multipliers for resize (-1, 0, or 1 for each axis)
   */
  constructor(beam: Beam, draggingGizmo: DraggingGizmo);

  /**
   * Commit the resize operation
   * Rebuilds beam geometry and triggers auto-fit for face molding
   */
  onCommit(): void;

  /**
   * Process incoming drag events
   * @param eventType - Type of event (e.g., 'dragmove')
   * @param data - Event data containing offset
   * @returns True if event was handled
   */
  onReceive(eventType: string, data: { offset: [number, number] }): boolean;

  /**
   * Undo the resize operation
   * Restores beam to previous state and marks faces as dirty
   */
  onUndo(): void;

  /**
   * Redo the resize operation
   * Reapplies changes and marks faces as dirty
   */
  onRedo(): void;

  /**
   * Execute snapping calculations
   * Transforms gizmo coordinates by beam rotation and dispatches snap results
   */
  private _doSnapping(): void;

  /**
   * Snapping callback handler
   * Converts snap offsets to beam space and applies resize
   * @param snapOffset - World-space snap offset [x, y]
   */
  private _doSnappingCallback(snapOffset: [number, number]): void;

  /**
   * Apply resize transformation to beam
   * Adjusts scale and position based on drag offset and gizmo direction
   * @param offset - World-space drag offset [x, y]
   */
  private _resizeBeam(offset: [number, number]): void;

  /**
   * Create snapping strategies for this resize operation
   * @param helper - Snapping helper instance
   * @returns Array of active snapping strategies
   */
  private _getSnappingStrategies(helper: SnappingHelper): SnappingStrategy[];

  /**
   * Check if this request can be part of a transaction field
   * @returns Always true for resize operations
   */
  canTransactField(): boolean;

  /**
   * Mark all beam face geometries as dirty
   * Forces geometry recalculation on next render
   */
  private _dirtyStructureFaces(): void;
}

/**
 * Global namespace declarations
 */
declare global {
  namespace HSApp.Snapping {
    class Helper extends SnappingHelper {}
    class SnapToWall2D implements SnappingStrategy {
      constructor(
        beam: Beam,
        helper: SnappingHelper,
        callback: (offset: [number, number]) => void,
        options?: unknown
      );
      execute(options: SnappingOptions): SnappingResult | null;
    }
  }

  namespace HSCore {
    namespace Util {
      /** Generic signal/event dispatcher */
      class Signal<T = unknown> {
        dispatch(data: T): void;
      }

      /** Math utilities */
      namespace Math {
        function rotatePointCW(
          origin: Vector2,
          point: Vector2,
          angleDegrees: number
        ): Vector2;
      }

      /** Layer management utilities */
      namespace Layer {
        function getEntityLayer(entity: unknown): unknown;
      }

      /** Face molding auto-fit singleton */
      class FaceMoldingFitHelper {
        static getInstance(): FaceMoldingFitHelper;
        startListening(layer: unknown): void;
        autoFit(): void;
      }
    }

    namespace Transaction.Common {
      /** Base state request class */
      abstract class StateRequest {
        onCommit(): void;
        onUndo(): void;
        onRedo(): void;
      }
    }
  }
}