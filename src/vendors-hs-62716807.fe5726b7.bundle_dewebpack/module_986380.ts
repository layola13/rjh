type CSSModule = [number | null, string, string];

interface CSSExports {
  toString(): string;
  i(modules: CSSExports | string, media?: string): void;
  map<T>(callback: (value: CSSModule, index: number, array: CSSModule[]) => T): T[];
  push(item: CSSModule): number;
  length: number;
  [index: number]: CSSModule;
}

export default function cssLoader(supportSourceMap: boolean): CSSExports {
  const modules: CSSModule[] = [];

  const exports = modules as unknown as CSSExports;

  exports.toString = function (): string {
    return this.map((module: CSSModule): string => {
      const css = module[1] ?? "";
      const sourceMap = module[3] as unknown as {
        sources: string[];
        sourceRoot: string;
      } | undefined;

      if (!sourceMap) {
        return css;
      }

      if (supportSourceMap && typeof btoa === "function") {
        const base64SourceMap = btoa(
          unescape(encodeURIComponent(JSON.stringify(sourceMap)))
        );
        const sourceMapComment = `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64SourceMap} */`;

        const sourceURLComments = sourceMap.sources.map((source: string): string => {
          return `/*# sourceURL=${sourceMap.sourceRoot}${source} */`;
        });

        return [css, ...sourceURLComments, sourceMapComment].join("\n");
      }

      return css;
    }).map((css: string, _index: number, _array: string[]): string => {
      const module = this[_index];
      const mediaQuery = module[2];

      return mediaQuery ? `@media ${mediaQuery}{${css}}` : css;
    }).join("");
  };

  exports.i = function (
    importedModules: CSSExports | string,
    mediaQuery?: string
  ): void {
    const modulesToImport: CSSModule[] =
      typeof importedModules === "string"
        ? [[null, importedModules, ""]]
        : (importedModules as unknown as CSSModule[]);

    const existingIds: Record<number, boolean> = {};

    for (let i = 0; i < this.length; i++) {
      const id = this[i][0];
      if (typeof id === "number") {
        existingIds[id] = true;
      }
    }

    for (let i = 0; i < modulesToImport.length; i++) {
      const module = modulesToImport[i];
      const moduleId = module[0];

      if (typeof moduleId === "number" && existingIds[moduleId]) {
        continue;
      }

      if (mediaQuery) {
        if (!module[2]) {
          module[2] = mediaQuery;
        } else {
          module[2] = `(${module[2]}) and (${mediaQuery})`;
        }
      }

      modules.push(module);
    }
  };

  return exports;
}