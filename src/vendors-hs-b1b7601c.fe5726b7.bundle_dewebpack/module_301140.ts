export function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return (
    value != null &&
    typeof (value as any).length === "number" &&
    typeof value !== "function"
  );
}