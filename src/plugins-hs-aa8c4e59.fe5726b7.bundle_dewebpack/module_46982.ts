import { FaceGroupPredicate } from './316619';
import { B3Context } from './160188';
import { B3Layer } from './250190';
import { B3Pave } from './648125';
import { B3Design } from './528189';
import { B3Slab } from './53251';
import { B3Opening } from './915847';

interface FaceGroup {
  faceIds: string[];
  '2D': unknown;
}

interface Bom3Status {
  code: number;
  message: string;
}

interface DesignInfo {
  innerArea: number;
  designArea: number;
  [key: string]: unknown;
}

interface LayerData {
  innerArea?: number;
  designArea?: number;
  [key: string]: unknown;
}

interface Bom3Response {
  status: Bom3Status;
  data: {
    designInfo: DesignInfo;
    layers: LayerData[];
    slabs: unknown[];
    faceGroups: FaceGroup[];
    slabOpenings: unknown[];
  };
}

interface EntityWithInstance {
  instance: {
    getParameterValue(paramName: string): string;
  };
}

/**
 * Converts BOM data to BOM3 format
 * @param bomData - Input BOM data entity
 * @returns Structured BOM3 response object
 */
export function bomDataToBom3(bomData: unknown): Bom3Response {
  const context = new B3Context(bomData);
  const design = new B3Design(context);
  const designInfo = design.buildBom3Data(context.designEntity);
  
  const layers: LayerData[] = [];
  const layerBuilder = new B3Layer(context);
  
  context.layers.forEach((layer: unknown) => {
    layers.push(layerBuilder.buildBom3Data(layer));
  });
  
  const paveEntities = context.dbApi.findAll(context.paves, new FaceGroupPredicate());
  const paveBuilder = new B3Pave(context);
  const faceGroups: FaceGroup[] = paveEntities.map((entity: EntityWithInstance) => {
    const paveData = paveBuilder.buildBom3Data(entity);
    const faceGroupId = entity.instance.getParameterValue('faceGroupId');
    
    return {
      faceIds: faceGroupId.split('-'),
      '2D': paveData
    };
  });
  
  const slabBuilder = new B3Slab(context);
  const slabs = context.slabs.map((slab: unknown) => {
    return slabBuilder.buildBom3Data(slab);
  });
  
  const openingBuilder = new B3Opening(context);
  const slabOpenings = context.slabHoles.map((hole: unknown) => {
    return openingBuilder.buildBom3Data(hole);
  });
  
  designInfo.innerArea = layers.reduce((sum: number, layer: LayerData) => {
    return sum + (layer.innerArea ?? 0);
  }, 0);
  
  designInfo.designArea = layers.reduce((sum: number, layer: LayerData) => {
    return sum + (layer.designArea ?? 0);
  }, 0);
  
  return {
    status: {
      code: -1,
      message: 'OK'
    },
    data: {
      designInfo,
      layers,
      slabs,
      faceGroups,
      slabOpenings
    }
  };
}

/**
 * Legacy BOM3 conversion function
 * @deprecated Use bomDataToBom3 instead
 * @throws Error - This function is not implemented
 */
export function toBom3(): never {
  throw new Error('toBom3 is deprecated and not implemented');
}