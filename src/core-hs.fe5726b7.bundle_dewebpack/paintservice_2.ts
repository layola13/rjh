import { PaintHandler } from './PaintHandler';
import { getSurfaceMeta } from './SurfaceMetaUtils';

type Material = HSCore.Model.Material;
type Face = HSCore.Model.Face;
type Wall = HSCore.Model.Wall;
type Entity = Face | Wall;
type FaceType = 'ceiling' | 'floor' | 'wall' | undefined;

interface GeometryData {
  // Define based on actual return type from PaintHandler
  [key: string]: unknown;
}

interface GraphicsData {
  paints: Paint[];
  [key: string]: unknown;
}

interface Paint {
  shapes: Shape[];
  pavingOption: PavingOption;
  [key: string]: unknown;
}

interface Shape {
  outer?: unknown;
  [key: string]: unknown;
}

interface PavingOption {
  point: { x: number; y: number };
  directions: number[];
  rotation: number;
  [key: string]: unknown;
}

interface SurfaceMeta {
  bottomFaceGeometries?: unknown;
  [key: string]: unknown;
}

interface BoundingSize {
  width: number;
  height: number;
  [key: string]: unknown;
}

interface SurfaceDataOptions {
  pavingDirection?: boolean;
  faceType?: FaceType;
}

type CustomGraphicsDataAsyncHandler = (data: unknown) => Promise<unknown>;
type CustomSurfaceGraphicsDataAsyncHandler = (data: unknown) => Promise<unknown>;

export class PaintService {
  private static _instance: PaintService;
  private _handler?: PaintHandler;

  constructor() {}

  static instance(): PaintService {
    if (!PaintService._instance) {
      PaintService._instance = new PaintService();
    }
    return PaintService._instance;
  }

  get handler(): PaintHandler {
    if (!this._handler) {
      this._handler = new PaintHandler();
    }
    return this._handler;
  }

  setCustomGraphicsDataAsyncHandler(handler: CustomGraphicsDataAsyncHandler): void {
    this.handler.setCustomGraphicsDataAsyncHandler(handler);
  }

  setCustomSurfaceGraphicsDataAsyncHandler(handler: CustomSurfaceGraphicsDataAsyncHandler): void {
    this.handler.setCustomSurfaceGraphicsDataAsyncHandler(handler);
  }

  getGeometryDataFromMaterial(material: Material, faceType: FaceType): GeometryData {
    return this.handler.getGeometryDataFromMaterial(material, faceType);
  }

  getFaceGraphicsDataFromMaterial(entity: Entity, material: Material, faceType: FaceType): GraphicsData {
    return this.handler.getFaceGraphicsDataFromMaterial(entity, material, faceType);
  }

  getFaceGraphicsDataFromMaterialAsync(entity: Entity, material: Material, faceType: FaceType): Promise<GraphicsData> {
    return this.handler.getFaceGraphicsDataFromMaterialAsync(entity, material, faceType);
  }

  getSurfaceGraphicsDataFromMaterial(entity: Entity, material: Material, faceType: FaceType): GraphicsData {
    return this.handler.getSurfaceGraphicsDataFromMaterial(entity, material, faceType);
  }

  getSurfaceGraphicsDataFromMaterialAsync(entity: Entity, material: Material, faceType: FaceType): Promise<GraphicsData> {
    return this.handler.getSurfaceGraphicsDataFromMaterialAsync(entity, material, faceType);
  }

  get2DMesh(entity: Entity, material: Material, faceType: FaceType, options: unknown): unknown {
    return this.handler.get2DMesh(entity, material, faceType, options);
  }

  getSurfaceData(entity: Entity, bottomFaceGeometries?: unknown): GraphicsData {
    const materialData = entity.getMaterial().getMaterialDataForFGI();
    const surfaceMeta = getSurfaceMeta(entity, undefined);
    
    if (bottomFaceGeometries) {
      surfaceMeta.bottomFaceGeometries = bottomFaceGeometries;
    }
    
    return this.handler.getSurfaceData(materialData, surfaceMeta);
  }

  getMixPaintData(entity: Entity, bottomFaceGeometries?: unknown): unknown {
    const material = entity.getMaterial();
    let paintData: unknown;
    
    if (HSCore.Util.PaintMaterial.getMixPaintEntity(material)) {
      paintData = HSCore.Util.PaintMaterial.getPaintDataFromMixPaintEntity(material);
      
      if (bottomFaceGeometries && paintData) {
        PaintHandler.mergeFloorWithBottomFaces(bottomFaceGeometries, paintData);
      }
    }
    
    return paintData;
  }

  getPinhuaPaintData(entity: Entity): unknown {
    return PaintHandler.getPinhuaPaintData(entity);
  }

  getMixPaints(entity: Entity, faceType: FaceType): unknown {
    const material = entity.getMaterial(faceType);
    return PaintHandler.getPaints(material);
  }

  getMixpaintDataForDWG(entity: Entity, faceType: FaceType): Paint[] | GraphicsData {
    let material: Material | undefined;
    
    if (entity instanceof HSCore.Model.Face) {
      material = entity.material;
    } else if (entity instanceof HSCore.Model.Wall) {
      material = entity.getMaterial(faceType);
    }
    
    if (!material) {
      throw new Error(`Can not get material from ${entity.tag} ${faceType ?? ''}`);
    }
    
    const materialData = material.getMaterialDataForFGI();
    const surfaceMeta = getSurfaceMeta(entity, faceType);
    const boundingSize = HSCore.Util.Paints.getPaintBoundingSize(entity, faceType);
    const surfaceData = this.handler.getSurfaceData(materialData, surfaceMeta, {
      pavingDirection: true,
      faceType
    });
    
    if (faceType === 'ceiling' && surfaceData?.paints?.[0]) {
      const paint = { ...surfaceData.paints[0] };
      
      if (paint?.shapes?.length > 0 && paint.shapes[0].outer) {
        paint.pavingOption.point.y = -paint.pavingOption.point.y + boundingSize.height;
        
        for (let i = 0; i < paint.pavingOption.directions.length; i++) {
          if (paint.pavingOption.directions[i] === 270) {
            paint.pavingOption.directions[i] = 90;
          } else if (paint.pavingOption.directions[i] === 90) {
            paint.pavingOption.directions[i] = 270;
          }
        }
        
        paint.pavingOption.rotation = -paint.pavingOption.rotation;
        
        return [paint];
      }
    }
    
    return surfaceData;
  }
}