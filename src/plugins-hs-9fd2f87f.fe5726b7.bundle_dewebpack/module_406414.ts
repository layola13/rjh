interface Position {
  x: number;
  y: number;
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface Product {
  id: string;
  position: Position;
  rotation: number;
  scale: Scale;
  variation?: string;
}

interface BoundingBox {
  xLen: number;
  yLen: number;
  zLen: number;
}

interface AssemblyData {
  meta: any;
  boundingBox: BoundingBox;
  Products: Product[];
}

interface Entity {
  isFlagOn(flag: any): boolean;
  bound: any;
  z: number;
  ZSize: number;
  x: number;
  y: number;
  rotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  seekId: string;
  variationId: string;
}

/**
 * Assembly data builder for 3D models
 */
export default class AssemblyDataBuilder {
  /**
   * Builds assembly data from a collection of entities
   * @param entities - Array of 3D entities to process
   * @returns JSON string representation of the assembly data
   */
  buildAssemblyData(entities: Entity[]): string {
    const boundCalculator = new HSCore.Util.BrepBound();
    boundCalculator.reset();

    let minZ = Infinity;
    let maxZ = -Infinity;

    entities.forEach((entity) => {
      if (!entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
        boundCalculator.appendBound(entity.bound);

        const entityZ = entity.z;
        if (entityZ < minZ) {
          minZ = entityZ;
        }

        const entityMaxZ = entityZ + entity.ZSize;
        if (maxZ < entityMaxZ) {
          maxZ = entityMaxZ;
        }
      }
    });

    const dimensions: Position = {
      x: boundCalculator.width,
      y: boundCalculator.height,
      z: maxZ - minZ
    };

    const center = boundCalculator.center();
    const centerX = center.x;
    const centerY = center.y;
    const originZ = minZ;

    const convertToMillimeters = (value: number): number => {
      const MM_CONVERSION_FACTOR = 100;
      return MM_CONVERSION_FACTOR * value;
    };

    const assemblyData: AssemblyData = {
      meta: HSCore.Doc.AssemblyMeta,
      boundingBox: {
        xLen: 0,
        yLen: 0,
        zLen: 0
      },
      Products: []
    };

    assemblyData.boundingBox.xLen = convertToMillimeters(dimensions.x);
    assemblyData.boundingBox.yLen = convertToMillimeters(dimensions.y);
    assemblyData.boundingBox.zLen = convertToMillimeters(dimensions.z);

    entities.forEach((entity) => {
      const product: Product = {
        id: entity.seekId,
        position: {
          x: convertToMillimeters(entity.x - centerX),
          y: convertToMillimeters(entity.y - centerY),
          z: convertToMillimeters(entity.z - originZ)
        },
        rotation: entity.rotation,
        scale: {
          XScale: entity.XScale,
          YScale: entity.YScale,
          ZScale: entity.ZScale
        }
      };

      if (entity.variationId !== entity.seekId) {
        product.variation = entity.variationId;
      }

      assemblyData.Products.push(product);
    });

    const DECIMAL_PRECISION = 6;
    return JSON.stringify(assemblyData, (_key: string, value: any) => {
      return value?.toFixed ? Number(value.toFixed(DECIMAL_PRECISION)) : value;
    });
  }
}