import defineProperty from './module_316080';
import { f as definePropertyDescriptor } from './module_656378';
import createPropertyDescriptor from './module_175931';

export default function createOrDefineProperty<T extends object>(
  target: T,
  key: PropertyKey,
  value: unknown
): void {
  const propertyKey = defineProperty(key);
  
  if (propertyKey in target) {
    definePropertyDescriptor(target, propertyKey, createPropertyDescriptor(0, value));
  } else {
    (target as Record<PropertyKey, unknown>)[propertyKey] = value;
  }
}