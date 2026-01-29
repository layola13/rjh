interface Position {
  x: number;
  y: number;
  z?: number;
}

interface Wall {
  from: Position;
  to: Position;
  height3d: number;
  openings: Record<string, Opening>;
  isValid: boolean;
  isFlagOn: (flag: number) => boolean;
}

interface Opening {
  x: number;
  y: number;
  XSize: number;
  ZLength: number;
  ZScale: number;
  rotation: number;
  instanceOf: (className: string) => boolean;
}

interface Door extends Opening {}

interface Room {
  ID: string;
  roomType?: string;
  roomTypeDisplayName?: string;
  toDiscretePolygon: () => Position[];
  forEachWall: (callback: (wall: Wall) => void) => void;
}

interface Document {
  global_wall_height3d: number;
  active_camera: unknown;
  forEachWall: (callback: (wall: Wall) => void) => void;
  forEachRoom: (callback: (room: Room) => void) => void;
}

interface WallSegment {
  from: Position;
  to: Position;
  dis?: number;
}

interface Connector {
  pos: Position;
  id: number;
}

interface PanoData {
  pos: Position;
  outDoors: Door[];
  inDoors: Door[];
  roomId: string;
  roomType: string;
  roomName: string;
  visiblePanos: PanoData[];
  connectors: Connector[];
}

declare const HSCore: {
  Doc: {
    getDocManager: () => {
      activeDocument: Document;
    };
  };
  Model: {
    EntityFlagEnum: {
      hidden: number;
    };
    Door: new (...args: unknown[]) => Door;
  };
  Util: {
    Math: {
      rotatePointCW: (center: Position, point: Position, rotation: number) => Position;
      segmentSegmentIntersection: (
        p1: Position,
        p2: Position,
        p3: Position,
        p4: Position
      ) => boolean;
      isPointInPolygon: (point: Position, polygon: Position[]) => boolean;
      getDistance: (p1: Position, p2: Position) => number;
    };
  };
};

declare const HSConstants: {
  ModelClass: {
    NgDoor: string;
    NgHole: string;
  };
};

declare const THREE: {
  Vector2: new (x: number, y: number) => {
    x: number;
    y: number;
    normalize: () => void;
  };
};

const NONE_VALUE = 'none';
const DOOR_SAMPLE_POINTS = 20;
const DOOR_POSITION_SCALE = 1e4;

function isValidWall(wall: Wall | null): boolean {
  if (!wall) return false;
  if (!wall.isValid) return false;
  
  const document = HSCore.Doc.getDocManager().activeDocument;
  return !(
    wall.height3d < document.global_wall_height3d ||
    wall.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)
  );
}

function getDoorsFromFloorplan(): Door[] {
  const document = HSCore.Doc.getDocManager().activeDocument;
  const doors: Door[] = [];
  
  document.forEachWall((wall: Wall) => {
    if (!isValidWall(wall)) return;
    
    for (const openingKey in wall.openings) {
      const opening = wall.openings[openingKey];
      
      if (opening.instanceOf(HSConstants.ModelClass.NgDoor)) {
        let alreadyExists = false;
        
        for (let i = 0; i < doors.length; ++i) {
          if (doors[i] === opening) {
            alreadyExists = true;
            break;
          }
        }
        
        if (!alreadyExists) {
          doors.push(opening as Door);
        }
      }
    }
  });
  
  return doors;
}

function calculateDistance(point1: Position, point2: Position): number {
  const deltaX = point1.x - point2.x;
  const deltaY = point1.y - point2.y;
  return Math.pow(deltaX * deltaX + deltaY * deltaY, 0.5);
}

function sortByDistanceDescending(a: WallSegment, b: WallSegment): number {
  return (b.dis ?? 0) - (a.dis ?? 0);
}

function getWallSegments(excludeOpening?: Opening): WallSegment[] {
  const segments: WallSegment[] = [];
  const document = HSCore.Doc.getDocManager().activeDocument;
  
  document.forEachWall((wall: Wall) => {
    if (!isValidWall(wall)) return;
    
    const openingSegments: WallSegment[] = [];
    
    for (const openingKey in wall.openings) {
      const opening = wall.openings[openingKey];
      
      if (opening !== excludeOpening && !opening.instanceOf(HSConstants.ModelClass.NgHole)) {
        continue;
      }
      
      let leftPoint: Position = {
        x: opening.x - opening.XSize / 2,
        y: opening.y
      };
      leftPoint = HSCore.Util.Math.rotatePointCW(opening, leftPoint, opening.rotation);
      
      let rightPoint: Position = {
        x: opening.x + opening.XSize / 2,
        y: opening.y
      };
      rightPoint = HSCore.Util.Math.rotatePointCW(opening, rightPoint, opening.rotation);
      
      new THREE.Vector2(rightPoint.x - leftPoint.x, rightPoint.y - leftPoint.y).normalize();
      
      const leftDistance = calculateDistance(leftPoint, wall.from);
      const rightDistance = calculateDistance(rightPoint, wall.from);
      
      if (leftDistance < rightDistance) {
        openingSegments.push({
          from: leftPoint,
          to: rightPoint,
          dis: leftDistance
        });
      } else {
        openingSegments.push({
          from: rightPoint,
          to: leftPoint,
          dis: rightDistance
        });
      }
    }
    
    if (openingSegments.length <= 0) {
      segments.push(wall);
    } else {
      openingSegments.sort(sortByDistanceDescending);
      
      let currentPoint = wall.from;
      
      openingSegments.forEach((segment: WallSegment) => {
        const currentDistance = calculateDistance(wall.from, currentPoint);
        const segmentDistance = calculateDistance(wall.from, segment.from);
        
        if (currentDistance < segmentDistance) {
          segments.push({
            from: currentPoint,
            to: segment.from
          });
          currentPoint = segment.to;
        }
      });
      
      segments.push({
        from: currentPoint,
        to: wall.to
      });
    }
  });
  
  return segments;
}

function getOutDoors(panoData: PanoData): void {
  const panoPosition = panoData.pos;
  const allDoors = getDoorsFromFloorplan();
  const outDoors: Door[] = [];
  
  allDoors.forEach((door: Door) => {
    const wallSegments = getWallSegments(door);
    
    let leftPoint: Position = {
      x: door.x - door.XSize / 2,
      y: door.y
    };
    leftPoint = HSCore.Util.Math.rotatePointCW(door, leftPoint, door.rotation);
    
    let rightPoint: Position = {
      x: door.x + door.XSize / 2,
      y: door.y
    };
    rightPoint = HSCore.Util.Math.rotatePointCW(door, rightPoint, door.rotation);
    
    const stepVector = new THREE.Vector2(
      (rightPoint.x - leftPoint.x) / DOOR_SAMPLE_POINTS,
      (rightPoint.y - leftPoint.y) / DOOR_SAMPLE_POINTS
    );
    
    const testPoint: Position = {
      x: leftPoint.x,
      y: leftPoint.y
    };
    
    for (let step = 1; step <= DOOR_SAMPLE_POINTS - 1; ++step) {
      testPoint.x += stepVector.x;
      testPoint.y += stepVector.y;
      
      let hasIntersection = false;
      
      for (let i = 0; i < wallSegments.length; ++i) {
        if (HSCore.Util.Math.segmentSegmentIntersection(
          panoPosition,
          testPoint,
          wallSegments[i].from,
          wallSegments[i].to
        )) {
          hasIntersection = true;
          break;
        }
      }
      
      if (!hasIntersection) {
        outDoors.push(door);
        break;
      }
    }
  });
  
  panoData.outDoors = outDoors;
}

function getPosRoom(position: Position): Room | null {
  const document = HSCore.Doc.getDocManager().activeDocument;
  
  if (!document) return null;
  if (!document.active_camera) return null;
  
  let foundRoom: Room | undefined;
  
  document.forEachRoom((room: Room) => {
    if (foundRoom) return;
    
    const polygon = room.toDiscretePolygon();
    if (HSCore.Util.Math.isPointInPolygon(position, polygon)) {
      foundRoom = room;
    }
  });
  
  return foundRoom ?? null;
}

function getInDoors(panoData: PanoData): void {
  const panoPosition = panoData.pos;
  const room = getPosRoom(panoPosition);
  
  panoData.inDoors = [];
  panoData.roomId = NONE_VALUE;
  panoData.roomType = NONE_VALUE;
  panoData.roomName = NONE_VALUE;
  
  if (room) {
    panoData.roomId = `${room.roomType ?? NONE_VALUE}-${room.ID}`;
    panoData.roomType = room.roomType ?? NONE_VALUE;
    panoData.roomName = room.roomTypeDisplayName ?? NONE_VALUE;
    
    room.forEachWall((wall: Wall) => {
      if (!isValidWall(wall)) return;
      
      for (const openingKey in wall.openings) {
        const opening = wall.openings[openingKey];
        
        if (opening instanceof HSCore.Model.Door) {
          panoData.inDoors.push(opening as Door);
        }
      }
    });
  }
}

function getVisiblePanos(currentPano: PanoData, allPanos: PanoData[]): void {
  const wallSegments = getWallSegments();
  currentPano.visiblePanos = [];
  
  allPanos.forEach((otherPano: PanoData) => {
    if (currentPano === otherPano) return;
    
    let hasObstacle = false;
    
    for (let i = 0; i < wallSegments.length; ++i) {
      if (HSCore.Util.Math.segmentSegmentIntersection(
        currentPano.pos,
        otherPano.pos,
        wallSegments[i].from,
        wallSegments[i].to
      )) {
        hasObstacle = true;
        break;
      }
    }
    
    if (!hasObstacle) {
      currentPano.visiblePanos.push(otherPano);
    }
  });
}

function getPanoIndex(pano: PanoData, allPanos: PanoData[]): number | undefined {
  for (let i = 0; i < allPanos.length; ++i) {
    if (pano === allPanos[i]) return i;
  }
  return undefined;
}

function getConnectors(currentPano: PanoData, allPanos: PanoData[]): void {
  const outDoors = currentPano.outDoors;
  currentPano.connectors = [];
  
  outDoors.forEach((door: Door) => {
    const candidatePanos: PanoData[] = [];
    const currentRoom = getPosRoom(currentPano.pos);
    
    const isDoorOnLine = (pano1Pos: Position, pano2Pos: Position, door: Door): boolean => {
      let leftPoint: Position = {
        x: door.x - DOOR_POSITION_SCALE * door.XSize / 2,
        y: door.y
      };
      leftPoint = HSCore.Util.Math.rotatePointCW(door, leftPoint, door.rotation);
      
      let rightPoint: Position = {
        x: door.x + DOOR_POSITION_SCALE * door.XSize / 2,
        y: door.y
      };
      rightPoint = HSCore.Util.Math.rotatePointCW(door, rightPoint, door.rotation);
      
      return HSCore.Util.Math.segmentSegmentIntersection(leftPoint, rightPoint, pano1Pos, pano2Pos);
    };
    
    const doorType = 'outDoors';
    
    allPanos.forEach((otherPano: PanoData) => {
      for (let i = 0; i < otherPano[doorType].length; ++i) {
        if (otherPano === currentPano) continue;
        if (getPosRoom(otherPano.pos) === currentRoom) continue;
        if (!isDoorOnLine(otherPano.pos, currentPano.pos, door)) continue;
        if (otherPano[doorType][i] !== door) continue;
        
        candidatePanos.push(otherPano);
      }
    });
    
    let selectedPano: PanoData | undefined;
    
    if (candidatePanos.length === 1) {
      selectedPano = candidatePanos[0];
    } else if (candidatePanos.length > 0) {
      const findClosestPano = (panos: PanoData[]): PanoData => {
        let closest = panos[0];
        let minDistance = HSCore.Util.Math.getDistance(closest.pos, door);
        
        for (let i = 1; i < panos.length; ++i) {
          const distance = HSCore.Util.Math.getDistance(panos[i].pos, door);
          if (distance < minDistance) {
            closest = panos[i];
            minDistance = distance;
          }
        }
        
        return closest;
      };
      
      const panosOnLine: PanoData[] = [];
      
      for (let i = 0; i < candidatePanos.length; ++i) {
        if (isDoorOnLine(candidatePanos[i].pos, currentPano.pos, door)) {
          panosOnLine.push(candidatePanos[i]);
        }
      }
      
      if (panosOnLine.length > 0) {
        selectedPano = findClosestPano(panosOnLine);
      }
      
      if (!selectedPano) {
        selectedPano = findClosestPano(candidatePanos);
      }
    }
    
    if (selectedPano) {
      const panoIndex = getPanoIndex(selectedPano, allPanos);
      
      if (panoIndex !== undefined) {
        const connector: Connector = {
          pos: {
            x: door.x,
            y: door.y,
            z: door.ZLength * door.ZScale / 2
          },
          id: panoIndex
        };
        
        const existingConnector = currentPano.connectors.find(
          (c: Connector) => c.id === connector.id
        );
        
        if (!existingConnector) {
          currentPano.connectors.push(connector);
        }
      }
    }
  });
}

function getPanosConnectors(panos: PanoData[]): PanoData[] {
  panos.forEach((pano: PanoData) => {
    getInDoors(pano);
    getOutDoors(pano);
    getVisiblePanos(pano, panos);
  });
  
  panos.forEach((pano: PanoData) => {
    getConnectors(pano, panos);
  });
  
  return panos;
}

export const Pano = {
  getPanosConnectors
};