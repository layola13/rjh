/**
 * WallBoardWaistLine module
 * Defines a wall board waist line molding entity that extends WallMolding
 */

import { WallMolding } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';

/**
 * Wall board waist line molding entity
 * Represents a decorative horizontal band that runs along a wall at waist height
 */
export declare class WallBoardWaistLine extends WallMolding {
  /**
   * Vertical offset distance from the base position
   */
  private __offset: number;

  /**
   * Whether the waist line automatically fits to the wall geometry
   */
  private __autoFit: boolean;

  /**
   * The type identifier for this molding entity
   */
  readonly type: MoldingTypeEnum.WallBoardWaistLine;

  /**
   * Creates a new WallBoardWaistLine instance
   * @param id - Optional unique identifier for the entity
   * @param data - Optional initialization data
   */
  constructor(id?: string, data?: unknown);

  /**
   * Vertical offset from the base position
   * Decorated with @EntityField()
   */
  offset: number;

  /**
   * Whether to automatically fit the waist line to wall changes
   * Decorated with @EntityField()
   */
  autoFit: boolean;

  /**
   * Creates a deep copy of this waist line entity
   * @returns A new WallBoardWaistLine instance with copied properties
   */
  clone(): WallBoardWaistLine;

  /**
   * Gets the set of metadata keys that should be filtered/excluded
   * @returns Set of metadata filter keys including "profileHigh"
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * Handles field change events for reactive properties
   * @param fieldName - Name of the changed field
   * @param newValue - New value of the field
   * @param oldValue - Previous value of the field
   */
  protected onFieldChanged(
    fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): void;

  /**
   * Executes auto-fit logic to adjust the waist line to wall geometry
   * Called when autoFit property changes
   */
  protected doAutoFit(): void;

  /**
   * Marks the position as dirty/requiring recalculation
   * Inherited from parent WallMolding class
   */
  protected dirtyPosition(): void;

  /**
   * Sets entity flags for behavior control
   * Inherited from Entity base class
   * @param flag - Entity flag enum value to enable
   */
  protected setFlagOn(flag: HSCore.Model.EntityFlagEnum): void;
}

/**
 * Module-level exports
 */
export { WallBoardWaistLine };

/**
 * Entity field decorator
 * Marks properties as reactive entity fields with change tracking
 */
declare function EntityField(): PropertyDecorator;

/**
 * Global constants namespace
 */
declare namespace HSConstants {
  namespace ModelClass {
    const NgWallBoardWaistLine: string;
  }
}

/**
 * Core framework namespace
 */
declare namespace HSCore.Model {
  enum EntityFlagEnum {
    unselectable = 'unselectable'
    // ... other flags
  }
}