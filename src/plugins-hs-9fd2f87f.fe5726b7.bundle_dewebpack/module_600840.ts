interface TransactionData {
  [key: string]: unknown;
}

interface LightSlotEntity {
  dirtyGeometry(): void;
}

interface CustomizedModel {
  getHost(): unknown[];
  getLightSlotEntityById(id: string): LightSlotEntity | null;
  refreshFaceMaterial(): void;
}

interface MaterialBrushUtil {
  getDiyFaceMaterialDump(content: CustomizedModel): unknown;
  setDiyFaceMaterialDump(content: CustomizedModel, dump: unknown): void;
}

interface TransactionUtil {
  saveEntityToData(entities: unknown[], data: TransactionData): void;
  restoreEntityFromData(entities: unknown[], data: TransactionData): void;
}

declare const HSCore: {
  Model: {
    CustomizedModel: new (...args: any[]) => CustomizedModel;
  };
  Util: {
    Transaction: TransactionUtil;
  };
  Transaction: {
    Request: new (...args: any[]) => any;
  };
};

declare const HSApp: {
  PaintPluginHelper: {
    Util: {
      MaterialBrushUtil: MaterialBrushUtil;
    };
  };
};

export default class TransactionRequest extends HSCore.Transaction.Request {
  private _content: CustomizedModel;
  private _lightSlotId: string;
  private _beforeData: TransactionData;
  private _afterData: TransactionData;
  private _transEntities: unknown[];
  private MaterialBrushUtil: MaterialBrushUtil;
  private _diyBefores?: unknown;
  private _diyAfters?: unknown;

  constructor(content: CustomizedModel, lightSlotId: string) {
    super();
    
    this._content = content;
    this._lightSlotId = lightSlotId;
    this._beforeData = {};
    this._afterData = {};
    
    const host = this._content.getHost();
    this._transEntities = [content, ...host];
    
    HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._beforeData);
    
    this.MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
    
    if (this._content instanceof HSCore.Model.CustomizedModel) {
      this._diyBefores = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._content);
    }
  }

  onCommit(): void {
    this._apply();
    
    HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._afterData);
    
    if (this._content instanceof HSCore.Model.CustomizedModel) {
      this._content.refreshFaceMaterial();
      this._diyAfters = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._content);
    }
  }

  onUndo(): void {
    HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._beforeData);
    
    if (this._content && this._lightSlotId) {
      const lightSlotEntity = this._content.getLightSlotEntityById(this._lightSlotId);
      lightSlotEntity?.dirtyGeometry();
    }
    
    if (this._diyBefores) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyBefores);
    }
  }

  onRedo(): void {
    HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._afterData);
    
    if (this._content && this._lightSlotId) {
      const lightSlotEntity = this._content.getLightSlotEntityById(this._lightSlotId);
      lightSlotEntity?.dirtyGeometry();
    }
    
    if (this._diyAfters) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyAfters);
    }
  }

  protected _apply(): void {
    // Override in subclass
  }
}