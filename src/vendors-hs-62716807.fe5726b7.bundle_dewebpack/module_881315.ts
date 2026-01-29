export default function filterDataAriaAttributes<T extends Record<string, unknown>>(
  attributes: T
): Partial<T> {
  return Object.keys(attributes).reduce((result, key) => {
    const isDataAttribute = key.startsWith('data-');
    const isAriaAttribute = key.startsWith('aria-');
    const isRoleAttribute = key === 'role';
    const isInternalDataAttribute = key.startsWith('data-__');

    if ((isDataAttribute || isAriaAttribute || isRoleAttribute) && !isInternalDataAttribute) {
      result[key as keyof T] = attributes[key];
    }

    return result;
  }, {} as Partial<T>);
}