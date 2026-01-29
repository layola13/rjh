import defineProperty from './module_66484';
import createPropertyDescriptor from './module_34769';
import toPropertyKey from './module_83246';

export default function setProperty<T extends object>(
  target: T,
  key: PropertyKey,
  value: unknown
): void {
  const propertyKey = toPropertyKey(key);
  
  if (propertyKey in target) {
    defineProperty.f(target, propertyKey, createPropertyDescriptor(0, value));
  } else {
    (target as Record<PropertyKey, unknown>)[propertyKey] = value;
  }
}