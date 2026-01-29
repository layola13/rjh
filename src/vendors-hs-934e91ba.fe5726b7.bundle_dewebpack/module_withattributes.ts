function withAttributes<T extends Record<string, unknown>>(attributes: T): unknown {
  return createConverter(this.converter, {
    ...this.attributes,
    ...attributes
  });
}

function createConverter(converter: unknown, mergedAttributes: Record<string, unknown>): unknown {
  // Implementation depends on converter type
  return converter;
}