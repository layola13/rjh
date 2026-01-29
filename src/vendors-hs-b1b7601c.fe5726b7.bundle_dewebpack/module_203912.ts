import validator from './validator';

export default function isValidString(value: unknown): value is string {
  return typeof value === 'string' && validator.test(value);
}