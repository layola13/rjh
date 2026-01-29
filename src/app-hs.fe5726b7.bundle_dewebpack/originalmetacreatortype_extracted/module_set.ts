function logReadonlyFieldError(fieldName: string): void {
  console.error(`trying to assign value to a readonly field: ${fieldName}`);
}