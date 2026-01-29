interface GradientTarget {
  type: string;
}

interface NumberConstructor {
  new (value: number): any;
}

interface GradientElement {
  _target?: GradientTarget;
  type?: string;
  attr(attributes: { cx: any; cy: any } | { x2: any; y2: any }): this;
}

declare const n: {
  Number: NumberConstructor;
};

function moduleTo(this: GradientElement, e: number, t: number): GradientElement {
  const target = this._target ?? this;
  
  if (target.type === "radial") {
    return this.attr({
      cx: new n.Number(e),
      cy: new n.Number(t)
    });
  }
  
  return this.attr({
    x2: new n.Number(e),
    y2: new n.Number(t)
  });
}