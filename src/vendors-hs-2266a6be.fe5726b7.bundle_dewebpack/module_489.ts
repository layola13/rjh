export function getQueryStrings(queryString: string): Record<string, string> {
  const result: Record<string, string> = {};
  
  queryString
    .replace("?", "")
    .split("&")
    .forEach((pair) => {
      const parts = pair.split("=");
      if (parts.length === 2) {
        result[parts[0]] = decodeURIComponent(parts[1].replace(/\+/g, "%20"));
      }
    });
  
  return result;
}