import n from './module_9428';
import s from './module_9831';

export default function getModuleResult<T>(module: unknown, target: unknown): T | undefined {
  const result = s(module, target);
  return n(result) ? result : undefined;
}