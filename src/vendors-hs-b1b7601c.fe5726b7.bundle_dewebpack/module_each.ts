interface Element {
  each(callback: EachCallback, deep?: boolean): this;
}

interface Container extends Element {
  children(): Node[];
}

interface Node {}

type EachCallback = (this: Element, index: number, children: Node[]) => void;

function each(this: Container, callback: EachCallback, deep?: boolean): Container {
  const children = this.children();
  
  for (let index = 0, length = children.length; index < length; index++) {
    const child = children[index];
    
    if (child instanceof Element) {
      callback.apply(child, [index, children]);
    }
    
    if (deep && child instanceof Container) {
      child.each(callback, deep);
    }
  }
  
  return this;
}