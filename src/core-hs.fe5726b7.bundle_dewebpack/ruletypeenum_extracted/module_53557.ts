export interface OpeningLine {
  from: THREE.Vector3;
  to: THREE.Vector3;
  pdir: THREE.Vector2;
}

export interface Camera {
  x: number;
  y: number;
  z: number;
  target_x?: number;
  target_y?: number;
  target_z?: number;
  near?: number;
}

export interface GeometryManager {
  getGeometryObject(id: string): GeometryObject | null;
  getWallInfo(wall: HSCore.Model.Wall): WallInfo | null;
}

export interface GeometryObject {
  provider: {
    getFacePath(room: HSCore.Model.Room): THREE.Vector3[] | null;
  };
}

export interface WallInfo {
  reversed: boolean;
}

export interface DocumentManager {
  geometryManager: GeometryManager;
  forEachRoom(callback: (room: HSCore.Model.Room) => void): void;
}

export interface FloorSlab {
  getFaces(faceType: number): Record<string, unknown>;
}

export interface Building {
  forEachFloorSlab(callback: (slab: FloorSlab) => void): void;
}

export enum SlabFaceType {
  top = 0
}

export function getOpeningLine(opening: HSCore.Model.Opening): OpeningLine | null {
  const host = opening.getHost();
  
  if (!(host instanceof HSCore.Model.Wall && host.verify())) {
    return null;
  }

  const docManager = HSCore.Doc.getDocManager();
  const wallInfo = docManager.geometryManager.getWallInfo(host);
  const tangent = host.getTangent(0.5);

  if (wallInfo?.reversed) {
    tangent.reverse();
  }

  const halfWidthOffset = tangent.normalized().multiply(opening.XSize / 2);

  return {
    from: halfWidthOffset.added(opening),
    to: halfWidthOffset.reversed().added(opening),
    pdir: new THREE.Vector2(-tangent.y, tangent.x)
  };
}

export function roomPolygon(
  room: HSCore.Model.Room,
  docManager: DocumentManager
): THREE.Vector3[] | null {
  const geometryObject = docManager.geometryManager.getGeometryObject(room.id);
  
  if (!geometryObject) {
    return null;
  }

  return geometryObject.provider.getFacePath(room);
}

export function findRoomByCamera(
  camera: Camera,
  docManager: DocumentManager,
  building?: Building
): HSCore.Model.Room | undefined {
  let foundRoom: HSCore.Model.Room | undefined;

  const checkRoomByCamera = (room: HSCore.Model.Room): void => {
    if (foundRoom) {
      return;
    }

    const cameraPosition = new THREE.Vector3(camera.x, camera.y, camera.z);

    if (camera) {
      const direction = new THREE.Vector3(
        camera.target_x! - camera.x,
        camera.target_y! - camera.y,
        (camera.target_z ?? camera.z) - camera.z
      );
      direction.setLength(camera.near ?? 0.1);
      cameraPosition.add(direction);
    }

    const polygon = roomPolygon(room, docManager);
    
    if (polygon && HSCore.Util.Math.isPointInPolygon(cameraPosition, polygon)) {
      foundRoom = room;
    }
  };

  const checkRoomByTarget = (room: HSCore.Model.Room, targetPosition: THREE.Vector3): void => {
    if (foundRoom) {
      return;
    }

    const polygon = roomPolygon(room, docManager);
    
    if (HSCore.Util.Math.isPointInPolygon(targetPosition, polygon)) {
      foundRoom = room;
    }
  };

  if (building) {
    building.forEachFloorSlab((slab: FloorSlab) => {
      const faces = slab.getFaces(SlabFaceType.top);
      Object.values(faces)
        .filter((face): face is HSCore.Model.Floor => face instanceof HSCore.Model.Floor)
        .forEach((floor: HSCore.Model.Floor) => {
          checkRoomByCamera(floor as unknown as HSCore.Model.Room);
        });
    });
  } else {
    docManager.forEachRoom((room: HSCore.Model.Room) => {
      checkRoomByCamera(room);
    });
  }

  if (!foundRoom && camera.target_x !== undefined && camera.target_y !== undefined) {
    const targetPosition = new THREE.Vector3(camera.target_x, camera.target_y, 0);

    if (building) {
      building.forEachFloorSlab((slab: FloorSlab) => {
        const faces = slab.getFaces(SlabFaceType.top);
        Object.values(faces)
          .filter((face): face is HSCore.Model.Floor => face instanceof HSCore.Model.Floor)
          .forEach((floor: HSCore.Model.Floor) => {
            checkRoomByTarget(floor as unknown as HSCore.Model.Room, targetPosition);
          });
      });
    } else {
      docManager.forEachRoom((room: HSCore.Model.Room) => {
        checkRoomByTarget(room, targetPosition);
      });
    }
  }

  return foundRoom;
}