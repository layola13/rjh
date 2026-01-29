interface CustomizedModel {
  forEachContent(callback: (content: Content) => void): void;
  ID?: string;
}

interface Content {
  ID: string;
  contentType?: ContentType;
  z: number;
  ZSize: number;
  dirtyPosition(): void;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface Scene {
  activeLayer?: Layer;
}

interface Layer {
  height: number;
}

interface Document {
  scene: Scene;
  global_wall_height3d: number;
}

interface DocManager {
  activeDocument: Document;
}

declare const HSCore: {
  Util: {
    Content: {
      removeCustomizedModel(model: CustomizedModel): unknown;
      addCustomizedModel(spec: unknown): void;
    };
  };
  Doc: {
    getDocManager(): DocManager;
  };
  Transaction: {
    Common: {
      CompositeRequest: new () => CompositeRequest;
    };
  };
};

declare const HSCatalog: {
  ContentTypeEnum: {
    ext_tubeLamp: string;
    ext_CeilingAttachedLighting: string;
  };
};

declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
  };
};

interface CompositeRequest {
  onCommit?(): void;
  onUndo?(): void;
  onRedo?(): void;
}

class RemoveCustomizedModelTransaction extends HSCore.Transaction.Common.CompositeRequest {
  private _customizedModel: CustomizedModel;
  private _childrenHeight: Map<string, number>;
  private _spec: unknown;

  constructor(customizedModel: CustomizedModel) {
    super();
    this._customizedModel = customizedModel;
    this._childrenHeight = new Map<string, number>();
  }

  onCommit(): CustomizedModel {
    this._spec = HSCore.Util.Content.removeCustomizedModel(this._customizedModel);
    this._getLightingsOffsetHeight();
    super.onCommit?.();
    this._moveAttachedContents('onRedo');
    return this._customizedModel;
  }

  private _getLightingsOffsetHeight(): void {
    this._customizedModel.forEachContent((content: Content) => {
      if (
        content.contentType &&
        !content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_tubeLamp) &&
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting)
      ) {
        this._childrenHeight.set(content.ID, content.z);
      }
    });
  }

  private _moveAttachedContents(action: 'onRedo' | 'onUndo'): void {
    const document = HSCore.Doc.getDocManager().activeDocument;
    const layerHeight = document.scene.activeLayer
      ? document.scene.activeLayer.height
      : document.global_wall_height3d;

    this._customizedModel.forEachContent((content: Content) => {
      if (
        content.contentType &&
        !content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_tubeLamp) &&
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting)
      ) {
        content.z = action === 'onRedo'
          ? layerHeight - content.ZSize
          : this._childrenHeight.get(content.ID) ?? content.z;
        content.dirtyPosition();
      }
    });
  }

  onUndo(): void {
    super.onUndo?.();
    HSCore.Util.Content.addCustomizedModel(this._spec);
    this._moveAttachedContents('onUndo');
  }

  onRedo(): void {
    HSCore.Util.Content.removeCustomizedModel(this._customizedModel);
    super.onRedo?.();
    this._moveAttachedContents('onRedo');
  }

  getDescription(): string {
    return '删除硬装造型';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default RemoveCustomizedModelTransaction;