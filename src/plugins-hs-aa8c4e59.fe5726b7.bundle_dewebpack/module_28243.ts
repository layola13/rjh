import { PromiseWrapper } from './promise-wrapper';
import { IPlugin, PluginMetadata } from './plugin-interface';

interface ModelerMessage {
  method: string;
}

interface ModelerInstance {
  postMessage(message: ModelerMessage): Promise<ModelerInstance>;
}

let modelerInstance: ModelerInstance | undefined;

function getModeler(): Promise<ModelerInstance> {
  if (modelerInstance) {
    return Promise.resolve(modelerInstance);
  }

  const wrapper = new PromiseWrapper(new ModelerWorker()) as ModelerInstance;
  modelerInstance = wrapper;

  return wrapper
    .postMessage({ method: 'load' })
    .then(() => modelerInstance as ModelerInstance)
    .catch((error: Error) => {
      modelerInstance = undefined;
      throw error;
    });
}

class ModelerPlugin extends IPlugin {
  constructor() {
    super({
      name: '3D Modeler Plugin',
      description: '3D Modeler related function supports',
      dependencies: []
    });
  }

  onActive(event: unknown): void {
    super.onActive?.(event);
  }

  onDeactive(): void {
    // No cleanup required
  }
}

HSApp.Plugin.registerPlugin(
  'hsw.plugin.3dmodeler.Plugin',
  ModelerPlugin,
  (): Promise<void> => {
    globalThis.getModeler = getModeler;
    return Promise.resolve();
  }
);

declare global {
  function getModeler(): Promise<ModelerInstance>;
  
  namespace HSApp {
    namespace Plugin {
      function registerPlugin(
        name: string,
        pluginClass: typeof IPlugin,
        initializer: () => Promise<void>
      ): void;
    }
  }
}

class ModelerWorker {
  // Worker implementation placeholder
}

export { ModelerPlugin, getModeler };