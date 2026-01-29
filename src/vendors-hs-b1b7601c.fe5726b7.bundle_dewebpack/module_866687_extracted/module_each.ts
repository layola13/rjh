function each(
  callback: (index: number, children: Element[]) => void,
  deep?: boolean
): Container {
  const children = this.children();
  
  for (let index = 0; index < children.length; index++) {
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