interface StyleEntry {
  css: string;
  media: string;
  sourceMap: unknown;
  supports: string;
  layer: string;
}

interface StyleModule {
  identifier: string;
  updater: (entry: StyleEntry) => void;
  references: number;
}

interface InsertOptions {
  base?: string;
  byIndex?: number;
  domAPI: (options: InsertOptions) => DOMStyleAPI;
}

interface DOMStyleAPI {
  update: (entry: StyleEntry) => void;
  remove: () => void;
}

type StyleData = [string, string, unknown, string, string];

const styleModules: StyleModule[] = [];

function findModuleIndex(identifier: string): number {
  for (let index = 0; index < styleModules.length; index++) {
    if (styleModules[index].identifier === identifier) {
      return index;
    }
  }
  return -1;
}

function insertStyles(
  styles: StyleData[],
  options: InsertOptions
): string[] {
  const identifierCount: Record<string, number> = {};
  const identifiers: string[] = [];

  for (let index = 0; index < styles.length; index++) {
    const style = styles[index];
    const baseIdentifier = options.base ? style[0] + options.base : style[0];
    const count = identifierCount[baseIdentifier] || 0;
    const identifier = `${baseIdentifier} ${count}`;
    
    identifierCount[baseIdentifier] = count + 1;

    const moduleIndex = findModuleIndex(identifier);
    const styleEntry: StyleEntry = {
      css: style[1],
      media: style[2],
      sourceMap: style[3],
      supports: style[4],
      layer: style[5]
    };

    if (moduleIndex !== -1) {
      styleModules[moduleIndex].references++;
      styleModules[moduleIndex].updater(styleEntry);
    } else {
      const updater = createUpdater(styleEntry, options);
      options.byIndex = index;
      styleModules.splice(index, 0, {
        identifier,
        updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function createUpdater(
  entry: StyleEntry,
  options: InsertOptions
): (newEntry: StyleEntry) => void {
  const domAPI = options.domAPI(options);
  domAPI.update(entry);

  return function (newEntry: StyleEntry): void {
    if (newEntry) {
      if (
        newEntry.css === entry.css &&
        newEntry.media === entry.media &&
        newEntry.sourceMap === entry.sourceMap &&
        newEntry.supports === entry.supports &&
        newEntry.layer === entry.layer
      ) {
        return;
      }
      domAPI.update(entry = newEntry);
    } else {
      domAPI.remove();
    }
  };
}

export default function styleLoader(
  styles: StyleData[] = [],
  options: InsertOptions = {} as InsertOptions
): (newStyles?: StyleData[]) => void {
  let identifiers = insertStyles(styles, options);

  return function update(newStyles: StyleData[] = []): void {
    for (let index = 0; index < identifiers.length; index++) {
      const moduleIndex = findModuleIndex(identifiers[index]);
      styleModules[moduleIndex].references--;
    }

    const newIdentifiers = insertStyles(newStyles, options);

    for (let index = 0; index < identifiers.length; index++) {
      const moduleIndex = findModuleIndex(identifiers[index]);
      if (styleModules[moduleIndex].references === 0) {
        styleModules[moduleIndex].updater();
        styleModules.splice(moduleIndex, 1);
      }
    }

    identifiers = newIdentifiers;
  };
}