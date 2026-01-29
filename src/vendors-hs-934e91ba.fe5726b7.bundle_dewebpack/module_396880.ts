import hyphenate from './module_778427';

interface MediaQueryObject {
  [key: string]: string | number | boolean;
}

type MediaQueryInput = string | MediaQueryObject | MediaQueryObject[];

function isHeightOrWidth(property: string): boolean {
  return /[height|width]$/.test(property);
}

function buildMediaQueryFromObject(queryObject: MediaQueryObject): string {
  let result = "";
  const keys = Object.keys(queryObject);
  
  keys.forEach((key, index) => {
    let value = queryObject[key];
    let hyphenatedKey = hyphenate(key);
    
    if (isHeightOrWidth(hyphenatedKey) && typeof value === "number") {
      value += "px";
    }
    
    if (value === true) {
      result += hyphenatedKey;
    } else if (value === false) {
      result += `not ${hyphenatedKey}`;
    } else {
      result += `(${hyphenatedKey}: ${value})`;
    }
    
    if (index < keys.length - 1) {
      result += " and ";
    }
  });
  
  return result;
}

export default function buildMediaQuery(input: MediaQueryInput): string {
  if (typeof input === "string") {
    return input;
  }
  
  if (Array.isArray(input)) {
    let result = "";
    input.forEach((queryObject, index) => {
      result += buildMediaQueryFromObject(queryObject);
      if (index < input.length - 1) {
        result += ", ";
      }
    });
    return result;
  }
  
  return buildMediaQueryFromObject(input);
}