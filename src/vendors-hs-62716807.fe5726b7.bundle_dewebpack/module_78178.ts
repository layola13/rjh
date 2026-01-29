interface ErrorDetails {
  config?: unknown;
  code?: string;
  request?: unknown;
  response?: unknown;
}

function enhanceError(
  error: Error,
  config?: unknown,
  code?: string,
  request?: unknown,
  response?: unknown
): Error & ErrorDetails {
  const enhancedError = error as Error & ErrorDetails;
  
  if (config !== undefined) {
    enhancedError.config = config;
  }
  
  if (code !== undefined) {
    enhancedError.code = code;
  }
  
  if (request !== undefined) {
    enhancedError.request = request;
  }
  
  if (response !== undefined) {
    enhancedError.response = response;
  }
  
  return enhancedError;
}

export function createError(
  message: string,
  config?: unknown,
  code?: string,
  request?: unknown,
  response?: unknown
): Error & ErrorDetails {
  const error = new Error(message);
  return enhanceError(error, config, code, request, response);
}

export default createError;