interface DOMNode extends Node {
  newLined?: number;
}

interface SVGTextElement {
  node: {
    childNodes: NodeListOf<ChildNode>;
  };
  clear(): this;
  build(flag: boolean): this;
  tspan(text: string): { newLine(): void };
  rebuild(): this;
}

function text(this: SVGTextElement, content?: string | ((context: SVGTextElement) => void)): string | SVGTextElement {
  if (content === undefined) {
    let result = "";
    const childNodes = this.node.childNodes;
    
    for (let index = 0, length = childNodes.length; index < length; ++index) {
      const currentNode = childNodes[index] as DOMNode;
      
      if (index !== 0 && currentNode.nodeType !== 3 && (currentNode as any).newLined === 1) {
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
    
    for (let index = 0, length = lines.length; index < length; index++) {
      this.tspan(lines[index]).newLine();
    }
  }

  return this.build(false).rebuild();
}