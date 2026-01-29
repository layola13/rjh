interface TileSize {
  initTileSize_x?: number;
  initTileSize_y?: number;
  tileSize_x?: number;
  tileSize_y?: number;
  seekId?: string;
  metadata?: {
    tileSize_x?: number;
    tileSize_y?: number;
  };
}

interface Point {
  x: number;
  y: number;
}

interface PavingOptionInput {
  rotation: number;
  point: Point;
  sliderOffsetX: number;
  sliderOffsetY?: number;
}

interface PavingOptionOutput {
  point: Point;
  rotation: number;
  sliderOffsetX: number;
  sliderOffsetY: number;
}

interface BuildingProductMeta {
  tileSize_x?: number;
  tileSize_y?: number;
}

interface MetaManager {
  getBuildingProductMeta(seekId: string): BuildingProductMeta | undefined;
}

interface HSCatalog {
  MetaManager: {
    instance(): MetaManager;
  };
}

interface MathService {
  getRangeRotation(angle: number, range: number): number;
}

interface ServiceManager {
  getMathService(): MathService;
}

declare const HSCatalog: HSCatalog;

export class MaterialConvertor {
  static getTileSizeScale(tileSize: TileSize): [number, number] {
    const calculateScale = (currentSize?: number, initialSize?: number): number => {
      if (!currentSize) return 1;
      if (!initialSize) return currentSize;
      return currentSize / initialSize;
    };

    let initTileSizeX = tileSize.initTileSize_x;
    let initTileSizeY = tileSize.initTileSize_y;

    if (!initTileSizeX || !initTileSizeY) {
      const metadata =
        tileSize.metadata ||
        HSCatalog.MetaManager.instance().getBuildingProductMeta(tileSize.seekId ?? '');

      if (metadata) {
        initTileSizeX = initTileSizeX || metadata.tileSize_x;
        initTileSizeY = initTileSizeY || metadata.tileSize_y;
      }
    }

    return [
      calculateScale(tileSize.tileSize_x, initTileSizeX),
      calculateScale(tileSize.tileSize_y, initTileSizeY)
    ];
  }

  static convertPavingOption(option: PavingOptionInput): PavingOptionOutput {
    const mathService: MathService = (ServiceManager as any).getMathService();
    const rotation = mathService.getRangeRotation(-option.rotation, 180);

    return {
      point: {
        x: option.point.x,
        y: -option.point.y
      },
      rotation,
      sliderOffsetX: option.sliderOffsetX,
      sliderOffsetY: -(option.sliderOffsetY ?? 0)
    };
  }
}