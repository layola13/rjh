export interface CSSModule {
  [id: number]: [number | null, string, string];
}

export interface CSSModuleList extends Array<[number | null, string, string]> {
  toString(): string;
  i(modules: CSSModuleList | string, media?: string): void;
}

export default function cssLoader(supportSourceMap: boolean): CSSModuleList {
  const list: CSSModuleList = [] as any;

  list.toString = function(): string {
    return this.map((item) => {
      const content = generateContent(item, supportSourceMap);
      return item[2] ? `@media ${item[2]}{${content}}` : content;
    }).join("");
  };

  list.i = function(modules: CSSModuleList | string, media?: string): void {
    if (typeof modules === "string") {
      modules = [[null, modules, ""]];
    }

    const existingIds: Record<number, boolean> = {};
    
    for (let index = 0; index < this.length; index++) {
      const id = this[index][0];
      if (typeof id === "number") {
        existingIds[id] = true;
      }
    }

    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      
      if (typeof module[0] === "number" && existingIds[module[0]]) {
        continue;
      }

      if (media) {
        if (!module[2]) {
          module[2] = media;
        } else {
          module[2] = `(${module[2]}) and (${media})`;
        }
      }
      
      list.push(module);
    }
  };

  return list;
}

function generateContent(
  module: [number | null, string, string],
  supportSourceMap: boolean
): string {
  const content = module[1] || "";
  const sourceMap = module[3] as any;

  if (!sourceMap) {
    return content;
  }

  if (supportSourceMap && typeof btoa === "function") {
    const base64SourceMap = btoa(
      unescape(encodeURIComponent(JSON.stringify(sourceMap)))
    );
    const sourceMapComment = `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64SourceMap} */`;
    
    const sourceURLComments = sourceMap.sources.map((source: string) => {
      return `/*# sourceURL=${sourceMap.sourceRoot}${source} */`;
    });

    return [content, ...sourceURLComments, sourceMapComment].join("\n");
  }

  return [content].join("\n");
}