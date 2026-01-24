/**
 * Babylon.js GUI 3D Manager
 * Manages 3D GUI controls in a scene using a utility layer for rendering and interaction
 */

import { Scene } from '@babylonjs/core/scene';
import { Observable } from '@babylonjs/core/Misc/observable';
import { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Nullable } from '@babylonjs/core/types';
import { PointerInfo, PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { PickingInfo } from '@babylonjs/core/Collisions/pickingInfo';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Material } from '@babylonjs/core/Materials/material';
import { Observer } from '@babylonjs/core/Misc/observable';
import { Container3D } from './controls/container3D';
import { Control3D } from './controls/control3D';

/**
 * Reserved data store for GUI3D metadata attached to meshes
 */
interface GUI3DReservedDataStore {
  GUI3D?: {
    control?: Control3D;
  };
}

/**
 * Extended mesh type with GUI3D reserved data
 */
interface MeshWithGUI3D extends AbstractMesh {
  reservedDataStore?: GUI3DReservedDataStore;
}

/**
 * Manager for 3D GUI controls that handles rendering, scaling, and pointer interactions
 * @public
 */
export declare class GUI3DManager {
  /**
   * MRTK (Mixed Reality Toolkit) realistic scaling factor for controls
   * @remarks This value (0.032) provides realistic physical sizes for MR/VR experiences
   */
  static readonly MRTK_REALISTIC_SCALING: number;

  /**
   * Observable triggered when the picked point on a control changes
   * @remarks Notifies with the new picked point or null when pointer leaves controls
   */
  readonly onPickedPointChangedObservable: Observable<Nullable<Vector3>>;

  /**
   * Observable triggered during picking operations
   * @remarks Notifies with the picked mesh during pointer interactions
   */
  readonly onPickingObservable: Observable<Nullable<AbstractMesh>>;

  /**
   * The Babylon.js scene this manager is attached to
   * @readonly
   */
  get scene(): Scene;

  /**
   * The utility layer used for rendering 3D GUI controls
   * @remarks Utility layer provides a separate rendering pass for GUI elements
   * @readonly
   */
  get utilityLayer(): Nullable<UtilityLayerRenderer>;

  /**
   * Custom scaling factor applied to all controls in this manager
   * @remarks When set, all child controls are scaled proportionally
   * @default 1
   */
  get controlScaling(): number;
  set controlScaling(value: number);

  /**
   * Whether to use MRTK realistic scaling for mixed reality experiences
   * @remarks Setting to true applies MRTK_REALISTIC_SCALING, false resets to 1
   */
  get useRealisticScaling(): boolean;
  set useRealisticScaling(value: boolean);

  /**
   * The root container holding all 3D controls
   * @readonly
   */
  get rootContainer(): Container3D;

  /**
   * Creates a new GUI3DManager instance
   * @param scene - The scene to attach the manager to (defaults to last created scene)
   */
  constructor(scene?: Scene);

  /**
   * Checks if a control is contained within this manager's root container
   * @param control - The control to check
   * @returns True if the control is managed by this manager
   */
  containsControl(control: Control3D): boolean;

  /**
   * Adds a 3D control to the root container
   * @param control - The control to add
   * @returns This manager instance for chaining
   * @remarks Automatically applies controlScaling to the added control
   */
  addControl(control: Control3D): GUI3DManager;

  /**
   * Removes a 3D control from the root container
   * @param control - The control to remove
   * @returns This manager instance for chaining
   * @remarks Reverses any manager-applied scaling on the control
   */
  removeControl(control: Control3D): GUI3DManager;

  /**
   * Disposes of the manager and all its resources
   * @remarks Cleans up controls, materials, observers, and utility layer
   */
  dispose(): void;
}