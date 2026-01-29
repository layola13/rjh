function moduleHas(element: unknown): boolean {
  if (isObject(element) && !isPrimitive(element)) {
    const state = getState(this);
    
    if (!state.frozen) {
      state.frozen = new FrozenMap();
    }
    
    return hasOwn(this, element) || state.frozen.has(element);
  }
  
  return hasOwn(this, element);
}