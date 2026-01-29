/**
 * Parametric opening FGI (Facade Geometry Interface) decorator.
 * Extends the base parametric model decorator to provide UV transformation
 * functionality for opening elements in parametric models.
 * 
 * @module NParametricOpeningFGIDecorator
 */

import { NCParametricModelFGIDecorator } from './NCParametricModelFGIDecorator';

/**
 * UV transformation matrix or parameters.
 * Represents the texture coordinate transformation for a parametric opening.
 */
export type UvTransform = unknown;

/**
 * Parameters required for UV transformation calculation.
 */
export interface UvTransformParams {
  // Define specific properties based on your domain requirements
  [key: string]: unknown;
}

/**
 * Decorator for parametric opening elements that provides UV transformation logic.
 * Inherits from NCParametricModelFGIDecorator to leverage base parametric model functionality.
 * 
 * @class NParametricOpeningFGIDecorator
 * @extends {NCParametricModelFGIDecorator}
 */
export declare class NParametricOpeningFGIDecorator extends NCParametricModelFGIDecorator {
  /**
   * Creates an instance of NParametricOpeningFGIDecorator.
   * 
   * @param {unknown} params - Construction parameters for the decorator
   */
  constructor(params: unknown);

  /**
   * Retrieves the UV transformation for the parametric opening.
   * Delegates to the internal V1 implementation of UV transformation calculation.
   * 
   * @param {UvTransformParams} param1 - First parameter for UV transformation
   * @param {UvTransformParams} param2 - Second parameter for UV transformation
   * @returns {UvTransform} The calculated UV transformation
   */
  getUvTransform(param1: UvTransformParams, param2: UvTransformParams): UvTransform;

  /**
   * Internal method implementing the V1 version of UV transformation logic.
   * 
   * @protected
   * @param {UvTransformParams} param1 - First parameter for UV transformation
   * @param {UvTransformParams} param2 - Second parameter for UV transformation
   * @returns {UvTransform} The calculated UV transformation
   */
  protected _getUvTransformV1(param1: UvTransformParams, param2: UvTransformParams): UvTransform;
}