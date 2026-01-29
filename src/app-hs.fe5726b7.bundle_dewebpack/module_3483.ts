import * as utils from './utils';

interface SerializeOptions {
  (params: unknown): string;
}

function encode(value: string): string {
  return encodeURIComponent(value)
    .replace(/%40/gi, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

/**
 * Build a URL by appending params to the end
 *
 * @param url - The base URL
 * @param params - The params to be appended
 * @param paramsSerializer - Optional function to serialize params
 * @returns The formatted URL
 */
export default function buildURL(
  url: string,
  params?: unknown,
  paramsSerializer?: SerializeOptions
): string {
  if (!params) {
    return url;
  }

  let serializedParams: string;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    const parts: string[] = [];

    utils.forEach(params, (value: unknown, key: string) => {
      if (value === null || value === undefined) {
        return;
      }

      let values: unknown[];
      let paramKey = key;

      if (utils.isArray(value)) {
        values = value as unknown[];
        paramKey += "[]";
      } else {
        values = [value];
      }

      utils.forEach(values, (val: unknown) => {
        let serializedValue: string;

        if (utils.isDate(val)) {
          serializedValue = (val as Date).toISOString();
        } else if (utils.isObject(val)) {
          serializedValue = JSON.stringify(val);
        } else {
          serializedValue = val as string;
        }

        parts.push(`${encode(paramKey)}=${encode(serializedValue)}`);
      });
    });

    serializedParams = parts.join("&");
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    const separator = url.indexOf("?") === -1 ? "?" : "&";
    url += separator + serializedParams;
  }

  return url;
}