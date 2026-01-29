const IE_PROTO_PATTERN = /[^.]+$/;

interface KeysObject {
  IE_PROTO?: string;
}

interface ModuleWithKeys {
  keys?: KeysObject;
}

function getSymbolSource(module: ModuleWithKeys | undefined): string {
  const match = IE_PROTO_PATTERN.exec(module?.keys?.IE_PROTO ?? "");
  return match ? `Symbol(src)_1.${match[0]}` : "";
}

const symbolSource = getSymbolSource(undefined);

export function hasSymbolSource(target: unknown): boolean {
  return !!symbolSource && symbolSource in (target as object);
}