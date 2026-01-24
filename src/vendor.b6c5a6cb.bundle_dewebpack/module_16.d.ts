/**
 * DisplayObject cache-as-bitmap type definitions
 * Provides bitmap caching functionality for PIXI DisplayObjects to improve rendering performance
 */

import { Matrix } from '@pixi/math';
import { DisplayObject } from '@pixi/display';
import { RenderTexture, BaseTexture, Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { Renderer } from '@pixi/core';

/**
 * Cache data stored for a DisplayObject when cacheAsBitmap is enabled
 */
interface CacheData {
  /** Unique identifier for the cached texture in the texture cache */
  textureCacheId: string | null;
  
  /** Original render method (WebGL) */
  originalRender: ((renderer: Renderer) => void) | null;
  
  /** Original render method (Canvas) */
  originalRenderCanvas: ((renderer: any) => void) | null;
  
  /** Original bounds calculation method */
  originalCalculateBounds: (() => void) | null;
  
  /** Original local bounds getter */
  originalGetLocalBounds: ((rect?: Rectangle) => Rectangle) | null;
  
  /** Original transform update method */
  originalUpdateTransform: (() => void) | null;
  
  /** Original hit test method */
  originalHitTest: ((point: Point) => boolean) | null;
  
  /** Original destroy method */
  originalDestroy: ((options?: DestroyOptions | boolean) => void) | null;
  
  /** Original contains point method */
  originalContainsPoint?: ((point: Point) => boolean) | null;
  
  /** Original mask reference */
  originalMask: Container | MaskData | null;
  
  /** Original filter area */
  originalFilterArea: Rectangle | null;
  
  /** Sprite used to render the cached texture */
  sprite: Sprite | null;
}

declare module '@pixi/display' {
  interface DisplayObject {
    /** Internal flag indicating if cacheAsBitmap is enabled */
    _cacheAsBitmap: boolean;
    
    /** Internal cache data storage */
    _cacheData: CacheData | null;
    
    /**
     * Enable or disable bitmap caching for this DisplayObject.
     * When enabled, the object is rendered to a texture once and reused, improving performance
     * for complex static objects.
     */
    cacheAsBitmap: boolean;
    
    /**
     * Render the cached bitmap (WebGL)
     * @param renderer - The WebGL renderer
     * @internal
     */
    _renderCached(renderer: Renderer): void;
    
    /**
     * Initialize the cached display object (WebGL)
     * Creates a RenderTexture and renders the DisplayObject to it
     * @param renderer - The WebGL renderer
     * @internal
     */
    _initCachedDisplayObject(renderer: Renderer): void;
    
    /**
     * Render the cached bitmap (Canvas)
     * @param renderer - The Canvas renderer
     * @internal
     */
    _renderCachedCanvas(renderer: any): void;
    
    /**
     * Initialize the cached display object (Canvas)
     * Creates a RenderTexture and renders the DisplayObject to it
     * @param renderer - The Canvas renderer
     * @internal
     */
    _initCachedDisplayObjectCanvas(renderer: any): void;
    
    /**
     * Calculate bounds using the cached sprite
     * @internal
     */
    _calculateCachedBounds(): void;
    
    /**
     * Get local bounds from the cached sprite
     * @returns The local bounds rectangle
     * @internal
     */
    _getCachedLocalBounds(): Rectangle;
    
    /**
     * Destroy the cached display object and free resources
     * @internal
     */
    _destroyCachedDisplayObject(): void;
    
    /**
     * Destroy method used when cacheAsBitmap is enabled
     * Disables caching before destroying
     * @param options - Destruction options
     * @internal
     */
    _cacheAsBitmapDestroy(options?: DestroyOptions | boolean): void;
  }
}

/**
 * Options for destroying a DisplayObject
 */
interface DestroyOptions {
  /** Destroy children if applicable */
  children?: boolean;
  /** Destroy textures */
  texture?: boolean;
  /** Destroy base texture */
  baseTexture?: boolean;
}

/**
 * Basic point interface
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Basic rectangle interface
 */
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  pad(padding: number): void;
  ceil(resolution: number): void;
  clone(): Rectangle;
}

/**
 * Container type reference
 */
interface Container extends DisplayObject {
  // Container-specific properties
}

/**
 * Mask data type reference
 */
interface MaskData {
  // Mask-specific properties
}