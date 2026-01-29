type CSSModule = [
  id: string | null,
  content: string,
  media?: string,
  sourceMap?: unknown,
  supports?: string,
  layer?: string
];

interface CSSModuleList extends Array<CSSModule> {
  toString(): string;
  i(
    modules: CSSModuleList | string,
    mediaQuery?: string,
    dedupe?: boolean,
    supportsQuery?: string,
    layer?: string
  ): void;
}

export default function cssWithMappingToString(
  moduleToString: (module: CSSModule) => string
): CSSModuleList {
  const list: CSSModuleList = [] as unknown as CSSModuleList;

  list.toString = function (): string {
    return this.map((module) => {
      let css = "";
      const hasLayer = module[5] !== undefined;

      if (module[4]) {
        css += `@supports (${module[4]}) {\n`;
      }

      if (module[2]) {
        css += `@media ${module[2]} {\n`;
      }

      if (hasLayer) {
        css += `@layer${module[5].length > 0 ? ` ${module[5]}` : ""} {\n`;
      }

      css += moduleToString(module);

      if (hasLayer) {
        css += "\n}";
      }

      if (module[2]) {
        css += "\n}";
      }

      if (module[4]) {
        css += "\n}";
      }

      return css;
    }).join("");
  };

  list.i = function (
    modules: CSSModuleList | string,
    mediaQuery?: string,
    dedupe?: boolean,
    supportsQuery?: string,
    layer?: string
  ): void {
    const normalizedModules: CSSModuleList =
      typeof modules === "string"
        ? ([[null, modules, undefined]] as unknown as CSSModuleList)
        : modules;

    const alreadyImportedModules: Record<string, boolean> = {};

    if (dedupe) {
      for (let i = 0; i < this.length; i++) {
        const id = this[i][0];
        if (id !== null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (let i = 0; i < normalizedModules.length; i++) {
      const item: CSSModule = [...normalizedModules[i]];

      if (dedupe && alreadyImportedModules[item[0] as string]) {
        continue;
      }

      if (layer !== undefined) {
        if (item[5] === undefined) {
          item[5] = layer;
        } else {
          item[1] = `@layer${item[5].length > 0 ? ` ${item[5]}` : ""} {\n${item[1]}\n}`;
          item[5] = layer;
        }
      }

      if (mediaQuery) {
        if (item[2]) {
          item[1] = `@media ${item[2]} {\n${item[1]}\n}`;
          item[2] = mediaQuery;
        } else {
          item[2] = mediaQuery;
        }
      }

      if (supportsQuery) {
        if (item[4]) {
          item[1] = `@supports (${item[4]}) {\n${item[1]}\n}`;
          item[4] = supportsQuery;
        } else {
          item[4] = supportsQuery;
        }
      }

      this.push(item);
    }
  };

  return list;
}