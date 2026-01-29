import { settings } from '@pixi/settings';
import { Texture, BaseTexture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { Ticker, UPDATE_PRIORITY } from '@pixi/ticker';
import { Container } from '@pixi/display';
import { Text, TextStyle, TextMetrics } from '@pixi/text';

settings.UPLOADS_PER_FRAME = 4;

interface IUploadLimiter {
  beginFrame(): void;
  allowedToUpload(): boolean;
}

interface IUploadHookHelper {
  CONTEXT_UID: number;
  texture: {
    bind(baseTexture: BaseTexture): void;
  };
  geometry: {
    bind(geometry: unknown, shader: unknown): void;
  };
}

type FindHook = (item: unknown, queue: unknown[]) => boolean;
type UploadHook = (helper: IUploadHookHelper | null, item: unknown) => boolean;

export class CountLimiter implements IUploadLimiter {
  private maxItemsPerFrame: number;
  private itemsLeft: number = 0;

  constructor(maxItemsPerFrame: number) {
    this.maxItemsPerFrame = maxItemsPerFrame;
  }

  beginFrame(): void {
    this.itemsLeft = this.maxItemsPerFrame;
  }

  allowedToUpload(): boolean {
    return this.itemsLeft-- > 0;
  }
}

export class BasePrepare {
  protected limiter: IUploadLimiter;
  protected renderer: unknown;
  protected uploadHookHelper: IUploadHookHelper | null;
  protected queue: unknown[];
  protected addHooks: FindHook[];
  protected uploadHooks: UploadHook[];
  protected completes: (() => void)[];
  protected ticking: boolean;
  private delayedTick: () => void;

  constructor(renderer: unknown) {
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

    this.registerFindHook(findText);
    this.registerFindHook(findTextStyle);
    this.registerFindHook(findMultipleBaseTextures);
    this.registerFindHook(findBaseTexture);
    this.registerFindHook(findTextureFromObject);
    this.registerUploadHook(uploadText);
    this.registerUploadHook(uploadTextStyle);
  }

  upload(target?: unknown | (() => void), done?: () => void): void {
    if (typeof target === 'function') {
      done = target;
      target = undefined;
    }

    if (target) {
      this.add(target);
    }

    if (this.queue.length) {
      if (done) {
        this.completes.push(done);
      }
      if (!this.ticking) {
        this.ticking = true;
        Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
      }
    } else if (done) {
      done();
    }
  }

  protected tick(): void {
    setTimeout(this.delayedTick, 0);
  }

  protected prepareItems(): void {
    this.limiter.beginFrame();

    while (this.queue.length && this.limiter.allowedToUpload()) {
      const item = this.queue[0];
      let uploaded = false;

      if (item && !(item as any)._destroyed) {
        for (let i = 0, len = this.uploadHooks.length; i < len; i++) {
          if (this.uploadHooks[i](this.uploadHookHelper, item)) {
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
      const completeCopy = this.completes.slice(0);
      this.completes.length = 0;
      for (let i = 0, len = completeCopy.length; i < len; i++) {
        completeCopy[i]();
      }
    }
  }

  registerFindHook(hook: FindHook): this {
    if (hook) {
      this.addHooks.push(hook);
    }
    return this;
  }

  registerUploadHook(hook: UploadHook): this {
    if (hook) {
      this.uploadHooks.push(hook);
    }
    return this;
  }

  add(item: unknown): this {
    for (let i = 0, len = this.addHooks.length; i < len; i++) {
      if (this.addHooks[i](item, this.queue)) {
        break;
      }
    }

    if (item instanceof Container) {
      for (let i = item.children.length - 1; i >= 0; i--) {
        this.add(item.children[i]);
      }
    }

    return this;
  }

  destroy(): void {
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
    this.uploadHookHelper = null!;
  }
}

function findMultipleBaseTextures(item: unknown, queue: unknown[]): boolean {
  let found = false;

  if (item && (item as any)._textures && (item as any)._textures.length) {
    for (let i = 0; i < (item as any)._textures.length; i++) {
      if ((item as any)._textures[i] instanceof Texture) {
        const baseTexture = (item as any)._textures[i].baseTexture;
        if (queue.indexOf(baseTexture) === -1) {
          queue.push(baseTexture);
          found = true;
        }
      }
    }
  }

  return found;
}

function findBaseTexture(item: unknown, queue: unknown[]): boolean {
  if ((item as any).baseTexture instanceof BaseTexture) {
    const baseTexture = (item as any).baseTexture;
    if (queue.indexOf(baseTexture) === -1) {
      queue.push(baseTexture);
    }
    return true;
  }
  return false;
}

function findTextureFromObject(item: unknown, queue: unknown[]): boolean {
  if ((item as any)._texture && (item as any)._texture instanceof Texture) {
    const baseTexture = (item as any)._texture.baseTexture;
    if (queue.indexOf(baseTexture) === -1) {
      queue.push(baseTexture);
    }
    return true;
  }
  return false;
}

function uploadText(helper: IUploadHookHelper | null, item: unknown): boolean {
  if (item instanceof Text) {
    item.updateText(true);
    return true;
  }
  return false;
}

function uploadTextStyle(helper: IUploadHookHelper | null, item: unknown): boolean {
  if (item instanceof TextStyle) {
    const fontString = item.toFontString();
    TextMetrics.measureFont(fontString);
    return true;
  }
  return false;
}

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

function findTextStyle(item: unknown, queue: unknown[]): boolean {
  if (item instanceof TextStyle) {
    if (queue.indexOf(item) === -1) {
      queue.push(item);
    }
    return true;
  }
  return false;
}

export class Prepare extends BasePrepare {
  protected renderer: IUploadHookHelper;

  constructor(renderer: IUploadHookHelper) {
    super(renderer);
    this.renderer = renderer;
    this.uploadHookHelper = this.renderer;
    this.registerFindHook(findGraphics);
    this.registerUploadHook(uploadBaseTexture);
    this.registerUploadHook(uploadGraphics);
  }
}

function uploadBaseTexture(renderer: IUploadHookHelper | null, item: unknown): boolean {
  if (item instanceof BaseTexture && renderer) {
    if (!(item as any)._glTextures[renderer.CONTEXT_UID]) {
      renderer.texture.bind(item);
    }
    return true;
  }
  return false;
}

function uploadGraphics(renderer: IUploadHookHelper | null, item: unknown): boolean {
  if (!(item instanceof Graphics) || !renderer) {
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
    renderer.geometry.bind(geometry, (item as any)._resolveDirectShader(renderer));
  }

  return true;
}

function findGraphics(item: unknown, queue: unknown[]): boolean {
  if (item instanceof Graphics) {
    queue.push(item);
    return true;
  }
  return false;
}

export class TimeLimiter implements IUploadLimiter {
  private maxMilliseconds: number;
  private frameStart: number = 0;

  constructor(maxMilliseconds: number) {
    this.maxMilliseconds = maxMilliseconds;
  }

  beginFrame(): void {
    this.frameStart = Date.now();
  }

  allowedToUpload(): boolean {
    return Date.now() - this.frameStart < this.maxMilliseconds;
  }
}