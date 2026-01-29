interface DomElement {
  leading?: number | { valueOf(): number };
}

interface NumberWrapper {
  valueOf(): number;
}

class NumberConstructor {
  constructor(value: number) {
    // Number wrapper implementation
  }
}

const n = {
  Number: NumberConstructor
};

function setData(element: DomElement): typeof setData {
  this.dom = element;
  this.dom.leading = new n.Number(element.leading || 1.3);
  return this;
}