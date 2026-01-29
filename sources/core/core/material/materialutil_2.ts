interface JsonDumpData {
  id: string;
  [key: string]: unknown;
}

interface MaterialData {
  id: string;
  [key: string]: unknown;
}

interface MetaInfo {
  version: string;
  [key: string]: unknown;
}

interface JsonDump {
  meta: MetaInfo;
  entryId: string;
  data?: JsonDumpData[];
  materials?: MaterialData[];
  [key: string]: unknown;
}

interface CloneContext {
  version: string;
  data: Record<string, JsonDumpData>;
  entities: Record<string, unknown>;
  materials: Map<string, unknown>;
  materialsData: Map<string, MaterialData>;
  productsMap: Map<string, unknown>;
  idGenerator: unknown;
  materialIdGenerator: unknown;
}

import { Entity } from './Entity';
import { EntityUtil } from './EntityUtil';
import { MetaUtil } from './MetaUtil';

export class MaterialUtil {
  static async cloneFromJson(jsonDump: JsonDump): Promise<unknown> {
    const productsMap = await MetaUtil.getDesignProductsMap(jsonDump).catch((error: Error) => {
      log.error(
        "MaterialUtil cloneFromJson throws exception 'getDesignProductsMap'",
        'HSCore.Load.Error'
      );
      return undefined;
    });

    if (!productsMap) {
      return undefined;
    }

    const meta = jsonDump.meta;
    const dataMap: Record<string, JsonDumpData> = {};
    const entityIdMap = new Map<string, string>();
    const materialIdMap = new Map<string, string>();
    const materialsDataMap = new Map<string, MaterialData>();

    const cloneContext: CloneContext = {
      version: meta.version,
      data: dataMap,
      entities: {},
      materials: new Map(),
      materialsData: materialsDataMap,
      productsMap,
      idGenerator: EntityUtil.createIDGeneratorForClone(
        entityIdMap,
        HSCore.Util.IDGeneratorType.Entity
      ),
      materialIdGenerator: EntityUtil.createIDGeneratorForClone(
        materialIdMap,
        HSCore.Util.IDGeneratorType.Material
      ),
    };

    jsonDump.data?.forEach((dataItem: JsonDumpData) => {
      dataMap[dataItem.id] = dataItem;
    });

    jsonDump.materials?.forEach((materialItem: MaterialData) => {
      materialsDataMap.set(materialItem.id, materialItem);
    });

    return Entity.loadFromDumpById(jsonDump.entryId, cloneContext);
  }
}