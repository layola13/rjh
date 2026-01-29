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
  thickness?: unknown;
  width?: unknown;
  side?: unknown;
  material?: Material;
}

interface EntitySource {
  length?: unknown;
  thickness?: unknown;
  width?: unknown;
  side?: unknown;
  material?: Material;
}

export class B3ParametricPocket extends B3Entity {
  buildBom3Data(entity: EntitySource): Bom3Data {
    const data: Bom3Data = {
      entity: turnEntityToBom3Entity(entity)
    };

    setObjectParameterValues(
      data,
      entity,
      {
        length: 'length',
        thickness: 'thickness',
        width: 'width',
        side: 'side',
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