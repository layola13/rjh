export interface WallRegion {
  // Define based on your actual region structure
  [key: string]: unknown;
}

export interface Wall {
  id: string;
  parent: Layer | null;
}

export interface Layer {
  slabBuilder: SlabBuilder;
  roomBuilder: RoomBuilder;
}

export interface SlabBuilder {
  getOuterWallInfo(wall: Wall): { outerWallSide: string; reversed: boolean };
  isWallShared(wall: Wall): boolean;
  isInteriorWall(wall: Wall): boolean;
}

export interface RoomBuilder {
  getWallInfo(wallId: string): { regions: WallRegion[] };
}

export class TgWallInfo {
  public readonly wall: Wall;
  public readonly layer: Layer;
  public readonly outerWallSide: string;
  public readonly reversed: boolean;
  public readonly shared: boolean;
  public readonly regions: WallRegion[];
  
  private _isInteriorWall?: boolean;

  constructor(wall: Wall) {
    if (!wall.parent) {
      throw new Error(`wall ${wall.id} has no parent, failed to create wall info!`);
    }

    this.wall = wall;
    this.layer = wall.parent;

    const { outerWallSide, reversed } = this.layer.slabBuilder.getOuterWallInfo(wall);
    this.outerWallSide = outerWallSide;
    this.reversed = reversed;
    this.shared = this.layer.slabBuilder.isWallShared(wall);

    const wallInfo = this.layer.roomBuilder.getWallInfo(wall.id);
    this.regions = wallInfo.regions;
  }

  get isInteriorWall(): boolean {
    if (this._isInteriorWall === undefined) {
      this._isInteriorWall = this.layer.slabBuilder.isInteriorWall(this.wall);
    }
    return this._isInteriorWall;
  }
}