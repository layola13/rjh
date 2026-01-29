import { HSCore, HSCatalog } from './HSCore';
import { MathService } from './MathService';

interface MaterialMeta {
  contentType: {
    isTypeOf(type: unknown): boolean;
  };
  seekId?: string;
  tileSize_x?: number;
  tileSize_y?: number;
}

interface MaterialData {
  seekId?: string;
  tileSize_x?: number;
  tileSize_y?: number;
}

interface MixPaintRegion {
  pattern: {
    patternUnits: Array<{
      materials: Array<{ seekId?: string }>;
    }>;
  };
}

interface MixPave {
  regions: MixPaintRegion[];
  getUniqueRegion(): unknown;
}

interface Material {
  mixpaint?: {
    mixPave: MixPave;
  };
}

interface Face {
  rawPath2d: unknown;
  dirtyMaterial(): void;
}

interface PaintService {
  normalPaint(face: Face, materialData: MaterialData): void;
}

interface CommandManager {
  current?: {
    type: string;
  };
  complete(command: unknown): void;
}

interface App {
  cmdManager?: CommandManager;
}

declare const HSApp: {
  Util: {
    Core: {
      define(name: string): unknown;
    };
  };
  PaintPluginHelper: {
    Util: {
      PaintService: PaintService;
    };
    Pave: {
      MixPaintPluginHelper: {
        resetPavingOptionToLeftBottom(face: Face): void;
      };
    };
  };
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  CommandType: {
    Decoration: string;
  };
};

export class DecorateRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _materialMeta: MaterialMeta;
  private readonly _faces: Face[];
  private readonly _PaintService: PaintService;
  private readonly _leftBottomStart: boolean;

  constructor(materialMeta: MaterialMeta, faces: Face[], leftBottomStart: boolean = false) {
    super();
    this._materialMeta = materialMeta;
    this._faces = faces;
    this._leftBottomStart = leftBottomStart;
    this._PaintService = HSApp.PaintPluginHelper.Util.PaintService;
  }

  onCommit(): void {
    this._paintFaces(this._faces);
    super.onCommit([]);

    const app = HSApp.App.getApp();
    if (
      app.cmdManager?.current?.type === HSFPConstants.CommandType.Decoration
    ) {
      app.cmdManager.complete(app.cmdManager.current);
    }
  }

  private _paintFaces(faces: Face[]): void {
    const materialMeta = this._materialMeta;
    const materialData = HSCore.Material.Util.getMaterialData(materialMeta);

    faces.forEach((face) => {
      const material = HSCore.Paint.PaintsUtil.getMaterial(face, undefined);

      if (this._isValidNewMaterial(material, materialData)) {
        if (
          materialMeta?.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Wallwrap)
        ) {
          this._firstLoadUpdateMaterial(face, materialData);
        }

        this._PaintService.normalPaint(face, materialData);

        if (this._leftBottomStart) {
          HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.resetPavingOptionToLeftBottom(face);
        }

        face.dirtyMaterial();
      }
    });
  }

  private _isValidNewMaterial(material: Material, newMaterialData: MaterialData): boolean {
    if (!newMaterialData?.seekId) {
      return false;
    }

    if (!material.mixpaint || material.mixpaint.mixPave.regions.length === 0) {
      return true;
    }

    const mixPave = material.mixpaint.mixPave;
    const uniqueRegion = mixPave.getUniqueRegion();
    const existingMaterial = mixPave.regions[0].pattern.patternUnits[0].materials[0];

    return !(uniqueRegion && existingMaterial.seekId === newMaterialData.seekId);
  }

  private _firstLoadUpdateMaterial(face: Face, materialData: MaterialData): void {
    if (face === undefined || materialData === undefined) {
      return;
    }

    const box = MathService.ins.getBoxFromPath(face.rawPath2d);
    const width = box.max.x - box.min.x;
    const height = box.max.y - box.min.y;

    if (materialData.tileSize_x !== undefined && materialData.tileSize_y !== undefined) {
      const aspectRatio = materialData.tileSize_x / materialData.tileSize_y;
      const heightFromWidth = width / aspectRatio;
      const widthFromHeight = height * aspectRatio;

      if (heightFromWidth > height || heightFromWidth === height) {
        materialData.tileSize_x = width;
        materialData.tileSize_y = heightFromWidth;
      } else {
        materialData.tileSize_x = widthFromHeight;
        materialData.tileSize_y = height;
      }
    }
  }
}

const moduleExport = HSApp.Util.Core.define(`hsw.plugin.walldecoration.req`);
(moduleExport as any).DecorateRequest = DecorateRequest;