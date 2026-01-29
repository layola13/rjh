const symbolToStringTag: unique symbol = Symbol.toStringTag;

interface TaggedObject {
  readonly [symbolToStringTag]: string;
}

const testObject: TaggedObject = {
  [symbolToStringTag]: "z"
};

export const supportsToStringTag: boolean = "[object z]" === String(testObject);