import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

interface Wall {
  remove(): void;
}

interface Layer {
  walls: Record<string, Wall>;
}

interface Joint {
  destroy(): void;
}

export class DeleteTGWallsRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _walls: Wall[];
  private readonly _layer: Layer;

  constructor(walls: Wall[], layer: Layer) {
    super();
    this._walls = walls;
    this._layer = layer;
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  onCommit(): unknown[] {
    const layer = this._layer;
    let connectedWalls: Wall[] = [];

    // Collect all walls connected to the walls being deleted
    for (const wall of this._walls) {
      const wallConnectedWalls = HSCore.Util.TgWall.getWallConnectedWalls(wall);
      connectedWalls.push(...wallConnectedWalls);
    }

    // Filter out duplicates and walls being deleted
    connectedWalls = [...new Set(connectedWalls)].filter(
      (wall) => !this._walls.includes(wall)
    );

    // Destroy joints linked to the walls being deleted
    HSCore.Util.Joint.getPointLinkedJoints(this._walls).forEach((joint: Joint) =>
      joint.destroy()
    );

    // Remove all walls
    this._walls.forEach((wall) => wall.remove());

    // Recreate joints for connected walls
    connectedWalls.forEach((wall) => {
      HSCore.Util.TgWall.createWallJoints(wall);
      HSCore.Util.TgWall.processWallsJoints([wall]);
    });

    // Update layer
    HSCore.Util.TgWall.updateLayerByWalls(Object.values(layer.walls), layer);
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();

    return super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "删除墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}