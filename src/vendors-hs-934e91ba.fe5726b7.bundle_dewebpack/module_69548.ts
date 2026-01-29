import throttle from './throttle';

export default function<T extends (...args: any[]) => any>(fn: T): T {
  return throttle(fn, 5);
}