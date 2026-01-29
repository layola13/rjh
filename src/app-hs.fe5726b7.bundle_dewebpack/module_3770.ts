import debounce from './module_2378';

export default function<T extends (...args: any[]) => any>(func: T): T {
  return debounce(func, 4);
}