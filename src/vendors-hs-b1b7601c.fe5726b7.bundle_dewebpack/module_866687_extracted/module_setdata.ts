interface TextElement {
  dom: any;
  leading: NumberWrapper;
}

class NumberWrapper {
  constructor(public value: number) {}
}

function setData(element: any): TextElement {
  this.dom = element;
  this.dom.leading = new NumberWrapper(element.leading ?? 1.3);
  return this;
}