import * as utils from './utils';

const SIMPLE_HEADERS: readonly string[] = [
  'age',
  'authorization',
  'content-length',
  'content-type',
  'etag',
  'expires',
  'from',
  'host',
  'if-modified-since',
  'if-unmodified-since',
  'last-modified',
  'location',
  'max-forwards',
  'proxy-authorization',
  'referer',
  'retry-after',
  'user-agent'
];

interface ParsedHeaders {
  [key: string]: string | string[];
}

/**
 * Parse HTTP headers from a raw header string
 * @param headersString - Raw HTTP headers string with newline-separated headers
 * @returns Parsed headers object
 */
export default function parseHeaders(headersString?: string | null): ParsedHeaders {
  const parsed: ParsedHeaders = {};

  if (!headersString) {
    return parsed;
  }

  utils.forEach(headersString.split('\n'), (line: string) => {
    const separatorIndex: number = line.indexOf(':');
    const headerName: string = utils.trim(line.substr(0, separatorIndex)).toLowerCase();
    const headerValue: string = utils.trim(line.substr(separatorIndex + 1));

    if (!headerName) {
      return;
    }

    if (parsed[headerName] && SIMPLE_HEADERS.indexOf(headerName) >= 0) {
      return;
    }

    if (headerName === 'set-cookie') {
      const existingValue = parsed[headerName];
      parsed[headerName] = existingValue 
        ? (Array.isArray(existingValue) ? existingValue : [existingValue]).concat([headerValue])
        : [headerValue];
    } else {
      parsed[headerName] = parsed[headerName] 
        ? `${parsed[headerName]}, ${headerValue}` 
        : headerValue;
    }
  });

  return parsed;
}