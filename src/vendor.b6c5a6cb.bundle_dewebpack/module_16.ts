import { RenderTexture, BaseTexture, Texture } from './texture';
import { Sprite } from './sprite';
import { DisplayObject } from './display-object';
import { Matrix } from './math';
import { uid } from './utils';
import { settings } from './settings';

interface CacheData {
  textureCacheId: string | null;
  originalRender: ((renderer: any) => void) | null;
  originalRenderCanvas: ((renderer: any) => void) | null;
  originalCalculateBounds: (() => void) | null;
  originalGetLocalBounds: (() => any) | null;
  originalUpdateTransform: (() => void) | null;
  originalHitTest: ((point: any) => boolean) | null;
  originalDestroy: ((options?: any) => void) | null;
  originalMask: any;
  originalFilterArea: any;
  originalContainsPoint?: ((point: any) => boolean) | null;
  sprite: Sprite | null;
}

const tempMatrix = new Matrix();

DisplayObject.prototype._cacheAsBitmap = false;
DisplayObject.prototype._cacheData = false;

class CacheDataImpl implements CacheData {
  textureCacheId: string | null = null;
  originalRender: ((renderer: any) => void) | null = null;
  originalRenderCanvas: ((renderer: any) => void) | null = null;
  originalCalculateBounds: (() => void) | null = null;
  originalGetLocalBounds: (() => any) | null = null;
  originalUpdateTransform: (() => void) | null = null;
  originalHitTest: ((point: any) => boolean) | null = null;
  originalDestroy: ((options?: any) => void) | null = null;
  originalMask: any = null;
  originalFilterArea: any = null;
  originalContainsPoint?: ((point: any) => boolean) | null = null;
  sprite: Sprite | null = null;
}

Object.defineProperties(DisplayObject.prototype, {
  cacheAsBitmap: {
    get: function (this: DisplayObject): boolean {
      return this._cacheAsBitmap;
    },
    set: function (this: DisplayObject, value: boolean): void {
      if (this._cacheAsBitmap !== value) {
        this._cacheAsBitmap = value;
        
        if (value) {
          if (!this._cacheData) {
            this._cacheData = new CacheDataImpl();
          }
          
          const cacheData = this._cacheData as CacheData;
          cacheData.originalRender = this.render;
          cacheData.originalRenderCanvas = this.renderCanvas;
          cacheData.originalUpdateTransform = this.updateTransform;
          cacheData.originalCalculateBounds = this.calculateBounds;
          cacheData.originalGetLocalBounds = this.getLocalBounds;
          cacheData.originalDestroy = this.destroy;
          cacheData.originalContainsPoint = this.containsPoint;
          cacheData.originalMask = this._mask;
          cacheData.originalFilterArea = this.filterArea;
          
          this.render = this._renderCached;
          this.renderCanvas = this._renderCachedCanvas;
          this.destroy = this._cacheAsBitmapDestroy;
        } else {
          const cacheData = this._cacheData as CacheData;
          
          if (cacheData.sprite) {
            this._destroyCachedDisplayObject();
          }
          
          this.render = cacheData.originalRender!;
          this.renderCanvas = cacheData.originalRenderCanvas!;
          this.calculateBounds = cacheData.originalCalculateBounds!;
          this.getLocalBounds = cacheData.originalGetLocalBounds!;
          this.destroy = cacheData.originalDestroy!;
          this.updateTransform = cacheData.originalUpdateTransform!;
          this.containsPoint = cacheData.originalContainsPoint!;
          this._mask = cacheData.originalMask;
          this.filterArea = cacheData.originalFilterArea;
        }
      }
    }
  }
});

DisplayObject.prototype._renderCached = function (this: DisplayObject, renderer: any): void {
  if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
    return;
  }
  
  this._initCachedDisplayObject(renderer);
  
  const cacheData = this._cacheData as CacheData;
  cacheData.sprite!.transform._worldID = this.transform._worldID;
  cacheData.sprite!.worldAlpha = this.worldAlpha;
  cacheData.sprite!._render(renderer);
};

DisplayObject.prototype._initCachedDisplayObject = function (this: DisplayObject, renderer: any): void {
  const cacheData = this._cacheData as CacheData;
  
  if (!this._cacheData || !cacheData.sprite) {
    const originalAlpha = this.alpha;
    this.alpha = 1;
    renderer.batch.flush();
    
    const bounds = this.getLocalBounds().clone();
    
    if (this.filters) {
      const padding = this.filters[0].padding;
      bounds.pad(padding);
    }
    
    bounds.ceil(settings.RESOLUTION);
    
    const currentRenderTexture = renderer.renderTexture.current;
    const sourceFrame = renderer.renderTexture.sourceFrame.clone();
    const projectionTransform = renderer.projection.transform;
    const renderTexture = RenderTexture.create(bounds.width, bounds.height);
    const cacheId = `cacheAsBitmap_${uid()}`;
    
    cacheData.textureCacheId = cacheId;
    BaseTexture.addToCache(renderTexture.baseTexture, cacheId);
    Texture.addToCache(renderTexture, cacheId);
    
    const matrix = tempMatrix;
    matrix.tx = -bounds.x;
    matrix.ty = -bounds.y;
    
    this.transform.worldTransform.identity();
    this.render = cacheData.originalRender!;
    renderer.render(this, renderTexture, true, matrix, true);
    renderer.projection.transform = projectionTransform;
    renderer.renderTexture.bind(currentRenderTexture, sourceFrame);
    
    this.render = this._renderCached;
    this.updateTransform = this.displayObjectUpdateTransform;
    this.calculateBounds = this._calculateCachedBounds;
    this.getLocalBounds = this._getCachedLocalBounds;
    this._mask = null;
    this.filterArea = null;
    
    const sprite = new Sprite(renderTexture);
    sprite.transform.worldTransform = this.transform.worldTransform;
    sprite.anchor.x = -bounds.x / bounds.width;
    sprite.anchor.y = -bounds.y / bounds.height;
    sprite.alpha = originalAlpha;
    sprite._bounds = this._bounds;
    
    cacheData.sprite = sprite;
    this.transform._parentID = -1;
    
    if (this.parent) {
      this.updateTransform();
    } else {
      this.parent = renderer._tempDisplayObjectParent;
      this.updateTransform();
      this.parent = null;
    }
    
    this.containsPoint = sprite.containsPoint.bind(sprite);
  }
};

DisplayObject.prototype._renderCachedCanvas = function (this: DisplayObject, renderer: any): void {
  if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
    return;
  }
  
  this._initCachedDisplayObjectCanvas(renderer);
  
  const cacheData = this._cacheData as CacheData;
  cacheData.sprite!.worldAlpha = this.worldAlpha;
  cacheData.sprite!._renderCanvas(renderer);
};

DisplayObject.prototype._initCachedDisplayObjectCanvas = function (this: DisplayObject, renderer: any): void {
  const cacheData = this._cacheData as CacheData;
  
  if (!this._cacheData || !cacheData.sprite) {
    const bounds = this.getLocalBounds();
    const originalAlpha = this.alpha;
    this.alpha = 1;
    
    const context = renderer.context;
    const projectionTransform = renderer._projTransform;
    
    bounds.ceil(settings.RESOLUTION);
    
    const renderTexture = RenderTexture.create(bounds.width, bounds.height);
    const cacheId = `cacheAsBitmap_${uid()}`;
    
    cacheData.textureCacheId = cacheId;
    BaseTexture.addToCache(renderTexture.baseTexture, cacheId);
    Texture.addToCache(renderTexture, cacheId);
    
    const matrix = tempMatrix;
    this.transform.localTransform.copyTo(matrix);
    matrix.invert();
    matrix.tx -= bounds.x;
    matrix.ty -= bounds.y;
    
    this.renderCanvas = cacheData.originalRenderCanvas!;
    renderer.render(this, renderTexture, true, matrix, false);
    renderer.context = context;
    renderer._projTransform = projectionTransform;
    
    this.renderCanvas = this._renderCachedCanvas;
    this.updateTransform = this.displayObjectUpdateTransform;
    this.calculateBounds = this._calculateCachedBounds;
    this.getLocalBounds = this._getCachedLocalBounds;
    this._mask = null;
    this.filterArea = null;
    
    const sprite = new Sprite(renderTexture);
    sprite.transform.worldTransform = this.transform.worldTransform;
    sprite.anchor.x = -bounds.x / bounds.width;
    sprite.anchor.y = -bounds.y / bounds.height;
    sprite.alpha = originalAlpha;
    sprite._bounds = this._bounds;
    
    cacheData.sprite = sprite;
    this.transform._parentID = -1;
    
    if (this.parent) {
      this.updateTransform();
    } else {
      this.parent = renderer._tempDisplayObjectParent;
      this.updateTransform();
      this.parent = null;
    }
    
    this.containsPoint = sprite.containsPoint.bind(sprite);
  }
};

DisplayObject.prototype._calculateCachedBounds = function (this: DisplayObject): void {
  this._bounds.clear();
  
  const cacheData = this._cacheData as CacheData;
  cacheData.sprite!.transform._worldID = this.transform._worldID;
  cacheData.sprite!._calculateBounds();
  this._lastBoundsID = this._boundsID;
};

DisplayObject.prototype._getCachedLocalBounds = function (this: DisplayObject): any {
  const cacheData = this._cacheData as CacheData;
  return cacheData.sprite!.getLocalBounds();
};

DisplayObject.prototype._destroyCachedDisplayObject = function (this: DisplayObject): void {
  const cacheData = this._cacheData as CacheData;
  cacheData.sprite!._texture.destroy(true);
  cacheData.sprite = null;
  
  BaseTexture.removeFromCache(cacheData.textureCacheId!);
  Texture.removeFromCache(cacheData.textureCacheId!);
  cacheData.textureCacheId = null;
};

DisplayObject.prototype._cacheAsBitmapDestroy = function (this: DisplayObject, options?: any): void {
  this.cacheAsBitmap = false;
  this.destroy(options);
};