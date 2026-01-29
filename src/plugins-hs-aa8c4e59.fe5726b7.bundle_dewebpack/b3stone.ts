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
  length?: unknown;
  width?: unknown;
  side?: unknown;
  area?: unknown;
  material?: Material;
}

interface EntityData {
  length?: unknown;
  width?: unknown;
  side?: unknown;
  area?: unknown;
  material?: Material;
}

export class B3Stone extends B3Entity {
  buildBom3Data(entity: EntityData): Bom3Data {
    const data: Bom3Data = {
      entity: turnEntityToBom3Entity(entity)
    };

    setObjectParameterValues(
      data,
      entity,
      {
        length: 'length',
        width: 'width',
        side: 'side',
        area: 'area',
        material: 'material'
      },
      true
    );

    if (data.material?.category) {
      data.material.category.attributeId = 'attr-Quantity-Calculation-Material';
    }

    return data;
  }
}