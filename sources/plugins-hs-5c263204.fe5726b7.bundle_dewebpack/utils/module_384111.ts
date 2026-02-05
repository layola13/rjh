// @ts-nocheck
export function stringStartsWith(str: string, prefix: string): boolean {
  return str.slice(0, prefix.length) === prefix;
}

export function getAssetId(): string {
  return HSApp.App.getApp().designMetadata.get("designId");
}