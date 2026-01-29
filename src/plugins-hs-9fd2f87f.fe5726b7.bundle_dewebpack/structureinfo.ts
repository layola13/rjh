interface EntityData {
  id: string;
  Class: string;
  XSize: number;
  YSize: number;
  ZSize: number;
  faceList: Face[];
  height3d: number;
  getUniqueParent(): ParentEntity;
  instanceOf(modelClass: string): boolean;
}

interface ParentEntity {
  height: number;
}

interface Face {
  realPath2d: Path2D;
}

interface Path2D {
  // Define path2d structure as needed
}

interface Size {
  XSize: number;
  YSize: number;
  ZSize: number;
}

declare namespace HSCore {
  namespace Util {
    namespace TgWall {
      function getArea(path: Path2D): number;
    }
    namespace Face {
      function getFaceType(face: Face): string;
    }
  }
}

declare namespace HSConstants {
  namespace ModelClass {
    const NCustomizedBeam: string;
  }
}

export class StructureInfo {
  id: string;
  entity: EntityData;
  outline?: unknown;
  isRemoveAdd: boolean;
  area: number;
  classType: string;
  size: Size;

  constructor(entity: EntityData) {
    this.id = entity.id;
    this.classType = entity.Class;
    this.entity = entity;
    this.size = {
      XSize: entity.XSize,
      YSize: entity.YSize,
      ZSize: entity.ZSize
    };
    this.area = this.getSurfaceAreaForStructure(entity);
    this.isRemoveAdd = true;
  }

  changeRemoveAddStatus(status: boolean): void {
    this.isRemoveAdd = status;
  }

  getSurfaceAreaForStructure(entity: EntityData): number {
    const faces = this.getDeduplicationFaces(entity);
    let totalArea = 0;
    
    faces.forEach((face) => {
      const faceArea = HSCore.Util.TgWall.getArea(face.realPath2d);
      totalArea += faceArea;
    });
    
    return totalArea;
  }

  getDeduplicationFaces(entity: EntityData): Face[] {
    const deduplicatedFaces: Face[] = [];
    const parent = entity.getUniqueParent();
    
    entity.faceList.forEach((face) => {
      const faceType = HSCore.Util.Face.getFaceType(face);
      
      if (faceType !== "bottom" || entity.instanceOf(HSConstants.ModelClass.NCustomizedBeam)) {
        if (faceType !== "top" || parent.height > entity.height3d) {
          deduplicatedFaces.push(face);
        }
      }
    });
    
    return deduplicatedFaces;
  }
}