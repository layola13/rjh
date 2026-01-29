function values<T extends object>(obj: T): Array<T[keyof T]> {
  return obj == null ? [] : Object.keys(obj).map(key => obj[key as keyof T]);
}

export default values;