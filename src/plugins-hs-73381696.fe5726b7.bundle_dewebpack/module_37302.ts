interface TargetInfo {
  entity: any;
}

interface MaterialData {
  materialData: any;
}

interface TransactionData {
  prepareRedo(): void;
  undo(): void;
  redo(): void;
}

interface ProxyObject {
  prepareUndoData(entity: any): TransactionData;
  applyMaterialDataForMesh(targetInfo: any, materialData: any): Promise<void>;
}

type TransactionStatus = "" | "running";

export default class MaterialTransaction extends HSCore.Transaction.Common.StateRequest {
  private static _status: TransactionStatus = "";
  private _targetInfo: TargetInfo;
  private _material: MaterialData;
  private _transactionData?: TransactionData;

  constructor(targetInfo: TargetInfo, material: MaterialData) {
    super();
    this._targetInfo = targetInfo;
    this._material = material;
  }

  async onCommitAsync(): Promise<void> {
    if (MaterialTransaction._status === "running") {
      return;
    }

    MaterialTransaction._status = "running";

    let entity = this._targetInfo.entity;
    const currentFilter = HSApp.App.getApp().selectionManager.getCurrentFilter();
    const isCustomModel = HSApp.Util.Content.isCustomModel(entity);

    if (isCustomModel && currentFilter?.id !== "cabinetfilter") {
      entity = entity.parent;
    } else {
      entity = HSCore.Util.Entity.getRootEntity(entity);
    }

    const proxyObject: ProxyObject = entity.getProxyObject();
    this._transactionData = proxyObject.prepareUndoData(entity);

    await proxyObject.applyMaterialDataForMesh(
      {
        ...this._targetInfo,
        entity: entity
      },
      this._material.materialData
    );

    this._transactionData.prepareRedo();
    await super.onCommitAsync();
    MaterialTransaction._status = "";
  }

  onUndo(): void {
    this._transactionData?.undo();
    super.onUndo();
  }

  onRedo(): void {
    this._transactionData?.redo();
    super.onRedo();
  }
}