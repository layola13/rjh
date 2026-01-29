import has from './module_4736';
import hasPath from './module_8175';

export default function(target: unknown, path: PropertyKey | PropertyKey[]): boolean {
  return target != null && hasPath(target, path, has);
}