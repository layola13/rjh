interface URLParserModule {
  parseURL(url: string, param: unknown, basePath: string): string;
  logger(): unknown;
  stringStartsWith(str: string, prefix: string): boolean;
}

const IMAGE_EXTENSIONS_REGEX = /\.(gif|jpg|jpeg|png|svg|SVG|GIF|JPG|PNG)$/;
const RESOURCE_PREFIX = "res/";

export const urlParserModule: URLParserModule = {
  parseURL(url: string, param: unknown, basePath: string): string {
    let resourcePath = RESOURCE_PREFIX + url;
    
    if (IMAGE_EXTENSIONS_REGEX.test(url)) {
      resourcePath = basePath + url;
    }
    
    return ResourceManager.parseURL(resourcePath, param);
  },

  logger(): unknown {
    return log.logger("plugin.CommonUI");
  },

  stringStartsWith(str: string, prefix: string): boolean {
    return str.slice(0, prefix.length) === prefix;
  }
};

export default urlParserModule;