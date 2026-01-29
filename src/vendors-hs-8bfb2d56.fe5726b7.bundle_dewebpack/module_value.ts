function iterateAndProcess<T>(
  this: LinkedListContext<T>,
  callback: (value: T) => void,
  context?: unknown
): void {
  const ctx = context ?? this;
  let currentNode = this.nodes.tail;

  while (currentNode !== null) {
    const previousNode = currentNode.prev;
    processNode(this, callback, currentNode, ctx);
    currentNode = previousNode;
  }
}

interface LinkedListContext<T> {
  nodes: {
    tail: LinkedListNode<T> | null;
  };
}

interface LinkedListNode<T> {
  prev: LinkedListNode<T> | null;
  value: T;
}

function processNode<T>(
  context: LinkedListContext<T>,
  callback: (value: T) => void,
  node: LinkedListNode<T>,
  thisArg: unknown
): void {
  // Implementation depends on original 'w' function behavior
  callback.call(thisArg, node.value);
}