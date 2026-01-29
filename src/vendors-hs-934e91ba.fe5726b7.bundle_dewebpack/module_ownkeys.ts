function getOwnKeys<T extends object>(target: T): (string | symbol)[] {
  return Reflect.ownKeys(target);
}