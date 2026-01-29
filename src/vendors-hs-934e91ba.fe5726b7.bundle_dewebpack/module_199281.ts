export function defineProperty<T extends object>(
  target: T,
  property: PropertyKey,
  descriptor: PropertyDescriptor
): T | undefined {
  try {
    Object.defineProperty(target, property, descriptor);
    return target;
  } catch (error) {
    return undefined;
  }
}

export default defineProperty;