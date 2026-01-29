import { B3Entity } from './B3Entity';
import { B3Pave } from './B3Pave';
import { turnEntityToBom3Entity } from './utils';

interface AreaParameter {
  validArea: number;
  [key: string]: unknown;
}

interface MaterialInfo {
  area: number;
  regionMaterialSeekID: string;
  size: unknown;
}

interface MaterialCategory {
  seekId: string;
  size: unknown;
  [key: string]: unknown;
}

interface TwoDimensionalParameter {
  paveId?: string;
  material?: MaterialCategory;
  [key: string]: unknown;
}

interface TwoDimensionalData {
  material?: {
    category: MaterialCategory;
    materialInfo: MaterialInfo;
  };
  [key: string]: unknown;
}

interface Opening {
  [key: string]: unknown;
}

interface ThreeDimensionalData {
  openings: Opening[];
}

interface Bom3Data {
  entity: unknown;
  area: AreaParameter;
  "2D": TwoDimensionalData;
  "3D": ThreeDimensionalData;
  faceGroupId?: string;
}

interface EntityInstance {
  getParameterValue(key: string): unknown;
}

interface Entity {
  instance: EntityInstance;
  getInstanceId(): string;
  getParameterValue(key: string): unknown;
}

interface DbApi {
  getEntity(id: string): Entity | null;
}

interface Context {
  dbApi: DbApi;
}

export class B3Face extends B3Entity {
  protected context: Context;

  constructor(context: Context) {
    super(context);
  }

  buildBom3Data(entity: Entity): Bom3Data {
    const bom3Entity = turnEntityToBom3Entity(entity);
    const area = entity.instance.getParameterValue("area") as AreaParameter;
    let twoDimensionalData: TwoDimensionalData = {};
    const twoDimensionalParam = entity.instance.getParameterValue("2D") as TwoDimensionalParameter;

    if (twoDimensionalParam.paveId) {
      const paveEntity = this.context.dbApi.getEntity(twoDimensionalParam.paveId);
      
      if (paveEntity) {
        const faceGroupId = paveEntity.instance.getParameterValue("faceGroupId") as string | undefined;
        
        if (!faceGroupId) {
          twoDimensionalData = new B3Pave(this.context).buildBom3Data(paveEntity);
        }
      } else {
        console.error("pave 丢失： ", twoDimensionalParam, twoDimensionalParam.paveId);
      }
    } else {
      const material = twoDimensionalParam.material;
      
      if (material) {
        const materialInfo: MaterialInfo = {
          area: area.validArea,
          regionMaterialSeekID: `${entity.getInstanceId()}, ${material.seekId}`,
          size: material.size
        };
        
        twoDimensionalData.material = {
          category: material,
          materialInfo: materialInfo
        };
      }
    }

    const faceGroupId = twoDimensionalParam.paveId 
      ? this.context.dbApi.getEntity(twoDimensionalParam.paveId)?.instance.getParameterValue("faceGroupId") as string | undefined
      : undefined;

    return {
      entity: bom3Entity,
      area: area,
      "2D": twoDimensionalData,
      "3D": {
        openings: entity.getParameterValue("openings") as Opening[]
      },
      faceGroupId: faceGroupId
    };
  }
}