/**
 * Style loader module for dynamic CSS injection
 * Manages stylesheet insertion, updates, and removal in the DOM
 */

/**
 * Represents the CSS content and its associated metadata
 */
interface StyleContent {
  /** The CSS string to be injected */
  css: string;
  /** Media query for the style (e.g., "screen", "print") */
  media?: string;
  /** Source map for debugging */
  sourceMap?: string | object;
  /** CSS @supports rule condition */
  supports?: string;
  /** CSS cascade layer name */
  layer?: string;
}

/**
 * Configuration options for the style loader
 */
interface StyleLoaderOptions {
  /** Base path or prefix for style identifiers */
  base?: string;
  /** Index for insertion order */
  byIndex?: number;
  /** DOM manipulation API implementation */
  domAPI: (options: StyleLoaderOptions) => StyleUpdater;
}

/**
 * Function that updates or removes styles from the DOM
 */
interface StyleUpdater {
  /** Updates the style with new content */
  update: (content: StyleContent) => void;
  /** Removes the style from the DOM */
  remove: () => void;
}

/**
 * Internal registry entry for tracking loaded styles
 */
interface StyleRegistry {
  /** Unique identifier for the style */
  identifier: string;
  /** Function to update or remove this style */
  updater: (content?: StyleContent) => void;
  /** Reference count for style reuse */
  references: number;
}

/**
 * Type for style module input - array of style tuples
 * Format: [id, css, media?, sourceMap?, supports?, layer?]
 */
type StyleModule = Array<[string, string, string?, string?, string?, string?]>;

/**
 * Global registry of all loaded styles
 */
const styleRegistry: StyleRegistry[] = [];

/**
 * Finds the index of a style in the registry by its identifier
 * @param identifier - Unique identifier for the style
 * @returns Index in the registry, or -1 if not found
 */
function findStyleIndex(identifier: string): number {
  for (let index = 0; index < styleRegistry.length; index++) {
    if (styleRegistry[index].identifier === identifier) {
      return index;
    }
  }
  return -1;
}

/**
 * Inserts or updates multiple styles in the DOM
 * @param modules - Array of style modules to insert
 * @param options - Configuration options for style insertion
 * @returns Array of identifiers for the inserted styles
 */
function insertStyles(
  modules: StyleModule,
  options: StyleLoaderOptions
): string[] {
  const identifierCount: Record<string, number> = {};
  const identifiers: string[] = [];

  for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
    const styleModule = modules[moduleIndex];
    const baseId = options.base ? styleModule[0] + options.base : styleModule[0];
    const count = identifierCount[baseId] || 0;
    const identifier = `${baseId} ${count}`;
    
    identifierCount[baseId] = count + 1;

    const existingIndex = findStyleIndex(identifier);
    const content: StyleContent = {
      css: styleModule[1],
      media: styleModule[2],
      sourceMap: styleModule[3],
      supports: styleModule[4],
      layer: styleModule[5],
    };

    if (existingIndex !== -1) {
      // Style already exists, increment references and update
      styleRegistry[existingIndex].references++;
      styleRegistry[existingIndex].updater(content);
    } else {
      // Create new style entry
      const updater = createStyleUpdater(content, options);
      options.byIndex = moduleIndex;
      styleRegistry.splice(moduleIndex, 0, {
        identifier,
        updater,
        references: 1,
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

/**
 * Creates an updater function for a specific style
 * @param content - Initial style content
 * @param options - Configuration options
 * @returns Function to update or remove the style
 */
function createStyleUpdater(
  content: StyleContent,
  options: StyleLoaderOptions
): (newContent?: StyleContent) => void {
  const domAPI = options.domAPI(options);
  domAPI.update(content);

  return function updater(newContent?: StyleContent): void {
    if (newContent) {
      // Check if content has actually changed
      if (
        newContent.css === content.css &&
        newContent.media === content.media &&
        newContent.sourceMap === content.sourceMap &&
        newContent.supports === content.supports &&
        newContent.layer === content.layer
      ) {
        return;
      }
      domAPI.update(content = newContent);
    } else {
      // No content provided, remove the style
      domAPI.remove();
    }
  };
}

/**
 * Main style loader function
 * Injects styles into the DOM and returns an update function
 * 
 * @param modules - Array of style modules to load
 * @param options - Configuration options for style loading
 * @returns Function to update the loaded styles
 * 
 * @example
 * const update = styleLoader(styles, { domAPI: myDomAPI });
 * // Later, update with new styles
 * update(newStyles);
 */
export default function styleLoader(
  modules: StyleModule = [],
  options: StyleLoaderOptions = {} as StyleLoaderOptions
): (newModules?: StyleModule) => void {
  let currentIdentifiers = insertStyles(modules, options);

  return function updateStyles(newModules: StyleModule = []): void {
    // Decrement references for old styles
    for (let index = 0; index < currentIdentifiers.length; index++) {
      const registryIndex = findStyleIndex(currentIdentifiers[index]);
      styleRegistry[registryIndex].references--;
    }

    // Insert new styles
    const newIdentifiers = insertStyles(newModules, options);

    // Remove styles with zero references
    for (let index = 0; index < currentIdentifiers.length; index++) {
      const registryIndex = findStyleIndex(currentIdentifiers[index]);
      if (styleRegistry[registryIndex].references === 0) {
        styleRegistry[registryIndex].updater();
        styleRegistry.splice(registryIndex, 1);
      }
    }

    currentIdentifiers = newIdentifiers;
  };
}