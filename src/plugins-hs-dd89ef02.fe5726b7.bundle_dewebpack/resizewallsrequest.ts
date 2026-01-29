type Wall = {
  width: number;
  height3d: number;
  getUniqueParent(): Layer | null;
  dirtyGeometry(): void;
};

type Layer = unknown;

type UpdateField = "width" | "height";

type ResizeName = "width" | "height";

declare namespace HSCore.Util {
  namespace FaceMoldingFitHelper {
    function getInstance(): {
      startListening(layers: Layer[]): void;
      autoFit(): void;
    };
  }

  namespace Wall {
    function findConnectedWalls(walls: Wall[]): Wall[];
    function updateWallsFaces(walls: Wall[]): void;
  }

  namespace Layer {
    function dirtyLayerSlabFaces(layer: Layer): void;
    function getNextLayer(layer: Layer): Layer;
  }

  namespace Slab {
    function updateLayersSlabAfterWallChanged(layer: Layer): void;
  }
}

declare namespace HSApp.Request {
  class LayerStructureEditRequest {
    constructor(layer: Layer);
    protected onCommit(): unknown[];
    protected doRequest(): void;
    protected onUndo(): void;
    protected onRedo(): void;
  }
}

declare namespace HSFPConstants {
  enum LogGroupTypes {
    WallOperation = "WallOperation"
  }
}

export class ResizeWallsRequest extends HSApp.Request.LayerStructureEditRequest {
  private readonly _walls: Wall[];
  private readonly _name: ResizeName;
  private readonly _value: number;
  private readonly _updatedFields: Set<UpdateField>;

  constructor(walls: Wall[] = [], name?: ResizeName, value?: number) {
    const parentLayers = walls
      .map((wall) => wall.getUniqueParent())
      .filter((parent): parent is Layer => !!parent);

    console.assert(
      parentLayers.length === 1,
      "walls should be on the same layer"
    );

    super(parentLayers[0]);

    this._walls = walls;
    this._name = name!;
    this._value = value!;
    this._updatedFields = new Set<UpdateField>();

    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(parentLayers);
  }

  protected onCommit(): Wall[] {
    const { _name: name, _value: value } = this;

    switch (name) {
      case "width":
        this._walls.forEach((wall) => {
          wall.width = value;
        });
        this._updatedFields.add("width");
        break;

      case "height":
        this._walls.forEach((wall) => {
          wall.height3d = value;
        });
        this._updatedFields.add("height");
        break;

      default:
        console.assert(false, "unsupported yet!");
    }

    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit();

    return this._walls;
  }

  protected doRequest(): void {
    if (this._walls.length) {
      const connectedWalls = HSCore.Util.Wall.findConnectedWalls(this._walls);
      this._refreshWalls(connectedWalls);
      HSCore.Util.Wall.updateWallsFaces(connectedWalls);
      this._dirtySlabFaces();
      super.doRequest();
    }
  }

  protected onUndo(): void {
    super.onUndo();
    this._dirtyModifiedWalls();
  }

  protected onRedo(): void {
    super.onRedo();
    this._dirtyModifiedWalls();
  }

  private _dirtyModifiedWalls(): void {
    if (this._walls.length) {
      const connectedWalls = HSCore.Util.Wall.findConnectedWalls(this._walls);
      this._refreshWalls(connectedWalls);
    }
  }

  private _refreshWalls(walls: Wall[]): void {
    walls?.forEach((wall) => {
      wall.dirtyGeometry();
    });
  }

  private _dirtySlabFaces(): void {
    if (this._updatedFields.has("width")) {
      const parentLayer = this._walls[0].getUniqueParent()!;
      HSCore.Util.Layer.dirtyLayerSlabFaces(parentLayer);

      const nextLayer = HSCore.Util.Layer.getNextLayer(parentLayer);
      HSCore.Util.Layer.dirtyLayerSlabFaces(nextLayer);

      HSCore.Util.Slab.updateLayersSlabAfterWallChanged(parentLayer);
    }
  }

  public getDescription(): string {
    return "修改墙体大小";
  }

  public getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}