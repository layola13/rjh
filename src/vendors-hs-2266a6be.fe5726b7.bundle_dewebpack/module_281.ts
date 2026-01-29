import * as localforage from 'localforage';

export enum StorageTypes {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
  localforageStorage = 'localforageStorage'
}

interface LocalforageConfig {
  name?: string;
}

interface StorageOptions {
  storageType?: StorageTypes;
  name?: string;
}

interface IStorageAdapter {
  setItem<T>(key: string, value: T, callback?: () => void): Promise<void>;
  getItem<T>(key: string, callback?: (value: T | null) => void): Promise<T | null>;
  removeItem(key: string, callback?: () => void): Promise<void>;
  keys(callback?: (keys: string[]) => void): Promise<string[]>;
}

class LocalforageStorageAdapter implements IStorageAdapter {
  private baseStorage: LocalForage;

  constructor(config: LocalforageConfig) {
    this.baseStorage = localforage.createInstance({
      name: config.name || 'sjj'
    });
  }

  setItem<T>(key: string, value: T, callback?: () => void): Promise<void> {
    return this.baseStorage.setItem(key, value, callback);
  }

  getItem<T>(key: string, callback?: (value: T | null) => void): Promise<T | null> {
    return this.baseStorage.getItem(key, callback);
  }

  removeItem(key: string, callback?: () => void): Promise<void> {
    return this.baseStorage.removeItem(key, callback);
  }

  keys(callback?: (keys: string[]) => void): Promise<string[]> {
    return this.baseStorage.keys().then((keys) => {
      callback?.(keys);
      return keys;
    });
  }
}

class WebStorageAdapter implements IStorageAdapter {
  private baseStorage: Storage;

  constructor(storage: Storage) {
    this.baseStorage = storage;
  }

  setItem<T>(key: string, value: T, callback?: () => void): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      this.baseStorage.setItem(key, serializedValue);
      callback?.();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getItem<T>(key: string, callback?: (value: T | null) => void): Promise<T | null> {
    try {
      const rawValue = this.baseStorage.getItem(key);
      const parsedValue = rawValue ? JSON.parse(rawValue) : null;
      callback?.(parsedValue);
      return Promise.resolve(parsedValue);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  removeItem(key: string, callback?: () => void): Promise<void> {
    try {
      this.baseStorage.removeItem(key);
      callback?.();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  keys(callback?: (keys: string[]) => void): Promise<string[]> {
    try {
      const allKeys: string[] = [];
      for (let index = 0; index < this.baseStorage.length; index++) {
        const key = this.baseStorage.key(index);
        if (key) {
          allKeys.push(key);
        }
      }
      callback?.(allKeys);
      return Promise.resolve(allKeys);
    } catch (error) {
      return Promise.reject();
    }
  }
}

class StorageManager {
  private storageName: string;
  private storage: IStorageAdapter;

  constructor(storageName: string, options: StorageOptions) {
    this.storageName = storageName;
    this.storage = StorageManager.createInstance(options.storageType, {
      name: options.name
    });
  }

  private static createInstance(storageType: StorageTypes | undefined, config: LocalforageConfig): IStorageAdapter {
    if (storageType === StorageTypes.localStorage) {
      return new WebStorageAdapter(window.localStorage);
    } else if (storageType === StorageTypes.sessionStorage) {
      return new WebStorageAdapter(window.sessionStorage);
    } else if (storageType === StorageTypes.localforageStorage) {
      return new LocalforageStorageAdapter({
        name: config.name || 'sjj'
      });
    } else {
      return new WebStorageAdapter(window.localStorage);
    }
  }

  private getRealKey(key: string): string {
    return `${this.storageName}::${key}`;
  }

  private getRealStorage(): IStorageAdapter {
    return this.storage;
  }

  set<T>(key: string, value: T, callback?: () => void): Promise<void> {
    return this.getRealStorage().setItem(this.getRealKey(key), value, callback);
  }

  get<T>(key: string, callback?: (value: T | null) => void): Promise<T | null> {
    return this.getRealStorage().getItem(this.getRealKey(key), callback);
  }

  remove(key: string, callback?: () => void): Promise<void> {
    return this.getRealStorage().removeItem(this.getRealKey(key), callback);
  }

  keys(callback?: (keys: string[]) => void): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.getRealStorage()
        .keys((allKeys) => {
          const prefix = `${this.storageName}::`;
          const filteredKeys = (allKeys || [])
            .filter((key) => key.startsWith(prefix))
            .map((key) => key.replace(prefix, ''));
          callback?.(filteredKeys);
          resolve(filteredKeys);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default class Storage {
  private options: StorageOptions;
  private _storage: StorageManager;

  constructor(namespace: string, options?: StorageOptions) {
    this.options = options || {};
    const fullNamespace = `${window.location.hostname}/${namespace}`;
    this._storage = new StorageManager(fullNamespace, {
      storageType: options?.storageType
    });
  }

  set<T>(key: string, value: T, callback?: () => void): Promise<void> {
    return key ? this._storage.set(key, value, callback) : Promise.reject();
  }

  get<T>(key: string, callback?: (value: T | null) => void): Promise<T | null> {
    return this._storage.get(key, callback);
  }

  clear(key: string, callback?: () => void): Promise<void> {
    return this._storage.remove(key, callback);
  }

  keys(callback?: (keys: string[]) => void): Promise<string[]> {
    return this._storage.keys(callback);
  }
}