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
  domAPI: (options: StyleOptions) => StyleUpdater;
}

interface StyleUpdater {
  update: (element: StyleElement) => void;
  remove: () => void;
}

interface StyleRecord {
  identifier: string;
  updater: (element?: StyleElement) => void;
  references: number;
}

type StyleTuple = [string, string, string, string, string, string];

const styleRegistry: StyleRecord[] = [];

function findStyleIndex(identifier: string): number {
  for (let index = 0; index < styleRegistry.length; index++) {
    if (styleRegistry[index].identifier === identifier) {
      return index;
    }
  }
  return -1;
}

function createStyleUpdater(
  element: StyleElement,
  options: StyleOptions
): (newElement?: StyleElement) => void {
  const updater = options.domAPI(options);
  updater.update(element);

  return function (newElement?: StyleElement): void {
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
      updater.update(newElement);
      element = newElement;
    } else {
      updater.remove();
    }
  };
}

function registerStyles(
  styles: StyleTuple[],
  options: StyleOptions
): string[] {
  const identifierCounts: Record<string, number> = {};
  const identifiers: string[] = [];

  for (let index = 0; index < styles.length; index++) {
    const style = styles[index];
    const baseIdentifier = options.base ? style[0] + options.base : style[0];
    const count = identifierCounts[baseIdentifier] ?? 0;
    const identifier = `${baseIdentifier} ${count}`;
    identifierCounts[baseIdentifier] = count + 1;

    const existingIndex = findStyleIndex(identifier);
    const styleElement: StyleElement = {
      css: style[1],
      media: style[2],
      sourceMap: style[3],
      supports: style[4],
      layer: style[5],
    };

    if (existingIndex !== -1) {
      styleRegistry[existingIndex].references++;
      styleRegistry[existingIndex].updater(styleElement);
    } else {
      const updater = createStyleUpdater(styleElement, options);
      options.byIndex = index;
      styleRegistry.splice(index, 0, {
        identifier,
        updater,
        references: 1,
      });
    }
    identifiers.push(identifier);
  }

  return identifiers;
}

export default function styleManager(
  initialStyles: StyleTuple[] = [],
  options: StyleOptions = {} as StyleOptions
): (newStyles?: StyleTuple[]) => void {
  let currentIdentifiers = registerStyles(initialStyles, options);

  return function (newStyles: StyleTuple[] = []): void {
    for (let index = 0; index < currentIdentifiers.length; index++) {
      const styleIndex = findStyleIndex(currentIdentifiers[index]);
      styleRegistry[styleIndex].references--;
    }

    const newIdentifiers = registerStyles(newStyles, options);

    for (let index = 0; index < currentIdentifiers.length; index++) {
      const styleIndex = findStyleIndex(currentIdentifiers[index]);
      if (styleRegistry[styleIndex].references === 0) {
        styleRegistry[styleIndex].updater();
        styleRegistry.splice(styleIndex, 1);
      }
    }

    currentIdentifiers = newIdentifiers;
  };
}