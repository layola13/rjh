import has from './module_742948';
import hasPath from './module_411483';

export default function(target: unknown, path: unknown): boolean {
  return target != null && hasPath(target, path, has);
}