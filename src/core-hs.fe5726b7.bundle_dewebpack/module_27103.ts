function deleteProperty<T extends object>(target: T, property: PropertyKey): void {
  if (!delete (target as any)[property]) {
    throw new TypeError(
      `Cannot delete property ${String(property)} of ${String(target)}`
    );
  }
}

export default deleteProperty;