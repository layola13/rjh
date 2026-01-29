interface ConfigModule {
  [key: string]: unknown;
}

type ConfigPath = './ezhome/config/config.json' | './fp/config/config.json';

const CONFIG_MODULES: Record<string, ConfigModule> = {
  './ezhome/config/config.json': await import('./ezhome/config/config.json'),
  './fp/config/config.json': await import('./fp/config/config.json')
};

async function loadConfig(modulePath: string): Promise<ConfigModule> {
  if (!(modulePath in CONFIG_MODULES)) {
    const error = new Error(`Cannot find module '${modulePath}'`) as NodeJS.ErrnoException;
    error.code = 'MODULE_NOT_FOUND';
    throw error;
  }

  return CONFIG_MODULES[modulePath];
}

function getConfigKeys(): string[] {
  return Object.keys(CONFIG_MODULES);
}

export { loadConfig, getConfigKeys, type ConfigModule, type ConfigPath };
export default loadConfig;