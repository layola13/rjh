export default function has<T>(this: T, key: PropertyKey): boolean {
  const r = require('./module_500812').default;
  return r(this, key).has(key);
}