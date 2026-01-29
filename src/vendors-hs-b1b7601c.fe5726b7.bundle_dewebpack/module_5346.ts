const NATIVE_KEYS_SHIM = /[^.]+$/.exec(
  (typeof IE_PROTO !== 'undefined' && IE_PROTO) || ""
);

const symbolSrc: string = NATIVE_KEYS_SHIM 
  ? `Symbol(src)_1.${NATIVE_KEYS_SHIM}` 
  : "";

export function isMasked(value: unknown): boolean {
  return !!symbolSrc && symbolSrc in (value as object);
}