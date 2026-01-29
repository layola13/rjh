import { TickGroup, SceneComponent, MeshComponent, ObjectManager } from './SceneCore';
import { BatchingComponent } from './BatchingComponent';
import { isMaterialDirtyForBatching, clearMaterialDirtyForBatching } from './MaterialUtils';
import type { RenderScene } from './RenderScene';
import type { Material } from './Material';
import type { RenderProxy } from './RenderProxy';

/**
 * A mesh component that can be toggled between drawable and undrawable states.
 * When undrawable, it participates in batching optimization.
 */
export class UndrawableMeshComponent extends MeshComponent {
  private mDrawable: boolean = false;
  private mMergeGroupId: number = -1;
  private mOwnerBatchComponent: BatchingComponent | null = null;
  public materialDirty: boolean = false;
  protected mUpdateFlag: number = TickGroup.OnLogic - 1;

  constructor() {
    super();
  }

  /**
   * Sets whether this component should be directly drawable or participate in batching.
   * @param drawable - True to render directly, false to batch with others
   */
  public setDrawable(drawable: boolean): void {
    if (this.mDrawable === drawable) {
      return;
    }

    if (drawable === false && this.mRenderScene) {
      this.mRenderScene.removePrimitive(this);
      this.setUpdateQueueId(TickGroup.OnLogic - 1);
    } else {
      this.setUpdateQueueId(TickGroup.OnRender);
    }

    this.mIsRenderStateDirty = true;
    this.mTransformDirty = true;
    this.mDrawable = drawable;
  }

  /**
   * Gets the current drawable state.
   * @returns True if rendering directly, false if batched
   */
  public getDrawable(): boolean {
    return this.mDrawable;
  }

  /**
   * Searches up the node hierarchy to find the owning BatchingComponent.
   */
  public updateOwnerBatchingComponent(): void {
    let parentNode = this.getNode().getParent();

    while (parentNode !== null) {
      const batchComponent = parentNode.getComponent(BatchingComponent);
      if (batchComponent !== null) {
        this.mOwnerBatchComponent = batchComponent;
        break;
      }
      parentNode = parentNode.getParent();
    }
  }

  public onRegisterRenderScene(scene: RenderScene): void {
    super.onRegisterRenderScene(scene);

    if (this.mRenderScene) {
      if (this.mDrawable) {
        this.mRenderScene.addPrimitive(this);
      }
      this.mIsRenderStateDirty = true;
      this.mTransformDirty = true;
    }

    this.updateOwnerBatchingComponent();
    this.tryAddToBatching();
  }

  public onUnRegister(): void {
    if (this.mRenderScene) {
      if (this.mDrawable) {
        this.mRenderScene.removePrimitive(this);
      }
      this.mIsRenderStateDirty = false;
      this.mTransformDirty = false;
      super.onUnRegister();
      this.tryRemoveFromBatching();
      this.mOwnerBatchComponent = null;
    }
  }

  public setVisible(visible: boolean): void {
    const previousVisible = this.mVisible;
    super.setVisible(visible);

    if (previousVisible !== visible) {
      if (visible) {
        this.tryAddToBatching();
      } else {
        this.tryRemoveFromBatching();
      }
    }
  }

  public markRenderStateDirty(): void {
    super.markRenderStateDirty();

    if (this.mOwnerBatchComponent) {
      if (!this.mDrawable && this.mMergeGroupId !== -1) {
        this.mOwnerBatchComponent.mDirtyGroupIds.add(this.mMergeGroupId);
      }
    }
  }

  public onTransformChanged(): void {
    super.onTransformChanged();

    if (this.mOwnerBatchComponent) {
      if (!this.mDrawable && this.mMergeGroupId !== -1) {
        this.mOwnerBatchComponent.mDirtyGroupIds.add(this.mMergeGroupId);
      }
    }
  }

  public createRenderProxy(): RenderProxy | 0 {
    if (this.mDrawable) {
      return super.createRenderProxy();
    } else {
      console.warn("cannot create proxy for undrawableMeshComponent");
      return 0;
    }
  }

  public update(deltaTime: number): void {
    if (this.mDrawable) {
      super.update(deltaTime);
    } else {
      const material = this.getMaterial();
      if (
        this.mOwnerBatchComponent &&
        this.mMergeGroupId !== -1 &&
        isMaterialDirtyForBatching(material)
      ) {
        this.mOwnerBatchComponent.mDirtyGroupIds.add(this.mMergeGroupId);
        clearMaterialDirtyForBatching(material);
        this.materialDirty = true;
      }
    }
  }

  public clearAllDirty(): void {
    this.mIsRenderStateDirty = false;
    this.mTransformDirty = false;
    this.materialDirty = false;
  }

  public clearRenderStateDirty(): void {
    this.mIsRenderStateDirty = false;
  }

  public getIsRenderStateDirty(): boolean {
    return this.mIsRenderStateDirty;
  }

  public clearTransformDirty(): void {
    this.mTransformDirty = false;
  }

  public getTransformDirty(): boolean {
    return this.mTransformDirty;
  }

  /**
   * Attempts to add this component to the batching system if conditions are met.
   */
  private tryAddToBatching(): void {
    if (!this.mDrawable && this.mOwnerBatchComponent) {
      if (this.mMergeGroupId === -1) {
        if (this.getVisible()) {
          this.mOwnerBatchComponent.mAddedComponents.add(this);
        }
      } else {
        this.mOwnerBatchComponent.mDirtyGroupIds.add(this.mMergeGroupId);
      }
    }
  }

  /**
   * Attempts to remove this component from the batching system.
   */
  private tryRemoveFromBatching(): void {
    if (!this.mDrawable && this.mOwnerBatchComponent) {
      this.mOwnerBatchComponent.mAddedComponents.delete(this);
      if (this.mMergeGroupId !== -1) {
        this.mOwnerBatchComponent.mDirtyGroupIds.add(this.mMergeGroupId);
      }
    }
  }
}

ObjectManager.RegisterClass(UndrawableMeshComponent, "UndrawableMeshComponent");