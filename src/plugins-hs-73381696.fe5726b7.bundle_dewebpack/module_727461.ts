import context from './274228';

interface ImportedModule {
  default?: unknown[];
}

const keys: string[] = context.keys();
const result: unknown[] = [];

keys.forEach((key: string) => {
  const module = context(key) as ImportedModule;
  const defaultExport = module.default;
  
  if (defaultExport) {
    result.push(...defaultExport);
  }
});

export default result;