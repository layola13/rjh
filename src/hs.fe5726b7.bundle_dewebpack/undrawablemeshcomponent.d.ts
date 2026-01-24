import { MeshComponent, SceneComponent, TickGroup, ObjectManager } from './engine-core';
import { BatchingComponent } from './BatchingComponent';
import { RenderScene } from './RenderScene';
import { Material } from './Material';
import { isMaterialDirtyForBatching, clearMaterialDirtyForBatching } from './MaterialUtils';

/**
 * A mesh component that can be toggled between drawable and non-drawable states.
 * When non-drawable, the component can be batched with other meshes for performance optimization.
 * 
 * @remarks
 * - In drawable mode, the component is rendered individually and added to the render scene.
 * - In non-drawable mode, the component can be merged into batching groups managed by a parent BatchingComponent.
 * - Supports dynamic visibility toggling and dirty state tracking for efficient rendering updates.
 */
export declare class UndrawableMeshComponent extends MeshComponent {
  /**
   * Whether this mesh component should be rendered individually.
   * When false, the component may be batched with others.
   */
  protected mDrawable: boolean;

  /**
   * The ID of the batching merge group this component belongs to.
   * -1 indicates the component is not part of any merge group.
   */
  protected mMergeGroupId: number;

  /**
   * Reference to the parent BatchingComponent that manages this component's batching state.
   * Null if no batching component exists in the hierarchy.
   */
  protected mOwnerBatchComponent: BatchingComponent | null;

  /**
   * Flag indicating whether the material properties have changed and require update.
   */
  materialDirty: boolean;

  /**
   * The update queue ID determining when this component's update method is called.
   */
  protected mUpdateFlag: number;

  constructor();

  /**
   * Sets whether this component should be rendered individually.
   * 
   * @param drawable - True to render individually, false to enable batching
   * 
   * @remarks
   * - When changing from drawable to non-drawable, removes the primitive from the render scene
   * - When changing state, updates the component's update queue and marks render state as dirty
   */
  setDrawable(drawable: boolean): void;

  /**
   * Gets the current drawable state of this component.
   * 
   * @returns True if the component is rendered individually, false if batching-eligible
   */
  getDrawable(): boolean;

  /**
   * Traverses up the scene hierarchy to find and cache the parent BatchingComponent.
   * 
   * @remarks
   * Updates the mOwnerBatchComponent property with the first BatchingComponent found in ancestors.
   * If no BatchingComponent is found, mOwnerBatchComponent remains null.
   */
  updateOwnerBatchingComponent(): void;

  /**
   * Called when this component is registered to a render scene.
   * 
   * @param scene - The render scene being registered to
   * 
   * @remarks
   * - Adds the component as a primitive if drawable
   * - Marks render state and transform as dirty
   * - Updates the owner batching component reference
   * - Attempts to add the component to batching if applicable
   */
  onRegisterRenderScene(scene: RenderScene): void;

  /**
   * Called when this component is unregistered from the scene.
   * 
   * @remarks
   * - Removes the component from the render scene if drawable
   * - Clears all dirty flags
   * - Attempts to remove from batching
   * - Clears the owner batching component reference
   */
  onUnRegister(): void;

  /**
   * Sets the visibility of this component.
   * 
   * @param visible - True to show the component, false to hide it
   * 
   * @remarks
   * When visibility changes:
   * - If becoming visible, attempts to add to batching
   * - If becoming invisible, attempts to remove from batching
   */
  setVisible(visible: boolean): void;

  /**
   * Marks the render state as dirty, triggering a re-evaluation on the next frame.
   * 
   * @remarks
   * If this component is part of a batching group and not drawable,
   * marks the entire merge group as dirty in the owner BatchingComponent.
   */
  markRenderStateDirty(): void;

  /**
   * Called when the component's transform (position, rotation, scale) has changed.
   * 
   * @remarks
   * If this component is part of a batching group and not drawable,
   * marks the entire merge group as dirty in the owner BatchingComponent.
   */
  onTransformChanged(): void;

  /**
   * Creates a render proxy object for this component.
   * 
   * @returns The render proxy handle, or 0 if the component is not drawable
   * 
   * @remarks
   * Only drawable components can create render proxies.
   * Non-drawable components will log a warning and return 0.
   */
  createRenderProxy(): number;

  /**
   * Updates the component's state for the current frame.
   * 
   * @param deltaTime - Time elapsed since the last frame in seconds
   * 
   * @remarks
   * - If drawable, delegates to the parent MeshComponent's update logic
   * - If non-drawable and part of a batching group, checks for material changes
   *   and marks the merge group as dirty if needed
   */
  update(deltaTime: number): void;

  /**
   * Clears all dirty flags (render state, transform, and material).
   */
  clearAllDirty(): void;

  /**
   * Clears only the render state dirty flag.
   */
  clearRenderStateDirty(): void;

  /**
   * Checks if the render state is marked as dirty.
   * 
   * @returns True if render state needs updating, false otherwise
   */
  getIsRenderStateDirty(): boolean;

  /**
   * Clears only the transform dirty flag.
   */
  clearTransformDirty(): void;

  /**
   * Checks if the transform is marked as dirty.
   * 
   * @returns True if transform has changed, false otherwise
   */
  getTransformDirty(): boolean;

  /**
   * Attempts to add this component to a batching group.
   * 
   * @remarks
   * Only processes non-drawable components with an owner BatchingComponent:
   * - If not yet in a merge group (mMergeGroupId === -1) and visible, adds to pending components
   * - If already in a merge group, marks that group as dirty for re-batching
   */
  tryAddToBatching(): void;

  /**
   * Attempts to remove this component from its batching group.
   * 
   * @remarks
   * Only processes non-drawable components with an owner BatchingComponent:
   * - Removes from the pending added components set
   * - If in a merge group, marks that group as dirty for re-batching
   */
  tryRemoveFromBatching(): void;
}