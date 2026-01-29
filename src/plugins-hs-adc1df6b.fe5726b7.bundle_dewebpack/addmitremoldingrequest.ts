import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface ProductMeta {
  profile: unknown;
  material?: unknown;
  [key: string]: unknown;
}

export class AddMitreMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private productMeta: ProductMeta;
  private faceIds: string[];
  private moldingType: HSCore.Model.MoldingTypeEnum = HSCore.Model.MoldingTypeEnum.Mitre;

  constructor(productMeta: ProductMeta, faceIds: string[]) {
    super();
    this.productMeta = productMeta;
    this.faceIds = faceIds;
  }

  private addMolding(): void {
    if ((this.faceIds?.length ?? 0) < 2 || !this.productMeta) {
      return;
    }

    const app = HSApp.App.getApp();
    const activeLayer = app.floorplan.scene.activeLayer;

    const existingMolding = Object.values(activeLayer.children).find(
      (child): child is HSCore.Model.Mitre =>
        child instanceof HSCore.Model.Mitre && this.relatedFaces(child)
    );

    if (existingMolding) {
      HSCore.Util.Content.removeContent(existingMolding);
    }

    const newMolding = HSCore.Util.Molding.createFromType(this.moldingType);
    newMolding.initByMeta(this.productMeta.profile);

    if (this.productMeta.material) {
      newMolding.material = HSCore.Material.Material.create(this.productMeta.material);
    }

    HSCore.Util.Molding.copyMoldingAttribute(newMolding, this.productMeta);
    newMolding.relatedFaceIds = [...this.faceIds];

    activeLayer.addChild(newMolding);
    newMolding.dirtyGeometry();

    const selectionManager = app.selectionManager;
    selectionManager.unselectAll();
    selectionManager.select(newMolding, undefined);
  }

  private relatedFaces(molding: HSCore.Model.Mitre): boolean {
    return this.faceIds.every((faceId) => molding.relatedFaceIds.includes(faceId));
  }

  onCommit(): void {
    this.addMolding();
    super.onCommit([]);
  }

  onUndo(): void {
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '添加阳角线';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}