interface Config {
  validateStatus?: (status: number) => boolean;
}

interface ResponseData {
  status: number;
  config: Config;
  request?: unknown;
}

type ResolveCallback = (response: ResponseData) => void;
type RejectCallback = (error: Error) => void;

export function settleResponse(
  resolve: ResolveCallback,
  reject: RejectCallback,
  response: ResponseData
): void {
  const validateStatus = response.config.validateStatus;
  
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    const error = createError(
      `Request failed with status code ${response.status}`,
      response.config,
      null,
      response.request,
      response
    );
    reject(error);
  }
}

function createError(
  message: string,
  config: Config,
  code: string | null,
  request: unknown,
  response: ResponseData
): Error {
  const error = new Error(message);
  Object.assign(error, { config, code, request, response });
  return error;
}