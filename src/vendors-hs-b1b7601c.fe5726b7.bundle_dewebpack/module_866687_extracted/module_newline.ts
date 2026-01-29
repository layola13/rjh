interface TextElement {
  dom: {
    leading: number;
  };
  attr(name: string): number;
  x(): number;
}

interface NewLineElement {
  dom: {
    newLined: boolean;
  };
  parent(type: any): TextElement;
  dy(value: number): NewLineElement;
  attr(name: string, value: number): NewLineElement;
}

function newLine(this: NewLineElement): NewLineElement {
  const parentText = this.parent(n.Text);
  this.dom.newLined = true;
  return this.dy(parentText.dom.leading * parentText.attr("font-size")).attr("x", parentText.x());
}