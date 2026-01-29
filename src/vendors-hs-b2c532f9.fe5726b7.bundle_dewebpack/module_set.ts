function setModuleProperty<T>(this: T, propertyName: string, value: unknown): T {
  ModuleRegistry.remove(this, true);
  (this as Record<string, unknown>)[`_${propertyName}`] = value;
  ModuleRegistry.push(this);
  return this;
}