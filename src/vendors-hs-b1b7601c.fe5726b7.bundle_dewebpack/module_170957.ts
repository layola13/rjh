const randomValuesCache: ((array: Uint8Array) => Uint8Array) | null = null;

const buffer = new Uint8Array(16);

export default function getRandomValues(): Uint8Array {
  let getRandomValuesFn = randomValuesCache;
  
  if (!getRandomValuesFn) {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      getRandomValuesFn = crypto.getRandomValues.bind(crypto);
    } else {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    }
  }
  
  return getRandomValuesFn(buffer);
}