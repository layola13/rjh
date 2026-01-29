import { MathService } from './MathService';
import { MaterialUtil } from './MaterialUtil';
import { FloorMixpaintUtil } from './FloorMixpaintUtil';

interface Material {
  mixpaint?: Mixpaint;
}

interface Mixpaint {
  faceGroup?: FaceGroup;
}

interface FaceGroup {
  faceGroupId?: string;
  getFaceIds(): string[];
  getTransformById(id: string): Transform | undefined;
}

interface Transform {
  isIdentity(): boolean;
}

interface Entity {
  id: string;
  material?: Material;
  rawPath2d: Path2D;
}

interface Face extends Entity {}

interface Floor extends Entity {}

type Path2D = unknown;

declare namespace HSCore {
  namespace Doc {
    function getDocManager(): DocumentManager;
  }
  
  namespace Model {
    class Floor {}
  }
  
  namespace Util {
    namespace Face {
      function getFaceRcpBackground(face: Face): Path2D;
    }
  }
}

interface DocumentManager {
  activeDocument: Document;
}

interface Document {
  getEntityById(id: string): Entity | null;
}

export class FaceGroupUtil {
  /**
   * Checks if an entity is part of a face group
   */
  static isFaceGroup(entity: Entity): boolean {
    const material = entity.material;
    return FaceGroupUtil.isFaceGroupMixpaint(material?.mixpaint);
  }

  /**
   * Checks if a mixpaint configuration defines a valid face group
   */
  static isFaceGroupMixpaint(mixpaint: Mixpaint | undefined): boolean {
    const faceGroup = mixpaint?.faceGroup;
    return !!(faceGroup && faceGroup.faceGroupId);
  }

  /**
   * Retrieves all face entities that belong to the same group as the given entity
   */
  static getGroupFaces(entity: Entity): Entity[] {
    const faceGroup = entity.material?.mixpaint?.faceGroup;
    
    if (!faceGroup || !faceGroup.faceGroupId) {
      return [];
    }

    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    const faceIds = faceGroup.getFaceIds();
    const groupFaces: Entity[] = [];

    faceIds.map((faceId) => {
      const face = activeDocument.getEntityById(faceId);
      if (face) {
        groupFaces.push(face);
      }
    });

    return groupFaces;
  }

  /**
   * Determines if a face group needs RCP (Render Color Profile) clearing
   */
  static faceGroupNeedClearRCP(entity: Entity): boolean {
    const isEntityRCP = MaterialUtil.isRCP(entity);
    const hasRCPMismatch = this.getGroupFaces(entity).some(
      (face) => MaterialUtil.isRCP(face) !== isEntityRCP
    );
    return isEntityRCP && hasRCPMismatch;
  }

  /**
   * Gets the transform matrix for a face group entity
   */
  static getFaceGroupTransform(entity: Entity): Transform | undefined {
    const material = entity.material;
    if (material) {
      return FaceGroupUtil.getFaceGroupTransformMixpaint(entity.id, material.mixpaint);
    }
  }

  /**
   * Gets the transform matrix for a face group from mixpaint configuration
   */
  static getFaceGroupTransformMixpaint(
    entityId: string,
    mixpaint: Mixpaint | undefined
  ): Transform | undefined {
    if (mixpaint) {
      return mixpaint.faceGroup.getTransformById(entityId);
    }
  }

  /**
   * Gets the pave outline path for an entity, applying transforms and handling backgrounds
   */
  static getPaveOutline(entity: Entity | Floor, useRcpBackground: boolean): Path2D {
    let outline: Path2D;

    if (entity instanceof HSCore.Model.Floor) {
      outline = FloorMixpaintUtil.getFloorBackgroundWithOpening(entity as Floor);
    } else if (useRcpBackground) {
      outline = HSCore.Util.Face.getFaceRcpBackground(entity as Face);
    } else {
      outline = entity.rawPath2d;
    }

    const transform = this.getFaceGroupTransform(entity);
    
    if (transform && !transform.isIdentity()) {
      outline = MathService.ins.transformedPath(outline, transform);
    }

    return outline;
  }
}