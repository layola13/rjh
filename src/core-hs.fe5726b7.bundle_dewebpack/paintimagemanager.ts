export interface BrickPatternOption {
  textureURI: string;
}

export interface BrickEntity {
  brickPatternOption?: BrickPatternOption;
}

export abstract class PaintImageProvider {
  protected _id: string;

  constructor() {
    this._id = "basic_provider";
  }

  get id(): string {
    return this._id;
  }

  get supportPolygon(): boolean {
    return true;
  }

  getBrickImageUrl(entity: BrickEntity | null | undefined): Promise<string | null> {
    return entity && entity.brickPatternOption
      ? Promise.resolve(entity.brickPatternOption.textureURI)
      : Promise.resolve(null);
  }

  getBrickImageUrlSync(entity: BrickEntity | null | undefined): string | null {
    return entity && entity.brickPatternOption
      ? entity.brickPatternOption.textureURI
      : null;
  }

  getDataImageFromCache(cacheKey: string): unknown | null {
    return null;
  }
}

export class PaintImageManager {
  private static _instance: PaintImageManager;
  private _provider: PaintImageProvider;

  constructor() {
    this._provider = new PaintImageProvider();
  }

  static instance(): PaintImageManager {
    if (!PaintImageManager._instance) {
      PaintImageManager._instance = new PaintImageManager();
    }
    return PaintImageManager._instance;
  }

  set activeProvider(provider: PaintImageProvider) {
    this._provider = provider;
  }

  get activeProvider(): PaintImageProvider {
    return this._provider;
  }
}