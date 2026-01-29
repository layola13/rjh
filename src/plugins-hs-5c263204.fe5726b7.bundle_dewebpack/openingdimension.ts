import { Vector3, Line3 } from './Vector3Types';
import { HSCore } from './HSCore';
import { ContentDimensionController } from './ContentDimensionController';

interface CollisionPoint {
  intersect: Vector3;
  param1: number;
  line: Line3;
  param2: number;
  type: string;
  content?: unknown;
}

interface LinearDimensionData {
  start?: Vector3;
  end?: Vector3;
  intersect?: Vector3;
  line?: Line3;
  param2?: number;
  collisionType?: string;
  content?: unknown;
}

interface Point2D {
  x: number;
  y: number;
}

interface StructureFace {
  faceInfo?: {
    curve?: {
      getStartPt(): Point2D;
      getEndPt(): Point2D;
    };
  };
}

interface Opening {
  XSize: number;
  YSize: number;
  ZSize: number;
  z: number;
  host: {
    height3d: number;
  };
  localSpaceToModelSpace(point: Point2D): Point2D;
}

interface Wall {
  forEachOpening(callback: (opening: unknown) => void): void;
}

export class OpeningDimension extends ContentDimensionController {
  protected content: Opening;

  constructor(
    content: Opening,
    param2: unknown,
    param3: unknown
  ) {
    super(content, param2, param3, undefined, new OpeningDimensionController(param3, content));
  }

  protected _getRoomHeight(): number {
    return this.content.host.height3d;
  }

  public getCollisionPointToStructure(line: Line3): CollisionPoint | undefined {
    let result: CollisionPoint | undefined = undefined;
    let minParam = Number.MAX_SAFE_INTEGER;

    const app = HSApp.App.getApp();
    const structureFaces = app.floorplan.scene.activeLayer.structureFaces;

    structureFaces.forEach((face: StructureFace) => {
      const curve = face.faceInfo?.curve;
      if (!curve) {
        return;
      }

      const startPt = curve.getStartPt();
      const endPt = curve.getEndPt();
      const start = new Vector3(startPt.x, startPt.y, 0);
      const end = new Vector3(endPt.x, endPt.y, 0);
      const structureLine = new Line3(start, end);

      const threeLine = T3Dx.Three2T3d.convertT3DLine3ToThree(line);
      const threeStructureLine = T3Dx.Three2T3d.convertT3DLine3ToThree(structureLine);
      const intersectionInfo = GeLib.LineUtils.getIntersectionInfo2(threeLine, threeStructureLine);

      if (
        intersectionInfo &&
        intersectionInfo.intersect &&
        intersectionInfo.param1 >= 1 - HSCore.Util.Math.defaultTolerance &&
        HSCore.Util.Math.isInRange(intersectionInfo.param2, 0, 1) &&
        minParam > intersectionInfo.param1
      ) {
        minParam = intersectionInfo.param1;
        result = {
          intersect: new Vector3().copyFrom(intersectionInfo.intersect),
          param1: intersectionInfo.param1,
          line: structureLine,
          param2: intersectionInfo.param2,
          type: 'wall'
        };
      }
    });

    return result;
  }

  public forEachCollisionContent(callback: (content: unknown) => void): void {
    const content = this.content;
    const host = content.host;

    if (content instanceof HSCore.Model.Opening && host instanceof HSCore.Model.Wall) {
      (host as Wall).forEachOpening((opening: unknown) => {
        callback(opening);
      });
    }
  }

  public getLinearDimensionDataByType(dimensionType: HSApp.View.T3d.LinearDimensionType): LinearDimensionData {
    const result: LinearDimensionData = {
      start: undefined,
      end: undefined,
      intersect: undefined,
      line: undefined,
      param2: undefined
    };

    const halfWidth = this.content.XSize / 2;
    const halfDepth = this.content.YSize / 2;

    let start: Vector3 | undefined;
    let end: Vector3 | undefined;
    let localStart: Point2D;
    let localEnd: Point2D;
    let checkLine: Line3;
    let collision: CollisionPoint | undefined;
    let polygon: Point2D[];
    let collisionContents: unknown;
    let closestLine: CollisionPoint | undefined;

    switch (dimensionType) {
      case HSApp.View.T3d.LinearDimensionType.top:
        localStart = this.content.localSpaceToModelSpace({ x: -halfWidth, y: halfDepth });
        start = new Vector3(localStart.x, localStart.y, this.content.z + this.content.ZSize);
        end = new Vector3(start.x, start.y, this._getRoomHeight());
        break;

      case HSApp.View.T3d.LinearDimensionType.bottom:
        localStart = this.content.localSpaceToModelSpace({ x: -halfWidth, y: halfDepth });
        start = new Vector3(localStart.x, localStart.y, this.content.z);
        end = new Vector3(start.x, start.y, 0);
        break;

      case HSApp.View.T3d.LinearDimensionType.left:
        localStart = this.content.localSpaceToModelSpace({ x: -halfWidth, y: halfDepth });
        localEnd = this.content.localSpaceToModelSpace({ x: halfWidth, y: halfDepth });
        start = new Vector3(localStart.x, localStart.y, this.content.z + this.content.ZSize);
        checkLine = new Line3(
          new Vector3(localEnd.x, localEnd.y, 0),
          new Vector3(localStart.x, localStart.y, 0)
        );
        collision = this.getCollisionPointToStructure(checkLine);
        if (!collision) break;

        polygon = [
          { x: -HSFPConstants.Constants.MAX_INPUT_INTEGER, y: halfDepth },
          { x: -halfWidth, y: halfDepth },
          { x: -halfWidth, y: -halfDepth },
          { x: -HSFPConstants.Constants.MAX_INPUT_INTEGER, y: -halfDepth }
        ].map((point: Point2D) => this.content.localSpaceToModelSpace(point));

        collisionContents = this._getCollisionContents(polygon);
        closestLine = this._getClosestCollisionLine(collisionContents, checkLine);
        if (closestLine && closestLine.param1 < collision.param1) {
          collision = closestLine;
        }

        result.collisionType = collision.type;
        result.line = collision.line;
        result.param2 = collision.param2;
        result.content = collision.content;
        end = new Vector3(collision.intersect.x, collision.intersect.y, start.z);
        break;

      case HSApp.View.T3d.LinearDimensionType.right:
        localStart = this.content.localSpaceToModelSpace({ x: -halfWidth, y: halfDepth });
        localEnd = this.content.localSpaceToModelSpace({ x: halfWidth, y: halfDepth });
        start = new Vector3(localEnd.x, localEnd.y, this.content.z + this.content.ZSize);
        checkLine = new Line3(
          new Vector3(localStart.x, localStart.y, 0),
          new Vector3(localEnd.x, localEnd.y, 0)
        );
        collision = this.getCollisionPointToStructure(checkLine);
        if (!collision) break;

        polygon = [
          { x: halfWidth, y: halfDepth },
          { x: HSFPConstants.Constants.MAX_INPUT_INTEGER, y: halfDepth },
          { x: HSFPConstants.Constants.MAX_INPUT_INTEGER, y: -halfDepth },
          { x: halfWidth, y: -halfDepth }
        ].map((point: Point2D) => this.content.localSpaceToModelSpace(point));

        collisionContents = this._getCollisionContents(polygon);
        closestLine = this._getClosestCollisionLine(collisionContents, checkLine);
        if (closestLine && closestLine.param1 < collision.param1) {
          collision = closestLine;
        }

        result.collisionType = collision.type;
        result.line = collision.line;
        result.param2 = collision.param2;
        result.content = collision.content;
        end = new Vector3(collision.intersect.x, collision.intersect.y, start.z);
        break;
    }

    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(this.content);

    if (start && end) {
      start.z += baseHeight;
      end.z += baseHeight;
      result.start = start;
      result.end = end;
    }

    return result;
  }

  protected _getCollisionContents(polygon: Point2D[]): unknown {
    // Implementation needed based on parent class
    return undefined;
  }

  protected _getClosestCollisionLine(contents: unknown, line: Line3): CollisionPoint | undefined {
    // Implementation needed based on parent class
    return undefined;
  }
}

class OpeningDimensionController extends ContentDimensionController {
  protected _getRoomHeight(): number {
    return this.content.host.height3d;
  }
}