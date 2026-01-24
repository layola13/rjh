/**
 * Global position mixin for PIXI DisplayObject
 * Adds getGlobalPosition method to DisplayObject prototype
 * 
 * @module pixi/mixin-get-global-position
 * @version 5.2.4
 * @license MIT
 */

declare module '@pixi/display' {
  interface DisplayObject {
    /**
     * Calculates the global position of the display object
     * 
     * @param point - The point to write the global value to. If null, a new point will be returned
     * @param skipUpdate - Should we skip the update transform
     * @returns The updated point
     * 
     * @example
     *