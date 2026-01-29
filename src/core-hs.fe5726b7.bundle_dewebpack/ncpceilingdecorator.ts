import { Vector3 } from './Vector3';

interface Face {
  tag: string;
  getSurface(): Surface;
}

interface Surface {
  isPlane(): boolean;
  getNorm(): Vector3;
}

interface Brep {
  getFaces(): Face[];
}

interface Entity {
  breps: Brep[];
}

export class NCPCeilingDecorator {
  private readonly entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  /**
   * Gets all bottom-facing faces from the entity's BREPs.
   * A face is considered bottom-facing if it's planar and its normal vector points downward (negative Z).
   * @returns Array of face tags that are bottom-facing
   */
  getBottomFaces(): string[] {
    const downwardNormal = Vector3.Z(-1);
    const bottomFaceTags: string[] = [];

    this.entity.breps.forEach((brep) => {
      brep.getFaces().forEach((face) => {
        const surface = face.getSurface();
        
        if (surface.isPlane() && surface.getNorm().equals(downwardNormal)) {
          bottomFaceTags.push(face.tag);
        }
      });
    });

    return bottomFaceTags;
  }
}