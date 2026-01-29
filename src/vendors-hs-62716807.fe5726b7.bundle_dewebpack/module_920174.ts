export default function toString(value: unknown): string {
  try {
    return String(value);
  } catch {
    return "Object";
  }
}