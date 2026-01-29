interface RoomResult {
  leftRoom: Room | null;
  rightRoom: Room | null;
}

interface Entity {
  position: Vector2;
  size: Vector2 | number;
}

interface Wall {
  from: Vector2;
  to: Vector2;
}

interface Vector2 {
  x: number;
  y: number;
}

interface Room {
  toDiscretePolygon(): Vector2[];
}

interface Document {
  forEachRoom(callback: (room: Room) => void): void;
}

interface DocumentManager {
  activeDocument: Document;
}

const ROTATION_ANGLE = Math.PI / 2; // Replace 'b' with actual value
const OFFSET_DISTANCE = 0.2;

function getRoomsOnWallSides(entity: Entity, wall: Wall | null): RoomResult {
  if (!wall) {
    return {
      leftRoom: null,
      rightRoom: null
    };
  }

  const entityPosition = entity.position;
  
  const closestPoint = HSCore.Util.Math.getClosestSegmentPoint(
    entityPosition,
    wall.from,
    wall.to
  );

  const wallVector = new HSMath.Vector2(
    wall.to.x - wall.from.x,
    wall.to.y - wall.from.y
  );

  const leftOffsetVector = wallVector
    .clone()
    .normalized()
    .vecRotated(ROTATION_ANGLE);

  const rightOffsetVector = wallVector
    .clone()
    .normalized()
    .vecRotated(-ROTATION_ANGLE);

  const leftTestPoint: Vector2 = {
    x: closestPoint.x + OFFSET_DISTANCE * leftOffsetVector.x,
    y: closestPoint.y + OFFSET_DISTANCE * leftOffsetVector.y
  };

  const rightTestPoint: Vector2 = {
    x: closestPoint.x + OFFSET_DISTANCE * rightOffsetVector.x,
    y: closestPoint.y + OFFSET_DISTANCE * rightOffsetVector.y
  };

  const findRoomContainingPoint = (point: Vector2): Room | null => {
    const documentManager: DocumentManager = HSCore.Doc.getDocManager();
    const activeDocument = documentManager.activeDocument;
    let foundRoom: Room | null = null;

    activeDocument.forEachRoom((room: Room) => {
      const polygon = room.toDiscretePolygon();
      if (HSCore.Util.Math.isPointInPolygon(point, polygon)) {
        foundRoom = room;
      }
    });

    return foundRoom;
  };

  return {
    leftRoom: findRoomContainingPoint(leftTestPoint),
    rightRoom: findRoomContainingPoint(rightTestPoint)
  };
}