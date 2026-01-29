interface WallSegment {
  start: HSMath.Point2d;
  end: HSMath.Point2d;
  thickness: number;
  extentionInfo?: {
    height?: number;
    bearing?: number;
  };
}

interface WallCreationParams {
  wallPath: [HSMath.Point2d, HSMath.Point2d];
  wallWidth: number;
  firstWall: HSCore.Model.Wall[];
  lastWall: HSCore.Model.Wall[];
  extentionInfo?: {
    height?: number;
    bearing?: number;
  };
}

interface DisplayListItem {
  geometry?: unknown;
}

interface ActiveView {
  displayList: Record<string, DisplayListItem>;
}

interface CommandManager {
  createCommand(type: string, params: string[]): Command;
  cancel(): void;
  execute(command: Command): void;
  receive(event: string, data: WallCreationParams): void;
  complete(): void;
}

interface Command {
  showGizmo: boolean;
}

interface Layer {
  addChild(wall: HSCore.Model.Wall): void;
  forEachWall(callback: (wall: HSCore.Model.Wall) => void): void;
}

interface Scene {
  activeLayer: Layer;
}

interface Floorplan {
  scene: Scene;
  forEachWall(callback: (wall: HSCore.Model.Wall) => void): void;
}

interface App {
  floorplan: Floorplan;
  activeView: ActiveView;
  cmdManager: CommandManager;
}

/**
 * Wall builder utility class for creating and managing walls in the floorplan
 */
export default class WallBuilder {
  /**
   * Creates multiple walls from an array of wall segments
   * @param segments - Array of wall segment definitions
   * @param defaultHeight - Default height to use if not specified in segment
   */
  buildWall(segments: WallSegment[], defaultHeight?: number): void {
    if (!segments || segments.length === 0) {
      return;
    }

    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;

    for (const segment of segments) {
      const { start, end, thickness, extentionInfo } = segment;
      const line = new HSMath.Line2d(start, end);
      const height = extentionInfo?.height ?? defaultHeight ?? HSConstants.Constants.DEFAULT_WALL_3D_HEIGHT;
      
      const wall = HSCore.Model.Wall.create(
        line,
        thickness,
        height,
        undefined,
        undefined,
        extentionInfo?.bearing,
        HSCore.Model.WallMode.Middle
      );

      HSCore.Util.TgWall.createWallJoints(wall);
      HSCore.Util.TgWall.processWallsJoints([wall]);
      activeLayer.addChild(wall);
    }

    HSCore.Util.TgWall.updateLayer(activeLayer);
  }

  /**
   * Creates a single wall using the command system
   * @param segment - Wall segment definition
   */
  buildSingleWall(segment: WallSegment): void {
    const { start, end, thickness, extentionInfo } = segment;

    const params: WallCreationParams = {
      wallPath: [start, end],
      wallWidth: thickness,
      firstWall: this._pickNGWall(start),
      lastWall: this._pickNGWall(end),
      extentionInfo
    };

    const cmdManager = HSApp.App.getApp().cmdManager;
    const commandType = HSFPConstants.CommandType.CreateFreeformNGWall;
    const command = cmdManager.createCommand(commandType, ["centerMode"]);
    
    command.showGizmo = false;
    cmdManager.cancel();
    cmdManager.execute(command);
    cmdManager.receive("gizmo.createwall", params);
    cmdManager.complete();
  }

  /**
   * Finds walls at a given point in the active layer
   * @param point - Point to check for wall intersection
   * @returns Array of walls at the given point
   */
  private _pickNGWall(point: HSMath.Point2d): HSCore.Model.Wall[] {
    const wallMap: Record<string, HSCore.Model.Wall> = {};
    const app = HSApp.App.getApp();
    const displayList = app.activeView.displayList;

    app.floorplan.scene.activeLayer.forEachWall((wall: HSCore.Model.Wall) => {
      if (Object.keys(wallMap).length === 2) {
        return;
      }

      if (!wall.isValid() || HSCore.Util.Wall.isArcWall(wall)) {
        return;
      }

      const displayItem = displayList[wall.id];
      if (!displayItem?.geometry) {
        return;
      }

      const geometry = displayItem.geometry;
      if (HSCore.Util.Math.isPointOnPolygon(point, geometry)) {
        wallMap[wall.id] = wall;
      }
    });

    return Object.values(wallMap);
  }

  /**
   * Finds walls at a given point in the entire floorplan
   * @param point - Point to check for wall intersection
   * @returns Array of walls at the given point
   */
  private _pickWall(point: HSMath.Point2d): HSCore.Model.Wall[] {
    const wallMap: Record<string, HSCore.Model.Wall> = {};
    const app = HSApp.App.getApp();
    const floorplan = app.floorplan;
    const displayList = app.activeView.displayList;

    floorplan.forEachWall((wall: HSCore.Model.Wall) => {
      if (Object.keys(wallMap).length === 2) {
        return;
      }

      if (!wall.isValid() || HSCore.Util.Wall.isArcWall(wall)) {
        return;
      }

      const displayItem = displayList[wall.id];
      if (!displayItem?.geometry) {
        return;
      }

      const geometry = displayItem.geometry;
      if (HSCore.Util.Math.isPointOnPolygon(point, geometry)) {
        wallMap[wall.id] = wall;
      }
    });

    const walls: HSCore.Model.Wall[] = [];
    for (const id in wallMap) {
      walls.push(wallMap[id]);
    }
    
    return walls;
  }
}