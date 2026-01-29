export enum WallRegionDiffType {
  none = 0,
  part = 1,
  all = 2
}

interface WallRegion {
  id: string;
}

interface DiffInfo {
  wallId: string;
  diffType: WallRegionDiffType;
}

export class DiffShareWallRegionInfo {
  private readonly _wallRegion: WallRegion;
  private _diffInfo: DiffInfo[] = [];

  constructor(wallRegion: WallRegion) {
    this._wallRegion = wallRegion;
  }

  getDiffRegionId(): string {
    return this._wallRegion.id;
  }

  addDiffInfo(wallId: string, diffType: WallRegionDiffType): void {
    this._diffInfo.push({
      wallId,
      diffType
    });
  }

  sortDiffInfo(): void {
    this._diffInfo.sort((a, b) => {
      if (a.diffType === b.diffType) {
        return parseInt(a.wallId) - parseInt(b.wallId);
      }
      return a.diffType - b.diffType;
    });
  }

  getFirstWallInfo(): DiffInfo | undefined {
    if (this._diffInfo.length > 0) {
      return this._diffInfo[0];
    }
    return undefined;
  }
}