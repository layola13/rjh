interface IndexedDBInfo {
  db: IDBDatabase | null;
  version: number;
  storeName: string;
  name: string;
}

interface DeferredOperation {
  promise: Promise<void>;
  resolve: () => void;
  reject: (error: Error) => void;
}

interface DatabaseRegistry {
  forages: LocalForage[];
  db: IDBDatabase | null;
  dbReady: Promise<void> | null;
  deferredOperations: DeferredOperation[];
}

interface SerializedBlob {
  __local_forage_encoded_blob: true;
  data: string;
  type: string;
}

type SerializableValue = 
  | string 
  | number 
  | boolean 
  | null 
  | ArrayBuffer 
  | Blob 
  | Int8Array 
  | Uint8Array 
  | Uint8ClampedArray 
  | Int16Array 
  | Uint16Array 
  | Int32Array 
  | Uint32Array 
  | Float32Array 
  | Float64Array;

type IteratorCallback<T> = (value: unknown, key: string, iterationNumber: number) => T | void;

interface DriverConfig {
  name?: string;
  version?: number;
  storeName?: string;
  description?: string;
  size?: number;
  driver?: string | string[];
}

interface Driver {
  _driver: string;
  _support: boolean | (() => Promise<boolean>);
  _initStorage(options: DriverConfig): Promise<void>;
  iterate<T>(iterator: IteratorCallback<T>, callback?: (err: Error | null, result?: T) => void): Promise<T | void>;
  getItem<T>(key: string, callback?: (err: Error | null, value: T | null) => void): Promise<T | null>;
  setItem<T>(key: string, value: T, callback?: (err: Error | null, value: T) => void): Promise<T>;
  removeItem(key: string, callback?: (err: Error | null) => void): Promise<void>;
  clear(callback?: (err: Error | null) => void): Promise<void>;
  length(callback?: (err: Error | null, length: number) => void): Promise<number>;
  key(index: number, callback?: (err: Error | null, key: string | null) => void): Promise<string | null>;
  keys(callback?: (err: Error | null, keys: string[]) => void): Promise<string[]>;
  dropInstance?(options: DriverConfig, callback?: (err: Error | null) => void): Promise<void>;
}

const TRANSACTION_READONLY = 'readonly';
const TRANSACTION_READWRITE = 'readwrite';
const BLOB_DETECTION_STORE = 'local-forage-detect-blob-support';

const TYPE_ARRAYBUFFER = 'arbf';
const TYPE_BLOB = 'blob';
const TYPE_INT8ARRAY = 'si08';
const TYPE_UINT8ARRAY = 'ui08';
const TYPE_UINT8CLAMPEDARRAY = 'uic8';
const TYPE_INT16ARRAY = 'si16';
const TYPE_INT32ARRAY = 'si32';
const TYPE_UINT16ARRAY = 'ur16';
const TYPE_UINT32ARRAY = 'ui32';
const TYPE_FLOAT32ARRAY = 'fl32';
const TYPE_FLOAT64ARRAY = 'fl64';

const SERIALIZED_MARKER = '__lfsc__:';
const BLOB_TYPE_PREFIX = '~~local_forage_type~';
const BLOB_TYPE_REGEX = /^~~local_forage_type~([^~]+)~/;
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

let isBlobSupported: boolean | undefined;
const dbRegistry: Record<string, DatabaseRegistry> = {};

const indexedDB = (() => {
  try {
    if (typeof globalThis.indexedDB !== 'undefined') return globalThis.indexedDB;
    if (typeof globalThis.webkitIndexedDB !== 'undefined') return globalThis.webkitIndexedDB;
    if (typeof globalThis.mozIndexedDB !== 'undefined') return globalThis.mozIndexedDB;
    if (typeof globalThis.OIndexedDB !== 'undefined') return globalThis.OIndexedDB;
    if (typeof globalThis.msIndexedDB !== 'undefined') return globalThis.msIndexedDB;
  } catch {
    return undefined;
  }
})();

function createBlob(parts: BlobPart[], options: BlobPropertyBag = {}): Blob {
  try {
    return new Blob(parts, options);
  } catch (error) {
    if (error instanceof TypeError && error.name === 'TypeError') {
      const BlobBuilder = 
        (globalThis as any).BlobBuilder || 
        (globalThis as any).MSBlobBuilder || 
        (globalThis as any).MozBlobBuilder || 
        (globalThis as any).WebKitBlobBuilder;
      const builder = new BlobBuilder();
      for (const part of parts) {
        builder.append(part);
      }
      return builder.getBlob(options.type);
    }
    throw error;
  }
}

function stringToBuffer(base64: string): ArrayBuffer {
  const length = base64.length;
  const bufferLength = length * 0.75;
  
  let actualLength = bufferLength;
  if (base64[length - 1] === '=') {
    actualLength--;
    if (base64[length - 2] === '=') actualLength--;
  }
  
  const buffer = new ArrayBuffer(actualLength);
  const bytes = new Uint8Array(buffer);
  
  let bufferIndex = 0;
  for (let i = 0; i < length; i += 4) {
    const encoded1 = BASE64_CHARS.indexOf(base64[i]);
    const encoded2 = BASE64_CHARS.indexOf(base64[i + 1]);
    const encoded3 = BASE64_CHARS.indexOf(base64[i + 2]);
    const encoded4 = BASE64_CHARS.indexOf(base64[i + 3]);
    
    bytes[bufferIndex++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[bufferIndex++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[bufferIndex++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }
  
  return buffer;
}

function bufferToString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let base64 = '';
  
  for (let i = 0; i < bytes.length; i += 3) {
    base64 += BASE64_CHARS[bytes[i] >> 2];
    base64 += BASE64_CHARS[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += BASE64_CHARS[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += BASE64_CHARS[bytes[i + 2] & 63];
  }
  
  if (bytes.length % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (bytes.length % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }
  
  return base64;
}

const serializer = {
  serialize(value: unknown, callback: (result: string | null, error?: Error) => void): void {
    const valueType = Object.prototype.toString.call(value);
    
    if (value && (valueType === '[object ArrayBuffer]' || (value as any).buffer && Object.prototype.toString.call((value as any).buffer) === '[object ArrayBuffer]')) {
      let buffer: ArrayBuffer;
      let prefix = SERIALIZED_MARKER;
      
      if (value instanceof ArrayBuffer) {
        buffer = value;
        prefix += TYPE_ARRAYBUFFER;
      } else {
        buffer = (value as any).buffer;
        
        if (valueType === '[object Int8Array]') prefix += TYPE_INT8ARRAY;
        else if (valueType === '[object Uint8Array]') prefix += TYPE_UINT8ARRAY;
        else if (valueType === '[object Uint8ClampedArray]') prefix += TYPE_UINT8CLAMPEDARRAY;
        else if (valueType === '[object Int16Array]') prefix += TYPE_INT16ARRAY;
        else if (valueType === '[object Uint16Array]') prefix += TYPE_UINT16ARRAY;
        else if (valueType === '[object Int32Array]') prefix += TYPE_INT32ARRAY;
        else if (valueType === '[object Uint32Array]') prefix += TYPE_UINT32ARRAY;
        else if (valueType === '[object Float32Array]') prefix += TYPE_FLOAT32ARRAY;
        else if (valueType === '[object Float64Array]') prefix += TYPE_FLOAT64ARRAY;
        else {
          callback(null, new Error('Failed to get type for BinaryArray'));
          return;
        }
      }
      
      callback(prefix + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
      const reader = new FileReader();
      reader.onerror = () => callback(null, new Error('Failed to read blob'));
      reader.onloadend = (event) => {
        const base64 = btoa((event.target?.result as string) || '');
        callback(SERIALIZED_MARKER + TYPE_BLOB + BLOB_TYPE_PREFIX + (value as Blob).type + '~' + base64);
      };
      reader.readAsBinaryString(value as Blob);
    } else {
      try {
        callback(JSON.stringify(value));
      } catch (error) {
        console.error("Couldn't convert value into a JSON string: ", value);
        callback(null, error as Error);
      }
    }
  },
  
  deserialize(serialized: string): unknown {
    if (serialized.substring(0, SERIALIZED_MARKER.length) !== SERIALIZED_MARKER) {
      return JSON.parse(serialized);
    }
    
    const typeCode = serialized.substring(SERIALIZED_MARKER.length, SERIALIZED_MARKER.length + 4);
    let data = serialized.substring(SERIALIZED_MARKER.length + 4);
    let blobType: string | undefined;
    
    if (typeCode === TYPE_BLOB && BLOB_TYPE_REGEX.test(data)) {
      const match = data.match(BLOB_TYPE_REGEX)!;
      blobType = match[1];
      data = data.substring(match[0].length);
    }
    
    const buffer = stringToBuffer(data);
    
    switch (typeCode) {
      case TYPE_ARRAYBUFFER:
        return buffer;
      case TYPE_BLOB:
        return createBlob([buffer], { type: blobType });
      case TYPE_INT8ARRAY:
        return new Int8Array(buffer);
      case TYPE_UINT8ARRAY:
        return new Uint8Array(buffer);
      case TYPE_UINT8CLAMPEDARRAY:
        return new Uint8ClampedArray(buffer);
      case TYPE_INT16ARRAY:
        return new Int16Array(buffer);
      case TYPE_UINT16ARRAY:
        return new Uint16Array(buffer);
      case TYPE_INT32ARRAY:
        return new Int32Array(buffer);
      case TYPE_UINT32ARRAY:
        return new Uint32Array(buffer);
      case TYPE_FLOAT32ARRAY:
        return new Float32Array(buffer);
      case TYPE_FLOAT64ARRAY:
        return new Float64Array(buffer);
      default:
        throw new Error('Unknown type: ' + typeCode);
    }
  }
};

class LocalForage {
  private _driver: string | null = null;
  private _ready: Promise<void> | null = null;
  private _dbInfo: any = null;
  private _defaultConfig: DriverConfig;
  private _config: DriverConfig;
  private _driverSet: Promise<void> | null = null;
  private _initDriver: (() => Promise<void>) | null = null;
  
  INDEXEDDB = 'asyncStorage';
  WEBSQL = 'webSQLStorage';
  LOCALSTORAGE = 'localStorageWrapper';
  
  constructor(config?: DriverConfig) {
    this._defaultConfig = {
      description: '',
      driver: ['asyncStorage', 'webSQLStorage', 'localStorageWrapper'],
      name: 'localforage',
      size: 4980736,
      storeName: 'keyvaluepairs',
      version: 1
    };
    
    this._config = { ...this._defaultConfig, ...config };
    this._wrapLibraryMethodsWithReady();
    this.setDriver(this._config.driver!).catch(() => {});
  }
  
  private _wrapLibraryMethodsWithReady(): void {
    const methods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem', 'dropInstance'];
    methods.forEach(method => {
      (this as any)[method] = (...args: any[]) => {
        return this.ready().then(() => (this as any)[method].apply(this, args));
      };
    });
  }
  
  ready(callback?: (err: Error | null) => void): Promise<void> {
    const readyPromise = this._driverSet!.then(() => {
      if (this._ready === null) {
        this._ready = this._initDriver!();
      }
      return this._ready;
    });
    
    if (callback) {
      readyPromise.then(() => callback(null), callback);
    }
    
    return readyPromise;
  }
  
  setDriver(drivers: string | string[]): Promise<void> {
    const driverArray = Array.isArray(drivers) ? drivers : [drivers];
    
    this._driverSet = Promise.resolve().then(() => {
      const driver = driverArray[0];
      this._driver = driver;
      this._dbInfo = null;
      this._ready = null;
      return Promise.resolve();
    });
    
    return this._driverSet;
  }
  
  config(config: DriverConfig): boolean | DriverConfig {
    if (typeof config === 'object') {
      if (this._ready) {
        throw new Error("Can't call config() after localforage has been used.");
      }
      
      for (const key in config) {
        if (key === 'storeName') {
          (config as any)[key] = (config as any)[key].replace(/\W/g, '_');
        }
        if (key === 'version' && typeof (config as any)[key] !== 'number') {
          throw new Error('Database version must be a number.');
        }
        (this._config as any)[key] = (config as any)[key];
      }
      
      if ('driver' in config && config.driver) {
        this.setDriver(config.driver);
      }
      
      return true;
    }
    
    return typeof config === 'string' ? (this._config as any)[config] : this._config;
  }
  
  driver(): string | null {
    return this._driver;
  }
}

export default new LocalForage();