interface MaterialData {
  dump(): unknown[];
  load(data: unknown): void;
}

interface Wall {
  getMaterial(faceType: string): MaterialData;
}

interface PaintData {
  face: string;
  mixedPanelOriginData?: boolean;
  applyMaterialToAll?: boolean;
}

interface PaintOptions {
  face: string;
}

interface PaintService {
  isMixPainted(wall: Wall, faceType: string): boolean;
  getMixPaintData(wall: Wall, options: PaintData): unknown;
  mixPaint(wall: Wall, data: unknown, options: PaintOptions): void;
  getNormalPaintData(wall: Wall, options: PaintData): unknown;
  normalPaint(wall: Wall, data: unknown, options: PaintOptions): void;
}

declare const HSApp: {
  Util: {
    Core: {
      define(namespace: string): unknown;
    };
  };
  PaintPluginHelper: {
    Util: {
      PaintService: PaintService;
    };
  };
};

declare const HSCore: {
  Transaction: {
    Request: new (...args: any[]) => any;
  };
};

const NAMESPACE = 'hsw.plugin.walldecoration';

export class EditWallPaperRequest extends HSCore.Transaction.Request {
  private readonly wall: Wall;
  private readonly faceType: string;
  private readonly savedMaterial: unknown;
  private readonly _materialData: MaterialData;
  private readonly PaintService: PaintService;

  constructor(wall: Wall, faceType: string, materialData: MaterialData) {
    super();
    this.wall = wall;
    this.faceType = faceType;
    
    const currentMaterial = this.wall.getMaterial(this.faceType);
    this.savedMaterial = currentMaterial.dump()[0];
    this._materialData = materialData;
    this.PaintService = HSApp.PaintPluginHelper.Util.PaintService;
  }

  onCommit(): void {
    this._editWallPaper(this._materialData.dump()[0]);
  }

  private _editWallPaper(materialData: unknown): void {
    this.wall.getMaterial(this.faceType).load(materialData);

    if (this.PaintService.isMixPainted(this.wall, this.faceType)) {
      const mixPaintData = this.PaintService.getMixPaintData(this.wall, {
        face: this.faceType,
        mixedPanelOriginData: true,
        applyMaterialToAll: true
      });
      this.PaintService.mixPaint(this.wall, mixPaintData, {
        face: this.faceType
      });
    } else {
      const normalPaintData = this.PaintService.getNormalPaintData(this.wall, {
        face: this.faceType
      });
      this.PaintService.normalPaint(this.wall, normalPaintData, {
        face: this.faceType
      });
    }
  }

  onUndo(): void {
    this._editWallPaper(this.savedMaterial);
  }

  onRedo(): void {
    this._editWallPaper(this._materialData.dump()[0]);
  }
}

const moduleDefinition = HSApp.Util.Core.define(`${NAMESPACE}.req`);
(moduleDefinition as any).EditWallPaperRequest = EditWallPaperRequest;