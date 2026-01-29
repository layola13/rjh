function add(element: unknown, position: number): void {
  const currentItems = getItems();
  
  if (position >= 0 && position <= currentItems.length) {
    state.keys = [
      ...state.keys.slice(0, position),
      state.id,
      ...state.keys.slice(position)
    ];
    
    setItems([
      ...currentItems.slice(0, position),
      element,
      ...currentItems.slice(position)
    ]);
  } else {
    state.keys = [...state.keys, state.id];
    setItems([...currentItems, element]);
  }
  
  state.id += 1;
}