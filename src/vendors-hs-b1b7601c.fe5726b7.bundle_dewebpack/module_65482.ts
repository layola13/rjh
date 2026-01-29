const randomBytesCache = new Uint8Array(16);

let cachedRandomValuesFunction: ((array: Uint8Array) => Uint8Array) | null = null;

export default function getRandomValues(): Uint8Array {
    if (!cachedRandomValuesFunction) {
        if (typeof crypto !== "undefined" && crypto.getRandomValues) {
            cachedRandomValuesFunction = crypto.getRandomValues.bind(crypto);
        } else if (typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function") {
            cachedRandomValuesFunction = msCrypto.getRandomValues.bind(msCrypto);
        } else {
            throw new Error(
                "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
            );
        }
    }
    
    return cachedRandomValuesFunction(randomBytesCache);
}