export function joinPaths(basePath: string, relativePath?: string): string {
  return relativePath 
    ? basePath.replace(/\/+$/, "") + "/" + relativePath.replace(/^\/+/, "") 
    : basePath;
}