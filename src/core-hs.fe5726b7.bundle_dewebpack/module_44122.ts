const PROPER = getProperFlag();
const defineMethod = defineBuiltInMethod();
const requireObjectCoercible = requireObjectCoercibleFunction();
const getRegExpFlags = getRegExpFlagsFunction();
const fails = failsFunction();

const METHOD_NAME = "toString";
const nativeToString = RegExp.prototype[METHOD_NAME];

const INCORRECT_NATIVE_BEHAVIOR = fails(function(): boolean {
  return "/a/b" !== nativeToString.call({
    source: "a",
    flags: "b"
  });
});

const IMPROPER_NAME = PROPER && nativeToString.name !== METHOD_NAME;

if (INCORRECT_NATIVE_BEHAVIOR || IMPROPER_NAME) {
  defineMethod(
    RegExp.prototype,
    METHOD_NAME,
    function toString(this: RegExp): string {
      const regexp = requireObjectCoercible(this);
      const source = String(regexp.source);
      const flags = String(getRegExpFlags(regexp));
      return "/" + source + "/" + flags;
    },
    { unsafe: true }
  );
}

function getProperFlag(): boolean {
  // Implementation needed based on module 45193
  throw new Error("Implementation required");
}

function defineBuiltInMethod(): (
  target: object,
  key: string,
  value: Function,
  options: { unsafe: boolean }
) => void {
  // Implementation needed based on module 13327
  throw new Error("Implementation required");
}

function requireObjectCoercibleFunction(): (value: unknown) => RegExp {
  // Implementation needed based on module 77064
  throw new Error("Implementation required");
}

function getRegExpFlagsFunction(): (regexp: RegExp) => string {
  // Implementation needed based on module 85311
  throw new Error("Implementation required");
}

function failsFunction(): (callback: () => boolean) => boolean {
  // Implementation needed based on module 87524
  throw new Error("Implementation required");
}