import * as T3D from './T3D';
import * as ReactWEditor from './ReactWEditor';
import * as AntD from './AntD';
import * as AntDIcons from './AntDIcons';
import loadCompressWASM from './loadCompressWASM';

interface WASMModule {
  module?: unknown;
}

interface HSVendor {
  ReactWEditor: typeof ReactWEditor;
  AntD: typeof AntD;
  AntDIcons: typeof AntDIcons;
}

interface HSEngineGlobal {
  T3D: typeof T3D;
}

declare global {
  interface Window {
    T3D: typeof T3D;
    HSVendor: HSVendor;
    HSEngine?: HSEngineGlobal;
  }

  var HSCompressWASM: () => Promise<WASMModule>;
  var HSEngine: HSEngineGlobal | undefined;
}

let wasmInstance: Promise<WASMModule> | undefined;

globalThis.HSCompressWASM = (): Promise<WASMModule> => {
  if (!wasmInstance) {
    wasmInstance = loadCompressWASM().then((module): WASMModule => {
      const instance = wasmInstance as WASMModule & Promise<WASMModule>;
      instance.module = module;
      return instance;
    });
  }
  return wasmInstance;
};

window.T3D = T3D;

window.HSVendor = {
  ReactWEditor,
  AntD,
  AntDIcons
};

if (HSEngine) {
  HSEngine.T3D = T3D;
}