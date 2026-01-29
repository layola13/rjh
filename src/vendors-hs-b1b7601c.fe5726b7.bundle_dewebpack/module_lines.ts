function getLines(this: any): any {
  const element = (this.textPath?.() ?? this).node;
  const adoptedElements = filterSVGElements(element.childNodes).map((childNode: SVGElement) => adopt(childNode));
  return new Set(adoptedElements);
}

function filterSVGElements(nodes: NodeList): SVGElement[] {
  return Array.from(nodes).filter((node): node is SVGElement => node instanceof SVGElement);
}

function adopt(element: SVGElement): any {
  return element;
}