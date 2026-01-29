function getPrototypeOf(obj: unknown): unknown {
  return Object.setPrototypeOf 
    ? Object.getPrototypeOf.bind()(obj) 
    : Object.getPrototypeOf(obj);
}

export default getPrototypeOf;