interface LinkedNode<K, V> {
  key: K;
  next: LinkedNode<K, V> | undefined;
  value: V;
}

let headNode: LinkedNode<unknown, unknown> | undefined;

function findNode<K, V>(
  node: LinkedNode<K, V> | undefined,
  key: K
): LinkedNode<K, V> | undefined {
  let current = node;
  while (current !== undefined) {
    if (current.key === key) {
      return current;
    }
    current = current.next as LinkedNode<K, V> | undefined;
  }
  return undefined;
}

function setNodeValue<K, V>(
  node: LinkedNode<K, V> | undefined,
  key: K,
  value: V
): void {
  if (!node) {
    headNode = {
      next: undefined
    } as LinkedNode<K, V>;
    node = headNode as LinkedNode<K, V>;
  }

  const existingNode = findNode(node, key);
  
  if (existingNode) {
    existingNode.value = value;
  } else {
    node.next = {
      key,
      next: node.next as LinkedNode<K, V> | undefined,
      value
    };
  }
}