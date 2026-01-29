function removeElement(element: SVGElement): SVGElement {
    this.node.removeChild(element.node);
    return this;
}