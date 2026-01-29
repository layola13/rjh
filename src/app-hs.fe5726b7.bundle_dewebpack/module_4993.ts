const utils = {
  forEach: (array: string[], callback: (item: string) => void) => {
    array.forEach(callback);
  },
  trim: (str: string) => str.trim()
};

const IGNORED_DUPLICATE_HEADERS: readonly string[] = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];

interface ParsedHeaders {
  [key: string]: string | string[];
}

/**
 * Parse HTTP headers from a raw header string
 * @param rawHeaders - Raw header string with newline-separated headers
 * @returns Parsed headers object
 */
export default function parseHeaders(rawHeaders: string): ParsedHeaders {
  const headers: ParsedHeaders = {};

  if (!rawHeaders) {
    return headers;
  }

  utils.forEach(rawHeaders.split("\n"), (line: string) => {
    const colonIndex: number = line.indexOf(":");
    const headerName: string = utils.trim(line.substr(0, colonIndex)).toLowerCase();
    const headerValue: string = utils.trim(line.substr(colonIndex + 1));

    if (!headerName) {
      return;
    }

    if (headers[headerName] && IGNORED_DUPLICATE_HEADERS.indexOf(headerName) >= 0) {
      return;
    }

    if (headerName === "set-cookie") {
      const existingCookies = headers[headerName] as string[] | undefined;
      headers[headerName] = (existingCookies ?? []).concat([headerValue]);
    } else {
      const existingValue = headers[headerName] as string | undefined;
      headers[headerName] = existingValue ? `${existingValue}, ${headerValue}` : headerValue;
    }
  });

  return headers;
}