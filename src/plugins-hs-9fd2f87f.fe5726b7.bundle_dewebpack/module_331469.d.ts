/**
 * Ceiling change transaction state request module
 * Handles various ceiling and rotation change events with undo/redo support
 */

import { HSCore } from './HSCore';

/**
 * Message types for ceiling operations
 */
export type CeilingMessageType =
  | 'ceilingchangeend'
  | 'ceilingReset'
  | 'rotationchangeend'
  | 'ceilingResetIncludeRotate'
  | 'onBoolInputDataChange';

/**
 * Node configuration with event handlers
 */
export interface CeilingNode {
  /** Unique identifier for the node */
  eId?: string;
  
  /** Child nodes */
  children?: CeilingNode[];
  
  /**
   * Called when entering a node state
   * @param node - The current node
   * @param newValue - The new value being applied
   */
  onEnter?(node: CeilingNode, newValue: unknown): void;
  
  /**
   * Called when right title is clicked
   * @param node - The current node
   */
  onRightTitleClick?(node: CeilingNode): void;
}

/**
 * Property tree structure for ceiling content
 */
export interface PropertyTree {
  /** Root children nodes */
  children?: CeilingNode[];
}

/**
 * Parameters for ceiling content
 */
export interface CeilingContentParameters {
  /** Room loop data for ceiling initialization */
  roomLoop: unknown;
  
  /** Property tree containing node hierarchy */
  propertytree?: PropertyTree;
}

/**
 * Ceiling content interface with manipulation methods
 */
export interface CeilingContent {
  /** Configuration parameters */
  parameters: CeilingContentParameters;
  
  /**
   * Sets the rotation value
   * @param rotation - Rotation value in degrees
   */
  setRotation(rotation: number): void;
  
  /**
   * Initializes the ceiling document
   * @param roomLoop - Room loop data
   * @param forceRebuild - Whether to force rebuild
   */
  initCeilingDocument(roomLoop: unknown, forceRebuild: boolean): void;
  
  /**
   * Constructs the boundary representation
   */
  constructBrep(): void;
}

/**
 * Options for creating a ceiling change request
 */
export interface CeilingChangeOptions {
  /** The node being modified */
  node: CeilingNode;
  
  /** The new value being applied */
  newValue: unknown;
}

/**
 * Ceiling change state request
 * Manages transactional state changes for ceiling operations with undo/redo support
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 */
export default class CeilingChangeStateRequest extends HSCore.Transaction.Common.StateRequest {
  /** The message content */
  private _content: CeilingContent;
  
  /** The message type */
  private _msg: CeilingMessageType;
  
  /** The node being operated on */
  private _node: CeilingNode;
  
  /** The new value being applied */
  private _newValue: unknown;
  
  /**
   * Creates a new ceiling change state request
   * 
   * @param content - The ceiling content to operate on
   * @param message - The type of operation to perform
   * @param options - Additional options including node and new value
   */
  constructor(
    content: CeilingContent,
    message: CeilingMessageType,
    options: CeilingChangeOptions
  );
  
  /**
   * Executes the request based on the message type
   * Handles ceiling changes, rotations, and resets
   */
  doRequest(): void;
  
  /**
   * Commits the transaction
   * Executes the request and calls parent commit
   */
  onCommit(): void;
  
  /**
   * Undoes the transaction
   * Reconstructs the ceiling state to previous state
   */
  onUndo(): void;
  
  /**
   * Redoes the transaction
   * Reconstructs the ceiling state to new state
   */
  onRedo(): void;
  
  /**
   * Retrieves a node by its unique identifier
   * Recursively searches through the property tree
   * 
   * @param id - The node eId to search for
   * @returns The found node or undefined
   */
  private _getNodeById(id: string): CeilingNode | undefined;
  
  /**
   * Determines if this request can be part of a transaction field
   * 
   * @returns Always returns true
   */
  canTransactField(): boolean;
}