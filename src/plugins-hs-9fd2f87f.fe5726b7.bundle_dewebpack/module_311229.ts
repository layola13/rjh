import { HSApp } from './types/HSApp';
import { HSCore } from './types/HSCore';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface CryptoModule {
  generateKey: (input: unknown) => unknown;
}

let cryptoModule: CryptoModule | null = null;

class EncryptionPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "Encryption Plugin",
      description: "Encryption related function supports",
      dependencies: []
    });
  }

  onActive(context: unknown, options?: unknown): void {
    super.onActive?.(context, options);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

const loadCryptoLibrary = async (): Promise<void> => {
  if (cryptoModule) {
    console.warn("PreLoader: clipperLib loaded.");
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const loader = async (callback: () => void): Promise<void> => {
      const module = await import('./crypto-module');
      cryptoModule = module.default || module;
      
      HSCore.Util.CryptoJS.generateDocKey = (input: unknown): unknown => {
        return cryptoModule!.generateKey(input);
      };
      
      callback();
    };

    loader(() => resolve());
  });
};

HSApp.Plugin.registerPlugin(
  "hsw.plugin.encryption.Plugin",
  EncryptionPlugin,
  loadCryptoLibrary
);