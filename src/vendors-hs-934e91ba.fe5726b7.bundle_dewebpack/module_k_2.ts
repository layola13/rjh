function initializeModule<T extends Error>(
  error: T,
  config: unknown,
  options: unknown
): T {
  throw new IA(error).init(config, options);
}