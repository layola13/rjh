interface SideChannelNode<K, V> {
  key: K;
  next: SideChannelNode<K, V> | undefined;
  value: V;
}

interface SideChannelHead<K, V> {
  next: SideChannelNode<K, V> | undefined;
}

interface SideChannel<K, V> {
  assert(key: K): void;
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): void;
}

function findNode<K, V>(
  head: SideChannelHead<K, V>,
  key: K,
  shouldUnlink: boolean = false
): SideChannelNode<K, V> | undefined {
  let currentNode: SideChannelHead<K, V> | SideChannelNode<K, V> = head;
  let nextNode: SideChannelNode<K, V> | undefined;

  while ((nextNode = currentNode.next) !== null && nextNode !== undefined) {
    if (nextNode.key === key) {
      currentNode.next = nextNode.next;
      
      if (!shouldUnlink) {
        nextNode.next = head.next;
        head.next = nextNode;
      }
      
      return nextNode;
    }
    currentNode = nextNode;
  }

  return undefined;
}

function deleteNode<K, V>(
  head: SideChannelHead<K, V> | undefined,
  key: K
): SideChannelNode<K, V> | undefined {
  if (head) {
    return findNode(head, key, true);
  }
  return undefined;
}

function getNodeValue<K, V>(
  head: SideChannelHead<K, V> | undefined,
  key: K
): V | undefined {
  if (head) {
    const node = findNode(head, key, false);
    return node?.value;
  }
  return undefined;
}

function hasNode<K, V>(
  head: SideChannelHead<K, V> | undefined,
  key: K
): boolean {
  return !!head && !!findNode(head, key, false);
}

function setNodeValue<K, V>(
  head: SideChannelHead<K, V>,
  key: K,
  value: V
): void {
  const existingNode = findNode(head, key, false);
  
  if (existingNode) {
    existingNode.value = value;
  } else {
    head.next = {
      key,
      next: head.next,
      value
    };
  }
}

function createSideChannel<K = unknown, V = unknown>(): SideChannel<K, V> {
  let head: SideChannelHead<K, V> | undefined;

  return {
    assert(key: K): void {
      if (!this.has(key)) {
        throw new TypeError(`Side channel does not contain ${String(key)}`);
      }
    },

    delete(key: K): boolean {
      const headNext = head?.next;
      const deletedNode = deleteNode(head, key);
      
      if (deletedNode && headNext && headNext === deletedNode) {
        head = undefined;
      }
      
      return !!deletedNode;
    },

    get(key: K): V | undefined {
      return getNodeValue(head, key);
    },

    has(key: K): boolean {
      return hasNode(head, key);
    },

    set(key: K, value: V): void {
      if (!head) {
        head = { next: undefined };
      }
      setNodeValue(head, key, value);
    }
  };
}

export default createSideChannel;