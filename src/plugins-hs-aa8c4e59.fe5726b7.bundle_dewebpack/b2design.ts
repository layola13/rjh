import { B2Processor } from './B2Processor';
import { setObjectParameterValues } from './utils';

interface DesignData {
  designId?: string;
  designName?: string;
  designArea?: number;
  innerArea?: number;
  bedroom?: number;
  livingroom?: number;
  bathroom?: number;
  versionId?: string;
  designStyle?: string;
}

interface DesignEntity {
  designId?: string;
  designName?: string;
  designArea?: number;
  innerArea?: number;
  bedroom?: number;
  livingroom?: number;
  bathroom?: number;
  versionId?: string;
  designStyle?: string;
}

interface B2DesignContext {
  designEntity: DesignEntity;
}

export class B2Design extends B2Processor {
  protected context!: B2DesignContext;

  /**
   * Builds BOM2 data from the design entity context
   * @returns Design data object with extracted parameters
   */
  buildBom2Data(): DesignData {
    const data: DesignData = {};
    
    setObjectParameterValues(data, this.context.designEntity, {
      designId: "designId",
      designName: "designName",
      designArea: "designArea",
      innerArea: "innerArea",
      bedroom: "bedroom",
      livingroom: "livingroom",
      bathroom: "bathroom",
      versionId: "versionId",
      designStyle: "designStyle"
    });
    
    return data;
  }
}