/**
 * @pixi/prepare - v5.2.4
 * Compiled Sun, 03 May 2020 22:38:52 UTC
 *
 * @pixi/prepare is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

import { settings, Renderer, Ticker, UPDATE_PRIORITY } from '@pixi/core';
import { Texture, BaseTexture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { Container } from '@pixi/display';
import { Text, TextStyle, TextMetrics } from '@pixi/text';

/**
 * Configure default uploads per frame
 */
settings.UPLOADS_PER_FRAME = 4;

/**
 * Interface for objects that can limit upload operations
 */
export interface IUploadLimiter {
  /**
   * Called at the start of each frame
   */
  beginFrame(): void;
  
  /**
   * Check if another upload is allowed this frame
   * @returns true if upload is allowed
   */
  allowedToUpload(): boolean;
}

/**
 * Hook function to find items that need preparation
 * @param item - The item to check
 * @param queue - The queue to add items to
 * @returns true if the item was handled
 */
export type FindHook = (item: unknown, queue: unknown[]) => boolean;

/**
 * Hook function to upload prepared items
 * @param helper - Helper object (typically renderer)
 * @param item - The item to upload
 * @returns true if the item was uploaded
 */
export type UploadHook<T = unknown> = (helper: T, item: unknown) => boolean;

/**
 * Callback function invoked when upload is complete
 */
export type CompleteCallback = () => void;

/**
 * Limits the number of items that can be uploaded per frame.
 * Uses a simple counter to track remaining uploads.
 */
export class CountLimiter implements IUploadLimiter {
  /**
   * Maximum items allowed per frame
   */
  public maxItemsPerFrame: number;
  
  /**
   * Items remaining to upload this frame
   */
  public itemsLeft: number;

  /**
   * @param maxItemsPerFrame - Maximum number of items to upload per frame
   */
  constructor(maxItemsPerFrame: number) {
    this.maxItemsPerFrame = maxItemsPerFrame;
    this.itemsLeft = 0;
  }

  /**
   * Resets the counter at the start of each frame
   */
  public beginFrame(): void {
    this.itemsLeft = this.maxItemsPerFrame;
  }

  /**
   * Checks if another item can be uploaded this frame
   * @returns true if items remain
   */
  public allowedToUpload(): boolean {
    return this.itemsLeft-- > 0;
  }
}

/**
 * Base preparation class for pre-uploading assets to the GPU.
 * Manages queues and hooks for finding and uploading items.
 */
export class BasePrepare<UploadHookHelper = unknown> {
  /**
   * Limiter controlling upload rate
   */
  public limiter: IUploadLimiter;
  
  /**
   * The renderer used for uploads
   */
  public renderer: Renderer;
  
  /**
   * Helper object passed to upload hooks
   */
  public uploadHookHelper: UploadHookHelper | null;
  
  /**
   * Queue of items waiting to be uploaded
   */
  public queue: unknown[];
  
  /**
   * Hooks for finding items to prepare
   */
  public addHooks: FindHook[];
  
  /**
   * Hooks for uploading items
   */
  public uploadHooks: UploadHook<UploadHookHelper>[];
  
  /**
   * Callbacks to invoke when upload completes
   */
  public completes: CompleteCallback[];
  
  /**
   * Whether the ticker is currently active
   */
  public ticking: boolean;
  
  /**
   * Delayed tick function
   */
  protected delayedTick: () => void;

  /**
   * @param renderer - The renderer to use for uploads
   */
  constructor(renderer: Renderer) {
    this.limiter = new CountLimiter(settings.UPLOADS_PER_FRAME);
    this.renderer = renderer;
    this.uploadHookHelper = null;
    this.queue = [];
    this.addHooks = [];
    this.uploadHooks = [];
    this.completes = [];
    this.ticking = false;
    
    this.delayedTick = () => {
      if (this.queue) {
        this.prepareItems();
      }
    };

    // Register default hooks
    this.registerFindHook(findText);
    this.registerFindHook(findTextStyle);
    this.registerFindHook(findMultipleBaseTextures);
    this.registerFindHook(findBaseTexture);
    this.registerFindHook(findTexture);
    this.registerUploadHook(uploadText);
    this.registerUploadHook(uploadTextStyle);
  }

  /**
   * Upload all queued items
   * @param item - Optional item or callback
   * @param callback - Completion callback
   */
  public upload(item?: unknown | CompleteCallback, callback?: CompleteCallback): void {
    if (typeof item === 'function') {
      callback = item;
      item = undefined;
    }

    if (item) {
      this.add(item);
    }

    if (this.queue.length) {
      if (callback) {
        this.completes.push(callback);
      }
      
      if (!this.ticking) {
        this.ticking = true;
        Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
      }
    } else if (callback) {
      callback();
    }
  }

  /**
   * Tick handler
   */
  public tick(): void {
    setTimeout(this.delayedTick, 0);
  }

  /**
   * Process items in the queue
   */
  public prepareItems(): void {
    this.limiter.beginFrame();

    while (this.queue.length && this.limiter.allowedToUpload()) {
      const item = this.queue[0];
      let uploaded = false;

      if (item && !(item as any)._destroyed) {
        for (let i = 0; i < this.uploadHooks.length; i++) {
          if (this.uploadHooks[i](this.uploadHookHelper!, item)) {
            this.queue.shift();
            uploaded = true;
            break;
          }
        }
      }

      if (!uploaded) {
        this.queue.shift();
      }
    }

    if (this.queue.length) {
      Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
    } else {
      this.ticking = false;
      const completes = this.completes.slice(0);
      this.completes.length = 0;

      for (let i = 0; i < completes.length; i++) {
        completes[i]();
      }
    }
  }

  /**
   * Register a hook for finding items
   * @param hook - The hook function
   * @returns this instance for chaining
   */
  public registerFindHook(hook: FindHook): this {
    if (hook) {
      this.addHooks.push(hook);
    }
    return this;
  }

  /**
   * Register a hook for uploading items
   * @param hook - The hook function
   * @returns this instance for chaining
   */
  public registerUploadHook(hook: UploadHook<UploadHookHelper>): this {
    if (hook) {
      this.uploadHooks.push(hook);
    }
    return this;
  }

  /**
   * Add an item to the preparation queue
   * @param item - The item to add
   * @returns this instance for chaining
   */
  public add(item: unknown): this {
    // Try each add hook
    for (let i = 0; i < this.addHooks.length; i++) {
      if (this.addHooks[i](item, this.queue)) {
        break;
      }
    }

    // Recursively add container children
    if (item instanceof Container) {
      for (let i = item.children.length - 1; i >= 0; i--) {
        this.add(item.children[i]);
      }
    }

    return this;
  }

  /**
   * Destroy and cleanup
   */
  public destroy(): void {
    if (this.ticking) {
      Ticker.system.remove(this.tick, this);
    }
    
    this.ticking = false;
    this.addHooks = null!;
    this.uploadHooks = null!;
    this.renderer = null!;
    this.completes = null!;
    this.queue = null!;
    this.limiter = null!;
    this.uploadHookHelper = null;
  }
}

/**
 * Find hook for objects with multiple base textures (_textures array)
 */
function findMultipleBaseTextures(item: unknown, queue: unknown[]): boolean {
  let found = false;
  const target = item as any;

  if (target?._textures?.length) {
    for (let i = 0; i < target._textures.length; i++) {
      if (target._textures[i] instanceof Texture) {
        const baseTexture = target._textures[i].baseTexture;
        if (queue.indexOf(baseTexture) === -1) {
          queue.push(baseTexture);
          found = true;
        }
      }
    }
  }

  return found;
}

/**
 * Find hook for objects with a baseTexture property
 */
function findBaseTexture(item: unknown, queue: unknown[]): boolean {
  const target = item as any;

  if (target.baseTexture instanceof BaseTexture) {
    const baseTexture = target.baseTexture;
    if (queue.indexOf(baseTexture) === -1) {
      queue.push(baseTexture);
    }
    return true;
  }

  return false;
}

/**
 * Find hook for objects with a _texture property
 */
function findTexture(item: unknown, queue: unknown[]): boolean {
  const target = item as any;

  if (target._texture instanceof Texture) {
    const baseTexture = target._texture.baseTexture;
    if (queue.indexOf(baseTexture) === -1) {
      queue.push(baseTexture);
    }
    return true;
  }

  return false;
}

/**
 * Upload hook for Text objects - updates text rendering
 */
function uploadText(renderer: unknown, item: unknown): boolean {
  if (item instanceof Text) {
    item.updateText(true);
    return true;
  }
  return false;
}

/**
 * Upload hook for TextStyle objects - measures font
 */
function uploadTextStyle(renderer: unknown, item: unknown): boolean {
  if (item instanceof TextStyle) {
    const fontString = item.toFontString();
    TextMetrics.measureFont(fontString);
    return true;
  }
  return false;
}

/**
 * Find hook for Text objects - adds style, text, and base texture to queue
 */
function findText(item: unknown, queue: unknown[]): boolean {
  if (item instanceof Text) {
    if (queue.indexOf(item.style) === -1) {
      queue.push(item.style);
    }
    if (queue.indexOf(item) === -1) {
      queue.push(item);
    }
    
    const baseTexture = item._texture.baseTexture;
    if (queue.indexOf(baseTexture) === -1) {
      queue.push(baseTexture);
    }
    
    return true;
  }
  return false;
}

/**
 * Find hook for TextStyle objects
 */
function findTextStyle(item: unknown, queue: unknown[]): boolean {
  if (item instanceof TextStyle) {
    if (queue.indexOf(item) === -1) {
      queue.push(item);
    }
    return true;
  }
  return false;
}

/**
 * WebGL preparation plugin for uploading textures and graphics to the GPU.
 * Extends BasePrepare with WebGL-specific upload hooks.
 */
export class Prepare extends BasePrepare<Renderer> {
  /**
   * @param renderer - The WebGL renderer
   */
  constructor(renderer: Renderer) {
    super(renderer);
    this.uploadHookHelper = this.renderer;

    // Register WebGL-specific hooks
    this.registerFindHook(findGraphics);
    this.registerUploadHook(uploadBaseTexture);
    this.registerUploadHook(uploadGraphics);
  }
}

/**
 * Upload hook for BaseTexture objects - binds texture to GPU
 */
function uploadBaseTexture(renderer: Renderer, item: unknown): boolean {
  if (item instanceof BaseTexture) {
    const glTextures = (item as any)._glTextures;
    if (!glTextures[renderer.CONTEXT_UID]) {
      renderer.texture.bind(item);
    }
    return true;
  }
  return false;
}

/**
 * Upload hook for Graphics objects - prepares geometry and textures
 */
function uploadGraphics(renderer: Renderer, item: unknown): boolean {
  if (!(item instanceof Graphics)) {
    return false;
  }

  const geometry = item.geometry;
  
  item.finishPoly();
  geometry.updateBatches();

  const batches = geometry.batches;
  for (let i = 0; i < batches.length; i++) {
    const texture = batches[i].style.texture;
    if (texture) {
      uploadBaseTexture(renderer, texture.baseTexture);
    }
  }

  if (!geometry.batchable) {
    renderer.geometry.bind(geometry, item._resolveDirectShader(renderer));
  }

  return true;
}

/**
 * Find hook for Graphics objects
 */
function findGraphics(item: unknown, queue: unknown[]): boolean {
  if (item instanceof Graphics) {
    queue.push(item);
    return true;
  }
  return false;
}

/**
 * Limits uploads based on elapsed time per frame.
 * Allows uploads until a time threshold is exceeded.
 */
export class TimeLimiter implements IUploadLimiter {
  /**
   * Maximum milliseconds allowed per frame
   */
  public maxMilliseconds: number;
  
  /**
   * Timestamp when the current frame started
   */
  public frameStart: number;

  /**
   * @param maxMilliseconds - Maximum time in milliseconds per frame
   */
  constructor(maxMilliseconds: number) {
    this.maxMilliseconds = maxMilliseconds;
    this.frameStart = 0;
  }

  /**
   * Records the start time of the current frame
   */
  public beginFrame(): void {
    this.frameStart = Date.now();
  }

  /**
   * Checks if there is time remaining in the current frame
   * @returns true if time budget remains
   */
  public allowedToUpload(): boolean {
    return Date.now() - this.frameStart < this.maxMilliseconds;
  }
}