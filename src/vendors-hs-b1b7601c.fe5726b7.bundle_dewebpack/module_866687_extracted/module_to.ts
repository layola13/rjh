interface NumberConstructor {
  new (value: number): NumberInstance;
}

interface NumberInstance {
  value: number;
}

interface GradientAttributes {
  cx?: NumberInstance;
  cy?: NumberInstance;
  x2?: NumberInstance;
  y2?: NumberInstance;
}

interface Gradient {
  type: string;
  attr(attributes: GradientAttributes): this;
}

interface GradientContext {
  _target?: Gradient;
  type?: string;
  attr(attributes: GradientAttributes): GradientContext;
}

declare const n: {
  Number: NumberConstructor;
};

function to(this: GradientContext, x: number, y: number): GradientContext {
  const target = this._target || this;
  
  if (target.type === "radial") {
    return this.attr({
      cx: new n.Number(x),
      cy: new n.Number(y)
    });
  }
  
  return this.attr({
    x2: new n.Number(x),
    y2: new n.Number(y)
  });
}

export { to };