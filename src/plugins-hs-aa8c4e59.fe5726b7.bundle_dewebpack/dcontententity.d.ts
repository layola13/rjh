/**
 * DContentEntity - 3D content entity with customizable dimensions
 * 
 * This module defines a specialized customization entity for handling
 * dimensional content with X, Y, Z size parameters.
 */

import { Parameter, DataType } from './parameter-types';
import { CustomizationEntity } from './customization-entity';
import { CustomizationEntityFactory } from './customization-entity-factory';
import { CustomizationParamKey } from './customization-param-key';
import { HSConstants } from './hs-constants';

/**
 * Interface representing the instance data structure for DContent entities
 */
export interface DContentInstanceData {
  /** Size along the X axis */
  XSize: number;
  /** Size along the Y axis */
  YSize: number;
  /** Size along the Z axis */
  ZSize: number;
  [key: string]: unknown;
}

/**
 * Interface for the enhanced instance data with parameters
 */
export interface EnhancedInstanceData {
  /**
   * Adds a parameter to the instance data
   * @param parameter - The parameter to add
   */
  addParameter(parameter: Parameter): void;
}

/**
 * DContentEntity - A customization entity for dimensional content
 * 
 * This class extends CustomizationEntity to provide specialized handling
 * for 3D content with configurable dimensions (X, Y, Z sizes).
 * 
 * @remarks
 * Automatically registered with the CustomizationEntityFactory under
 * the HSConstants.ModelClass.DContent identifier.
 * 
 * @example
 *