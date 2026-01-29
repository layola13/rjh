interface StyleElement {
  css: string;
  media: string;
  sourceMap: string;
  supports: string;
  layer: string;
}

interface StyleOptions {
  base?: string;
  byIndex?: number;
  domAPI: (options: StyleOptions) => DOMAPIInstance;
}

interface DOMAPIInstance {
  update: (element: StyleElement) => void;
  remove: () => void;
}

interface StyleRegistry {
  identifier: string;
  updater: (element: StyleElement) => void;
  references: number;
}

type StyleTuple = [string, string, string, string, string, string];

const styleRegistry: StyleRegistry[] = [];

function findStyleIndex(identifier: string): number {
  for (let index = 0; index < styleRegistry.length; index++) {
    if (styleRegistry[index].identifier === identifier) {
      return index;
    }
  }
  return -1;
}

function processStyles(
  styles: StyleTuple[],
  options: StyleOptions
): string[] {
  const identifierCount: Record<string, number> = {};
  const identifiers: string[] = [];

  for (let index = 0; index < styles.length; index++) {
    const styleTuple = styles[index];
    const baseIdentifier = options.base
      ? styleTuple[0] + options.base
      : styleTuple[0];
    const count = identifierCount[baseIdentifier] ?? 0;
    const uniqueIdentifier = `${baseIdentifier} ${count}`;
    identifierCount[baseIdentifier] = count + 1;

    const existingIndex = findStyleIndex(uniqueIdentifier);
    const styleElement: StyleElement = {
      css: styleTuple[1],
      media: styleTuple[2],
      sourceMap: styleTuple[3],
      supports: styleTuple[4],
      layer: styleTuple[5],
    };

    if (existingIndex !== -1) {
      styleRegistry[existingIndex].references++;
      styleRegistry[existingIndex].updater(styleElement);
    } else {
      const updater = createStyleUpdater(styleElement, options);
      options.byIndex = index;
      styleRegistry.splice(index, 0, {
        identifier: uniqueIdentifier,
        updater,
        references: 1,
      });
    }

    identifiers.push(uniqueIdentifier);
  }

  return identifiers;
}

function createStyleUpdater(
  element: StyleElement,
  options: StyleOptions
): (newElement: StyleElement) => void {
  const domAPI = options.domAPI(options);
  domAPI.update(element);

  return function (newElement: StyleElement): void {
    if (newElement) {
      if (
        newElement.css === element.css &&
        newElement.media === element.media &&
        newElement.sourceMap === element.sourceMap &&
        newElement.supports === element.supports &&
        newElement.layer === element.layer
      ) {
        return;
      }
      domAPI.update((element = newElement));
    } else {
      domAPI.remove();
    }
  };
}

export default function createStyleInjector(
  initialStyles: StyleTuple[] = [],
  options: StyleOptions = {} as StyleOptions
): (styles: StyleTuple[]) => void {
  let currentIdentifiers = processStyles(initialStyles, options);

  return function updateStyles(styles: StyleTuple[] = []): void {
    for (let index = 0; index < currentIdentifiers.length; index++) {
      const registryIndex = findStyleIndex(currentIdentifiers[index]);
      styleRegistry[registryIndex].references--;
    }

    const newIdentifiers = processStyles(styles, options);

    for (let index = 0; index < currentIdentifiers.length; index++) {
      const registryIndex = findStyleIndex(currentIdentifiers[index]);
      if (styleRegistry[registryIndex].references === 0) {
        styleRegistry[registryIndex].updater({} as StyleElement);
        styleRegistry.splice(registryIndex, 1);
      }
    }

    currentIdentifiers = newIdentifiers;
  };
}