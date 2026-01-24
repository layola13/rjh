/**
 * Alpha filter for PixiJS
 * Adjusts the alpha (transparency) of display objects
 * @module @pixi/filter-alpha
 * @version 5.2.4
 * @license MIT
 */

import { Filter } from '@pixi/core';

/**
 * Simplifies applying an alpha (transparency) mask to display objects.
 * 
 * @class
 * @extends Filter
 * @memberof PIXI.filters
 * 
 * @example
 * const sprite = PIXI.Sprite.from('something.png');
 * sprite.filters = [new PIXI.filters.AlphaFilter(0.5)];
 */
export declare class AlphaFilter extends Filter {
  /**
   * Creates an AlphaFilter
   * 
   * @param alpha - Amount of alpha from 0 to 1, where 0 is transparent
   * @default 1
   */
  constructor(alpha?: number);

  /**
   * Coefficient for alpha multiplication
   * 
   * @member {number}
   * @default 1
   * @min 0
   * @max 1
   */
  get alpha(): number;
  set alpha(value: number);

  /**
   * Shader uniforms
   * @private
   */
  uniforms: {
    uAlpha: number;
  };
}