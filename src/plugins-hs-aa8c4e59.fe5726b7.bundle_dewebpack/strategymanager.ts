import { query } from './utils';

enum ENUM_SINGLE_SELECT_CATEGORY {
  Face = 'Face',
  Ceiling = 'Ceiling'
}

interface Room {
  [key: string]: unknown;
}

interface TemplateData {
  room: Room[];
}

interface StrategyResult {
  flatEntityIds: string[];
  reason?: string;
  category?: ENUM_SINGLE_SELECT_CATEGORY;
}

interface Strategy {
  getFlatEntityIdsAndCategory(params: {
    instanceId: string;
    strategies: Strategy[];
    room: Room;
  }): StrategyResult;
}

interface VersionData {
  templateDataUrl: string;
  templateData: TemplateData;
  [key: string]: unknown;
}

interface TempCacheEntry {
  flatEntityIds: string[];
  reason?: string;
  category?: ENUM_SINGLE_SELECT_CATEGORY;
}

class SoftContentStrategy implements Strategy {
  getFlatEntityIdsAndCategory(params: {
    instanceId: string;
    strategies: Strategy[];
    room: Room;
  }): StrategyResult {
    return { flatEntityIds: [] };
  }
}

class CustomizeContentStrategy implements Strategy {
  getFlatEntityIdsAndCategory(params: {
    instanceId: string;
    strategies: Strategy[];
    room: Room;
  }): StrategyResult {
    return { flatEntityIds: [] };
  }
}

class DiyStrategy implements Strategy {
  getFlatEntityIdsAndCategory(params: {
    instanceId: string;
    strategies: Strategy[];
    room: Room;
  }): StrategyResult {
    return { flatEntityIds: [] };
  }
}

class MixPaintStrategy implements Strategy {
  getFlatEntityIdsAndCategory(params: {
    instanceId: string;
    strategies: Strategy[];
    room: Room;
  }): StrategyResult {
    return { flatEntityIds: [] };
  }
}

class CeilingStrategy implements Strategy {
  getFlatEntityIdsAndCategory(params: {
    instanceId: string;
    strategies: Strategy[];
    room: Room;
  }): StrategyResult {
    return { flatEntityIds: [] };
  }
}

export class StrategyManager {
  private _arr: Strategy[];
  private _dataByVersion: Record<string, VersionData>;
  private _tempCache: Record<string, TempCacheEntry>;

  constructor() {
    this._arr = [];
    this._dataByVersion = {};
    this._tempCache = {};
    this._init();
  }

  private _init(): void {
    const softContentStrategy = new SoftContentStrategy();
    const customizeContentStrategy = new CustomizeContentStrategy();
    const diyStrategy = new DiyStrategy();
    const mixPaintStrategy = new MixPaintStrategy();
    const ceilingStrategy = new CeilingStrategy();

    this._arr.push(
      softContentStrategy,
      customizeContentStrategy,
      diyStrategy,
      mixPaintStrategy,
      ceilingStrategy
    );
  }

  private _getFlatEntityIdsAndCategoryByStrategies(params: {
    templateData: TemplateData;
    strategies: Strategy[];
    instanceId: string;
  }): StrategyResult {
    const { templateData, strategies, instanceId } = params;
    const result: StrategyResult = {
      flatEntityIds: [],
      reason: undefined,
      category: undefined
    };

    strategies.some((strategy) => {
      const rooms = templateData.room;
      for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const strategyResult = strategy.getFlatEntityIdsAndCategory({
          instanceId,
          strategies,
          room
        });

        Object.assign(result, strategyResult);

        if (result.flatEntityIds.length > 0 || result.reason) {
          return true;
        }
      }
      return false;
    });

    return result;
  }

  private _getIdsFromCache(params: {
    tempCache: Record<string, TempCacheEntry>;
    instanceId: string;
  }): string[] {
    const { tempCache, instanceId } = params;

    if (tempCache[instanceId]) {
      return tempCache[instanceId].flatEntityIds;
    }

    const cacheKeys = Object.keys(tempCache);
    for (let i = 0; i < cacheKeys.length; i++) {
      const flatEntityIds = tempCache[cacheKeys[i]].flatEntityIds;
      if (flatEntityIds.includes(instanceId)) {
        return flatEntityIds;
      }
    }

    return [];
  }

  async initData(templateDataUrl: string, version: string): Promise<void> {
    if (this._dataByVersion[version]) {
      return;
    }

    const url = templateDataUrl.replace(
      /v(\d+)\/templateData.json$/,
      `v${version}/templateData.json`
    );
    const templateData = await query<TemplateData>(url);

    this._dataByVersion[version] = {
      templateDataUrl: url,
      templateData
    };
  }

  deleteData(): void {
    this._dataByVersion = {};
    this._tempCache = {};
  }

  getData(version: string): VersionData | undefined {
    return this._dataByVersion[version];
  }

  addData(params: {
    type: string;
    importData: unknown;
    version: string;
  }): void {
    const { type, importData, version } = params;

    if (this._dataByVersion[version]) {
      Object.assign(this._dataByVersion[version], {
        [type]: importData
      });
    }
  }

  getFlatEntityIds(
    instanceId: string,
    version: string
  ): { ids: string[]; reason?: string } {
    const ids: string[] = [];
    const versionData = this._dataByVersion[version];

    if (!versionData) {
      return { ids };
    }

    const cachedIds = this._getIdsFromCache({
      tempCache: this._tempCache,
      instanceId
    });
    ids.push(...cachedIds);

    if (ids.length > 0) {
      return { ids };
    }

    const result = this._getFlatEntityIdsAndCategoryByStrategies({
      templateData: versionData.templateData,
      strategies: this._arr,
      instanceId
    });

    ids.push(...result.flatEntityIds);
    this._tempCache[instanceId] = result;

    return {
      ids: result.flatEntityIds,
      reason: result.reason
    };
  }

  isOnlyCanSelectOne(entityIds: string[]): boolean {
    return Object.keys(this._tempCache).some((cacheKey) => {
      const cacheEntry = this._tempCache[cacheKey];
      const { flatEntityIds, category } = cacheEntry;

      const hasMatchingId = entityIds.some((id) => flatEntityIds.includes(id));
      if (!hasMatchingId) {
        return false;
      }

      return (
        category === ENUM_SINGLE_SELECT_CATEGORY.Face ||
        category === ENUM_SINGLE_SELECT_CATEGORY.Ceiling
      );
    });
  }
}