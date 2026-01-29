import { combineLatest } from './combineLatest';
import { joinAllInternals } from './joinAllInternals';

export function combineLatestAll<T>(project?: (values: T[]) => any): any {
  return joinAllInternals(combineLatest, project);
}