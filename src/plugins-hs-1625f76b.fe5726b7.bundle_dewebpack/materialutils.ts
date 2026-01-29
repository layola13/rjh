interface TileSize {
  initTileSize_x: number;
  initTileSize_y: number;
}

interface BoundingInfo {
  obj_name: string;
  uSize: number;
  vSize: number;
}

interface ObjInfo {
  bounding?: BoundingInfo[];
}

interface Extension {
  objInfo?: ObjInfo;
}

interface Metadata {
  extension?: Extension;
}

interface Material {
  metadata: Metadata;
  initTileSize_x: number;
  initTileSize_y: number;
}

export class MaterialUtils {
  /**
   * Gets the initial tile size for a material, optionally adjusted by object bounding data
   * @param material - The material object
   * @param tileSizeSource - Source object containing initial tile sizes
   * @param objectName - Name of the object to find bounding info for
   * @param useBoundingSize - Whether to use bounding size from metadata
   * @returns Object containing initTileSize_x and initTileSize_y
   */
  static getMaterialInitTileSize(
    material: Material,
    tileSizeSource: TileSize,
    objectName: string,
    useBoundingSize: boolean = false
  ): TileSize {
    const tileSize: TileSize = {
      initTileSize_x: tileSizeSource.initTileSize_x,
      initTileSize_y: tileSizeSource.initTileSize_y
    };

    const metadata = material.metadata;

    if (!useBoundingSize) {
      return tileSize;
    }

    const boundingArray = metadata.extension?.objInfo?.bounding ?? [];
    const boundingInfo = boundingArray.find(
      (item) => item.obj_name === objectName
    ) ?? { uSize: undefined, vSize: undefined };

    const uSize = boundingInfo.uSize;
    const vSize = boundingInfo.vSize;

    if (uSize !== undefined) {
      tileSize.initTileSize_x = uSize;
    }

    if (vSize !== undefined) {
      tileSize.initTileSize_y = vSize;
    }

    return tileSize;
  }
}