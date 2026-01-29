function executeModule(
  moduleId: string,
  context: unknown,
  config: unknown,
  options: unknown
): void {
  const module = ht[moduleId];
  const processedContext = lt(context);
  const processedConfig = dt(config);
  
  module(processedContext, processedConfig, null, options);
}