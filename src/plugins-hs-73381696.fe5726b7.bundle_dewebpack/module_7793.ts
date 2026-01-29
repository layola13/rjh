import * as iconContext from './267872';

interface IconConfig {
  [key: string]: unknown;
}

const icons: IconConfig[] = [];

const keys = iconContext.keys();

keys.forEach((key: string): void => {
  const module = iconContext(key);
  const defaultExport = module?.default;
  
  if (defaultExport) {
    icons.push(...(Array.isArray(defaultExport) ? defaultExport : [defaultExport]));
  }
});

export default icons;