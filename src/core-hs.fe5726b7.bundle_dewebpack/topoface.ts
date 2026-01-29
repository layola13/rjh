export interface BrepFace {
  clone(): BrepFace;
}

export interface TopoName {
  id: string;
  sourceId: string;
  type: string;
  index: number;
  sourceIndex: number;
  isSameDirection?: boolean;
  clone(): TopoName;
}

export interface CoEdge {
  topoName: TopoName;
}

export interface FacePath {
  outer: unknown;
  holes: unknown[];
}

export interface FaceBaseInfo {
  outerPath: unknown;
  innerPaths: unknown[];
}

export class TopoFace {
  constructor(
    public readonly brepFace: BrepFace,
    public readonly topoName: TopoName
  ) {}

  get id(): string {
    return this.topoName.id;
  }

  get path(): FacePath {
    const { outerPath, innerPaths } = TgUtil.getFaceBaseInfo(this.brepFace);
    return {
      outer: outerPath,
      holes: innerPaths
    };
  }

  clone(): TopoFace {
    return new TopoFace(this.brepFace.clone(), this.topoName.clone());
  }
}

export class RoomTopoFace extends TopoFace {
  public linkWallIds: string[] = [];

  constructor(brepFace: BrepFace, topoName: TopoName, linkWallIds: string[]) {
    super(brepFace, topoName);
    this.linkWallIds = linkWallIds;
  }

  get topoKey(): string {
    const { sourceId, type, index } = this.topoName;
    return `${sourceId}_${type}_${index}`;
  }

  clone(): RoomTopoFace {
    return new RoomTopoFace(
      this.brepFace.clone(),
      this.topoName.clone(),
      this.linkWallIds.slice()
    );
  }
}

export class SlabTopoFace extends TopoFace {
  public linkWallIds: string[] = [];

  constructor(brepFace: BrepFace, topoName: TopoName, linkWallIds: string[]) {
    super(brepFace, topoName);
    this.linkWallIds = linkWallIds;
  }

  get topoKey(): string {
    const { sourceId, type, index } = this.topoName;
    return `${sourceId}_${type}_${index}`;
  }
}

export class WallTopoFace extends TopoFace {
  public isAux: boolean = false;
  public linkWallIds: string[] = [];
  public coEdge?: CoEdge;
  private _groupIndex?: number;

  constructor(brepFace: BrepFace, topoName: TopoName, linkWallIds: string[]) {
    super(brepFace, topoName);
    this.linkWallIds = linkWallIds;
  }

  get groupIndex(): number {
    if (this._groupIndex === undefined) {
      Logger.console.error("groupIndex error!");
    }
    return this._groupIndex !== undefined ? this._groupIndex : 0;
  }

  set groupIndex(value: number) {
    this._groupIndex = value;
  }

  get topoKey(): string {
    const { sourceId, type, sourceIndex } = this.topoName;
    let key = `${sourceId}_${type}_${this.groupIndex}_${sourceIndex}_${this.isAux}`;

    if (this.isAux && this.coEdge) {
      if (this.coEdge.topoName.isSameDirection === undefined) {
        Logger.console.error("coEdge topoName error, must fix!!!!");
      }
      key = `${key}_${this.coEdge.topoName.isSameDirection}`;
    }

    return key;
  }
}

export class HoleTopoFace extends TopoFace {
  static readonly StrangeSourceIndex = 100000;

  constructor(
    brepFace: BrepFace,
    topoName: TopoName,
    public readonly isBottom: boolean,
    public readonly mustExist: boolean
  ) {
    super(brepFace, topoName);
  }

  isStrange(): boolean {
    return this.topoName.sourceIndex >= HoleTopoFace.StrangeSourceIndex;
  }

  get holeId(): string {
    return this.topoName.sourceId.split("_")[0];
  }
}

// Utility class reference (assumed to be imported from another module)
declare const TgUtil: {
  getFaceBaseInfo(brepFace: BrepFace): FaceBaseInfo;
};

declare const Logger: {
  console: {
    error(message: string): void;
  };
};