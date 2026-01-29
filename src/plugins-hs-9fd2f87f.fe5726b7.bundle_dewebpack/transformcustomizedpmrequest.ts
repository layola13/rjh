import { HSCore } from './HSCore';

export class TransformCustomizedPMRequest extends HSCore.Transaction.Common.StateRequest {
  private _rootEntity: any;
  private _matrix4: any;
  private _beforeDoc: any;
  private _afterDoc: any;

  constructor(rootEntity: any, matrix4: any) {
    super();
    this._rootEntity = rootEntity;
    this._matrix4 = matrix4;
    this._beforeDoc = this._rootEntity.webCADDocument;
  }

  onCommit(): void {
    super.onCommit();

    const transformData = this._rootEntity.getAllChildren().map((child: any) => {
      const childMatrix = new HSMath.Matrix4().fromArray(child.getTransformMatrix().toArray());
      return {
        id: child.instanceId,
        matrix: this._matrix4.multiplied(childMatrix)
      };
    });

    if (DiySdk.DmDiyApi.transformInstances(this._rootEntity.modelingDocId, transformData)) {
      const instanceMetaData = DiySdk.DmDiyApi.getFirstLevelInstanceMetaData(
        this._rootEntity.modelingDocId,
        0.001
      );

      this._rootEntity
        .getChildrenByClass(HSCore.Model.CustomizedPMInstanceModel)
        .forEach((instance: any) => {
          const metaIndex = instanceMetaData.findIndex(
            (meta: any) => meta.instanceId === instance.instanceId
          );

          if (metaIndex > -1) {
            instance.updateByData(instanceMetaData[metaIndex]);
            instance.dirtyGeometry(undefined);
          }
        });

      this._rootEntity.webCADDocument = DiySdk.DmDiyApi.dumpDocument(
        this._rootEntity.modelingDocId
      );
    }

    this._afterDoc = this._rootEntity.webCADDocument;
  }

  async onUndo(): Promise<void> {
    super.onUndo();
    await this._rootEntity.openDiyDocument();

    if (this._beforeDoc !== this._rootEntity.webCADDocument) {
      // Debug flag check
    }
  }

  async onRedo(): Promise<void> {
    super.onRedo();
    await this._rootEntity.openDiyDocument();

    if (this._afterDoc !== this._rootEntity.webCADDocument) {
      // Debug flag check
    }
  }
}