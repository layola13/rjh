import { HSCore } from './HSCore';

interface FaceGroupBoundMap {
  [faceId: string]: {
    left: number;
    width: number;
    height: number;
  };
}

interface FaceGroupInfo {
  faceGroupId: string;
  faceGroupBoundMap: FaceGroupBoundMap;
  background: Array<{ x: number; y: number }>;
}

interface Point2D {
  x: number;
  y: number;
}

interface Curve2DData {
  from: Point2D;
  to: Point2D;
  type: string;
}

interface MaterialData {
  mixpaint?: {
    sketch2d: any;
    faceGroupId?: string;
    faceEntity?: any;
    faceGroupBoundMap?: FaceGroupBoundMap;
    clearFaceGroup(): void;
    loadMigrationData(data: any, patterns: any): void;
  };
  patterns?: any;
  clone(): MaterialData;
  cloneDeep(): MaterialData;
}

interface PaintServiceInterface {
  isMixPainted(face: any): boolean;
  getNormalPaintData(face: any, options: { face: any }): any;
  normalPaint(face: any, data: any, options: { face: any }): void;
  getMixPaintData(face: any, options: { face: string; mixedPanel: boolean }): any;
}

declare const HSApp: {
  PaintPluginHelper: {
    Util: {
      PaintService: PaintServiceInterface;
    };
  };
  App: {
    getApp(): {
      geometryManager: {
        getGeometryObject(id: string): {
          faceInfo?: {
            outer?: any;
          };
        } | null;
      };
    };
  };
};

declare const HSConstants: {
  ModelClass: {
    Line2d: string;
  };
};

const TOLERANCE = 0.001;

export class EditWallFacePaperRequest extends HSCore.Transaction.Request {
  private face?: any;
  private faceGroup?: any[];
  private sourceFace?: any;
  private savedMaterial: MaterialData | MaterialData[];
  private _materialData: MaterialData;
  private PaintService: PaintServiceInterface;

  constructor(
    face: any | undefined,
    materialData: MaterialData,
    faceGroup?: any[],
    sourceFace?: any
  ) {
    super();
    
    this.face = face;
    this.faceGroup = faceGroup;
    this.sourceFace = sourceFace;

    if (this.face) {
      const material = HSCore.Material.Util.getEntityMaterial(face);
      HSCore.Util.FaceGroup.getGroupFaces(face).forEach((groupFace: any) => {
        HSCore.Util.Paints.disconnectFromFaceGroup(groupFace);
      });
      this.savedMaterial = material.clone();
    } else if (this.faceGroup) {
      this.savedMaterial = [];
      const mixpaintCache: { [key: string]: any } = {};
      
      this.faceGroup.forEach((groupFace: any) => {
        const material = HSCore.Material.Util.getEntityMaterial(groupFace);
        let clonedMaterial = material;
        
        if (material.mixpaint?.faceGroupId) {
          if (mixpaintCache[material.mixpaint.faceGroupId]) {
            clonedMaterial.mixpaint = mixpaintCache[material.mixpaint.faceGroupId];
          } else {
            mixpaintCache[material.mixpaint.faceGroupId] = clonedMaterial.mixpaint;
            clonedMaterial.mixpaint.faceEntity = material.mixpaint.faceEntity;
          }
        }
        
        (this.savedMaterial as MaterialData[]).push(clonedMaterial);
      });
    }

    this._materialData = materialData.clone();
    this.PaintService = HSApp.PaintPluginHelper.Util.PaintService;
  }

  onCommit(): void {
    if (this.face) {
      this._editWallPaper(this._materialData);
    } else if (this.faceGroup) {
      this._editWallPaperForFaceGroup(this._materialData);
    }
  }

  private _initSketch2d(mixpaint: any): void {
    mixpaint.sketch2d.refreshSketchByMixPave(mixpaint.mixPave);
  }

  private _clearSketch2d(mixpaint: any): void {
    mixpaint.sketch2d.clearSketch();
  }

  private _modifyPolygonData(material: MaterialData, polygonData: any): MaterialData {
    const sketch2d = material.mixpaint?.sketch2d;
    
    if (!polygonData || !sketch2d?.background) {
      return material;
    }

    const mixpaint = material.mixpaint!;
    this._initSketch2d(mixpaint);

    const polygonBounds = HSCore.Util.Math.getBounds(polygonData);
    const backgroundBounds = HSCore.Util.Math.getBounds(
      sketch2d.background.getFirstPolygonOuter()
    );

    if (
      !backgroundBounds ||
      !polygonBounds ||
      polygonBounds.length < 3 ||
      backgroundBounds.length < 3
    ) {
      this._clearSketch2d(mixpaint);
      return material;
    }

    if (
      polygonBounds[2] <= backgroundBounds[2] ||
      HSCore.Util.Math.nearlyEquals(polygonBounds[2], backgroundBounds[2], TOLERANCE)
    ) {
      this._clearSketch2d(mixpaint);
      return material;
    }

    sketch2d.background.setFromData(polygonData);

    const curvesToRemove: any[] = [];

    sketch2d.faces.forEach((face: any) => {
      face.outerLoop.curves.forEach((curve: any) => {
        if (
          curve instanceof HSCore.Model.Line2d &&
          curve.from &&
          curve.to &&
          HSCore.Util.Math.nearlyEquals(curve.from.x, backgroundBounds[2], TOLERANCE) &&
          HSCore.Util.Math.nearlyEquals(curve.to.x, backgroundBounds[2], TOLERANCE)
        ) {
          const newCurves: Curve2DData[] = [
            {
              from: { x: curve.from.x, y: curve.from.y },
              to: { x: polygonBounds[2], y: curve.from.y },
              type: HSConstants.ModelClass.Line2d,
            },
            {
              from: { x: polygonBounds[2], y: curve.from.y },
              to: { x: polygonBounds[2], y: curve.to.y },
              type: HSConstants.ModelClass.Line2d,
            },
            {
              from: { x: polygonBounds[2], y: curve.to.y },
              to: { x: curve.from.x, y: curve.to.y },
              type: HSConstants.ModelClass.Line2d,
            },
            {
              from: { x: curve.from.x, y: curve.to.y },
              to: { x: curve.from.x, y: curve.from.y },
              type: HSConstants.ModelClass.Line2d,
            },
          ];

          const newPoints: Point2D[] = [
            { x: curve.from.x, y: curve.from.y },
            { x: polygonBounds[2], y: curve.from.y },
            { x: polygonBounds[2], y: curve.to.y },
            { x: curve.from.x, y: curve.to.y },
            { x: curve.from.x, y: curve.from.y },
          ];

          sketch2d.addCurvesPath(newCurves, newPoints);
          curvesToRemove.push(curve);
        }
      });
    });

    sketch2d.removeCurves(curvesToRemove);
    this._clearSketch2d(mixpaint);
    
    return material;
  }

  private _getFaceOuter(face: any): any {
    const geometryObject = HSApp.App.getApp().geometryManager.getGeometryObject(face.id);
    return geometryObject?.faceInfo?.outer;
  }

  private _getFaceGroupInfo(faceGroup: any[]): FaceGroupInfo {
    let faceGroupId = '';
    const faceGroupBoundMap: FaceGroupBoundMap = {};
    let totalHeight = 0;
    let accumulatedWidth = 0;

    faceGroup.forEach((face: any) => {
      const faceType = HSCore.Util.Face.getFaceType(face);
      const bounds = HSCore.Util.Paints.getPaintBoundingSize(face, faceType);
      
      bounds.left += accumulatedWidth;
      accumulatedWidth += bounds.width;
      
      if (totalHeight === 0) {
        totalHeight = bounds.height;
      }
      
      faceGroupBoundMap[face.id] = bounds;
      faceGroupId += faceGroupId === '' ? face.id : `;${face.id}`;
    });

    return {
      faceGroupId,
      faceGroupBoundMap,
      background: [
        { x: 0, y: 0 },
        { x: 0, y: totalHeight },
        { x: accumulatedWidth, y: totalHeight },
        { x: accumulatedWidth, y: 0 },
      ],
    };
  }

  private _editWallPaper(material: MaterialData): void {
    let updatedMaterial = material;

    if (updatedMaterial.mixpaint) {
      updatedMaterial.mixpaint.clearFaceGroup();
      updatedMaterial.mixpaint.faceEntity = this.face;
      
      if (!(this.face instanceof HSCore.Model.Floor)) {
        const faceOuter = this._getFaceOuter(this.face);
        updatedMaterial = this._modifyPolygonData(updatedMaterial, faceOuter);
      }
    }

    this.face.material = updatedMaterial;

    if (!this.PaintService.isMixPainted(this.face)) {
      const normalPaintData = this.PaintService.getNormalPaintData(this.face, {
        face: undefined,
      });
      this.PaintService.normalPaint(this.face, normalPaintData, {
        face: undefined,
      });
    }

    HSCore.Util.Paints.updateEntityPaints(this.face);
  }

  private _editWallPaperForFaceGroup(material: MaterialData): void {
    let updatedMaterial = material;

    if (!updatedMaterial.mixpaint && this.sourceFace) {
      const mixPaintData = this.PaintService.getMixPaintData(this.sourceFace, {
        face: HSCore.Util.Face.getFaceType(this.sourceFace),
        mixedPanel: true,
      });
      updatedMaterial.mixpaint = new HSCore.Model.MixPaint();
      updatedMaterial.mixpaint.loadMigrationData(mixPaintData, updatedMaterial.patterns);
    }

    if (updatedMaterial.mixpaint) {
      const faceGroupInfo = this._getFaceGroupInfo(this.faceGroup!);
      updatedMaterial.mixpaint.faceGroupId = faceGroupInfo.faceGroupId;
      updatedMaterial.mixpaint.faceGroupBoundMap = faceGroupInfo.faceGroupBoundMap;
      updatedMaterial = this._modifyPolygonData(updatedMaterial, faceGroupInfo.background);
      updatedMaterial.mixpaint.faceEntity = this.faceGroup![0];
    }

    this.faceGroup!.forEach((face: any) => {
      const clonedMaterial = updatedMaterial.cloneDeep();
      clonedMaterial.mixpaint = updatedMaterial.mixpaint;
      face.material = clonedMaterial;
    });

    if (!updatedMaterial.mixpaint) {
      this.faceGroup!.forEach((face: any) => {
        const normalPaintData = this.PaintService.getNormalPaintData(face, {
          face: undefined,
        });
        this.PaintService.normalPaint(face, normalPaintData, {
          face: undefined,
        });
      });
    }

    this.faceGroup!.forEach((face: any) => {
      HSCore.Util.Paints.updateEntityPaints(face);
    });
  }

  private _undoForFaceGroup(savedMaterials: MaterialData[]): void {
    for (let i = 0; i < this.faceGroup!.length; i++) {
      this.faceGroup![i].material = savedMaterials[i];
    }
  }

  onUndo(): void {
    if (this.face) {
      this._editWallPaper(this.savedMaterial as MaterialData);
    } else if (this.faceGroup) {
      this._undoForFaceGroup(this.savedMaterial as MaterialData[]);
    }
  }

  onRedo(): void {
    if (this.face) {
      this._editWallPaper(this._materialData);
    } else if (this.faceGroup) {
      this._editWallPaperForFaceGroup(this._materialData);
    }
  }
}