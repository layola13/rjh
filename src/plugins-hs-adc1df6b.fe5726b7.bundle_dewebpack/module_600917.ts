export function getString(key: string): string {
  return ResourceManager.getString(key) || "";
}