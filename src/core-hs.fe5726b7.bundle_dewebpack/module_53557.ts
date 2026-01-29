interface Camera {
  x: number;
  y: number;
  z: number;
  target_x?: number;
  target_y?: number;
  target_z?: number;
  near?: number;
}

interface GeometryManager {
  getGeometryObject(id: string): GeometryObject | null;
  getWallInfo(wall: HSCore.Model.Wall): WallInfo | null;
}

interface GeometryObject {
  provider: {
    getFacePath(element: HSCore.Model.Room | HSCore.Model.Floor): THREE.Vector3[] | null;
  };
}

interface WallInfo {
  reversed: boolean;
}

interface DocumentManager {
  geometryManager: GeometryManager;
}

interface OpeningLine {
  from: THREE.Vector3;
  to: THREE.Vector3;
  pdir: THREE.Vector2;
}

enum SlabFaceType {
  top = 'top'
}

interface FloorSlab {
  getFaces(faceType: SlabFaceType): Record<string, HSCore.Model.Floor>;
}

interface Opening {
  id: string;
  XSize: number;
  x: number;
  y: number;
  z: number;
  getHost(): HSCore.Model.Wall | null;
}

export function getOpeningLine(opening: Opening): OpeningLine | null {
  const host = opening.getHost();
  
  if (!(host instanceof HSCore.Model.Wall && host.verify())) {
    return null;
  }
  
  const documentManager = HSCore.Doc.getDocManager() as DocumentManager;
  const wallInfo = documentManager.geometryManager.getWallInfo(host);
  const tangent = host.getTangent(0.5);
  
  if (wallInfo?.reversed) {
    tangent.reverse();
  }
  
  const halfSizeVector = tangent.normalized().multiply(opening.XSize / 2);
  const openingPosition = new THREE.Vector3(opening.x, opening.y, opening.z);
  
  return {
    from: halfSizeVector.added(openingPosition),
    to: halfSizeVector.reversed().added(openingPosition),
    pdir: new THREE.Vector2(-tangent.y, tangent.x)
  };
}

export function roomPolygon(
  room: HSCore.Model.Room | HSCore.Model.Floor,
  documentManager: DocumentManager
): THREE.Vector3[] | null {
  const geometryObject = documentManager.geometryManager.getGeometryObject(room.id);
  
  if (geometryObject) {
    return geometryObject.provider.getFacePath(room);
  }
  
  return null;
}

export function findRoomByCamera(
  camera: Camera,
  documentManager: DocumentManager,
  floorSlab?: FloorSlab
): HSCore.Model.Room | HSCore.Model.Floor | undefined {
  let foundRoom: HSCore.Model.Room | HSCore.Model.Floor | undefined;
  
  const checkRoomByCamera = (room: HSCore.Model.Room | HSCore.Model.Floor): void => {
    if (foundRoom) {
      return;
    }
    
    const cameraPosition = new THREE.Vector3(camera.x, camera.y, camera.z);
    
    if (camera) {
      const targetDirection = new THREE.Vector3(
        camera.target_x! - camera.x,
        camera.target_y! - camera.y,
        (camera.target_z ?? camera.z) - camera.z
      );
      targetDirection.setLength(camera.near ?? 0.1);
      cameraPosition.add(targetDirection);
    }
    
    const polygon = roomPolygon(room, documentManager);
    
    if (polygon && HSCore.Util.Math.isPointInPolygon(cameraPosition, polygon)) {
      foundRoom = room;
    }
  };
  
  const checkRoomByTarget = (
    room: HSCore.Model.Room | HSCore.Model.Floor,
    targetPosition: THREE.Vector3
  ): void => {
    if (foundRoom) {
      return;
    }
    
    const polygon = roomPolygon(room, documentManager);
    
    if (HSCore.Util.Math.isPointInPolygon(targetPosition, polygon)) {
      foundRoom = room;
    }
  };
  
  if (floorSlab) {
    floorSlab.forEachFloorSlab((slab: FloorSlab) => {
      const topFaces = slab.getFaces(SlabFaceType.top);
      Object.values(topFaces)
        .filter((face): face is HSCore.Model.Floor => face instanceof HSCore.Model.Floor)
        .forEach((floor) => {
          checkRoomByCamera(floor);
        });
    });
  } else {
    documentManager.forEachRoom((room: HSCore.Model.Room) => {
      checkRoomByCamera(room);
    });
  }
  
  if (!foundRoom && camera.target_x !== undefined && camera.target_y !== undefined) {
    const targetPosition = new THREE.Vector3(camera.target_x, camera.target_y, 0);
    
    if (floorSlab) {
      floorSlab.forEachFloorSlab((slab: FloorSlab) => {
        const topFaces = slab.getFaces(SlabFaceType.top);
        Object.values(topFaces)
          .filter((face): face is HSCore.Model.Floor => face instanceof HSCore.Model.Floor)
          .forEach((floor) => {
            checkRoomByTarget(floor, targetPosition);
          });
      });
    } else {
      documentManager.forEachRoom((room: HSCore.Model.Room) => {
        checkRoomByTarget(room, targetPosition);
      });
    }
  }
  
  return foundRoom;
}