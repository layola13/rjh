/**
 * Mirror command module for floorplan mirroring operations
 * Handles horizontal and vertical mirroring of floorplan content
 */

import { Matrix3, Matrix4 } from './math-utils';
import { HSCore } from './hs-core';
import { Path, MathService } from './path-utils';
import { HSApp } from './hs-app';

/**
 * Arguments for executing the mirror command
 */
interface MirrorExecuteArgs {
  /** Transformation matrix in 3D space */
  matrix4: Matrix4;
  /** Transformation matrix in 2D space */
  matrix3: Matrix3;
  /** Type of mirror operation */
  type: HSCore.Model.MirrorType;
  /** Center point of the mirror operation */
  center: { x: number; y: number };
  /** Translation length for the mirror */
  transLen: number;
}

/**
 * Arguments for initializing the mirror command
 */
interface MirrorCommandArgs {
  /** The floorplan to mirror */
  floorplan: HSApp.Floorplan;
  /** Direction of mirroring (horizontal or vertical) */
  direction: HSCore.Model.MirrorType;
}

/**
 * Information about collected faces for mirroring
 */
interface CollectedFacesInfo {
  /** Array of face objects to be mirrored */
  faces: HSCore.Model.Face[];
  /** Map of face IDs to their mixpaint materials */
  faceMixpaints: Map<string, HSCore.Model.Mixpaint>;
  /** Map of face group IDs to their bounding boxes */
  faceGroupBoxs: Map<string, { left: number; top: number; width: number; height: number }>;
}

/**
 * Content item that can be deleted (DContent, DAssembly, etc.)
 */
type DeletableContent = HSCore.Model.DContent | HSCore.Model.DAssembly | HSCore.Model.DExtruding | HSCore.Model.DMolding | HSCore.Model.DSweep;

/**
 * Command for mirroring floorplan content horizontally or vertically.
 * Handles mirroring of walls, openings, furniture, and materials.
 */
export declare class CmdMirror extends HSApp.Cmd.Command {
  /** Command arguments containing floorplan and direction */
  private _args: MirrorCommandArgs;
  
  /** Reference to the floorplan being mirrored */
  private _floorplan: HSApp.Floorplan;
  
  /** Direction of the mirror operation */
  private _direction: HSCore.Model.MirrorType;
  
  /** Transaction session for managing undo/redo */
  session: HSApp.TransactionSession | undefined;
  
  /** Content items to be deleted during mirroring */
  contentsForDelete: Array<DeletableContent | HSCore.Model.ParametricOpening>;

  /**
   * Creates a new mirror command instance
   * @param args - Configuration including floorplan and mirror direction
   */
  constructor(args: MirrorCommandArgs);

  /**
   * Handles incoming messages for the command
   * @param message - Message type ('executeRequest' or 'cancelRequest')
   * @param data - Additional data for the message
   * @returns True if message was handled, false otherwise
   */
  onReceive(message: string, data?: unknown): boolean;

  /**
   * Executes the mirror command
   * - Calculates transformation matrices
   * - Collects content to delete
   * - Shows confirmation modal if needed
   * - Applies mirroring transformations
   */
  onExecute(): void;

  /**
   * Cancels the mirror operation and aborts the transaction
   */
  cancelRequest(): void;

  /**
   * Executes the mirror request with the given transformation
   * - Deletes collected content
   * - Applies mirror transformation to floorplan
   * - Mirrors customized PM models
   * - Mirrors mixpaint materials
   * - Mirrors curtain walls
   * @param mirrorInfo - Transformation information for mirroring
   */
  executeRequest(mirrorInfo: MirrorExecuteArgs): void;

  /**
   * Calculates transformation matrices for mirroring
   * @param isHorizontal - True for horizontal mirroring, false for vertical
   * @returns Object containing transformation matrices and mirror metadata
   */
  private _trans(isHorizontal: boolean): MirrorExecuteArgs;

  /**
   * Collects all content that should be deleted before mirroring
   * @returns Array of content items to delete
   */
  collectContentsForDelete(): Array<DeletableContent | HSCore.Model.ParametricOpening>;

  /**
   * Collects D-type content (assemblies, extruding, molding, sweep) for deletion
   * @returns Array of D-type content items
   */
  collectDContents(): DeletableContent[];

  /**
   * Collects parametric openings (excluding L-type and A-type walls) for deletion
   * @returns Array of parametric opening items
   */
  collectParameterOpenings(): HSCore.Model.ParametricOpening[];

  /**
   * Collects information about all faces in the floorplan
   * - Gathers face paths with transformations
   * - Collects mixpaint materials
   * - Calculates bounding boxes for face groups
   * @returns Object containing faces, mixpaints, and bounding boxes
   */
  private _getCollectedFacesInfo(): CollectedFacesInfo;

  /**
   * Determines if this command can be undone or redone
   * @returns False - mirror operations cannot be undone
   */
  canUndoRedo(): boolean;

  /**
   * Gets a human-readable description of the command
   * @returns Localized description like "户型左右翻转" or "户型上下翻转"
   */
  getDescription(): string;

  /**
   * Gets current parameters of the command for logging
   * @returns Object containing the mirror direction
   */
  getCurrentParams(): { direction: HSCore.Model.MirrorType };

  /**
   * Gets the log category for this command
   * @returns View operation category constant
   */
  getCategory(): string;

  /**
   * Gets the mode/direction of the mirror operation
   * @returns The mirror direction (horizontal or vertical)
   */
  getMode(): HSCore.Model.MirrorType;
}