interface Wall {
  splitByLerpNumber(lerp: number, flag: boolean): { point: any } | null;
}

interface Layer {
  // Define layer properties as needed
}

/**
 * Request for free cutting walls
 */
export class FreeCutWallRequest extends HSApp.Request.LayerStructureEditRequest {
  private readonly _layer: Layer;
  private readonly _wall: Wall;
  private readonly _lerp: number;
  public splitPoint: any;

  constructor(layer: Layer, wall: Wall, lerp: number) {
    super(layer);
    this._layer = layer;
    this._wall = wall;
    this._lerp = lerp;
    this.splitPoint = undefined;
  }

  /**
   * Execute the wall cutting request
   */
  doRequest(): void {
    if (this._wall) {
      const result = this._wall.splitByLerpNumber(this._lerp, false);
      if (result) {
        this.splitPoint = result.point;
      }
    }
    super.doRequest([]);
  }

  /**
   * Get description of this request
   */
  getDescription(): string {
    return "切割墙体";
  }

  /**
   * Get operation category
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}