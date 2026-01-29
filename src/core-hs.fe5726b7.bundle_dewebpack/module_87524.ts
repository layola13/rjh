export default function testThrows(fn: () => unknown): boolean {
  try {
    fn();
    return false;
  } catch {
    return true;
  }
}