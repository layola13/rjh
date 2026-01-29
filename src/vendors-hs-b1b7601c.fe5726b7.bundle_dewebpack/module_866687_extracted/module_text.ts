interface DOMNode extends Node {
  newLined?: number;
}

interface SVGElement {
  node: ParentNode;
  clear(): this;
  build(building: boolean): this;
  tspan(text: string): TSpanElement;
  rebuild(): this;
}

interface TSpanElement {
  newLine(): this;
}

function text(this: SVGElement, content?: string | ((element: SVGElement) => void)): string | SVGElement {
  if (content === undefined) {
    let result = "";
    const childNodes = this.node.childNodes;
    
    for (let i = 0, length = childNodes.length; i < length; ++i) {
      const currentNode = childNodes[i] as DOMNode;
      
      if (i !== 0 && currentNode.nodeType !== 3 && (currentNode as any).dom?.newLined === 1) {
        result += "\n";
      }
      
      result += currentNode.textContent ?? "";
    }
    
    return result;
  }

  this.clear().build(true);

  if (typeof content === "function") {
    content.call(this, this);
  } else {
    const lines = content.split("\n");
    
    for (let i = 0, length = lines.length; i < length; i++) {
      this.tspan(lines[i]).newLine();
    }
  }

  return this.build(false).rebuild();
}