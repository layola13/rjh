import { Entity, Entity_IO, EntityFlagEnum } from './Entity';
import { Face } from './Face';
import { Loop } from './Loop';
import { EntityField, EntityMapField } from './decorators';
import { Signal } from './Signal';
import { Logger } from './Logger';

export enum SlabFaceType {
  top = "top",
  bottom = "bottom",
  side = "side"
}

Object.freeze(SlabFaceType);

interface FaceMap {
  [faceId: string]: Face;
}

interface FacesCollection {
  [SlabFaceType.top]?: FaceMap;
  [SlabFaceType.bottom]?: FaceMap;
  [SlabFaceType.side]?: FaceMap;
  [key: string]: FaceMap | undefined;
}

interface Opening {
  id: string;
  dirtyGeometry(): void;
  dirtyFaces(): void;
}

interface OpeningMap {
  [openingId: string]: Opening;
}

interface SerializedSlab {
  height: number;
  thickness: number;
  baseProfile: string;
  faces: { [key: string]: string[] };
  openings?: string[];
}

interface Point2D {
  x: number;
  y: number;
}

export class Slab_IO extends Entity_IO {
  private static _instance?: Slab_IO;

  public static instance(): Slab_IO {
    if (!Slab_IO._instance) {
      Slab_IO._instance = new Slab_IO();
    }
    return Slab_IO._instance;
  }

  public load(
    entity: Entity,
    data: SerializedSlab,
    context: unknown,
    additionalContext: unknown
  ): void {
    super.load(entity, data, context, additionalContext);

    const slab = entity as Slab;
    slab.__height = data.height;
    slab.__thickness = data.thickness;
    slab.__baseProfile = Entity.loadFromDumpById(
      data.baseProfile,
      context,
      (context as any).duringRestore,
      additionalContext
    ) as Loop;

    slab._faces = {};

    for (const [faceType, faceIds] of Object.entries(data.faces)) {
      slab._faces[faceType] = {};

      for (const faceId of faceIds) {
        const face = Entity.loadFromDumpById(
          faceId,
          context,
          (context as any).duringRestore,
          additionalContext
        );

        if (face instanceof Face) {
          slab._faces[faceType][faceId] = face;
        }
      }
    }

    slab.openings = {};

    if (data.openings) {
      data.openings.forEach((openingId: string) => {
        const opening = Entity.loadFromDumpById(openingId, context);
        if (opening) {
          slab.openings[openingId] = opening as Opening;
        }
      });
    }

    slab._flag = slab._flag & ~EntityFlagEnum.hidden;
  }
}

export class Slab extends Entity {
  public __height: number = 0;
  public __thickness: number = (HSConstants.Constants as any).SLAB_THICKNESS;
  public _faces: FacesCollection = {};
  private __openings: OpeningMap = {};
  private __baseProfile?: Loop;
  
  public signalOpeningAdded: Signal<{ entity: Opening }>;
  public signalOpeningRemoved: Signal<{ entity: Opening }>;

  constructor(name: string = "") {
    super(name);
    this.signalOpeningAdded = new Signal(this);
    this.signalOpeningRemoved = new Signal(this);
  }

  public get parents(): unknown {
    return this._parents;
  }

  public setFlagOn(flag: EntityFlagEnum, value: boolean = false): void {
    if (flag & EntityFlagEnum.hidden) {
      this.logger.error("slab should not be set to hidden!");
    } else {
      super.setFlagOn(flag, value);
    }
  }

  public getBaseProfile(): Loop | undefined {
    return this.__baseProfile;
  }

  public _setBaseProfile(profile: Loop): void {
    const oldProfile = this.__baseProfile;
    this.__baseProfile = profile;

    if (oldProfile) {
      this.removeChild(oldProfile);
    }

    if (profile) {
      this.addChild(profile);
    }
  }

  public getThickness(): number {
    return this.thickness;
  }

  public get center(): Point2D | undefined {
    const polygon = this.baseProfile?.toPolygon();
    if (!polygon || polygon.length < 1) {
      return undefined;
    }

    const sum = polygon.reduce(
      (acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        return acc;
      },
      { x: 0, y: 0 }
    );

    sum.x /= polygon.length;
    sum.y /= polygon.length;

    return sum;
  }

  public get faces(): FacesCollection {
    return this._faces;
  }

  public getFace(faceId: string): Face | undefined {
    for (const faceType in this._faces) {
      const face = Object.values(this._faces[faceType] ?? {}).find(
        (f) => faceId === f.id
      );
      if (face) {
        return face;
      }
    }
    return undefined;
  }

  public getFaces(faceType: SlabFaceType | string): FaceMap {
    return this._getFaces(faceType);
  }

  private _getFaces(faceType: SlabFaceType | string): FaceMap {
    const faces = this._faces[faceType];
    Logger.console.assert(
      Boolean(faces),
      "Unknown face type in getFaces method."
    );
    return faces ?? {};
  }

  public getFaceType(face: Face | undefined): string {
    if (!face) {
      return "";
    }

    for (const faceType in this._faces) {
      if (this._faces[faceType]?.[face.id]) {
        return faceType;
      }
    }

    return "";
  }

  public _setFaces(faceType: SlabFaceType | string, newFaces: FaceMap): void {
    const currentFaces = this._getFaces(faceType);
    const currentFaceList = Object.values(currentFaces);
    const newFaceList = Object.values(newFaces);

    const facesToRemove = currentFaceList.filter((f) => !newFaceList.includes(f));
    const facesToAdd = newFaceList.filter((f) => !currentFaceList.includes(f));

    facesToRemove.forEach((face) => {
      delete currentFaces[face.id];
      this.removeChild(face);
    });

    facesToAdd.forEach((face) => {
      currentFaces[face.id] = face;
      this.addChild(face);
    });
  }

  public static getMaterial(face: Face | undefined): unknown {
    return face ? (face as any).material : undefined;
  }

  public destroy(): void {
    if (!this._disposed) {
      this._faces = {};
      super.destroy();
    }
  }

  public getIO(): Slab_IO {
    return Slab_IO.instance();
  }

  public forEachFace(callback: (face: Face) => void, context?: unknown): void {
    if (!callback) {
      return;
    }

    Object.values(this._faces).forEach((faceMap) => {
      Object.values(faceMap ?? {}).forEach((face) => {
        if (face instanceof Face) {
          callback.call(context, face);
        } else {
          Logger.console.assert(
            false,
            `${face ? (face as any).tag : "face"}: invalid face!`
          );
        }
      });
    });
  }

  public getBaseLayer(): unknown {
    let baseLayer: unknown;

    Object.values(this.parents as any).forEach((parent: any) => {
      if (parent.isFloorSlab?.(this)) {
        baseLayer = parent;
      }
    });

    return baseLayer;
  }

  public getUnderLayer(): unknown {
    let underLayer: unknown;

    Object.values(this.parents as any).forEach((parent: any) => {
      if (parent.isCeilingSlab?.(this)) {
        underLayer = parent;
      }
    });

    return underLayer;
  }

  public getUniqueParent(): unknown {
    this.logger.warning("slab can belong to 2 layers");
    return this.getBaseLayer();
  }

  public verify(): boolean {
    if (!this._verifyBaseProfile()) {
      (log as any).error(
        `${this.tag}: invalid baseProfile.`,
        "HSCore.Verify.Error",
        true
      );
      return false;
    }

    const baseLayer = this.getBaseLayer() as any;
    if (baseLayer && this.thickness !== baseLayer.slabThickness) {
      this.thickness = baseLayer.slabThickness;
    }

    if (!(HSCore.Util.Object as any).isNumber(this.height)) {
      this.height = 0;
    }

    if (!(HSCore.Util.Object as any).isNumber(this.__thickness)) {
      this.__thickness = (HSConstants.Constants as any).SLAB_THICKNESS;
    }

    let isValid = true;

    for (const faceMap of Object.values(this._faces)) {
      for (const faceId of Object.keys(faceMap ?? {})) {
        const face = faceMap?.[faceId];

        if (!(face instanceof Face) || !face.verify()) {
          delete faceMap![faceId];
          this.removeChild(face!);
          isValid = false;
          (log as any).error(
            `${this.tag}: invalid child ${(face as any)?.tag}.`,
            "HSCore.Verify.Error",
            true
          );
        }
      }
    }

    return isValid;
  }

  public hasOpening(opening: Opening): boolean {
    return this.__openings[opening.id] === opening;
  }

  public _setOpenings(newOpenings: OpeningMap): void {
    const currentOpeningList = Object.values(this.__openings);
    const newOpeningList = Object.values(newOpenings);

    const openingsToRemove = currentOpeningList.filter(
      (o) => !newOpeningList.includes(o)
    );
    const openingsToAdd = newOpeningList.filter(
      (o) => !currentOpeningList.includes(o)
    );

    openingsToRemove.forEach((opening) => {
      this._removeOpening(opening);
    });

    openingsToAdd.forEach((opening) => {
      this._addOpening(opening);
    });
  }

  public _addOpening(opening: Opening | undefined): boolean {
    if (!opening || this.hasOpening(opening)) {
      return false;
    }

    this.__openings[opening.id] = opening;
    opening.dirtyGeometry();
    opening.dirtyFaces();
    this.dirtyGeometry();
    this.signalOpeningAdded.dispatch({ entity: opening });

    return true;
  }

  public _removeOpening(opening: Opening | undefined): boolean {
    if (!opening || !this.__openings[opening.id]) {
      return false;
    }

    delete this.__openings[opening.id];
    this.dirtyGeometry();
    this.signalOpeningRemoved.dispatch({ entity: opening });

    return true;
  }

  private _verifyBaseProfile(): boolean {
    if (!(this.__baseProfile instanceof Loop)) {
      return false;
    }

    const polygon = this.__baseProfile.toPolygon();
    if (!polygon) {
      return false;
    }

    const massProperties = (HSCore.Util.Math as any).getMassProperties(polygon);
    const area = Math.abs(massProperties[0]);

    return area > (HSConstants.Constants as any).MINIMUM_ROOMSIZE;
  }

  public forEachOpening(callback: (opening: Opening) => void, context?: unknown): void {
    Logger.console.assert(Boolean(callback), "undefined callback");

    if (callback) {
      Object.values(this.__openings).forEach((opening) => {
        callback.call(context, opening);
      });
    }
  }

  @EntityField()
  public height!: number;

  @EntityField()
  public thickness!: number;

  @EntityField({
    partialSet(this: Slab, value: Loop) {
      this._setBaseProfile(value);
    }
  })
  public baseProfile!: Loop;

  @EntityMapField({
    get(this: Slab) {
      return this.getFaces(SlabFaceType.top);
    },
    partialSet(this: Slab, value: FaceMap) {
      this._setFaces(SlabFaceType.top, value);
    }
  })
  public topFaces!: FaceMap;

  @EntityMapField({
    get(this: Slab) {
      return this.getFaces(SlabFaceType.bottom);
    },
    partialSet(this: Slab, value: FaceMap) {
      this._setFaces(SlabFaceType.bottom, value);
    }
  })
  public bottomFaces!: FaceMap;

  @EntityMapField({
    get(this: Slab) {
      return this.getFaces(SlabFaceType.side);
    },
    partialSet(this: Slab, value: FaceMap) {
      this._setFaces(SlabFaceType.side, value);
    }
  })
  public sideFaces!: FaceMap;

  @EntityMapField({
    partialSet(this: Slab, value: OpeningMap) {
      this._setOpenings(value);
    },
    validate: (value: OpeningMap) =>
      Object.values(value).every((o) => o instanceof (HSCore.Model as any).Hole)
  })
  public openings!: OpeningMap;
}

Entity.registerClass((HSConstants.ModelClass as any).Slab, Slab);