export default function contains(container: Node | null | undefined, target: Node | null | undefined): boolean {
  if (!container) return false;
  
  if ('contains' in container && typeof container.contains === 'function') {
    return container.contains(target);
  }
  
  let currentNode = target;
  while (currentNode) {
    if (currentNode === container) return true;
    currentNode = currentNode.parentNode;
  }
  
  return false;
}