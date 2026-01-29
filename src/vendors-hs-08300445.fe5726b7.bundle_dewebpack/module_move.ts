function moveItem(sourceIndex: number, targetIndex: number): void {
  if (sourceIndex === targetIndex) {
    return;
  }

  const items = getCurrentItems();
  
  const isSourceIndexValid = sourceIndex >= 0 && sourceIndex < items.length;
  const isTargetIndexValid = targetIndex >= 0 && targetIndex < items.length;
  
  if (!isSourceIndexValid || !isTargetIndexValid) {
    return;
  }

  const movedKeys = moveArrayElement(state.keys, sourceIndex, targetIndex);
  state.keys = movedKeys;
  
  const movedItems = moveArrayElement(items, sourceIndex, targetIndex);
  updateItems(movedItems);
}

function moveArrayElement<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array];
  const [element] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, element);
  return result;
}

function getCurrentItems(): unknown[] {
  // Implementation depends on the actual data structure
  return [];
}

function updateItems(items: unknown[]): void {
  // Implementation depends on the actual update mechanism
}

const state: { keys: unknown[] } = {
  keys: []
};