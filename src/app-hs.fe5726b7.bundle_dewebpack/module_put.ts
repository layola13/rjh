export const put = <T>(target: T, index: number, value: unknown): void => {
  if (Array.isArray(target)) {
    target[index] = value as T[number];
  } else if (typeof target === 'object' && target !== null) {
    (target as Record<number, unknown>)[index] = value;
  }
};