import { BomData } from './BomData';
import { BomConfig } from './BomConfig';

interface BusinessType {
  type: string;
  subType: string;
}

interface EntityProvider {
  collectEntity(context: unknown): EntityCollectionResult;
  collectSeekIds?(context: unknown): string[];
}

type EntityCollectionResult = unknown[] | Promise<unknown[]>;

interface CombineProvider {
  businessType: BusinessType;
  provider: EntityProvider;
}

interface CollectedData {
  businessType: BusinessType;
  entities: unknown[];
}

type SeekMateHandler = (seekIds: string[]) => Promise<Map<string, unknown>>;

class BomProviderRegistry {
  private combineProviders: CombineProvider[] = [];
  private getSeekMateHandler?: SeekMateHandler;

  registerProvider(businessType: BusinessType, provider: EntityProvider): void {
    let found = false;
    
    for (const combineProvider of this.combineProviders) {
      if (
        combineProvider.businessType.type === businessType.type &&
        combineProvider.businessType.subType === businessType.subType
      ) {
        combineProvider.provider = provider;
        found = true;
        break;
      }
    }

    if (!found) {
      this.combineProviders.push({
        businessType,
        provider
      });
    }
  }

  registerSeekMateDataHandle(handler: SeekMateHandler): void {
    this.getSeekMateHandler = handler;
  }

  private collectData(context: unknown): Promise<CollectedData[]> {
    const promises: Promise<CollectedData>[] = [];

    for (const combineProvider of this.combineProviders) {
      try {
        const result = combineProvider.provider.collectEntity(context);
        
        if (Array.isArray(result)) {
          promises.push(Promise.resolve({
            businessType: combineProvider.businessType,
            entities: result
          }));
        } else {
          promises.push(
            result
              .then((entities) => ({
                businessType: combineProvider.businessType,
                entities
              }))
              .catch((error) => {
                console.error(error);
                const errorMessage = 'plugin bom4 api collect data error';
                
                HSApp.App.getApp().errorLogger.push(errorMessage, {
                  errorStack: new Error(errorMessage),
                  description: errorMessage,
                  errorInfo: {
                    info: error,
                    path: {
                      file: 'homestyler-tools-web/web/plugin/bom4/sdk/api.ts',
                      functionName: 'collectData()'
                    }
                  }
                });

                if (BomConfig.debugEnv) {
                  throw error;
                }

                return [] as unknown[];
              })
          );
        }
      } catch (error) {
        console.error(error);
        const errorMessage = 'plugin bom4 api collect data error';
        
        HSApp.App.getApp().errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: 'homestyler-tools-web/web/plugin/bom4/sdk/api.ts',
              functionName: 'collectData()'
            }
          }
        });

        if (BomConfig.debugEnv) {
          throw error;
        }
      }
    }

    return Promise.all(promises);
  }

  async generateSeekMateMap(context: unknown): Promise<Map<string, unknown>> {
    const seekIds: string[] = [];

    for (const combineProvider of this.combineProviders) {
      if (combineProvider.provider.collectSeekIds) {
        seekIds.push(...combineProvider.provider.collectSeekIds(context));
      }
    }

    if (!this.getSeekMateHandler) {
      throw new Error('SeekMate handler not registered');
    }

    return await this.getSeekMateHandler(seekIds);
  }

  async generateBomData(context: unknown): Promise<BomData> {
    const bomData = new BomData();

    await this.collectData(context).then((collectedDataList) => {
      for (const collectedData of collectedDataList) {
        bomData.addBusinessEntities(
          collectedData.businessType,
          collectedData.entities
        );
      }
    });

    return bomData;
  }
}

const registry = new BomProviderRegistry();

export async function generateBomData(context: unknown): Promise<BomData> {
  return await registry.generateBomData(context);
}

export async function generateSeekMateMap(context: unknown): Promise<Map<string, unknown>> {
  return await registry.generateSeekMateMap(context);
}

export function registerProvider(businessType: BusinessType, provider: EntityProvider): void {
  registry.registerProvider(businessType, provider);
}

export function registerSeekMateDataHandle(handler: SeekMateHandler): void {
  registry.registerSeekMateDataHandle(handler);
}