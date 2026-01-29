/**
 * Module: OpeningCalculatedDimension
 * Provides dimension calculation and management for opening entities in the floor plan editor.
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSCatalog } from './HSCatalog';
import { SVGDimensionType } from './SVGDimensionType';
import { OpeningCalculatedDimensionBase } from './OpeningCalculatedDimensionBase';

/**
 * Event data for dimension value changes
 */
export interface ValueChangeEventData {
  /** The gizmo control that triggered the change */
  gizmo: DimensionGizmo;
  /** The new dimension value */
  value: number;
  /** The previous dimension value */
  oldValue: number;
  /** Optional direction vector for the dimension */
  direction?: HSCore.Math.Vector3;
}

/**
 * Event object passed to value change handlers
 */
export interface ValueChangeEvent {
  data: ValueChangeEventData;
}

/**
 * 2D dimension view tuple containing gizmo controls
 * Index 1 and 4 typically represent length dimension controls
 */
export type DimensionView2D = [
  DimensionGizmo | null,
  DimensionGizmo | null,
  DimensionGizmo | null,
  DimensionGizmo | null,
  DimensionGizmo | null
];

/**
 * Generic dimension gizmo control interface
 */
export interface DimensionGizmo {
  /** Get the current value of the dimension */
  getValue(): number;
  /** Direction vector for dimension adjustment */
  direction: HSCore.Math.Vector3;
}

/**
 * Command manager interface for executing and managing commands
 */
export interface CommandManager {
  /**
   * Create a new command instance
   * @param commandType - Type of command to create
   * @param targets - Target entities for the command
   * @returns Created command instance or null if creation failed
   */
  createCommand(commandType: string, targets: unknown[]): Command | null;
  
  /**
   * Execute a command
   * @param command - Command to execute
   */
  execute(command: Command): void;
  
  /**
   * Send a command message
   * @param action - Action name
   * @param payload - Action payload data
   */
  receive(action: string, payload: unknown): void;
  
  /**
   * Complete the current command transaction
   */
  complete(): void;
}

/**
 * Base command interface
 */
export interface Command {
  /** Command identifier */
  id?: string;
  /** Command type */
  type: string;
}

/**
 * Opening entity metadata structure
 */
export interface OpeningMetadata {
  /** Content type information for the opening */
  contentType?: {
    /**
     * Check if this content type matches the given type enum
     * @param type - Type to check against
     * @returns True if types match
     */
    isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
  };
}

/**
 * Opening entity with dimension properties
 */
export interface OpeningEntity extends HSCore.Model.DOpening {
  /** X-axis size (width) of the opening */
  XSize: number;
  /** Bottom profile of the opening for dimension calculations */
  bottomProfile: unknown;
  /** Optional metadata for the opening */
  metadata?: OpeningMetadata;
}

/**
 * Calculated dimension controller for opening entities.
 * Manages dimension display, value changes, and command dispatching for openings.
 */
export declare class OpeningCalculatedDimension extends OpeningCalculatedDimensionBase {
  /** Controller for handling dimension commands and updates */
  controller: OpeningCalculatedDimensionController;

  /**
   * Creates a new opening calculated dimension instance
   * @param entity - The opening entity to manage dimensions for
   * @param view - View context for the dimension
   * @param gizmo - Gizmo control for interactive dimension editing
   */
  constructor(entity: OpeningEntity, view: unknown, gizmo: DimensionGizmo);

  /**
   * Get the unique type identifier for this dimension
   * @returns The SVG dimension type enum value
   */
  type(): SVGDimensionType;

  /**
   * Returns the unique type identifier for opening calculated dimensions
   * @returns The SVG dimension type for opening calculated dimensions
   */
  static uniqueType(): SVGDimensionType;

  /**
   * Called when the dimension is activated in the UI
   */
  onActivate(): void;

  /**
   * Called when the dimension is deactivated in the UI
   */
  onDeactivate(): void;

  /**
   * Called when the dimension is cleaned up/destroyed
   */
  onCleanup(): void;

  /**
   * Handles value change commit events from dimension gizmos
   * @param event - Event containing old and new dimension values
   */
  onValueChangeCommit(event: ValueChangeEvent): void;

  /**
   * Get the opening entity associated with this dimension
   */
  get opening(): OpeningEntity;

  /**
   * Get the working profile for dimension calculations
   * @returns The bottom profile of the opening
   */
  getWorkingEntityProfile(): unknown;

  /**
   * Get the length of the opening entity
   * @returns The X-axis size of the opening
   */
  getEntityLength(): number;

  /**
   * 2D dimension view containing gizmo controls
   * Indices 1 and 4 typically represent length dimension controls
   */
  protected dimensionView2d: DimensionView2D;
}

/**
 * Controller for managing opening dimension commands and dispatching updates.
 * Handles dimension value changes and translates them into move/resize commands.
 */
declare class OpeningCalculatedDimensionController extends HSApp.View.Base.DisplayController {
  /** The dimension gizmo control */
  gizmo: DimensionGizmo | undefined;
  
  /** Command manager for executing dimension-related commands */
  protected _cmdMgr: CommandManager;
  
  /** The opening entity being controlled */
  protected entity: OpeningEntity;

  /**
   * Creates a new opening calculated dimension controller
   * @param commandManager - Command manager for executing commands
   * @param entity - The opening entity to control
   * @param gizmo - The dimension gizmo control
   */
  constructor(commandManager: CommandManager, entity: OpeningEntity, gizmo: DimensionGizmo);

  /**
   * Dispatch dimension-related events and execute corresponding commands
   * @param eventType - Type of event to dispatch ('valueChanged' or 'openingLengthChanged')
   * @param target - Target opening entity
   * @param event - Event data containing dimension values
   */
  dispatch(
    eventType: 'valueChanged' | 'openingLengthChanged',
    target: OpeningEntity,
    event: ValueChangeEvent
  ): void;
}