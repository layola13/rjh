import createGenerator from './643730';
import GeneratorWrapper from './467170';

export default function createWrappedGenerator<T>(
  e: unknown,
  t: unknown,
  r: unknown,
  o: unknown,
  u?: PromiseConstructor
): GeneratorWrapper<T> {
  return new GeneratorWrapper<T>(createGenerator().w(e, t, r, o), u || Promise);
}