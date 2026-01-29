export async function query<T = unknown>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-cache"
  });
  const data = await response.json();
  return data;
}

export interface QueryImportDataParams {
  url: string;
  replaceJsonName: string;
}

export async function queryImportData<T = Record<string, unknown>>(
  params: QueryImportDataParams
): Promise<T> {
  const { url, replaceJsonName } = params;
  const targetUrl = url.substring(0, url.lastIndexOf("/")) + replaceJsonName;
  
  return query<T>(targetUrl).catch(() => {
    return {} as T;
  });
}