/**
 * 3D touch mesh button control for Babylon.js GUI
 * @module TouchMeshButton3D
 */

import { TouchButton3D } from './touchButton3D';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Nullable } from '@babylonjs/core/types';

/**
 * Reserved data store interface for GUI3D controls
 */
interface GUI3DReservedDataStore {
  control?: TouchMeshButton3D;
}

/**
 * Animation callback function type
 */
type AnimationCallback = () => void;

/**
 * A 3D button control that uses a mesh as its visual representation.
 * Provides touch/pointer interaction with built-in scaling animations.
 * @extends TouchButton3D
 */
export declare class TouchMeshButton3D extends TouchButton3D {
  /**
   * The mesh used as the button's visual representation
   * @private
   */
  private _currentMesh: AbstractMesh;

  /**
   * Animation executed when pointer enters the button area
   * Default: scales the mesh up by 10%
   */
  pointerEnterAnimation: AnimationCallback;

  /**
   * Animation executed when pointer leaves the button area
   * Default: scales the mesh back to original size
   */
  pointerOutAnimation: AnimationCallback;

  /**
   * Animation executed when pointer is pressed down on the button
   * Default: scales the mesh down to 95%
   */
  pointerDownAnimation: AnimationCallback;

  /**
   * Animation executed when pointer is released from the button
   * Default: scales the mesh back from pressed state
   */
  pointerUpAnimation: AnimationCallback;

  /**
   * Creates a new TouchMeshButton3D
   * @param mesh - The mesh to use as the button representation
   * @param name - Optional name for the button control
   */
  constructor(mesh: AbstractMesh, name?: string);

  /**
   * Gets the type name of this control
   * @returns The string "TouchMeshButton3D"
   * @protected
   */
  protected _getTypeName(): string;

  /**
   * Creates and configures the node for this control
   * Injects control reference into child meshes' reserved data store
   * @returns The configured mesh node
   * @protected
   */
  protected _createNode(): AbstractMesh;

  /**
   * Applies material changes to the mesh (no-op for this control)
   * @param mesh - The mesh to affect
   * @protected
   */
  protected _affectMaterial(mesh: AbstractMesh): void;

  /**
   * Injects GUI3D reserved data store into a mesh
   * @param mesh - The mesh to inject data into
   * @returns The reserved data store
   * @private
   */
  private _injectGUI3DReservedDataStore(mesh: AbstractMesh): GUI3DReservedDataStore;

  /**
   * Gets the mesh used by this button
   */
  get mesh(): Nullable<AbstractMesh>;
}