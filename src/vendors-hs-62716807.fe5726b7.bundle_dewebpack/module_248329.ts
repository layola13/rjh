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

const isStandardBrowserEnv = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isOriginSameAsCurrentLocation = isStandardBrowserEnv()
  ? (() => {
      const isIEOrTrident = /(msie|trident)/i.test(navigator.userAgent);
      const anchorElement = document.createElement('a');

      const parseURL = (url: string): ParsedURL => {
        let resolvedURL = url;

        if (isIEOrTrident) {
          anchorElement.setAttribute('href', resolvedURL);
          resolvedURL = anchorElement.href;
        }

        anchorElement.setAttribute('href', resolvedURL);

        return {
          href: anchorElement.href,
          protocol: anchorElement.protocol
            ? anchorElement.protocol.replace(/:$/, '')
            : '',
          host: anchorElement.host,
          search: anchorElement.search
            ? anchorElement.search.replace(/^\?/, '')
            : '',
          hash: anchorElement.hash
            ? anchorElement.hash.replace(/^#/, '')
            : '',
          hostname: anchorElement.hostname,
          port: anchorElement.port,
          pathname:
            anchorElement.pathname.charAt(0) === '/'
              ? anchorElement.pathname
              : `/${anchorElement.pathname}`,
        };
      };

      const currentOrigin = parseURL(window.location.href);

      return (url: string | ParsedURL): boolean => {
        const targetURL = isString(url) ? parseURL(url) : url;
        return (
          targetURL.protocol === currentOrigin.protocol &&
          targetURL.host === currentOrigin.host
        );
      };
    })()
  : (): boolean => {
      return true;
    };

export default isOriginSameAsCurrentLocation;