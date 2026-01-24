/**
 * Module: MoveBeamRequest
 * Request handler for moving beam objects in 3D space with snapping and clipping support
 */

import { Vector2 } from './Vector2';
import { SnapHelper, SnapHelperConfig, SnapResult } from './SnapHelper';
import { BeamClipper } from './BeamClipper';
import { HSCore } from './HSCore';
import { MixPaveApi, RegionApi } from './MixPaveApi';

/**
 * Position coordinates in 3D space
 */
export interface Position3D {
  x?: number;
  y?: number;
  z?: number;
  ZRotation?: number;
  XRotation?: number;
  YRotation?: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
}

/**
 * 2D point coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Event data for position-based interactions
 */
export interface PositionEventData {
  position?: number[];
  viewType?: '2d' | '3d';
  pickedLayer?: HSCore.Model.Layer;
}

/**
 * Signal payload when beam's host changes
 */
export interface HostChangedEvent {
  oldHost: HSCore.Model.Host;
  newHost: HSCore.Model.Host;
}

/**
 * Beam entity with geometry and material properties
 */
export interface Beam extends HSCore.Model.Entity {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  parent: HSCore.Model.Parent | null;
  faceList: Face[];
  
  getUniqueParent(): HSCore.Model.Layer;
  rebuild(): void;
  dirtyPosition(): void;
  dirtyGeometry(): void;
  replaceParent(layer: HSCore.Model.Layer): void;
  rotateAround(center: Point2D, angle: number): void;
  getHost(): HSCore.Model.Host;
  assignTo(host: HSCore.Model.Host): void;
  setFlagOff(flag: HSCore.Model.StructureFlagEnum, propagate: boolean): void;
}

/**
 * Face of a 3D beam with material and topology information
 */
export interface Face {
  id: string;
  material: HSCore.Paint.Material;
  rawPath2d: Path2D;
}

/**
 * Face mapping entry with topology key
 */
export interface FaceMapEntry {
  originKey: string;
}

/**
 * Builder for beam geometry with face topology mapping
 */
export interface BeamBuilder {
  faceMap: Map<string, FaceMapEntry>;
}

/**
 * Layer containing beams with builder information
 */
export interface Layer extends HSCore.Model.Layer {
  beamBuilder: BeamBuilder;
  roomInfos: RoomInfo[];
}

/**
 * Room information containing ceiling references
 */
export interface RoomInfo {
  ceilings: HSCore.Model.Host[];
}

/**
 * Request handler for moving beam objects with snapping, clipping, and material copying
 * Extends the base StateRequest to provide interactive drag-and-drop functionality
 */
export declare class MoveBeamRequest extends HSCore.Transaction.Common.StateRequest {
  /** The beam being moved */
  readonly beam: Beam;
  
  /** Source beam for material copying (optional) */
  readonly fromBeam?: Beam;
  
  /** Parent layer containing the beam */
  private layer: HSCore.Model.Layer;
  
  /** Original position before move operation */
  private basePoint: Point2D;
  
  /** Mouse position at drag start */
  private mouseBeginPoint: Point2D;
  
  /** Helper for snapping to other objects */
  private snaphelper: SnapHelper;
  
  /** Whether drag operation has started */
  private dragged: boolean;
  
  /** Selection manager for handling object selection */
  private selectionMgr: HSCore.Selection.SelectionManager;
  
  /** Signal dispatched when beam's host changes */
  readonly signalHostChanged: HSCore.Util.Signal<HostChangedEvent>;

  /**
   * Creates a new move beam request
   * @param beam - The beam to move
   * @param mouseBeginPoint - Initial mouse position
   * @param fromBeam - Optional source beam for material copying
   */
  constructor(beam: Beam, mouseBeginPoint: Point2D, fromBeam?: Beam);

  /**
   * Commits the move operation, rebuilding geometry and copying materials
   * @returns The moved beam
   */
  onCommit(): Beam;

  /**
   * Handles incoming events during the move operation
   * @param eventType - Type of event (moveto, dragstart, dragmove, etc.)
   * @param eventData - Event-specific data
   * @returns Whether the event was handled
   */
  onReceive(eventType: string, eventData: PositionEventData & { position?: Position3D }): boolean;

  /**
   * Moves the beam by a delta offset with snapping
   * @param delta - Movement offset vector
   * @param newMousePos - Current mouse position
   */
  move(delta: Vector2, newMousePos: Point2D): void;

  /**
   * Moves beam to absolute position
   * @param position - Target position with rotation and scale
   */
  private _moveTo(position: Position3D): void;

  /**
   * Calculates movement offset from event data
   * @param eventData - Event containing new position
   * @returns Delta vector and new mouse position
   */
  private _calcMoveOffset(eventData: PositionEventData): {
    delta: Vector2;
    newMousePos: Point2D;
  };

  /**
   * Updates beam position based on delta from base point
   * @param delta - Movement offset vector
   */
  private _updateBeamPosition(delta: Vector2): void;

  /**
   * Releases cursor status in 2D view
   */
  private _changeCursorStatus(): void;

  /**
   * Assigns beam to a new host
   * @param newHost - Target host object
   */
  private _addToHost(newHost: HSCore.Model.Host): void;

  /**
   * Finds corresponding face in source beam by topology key
   * @param targetFace - Face in the moved beam
   * @param sourceFaces - Faces from the source beam
   * @param sourceLayer - Layer containing source beam
   * @returns Matching face or undefined
   */
  getCopyFromFaceByTopoKey(
    targetFace: Face,
    sourceFaces: Face[],
    sourceLayer: Layer
  ): Face | undefined;

  /**
   * Copies material from source face to target face
   * @param targetFace - Destination face
   * @param sourceFace - Source face with material
   */
  copyMaterial(targetFace: Face, sourceFace: Face): void;

  /**
   * Sets mix-paint material on a face
   * @param face - Target face
   * @param material - Material to apply
   */
  setFaceMixpaintMaterial(face: Face, material: HSCore.Paint.Material): void;

  /**
   * Whether this request can participate in transactions
   * @returns Always true
   */
  canTransactField(): boolean;

  /**
   * Hides all snap auxiliary visuals
   */
  hideAllSnapAuxilaries(): void;

  /**
   * Gets the ceiling host from a layer
   * @param layer - Layer containing room info
   * @returns First ceiling host found
   */
  getCeilingHost(layer: Layer): HSCore.Model.Host;
}