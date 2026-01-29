const getOwnPropertySymbols = Object.getOwnPropertySymbols;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

function shouldUseNative(): boolean {
  try {
    if (!Object.assign) {
      return false;
    }

    const testString = new String("abc");
    (testString as any)[5] = "de";
    
    if (Object.getOwnPropertyNames(testString)[0] === "5") {
      return false;
    }

    const testObj: Record<string, number> = {};
    for (let i = 0; i < 10; i++) {
      testObj["_" + String.fromCharCode(i)] = i;
    }

    if (
      Object.getOwnPropertyNames(testObj)
        .map((key) => testObj[key])
        .join("") !== "0123456789"
    ) {
      return false;
    }

    const alphabetObj: Record<string, string> = {};
    "abcdefghijklmnopqrst".split("").forEach((letter) => {
      alphabetObj[letter] = letter;
    });

    return (
      Object.keys(Object.assign({}, alphabetObj)).join("") ===
      "abcdefghijklmnopqrst"
    );
  } catch (err) {
    return false;
  }
}

function toObject(value: any): object {
  if (value == null) {
    throw new TypeError(
      "Object.assign cannot be called with null or undefined"
    );
  }
  return Object(value);
}

function objectAssignPolyfill<T extends object>(
  target: T,
  ...sources: any[]
): T {
  let output = toObject(target);

  for (let index = 1; index < arguments.length; index++) {
    const source = Object(arguments[index]);

    for (const key in source) {
      if (hasOwnProperty.call(source, key)) {
        (output as any)[key] = source[key];
      }
    }

    if (getOwnPropertySymbols) {
      const symbols = getOwnPropertySymbols(source);
      for (let i = 0; i < symbols.length; i++) {
        if (propertyIsEnumerable.call(source, symbols[i])) {
          (output as any)[symbols[i]] = source[symbols[i]];
        }
      }
    }
  }

  return output;
}

export default shouldUseNative() ? Object.assign : objectAssignPolyfill;