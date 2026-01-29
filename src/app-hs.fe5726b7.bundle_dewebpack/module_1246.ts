export function createError(
  message: string,
  config: unknown,
  code: string | undefined,
  request: unknown,
  response: unknown
): Error {
  const error = new Error(message);
  return enhanceError(error, config, code, request, response);
}

function enhanceError(
  error: Error,
  config: unknown,
  code: string | undefined,
  request: unknown,
  response: unknown
): Error {
  // Implementation depends on module 7850
  // Placeholder - requires the actual enhanceError implementation
  Object.assign(error, { config, code, request, response });
  return error;
}