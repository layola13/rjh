import * as Geometry from './geometry';
import { Log } from './log';
import { Floorcutter } from './floorcutter';
import { ConcaveUShapeFeature } from './features';
import { EN_TYPE } from './enums';
import { RoomObject, EntityObject } from './objects';
import { ModelUtil } from './model-util';
import { FaceOperator } from './face-operator';
import { ConstraintUtil } from './constraint-util';
import { MathUtil } from './math-util';

interface IFace {
  faceId: string;
  type: EN_TYPE;
  entityId: number;
  trimmed: Geometry.Polygon;
  getBoundingBox(): Geometry.Box3;
  toIFace(): IFace;
}

interface IBodyData {
  id: string;
  isRigid: boolean;
  isFixed: boolean;
  isPmModel: boolean;
  matrix?: Geometry.Matrix4;
  boundFaces: FaceOperator[];
  innerFaces?: FaceOperator[];
}

interface IBody {
  id: string;
  isRigid?: boolean;
  isFixed?: boolean;
  isPmModel?: boolean;
  matrix?: Geometry.Matrix4;
  boundFaces: (FaceOperator | IFace)[];
  innerFaces?: (FaceOperator | IFace)[];
}

type FaceType = 1 | 2 | 3;

interface Entity {
  id: number;
  isFixed: boolean;
  floorOuterCurves?: Geometry.Curve2d[];
  floorDump?: {
    floorTags: unknown;
    ceilingTags: unknown;
  };
  getTopParent(): Entity;
}

export class BodyOperator {
  private bodyData: IBodyData;

  constructor(bodyData: IBodyData) {
    this.bodyData = bodyData;
  }

  static create(bodyData: IBodyData): BodyOperator {
    return new BodyOperator(bodyData);
  }

  static createFromEntity(entity: Entity, topParent?: Entity): BodyOperator {
    const bodyId = BodyOperator.getBodyIdFromBodyEntity(entity);
    const isFixed = entity.isFixed;
    const boundFaces = BodyOperator.createBodyFaces(entity, topParent, bodyId);

    return new BodyOperator({
      id: bodyId,
      isRigid: true,
      isFixed,
      isPmModel: false,
      boundFaces
    });
  }

  static createFromEntityData(entityData: Entity, topParent: Entity): BodyOperator {
    const bodyId = BodyOperator.getBodyIdFromBodyEntity(entityData.id);
    const boundFaces = BodyOperator.createBodyFacesFromEntityData(entityData, topParent, bodyId);

    return new BodyOperator({
      id: bodyId,
      isRigid: true,
      isFixed: true,
      isPmModel: false,
      boundFaces
    });
  }

  static createBody(entity: Entity, topParent?: Entity): BodyOperator {
    if (ModelUtil.isPmModelOrHisChildren(entity)) {
      const pmModel = ModelUtil.getPmModel(entity);
      if (pmModel) {
        return BodyOperator.createFromEntity(pmModel, topParent);
      }
    }
    return BodyOperator.createFromEntity(entity, topParent);
  }

  static createFrom(body: IBody): BodyOperator {
    const scheme = BodyOperator.getSchemeFromIBody(body);
    return new BodyOperator(scheme);
  }

  static getSchemeFromIBody(body: IBody): IBodyData {
    const {
      id,
      isRigid = false,
      isFixed = false,
      isPmModel = false,
      matrix,
      boundFaces,
      innerFaces
    } = body;

    return {
      id,
      isRigid,
      isFixed,
      isPmModel,
      matrix,
      boundFaces: boundFaces.map(face => FaceOperator.toFaceOperator(face)),
      innerFaces: innerFaces?.map(face => FaceOperator.toFaceOperator(face))
    };
  }

  static isBodyOperator(obj: unknown): obj is BodyOperator {
    return obj instanceof BodyOperator;
  }

  static toBodyOperator(body: BodyOperator | IBody): BodyOperator {
    return BodyOperator.isBodyOperator(body) ? body : BodyOperator.createFrom(body);
  }

  static toBodyOperators(bodies: (BodyOperator | IBody)[]): BodyOperator[] {
    return bodies.map(body => BodyOperator.toBodyOperator(body));
  }

  static toIBodyData(body: BodyOperator): IBody {
    return {
      id: body.id,
      isRigid: body.isRigid,
      isFixed: body.isFixed,
      isPmModel: body.isPmModel,
      boundFaces: body.boundFaces.map(face => face.toIFace()),
      innerFaces: body.innerFaces?.map(face => face.toIFace())
    };
  }

  static getStartIndex(curves: Geometry.Curve2d[]): number {
    if (curves.length === 0) return -1;
    if (curves.length === 1) return 0;

    let minIndex = 0;
    let minPoint = curves[minIndex].getStartPt();
    let minDistance = minPoint.sqDistanceTo({ x: 0, y: 0 });

    for (let i = 1; i < curves.length; i++) {
      const currentPoint = curves[i].getStartPt();
      const currentDistance = currentPoint.sqDistanceTo({ x: 0, y: 0 });

      if (currentDistance < minDistance) {
        minIndex = i;
        minPoint = currentPoint;
        minDistance = currentDistance;
      }
    }

    return minIndex;
  }

  static createBodyFaces(entity: Entity, topParent?: Entity, bodyId?: string): FaceOperator[] {
    topParent = topParent ?? entity.getTopParent();
    let faces: FaceOperator[] = [];

    if (entity instanceof RoomObject) {
      if (entity.floorOuterCurves?.some(curve => !(curve instanceof Geometry.Line2d))) {
        Log.error("Only support Line2d as floor outer curve");
      }

      const floorcutter = new Floorcutter(
        entity.floorOuterCurves ?? [],
        undefined,
        [],
        [ConcaveUShapeFeature]
      );
      floorcutter.execute();

      const polygon = floorcutter.featureLists.flat().at(-1)?.toPolygon ?? floorcutter.currentPolygon;
      const lineCurves = polygon.outerLoop.getAllCurves()
        .filter(curve => curve instanceof Geometry.Line2d)
        .map(curve => curve.clone());

      const boundingBox = new Geometry.Loop(lineCurves).getBoundingBox();
      const rectangleCurves = Geometry.Loop.createByRectangle(boundingBox.min, boundingBox.max).getAllCurves();

      const rectangleLines = [
        { group: "x1", line: rectangleCurves[0] },
        { group: "y1", line: rectangleCurves[1] },
        { group: "x2", line: rectangleCurves[2] },
        { group: "y2", line: rectangleCurves[3] }
      ];

      const curveGroupMap = new Map<Geometry.Line2d, string>();
      const groupCurvesMap = new Map<string, Geometry.Line2d[]>();

      for (const curve of lineCurves) {
        const midPoint = curve.getMidPt();
        const rightNormal = curve.getRightNormal();
        const testLine = new Geometry.Line2d(midPoint, rightNormal, [0, 5000]);

        const group = rectangleLines.find(({ line }) => {
          const positionType = Geometry.MathAlg.PositionJudge.curveToCurve(testLine, line);
          return [
            Geometry.MathAlg.CurveCuvePositonType.INTERSECT_IN,
            Geometry.MathAlg.CurveCuvePositonType.INTERSECT_ON
          ].includes(positionType);
        })?.group ?? "x1";

        const groupCurves = groupCurvesMap.get(group) ?? [];
        groupCurves.push(curve);
        groupCurvesMap.set(group, groupCurves);
        curveGroupMap.set(curve, group);
      }

      const sortedCurves: Geometry.Line2d[] = [];
      for (const [group, curves] of groupCurvesMap.entries()) {
        curves.sort((a, b) => b.getLength() - a.getLength());
        sortedCurves.push(...curves);
      }

      const { floorTags, ceilingTags } = entity.floorDump!;
      const center = new Geometry.Loop(sortedCurves).getBoundingBox().getCenter();
      sortedCurves.forEach(curve => curve.translate(new Geometry.Vector2(-center.x, -center.y)));

      for (let i = 0; i < sortedCurves.length; i++) {
        const curve = sortedCurves[i];
        const group = curveGroupMap.get(curve)!;
        const holes: unknown[] = [];

        if (curve instanceof Geometry.Line2d) {
          faces.push(FaceOperator.createFromCurve(entity, topParent, group, bodyId!, curve, holes, i));
        }
      }

      faces.push(FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_BOTTOM, bodyId!, floorTags));
      faces.push(FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_TOP, bodyId!, ceilingTags));

      return faces;
    }

    if (entity instanceof EntityObject) {
      bodyId = bodyId ?? BodyOperator.getBodyIdFromBodyEntity(entity);
      faces = [
        FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_LEFT, bodyId),
        FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_RIGHT, bodyId),
        FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_FRONT, bodyId),
        FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_BACK, bodyId),
        FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_BOTTOM, bodyId),
        FaceOperator.createFromEntity(entity, topParent, EN_TYPE.EN_TOP, bodyId)
      ];
    }

    return faces;
  }

  static createBodyFacesFromEntityData(entityData: Entity, topParent: Entity, bodyId?: string): FaceOperator[] {
    bodyId = bodyId ?? BodyOperator.getBodyIdFromBodyEntity(entityData.id);

    return [
      FaceOperator.createFromEntityData(entityData, topParent, EN_TYPE.EN_LEFT, bodyId),
      FaceOperator.createFromEntityData(entityData, topParent, EN_TYPE.EN_RIGHT, bodyId),
      FaceOperator.createFromEntityData(entityData, topParent, EN_TYPE.EN_FRONT, bodyId),
      FaceOperator.createFromEntityData(entityData, topParent, EN_TYPE.EN_BACK, bodyId),
      FaceOperator.createFromEntityData(entityData, topParent, EN_TYPE.EN_BOTTOM, bodyId),
      FaceOperator.createFromEntityData(entityData, topParent, EN_TYPE.EN_TOP, bodyId)
    ];
  }

  static createInnerFaceForBody(body: BodyOperator, entity: Entity, faceType: EN_TYPE, topParent?: Entity): FaceOperator {
    topParent = topParent ?? entity.getTopParent();
    const face = FaceOperator.createFromEntity(entity, topParent, faceType, body.id);
    body.addInnerFace(face);
    return face;
  }

  static getBodyIdFromBodyEntity(entityOrId: Entity | number): string {
    return ConstraintUtil.getBodyIdFromBodyEntity(entityOrId);
  }

  static getBodyId(entity: Entity): string {
    if (ModelUtil.isPmModelOrHisChildren(entity)) {
      const pmModel = ModelUtil.getPmModel(entity);
      if (pmModel) {
        return BodyOperator.getBodyIdFromBodyEntity(pmModel);
      }
    }
    return BodyOperator.getBodyIdFromBodyEntity(entity);
  }

  toIBody(): IBody {
    return BodyOperator.toIBodyData(this);
  }

  get id(): string {
    return this.bodyData.id;
  }

  get matrix(): Geometry.Matrix4 | undefined {
    return this.bodyData.matrix;
  }

  get isRigid(): boolean {
    return this.bodyData.isRigid;
  }

  get isFixed(): boolean {
    return this.bodyData.isFixed;
  }

  get isPmModel(): boolean {
    return this.bodyData.isPmModel;
  }

  get boundFaces(): FaceOperator[] {
    return this.bodyData.boundFaces;
  }

  get innerFaces(): FaceOperator[] | undefined {
    return this.bodyData.innerFaces;
  }

  get entityId(): number {
    return Number(this.bodyData.id);
  }

  addInnerFace(face: FaceOperator): void {
    if (!this.bodyData.innerFaces) {
      this.bodyData.innerFaces = [];
    }
    this.bodyData.innerFaces.push(face);
  }

  forEachFace(callback: (face: FaceOperator) => boolean, faceType: FaceType = 3): boolean {
    const { boundFaces, innerFaces } = this.bodyData;

    if (faceType === 1 || faceType === 3) {
      for (let i = 0; i < boundFaces.length; i++) {
        if (callback(boundFaces[i])) return true;
      }
    }

    if ((faceType === 2 || faceType === 3) && innerFaces) {
      for (let i = 0; i < innerFaces.length; i++) {
        if (callback(innerFaces[i])) return true;
      }
    }

    return false;
  }

  findFace(predicate: (face: FaceOperator) => boolean, faceType: FaceType = 3): FaceOperator | undefined {
    let foundFace: FaceOperator | undefined;
    this.forEachFace(face => {
      if (predicate(face)) {
        foundFace = face;
        return true;
      }
      return false;
    }, faceType);
    return foundFace;
  }

  hasFace(faceId: string, faceType: FaceType = 3): boolean {
    return !!this.findFace(face => face.faceId === faceId, faceType);
  }

  getFaceByFaceId(faceId: string, faceType: FaceType = 3): FaceOperator | undefined {
    return this.findFace(face => face.faceId === faceId, faceType);
  }

  getBoundingBox(matrix?: Geometry.Matrix4): Geometry.Box3 {
    if (this.matrix && matrix) {
      matrix.multiply(this.matrix);
    }
    return MathUtil.getBoundFacesBox(this.boundFaces, matrix);
  }

  isInnerFace(faceId: string): boolean {
    return this.hasFace(faceId, 2);
  }

  getInnerFace(faceId: string): FaceOperator | undefined {
    return this.getFaceByFaceId(faceId, 2);
  }

  updateFromIBody(body: IBody): void {
    this.bodyData = BodyOperator.getSchemeFromIBody(body);
  }

  updateFromEntity(entity: Entity, topParent?: Entity, entityMap?: Map<string, Entity>): void {
    topParent = topParent ?? entity.getTopParent();
    entityMap = entityMap ?? ModelUtil.getFlatEntities(topParent, BodyOperator.getBodyIdFromBodyEntity);

    this.forEachFace(face => {
      const bodyId = BodyOperator.getBodyIdFromBodyEntity(face.entityId);
      const faceEntity = entityMap?.get(bodyId);
      if (faceEntity) {
        face.updateFromEntity(faceEntity, topParent!);
      }
      return false;
    });
  }

  log(): void {
    const faceOrder = [
      EN_TYPE.EN_FRONT,
      EN_TYPE.EN_BACK,
      EN_TYPE.EN_LEFT,
      EN_TYPE.EN_RIGHT,
      EN_TYPE.EN_TOP,
      EN_TYPE.EN_BOTTOM
    ];

    Log.log("FaceOrder: ", faceOrder);

    const trimmedFaces: unknown[] = [];
    faceOrder.forEach(type => {
      const face = this.findFace(f => f.type === type);
      if (face) {
        trimmedFaces.push(face.trimmed);
      }
    });

    Geometry.Log.d(trimmedFaces);
  }

  logBoundFaces(): void {
    const trimmedFaces: unknown[] = [];
    this.boundFaces.forEach(face => {
      trimmedFaces.push(face.trimmed);
    });
    Geometry.Log.d(trimmedFaces);
  }

  getBox(): Geometry.Box3 {
    const faceOrder = [
      EN_TYPE.EN_FRONT,
      EN_TYPE.EN_BACK,
      EN_TYPE.EN_LEFT,
      EN_TYPE.EN_RIGHT,
      EN_TYPE.EN_TOP,
      EN_TYPE.EN_BOTTOM
    ];

    const trimmedFaces: IFace[] = [];
    faceOrder.forEach(type => {
      const face = this.findFace(f => f.type === type);
      if (face) {
        trimmedFaces.push(face.trimmed);
      }
    });

    const box = new Geometry.Box3();
    trimmedFaces.forEach(face => {
      box.union(face.getBoundingBox());
    });

    return box;
  }
}