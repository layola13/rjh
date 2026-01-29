import * as utils from './utils';

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

type ParamsSerializer = (params: unknown) => string;

export default function buildURL(
  url: string,
  params: unknown,
  paramsSerializer?: ParamsSerializer
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

      let normalizedKey = key;
      let values: unknown[];

      if (utils.isArray(value)) {
        normalizedKey += "[]";
        values = value;
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

        parts.push(encode(normalizedKey) + "=" + encode(serializedValue));
      });
    });

    serializedParams = parts.join("&");
  }

  if (serializedParams) {
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex);
    }

    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }

  return url;
}