interface HasData {
  [key: string]: any;
}

interface Point {
  x: number;
  y: number;
}

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
}

interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

type EventCallback = (event: Event) => void;

interface EventMap {
  [eventName: string]: EventCallback[];
}

class SVGElement {
  node: SVGElement;
  private _data: HasData = {};
  private _events: EventMap = {};

  has(key: string): boolean {
    return key in this._data;
  }

  get(key: string): any {
    return this._data[key];
  }

  set(key: string, value: any): this {
    this._data[key] = value;
    return this;
  }

  setData(data: HasData): this {
    Object.assign(this._data, data);
    return this;
  }

  ctm(): Matrix {
    return this.node.getCTM() as unknown as Matrix;
  }

  screenCTM(): Matrix {
    return this.node.getScreenCTM() as unknown as Matrix;
  }

  x(value?: number): number | this {
    if (value === undefined) {
      return this.attr('x');
    }
    return this.attr('x', value);
  }

  y(value?: number): number | this {
    if (value === undefined) {
      return this.attr('y');
    }
    return this.attr('y', value);
  }

  cx(value?: number): number | this {
    if (value === undefined) {
      return this.x() + this.width() / 2;
    }
    return this.x(value - this.width() / 2);
  }

  cy(value?: number): number | this {
    if (value === undefined) {
      return this.y() + this.height() / 2;
    }
    return this.y(value - this.height() / 2);
  }

  dx(value: number): this {
    return this.x((this.x() as number) + value);
  }

  dy(value: number): this {
    return this.y((this.y() as number) + value);
  }

  rx(value?: number): number | this {
    if (value === undefined) {
      return this.attr('rx');
    }
    return this.attr('rx', value);
  }

  ry(value?: number): number | this {
    if (value === undefined) {
      return this.attr('ry');
    }
    return this.attr('ry', value);
  }

  width(value?: number): number | this {
    if (value === undefined) {
      return this.attr('width');
    }
    return this.attr('width', value);
  }

  height(value?: number): number | this {
    if (value === undefined) {
      return this.attr('height');
    }
    return this.attr('height', value);
  }

  size(width: number, height: number): this {
    return this.width(width).height(height) as this;
  }

  gbox(): Box {
    const bbox = this.node.getBBox();
    return {
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
      cx: bbox.x + bbox.width / 2,
      cy: bbox.y + bbox.height / 2
    };
  }

  show(): this {
    this.node.style.display = '';
    return this;
  }

  toString(): string {
    return this.attr('id') ?? '';
  }

  valueOf(): SVGElement {
    return this.node;
  }

  attr(name: string, value?: any): any {
    if (value === undefined) {
      return this.node.getAttribute(name);
    }
    this.node.setAttribute(name, String(value));
    return this;
  }

  text(content?: string): string | this {
    if (content === undefined) {
      return this.node.textContent ?? '';
    }
    this.node.textContent = content;
    return this;
  }

  clear(): this {
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
    return this;
  }

  removeElement(): this {
    this.node.parentNode?.removeChild(this.node);
    return this;
  }

  add(element: SVGElement): this {
    this.node.appendChild(element.node);
    return this;
  }

  put(element: SVGElement, index?: number): this {
    if (index === undefined) {
      return this.add(element);
    }
    const children = this.node.children;
    if (index < children.length) {
      this.node.insertBefore(element.node, children[index]);
    } else {
      this.node.appendChild(element.node);
    }
    return this;
  }

  first(): SVGElement | null {
    return this.node.firstElementChild as unknown as SVGElement;
  }

  last(): SVGElement | null {
    return this.node.lastElementChild as unknown as SVGElement;
  }

  children(): SVGElement[] {
    return Array.from(this.node.children) as unknown as SVGElement[];
  }

  index(): number {
    return Array.from(this.node.parentNode?.children ?? []).indexOf(this.node);
  }

  each(callback: (index: number, children: SVGElement[]) => void): this {
    const children = this.children();
    children.forEach((child, index) => callback(index, children));
    return this;
  }

  at(index: number): SVGElement | null {
    return this.children()[index] ?? null;
  }

  on(event: string, callback: EventCallback): this {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
    this.node.addEventListener(event, callback);
    return this;
  }

  off(event?: string, callback?: EventCallback): this {
    if (!event) {
      Object.keys(this._events).forEach(evt => {
        this._events[evt].forEach(cb => {
          this.node.removeEventListener(evt, cb);
        });
      });
      this._events = {};
      return this;
    }
    if (!callback) {
      this._events[event]?.forEach(cb => {
        this.node.removeEventListener(event, cb);
      });
      delete this._events[event];
      return this;
    }
    const index = this._events[event]?.indexOf(callback) ?? -1;
    if (index > -1) {
      this._events[event].splice(index, 1);
      this.node.removeEventListener(event, callback);
    }
    return this;
  }

  fire(event: string, detail?: any): this {
    const customEvent = new CustomEvent(event, { detail });
    this.node.dispatchEvent(customEvent);
    return this;
  }

  event(): Event | null {
    return (window as any).event ?? null;
  }

  defs(): SVGElement {
    let defs = this.node.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this.node.insertBefore(defs, this.node.firstChild);
    }
    return defs as unknown as SVGElement;
  }

  use(element: SVGElement): SVGElement {
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${element.attr('id')}`);
    return use as unknown as SVGElement;
  }
}

class Path extends SVGElement {
  private _pathData: string[] = [];

  M(x: number, y: number): this {
    this._pathData.push(`M${x},${y}`);
    return this;
  }

  L(x: number, y: number): this {
    this._pathData.push(`L${x},${y}`);
    return this;
  }

  H(x: number): this {
    this._pathData.push(`H${x}`);
    return this;
  }

  V(y: number): this {
    this._pathData.push(`V${y}`);
    return this;
  }

  C(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this {
    this._pathData.push(`C${x1},${y1},${x2},${y2},${x},${y}`);
    return this;
  }

  S(x2: number, y2: number, x: number, y: number): this {
    this._pathData.push(`S${x2},${y2},${x},${y}`);
    return this;
  }

  Q(x1: number, y1: number, x: number, y: number): this {
    this._pathData.push(`Q${x1},${y1},${x},${y}`);
    return this;
  }

  T(x: number, y: number): this {
    this._pathData.push(`T${x},${y}`);
    return this;
  }

  A(rx: number, ry: number, rotation: number, largeArc: number, sweep: number, x: number, y: number): this {
    this._pathData.push(`A${rx},${ry},${rotation},${largeArc},${sweep},${x},${y}`);
    return this;
  }

  Z(): this {
    this._pathData.push('Z');
    return this;
  }

  build(): this {
    this.attr('d', this._pathData.join(''));
    return this;
  }

  rebuild(): this {
    this._pathData = [];
    return this;
  }
}

class Text extends SVGElement {
  private _lineHeight: number = 1.2;

  leading(value?: number): number | this {
    if (value === undefined) {
      return this._lineHeight;
    }
    this._lineHeight = value;
    return this;
  }

  newLine(): this {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    this.node.appendChild(tspan);
    return this;
  }

  lines(): SVGElement[] {
    return Array.from(this.node.querySelectorAll('tspan')) as unknown as SVGElement[];
  }
}

class Morphable {
  from(value: any): this {
    return this;
  }

  to(value: any): this {
    return this;
  }

  morph(value: any): this {
    return this;
  }

  at(position: number): any {
    return position;
  }
}

export { SVGElement, Path, Text, Morphable, Point, Box, Matrix, EventCallback };