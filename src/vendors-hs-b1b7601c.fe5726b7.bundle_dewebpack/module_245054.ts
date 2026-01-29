import { popScheduler } from './popScheduler';
import { from } from './from';

export function of<T>(...args: T[]): ReturnType<typeof from> {
  const scheduler = popScheduler(args);
  return from(args, scheduler);
}