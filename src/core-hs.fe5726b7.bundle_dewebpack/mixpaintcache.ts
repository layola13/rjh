interface MixData {
  id: string;
  faceGroupId?: string;
  dataVersion: number;
}

interface CacheEntry<T> {
  mixData: MixData;
  data: T;
  idMap: Map<string, boolean>;
  time: Date;
  dataVersion: number;
}

export class MixPaintCache {
  private _mixPaintCache: Map<string, CacheEntry<unknown>>;
  private _lastClearTime: Date;

  private static readonly CACHE_EXPIRY_MS = 5000;
  private static readonly CLEAR_INTERVAL_MS = 300000;

  constructor() {
    this._mixPaintCache = new Map();
    this._lastClearTime = new Date();
  }

  getCacheData<T>(mixData: MixData, id: string): T | null {
    if (!mixData.faceGroupId || !id) {
      return null;
    }

    this._clearCache();

    const cacheEntry = this._mixPaintCache.get(mixData.id);
    if (!cacheEntry) {
      return null;
    }

    const time = cacheEntry.time;
    if (!time) {
      return null;
    }

    if (new Date().getTime() - time.getTime() > MixPaintCache.CACHE_EXPIRY_MS) {
      this.removeCacheData(mixData);
      return null;
    }

    if (cacheEntry.dataVersion !== mixData.dataVersion) {
      this.removeCacheData(mixData);
      return null;
    }

    const idMap = cacheEntry.idMap;
    let allIdsProcessed = true;

    for (const key of idMap.keys()) {
      if (!idMap.get(key)) {
        allIdsProcessed = false;
        break;
      }
    }

    if (allIdsProcessed) {
      this.removeCacheData(mixData);
      return null;
    }

    idMap.set(id, true);
    return cacheEntry.data as T;
  }

  setCacheData<T>(mixData: MixData, data: T, currentId: string): void {
    if (!mixData.faceGroupId || !currentId) {
      return;
    }

    this._clearCache();

    const faceGroupIds = mixData.faceGroupId.split(";");
    if (!faceGroupIds || !faceGroupIds.length) {
      return;
    }

    const idMap = new Map<string, boolean>();
    faceGroupIds.forEach((id: string) => {
      idMap.set(id, id === currentId);
    });

    const cacheEntry: CacheEntry<T> = {
      mixData,
      data,
      idMap,
      time: new Date(),
      dataVersion: mixData.dataVersion
    };

    this._mixPaintCache.set(mixData.id, cacheEntry);
  }

  private _clearCache(): void {
    const now = new Date();

    if (now.getTime() - this._lastClearTime.getTime() < MixPaintCache.CLEAR_INTERVAL_MS) {
      return;
    }

    for (const key of this._mixPaintCache.keys()) {
      const cacheEntry = this._mixPaintCache.get(key);
      if (!cacheEntry) {
        continue;
      }

      if (now.getTime() - cacheEntry.time.getTime() >= MixPaintCache.CACHE_EXPIRY_MS) {
        this.removeCacheData(cacheEntry.mixData);
      }
    }

    this._lastClearTime = now;
  }

  removeCacheData(mixData: MixData): void {
    if (!mixData) {
      return;
    }

    const cacheEntry = this._mixPaintCache.get(mixData.id);
    if (cacheEntry?.mixData) {
      this._mixPaintCache.delete(mixData.id);
    }
  }
}