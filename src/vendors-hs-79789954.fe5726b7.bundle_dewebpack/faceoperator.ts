import { MathAlg, TrimmedSurface, Interval } from './math-alg';
import { ConstraintType } from './constraint-type';
import { ConstraintUtil } from './constraint-util';
import { MathUtil } from './math-util';
import { FinitePlane } from './finite-plane';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Surface {
  getCoord(): unknown;
  getOrigin(): Point3D;
  getUVAt(point: Point3D): Point2D;
  dump(): unknown;
  load(data: unknown): void;
  uSize: number;
  vSize: number;
}

interface FaceKey {
  faceId: string;
  bodyId: string;
}

interface ReferenceFace {
  bodyId: string;
  faceId: string;
}

interface ConstraintUserData {
  dimPos: Point2D;
}

interface Constraint {
  refFace: ReferenceFace;
  value: string;
  constraintType: ConstraintType;
  userData: ConstraintUserData;
}

interface IFaceData {
  bodyId: string;
  faceId: string;
  surface: Surface;
  type: string;
}

interface FaceData extends IFaceData {
  faceTags?: unknown;
  curve?: unknown;
}

interface Entity {
  id: string;
  getTopParent(): Entity;
}

interface EntityData {
  id: string;
}

export class FaceOperator {
  private faceData: FaceData;

  constructor(faceData: FaceData) {
    this.faceData = faceData;
  }

  static create(faceData: FaceData): FaceOperator {
    return new FaceOperator(faceData);
  }

  static createFromEntity(
    entity: Entity,
    rootEntity: Entity,
    faceType: string,
    bodyId: string,
    faceTags?: unknown
  ): FaceOperator {
    const faceId = FaceOperator.getFaceIdByEntityAndFaceType(entity, faceType);
    const surface = MathUtil.createSurfaceInRootCoordSys(entity, rootEntity, faceType);
    
    return new FaceOperator({
      bodyId,
      faceId,
      surface,
      type: faceType,
      faceTags
    });
  }

  static createFromCurve(
    entity: Entity,
    rootEntity: Entity,
    curveIndex: number,
    bodyId: string,
    curve: unknown,
    faceTags: unknown,
    subIndex: number
  ): FaceOperator {
    const indexBasedType = `indexBased_${curveIndex}`;
    const baseFaceId = FaceOperator.getFaceIdByEntityAndFaceType(entity, indexBasedType);
    const faceId = `${baseFaceId}_${subIndex}`;
    const surface = MathUtil.createSurfaceInRootCoordSysByCurve2d(entity, curve, rootEntity);
    
    return new FaceOperator({
      bodyId,
      faceId,
      surface,
      type: indexBasedType,
      faceTags,
      curve
    });
  }

  static createFromEntityData(
    entityData: EntityData,
    rootEntity: Entity,
    faceType: string,
    bodyId: string
  ): FaceOperator {
    const faceId = FaceOperator.getFaceIdByEntityAndFaceType(entityData.id, faceType);
    const surface = MathUtil.createSurface(entityData, faceType, rootEntity);
    
    return new FaceOperator({
      bodyId,
      faceId,
      surface,
      type: faceType
    });
  }

  static createFrom(face: IFaceData): FaceOperator {
    const scheme = FaceOperator.getSchemeFromIFace(face);
    return new FaceOperator(scheme);
  }

  static getSchemeFromIFace(face: IFaceData): FaceData {
    const { bodyId, faceId, surface, type } = face;
    
    return {
      bodyId,
      faceId,
      surface: surface instanceof FinitePlane ? surface : new FinitePlane(surface.getCoord()),
      type
    };
  }

  static isFaceOperator(value: unknown): value is FaceOperator {
    return value instanceof FaceOperator;
  }

  static toFaceOperator(face: IFaceData | FaceOperator): FaceOperator {
    return FaceOperator.isFaceOperator(face) ? face : FaceOperator.createFrom(face);
  }

  static toIFaceData(faceData: FaceData): IFaceData {
    return {
      bodyId: faceData.bodyId,
      faceId: faceData.faceId,
      surface: faceData.surface,
      type: faceData.type
    };
  }

  static createConstraint(
    targetFace: FaceOperator,
    referenceFace: FaceOperator,
    dimensionPosition?: Point3D
  ): Constraint {
    const distance = FaceOperator.distanceFromFace1ToFace2(referenceFace, targetFace);
    const defaultPosition: Point3D = { x: 0, y: 0, z: 0 };
    const uvPosition = targetFace.surface.getUVAt(dimensionPosition ?? defaultPosition);
    
    return {
      refFace: {
        bodyId: referenceFace.bodyId,
        faceId: referenceFace.faceId
      },
      value: `${distance}`,
      constraintType: ConstraintType.Distance,
      userData: {
        dimPos: {
          x: uvPosition.x,
          y: uvPosition.y
        }
      }
    };
  }

  static distanceFromFace1ToFace2(face1: FaceOperator, face2: FaceOperator): number {
    return MathAlg.CalculateDistance.pointToSurfaceSigned(
      face1.surface.getOrigin(),
      face2.surface
    );
  }

  static getFaceIdByEntityAndFaceType(entity: Entity | string, faceType: string): string {
    return ConstraintUtil.getFaceIdByEntityAndFaceType(entity, faceType);
  }

  static getEntityIdFromFaceId(faceId: string): string {
    return ConstraintUtil.getEntityIdFromFaceId(faceId);
  }

  static getFaceTypeFromFaceId(faceId: string): string {
    return ConstraintUtil.getFaceTypeFromFaceId(faceId);
  }

  static getFaceInfoFromFaceId(faceId: string): unknown {
    return ConstraintUtil.getFaceInfoFromFaceId(faceId);
  }

  toIFace(): IFaceData {
    return FaceOperator.toIFaceData(this.faceData);
  }

  get bodyId(): string {
    return this.faceData.bodyId;
  }

  get faceId(): string {
    return this.faceData.faceId;
  }

  get faceTags(): unknown | undefined {
    return this.faceData.faceTags;
  }

  get surface(): Surface {
    return this.faceData.surface;
  }

  get type(): string {
    return this.faceData.type;
  }

  get entityId(): string {
    return FaceOperator.getEntityIdFromFaceId(this.faceId);
  }

  get faceKey(): FaceKey {
    return {
      faceId: this.faceId,
      bodyId: this.bodyId
    };
  }

  updateFromIFace(face: IFaceData): void {
    this.faceData.surface.load(face.surface.dump());
  }

  updateFromEntity(entity: Entity, rootEntity?: Entity): void {
    const actualRootEntity = rootEntity ?? entity.getTopParent();
    const newSurface = MathUtil.createSurfaceInRootCoordSys(entity, actualRootEntity, this.type);
    this.faceData.surface.load(newSurface.dump());
  }

  get trimmed(): TrimmedSurface {
    const halfUSize = this.surface.uSize / 2;
    const halfVSize = this.surface.vSize / 2;
    
    return TrimmedSurface.createByRangeUV(
      this.surface,
      new Interval(-halfUSize, halfUSize),
      new Interval(-halfVSize, halfVSize)
    );
  }
}