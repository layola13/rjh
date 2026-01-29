export default function isCancel(value: unknown): boolean {
  return !!(value && typeof value === 'object' && '__CANCEL__' in value && (value as { __CANCEL__: unknown }).__CANCEL__);
}