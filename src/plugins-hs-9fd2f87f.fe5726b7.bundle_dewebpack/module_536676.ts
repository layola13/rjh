interface ResizeSpec {
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface ScaleSpec {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface MaterialBrushUtil {
  getDiyFaceMaterialDump(content: HSCore.Model.CustomizedModel): unknown;
  setDiyFaceMaterialDump(content: HSCore.Model.CustomizedModel, dump: unknown): void;
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
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  refreshFaceMaterial(): void;
  applyLengths(xLength: number, yLength: number, zLength: number): void;
}

interface Transaction {
  type: string;
  data: unknown[];
}

declare const HSCore: {
  Model: {
    CustomizedModel: new (...args: unknown[]) => CustomizedModel;
  };
  Transaction: {
    Request: new (...args: unknown[]) => unknown;
  };
};

declare const HSFPConstants: {
  RequestType: {
    ResizeCustomizedModel: string;
  };
};

declare const HSApp: HSApp;

const LENGTH_PROPERTIES = ["XLength", "YLength", "ZLength"] as const;
const SCALE_PROPERTIES = ["XScale", "YScale", "ZScale"] as const;

class ResizeCustomizedModelRequest extends HSCore.Transaction.Request {
  private _content: CustomizedModel;
  private _resizeSpec: ResizeSpec;
  private MaterialBrushUtil: MaterialBrushUtil;
  private _diyBefores?: unknown;
  private _diyAfters?: unknown;

  constructor(content: CustomizedModel, scaleSpec: Partial<ScaleSpec>) {
    super();
    this._content = content;
    this._resizeSpec = this._getResizeSpec(content, scaleSpec);
    this.MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;

    if (this._content instanceof HSCore.Model.CustomizedModel) {
      this._diyBefores = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._content);
    }
  }

  onCommit(): CustomizedModel {
    this._applyResizeSpec();

    if (this._content instanceof HSCore.Model.CustomizedModel) {
      this._content.refreshFaceMaterial();
      this._diyAfters = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._content);
    }

    return this._content;
  }

  onUndo(): void {
    this._applyResizeSpec();

    if (this._diyBefores) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyBefores);
    }
  }

  onRedo(): void {
    this._applyResizeSpec();

    if (this._diyAfters) {
      this.MaterialBrushUtil.setDiyFaceMaterialDump(this._content, this._diyAfters);
    }
  }

  onCompose(transaction: Transaction): boolean {
    if (transaction.type !== HSFPConstants.RequestType.ResizeCustomizedModel) {
      return false;
    }

    const transactionContent = transaction.data[0];
    return this._content === transactionContent;
  }

  private _getResizeSpec(content: CustomizedModel, scaleSpec: Partial<ScaleSpec>): ResizeSpec {
    const scales: ScaleSpec = {
      XScale: content.XScale,
      YScale: content.YScale,
      ZScale: content.ZScale,
      ...scaleSpec
    };

    return {
      XLength: content.XLength * scales[SCALE_PROPERTIES[0]],
      YLength: content.YLength * scales[SCALE_PROPERTIES[1]],
      ZLength: content.ZLength * scales[SCALE_PROPERTIES[2]]
    };
  }

  private _applyResizeSpec(): void {
    const previousSpec = this._applyResizeSpecForContent(this._content, this._resizeSpec);

    if (previousSpec) {
      this._resizeSpec = previousSpec;
    }
  }

  private _applyResizeSpecForContent(content: CustomizedModel, resizeSpec: ResizeSpec): ResizeSpec | undefined {
    if (content instanceof HSCore.Model.CustomizedModel) {
      const previousSpec: Partial<ResizeSpec> = {};

      LENGTH_PROPERTIES.forEach((property) => {
        previousSpec[property] = content[property];
      });

      SCALE_PROPERTIES.forEach((property) => {
        content[property] = 1;
      });

      content.applyLengths(
        resizeSpec[LENGTH_PROPERTIES[0]],
        resizeSpec[LENGTH_PROPERTIES[1]],
        resizeSpec[LENGTH_PROPERTIES[2]]
      );

      return previousSpec as ResizeSpec;
    }

    return undefined;
  }
}

export default ResizeCustomizedModelRequest;