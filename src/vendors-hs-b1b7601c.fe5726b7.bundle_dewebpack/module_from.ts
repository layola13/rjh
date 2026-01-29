interface NumberConstructor {
  new (value: number): number;
}

interface GradientAttributes {
  fx?: number;
  fy?: number;
  x1?: number;
  y1?: number;
}

interface GradientElement {
  type: string;
  attr(attributes: GradientAttributes): this;
}

function setGradientFrom(this: GradientElement, x: number, y: number): GradientElement {
  const target = this._target ?? this;
  
  if (target.type === "radial") {
    return this.attr({
      fx: x,
      fy: y
    });
  }
  
  return this.attr({
    x1: x,
    y1: y
  });
}