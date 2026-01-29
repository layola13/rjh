import { generateSeekMateMap, generateBomData } from './bom-generator';
import { bomDataToBom3 } from './bom-converter';
import { bomDataToBom2, getBom2Data, bomDataToBom2WithStatus } from './bom-processor';
import { BomConfig } from './bom-config';
import { loadEntity, dumpEntity } from './entity-handler';
import { metaDataUtil } from './metadata-util';
import { Utils } from './utils';
import { HouseModelingEngine } from './house-modeling-engine';
import { CustomizationEntityFactory } from './customization-entity-factory';
import { resourceManager } from './resource-manager';

interface IPlugin {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PaveOptions {
  isPatternAdaptiveMaterialSize: boolean;
}

interface BomGenerationOptions {
  pave?: PaveOptions;
}

interface FilterOptions {
  isGetObstaclePath?: boolean;
}

interface Bom2ProcessOptions {
  filterOptions?: FilterOptions;
  lang?: string;
}

interface Bom2DataOptions {
  lang?: string;
}

interface EntityData {
  Class: string;
  [key: string]: unknown;
}

interface BomData {
  getRootEntities(): Entity[];
}

interface Entity {
  [key: string]: unknown;
}

class BomServicePlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: 'bom serivce plugin',
      description: 'calculate geometry properties from entity',
      dependencies: []
    });
  }

  onActive(event: unknown, context: unknown): void {
    super.onActive(event, context);
  }

  async process(): Promise<unknown> {
    await resourceManager.init();
    
    const mateMap = await generateSeekMateMap();
    metaDataUtil.setMateMap(mateMap);
    
    const options: BomGenerationOptions = {
      pave: {
        isPatternAdaptiveMaterialSize: true
      }
    };
    
    const bomData = await generateBomData(options);
    return bomDataToBom3(bomData);
  }

  async processOneEntity(entityData: EntityData): Promise<Entity> {
    const entity = CustomizationEntityFactory.createEntity(
      entityData.Class,
      entityData
    );
    
    return new Promise<Entity>((resolve) => {
      resolve(entity);
    });
  }

  async processBom2(options?: FilterOptions): Promise<unknown> {
    Utils.isGetObstaclePath = options?.isGetObstaclePath ?? true;
    
    const locale = HSApp.App.getApp().appParams.locale;
    await resourceManager.init(locale);
    
    const mateMap = await generateSeekMateMap();
    metaDataUtil.setMateMap(mateMap);
    
    const bomData = await generateBomData();
    
    const result = await bomDataToBom2(bomData, {
      filterOptions: options,
      lang: locale
    });
    
    return result;
  }

  async getBom2Data(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    options?: Bom2DataOptions
  ): Promise<unknown> {
    await resourceManager.init(options?.lang);
    
    const mateMap = await generateSeekMateMap();
    metaDataUtil.setMateMap(mateMap);
    
    const bomData = await generateBomData();
    
    return await getBom2Data(bomData, param1, param3, options);
  }

  async processBom2WithStatus(): Promise<unknown> {
    await resourceManager.init();
    
    const mateMap = await generateSeekMateMap();
    metaDataUtil.setMateMap(mateMap);
    
    const bomData = await generateBomData();
    const result = await bomDataToBom2WithStatus(bomData);
    
    return result;
  }

  async processBom4(
    param: unknown,
    options?: FilterOptions
  ): Promise<BomData> {
    Utils.isGetObstaclePath = options?.isGetObstaclePath ?? true;
    
    await resourceManager.init();
    
    const mateMap = await generateSeekMateMap();
    metaDataUtil.setMateMap(mateMap);
    
    const bomData = await generateBomData();
    return bomData;
  }

  async processBom4Json(): Promise<unknown[]> {
    await resourceManager.init();
    
    const mateMap = await generateSeekMateMap();
    metaDataUtil.setMateMap(mateMap);
    
    const entityMaps = await generateBomData().then((bomData) => {
      return bomData.getRootEntities().map((entity) => {
        return this.dumpEntity(entity);
      });
    });
    
    return entityMaps;
  }

  bomDataToBom3(bomData: BomData): unknown {
    return bomDataToBom3(bomData);
  }

  setDubugEnv(debugEnv: unknown): void {
    BomConfig.debugEnv = debugEnv;
  }

  loadEntity(entityData: unknown): unknown {
    return loadEntity(entityData);
  }

  dumpEntity(entity: Entity): unknown {
    return dumpEntity(entity);
  }

  processHouseModeling(): unknown {
    return new HouseModelingEngine().process();
  }

  collectPaintsProductIdsByFace(faceData: unknown): unknown {
    return Utils.collectPaintsProductIdsByFace(faceData);
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.BomService,
  BomServicePlugin
);