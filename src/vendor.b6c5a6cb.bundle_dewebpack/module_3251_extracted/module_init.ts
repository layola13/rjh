interface TweenOptions {
  duration?: number;
  easing?: string;
  complete?: () => void;
  step?: (now: number) => void;
  [key: string]: unknown;
}

interface CSSNumberMap {
  [property: string]: boolean;
}

interface EasingFunctions {
  _default: string;
  [name: string]: string | ((progress: number) => number);
}

interface JQueryLike {
  easing: EasingFunctions;
  cssNumber: CSSNumberMap;
}

declare const b: JQueryLike;

class Tween {
  elem: Element;
  prop: string;
  easing: string;
  options: TweenOptions;
  start: number;
  now: number;
  end: number;
  unit: string;

  constructor(
    elem: Element,
    options: TweenOptions,
    prop: string,
    end: number,
    easing: string | undefined,
    unit: string | undefined
  ) {
    this.elem = elem;
    this.prop = prop;
    this.easing = easing ?? b.easing._default;
    this.options = options;
    this.start = this.now = this.cur();
    this.end = end;
    this.unit = unit ?? (b.cssNumber[prop] ? "" : "px");
  }

  cur(): number {
    const computed = window.getComputedStyle(this.elem);
    const value = computed.getPropertyValue(this.prop);
    return parseFloat(value) || 0;
  }
}