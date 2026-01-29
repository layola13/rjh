interface MaterialBrushUtil {
  getDiyFaceMaterialDump(content: CustomizedModel): unknown;
  setDiyFaceMaterialDump(content: CustomizedModel, dump: unknown): void;
}

interface PaintPluginHelper {
  Util: {
    MaterialBrushUtil: MaterialBrushUtil;
  };
}

interface HSApp {
  PaintPluginHelper: PaintPluginHelper;
}

interface CustomizedModel {
  flip: number;
  refreshFaceMaterial(): void;
}

interface TransactionRequest {
  new (...args: any[]): any;
}

interface HSCore {
  Model: {
    CustomizedModel: new (...args: any[]) => CustomizedModel;
  };
  Transaction: {
    Request: TransactionRequest;
  };
}

interface HSFPConstants {
  LogGroupTypes: {
    ContentOperation: string;
  };
}

declare const HSApp: HSApp;
declare const HSCore: HSCore;
declare const HSFPConstants: HSFPConstants;

type Content = CustomizedModel | any;

class FlipContentRequest extends HSCore.Transaction.Request {
  private _content: Content;
  private MaterialBrushUtil: MaterialBrushUtil | undefined;
  private _diyBefores: unknown;
  private _diyAfters: unknown;

  constructor(content: Content) {
    super();
    this._content = content;
    this.MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
    
    if (this._content instanceof HSCore.Model.CustomizedModel) {
      this._diyBefores = this.MaterialBrushUtil?.getDiyFaceMaterialDump(this._content);
    }
  }

  onCommit(): void {
    this._content.flip = 1 ^ this._content.flip;
    
    if (this._content instanceof HSCore.Model.CustomizedModel) {
      this._content.refreshFaceMaterial();
      this._diyAfters = this.MaterialBrushUtil?.getDiyFaceMaterialDump(this._content);
    }
  }

  onUndo(): void {
    this._content.flip = 1 ^ this._content.flip;
    
    if (this._diyBefores && this.MaterialBrushUtil) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyBefores);
    }
  }

  onRedo(): void {
    this._content.flip = 1 ^ this._content.flip;
    
    if (this._diyAfters && this.MaterialBrushUtil) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyAfters);
    }
  }

  getDescription(): string {
    return "翻转物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default FlipContentRequest;