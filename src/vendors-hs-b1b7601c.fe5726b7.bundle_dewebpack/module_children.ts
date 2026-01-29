function children(): SVGElement[] {
  return this.node.childNodes
    .filter((node: Node) => isSVGElement(node))
    .map((element: Node) => adopt(element as SVGElement));
}

function isSVGElement(node: Node): node is SVGElement {
  return node.nodeType === 1 && node instanceof SVGElement;
}

function adopt(element: SVGElement): SVGElement {
  if (element.instance) {
    return element.instance;
  }
  
  const constructor = getElementConstructor(element);
  element.instance = new constructor(element);
  return element.instance;
}

function getElementConstructor(element: SVGElement): any {
  const tagName = element.nodeName;
  return elementConstructors[tagName] || SVGElement;
}

const elementConstructors: Record<string, any> = {};