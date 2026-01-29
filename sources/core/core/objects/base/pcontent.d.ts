import { PModel } from './PModel';
import { TransUtil } from './TransUtil';
import type { Entity } from './types';

/**
 * PContent class represents a content model that extends PModel.
 * It handles position updates and matrix transformations for entities.
 */
export class PContent extends PModel {
  /**
   * Local transformation matrix for the content entity.
   * @private
   */
  private _matrixLocal: unknown;

  /**
   * Creates a new PContent instance.
   * 
   * @param entity - The entity associated with this content
   * @param param2 - Second constructor parameter (type to be determined from PModel)
   * @param param3 - Third constructor parameter (type to be determined from PModel)
   */
  constructor(entity: Entity, param2: unknown, param3: unknown) {
    super(entity, param2, param3);
  }

  /**
   * Updates the position of the content entity.
   * Computes the local transformation matrix and converts its units.
   * 
   * @param position - The new position data for the entity
   */
  onUpdatePosition(position: unknown): void {
    this._matrixLocal = TransUtil.computeLocalTransform(this.entity, position);
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
  }
}