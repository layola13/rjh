interface MaterialMap {
  [key: string]: unknown;
}

interface Content {
  setMaterialData(materialMap: MaterialMap): void;
}

interface Signal {
  dispatch(): void;
}

interface App {
  signalContextualtoolRefresh: Signal;
  signalPropertyBarRefresh: Signal;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSCore {
  Transaction: {
    Request: new (...args: any[]) => TransactionRequest;
  };
}

declare const HSApp: HSApp;
declare const HSCore: HSCore;

abstract class TransactionRequest {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
}

class MaterialUpdateRequest extends TransactionRequest {
  private readonly _content: Content;
  private readonly _originalMaterialMap: MaterialMap;
  private readonly _updatedMaterialMap: MaterialMap;

  constructor(
    content: Content,
    originalMaterialMap: MaterialMap,
    updatedMaterialMap: MaterialMap
  ) {
    super();
    this._content = content;
    this._originalMaterialMap = originalMaterialMap;
    this._updatedMaterialMap = updatedMaterialMap;
  }

  private _updateMaterials(materialMap: MaterialMap): void {
    this._content.setMaterialData(materialMap);
    const app = HSApp.App.getApp();
    app.signalContextualtoolRefresh.dispatch();
    app.signalPropertyBarRefresh.dispatch();
  }

  public onCommit(): void {
    this._updateMaterials(this._updatedMaterialMap);
  }

  public onUndo(): void {
    this._updateMaterials(this._originalMaterialMap);
  }

  public onRedo(): void {
    this._updateMaterials(this._updatedMaterialMap);
  }
}

export default MaterialUpdateRequest;