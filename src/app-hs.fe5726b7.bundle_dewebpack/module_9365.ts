interface ParsedURL {
  href: string;
  protocol: string;
  host: string;
  search: string;
  hash: string;
  hostname: string;
  port: string;
  pathname: string;
}

interface Utils {
  isStandardBrowserEnv(): boolean;
  isString(value: unknown): value is string;
}

const utils: Utils = require('./utils'); // Assuming utils module path

const isURLSameOrigin: (url: string | ParsedURL) => boolean = utils.isStandardBrowserEnv()
  ? ((): ((url: string | ParsedURL) => boolean) => {
      const isInternetExplorer = /(msie|trident)/i.test(navigator.userAgent);
      const anchorElement = document.createElement('a');
      
      function parseURL(url: string): ParsedURL {
        let normalizedURL = url;
        
        if (isInternetExplorer) {
          anchorElement.setAttribute('href', normalizedURL);
          normalizedURL = anchorElement.href;
        }
        
        anchorElement.setAttribute('href', normalizedURL);
        
        return {
          href: anchorElement.href,
          protocol: anchorElement.protocol ? anchorElement.protocol.replace(/:$/, '') : '',
          host: anchorElement.host,
          search: anchorElement.search ? anchorElement.search.replace(/^\?/, '') : '',
          hash: anchorElement.hash ? anchorElement.hash.replace(/^#/, '') : '',
          hostname: anchorElement.hostname,
          port: anchorElement.port,
          pathname: anchorElement.pathname.charAt(0) === '/' 
            ? anchorElement.pathname 
            : '/' + anchorElement.pathname
        };
      }
      
      const currentOrigin = parseURL(window.location.href);
      
      return (url: string | ParsedURL): boolean => {
        const targetURL = utils.isString(url) ? parseURL(url) : url;
        return targetURL.protocol === currentOrigin.protocol && targetURL.host === currentOrigin.host;
      };
    })()
  : (): boolean => {
      return true;
    };

export default isURLSameOrigin;