import { has } from './module_68801';

export function validateAndReturn<T>(value: T): T {
  has(value);
  return value;
}

export default validateAndReturn;