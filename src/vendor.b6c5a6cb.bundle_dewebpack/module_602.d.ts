import { Rectangle } from '@pixi/math';
import { Texture, BaseTexture } from '@pixi/core';
import { LoaderResource } from '@pixi/loaders';

/**
 * Represents a single frame in the spritesheet data
 */
export interface ISpritesheetFrameData {
  /** Frame rectangle position and size */
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  /** Whether the frame is rotated */
  rotated?: boolean;
  /** Whether the frame is trimmed */
  trimmed?: boolean;
  /** Sprite source size (original dimensions before trimming) */
  spriteSourceSize?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  /** Original source size */
  sourceSize?: {
    w: number;
    h: number;
  };
  /** Anchor point for the sprite */
  anchor?: { x: number; y: number };
}

/**
 * Spritesheet metadata
 */
export interface ISpritesheetMetadata {
  /** Image file path */
  image: string;
  /** Scale factor */
  scale?: string | number;
  /** Format version */
  format?: string;
  /** Size of the spritesheet */
  size?: {
    w: number;
    h: number;
  };
}

/**
 * Complete spritesheet data structure
 */
export interface ISpritesheetData {
  /** All frames in the spritesheet */
  frames: Record<string, ISpritesheetFrameData>;
  /** Spritesheet metadata */
  meta: ISpritesheetMetadata;
  /** Animation definitions mapping animation names to frame sequences */
  animations?: Record<string, string[]>;
}

/**
 * Represents a spritesheet texture atlas.
 * Parses sprite data and creates individual textures for each frame.
 */
export declare class Spritesheet {
  /** Batch size for processing frames */
  static readonly BATCH_SIZE: number;

  /** Internal texture reference */
  private _texture: Texture | null;
  
  /** Base texture used by all sprite textures */
  baseTexture: BaseTexture;
  
  /** Map of frame names to their textures */
  textures: Record<string, Texture>;
  
  /** Map of animation names to texture sequences */
  animations: Record<string, Texture[]>;
  
  /** Raw spritesheet data */
  data: ISpritesheetData;
  
  /** Resolution of the spritesheet */
  resolution: number;
  
  /** Frame data from spritesheet */
  private _frames: Record<string, ISpritesheetFrameData>;
  
  /** Array of frame keys for iteration */
  private _frameKeys: string[];
  
  /** Current batch index for async processing */
  private _batchIndex: number;
  
  /** Callback function after parsing completes */
  private _callback: ((textures: Record<string, Texture>) => void) | null;

  /**
   * Creates a new Spritesheet instance
   * @param texture - Base texture or texture to use
   * @param data - Spritesheet data containing frames and metadata
   * @param resolutionFilename - Optional URL for resolution detection
   */
  constructor(
    texture: Texture | BaseTexture,
    data: ISpritesheetData,
    resolutionFilename?: string | null
  );

  /**
   * Updates and returns the resolution based on metadata or URL
   * @param resolutionFilename - Optional filename for resolution detection
   * @returns Calculated resolution value
   */
  private _updateResolution(resolutionFilename: string | null): number;

  /**
   * Parses the spritesheet data and creates textures
   * @param callback - Called when parsing is complete with all textures
   */
  parse(callback: (textures: Record<string, Texture>) => void): void;

  /**
   * Processes a batch of frames starting at the given index
   * @param initialFrameIndex - Starting frame index
   */
  private _processFrames(initialFrameIndex: number): void;

  /**
   * Processes animation data and creates texture arrays for each animation
   */
  private _processAnimations(): void;

  /**
   * Called when parsing is complete, invokes the callback
   */
  private _parseComplete(): void;

  /**
   * Processes the next batch of frames asynchronously
   */
  private _nextBatch(): void;

  /**
   * Destroys the spritesheet and optionally its textures
   * @param destroyBase - Whether to destroy the base texture
   */
  destroy(destroyBase?: boolean): void;
}

/**
 * Loader plugin for parsing spritesheet data.
 * Automatically loads associated images and creates Spritesheet instances.
 */
export declare class SpritesheetLoader {
  /**
   * Middleware function for PIXI Loader
   * @param resource - Current loader resource
   * @param next - Callback to continue loading
   */
  static use(
    this: {
      resources: Record<string, LoaderResource>;
      baseUrl: string;
      add: (
        name: string,
        url: string,
        options: unknown,
        callback: (resource: LoaderResource) => void
      ) => void;
    },
    resource: LoaderResource,
    next: (error?: Error) => void
  ): void;

  /**
   * Gets the resource path for the spritesheet image
   * @param resource - Loader resource
   * @param baseUrl - Base URL for resolving relative paths
   * @returns Resolved image path
   */
  static getResourcePath(resource: LoaderResource, baseUrl: string): string;
}

/**
 * Extended LoaderResource interface with spritesheet properties
 */
declare module '@pixi/loaders' {
  interface LoaderResource {
    /** Parsed spritesheet instance */
    spritesheet?: Spritesheet;
    /** Textures extracted from the spritesheet */
    textures?: Record<string, Texture>;
  }
}