interface Record<T> {
  __ownerID?: unknown;
  set<K extends keyof T>(key: K, value: T[K]): this;
}

function setOnRecord<T, K extends keyof T>(
  this: Record<T>,
  key: K,
  value: T[K]
): void {
  validateOwnership(
    this.__ownerID,
    "Cannot set on an immutable record."
  );
  this.set(key, value);
}

function validateOwnership(
  ownerID: unknown,
  errorMessage: string
): void {
  if (!ownerID) {
    throw new Error(errorMessage);
  }
}