type ModuleMap = Record<string, [number, number]>;

const moduleMap: ModuleMap = {
  "./ezhome/partner.js": [699896, 896],
  "./fp/partner.js": [239266, 266]
};

interface ModuleLoader {
  (modulePath: string): Promise<unknown>;
  keys: () => string[];
  id: number;
}

function createModuleLoader(
  moduleRegistry: Record<string, unknown>,
  ensureChunk: (chunkId: number) => Promise<void>,
  loadModule: (moduleId: number, flags: number) => unknown
): ModuleLoader {
  const loader = (modulePath: string): Promise<unknown> => {
    if (!Object.prototype.hasOwnProperty.call(moduleMap, modulePath)) {
      return Promise.resolve().then(() => {
        const error = new Error(`Cannot find module '${modulePath}'`);
        (error as NodeJS.ErrnoException).code = "MODULE_NOT_FOUND";
        throw error;
      });
    }

    const [moduleId, chunkId] = moduleMap[modulePath];
    return ensureChunk(chunkId).then(() => loadModule(moduleId, 23));
  };

  loader.keys = (): string[] => Object.keys(moduleMap);
  loader.id = 272977;

  return loader;
}

export default createModuleLoader;