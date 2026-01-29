function get(index: number): SVGElement | null {
    const childNode = this.node.childNodes[index];
    return childNode ? adopt(childNode) : null;
}

function adopt(node: ChildNode): SVGElement | null {
    if (!node) return null;
    // Assuming adopt wraps a DOM node into an SVG element wrapper
    // Implementation depends on the SVG library context
    return node as unknown as SVGElement;
}