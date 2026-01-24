/**
 * Command for resizing structure elements in the application.
 * Handles drag interactions to resize structures using transformation requests.
 */

import { Command } from 'HSApp/Cmd/Command';

/**
 * Represents a dragging gizmo used for resizing operations.
 */
interface DraggingGizmo {
  // Add specific properties based on your application's gizmo implementation
  [key: string]: unknown;
}

/**
 * Structure object that can be resized.
 */
interface Structure {
  // Add specific properties based on your application's structure implementation
  [key: string]: unknown;
}

/**
 * Transformation request for managing resize operations.
 */
interface TransformRequest {
  /**
   * Receives and processes transformation events.
   * @param eventType - Type of the event (e.g., "dragmove")
   * @param eventData - Data associated with the event
   */
  receive(eventType: string, eventData: DragEventData): void;
}

/**
 * Manages transformation requests for structure operations.
 */
interface TransformManager {
  /**
   * Creates a new transformation request.
   * @param requestType - Type of request to create
   * @param params - Parameters for the request
   * @returns The created transformation request
   */
  createRequest(requestType: string, params: [Structure, DraggingGizmo]): TransformRequest;
  
  /**
   * Commits a transformation request, applying the changes.
   * @param request - The request to commit
   */
  commit(request: TransformRequest): void;
}

/**
 * Data structure for drag events.
 */
interface DragEventData {
  /** Offset vector for drag movement */
  offset?: { x: number; y: number; z?: number };
  [key: string]: unknown;
}

/**
 * Command manager interface.
 */
interface CommandManager {
  /**
   * Marks a command as complete.
   * @param command - The command to complete
   */
  complete(command: Command): void;
}

/**
 * Command for resizing structures through drag interactions.
 * Manages the lifecycle of a resize operation from start to completion.
 */
export declare class CmdResizeStructure extends Command {
  /** The structure being resized */
  readonly structure: Structure;
  
  /** Transformation manager for handling resize operations */
  readonly transMgr: TransformManager;
  
  /** The gizmo used for dragging and resizing */
  private readonly _draggingGizmo: DraggingGizmo;
  
  /** Active transformation request for the current resize operation */
  private _request?: TransformRequest;
  
  /**
   * Creates a new resize structure command.
   * @param structure - The structure to be resized
   * @param draggingGizmo - The gizmo to use for dragging interactions
   */
  constructor(structure: Structure, draggingGizmo: DraggingGizmo);
  
  /**
   * Executes the command, initializing the resize request.
   * Called when the command starts execution.
   */
  onExecute(): void;
  
  /**
   * Receives and handles events during the resize operation.
   * @param eventType - Type of event ("dragmove", "dragend", etc.)
   * @param eventData - Data associated with the event
   * @returns True if the event was handled, false otherwise
   */
  onReceive(eventType: string, eventData: DragEventData): boolean;
  
  /**
   * Completes the resize operation.
   * Commits the transformation request and notifies the command manager.
   * @private
   */
  private _onComplete(): void;
}