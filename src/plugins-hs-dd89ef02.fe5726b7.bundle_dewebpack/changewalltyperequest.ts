interface WallData {
  wallType?: number;
  isLoadBearing?: boolean;
  heightEditable?: boolean;
}

interface WallBackupData {
  flag?: number;
  wallType?: number;
  isLoadBearing?: boolean;
  height3d?: number;
}

interface Wall {
  wallType: number;
  isLoadBearing: boolean;
  height3d: number;
  _flag: number;
  getUniqueParent(): Layer;
  setFlagOn(flag: number): void;
  setFlagOff(flag: number): void;
  dirtyGeometry(): void;
}

interface Layer {
  height: number;
  forEachCeilingSlab(callback: (slab: CeilingSlab) => void): void;
}

interface CeilingSlab {
  getFaces(faceType: number): Record<string, SlabFace>;
}

interface SlabFace {
  dirtyGeometry(): void;
}

interface LogParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
    subItem: {
      id: string;
      name: string;
    };
  };
}

/**
 * Request to change wall type properties including wall type, load bearing status, and height editability
 */
export class ChangeWallTypeRequest extends HSApp.Request.LayerStructureEditRequest {
  private readonly _wall: Wall;
  private readonly _data: WallData;
  private readonly _beforeData: WallBackupData;
  private readonly _afterData: WallBackupData;

  constructor(wall: Wall, data: WallData) {
    super(wall.getUniqueParent());
    this._wall = wall;
    this._data = data;
    this._beforeData = {};
    this._afterData = {};
  }

  /**
   * Get the layer height from the wall's parent layer
   */
  private _getLayerHeight(): number {
    const layer = this._wall.getUniqueParent();
    return layer ? layer.height : HSConstants.Constants.LAYER_HEIGHT;
  }

  doRequest(): void {
    const wall = this._wall;
    const data = this._data;

    if (data.wallType !== undefined) {
      wall.wallType = data.wallType;
    }

    if (data.isLoadBearing !== undefined) {
      wall.isLoadBearing = data.isLoadBearing;
    }

    if (data.heightEditable !== undefined) {
      const layerHeight = this._getLayerHeight();
      
      if (data.heightEditable) {
        wall.setFlagOn(HSCore.Model.WallFlagEnum.heightEditable);
        wall.isLoadBearing = false;
        
        const heightDifference = Math.abs(
          wall.height3d - HSConstants.Constants.DEFAULT_PARTIAL_WALL_3D_HEIGHT
        );
        const tolerance = 1e-6;
        
        if (heightDifference > tolerance) {
          wall.height3d = HSConstants.Constants.DEFAULT_PARTIAL_WALL_3D_HEIGHT;
        }
      } else {
        wall.setFlagOff(HSCore.Model.WallFlagEnum.heightEditable);
        wall.height3d = layerHeight;
      }
    }

    this.updateEntities();
    super.doRequest([]);
  }

  onCommit(): void {
    this.saveWallToData(this._wall, this._beforeData);
    super.onCommit([]);
    this.saveWallToData(this._wall, this._afterData);
  }

  onUndo(): void {
    super.onUndo([]);
    this.restoreWallFromData(this._wall, this._beforeData);
    this.updateEntities();
  }

  onRedo(): void {
    super.onRedo([]);
    this.restoreWallFromData(this._wall, this._afterData);
    this.updateEntities();
  }

  /**
   * Update wall geometry and associated entities
   */
  updateEntities(): void {
    const wall = this._wall;
    wall.dirtyGeometry();
    HSCore.Util.Wall.dirtyConnectedWalls(wall);

    const associatedWalls = HSCore.Util.Wall.getWallsAssociatedByWall(wall);
    associatedWalls.push(wall);
    HSCore.Util.Wall.updateWallsFaces(associatedWalls);

    wall.getUniqueParent().forEachCeilingSlab((slab: CeilingSlab) => {
      const bottomFaces = slab.getFaces(HSCore.Model.SlabFaceType.bottom);
      Object.values(bottomFaces).forEach((face: SlabFace) => {
        face.dirtyGeometry();
      });
    });
  }

  /**
   * Restore wall properties from backup data
   */
  restoreWallFromData(wall: Wall, data: WallBackupData): void {
    if (data.flag !== undefined) {
      wall._flag = data.flag;
    }
    if (data.wallType !== undefined) {
      wall.wallType = data.wallType;
    }
    if (data.isLoadBearing !== undefined) {
      wall.isLoadBearing = data.isLoadBearing;
    }
    if (data.height3d !== undefined) {
      wall.height3d = data.height3d;
    }
  }

  /**
   * Save wall properties to backup data
   */
  saveWallToData(wall: Wall, data: WallBackupData): void {
    data.flag = wall._flag;
    data.wallType = wall.wallType;
    data.isLoadBearing = wall.isLoadBearing;
    data.height3d = wall.height3d;
  }

  /**
   * Get logging parameters for analytics
   */
  getCurrentParams(): LogParams {
    const idParts: string[] = [];
    const nameParts: string[] = [];

    if (this._data.wallType !== undefined) {
      idParts.push("wallType");
      nameParts.push("墙体类型");
    } else if (this._data.isLoadBearing !== undefined) {
      idParts.push("isLoadBearing");
      nameParts.push("墙体种类");
    } else if (this._data.heightEditable !== undefined) {
      idParts.push("heightEditable");
      nameParts.push("全高墙/矮墙");
    }

    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: "墙体操作",
      clicksRatio: {
        id: "changeWallType",
        name: "修改墙体类型",
        subItem: {
          id: idParts.join("_"),
          name: nameParts.join("_")
        }
      }
    };
  }

  getDescription(): string {
    return "修改墙体类型";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}