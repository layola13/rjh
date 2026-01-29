import { HSCore } from './HSCore';
import type { ProductMetadata, Face, MoldingEntity, MoldingTypeEnum } from './types';

type HSCoreType = typeof HSCore;

/**
 * Request to change the molding type of a wall molding entity
 */
class ChangeMoldingTypeRequest extends HSCore.Transaction.Request {
  private productMeta: ProductMetadata;
  private face: Face;
  private moldingType: MoldingTypeEnum;
  private savedEntity: MoldingEntity;
  private newEntity?: MoldingEntity;

  constructor(
    productMeta: ProductMetadata,
    face: Face,
    savedEntity: MoldingEntity,
    moldingType: MoldingTypeEnum
  ) {
    super();
    this.productMeta = productMeta;
    this.face = face;
    this.moldingType = moldingType;
    this.savedEntity = savedEntity;
    this.newEntity = undefined;
  }

  onCommit(): MoldingEntity | undefined {
    if (
      HSCore.Model.WallMolding.isValidMoldingType(this.moldingType) &&
      this.savedEntity
    ) {
      this.newEntity = this.createEntity(this.productMeta);
      return this.changeMoldingType(this.savedEntity, this.newEntity);
    }
    console.assert(false, 'invalid molding type');
    return undefined;
  }

  onUndo(): MoldingEntity | undefined {
    return this.changeMoldingType(this.newEntity, this.savedEntity);
  }

  onRedo(): MoldingEntity | undefined {
    return this.changeMoldingType(this.savedEntity, this.newEntity);
  }

  private changeMoldingType(
    oldEntity?: MoldingEntity,
    newEntity?: MoldingEntity
  ): MoldingEntity | undefined {
    if (oldEntity && newEntity) {
      this.face.removeMolding(oldEntity);
      this.addToFace(newEntity);

      const selectionManager = HSApp.App.getApp().selectionManager;
      if (!(selectionManager.selected()[0] instanceof HSCore.Model.Face)) {
        selectionManager.unselectAll();
        selectionManager.select(newEntity);
      }

      return newEntity;
    }
    return undefined;
  }

  private addToFace(entity: MoldingEntity): void {
    if (!entity) {
      return;
    }

    entity.assignTo(this.face);

    if (
      entity instanceof HSCore.Model.WallBoardBaseboard ||
      entity instanceof HSCore.Model.WallBoardWaistLine
    ) {
      const existingMoldings = this.face.getMolding(entity.type);
      existingMoldings?.forEach((molding: MoldingEntity) => {
        this.face.removeMolding(molding);
      });
    }

    this.face.addMolding(entity);
    HSCore.Util.Molding.dirtyNeighborMoldingsByFacetype(
      this.face,
      this.moldingType
    );
  }

  private createEntity(productMeta: ProductMetadata): MoldingEntity {
    let material: unknown | undefined = undefined;

    if (productMeta.material) {
      material = HSCore.Material.Material.create(productMeta.material);
    }

    const newMolding = HSCore.Util.Molding.createFromType(this.moldingType);

    if (this.moldingType === HSCore.Model.MoldingTypeEnum.WallBoardBaseboard) {
      const data: Record<string, unknown> = {};
      data.profileSizeX = this.savedEntity.metadata.profileSizeX;
      data.profileSizeY = this.savedEntity.metadata.profileSizeY;
    }

    newMolding.initByMeta(productMeta.profile);
    newMolding.material = material;
    newMolding.topoPathers.push(...this.savedEntity.topoPathers);

    return newMolding;
  }
}

export { ChangeMoldingTypeRequest };