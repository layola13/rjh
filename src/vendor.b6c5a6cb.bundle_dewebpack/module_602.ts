import { Rectangle } from '@pixi/math';
import { Texture, BaseTexture } from '@pixi/core';
import { getResolutionOfUrl, url } from '@pixi/utils';
import { LoaderResource } from '@pixi/loaders';

interface SpritesheetFrameData {
  frame: { x: number; y: number; w: number; h: number };
  rotated?: boolean;
  trimmed?: boolean;
  spriteSourceSize?: { x: number; y: number; w: number; h: number };
  sourceSize?: { w: number; h: number };
  anchor?: { x: number; y: number };
}

interface SpritesheetData {
  frames: Record<string, SpritesheetFrameData>;
  animations?: Record<string, string[]>;
  meta: {
    scale?: string;
    image: string;
  };
}

export class Spritesheet {
  private static readonly BATCH_SIZE = 1000;

  private _texture: Texture | null;
  public baseTexture: BaseTexture;
  public textures: Record<string, Texture>;
  public animations: Record<string, Texture[]>;
  public data: SpritesheetData;
  public resolution: number;
  private _frames: Record<string, SpritesheetFrameData>;
  private _frameKeys: string[];
  private _batchIndex: number;
  private _callback: ((textures: Record<string, Texture>) => void) | null;

  constructor(
    texture: Texture | BaseTexture,
    data: SpritesheetData,
    resolutionFilename: string | null = null
  ) {
    this._texture = texture instanceof Texture ? texture : null;
    this.baseTexture = texture instanceof BaseTexture ? texture : (this._texture as Texture).baseTexture;
    this.textures = {};
    this.animations = {};
    this.data = data;
    this.resolution = this._updateResolution(
      resolutionFilename ?? (this.baseTexture.resource ? (this.baseTexture.resource as any).url : null)
    );
    this._frames = this.data.frames;
    this._frameKeys = Object.keys(this._frames);
    this._batchIndex = 0;
    this._callback = null;
  }

  private _updateResolution(resolutionFilename: string | null): number {
    const scale = this.data.meta.scale;
    let resolution = getResolutionOfUrl(resolutionFilename, null);

    if (resolution === null) {
      resolution = scale !== undefined ? parseFloat(scale) : 1;
    }

    if (resolution !== 1) {
      this.baseTexture.setResolution(resolution);
    }

    return resolution;
  }

  public parse(callback: (textures: Record<string, Texture>) => void): void {
    this._batchIndex = 0;
    this._callback = callback;

    if (this._frameKeys.length <= Spritesheet.BATCH_SIZE) {
      this._processFrames(0);
      this._processAnimations();
      this._parseComplete();
    } else {
      this._nextBatch();
    }
  }

  private _processFrames(initialFrameIndex: number): void {
    let frameIndex = initialFrameIndex;
    const maxFrames = Spritesheet.BATCH_SIZE;

    while (frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length) {
      const frameId = this._frameKeys[frameIndex];
      const frameData = this._frames[frameId];
      const frameRect = frameData.frame;

      if (frameRect) {
        let frame: Rectangle;
        let trim: Rectangle | null = null;
        const sourceSize = frameData.trimmed !== false && frameData.sourceSize ? frameData.sourceSize : frameData.frame;
        const orig = new Rectangle(
          0,
          0,
          Math.floor(sourceSize.w) / this.resolution,
          Math.floor(sourceSize.h) / this.resolution
        );

        if (frameData.rotated) {
          frame = new Rectangle(
            Math.floor(frameRect.x) / this.resolution,
            Math.floor(frameRect.y) / this.resolution,
            Math.floor(frameRect.h) / this.resolution,
            Math.floor(frameRect.w) / this.resolution
          );
        } else {
          frame = new Rectangle(
            Math.floor(frameRect.x) / this.resolution,
            Math.floor(frameRect.y) / this.resolution,
            Math.floor(frameRect.w) / this.resolution,
            Math.floor(frameRect.h) / this.resolution
          );
        }

        if (frameData.trimmed !== false && frameData.spriteSourceSize) {
          trim = new Rectangle(
            Math.floor(frameData.spriteSourceSize.x) / this.resolution,
            Math.floor(frameData.spriteSourceSize.y) / this.resolution,
            Math.floor(frameRect.w) / this.resolution,
            Math.floor(frameRect.h) / this.resolution
          );
        }

        this.textures[frameId] = new Texture(
          this.baseTexture,
          frame,
          orig,
          trim,
          frameData.rotated ? 2 : 0,
          frameData.anchor
        );

        Texture.addToCache(this.textures[frameId], frameId);
      }

      frameIndex++;
    }
  }

  private _processAnimations(): void {
    const animations = this.data.animations ?? {};

    for (const animationName in animations) {
      this.animations[animationName] = [];

      for (let i = 0; i < animations[animationName].length; i++) {
        const frameName = animations[animationName][i];
        this.animations[animationName].push(this.textures[frameName]);
      }
    }
  }

  private _parseComplete(): void {
    const callback = this._callback;
    this._callback = null;
    this._batchIndex = 0;
    callback?.call(this, this.textures);
  }

  private _nextBatch(): void {
    this._processFrames(this._batchIndex * Spritesheet.BATCH_SIZE);
    this._batchIndex++;

    setTimeout(() => {
      if (this._batchIndex * Spritesheet.BATCH_SIZE < this._frameKeys.length) {
        this._nextBatch();
      } else {
        this._processAnimations();
        this._parseComplete();
      }
    }, 0);
  }

  public destroy(destroyBase: boolean = false): void {
    for (const textureName in this.textures) {
      this.textures[textureName].destroy();
    }

    this._frames = null as any;
    this._frameKeys = null as any;
    this.data = null as any;
    this.textures = null as any;

    if (destroyBase) {
      this._texture?.destroy();
      this.baseTexture.destroy();
    }

    this._texture = null;
    this.baseTexture = null as any;
  }
}

export class SpritesheetLoader {
  public static use(this: any, resource: LoaderResource, next: (error?: Error) => void): void {
    const imageResourceName = resource.name + '_image';

    if (
      resource.data &&
      resource.type === LoaderResource.TYPE.JSON &&
      resource.data.frames &&
      !this.resources[imageResourceName]
    ) {
      const options = {
        crossOrigin: resource.crossOrigin,
        metadata: resource.metadata.imageMetadata,
        parentResource: resource
      };

      const imagePath = SpritesheetLoader.getResourcePath(resource, this.baseUrl);

      this.add(imageResourceName, imagePath, options, (imageResource: LoaderResource) => {
        if (imageResource.error) {
          next(imageResource.error);
        } else {
          const spritesheet = new Spritesheet(imageResource.texture, resource.data, resource.url);
          spritesheet.parse(() => {
            resource.spritesheet = spritesheet;
            resource.textures = spritesheet.textures;
            next();
          });
        }
      });
    } else {
      next();
    }
  }

  public static getResourcePath(resource: LoaderResource, baseUrl: string): string {
    return resource.isDataUrl
      ? resource.data.meta.image
      : url.resolve(resource.url.replace(baseUrl, ''), resource.data.meta.image);
  }
}