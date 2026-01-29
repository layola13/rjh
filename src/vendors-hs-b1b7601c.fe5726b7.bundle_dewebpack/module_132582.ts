type MapEntry<K, V> = [K, V];

class PolyfillMap<K, V> {
  private __entries__: MapEntry<K, V>[] = [];

  get size(): number {
    return this.__entries__.length;
  }

  private findIndex(key: K): number {
    let index = -1;
    this.__entries__.some((entry, idx) => {
      if (entry[0] === key) {
        index = idx;
        return true;
      }
      return false;
    });
    return index;
  }

  get(key: K): V | undefined {
    const index = this.findIndex(key);
    const entry = this.__entries__[index];
    return entry?.[1];
  }

  set(key: K, value: V): void {
    const index = this.findIndex(key);
    if (index !== -1) {
      this.__entries__[index][1] = value;
    } else {
      this.__entries__.push([key, value]);
    }
  }

  delete(key: K): void {
    const entries = this.__entries__;
    const index = this.findIndex(key);
    if (index !== -1) {
      entries.splice(index, 1);
    }
  }

  has(key: K): boolean {
    return this.findIndex(key) !== -1;
  }

  clear(): void {
    this.__entries__.splice(0);
  }

  forEach(callback: (value: V, key: K) => void, context: unknown = null): void {
    for (const entry of this.__entries__) {
      callback.call(context, entry[1], entry[0]);
    }
  }
}

const MapPolyfill = typeof Map !== "undefined" ? Map : PolyfillMap;

const isBrowser =
  typeof window !== "undefined" &&
  typeof document !== "undefined" &&
  window.document === document;

const global =
  typeof globalThis !== "undefined" && globalThis.Math === Math
    ? globalThis
    : typeof self !== "undefined" && self.Math === Math
    ? self
    : typeof window !== "undefined" && window.Math === Math
    ? window
    : Function("return this")();

const requestAnimationFramePolyfill =
  typeof requestAnimationFrame === "function"
    ? requestAnimationFrame.bind(global)
    : (callback: FrameRequestCallback): number => {
        return setTimeout(() => {
          callback(Date.now());
        }, 1000 / 60);
      };

const RESIZE_OBSERVABLE_PROPERTIES = [
  "top",
  "right",
  "bottom",
  "left",
  "width",
  "height",
  "size",
  "weight",
];

const hasMutationObserver = typeof MutationObserver !== "undefined";

function createThrottledFunction(
  callback: () => void,
  delay: number
): () => void {
  let pending = false;
  let trailing = false;
  let lastCallTime = 0;

  function invoke(): void {
    if (pending) {
      pending = false;
      callback();
    }
    if (trailing) {
      schedule();
    }
  }

  function rafCallback(): void {
    requestAnimationFramePolyfill(invoke);
  }

  function schedule(): void {
    const now = Date.now();
    if (pending) {
      if (now - lastCallTime < 2) {
        return;
      }
      trailing = true;
    } else {
      pending = true;
      trailing = false;
      setTimeout(rafCallback, delay);
    }
    lastCallTime = now;
  }

  return schedule;
}

class ResizeObserverController {
  private static instance_: ResizeObserverController | null = null;

  private connected_ = false;
  private mutationEventsAdded_ = false;
  private mutationsObserver_: MutationObserver | null = null;
  private observers_: ResizeObserverSPI[] = [];
  public refresh: () => void;

  constructor() {
    this.refresh = createThrottledFunction(this.refresh.bind(this), 20);
  }

  addObserver(observer: ResizeObserverSPI): void {
    if (this.observers_.indexOf(observer) === -1) {
      this.observers_.push(observer);
    }
    if (!this.connected_) {
      this.connect_();
    }
  }

  removeObserver(observer: ResizeObserverSPI): void {
    const observers = this.observers_;
    const index = observers.indexOf(observer);
    if (index !== -1) {
      observers.splice(index, 1);
    }
    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  }

  refresh(): void {
    if (this.updateObservers_()) {
      this.refresh();
    }
  }

  private updateObservers_(): boolean {
    const activeObservers = this.observers_.filter((observer) => {
      observer.gatherActive();
      return observer.hasActive();
    });

    activeObservers.forEach((observer) => {
      observer.broadcastActive();
    });

    return activeObservers.length > 0;
  }

  private connect_(): void {
    if (!isBrowser || this.connected_) {
      return;
    }

    document.addEventListener("transitionend", this.onTransitionEnd_);
    window.addEventListener("resize", this.refresh);

    if (hasMutationObserver) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    } else {
      document.addEventListener("DOMSubtreeModified", this.refresh);
      this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
  }

  private disconnect_(): void {
    if (!isBrowser || !this.connected_) {
      return;
    }

    document.removeEventListener("transitionend", this.onTransitionEnd_);
    window.removeEventListener("resize", this.refresh);

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
      document.removeEventListener("DOMSubtreeModified", this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  }

  private onTransitionEnd_ = (event: TransitionEvent): void => {
    const propertyName = event.propertyName ?? "";
    const isRelevantProperty = RESIZE_OBSERVABLE_PROPERTIES.some((prop) => {
      return propertyName.indexOf(prop) !== -1;
    });

    if (isRelevantProperty) {
      this.refresh();
    }
  };

  static getInstance(): ResizeObserverController {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController();
    }
    return this.instance_;
  }
}

function defineConfigurable<T extends object>(
  target: T,
  properties: Partial<T>
): T {
  for (const key of Object.keys(properties) as (keyof T)[]) {
    Object.defineProperty(target, key, {
      value: properties[key],
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }
  return target;
}

function getWindowOf(element: Element): Window {
  return element?.ownerDocument?.defaultView ?? (global as Window);
}

interface DOMRectReadOnlyInit {
  x: number;
  y: number;
  width: number;
  height: number;
}

function createRectReadOnly(init: DOMRectReadOnlyInit): DOMRectReadOnly {
  const { x, y, width, height } = init;
  const RectConstructor =
    typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  const rect = Object.create(RectConstructor.prototype);

  return defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x,
  });
}

const EMPTY_RECT = createRectReadOnly({ x: 0, y: 0, width: 0, height: 0 });

function parseStyleValue(value: string): number {
  return parseFloat(value) || 0;
}

function calculateBorderWidth(
  styles: CSSStyleDeclaration,
  ...sides: string[]
): number {
  return sides.reduce((total, side) => {
    return total + parseStyleValue(styles[`border-${side}-width`]);
  }, 0);
}

interface PaddingValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

function getPadding(styles: CSSStyleDeclaration): PaddingValues {
  const padding: Partial<PaddingValues> = {};
  const sides: (keyof PaddingValues)[] = ["top", "right", "bottom", "left"];

  for (const side of sides) {
    const value = styles[`padding-${side}`];
    padding[side] = parseStyleValue(value);
  }

  return padding as PaddingValues;
}

function isDocumentElement(element: Element): boolean {
  return element === getWindowOf(element).document.documentElement;
}

function getContentRect(element: Element): DOMRectReadOnly {
  const clientWidth = element.clientWidth;
  const clientHeight = element.clientHeight;

  if (!clientWidth && !clientHeight) {
    return EMPTY_RECT;
  }

  const styles = getWindowOf(element).getComputedStyle(element);
  const padding = getPadding(styles);
  const horizontalPadding = padding.left + padding.right;
  const verticalPadding = padding.top + padding.bottom;

  let width = parseStyleValue(styles.width);
  let height = parseStyleValue(styles.height);

  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizontalPadding) !== clientWidth) {
      width -= calculateBorderWidth(styles, "left", "right") + horizontalPadding;
    }
    if (Math.round(height + verticalPadding) !== clientHeight) {
      height -= calculateBorderWidth(styles, "top", "bottom") + verticalPadding;
    }
  }

  if (!isDocumentElement(element)) {
    const horizontalDelta = Math.round(width + horizontalPadding) - clientWidth;
    const verticalDelta = Math.round(height + verticalPadding) - clientHeight;

    if (Math.abs(horizontalDelta) !== 1) {
      width -= horizontalDelta;
    }

    if (Math.abs(verticalDelta) !== 1) {
      height -= verticalDelta;
    }
  }

  return createRectReadOnly({
    x: padding.left,
    y: padding.top,
    width,
    height,
  });
}

const isSVGGraphicsElement =
  typeof SVGGraphicsElement !== "undefined"
    ? (element: Element): element is SVGGraphicsElement => {
        return element instanceof getWindowOf(element).SVGGraphicsElement;
      }
    : (element: Element): element is SVGElement => {
        return (
          element instanceof getWindowOf(element).SVGElement &&
          typeof (element as SVGGraphicsElement).getBBox === "function"
        );
      };

function getSVGContentRect(element: SVGGraphicsElement): DOMRectReadOnly {
  const bbox = element.getBBox();
  return createRectReadOnly({
    x: 0,
    y: 0,
    width: bbox.width,
    height: bbox.height,
  });
}

function getElementContentRect(element: Element): DOMRectReadOnly {
  if (!isBrowser) {
    return EMPTY_RECT;
  }

  if (isSVGGraphicsElement(element)) {
    return getSVGContentRect(element);
  }

  return getContentRect(element);
}

class ResizeObservation {
  public readonly target: Element;
  private broadcastWidth = 0;
  private broadcastHeight = 0;
  private contentRect_: DOMRectReadOnly = createRectReadOnly({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  constructor(target: Element) {
    this.target = target;
  }

  isActive(): boolean {
    const rect = getElementContentRect(this.target);
    this.contentRect_ = rect;
    return (
      rect.width !== this.broadcastWidth ||
      rect.height !== this.broadcastHeight
    );
  }

  broadcastRect(): DOMRectReadOnly {
    const rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  }
}

class ResizeObserverEntry {
  public readonly target: Element;
  public readonly contentRect: DOMRectReadOnly;

  constructor(target: Element, contentRect: DOMRectReadOnly) {
    defineConfigurable(this, {
      target,
      contentRect,
    });
  }
}

class ResizeObserverSPI {
  private activeObservations_: ResizeObservation[] = [];
  private observations_ = new MapPolyfill<Element, ResizeObservation>();
  private callback_: ResizeObserverCallback;
  private controller_: ResizeObserverController;
  private callbackCtx_: unknown;

  constructor(
    callback: ResizeObserverCallback,
    controller: ResizeObserverController,
    context: unknown
  ) {
    if (typeof callback !== "function") {
      throw new TypeError(
        "The callback provided as parameter 1 is not a function."
      );
    }
    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = context;
  }

  observe(target: Element): void {
    if (!arguments.length) {
      throw new TypeError("1 argument required, but only 0 present.");
    }

    if (typeof Element !== "undefined" && Element instanceof Object) {
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }

      const observations = this.observations_;

      if (!observations.has(target)) {
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        this.controller_.refresh();
      }
    }
  }

  unobserve(target: Element): void {
    if (!arguments.length) {
      throw new TypeError("1 argument required, but only 0 present.");
    }

    if (typeof Element !== "undefined" && Element instanceof Object) {
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }

      const observations = this.observations_;

      if (observations.has(target)) {
        observations.delete(target);
        if (!observations.size) {
          this.controller_.removeObserver(this);
        }
      }
    }
  }

  disconnect(): void {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  }

  gatherActive(): void {
    this.clearActive();
    this.observations_.forEach((observation) => {
      if (observation.isActive()) {
        this.activeObservations_.push(observation);
      }
    });
  }

  broadcastActive(): void {
    if (!this.hasActive()) {
      return;
    }

    const context = this.callbackCtx_;
    const entries = this.activeObservations_.map((observation) => {
      return new ResizeObserverEntry(
        observation.target,
        observation.broadcastRect()
      );
    });

    this.callback_.call(context, entries, context as ResizeObserver);
    this.clearActive();
  }

  clearActive(): void {
    this.activeObservations_.splice(0);
  }

  hasActive(): boolean {
    return this.activeObservations_.length > 0;
  }
}

const observerMap =
  typeof WeakMap !== "undefined"
    ? new WeakMap<ResizeObserver, ResizeObserverSPI>()
    : new MapPolyfill<ResizeObserver, ResizeObserverSPI>();

class ResizeObserverPolyfill implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    if (!(this instanceof ResizeObserverPolyfill)) {
      throw new TypeError("Cannot call a class as a function.");
    }

    if (!arguments.length) {
      throw new TypeError("1 argument required, but only 0 present.");
    }

    const controller = ResizeObserverController.getInstance();
    const observer = new ResizeObserverSPI(callback, controller, this);
    observerMap.set(this, observer);
  }

  observe(target: Element, options?: ResizeObserverOptions): void {
    const observer = observerMap.get(this);
    observer?.observe.apply(observer, [target, options]);
  }

  unobserve(target: Element): void {
    const observer = observerMap.get(this);
    observer?.unobserve.apply(observer, [target]);
  }

  disconnect(): void {
    const observer = observerMap.get(this);
    observer?.disconnect.apply(observer, []);
  }
}

const ResizeObserverExport =
  typeof (global as Window).ResizeObserver !== "undefined"
    ? (global as Window).ResizeObserver
    : ResizeObserverPolyfill;

export default ResizeObserverExport;