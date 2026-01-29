interface PolyfillableObject {
  [key: string]: any;
}

interface ConsolePolyfill {
  log: (...args: any[]) => void;
  error?: (...args: any[]) => void;
  warn?: (...args: any[]) => void;
  info?: (...args: any[]) => void;
  dir?: (...args: any[]) => void;
  table?: (...args: any[]) => void;
  assert?: (condition: boolean, message?: string) => void;
}

interface GlobalWindow extends Window {
  global?: GlobalWindow;
  console: ConsolePolyfill;
  performance: Performance;
  requestAnimationFrame: (callback: FrameRequestCallback) => number;
  webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  mozRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  oRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  msRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
}

declare global {
  interface Array<T> {
    xRemove(item: T): T | undefined;
    xInsert(index: number, ...items: T[]): number;
    xPushCollection(collection: T[]): number;
    xInsertCollection(index: number, collection: T[]): number;
  }
}

/**
 * Define a property on an object if it doesn't already exist
 */
function definePropertyIfMissing<T>(
  target: PolyfillableObject,
  propertyName: string,
  value: T
): void {
  if (target[propertyName]) {
    return;
  }

  if (Object.defineProperty) {
    Object.defineProperty(target, propertyName, {
      value,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }

  if (!target[propertyName]) {
    target[propertyName] = value;
  }
}

/**
 * Initialize browser polyfills for legacy environments
 */
function initializePolyfills(): void {
  const win = window as unknown as GlobalWindow;

  if (typeof window === 'undefined') {
    if (globalThis.global === undefined) {
      (globalThis as any).global = globalThis;
    }
    (globalThis as any).window = (globalThis as any).global;
  } else {
    win.global = win;
  }

  win.self = win;

  if (win.console === undefined) {
    win.console = {
      log: (): void => {},
    };
  }

  definePropertyIfMissing(win.console, 'error', win.console.log);
  definePropertyIfMissing(win.console, 'warn', win.console.log);
  definePropertyIfMissing(win.console, 'info', win.console.log);
  definePropertyIfMissing(win.console, 'dir', win.console.log);
  definePropertyIfMissing(win.console, 'table', win.console.log);
  definePropertyIfMissing(
    win.console,
    'assert',
    (condition: boolean, message?: string): void => {
      if (!condition) {
        win.console.error(message);
      }
    }
  );

  if (win.alert === undefined) {
    win.alert = win.console.log;
  }

  definePropertyIfMissing(
    Array.prototype,
    'xRemove',
    function <T>(this: T[], item: T): T | undefined {
      const index = this.indexOf(item);
      if (index !== -1) {
        return this.splice(index, 1)[0];
      }
      return undefined;
    }
  );

  definePropertyIfMissing(
    Array.prototype,
    'xInsert',
    function <T>(this: T[], index: number, ...items: T[]): number {
      const args = Array.prototype.slice.call(arguments, 1) as T[];
      args.splice(0, 0, index as any, 0 as any);
      Array.prototype.splice.apply(this, args as any);
      return this.length;
    }
  );

  definePropertyIfMissing(
    Array.prototype,
    'xPushCollection',
    function <T>(this: T[], collection: T[]): number {
      return Array.prototype.push.apply(this, collection);
    }
  );

  definePropertyIfMissing(
    Array.prototype,
    'xInsertCollection',
    function <T>(this: T[], index: number, collection: T[]): number {
      const items = collection.slice(0);
      items.splice(0, 0, index as any, 0 as any);
      Array.prototype.splice.apply(this, items as any);
      return this.length;
    }
  );

  if (win.Element) {
    definePropertyIfMissing(
      Element.prototype,
      'remove',
      function (this: Element): void {
        this.parentElement?.removeChild(this);
      }
    );
  }

  if (win.Event) {
    definePropertyIfMissing(
      Event.prototype,
      'preventDefault',
      function (this: Event): void {
        (this as any).returnValue = false;
      }
    );

    definePropertyIfMissing(
      Event.prototype,
      'stopPropagation',
      function (this: Event): void {
        (this as any).cancelBubble = true;
      }
    );
  }

  definePropertyIfMissing(win, 'performance', {} as Performance);
  definePropertyIfMissing(win.performance, 'now', Date.now);

  const requestAnimationFallback = (callback: FrameRequestCallback): number => {
    return setTimeout(callback, 100) as unknown as number;
  };

  definePropertyIfMissing(
    win,
    'requestAnimationFrame',
    win.webkitRequestAnimationFrame ??
      win.mozRequestAnimationFrame ??
      win.oRequestAnimationFrame ??
      win.msRequestAnimationFrame ??
      requestAnimationFallback
  );
}

initializePolyfills();