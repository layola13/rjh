interface CacheEntity {
  id: string;
  tag?: string;
}

interface CacheStorage<T extends CacheEntity> {
  [id: string]: T;
}

export class Cache<T extends CacheEntity = CacheEntity> {
  private readonly logger: any;
  private readonly _name?: string;
  private _cache: CacheStorage<T>;

  constructor(name?: string) {
    this._name = name;
    this._cache = {};
    this.logger = log.logger(`${this.cacheName}`);
  }

  get cacheName(): string {
    return this._name || "HSCore.Cache";
  }

  add(entity: T): void {
    const id = entity?.id;
    
    if (!id) {
      return;
    }

    if (this._cache[id] && DEBUG) {
      Logger.console.warn(
        `${this.cacheName} duplicate entity: ${entity.tag || entity.id}`
      );
    }

    this._cache[id] = entity;
  }

  getAll(): CacheStorage<T> {
    return this._cache;
  }

  clear(): void {
    this._cache = {};
  }
}