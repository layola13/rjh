import { TransformNode } from "core/Misc/observable";
import { Control3D } from "./control3D";

/**
 * Orientation modes for 3D containers
 */
export enum Container3DOrientation {
  /** No specific orientation applied */
  UNSET_ORIENTATION = 0,
  /** Face towards the origin point */
  FACEORIGIN_ORIENTATION = 1,
  /** Face away from the origin point */
  FACEORIGINREVERSED_ORIENTATION = 2,
  /** Face forward direction */
  FACEFORWARD_ORIENTATION = 3,
  /** Face reversed forward direction */
  FACEFORWARDREVERSED_ORIENTATION = 4
}

/**
 * A 3D container that can hold and manage multiple 3D controls
 * Extends Control3D to provide hierarchical control management
 */
export declare class Container3D extends Control3D {
  /**
   * Orientation constants for container alignment
   */
  static readonly UNSET_ORIENTATION: number;
  static readonly FACEORIGIN_ORIENTATION: number;
  static readonly FACEORIGINREVERSED_ORIENTATION: number;
  static readonly FACEFORWARD_ORIENTATION: number;
  static readonly FACEFORWARDREVERSED_ORIENTATION: number;

  /**
   * Internal flag to prevent automatic layout updates
   * @internal
   */
  private _blockLayout: boolean;

  /**
   * Array of child controls contained in this container
   * @internal
   */
  private _children: Control3D[];

  /**
   * Gets the array of child controls
   * @readonly
   */
  get children(): Control3D[];

  /**
   * Gets or sets whether automatic layout is blocked
   * When set to false, triggers immediate child arrangement
   */
  get blockLayout(): boolean;
  set blockLayout(value: boolean);

  /**
   * Creates a new Container3D instance
   * @param name - Optional name for the container
   */
  constructor(name?: string);

  /**
   * Forces an update of the container layout
   * Arranges all children according to container rules
   * @returns This container instance for chaining
   */
  updateLayout(): this;

  /**
   * Checks if a specific control is a child of this container
   * @param control - The control to search for
   * @returns True if the control is found in children array
   */
  containsControl(control: Control3D): boolean;

  /**
   * Adds a control as a child of this container
   * Sets parent relationship and initializes node hierarchy
   * @param control - The control to add
   * @returns This container instance for chaining
   */
  addControl(control: Control3D): this;

  /**
   * Removes a control from this container
   * Clears parent relationship and disposes control's node
   * @param control - The control to remove
   * @returns This container instance for chaining
   */
  removeControl(control: Control3D): this;

  /**
   * Internal method to arrange children within the container
   * Override in derived classes to implement custom layout logic
   * @internal
   */
  protected _arrangeChildren(): void;

  /**
   * Creates the transform node for this container
   * @param scene - The scene to create the node in
   * @returns A new TransformNode instance
   * @internal
   */
  protected _createNode(scene: Scene): TransformNode;

  /**
   * Gets the type name of this control
   * @returns The string "Container3D"
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * Disposes the container and all its children
   * Cleans up resources and removes all child controls
   */
  dispose(): void;
}