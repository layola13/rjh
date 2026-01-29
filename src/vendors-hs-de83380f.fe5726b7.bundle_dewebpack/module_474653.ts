function getPrototypeOf<T>(target: T): object | null {
  return Object.setPrototypeOf 
    ? Object.getPrototypeOf.bind()(target) 
    : Object.getPrototypeOf(target);
}

export default getPrototypeOf;