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

interface SourceEntity {
  [key: string]: unknown;
}

export class B3Pocket extends B3Entity {
  protected buildBom3Data(entity: SourceEntity): Bom3Data {
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