import { WallMolding_IO, WallMolding } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';
import { EntityField } from './decorators';
import { FaceUtil } from './FaceUtil';
import type { Face } from './Face';
import type { Vector3 } from './Vector3';
import type { Curve } from './Curve';

export class Mitre_IO extends WallMolding_IO {
  dump(
    entity: Mitre,
    callback?: (dumped: any[], source: Mitre) => void,
    includeChildren: boolean = true,
    options: Record<string, any> = {}
  ): any[] {
    const dumped = super.dump(entity, undefined, includeChildren, options);
    dumped[0].relatedFaceIds = entity.relatedFaceIds;
    callback?.(dumped, entity);
    return dumped;
  }

  load(target: Mitre, data: any, options?: any): void {
    super.load(target, data, options);
    target.relatedFaceIds = data.relatedFaceIds;
  }
}

export class Mitre extends WallMolding {
  @EntityField()
  relatedFaceIds: string[] = [];

  constructor(id: string = "", parent?: any) {
    super(id, parent);
    this.type = MoldingTypeEnum.Mitre;
  }

  get face1(): Face | undefined {
    if (this.relatedFaceIds.length !== 2) {
      return undefined;
    }
    const parent = this.parent;
    const faceId = this.relatedFaceIds[0];
    return parent.faces[faceId];
  }

  get face2(): Face | undefined {
    if (this.relatedFaceIds.length !== 2) {
      return undefined;
    }
    const parent = this.parent;
    const faceId = this.relatedFaceIds[1];
    return parent.faces[faceId];
  }

  get face1normal(): Vector3 | undefined {
    const face = this.face1;
    if (!face) {
      return undefined;
    }
    const paths = this.sweepPaths;
    if (paths.length === 0) {
      return undefined;
    }
    const startPoint = paths[0].getStartPt();
    return face.surfaceObj.getNormal(startPoint).normalized();
  }

  get face2normal(): Vector3 | undefined {
    const face = this.face2;
    if (!face) {
      return undefined;
    }
    const paths = this.sweepPaths;
    if (paths.length === 0) {
      return undefined;
    }
    const startPoint = paths[0].getStartPt();
    return face.surfaceObj.getNormal(startPoint).normalized();
  }

  get sweepPaths(): Curve[] {
    return this.face1 && this.face2
      ? FaceUtil.calcVertPositiveCorner(this.face1, this.face2).flat()
      : [];
  }

  get verticalLine(): Vector3 | undefined {
    if (!this.face1 || !this.face2) {
      return undefined;
    }
    const paths = this.sweepPaths;
    if (paths.length === 0) {
      return undefined;
    }
    const tangent = paths[0].getStartTangent();
    const normal1 = this.face1normal;
    const normal2 = this.face2normal;
    if (!normal1 || !normal2) {
      return undefined;
    }
    const crossProduct1 = tangent.cross(normal1).normalized();
    const crossProduct2 = tangent.cross(normal2).normalized();

    if (
      crossProduct1.isSameDirection(normal2) &&
      crossProduct1.cross(tangent).isSameDirection(normal1.reversed())
    ) {
      return crossProduct1;
    }
    if (
      crossProduct1.reversed().isSameDirection(normal2) &&
      crossProduct1.reversed().cross(tangent).isSameDirection(normal1.reversed())
    ) {
      return crossProduct1.reversed();
    }
    if (
      crossProduct2.isSameDirection(normal1) &&
      crossProduct2.cross(tangent).isSameDirection(normal2.reversed())
    ) {
      return crossProduct2;
    }
    if (
      crossProduct2.reversed().isSameDirection(normal1) &&
      crossProduct2.reversed().cross(tangent).isSameDirection(normal2.reversed())
    ) {
      return crossProduct2.reversed();
    }
    return crossProduct1;
  }

  getIO(): Mitre_IO {
    return Mitre_IO.instance();
  }

  clone(): Mitre {
    const cloned = new Mitre();
    cloned._copyFrom(this);
    return cloned;
  }
}

Entity.registerClass(HSConstants.ModelClass.Mitre, Mitre);