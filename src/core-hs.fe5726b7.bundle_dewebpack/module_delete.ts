function deleteItem<T>(element: T): boolean {
  if (isPrimitive(element) && !isSymbol(element)) {
    const state = getInternalState(this);
    
    if (!state.frozen) {
      state.frozen = new FrozenMap();
    }
    
    return deleteProperty(this, element) || state.frozen.delete(element);
  }
  
  return deleteProperty(this, element);
}