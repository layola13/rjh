import * as localforage from 'localforage';

export enum StorageTypes {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
  localforageStorage = 'localforageStorage'
}

interface LocalforageConfig {
  name?: string;
}

interface StorageConfig {
  storageType?: StorageTypes;
  name?: string;
}

interface StorageCallback<T = unknown> {
  (value: T): void;
}

interface IStorage {
  setItem<T>(key: string, value: T, callback?: StorageCallback<void>): Promise<void>;
  getItem<T>(key: string, callback?: StorageCallback<T>): Promise<T>;
  removeItem(key: string, callback?: StorageCallback<void>): Promise<void>;
  keys(callback?: StorageCallback<string[]>): Promise<string[]>;
}

class LocalforageStorage implements IStorage {
  private baseStorage: LocalForage;

  constructor(config: LocalforageConfig) {
    this.baseStorage = localforage.createInstance({
      name: config.name || 'sjj'
    });
  }

  setItem<T>(key: string, value: T, callback?: StorageCallback<void>): Promise<void> {
    return this.baseStorage.setItem(key, value, callback);
  }

  getItem<T>(key: string, callback?: StorageCallback<T>): Promise<T> {
    return this.baseStorage.getItem(key, callback);
  }

  removeItem(key: string, callback?: StorageCallback<void>): Promise<void> {
    return this.baseStorage.removeItem(key, callback);
  }

  keys(callback?: StorageCallback<string[]>): Promise<string[]> {
    return this.baseStorage.keys().then((keys) => {
      callback?.(keys);
      return keys;
    });
  }
}

class WebStorage implements IStorage {
  private baseStorage: Storage;

  constructor(storage: Storage) {
    this.baseStorage = storage;
  }

  setItem<T>(key: string, value: T, callback?: StorageCallback<void>): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      this.baseStorage.setItem(key, serializedValue);
      callback?.();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getItem<T>(key: string, callback?: StorageCallback<T>): Promise<T> {
    try {
      const rawValue = this.baseStorage.getItem(key);
      const parsedValue = rawValue ? JSON.parse(rawValue) : null;
      callback?.(parsedValue);
      return Promise.resolve(parsedValue);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  removeItem(key: string, callback?: StorageCallback<void>): Promise<void> {
    try {
      this.baseStorage.removeItem(key);
      callback?.();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  keys(callback?: StorageCallback<string[]>): Promise<string[]> {
    try {
      const keyList: string[] = [];
      for (let i = 0; i < this.baseStorage.length; i++) {
        const key = this.baseStorage.key(i);
        if (key) {
          keyList.push(key);
        }
      }
      callback?.(keyList);
      return Promise.resolve(keyList);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

class NamespacedStorage {
  private storageName: string;
  private storage: IStorage;

  constructor(storageName: string, config: StorageConfig) {
    this.storageName = storageName;
    this.storage = NamespacedStorage.createInstance(config.storageType, {
      name: config.name
    });
  }

  private static createInstance(storageType: StorageTypes | undefined, config: LocalforageConfig): IStorage {
    if (storageType === StorageTypes.localStorage) {
      return new WebStorage(window.localStorage);
    } else if (storageType === StorageTypes.sessionStorage) {
      return new WebStorage(window.sessionStorage);
    } else if (storageType === StorageTypes.localforageStorage) {
      return new LocalforageStorage({
        name: config.name || 'sjj'
      });
    } else {
      return new WebStorage(window.localStorage);
    }
  }

  private getRealKey(key: string): string {
    return `${this.storageName}::${key}`;
  }

  private getRealStorage(): IStorage {
    return this.storage;
  }

  set<T>(key: string, value: T, callback?: StorageCallback<void>): Promise<void> {
    return this.getRealStorage().setItem(this.getRealKey(key), value, callback);
  }

  get<T>(key: string, callback?: StorageCallback<T>): Promise<T> {
    return this.getRealStorage().getItem(this.getRealKey(key), callback);
  }

  remove(key: string, callback?: StorageCallback<void>): Promise<void> {
    return this.getRealStorage().removeItem(this.getRealKey(key), callback);
  }

  keys(callback?: StorageCallback<string[]>): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.getRealStorage()
        .keys((allKeys) => {
          const filteredKeys = (allKeys || [])
            .filter((key) => key.startsWith(`${this.storageName}::`))
            .map((key) => key.replace(`${this.storageName}::`, ''));
          callback?.(filteredKeys);
          resolve(filteredKeys);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default class StorageManager {
  private options: StorageConfig;
  private _storage: NamespacedStorage;

  constructor(namespace: string, options?: StorageConfig) {
    this.options = options || {};
    const fullNamespace = `${window.location.hostname}/${namespace}`;
    this._storage = new NamespacedStorage(fullNamespace, {
      storageType: options?.storageType
    });
  }

  set<T>(key: string, value: T, callback?: StorageCallback<void>): Promise<void> {
    return key ? this._storage.set(key, value, callback) : Promise.reject();
  }

  get<T>(key: string, callback?: StorageCallback<T>): Promise<T> {
    return this._storage.get(key, callback);
  }

  clear(key: string, callback?: StorageCallback<void>): Promise<void> {
    return this._storage.remove(key, callback);
  }

  keys(callback?: StorageCallback<string[]>): Promise<string[]> {
    return this._storage.keys(callback);
  }
}