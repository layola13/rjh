interface CurtainSize {
  x: number;
  y: number;
  z: number;
}

interface CurtainItem {
  id: string;
  size: CurtainSize;
}

interface CurtainWithDiff {
  item: CurtainItem;
  diff: number;
}

export class CurtainData {
  private static readonly _defaultCurtains: ReadonlyArray<CurtainItem> = [
    {
      id: "4039e963-46d1-40d1-9b98-0e40944bc3c9",
      size: {
        x: 1732,
        y: 197,
        z: 2688
      }
    },
    {
      id: "a8f0a592-3f5c-4ac0-945b-93c0e7e845eb",
      size: {
        x: 2276,
        y: 197,
        z: 2688
      }
    },
    {
      id: "0ab49c6b-b68a-47d8-a0c5-1e889a3ef036",
      size: {
        x: 2648,
        y: 197,
        z: 2688
      }
    },
    {
      id: "815db39f-51e2-465f-ba7d-ceac79e6cf8f",
      size: {
        x: 3590,
        y: 200,
        z: 2688
      }
    },
    {
      id: "afc157c4-2001-4770-923a-f5af9be6e515",
      size: {
        x: 4550,
        y: 200,
        z: 2688
      }
    }
  ];

  /**
   * Finds the default curtain ID with the closest matching X size
   * @param targetXSize - The target X dimension to match against
   * @returns The ID of the curtain with the closest X size
   */
  static getDefaultSeekIdByXSize(targetXSize: number): string {
    const curtainsWithDiff: CurtainWithDiff[] = this._defaultCurtains.map((curtain) => ({
      item: curtain,
      diff: Math.abs(curtain.size.x - targetXSize)
    }));

    const sortedCurtains = curtainsWithDiff.sort((a, b) => a.diff - b.diff);

    return sortedCurtains[0].item.id;
  }

  /**
   * Returns all default curtain configurations
   * @returns Array of default curtain items
   */
  static getDefaultCurtains(): ReadonlyArray<CurtainItem> {
    return this._defaultCurtains;
  }
}