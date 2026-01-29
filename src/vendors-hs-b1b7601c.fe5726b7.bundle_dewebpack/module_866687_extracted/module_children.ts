function children(): SVG.Element[] {
  return SVG.utils
    .map(
      SVG.utils.filterSVGElements(this.node.childNodes),
      (element: Node) => SVG.adopt(element)
    );
}