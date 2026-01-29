import type { SVGElement as SVGElementType } from './types';

const typeOf = (value: unknown): string => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

interface Window {
  SVG?: typeof SVG;
}

interface SVGNamespaces {
  ns: string;
  xmlns: string;
  xlink: string;
  svgjs: string;
  supported: boolean;
  did: number;
}

interface SVGParser {
  body: HTMLElement | SVGElement;
  draw: SVGSVGElement;
  poly: SVGPolylineElement;
  path: SVGPathElement;
  native: SVGSVGElement;
}

interface SVGRegex {
  numberAndUnit: RegExp;
  hex: RegExp;
  rgb: RegExp;
  reference: RegExp;
  transforms: RegExp;
  whitespace: RegExp;
  isHex: RegExp;
  isRgb: RegExp;
  isCss: RegExp;
  isBlank: RegExp;
  isNumber: RegExp;
  isPercent: RegExp;
  isImage: RegExp;
  delimiter: RegExp;
  hyphen: RegExp;
  pathLetters: RegExp;
  isPathLetter: RegExp;
  numbersWithDots: RegExp;
  dots: RegExp;
}

interface SVGUtils {
  map<T, R>(array: T[], callback: (item: T) => R): R[];
  filter<T>(array: T[], callback: (item: T) => boolean): T[];
  radians(degrees: number): number;
  degrees(radians: number): number;
  filterSVGElements(nodes: Node[]): SVGElementType[];
}

interface SVGDefaults {
  attrs: Record<string, string | number>;
}

class SVGColor {
  r: number = 0;
  g: number = 0;
  b: number = 0;
  destination?: SVGColor;

  constructor(color?: string | { r: number; g: number; b: number }) {
    if (!color) return;

    if (typeof color === 'string') {
      if (SVG.regex.isRgb.test(color)) {
        const match = SVG.regex.rgb.exec(color.replace(SVG.regex.whitespace, ''));
        if (match) {
          this.r = parseInt(match[1]);
          this.g = parseInt(match[2]);
          this.b = parseInt(match[3]);
        }
      } else if (SVG.regex.isHex.test(color)) {
        const match = SVG.regex.hex.exec(expandHex(color));
        if (match) {
          this.r = parseInt(match[1], 16);
          this.g = parseInt(match[2], 16);
          this.b = parseInt(match[3], 16);
        }
      }
    } else if (typeOf(color) === 'object') {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
    }
  }

  toString(): string {
    return this.toHex();
  }

  toHex(): string {
    return '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
  }

  toRgb(): string {
    return `rgb(${[this.r, this.g, this.b].join()})`;
  }

  brightness(): number {
    return (this.r / 255) * 0.3 + (this.g / 255) * 0.59 + (this.b / 255) * 0.11;
  }

  morph(color: string | SVGColor): this {
    this.destination = new SVGColor(color);
    return this;
  }

  at(position: number): SVGColor {
    if (!this.destination) return this;

    position = position < 0 ? 0 : position > 1 ? 1 : position;

    return new SVGColor({
      r: Math.floor(this.r + (this.destination.r - this.r) * position),
      g: Math.floor(this.g + (this.destination.g - this.g) * position),
      b: Math.floor(this.b + (this.destination.b - this.b) * position)
    });
  }

  static test(color: string): boolean {
    color += '';
    return SVG.regex.isHex.test(color) || SVG.regex.isRgb.test(color);
  }

  static isRgb(color: unknown): boolean {
    return (
      !!color &&
      typeof (color as any).r === 'number' &&
      typeof (color as any).g === 'number' &&
      typeof (color as any).b === 'number'
    );
  }

  static isColor(color: unknown): boolean {
    return SVGColor.isRgb(color) || SVGColor.test(color as string);
  }
}

const SVG = function (element: string | HTMLElement): any {
  if (SVG.supported) {
    const doc = new SVG.Doc(element);
    if (!SVG.parser.draw) {
      SVG.prepare();
    }
    return doc;
  }
} as any;

SVG.ns = 'http://www.w3.org/2000/svg';
SVG.xmlns = 'http://www.w3.org/2000/xmlns/';
SVG.xlink = 'http://www.w3.org/1999/xlink';
SVG.svgjs = 'http://svgjs.com/svgjs';
SVG.supported = !!document.createElementNS && !!document.createElementNS(SVG.ns, 'svg').createSVGRect;

if (!SVG.supported) {
  throw new Error('SVG not supported');
}

SVG.did = 1000;

SVG.eid = function (type: string): string {
  return 'Svgjs' + capitalize(type) + SVG.did++;
};

SVG.create = function (name: string): SVGElement {
  const element = document.createElementNS(SVG.ns, name) as SVGElement;
  element.setAttribute('id', SVG.eid(name));
  return element;
};

SVG.extend = function (...args: any[]): void {
  const methods = args.pop();
  const length = args.length - 1;

  for (let i = length; i >= 0; i--) {
    if (args[i]) {
      for (const key in methods) {
        args[i].prototype[key] = methods[key];
      }
    }
  }

  if (SVG.Set?.inherit) {
    SVG.Set.inherit();
  }
};

SVG.prepare = function (): void {
  const body = document.getElementsByTagName('body')[0];
  const draw = (body ? new SVG.Doc(body) : SVG.adopt(document.documentElement).nested()).size(2, 0);

  SVG.parser = {
    body: body || document.documentElement,
    draw: draw
      .style('opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden')
      .attr('focusable', 'false').node,
    poly: draw.polyline().node,
    path: draw.path().node,
    native: SVG.create('svg')
  };
};

SVG.parser = {
  native: SVG.create('svg')
} as SVGParser;

document.addEventListener(
  'DOMContentLoaded',
  () => {
    if (!SVG.parser.draw) {
      SVG.prepare();
    }
  },
  false
);

SVG.regex = {
  numberAndUnit: /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,
  hex: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
  rgb: /rgb\((\d+),(\d+),(\d+)\)/,
  reference: /#([a-z0-9\-_]+)/i,
  transforms: /\)\s*,?\s*/,
  whitespace: /\s/g,
  isHex: /^#[a-f0-9]{3,6}$/i,
  isRgb: /^rgb\(/,
  isCss: /[^:]+:[^;]+;?/,
  isBlank: /^(\s+)?$/,
  isNumber: /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  isPercent: /^-?[\d.]+%$/,
  isImage: /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,
  delimiter: /[\s,]+/,
  hyphen: /([^e])\-/gi,
  pathLetters: /[MLHVCSQTAZ]/gi,
  isPathLetter: /[MLHVCSQTAZ]/i,
  numbersWithDots: /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,
  dots: /\./g
} as SVGRegex;

SVG.utils = {
  map<T, R>(array: T[], callback: (item: T) => R): R[] {
    const results: R[] = [];
    for (let i = 0; i < array.length; i++) {
      results.push(callback(array[i]));
    }
    return results;
  },

  filter<T>(array: T[], callback: (item: T) => boolean): T[] {
    const results: T[] = [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i])) {
        results.push(array[i]);
      }
    }
    return results;
  },

  radians(degrees: number): number {
    return ((degrees % 360) * Math.PI) / 180;
  },

  degrees(radians: number): number {
    return ((180 * radians) / Math.PI) % 360;
  },

  filterSVGElements(nodes: Node[]): SVGElementType[] {
    return this.filter(nodes, (node): node is SVGElementType => {
      return node instanceof window.SVGElement;
    });
  }
} as SVGUtils;

SVG.defaults = {
  attrs: {
    'fill-opacity': 1,
    'stroke-opacity': 1,
    'stroke-width': 0,
    'stroke-linejoin': 'miter',
    'stroke-linecap': 'butt',
    fill: '#000000',
    stroke: '#000000',
    opacity: 1,
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
    width: 0,
    height: 0,
    r: 0,
    rx: 0,
    ry: 0,
    offset: 0,
    'stop-opacity': 1,
    'stop-color': '#000000',
    'font-size': 16,
    'font-family': 'Helvetica, Arial, sans-serif',
    'text-anchor': 'start'
  }
} as SVGDefaults;

SVG.Color = SVGColor;

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function expandHex(hex: string): string {
  return hex.length === 4
    ? ['#', hex.substring(1, 2), hex.substring(1, 2), hex.substring(2, 3), hex.substring(2, 3), hex.substring(3, 4), hex.substring(3, 4)].join('')
    : hex;
}

function componentToHex(component: number): string {
  const hex = component.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export default SVG;