interface ModuleConfig {
  arguments: string[];
  thisProgram: string;
  quit: (exitCode: number, error: Error) => void;
  preRun: Array<() => void>;
  postRun: Array<() => void>;
  locateFile?: (path: string, prefix: string) => string;
  read?: (path: string, binary?: boolean) => string | Uint8Array;
  readBinary?: (path: string) => Uint8Array;
  readAsync?: (path: string, onload: (data: ArrayBuffer) => void, onerror: () => void) => void;
  setWindowTitle?: (title: string) => void;
  print?: (...args: unknown[]) => void;
  printErr?: (...args: unknown[]) => void;
  buffer?: ArrayBuffer;
  wasmMemory?: WebAssembly.Memory;
  wasmBinary?: Uint8Array;
  instantiateWasm?: (imports: WebAssembly.Imports, successCallback: (instance: WebAssembly.Instance) => void) => WebAssembly.Exports;
  TOTAL_STACK?: number;
  TOTAL_MEMORY?: number;
  wasmTableSize?: number;
  wasmMaxTableSize?: number;
  STATIC_BASE?: number;
  STATIC_BUMP?: number;
  onRuntimeInitialized?: () => void;
  onAbort?: (error: unknown) => void;
  setStatus?: (status: string) => void;
  calledRun?: boolean;
  noExitRuntime?: boolean;
  HEAP8?: Int8Array;
  HEAP16?: Int16Array;
  HEAP32?: Int32Array;
  HEAPU8?: Uint8Array;
  HEAPU16?: Uint16Array;
  HEAPU32?: Uint32Array;
  HEAPF32?: Float32Array;
  HEAPF64?: Float64Array;
  asm?: ModuleAsm;
  usingWasm?: boolean;
  wasmTable?: WebAssembly.Table;
  preloadedImages?: Record<string, unknown>;
  preloadedAudios?: Record<string, unknown>;
  monitorRunDependencies?: (count: number) => void;
  asmGlobalArg?: Record<string, unknown>;
  asmLibraryArg?: Record<string, unknown>;
  _encryptString?: (ptr: number) => number;
  ___errno_location?: () => number;
  allocate?: (data: number | ArrayLike<number>, type: string | string[], allocator: number, ptr?: number) => number;
  intArrayFromString?: (str: string, dontAddNull?: boolean, length?: number) => number[];
  _malloc?: (size: number) => number;
  stackAlloc?: (size: number) => number;
  run?: () => void;
  abort?: (error: unknown) => void;
  preInit?: Array<() => void> | (() => void);
}

interface ModuleAsm {
  g: (...args: unknown[]) => number;
  h: (...args: unknown[]) => number;
  i: (...args: unknown[]) => number;
  j: (...args: unknown[]) => number;
  memory?: WebAssembly.Memory;
}

type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

const DATA_URL_PREFIX = "data:application/octet-stream;base64,";

class DockeyInstance {
  constructor(private readonly instance: ModuleConfig) {}

  generateKey(input: string): string {
    const stringPtr = this.instance.allocate!(
      this.instance.intArrayFromString!(input),
      "i8",
      2
    );
    return this.instance._encryptString!(stringPtr).toString();
  }
}

class ExitStatus extends Error {
  constructor(public readonly status: number) {
    super(`Program terminated with exit(${status})`);
    this.name = "ExitStatus";
  }
}

function createModule(userConfig: Partial<ModuleConfig>): ModuleConfig {
  const config: ModuleConfig = {
    arguments: [],
    thisProgram: "./this.program",
    quit: (_exitCode: number, error: Error) => {
      throw error;
    },
    preRun: [],
    postRun: [],
    ...userConfig,
  };

  const isNode = typeof process === "object" && typeof process.versions === "object";
  const isWorker = typeof importScripts === "function";
  const isBrowser = !isNode && !isWorker;

  let nodeFS: typeof import("fs") | undefined;
  let nodePath: typeof import("path") | undefined;
  let scriptDirectory = "";

  function locateFile(path: string): string {
    return config.locateFile ? config.locateFile(path, scriptDirectory) : scriptDirectory + path;
  }

  if (isNode) {
    scriptDirectory = "//";
    config.read = (filePath: string, binary?: boolean): string | Uint8Array => {
      let content = tryLoadPreloadedFile(filePath);
      if (!content) {
        if (!nodeFS) nodeFS = require("fs");
        if (!nodePath) nodePath = require("path");
        filePath = nodePath.normalize(filePath);
        content = nodeFS.readFileSync(filePath);
      }
      return binary ? content : content.toString();
    };

    config.readBinary = (filePath: string): Uint8Array => {
      const data = config.read!(filePath, true);
      if (data instanceof Uint8Array) return data;
      return new Uint8Array(data as unknown as ArrayBuffer);
    };

    if (process.argv.length > 1) {
      config.thisProgram = process.argv[1].replace(/\\/g, "/");
    }

    config.arguments = process.argv.slice(2);

    process.on("uncaughtException", (error: unknown) => {
      if (!(error instanceof ExitStatus)) throw error;
    });

    process.on("unhandledRejection", abort);

    config.quit = (exitCode: number) => {
      process.exit(exitCode);
    };
  } else if (isBrowser || isWorker) {
    if (isWorker) {
      scriptDirectory = self.location.href;
    } else if (document.currentScript) {
      scriptDirectory = (document.currentScript as HTMLScriptElement).src;
    }

    if (scriptDirectory.indexOf("blob:") !== 0) {
      scriptDirectory = scriptDirectory.substring(0, scriptDirectory.lastIndexOf("/") + 1);
    } else {
      scriptDirectory = "";
    }

    config.read = (url: string): string => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        return xhr.responseText;
      } catch {
        const preloaded = tryLoadPreloadedFile(url);
        if (preloaded) return arrayBufferToString(preloaded);
        throw new Error(`Failed to read ${url}`);
      }
    };

    if (isWorker) {
      config.readBinary = (url: string): Uint8Array => {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.responseType = "arraybuffer";
          xhr.send(null);
          return new Uint8Array(xhr.response as ArrayBuffer);
        } catch {
          const preloaded = tryLoadPreloadedFile(url);
          if (preloaded) return preloaded;
          throw new Error(`Failed to read binary ${url}`);
        }
      };
    }

    config.readAsync = (url: string, onload: (data: ArrayBuffer) => void, onerror: () => void): void => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        if (xhr.status === 200 || (xhr.status === 0 && xhr.response)) {
          onload(xhr.response as ArrayBuffer);
        } else {
          const fallback = tryLoadPreloadedFile(url);
          if (fallback) {
            onload(fallback.buffer);
          } else {
            onerror();
          }
        }
      };
      xhr.onerror = onerror;
      xhr.send(null);
    };

    config.setWindowTitle = (title: string) => {
      document.title = title;
    };
  }

  const out = config.print ?? (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
  const err = config.printErr ?? (typeof console !== "undefined" ? console.warn.bind(console) : out);

  let wasmMemory: ArrayBuffer;
  let HEAP8: Int8Array;
  let HEAPU8: Uint8Array;
  let HEAP16: Int16Array;
  let HEAP32: Int32Array;
  let HEAPF32: Float32Array;
  let HEAPF64: Float64Array;

  let STACKTOP: number;
  let STACK_MAX: number;
  let DYNAMIC_BASE: number;
  let DYNAMICTOP_PTR: number;

  const WASM_PAGE_SIZE = 65536;
  const TOTAL_STACK = config.TOTAL_STACK ?? 5242880;
  const TOTAL_MEMORY = config.TOTAL_MEMORY ?? 16777216;

  if (TOTAL_MEMORY < TOTAL_STACK) {
    err?.(`TOTAL_MEMORY should be larger than TOTAL_STACK, was ${TOTAL_MEMORY}! (TOTAL_STACK=${TOTAL_STACK})`);
  }

  if (config.buffer) {
    wasmMemory = config.buffer;
  } else {
    if (typeof WebAssembly === "object" && typeof WebAssembly.Memory === "function") {
      config.wasmMemory = new WebAssembly.Memory({
        initial: TOTAL_MEMORY / WASM_PAGE_SIZE,
        maximum: TOTAL_MEMORY / WASM_PAGE_SIZE,
      });
      wasmMemory = config.wasmMemory.buffer;
    } else {
      wasmMemory = new ArrayBuffer(TOTAL_MEMORY);
    }
    config.buffer = wasmMemory;
  }

  updateGlobalBufferViews();

  function updateGlobalBufferViews(): void {
    config.HEAP8 = HEAP8 = new Int8Array(wasmMemory);
    config.HEAP16 = HEAP16 = new Int16Array(wasmMemory);
    config.HEAP32 = HEAP32 = new Int32Array(wasmMemory);
    config.HEAPU8 = HEAPU8 = new Uint8Array(wasmMemory);
    config.HEAPU16 = new Uint16Array(wasmMemory);
    config.HEAPU32 = new Uint32Array(wasmMemory);
    config.HEAPF32 = HEAPF32 = new Float32Array(wasmMemory);
    config.HEAPF64 = HEAPF64 = new Float64Array(wasmMemory);
  }

  function isDataURL(filename: string): boolean {
    return filename.startsWith(DATA_URL_PREFIX);
  }

  function tryLoadPreloadedFile(filename: string): Uint8Array | null {
    if (isDataURL(filename)) {
      return decodeBase64ToBytes(filename.slice(DATA_URL_PREFIX.length));
    }
    return null;
  }

  function arrayBufferToString(buffer: Uint8Array): string {
    const bytes: string[] = [];
    for (let i = 0; i < buffer.length; i++) {
      bytes.push(String.fromCharCode(buffer[i]));
    }
    return bytes.join("");
  }

  function decodeBase64ToBytes(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  function abort(error: unknown): never {
    if (config.onAbort) config.onAbort(error);
    const message = error !== undefined ? JSON.stringify(error) : "";
    out?.(message);
    err?.(message);
    throw new Error(`abort(${message}). Build with -s ASSERTIONS=1 for more info.`);
  }

  function runDependencies(count: number): void {
    if (config.monitorRunDependencies) {
      config.monitorRunDependencies(count);
    }
  }

  function executeWasm(): void {
    if (!config.calledRun) {
      config.calledRun = true;
      if (config.onRuntimeInitialized) {
        config.onRuntimeInitialized();
      }
    }
  }

  config.abort = abort;
  config.run = executeWasm;

  return config;
}

let wasmInstanceCache: ModuleConfig | Error | undefined;
let fallbackInstanceCache: ModuleConfig | Error | undefined;

async function loadWasmModule(): Promise<DockeyInstance> {
  if (wasmInstanceCache instanceof Error) {
    throw wasmInstanceCache;
  }
  
  if (wasmInstanceCache) {
    return new DockeyInstance(wasmInstanceCache);
  }

  try {
    const instance = await createModule({ noExitRuntime: true });
    wasmInstanceCache = instance;
    return new DockeyInstance(instance);
  } catch (error) {
    wasmInstanceCache = error as Error;
    throw error;
  }
}

export default async function loadDockey(): Promise<DockeyInstance> {
  try {
    return await loadWasmModule();
  } catch {
    if (fallbackInstanceCache instanceof Error) {
      throw fallbackInstanceCache;
    }
    
    if (fallbackInstanceCache) {
      return new DockeyInstance(fallbackInstanceCache);
    }

    try {
      const instance = await createModule({ noExitRuntime: true });
      fallbackInstanceCache = instance;
      return new DockeyInstance(instance);
    } catch (error) {
      fallbackInstanceCache = error as Error;
      throw new Error("Could not load Dockey in the desired format");
    }
  }
}