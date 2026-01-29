interface MaterialData {
  [key: string]: unknown;
}

interface Face {
  dirtyMaterial(): void;
  [key: string]: unknown;
}

interface PaintOptions {
  face: Face | undefined;
}

interface PaintService {
  normalPaint(face: Face, materialData: MaterialData, options: PaintOptions): void;
}

declare const HSCore: {
  Transaction: {
    Common: {
      StateRequest: new (...args: any[]) => any;
    };
  };
};

declare const HSApp: {
  PaintPluginHelper: {
    Util: {
      PaintService: PaintService;
    };
  };
};

/**
 * PasteRequest handles pasting material data to multiple faces
 */
export class PasteRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _materialData: MaterialData;
  private readonly _faces: Face[];
  private readonly _PaintService: PaintService;

  constructor(materialData: MaterialData, faces: Face[]) {
    super();
    this._materialData = materialData;
    this._faces = faces;
    this._PaintService = HSApp.PaintPluginHelper.Util.PaintService;
  }

  onCommit(): void {
    this._faces.forEach((face: Face) => {
      this._PaintService.normalPaint(face, this._materialData, {
        face: undefined
      });
      face.dirtyMaterial();
    });
  }
}