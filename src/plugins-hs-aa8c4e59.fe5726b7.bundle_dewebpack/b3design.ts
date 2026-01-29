export interface B3DesignData {
  designId?: string;
  designName?: string;
  designArea?: number;
  innerArea?: number;
  grossFloorArea?: number;
  bedroom?: number;
  livingroom?: number;
  bathroom?: number;
  versionId?: string;
}

interface ParameterMapping {
  [key: string]: string;
}

function setObjectParameterValues(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  mapping: ParameterMapping
): void {
  for (const [targetKey, sourceKey] of Object.entries(mapping)) {
    if (source[sourceKey] !== undefined) {
      target[targetKey] = source[sourceKey];
    }
  }
}

export class B3Design extends B3Entity {
  buildBom3Data(source: Record<string, unknown>): B3DesignData {
    const data: B3DesignData = {};
    
    setObjectParameterValues(data, source, {
      designId: "designId",
      designName: "designName",
      designArea: "designArea",
      innerArea: "innerArea",
      grossFloorArea: "grossFloorArea",
      bedroom: "bedroom",
      livingroom: "livingroom",
      bathroom: "bathroom",
      versionId: "versionId"
    });
    
    return data;
  }
}

class B3Entity {}