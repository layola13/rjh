import { HSCore } from './HSCore';
import { Vector2, Line2d, CONST, MathUtil } from './math';

interface MoveWallInfo {
  oldWidth: number;
  curve: Line2d;
}

interface OpeningUpdaterInfo {
  updater: {
    update(): void;
  };
  dist: number;
  wall: HSCore.Model.Wall;
  opening: HSCore.Model.Opening | HSCore.Model.DOpening | HSCore.Model.ParametricOpening;
}

interface WallBeforeData {
  curve: Line2d;
}

export class ChangeWallsWidthRequest extends HSCore.Transaction.Common.StateRequest {
  private _walls: HSCore.Model.Wall[];
  private _moveWallInfoMap: Map<HSCore.Model.Wall, MoveWallInfo>;
  private _allWallBeforeData: Map<string, WallBeforeData>;
  private _changedWalls: Set<HSCore.Model.Wall>;
  private _openingUpdater: Map<string, OpeningUpdaterInfo>;
  private _dirtyFloors: Set<HSCore.Model.Floor>;

  constructor(walls: HSCore.Model.Wall[] = []) {
    super();
    
    this._walls = walls;
    this._moveWallInfoMap = new Map();
    this._allWallBeforeData = HSCore.Util.TgWall.getWallBeforeData(
      Object.values(this._walls[0].getUniqueParent().walls)
    );
    this._changedWalls = new Set();
    this._openingUpdater = new Map();
    this._dirtyFloors = new Set();

    HSCore.Util.TgWall.getJointLinkWalls(this._walls).forEach((wall) => {
      this._changedWalls.add(wall);
    });

    for (const wall of this._walls) {
      if (wall.mode === HSCore.Model.WallMode.Inner || wall.mode === HSCore.Model.WallMode.Outer) {
        this._moveWallInfoMap.set(wall, {
          oldWidth: wall.width,
          curve: wall.curve.clone()
        });
      }
    }

    if (walls.length > 0) {
      const layer = HSCore.Util.Layer.getEntityLayer(walls[0]);
      HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
    }
  }

  onActivate(): void {
    HSCore.Util.Joint.convertDIYTypeToXTypeJoints(this._walls);
  }

  onReceive(event: string, data: { value: number }): boolean {
    if (event !== 'change') {
      return super.onReceive(event, data);
    }

    this._move(data.value);
    this._changeWidth(data.value);
    HSCore.Util.TgWall.processWallsJoints(this._walls);
    
    HSCore.Util.TgWall.getJointLinkWalls(this._walls).forEach((wall) => {
      this._changedWalls.add(wall);
    });
    
    this._updateOpenings();
    
    return true;
  }

  private _move(newWidth: number): void {
    if (this._moveWallInfoMap.size === 0) {
      return;
    }

    const calculateOffset = (
      wall: HSCore.Model.Wall,
      newWidth: number,
      oldWidth: number
    ): Vector2 => {
      const direction = new Vector2(wall.direction).normalize();
      const rotationAngle = wall.mode === HSCore.Model.WallMode.Inner 
        ? CONST.PI_2 
        : -CONST.PI_2;
      const offset = direction.vecRotate(rotationAngle);
      offset.multiply((newWidth - oldWidth) / 2);
      return offset;
    };

    for (const [wall, info] of this._moveWallInfoMap) {
      const offsetVec = calculateOffset(wall, newWidth, info.oldWidth);
      
      if (Number.isNaN(offsetVec.x) || Number.isNaN(offsetVec.y)) {
        console.assert(false, 'ChangeWallsWidthRequest: offsetVec contains NaN number!');
        continue;
      }

      const newCurve = info.curve.clone().translate(offsetVec);
      
      if (newCurve instanceof Line2d) {
        const origin = newCurve.getOrigin();
        if (
          typeof origin.x !== 'number' ||
          typeof origin.y !== 'number' ||
          Number.isNaN(origin.x) ||
          Number.isNaN(origin.y)
        ) {
          console.assert(false, 'ChangeWallsWidthRequest: generate invalid wall.curve!');
          continue;
        }
      }
      
      wall.curve = newCurve;
    }
  }

  private _changeWidth(newWidth: number): void {
    this._walls.forEach((wall) => {
      wall.width = newWidth;
    });
  }

  onCommit(): HSCore.Model.Wall[] {
    if (this._walls.length > 0) {
      HSCore.Util.TgWall.processWallsJoints(this._walls);
      
      const layer = HSCore.Util.Layer.getEntityLayer(this._walls[0]);
      const allWalls = Object.values(layer.walls);
      
      HSCore.Util.TgWall.getJointLinkWalls(this._walls).forEach((wall) => {
        this._changedWalls.add(wall);
      });
      
      this._updateOpenings();
      
      HSCore.Util.TgWall.updateLayerByWalls(allWalls, layer, {
        preHoleBuild: () => {
          this._getPOpenings().forEach((opening) => {
            opening.updateOpeningPos();
          });
        }
      });
      
      this._dirtyFloors.forEach((floor) => {
        floor.dirtyGeometry();
      });
      
      HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    }
    
    super.onCommit();
    return this._walls;
  }

  onUndo(): void {
    super.onUndo();
    
    this._dirtyFloors.forEach((floor) => {
      floor.dirtyGeometry();
    });
    
    const parent = this._walls.length ? this._walls[0].getUniqueParent() : undefined;
    
    if (parent instanceof HSCore.Model.Layer) {
      Object.values(parent.openings)
        .filter((opening) => HSCore.Util.Content.isSlabOpening(opening))
        .forEach((opening) => {
          opening.dirtyGeometry();
        });
    }
  }

  onRedo(): void {
    super.onRedo();
    
    this._dirtyFloors.forEach((floor) => {
      floor.dirtyGeometry();
    });
    
    const parent = this._walls.length ? this._walls[0].getUniqueParent() : undefined;
    
    if (parent instanceof HSCore.Model.Layer) {
      Object.values(parent.openings)
        .filter((opening) => HSCore.Util.Content.isSlabOpening(opening))
        .forEach((opening) => {
          opening.dirtyGeometry();
        });
    }
  }

  private _getPOpenings(): Set<HSCore.Model.ParametricOpening> {
    const openings = new Set<HSCore.Model.ParametricOpening>();
    
    this._changedWalls.forEach((wall) => {
      wall.forEachContent((content) => {
        if (content instanceof HSCore.Model.ParametricOpening) {
          openings.add(content);
        }
      });
    });
    
    return openings;
  }

  private _updateOpenings(): void {
    this._changedWalls.forEach((wall) => {
      wall.forEachContent((content) => {
        const isValidOpening = 
          content instanceof HSCore.Model.Opening ||
          content instanceof HSCore.Model.DOpening ||
          (content instanceof HSCore.Model.ParametricOpening && content.relatedWalls.length === 1);
        
        if (isValidOpening && !this._openingUpdater.has(content.id)) {
          if (content instanceof HSCore.Model.Opening) {
            content.getRefreshFloors(Array.from(this._dirtyFloors)).forEach((floor) => {
              this._dirtyFloors.add(floor);
            });
          }
          
          const openingPos = new Vector2(content);
          const originalCurve = this._allWallBeforeData.get(wall.id).curve;
          
          this._openingUpdater.set(content.id, {
            updater: HSCore.Util.Opening.getWallChangeUpdater(
              content,
              {
                wallCurve: originalCurve,
                openingPos: openingPos
              },
              wall
            ),
            dist: openingPos.distanceTo(originalCurve.getProjectedPtBy(openingPos)),
            wall: wall,
            opening: content
          });
        }
      });
    });
    
    this._openingUpdater.forEach((info) => {
      if (
        info.opening instanceof HSCore.Model.Opening ||
        info.opening instanceof HSCore.Model.DOpening
      ) {
        let thickness = info.wall.width;
        
        if (HSCore.Util.Content.isWallNiche(info.opening)) {
          thickness = info.wall.width - 2 * info.dist;
        }
        
        const MIN_THICKNESS = 0.001;
        if (MathUtil.isNearlySmaller(thickness, MIN_THICKNESS)) {
          thickness = MIN_THICKNESS;
        }
        
        info.opening.thickness = thickness;
        info.updater.update();
      }
    });
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '修改墙体厚度';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}