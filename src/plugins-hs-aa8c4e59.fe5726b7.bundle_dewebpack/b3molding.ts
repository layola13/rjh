import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity, setObjectParameterValues } from './utils';

interface MaterialCategory {
  attributeId: string;
}

interface Material {
  category?: MaterialCategory;
}

interface Bom3Data {
  entity: unknown;
  material?: Material;
  length?: unknown;
}

interface Entity {
  [key: string]: unknown;
}

export class B3Molding extends B3Entity {
  buildBom3Data(entity: Entity): Bom3Data {
    const data: Bom3Data = {} as Bom3Data;
    
    data.entity = turnEntityToBom3Entity(entity);
    
    setObjectParameterValues(
      data,
      entity,
      {
        material: 'material',
        length: 'length'
      },
      true
    );
    
    if (data.material?.category) {
      data.material.category.attributeId = 'attr-Quantity-Calculation-Material';
    }
    
    return data;
  }
}