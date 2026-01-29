import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity } from './entityUtils';

interface Bom3Data {
  entity: unknown;
}

export class B3ConcealedWorkTube extends B3Entity {
  /**
   * Builds BOM3 data structure from entity
   * @param entity - The entity to convert
   * @returns BOM3 data object containing the converted entity
   */
  buildBom3Data(entity: unknown): Bom3Data {
    const data: Bom3Data = {
      entity: turnEntityToBom3Entity(entity)
    };
    return data;
  }
}