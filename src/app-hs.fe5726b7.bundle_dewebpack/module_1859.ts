const IE_PROTO_SYMBOL_REGEX = /[^.]+$/;

interface KeysObject {
  IE_PROTO?: string;
  [key: string]: unknown;
}

interface Module1986 {
  keys?: KeysObject;
}

function extractSymbolSuffix(module: Module1986 | undefined): string {
  if (!module?.keys?.IE_PROTO) {
    return "";
  }
  
  const match = IE_PROTO_SYMBOL_REGEX.exec(module.keys.IE_PROTO);
  return match ? `Symbol(src)_1.${match[0]}` : "";
}

const symbolSuffix = extractSymbolSuffix(undefined as Module1986 | undefined);

export function hasNativeSourceProperty(target: unknown): boolean {
  if (!symbolSuffix) {
    return false;
  }
  
  return symbolSuffix in (target as object);
}