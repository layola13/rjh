const toStringTag: unique symbol = Symbol.toStringTag;

interface ObjectWithTag {
  [toStringTag]: string;
}

const testObject: ObjectWithTag = {} as ObjectWithTag;
testObject[toStringTag] = "z";

export const supportsToStringTag: boolean = "[object z]" === String(testObject);