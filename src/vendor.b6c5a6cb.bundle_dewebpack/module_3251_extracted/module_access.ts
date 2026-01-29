function moduleAccess<T>(
  key: string,
  valueOrCallback?: T | string,
  optionalValue?: T
): T | string | undefined {
  if (
    valueOrCallback === undefined ||
    (valueOrCallback && typeof valueOrCallback === "string" && optionalValue === undefined)
  ) {
    return this.get(key, valueOrCallback);
  }

  this.set(key, valueOrCallback, optionalValue);
  return optionalValue !== undefined ? optionalValue : valueOrCallback;
}