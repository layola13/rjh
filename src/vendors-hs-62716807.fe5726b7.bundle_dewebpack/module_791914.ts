function hasOwn(target: object, property: PropertyKey): boolean {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const bindHasOwnProperty = hasOwnProperty.call.bind(hasOwnProperty);
  
  if (Object.hasOwn) {
    return Object.hasOwn(target, property);
  }
  
  const targetObject = Object(target);
  return bindHasOwnProperty(targetObject, property);
}

export default hasOwn;