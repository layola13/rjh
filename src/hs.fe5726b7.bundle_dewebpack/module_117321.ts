export interface MtopResponse<T = unknown> {
  data?: {
    data?: T;
    result?: T;
  };
  result?: T;
  ret: string[];
}

/**
 * Handles Mtop API response and extracts the result data.
 * 
 * @param responsePromise - Promise that resolves to an Mtop response
 * @returns The extracted data from the response
 * @throws The original response if it doesn't contain success status
 */
export async function handleMtopResult<T = unknown>(
  responsePromise: Promise<MtopResponse<T>>
): Promise<T> {
  const response = await responsePromise;

  if (response?.data && response.ret[0].includes("SUCCESS")) {
    return response.data.data ?? response.data.result ?? response.data ?? response.result;
  }

  throw response;
}