import { loadNativeClipperLibInstanceAsync, NativeClipperLibRequestedFormat } from './ClipperLibWasm';
import * as PolygonToolWasm from './PolygonToolWasm';
import type { IPlugin } from './HSApp/Plugin/IPlugin';

declare global {
  interface Window {
    ClipperLibWasm: typeof import('./ClipperLibWasm');
    PolygonToolWasm: typeof PolygonToolWasm;
    ClipperLibInstance: any;
    PolygonToolInstance: any;
    PolygontoolLibWrapper: any;
  }

  namespace HSApp {
    namespace App {
      function getApp(): {
        appParams: {
          polygontool?: boolean;
        };
      };
    }

    namespace Plugin {
      class IPlugin {
        constructor(config: PluginConfig);
        onActive(params: any): void;
      }

      function registerPlugin(
        name: string,
        pluginClass: typeof IPlugin,
        loader: () => Promise<any[]>
      ): void;
    }
  }

  namespace HSCore {
    namespace Doc {
      function getDocManager(): {
        registerPTInstance(instance: any): void;
      };
    }
  }
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

window.ClipperLibWasm = require('./ClipperLibWasm');
window.PolygonToolWasm = PolygonToolWasm;

async function loadClipperLib(): Promise<void> {
  if (window.ClipperLibInstance) {
    console.warn('PreLoader: clipperLib loaded.');
    return Promise.resolve();
  }

  return new Promise<void>(async (resolve) => {
    const instance = await loadNativeClipperLibInstanceAsync(
      NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
    );
    window.ClipperLibInstance = instance;
    resolve();
  });
}

async function loadPolygonTool(): Promise<void> {
  if (!HSApp.App.getApp().appParams.polygontool) {
    return Promise.resolve();
  }

  if (window.PolygonToolInstance) {
    console.warn('PreLoader: PolygonTool loaded.');
    return Promise.resolve();
  }

  return new Promise<void>(async (resolve) => {
    PolygonToolWasm.loadNativeClipperPlusLibInstanceAsync().then((wrapper) => {
      window.PolygonToolInstance = wrapper.getNativeInstance();
      window.PolygontoolLibWrapper = wrapper;
      HSCore.Doc.getDocManager().registerPTInstance(wrapper);
    });
    resolve();
  });
}

class ClipperLibPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: 'ClipperLib Plugin',
      description: 'ClipperLib related function supports',
      dependencies: [],
    });
  }

  onActive(params: any): void {
    super.onActive(params);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin(
  'hsw.plugin.clipperlib.Plugin',
  ClipperLibPlugin,
  () => Promise.all([loadClipperLib(), loadPolygonTool()])
);