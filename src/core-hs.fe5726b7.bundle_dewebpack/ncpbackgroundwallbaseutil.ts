import { Vector3, Matrix4, MathUtil } from './Vector3Module';
import { Face } from './FaceModule';
import { Logger } from './LoggerModule';

interface ResizableWall {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  initBySize(): void;
}

interface ScaleFactors {
  x?: number;
  y?: number;
  z?: number;
}

interface FaceInfo {
  prev?: FaceWithInfo;
  next?: FaceWithInfo;
}

interface SurfaceObject {
  getNormal(): Vector3;
}

interface FaceWithInfo {
  id: string;
  faceInfo?: FaceInfo;
  surfaceObj: SurfaceObject;
}

interface RoomInfo {
  floors: Face[];
}

interface ContentEntity {
  host?: Face | null;
}

interface EntityWithHost extends ContentEntity {
  host?: Face;
}

interface Point2D {
  x: number;
  y: number;
}

interface PositionSize {
  x: number;
  y: number;
}

export class NCPBackgroundWallBaseUtil {
  static resizeParametricWalls(
    walls: ResizableWall[],
    targetPosition: Vector3,
    scaleFactors: ScaleFactors
  ): void {
    const scaleX = scaleFactors.x ?? 1;
    const scaleY = scaleFactors.y ?? 1;
    const scaleZ = scaleFactors.z ?? 1;

    for (const wall of walls) {
      const wallPosition = new Vector3(wall.x, wall.y, wall.z);
      const rotationMatrix = Matrix4.makeRotateZ(
        -MathUtil.degreeToRadius(wall.rotation)
      ).applyTranslate(wallPosition);

      const transformedTarget = new Vector3(targetPosition).transform(
        rotationMatrix.inversed()
      );

      const deltaX = transformedTarget.x * scaleX - transformedTarget.x;
      const deltaY = transformedTarget.y * scaleY - transformedTarget.y;
      const deltaZ = transformedTarget.x * scaleZ - transformedTarget.z;

      const offset = new Vector3(-deltaX, -deltaY, -deltaZ).transform(rotationMatrix);

      wall.x = offset.x;
      wall.y = offset.y;
      wall.z = offset.z;
      wall.XLength = wall.XLength * scaleX;
      wall.YLength = wall.YLength * scaleY;
      wall.ZLength = wall.ZLength * scaleZ;
      wall.initBySize();
    }
  }

  static getSameLineFaceForClip(
    face: FaceWithInfo,
    resultMap?: Map<string, FaceWithInfo>
  ): Map<string, FaceWithInfo> {
    if (!resultMap) {
      resultMap = new Map<string, FaceWithInfo>();
    }

    resultMap.set(face.id, face);

    const faceInfo = face.faceInfo;
    const prevFace = faceInfo?.prev;
    const nextFace = faceInfo?.next;

    if (
      prevFace &&
      !resultMap.get(prevFace.id) &&
      face.surfaceObj.getNormal().equals(prevFace.surfaceObj.getNormal())
    ) {
      this.getSameLineFaceForClip(prevFace, resultMap);
    }

    if (
      nextFace &&
      !resultMap.get(nextFace.id) &&
      face.surfaceObj.getNormal().equals(nextFace.surfaceObj.getNormal())
    ) {
      this.getSameLineFaceForClip(nextFace, resultMap);
    }

    return resultMap;
  }

  static isContentInRoom(
    content: EntityWithHost,
    room: Face | null,
    includeEdge: boolean = false
  ): boolean {
    if (!room) {
      return false;
    }

    if (!(room instanceof HSCore.Model.Face)) {
      assert(false, `invalid arg ${room.tag}.`, 'HSCore.Model');
      return false;
    }

    if (
      content.host &&
      content.host instanceof Face &&
      content.host.roomInfos
    ) {
      return content.host.roomInfos.some((roomInfo: RoomInfo) =>
        roomInfo.floors.includes(room)
      );
    }

    if (
      HSCore.Util.Layer.getEntityLayer(content) !==
      HSCore.Util.Layer.getEntityLayer(room)
    ) {
      return false;
    }

    const outerLoopPolygon = room.getOuterLoopPolygon();
    if (!outerLoopPolygon || !outerLoopPolygon.length) {
      Logger.console.assert(false, 'invalid room!');
      return false;
    }

    const contentPosSize: PositionSize = HSCore.Util.Content.getContentPosSize(content);
    const contentPoint: Point2D = {
      x: contentPosSize.x,
      y: contentPosSize.y
    };

    return (
      HSCore.Util.Math.isValidPoint(contentPoint) &&
      HSCore.Util.Math.isPointInPolygon(contentPoint, outerLoopPolygon, includeEdge)
    );
  }
}