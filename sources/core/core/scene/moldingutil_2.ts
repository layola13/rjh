import { FaceUtil } from './FaceUtil';
import { Face } from './Face';

interface MoldingProfile {
  profile: unknown;
  material: unknown;
}

interface Molding {
  metadata: unknown;
  material: {
    metadata?: unknown;
  } & unknown;
  dirtyGeometry(): void;
}

interface NeighborFaceInfo {
  face?: Face;
}

interface NeighborFaces {
  pre?: NeighborFaceInfo;
  next?: NeighborFaceInfo;
}

export const MoldingUtil = {
  /**
   * Get room molding data from faces
   * @param faces - Array of face objects
   * @param faceType - Type of face to query
   * @returns Molding profile and material data if found
   */
  getRoomMoldingData(faces: unknown[], faceType: unknown): MoldingProfile | undefined {
    if (!faces) return;

    let moldingData: MoldingProfile | undefined;

    for (const face of faces) {
      if (!(face instanceof HSCore.Model.Face)) continue;

      const moldings = (face as Face).getMolding(faceType);

      if (moldings && moldings.length !== 0) {
        moldingData = {
          profile: moldings[0].metadata,
          material: moldings[0].material.metadata || moldings[0].material
        };
        break;
      }
    }

    return moldingData;
  },

  /**
   * Mark neighbor face moldings as dirty by face type
   * @param face - The face whose neighbors should be dirtied
   * @param faceType - Type of face to process
   */
  dirtyNeighborMoldingsByFacetype(face: unknown, faceType: unknown): void {
    if (!(face instanceof Face)) return;

    const neighbors: NeighborFaces = FaceUtil.findNeighborFace(face);

    if (neighbors.pre) {
      const preFace = neighbors.pre;
      if (preFace.face) {
        const moldings: Molding[] | undefined = preFace.face.getMolding(faceType);
        if (moldings && moldings.length) {
          moldings.forEach((molding: Molding) => molding.dirtyGeometry());
        }
      }
    }

    if (neighbors.next) {
      const nextFace = neighbors.next;
      if (nextFace.face) {
        const moldings: Molding[] | undefined = nextFace.face.getMolding(faceType);
        if (moldings && moldings.length) {
          moldings.forEach((molding: Molding) => molding.dirtyGeometry());
        }
      }
    }
  }
};